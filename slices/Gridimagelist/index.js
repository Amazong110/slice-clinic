'use client'

import React from 'react'
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { motion } from 'framer-motion'

const Gridimagelist = ({ slice }) => {
  const items = slice.primary.groups || []

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-transparent py-12 md:py-24"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
          {items.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col space-y-6 group"
            >
              {/* 修改点：只有当图片 URL 存在时才渲染这个 div 容器 */}
              {item.image && item.image.url && (
                <div className="relative overflow-hidden aspect-[4/3]">
                  <PrismicNextImage 
                    field={item.image} 
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
              )}

              {/* 文字区域 */}
              <div className="flex flex-col items-start px-2">
                <div className="prose prose-sm md:prose-base max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light mb-6">
                  <PrismicRichText field={item.text} />
                </div>

                {/* 按钮 */}
                {item.button_link && (
                  <div className="mt-auto">
                    <PrismicNextLink 
                      field={item.button_link} 
                      className="inline-block border border-[color:var(--brand-gold)] px-8 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium text-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold)] hover:text-white transition-all duration-300"
                    >
                      {item.button_text || "Learn More"}
                    </PrismicNextLink>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Gridimagelist