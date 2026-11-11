import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Send, Check } from 'lucide-react';
import { Review, Language } from '../types';
import { REVIEWS as INITIAL_REVIEWS } from '../data/products';

interface ReviewsProps {
  language: Language;
}

export const Reviews: React.FC<ReviewsProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: name,
      city: city || (isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'),
      rating: newRating,
      commentAr: comment,
      commentEn: comment,
      dateAr: 'الآن',
      dateEn: 'Just now',
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setCity('');
      setComment('');
      setShowAddForm(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 border-b border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0d0e] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              {isAr ? 'تقييمات المقتنين' : 'COMMUNITY VERIFIED FEEDBACK'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {isAr ? 'تجارب حقيقية من مقتني X1' : 'Trusted by Streetwear Enthusiasts'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-sm text-neutral-900 dark:text-white">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold tabular-nums">4.9 / 5.0</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">({reviews.length * 48} {isAr ? 'تقييم موثق' : 'reviews'})</span>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-2 text-xs font-mono bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-white/10 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>{isAr ? 'أضف تقييمك' : 'Write Review'}</span>
            </button>
          </div>
        </div>

        {/* Add Review Expandable Form */}
        {showAddForm && (
          <div className="mb-10 p-6 bg-neutral-50 dark:bg-[#131417] border border-neutral-200 dark:border-white/10 rounded-xl animate-in fade-in">
            <h3 className="text-sm font-mono font-bold text-neutral-900 dark:text-white uppercase mb-4">
              {isAr ? 'مشاركة تجربتك مع قطع X1' : 'Share your X1 experience'}
            </h3>

            {submitted ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono py-4">
                <Check className="w-4 h-4" />
                <span>{isAr ? 'شكراً لك! تم نشر تقييمك وتوثيقه بنجاح.' : 'Thank you! Your verified review has been posted.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">{isAr ? 'التقييم:' : 'Rating:'}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-neutral-300 dark:text-neutral-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'اسمك الكريم' : 'Your Name'}
                    className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={isAr ? 'المدينة (مثال: القاهرة، الإسكندرية)' : 'City (e.g. Cairo, Alexandria)'}
                    className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={isAr ? 'ما رأيك في جودة القماش، المقاس، وسرعة التوصيل؟' : 'How was the fabric weight, fit, and delivery speed?'}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال التقييم' : 'SUBMIT REVIEW'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="p-6 rounded-xl bg-neutral-50 dark:bg-[#121316] border border-neutral-200 dark:border-white/[0.06] flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                      <CheckCircle className="w-3 h-3" />
                      <span>{isAr ? 'مشتري موثق' : 'Verified Buyer'}</span>
                    </span>
                  )}
                </div>

                {/* Comment quote */}
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mb-4">
                  "{isAr ? rev.commentAr : rev.commentEn}"
                </p>
              </div>

              {/* Author & City footer */}
              <div className="pt-3 border-t border-neutral-200 dark:border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-neutral-900 dark:text-white">{rev.author}</span>
                <span>{rev.city} · {isAr ? rev.dateAr : rev.dateEn}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
