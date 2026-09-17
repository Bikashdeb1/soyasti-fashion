import React, { useState } from 'react';
import { Instagram, Heart, ArrowUpRight, X } from 'lucide-react';
import { SOCIAL_GALLERY } from '../data/fashionData';
import { SocialPost } from '../types';

interface SocialGalleryProps {
  onShopProductByName?: (name: string) => void;
}

export const SocialGallery: React.FC<SocialGalleryProps> = ({ onShopProductByName }) => {
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  return (
    <section aria-label="Social Lookbook Feed" className="py-14 sm:py-20 border-b border-[#EAE7E1] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B78343] uppercase font-sans">
              COMMUNITY LOOKBOOK
            </span>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717] mt-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              FOLLOW THE LOOK
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#171717] hover:text-[#B78343] uppercase transition-colors"
          >
            <Instagram className="w-4 h-4 text-[#B78343]" />
            <span>@VAANYASTUDIO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Square Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_GALLERY.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square overflow-hidden rounded-xs bg-[#F7F5F1] cursor-pointer border border-[#EAE7E1]"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-white/80" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-white/90">
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{post.likes}</span>
                  </div>
                  <p className="text-[10px] text-white/80 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Shop The Look Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-xs overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#EAE7E1]">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#171717] shadow-sm transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#F7F5F1]">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right Info */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs font-semibold">
                    V
                  </div>
                  <span className="text-xs font-semibold tracking-wider text-[#171717]">
                    {selectedPost.handle}
                  </span>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed">
                  {selectedPost.caption}
                </p>

                {selectedPost.productTag && (
                  <div className="p-3 bg-[#FBF9F5] rounded-xs border border-[#EAE7E1] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#B78343] font-semibold">
                      Featured in Post
                    </span>
                    <p className="text-xs font-medium text-[#171717]">
                      {selectedPost.productTag}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-[#EAE7E1] mt-4">
                <button
                  onClick={() => {
                    const tag = selectedPost.productTag;
                    setSelectedPost(null);
                    if (tag && onShopProductByName) {
                      onShopProductByName(tag);
                    }
                  }}
                  className="w-full py-3 bg-[#171717] hover:bg-[#B78343] text-white text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SHOP THIS LOOK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
