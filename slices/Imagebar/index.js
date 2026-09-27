'use client'

import React from 'react'
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next'
import { motion } from 'framer-motion'
import UniformPrismicText from "../../components/UniformPrismicText"

const Imagebar = ({ slice }) => {
  const images = slice.primary.images || []
  const imageCount = images.length

  // 根据图片数量决定 Grid 布局
  let gridClasses;

  if (imageCount === 3) {
    // 3张图：2列2行布局，左侧跨2行
    gridClasses = "grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6";
  } else if (imageCount === 1) {
    // 1张图：全屏显示
    gridClasses = "grid grid-cols-1 gap-6";
  } else {
    // 2, 4, 5+张图的通用布局
    // 手机端1列，平板端2列
    gridClasses = "grid grid-cols-1 sm:grid-cols-2 gap-6";

    if (imageCount >= 5) {
      // 5张及以上：桌面端3列
      gridClasses += " lg:grid-cols-3";
    }
  }
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-transparent"
    >
      <div className="px-6 max-w-6xl mx-auto">
        
        {/* 标题区域 */}
        {slice.primary.heading && (
          <div className="mb-14 text-center">
            <UniformPrismicText field={slice.primary.heading} center />
            <div className="border-t-2 border-[#6bd3ef] w-16 mx-auto mt-5"></div>
          </div>
        )}

        <div className={gridClasses}>
          {images.map((item, index) => {
            // 3张图模式下的逻辑判断
            const isFirstInThree = imageCount === 3 && index === 0;

            return (
              <motion.div
                key={index}
                className={`group relative bg-white overflow-hidden rounded-sm transition-all duration-500
                  hover:shadow-2xl hover:-translate-y-1 shadow-md
                  ${isFirstInThree ? "md:row-span-2 h-full" : "h-full"}
                `}
              >
                <PrismicNextLink field={item.button_link} className="block w-full h-full">
                  <div className={`relative w-full overflow-hidden 
                    ${isFirstInThree 
                      ? "aspect-[4/5] md:aspect-auto md:h-full" // 左侧大图：手机端4:5，桌面端自适应高度平齐
                      : "aspect-[3/2]" // 右侧小图：标准比例
                    }
                  `}>
                    <PrismicNextImage 
                      field={item.image} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={item.image.alt || ""}
                    />
                    
                    {/* 黑色半透明遮罩 - 初始透明度极低，悬浮加深 */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500 z-10" />

                    {/* 按钮文本 - 只有在有文字时显示 */}
                    {item.button_link?.text && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                        <span className="text-white text-xs md:text-sm font-medium tracking-[0.2em] uppercase border border-white/40 bg-black/20 backdrop-blur-[2px] px-5 py-2.5 transition-all duration-300 group-hover:bg-[color:var(--brand-gold)] group-hover:border-[color:var(--brand-gold)]">
                          {item.button_link.text}
                        </span>
                      </div>
                    )}
                  </div>
                </PrismicNextLink>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default Imagebar