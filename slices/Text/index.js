'use client'

import React from 'react'
import { PrismicNextLink } from '@prismicio/next'
import { motion } from 'framer-motion'
import UniformPrismicText from "../../components/UniformPrismicText";

const Text = ({ slice }) => {
  // 根据 Prismic 设置判断是否居中
  const isCentered = slice.primary.align_center === true;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full bg-transparent 
        ${slice.primary.padding === 'Both' ? 'py-12 lg:py-20' : slice.primary.padding === 'Top' ? 'pt-12 lg:pt-20' : 'pb-12 lg:pb-20'} 
        ${isCentered ? 'text-center' : 'text-left'} 
      `}
    >
      <div className="px-6 lg:px-20 max-w-7xl mx-auto">
        <div className={`flex flex-col ${isCentered ? 'items-center' : 'items-start'} justify-center`}>
          
          {/* 文本内容区域 */}
          <div className="w-full">
            <div className={`prose-h2:leading-tight prose-h3:leading-tight prose-p:leading-relaxed text-lg max-w-none 
              prose prose-h1:text-black prose-h2:text-black prose-h3:text-black prose-p:text-gray-800 
              prose-strong:text-[color:var(--brand-gold)] prose-a:text-[color:var(--brand-gold)] prose-a:hover:underline
              ${isCentered ? 'prose-headings:mx-auto' : ''}`}>
              <UniformPrismicText field={slice.primary.text} center={isCentered} />
            </div>
          </div>

          {/* 按钮区域 - 条件渲染 & 间距控制 */}
          {slice.primary.button_link && slice.primary.button_link.text && (
            <div className="mt-10 w-full flex justify-inherit">
              <PrismicNextLink 
                field={slice.primary.button_link}
                className={`inline-block bg-[color:var(--brand-gold)] border border-[color:var(--brand-gold)] px-10 py-3.5 text-[12px] uppercase tracking-[0.2em] font-semibold text-white 
                  hover:bg-white hover:text-[color:var(--brand-gold)] transition-all duration-300 shadow-sm active:scale-95
                  ${isCentered ? 'mx-auto' : ''}`}
              >
                {slice.primary.button_link.text}
              </PrismicNextLink>
            </div>
          )}

        </div>
      </div>
    </motion.section>
  )
}

export default Text;