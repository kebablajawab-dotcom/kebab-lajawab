import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Loader2, Plus, Trash2, X, Pin, PinOff, ArrowLeft } from 'lucide-react';
import { db, handleFirestoreError, OperationType, fileToBase64 } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';

interface FullGalleryProps {
  isAdmin: boolean;
  onBack: () => void;
}

interface GalleryImage {
  id: string;
  image: string;
  createdAt: any;
  isPinned?: boolean;
}

const FullGallery: React.FC<FullGalleryProps> = ({ isAdmin, onBack }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(
      collection(db, 'gallery'), 
      orderBy('isPinned', 'desc'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const galleryImages: GalleryImage[] = [];
      snapshot.forEach((doc) => {
        galleryImages.push({ id: doc.id, ...doc.data() } as GalleryImage);
      });
      setImages(galleryImages);
    }, (error) => {
      if (error.message.includes('index')) {
        const simpleQ = query(collection(db, 'gallery'), orderBy('createdAt', 'asc'));
        onSnapshot(simpleQ, (snap) => {
          const items: GalleryImage[] = [];
          snap.forEach(d => items.push({ id: d.id, ...d.data() } as GalleryImage));
          items.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
          });
          setImages(items);
        });
      } else {
        handleFirestoreError(error, OperationType.LIST, 'gallery');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddImage = async (file: File) => {
    if (!isAdmin) return;
    setErrorMessage(null);

    if (file.size > 800 * 1024) {
      setErrorMessage('Image size must be less than 800KB. Please compress the image.');
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    setLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const docId = Date.now().toString();
      await setDoc(doc(db, 'gallery', docId), {
        image: base64,
        createdAt: serverTimestamp(),
        isPinned: false
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setDeletingId(id);
  };

  const handleTogglePin = async (id: string, currentPinned: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'gallery', id), {
        isPinned: !currentPinned
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `gallery/${id}`);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteDoc(doc(db, 'gallery', deletingId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gallery/${deletingId}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-white/60 hover:text-gold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-medium">Back to Gallery</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold">Full Gallery</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explore all the moments and flavors of Kebab Lajawab.
          </p>
        </motion.div>

        {isAdmin && (
          <div className="mb-12 flex flex-col items-center gap-4">
            <label className="flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-bold rounded-full cursor-pointer hover:bg-amber-accent transition-all transform hover:scale-105 shadow-lg">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                disabled={loading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAddImage(file);
                }}
              />
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Plus size={20} />
              )}
              Add Restaurant Image
            </label>
            <AnimatePresence>
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 font-medium text-sm"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg glass-card border-white/5"
                onClick={() => setSelectedImage(img.image)}
              >
                <img
                  src={img.image}
                  alt="Restaurant"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-medium border border-white/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
                
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button
                      onClick={(e) => handleTogglePin(img.id, !!img.isPinned, e)}
                      className={`p-1.5 rounded-full transition-colors ${
                        img.isPinned ? 'bg-gold text-charcoal' : 'bg-white/20 text-white hover:bg-white/40'
                      }`}
                      title={img.isPinned ? 'Unpin Image' : 'Pin Image'}
                    >
                      {img.isPinned ? <PinOff size={14} /> : <Pin size={14} />}
                    </button>
                    <button
                      onClick={(e) => handleDeleteImage(img.id, e)}
                      className="p-1.5 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
                
                {img.isPinned && !isAdmin && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="p-1.5 bg-gold text-charcoal rounded-full shadow-lg">
                      <Pin size={12} />
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {deletingId === img.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-2 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-white text-xs font-bold mb-2">Delete?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={confirmDelete}
                          className="px-2 py-1 bg-red-600 text-white text-[10px] rounded font-bold hover:bg-red-700 transition-colors"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="px-2 py-1 bg-white/20 text-white text-[10px] rounded font-bold hover:bg-white/30 transition-colors"
                        >
                          No
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {images.length === 0 && !loading && (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
            <ImageIcon size={48} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/40">No gallery images yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullGallery;
