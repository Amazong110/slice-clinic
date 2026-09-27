'use client'

import React from 'react'
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next'
import { motion } from 'framer-motion'

const LogoBar = ({ slice }) => {
  const logos = slice.primary.logos || []

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-transparent py-8 md:py-16"
    >
      <div className="px-4 max-w-7xl mx-auto"> {/* 稍微放大容器最大宽度 */}
        
        {/* 调整间隙：gap-2 (移动端) md:gap-4 (桌面端) */}
        <div className="grid 
          grid-cols-2       
          md:grid-cols-4    
          gap-2 md:gap-4    /* 极小的间隙让图片视觉上更紧凑、更大 */
          items-center"
        >
          {logos.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex justify-center items-center w-full"
            >
              <PrismicNextLink 
                field={item.logo_link} 
                className="w-full group transition-all duration-500 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                {/* 增加高度 h-24 -> h-32，移除 p-2 以获得最大显示面积 */}
                <div className="relative h-24 md:h-32 lg:h-40 w-full flex items-center justify-center overflow-hidden">
                  <PrismicNextImage 
                    field={item.logo_image} 
                    className="max-h-[85%] w-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
                    alt={item.logo_image?.alt || `Partner Logo ${index}`}
                  />
                </div>
              </PrismicNextLink>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default LogoBar