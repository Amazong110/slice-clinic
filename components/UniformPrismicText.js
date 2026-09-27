'use client'

import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const UniformPrismicText = ({
  field,
  className = "",
  as: Component = "div",
  center = false,
  white = false, // 新增参数：专门用于 Hero 等深色背景
  ...props
}) => {
  const baseClasses = "prose prose-none max-w-none"
  
  // 核心修改：如果 white 为 true，强制覆盖正文颜色为白色
  // 使用 prose-p:!text-white 来确保优先级高于默认的 prose-p:text-black
  const colorClasses = [
    // 标题颜色：浅色背景用 Deep green，深色背景用 White（通过 white 参数控制）
    white
      ? "prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-h5:text-white prose-h6:text-white"
      : "prose-h1:text-[color:var(--brand-heading)] prose-h2:text-[color:var(--brand-heading)] prose-h3:text-[color:var(--brand-heading)] prose-h4:text-[color:var(--brand-heading)] prose-h5:text-[color:var(--brand-heading)] prose-h6:text-[color:var(--brand-heading)]",
    
    // 根据 white 参数切换正文颜色 - 浅色背景字体颜色：Grey
    white 
      ? "prose-p:!text-white prose-li:!text-white prose-blockquote:!text-white !text-white" 
      : "prose-p:text-[color:var(--brand-body)] prose-li:text-[color:var(--brand-body)] prose-blockquote:text-[color:var(--brand-body)] text-[color:var(--brand-body)]",
      
    className
  ].join(" ")

  // 标题字体：LibreBaskerville，正文和链接字体：Montserrat
  const h1Classes = "prose-h1:font-heading prose-h1:text-xl sm:prose-h1:text-3xl md:prose-h1:text-5xl prose-h1:leading-tight prose-h1:tracking-tight prose-h1:font-bold"
  const h2Classes = "prose-h2:font-heading prose-h2:text-lg sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:leading-tight prose-h2:font-bold"
  const h3Classes = "prose-h3:font-heading prose-h3:text-base sm:prose-h3:text-lg md:prose-h3:text-xl prose-h3:leading-tight prose-h3:font-bold"
  const otherHeadingsClasses = "prose-h4:font-heading prose-h4:text-base md:prose-h4:text-lg prose-h4:font-bold prose-h5:font-heading prose-h5:text-sm md:prose-h5:text-base prose-h5:font-bold prose-h6:font-heading prose-h6:text-xs md:prose-h6:text-sm prose-h6:font-bold"
  const textElementClasses = "prose-p:font-sans prose-p:text-base sm:prose-p:text-lg md:prose-p:text-xl prose-p:leading-relaxed prose-li:font-sans prose-li:text-base sm:prose-li:text-lg md:prose-li:text-xl prose-li:font-light prose-blockquote:border-l-[color:var(--brand-gold)] prose-blockquote:italic prose-blockquote:font-sans"
  const linkClasses = "prose-a:text-[color:var(--brand-accent)] prose-a:font-sans prose-a:font-normal prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-opacity-80 transition-colors"
  const alignmentClasses = center ? "text-center" : "text-left"

  const combinedClasses = [
    baseClasses,
    colorClasses,
    h1Classes,
    h2Classes,
    h3Classes,
    otherHeadingsClasses,
    textElementClasses,
    linkClasses,
    alignmentClasses,
    "prose-strong:font-bold prose-strong:text-inherit",
    "prose-em:italic"
  ].filter(Boolean).join(" ")

  return (
    <Component className={combinedClasses} {...props}>
      <PrismicRichText field={field} />
    </Component>
  )
}

export default UniformPrismicText