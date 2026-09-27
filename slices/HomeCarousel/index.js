'use client';

import React, { useState, useEffect } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import { motion, AnimatePresence } from 'framer-motion';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

const HomeCarousel = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = slice.primary.group || [];

  // 全局检查 title 是否存在且有效
  const hasGlobalTitle = slice.primary.title && 
                         Array.isArray(slice.primary.title) && 
                         slice.primary.title.length > 0 && 
                         slice.primary.title[0].text !== '';

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex]);

  const goToSlide = (index) => setCurrentIndex(index);

  const goToPrev = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  // --- 子组件: 导航按钮 ---
  const NavigationButtons = () => {
    if (images.length <= 1) return null;
    return (
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-between px-4 md:px-8">
          <button
            onClick={goToPrev}
            className="pointer-events-auto text-white p-2 md:p-3 bg-black/10 hover:bg-black/30 backdrop-blur-sm rounded-full transition-all active:scale-95"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="pointer-events-auto text-white p-2 md:p-3 bg-black/10 hover:bg-black/30 backdrop-blur-sm rounded-full transition-all active:scale-95"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  // --- 子组件: 幻灯片渲染逻辑 ---
  const renderSlides = (isMobile = false) => {
    return images.map((item, index) => (
      <motion.div
        key={index}
        initial={false}
        animate={{
          opacity: index === currentIndex ? 1 : 0,
          scale: index === currentIndex ? 1.05 : 1, // 增加微弱的放大效果，更有质感
        }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className={`absolute inset-0 w-full h-full ${
          index === currentIndex ? "pointer-events-auto z-10" : "pointer-events-none z-0"
        }`}
      >
        {item.link ? (
          <PrismicNextLink field={item.link} className="block w-full h-full">
            <PrismicNextImage
              field={item.image}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </PrismicNextLink>
        ) : (
          <PrismicNextImage
            field={item.image}
            className="w-full h-full object-cover"
            priority={index === 0}
          />
        )}

        {/* --- 幻灯片独立文字内容：仅在没有全局标题且存在 link.text 时显示 --- */}
        {!hasGlobalTitle && item.link?.text && (
          <div className="absolute inset-0 z-30 flex items-center justify-center px-10 md:px-20 pointer-events-none">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={index === currentIndex ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`text-white font-light text-center tracking-[0.2em] uppercase
                ${isMobile 
                  ? "text-[18px] leading-tight max-w-[280px]" 
                  : "text-[32px] md:text-[42px] leading-normal max-w-4xl" 
                }`}
            >
              {item.link.text}
              <div className="w-12 h-[1px] bg-white/50 mx-auto mt-4 md:mt-6"></div>
            </motion.div>
          </div>
        )}
      </motion.div>
    ));
  };

  // --- 子组件: 固定标题 ---
  const FixedTitle = ({ isMobile = false }) => {
    if (!hasGlobalTitle) return null;
    
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center px-6 md:px-20 pointer-events-none">
        <div 
          className={`text-white font-light text-center tracking-[0.2em] uppercase
            ${isMobile 
              ? "text-[28px] leading-tight max-w-[320px]" 
              : "text-[42px] md:text-[64px] lg:text-[82px] leading-[1.1] max-w-6xl" 
            }`}
        >
          <PrismicRichText field={slice.primary.title} />
          <div className="w-20 h-[1px] bg-white/50 mx-auto mt-6 md:mt-10"></div>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full relative bg-transparent"
    >
      {/* 1. 桌面端布局 - 2/3 视口高度 */}
      <div className="hidden md:block w-full relative h-[66.667vh] overflow-hidden">
        {renderSlides(false)}
        {/* 固定标题层 */}
        <FixedTitle isMobile={false} />
        {/* 覆盖渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none z-20" />
        <NavigationButtons />
      </div>

      {/* 2. 移动端布局 - 铺满顶部 */}
      <div className="md:hidden w-full relative h-[80vh] overflow-hidden">
        {renderSlides(true)}
        {/* 固定标题层 */}
        <FixedTitle isMobile={true} />
        {/* 渐变层增强沉浸感 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none z-20" />

        {/* 左右按钮 */}
        <NavigationButtons />

        {/* 底部指示器 - 放在 80vh 底部上方 */}
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 ${
                  index === currentIndex ? 'bg-[color:var(--brand-gold)] w-8 h-[2px]' : 'bg-white/40 w-4 h-[2px]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default HomeCarousel;