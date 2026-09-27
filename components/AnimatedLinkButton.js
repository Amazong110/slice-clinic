'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { PrismicNextLink } from '@prismicio/next'

// 定义链接按钮的基础动画变体
const linkButtonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
    transition: { 
      duration: 0.2,
      yoyo: Infinity,
      yoyoOffset: 0.1
    }
  },
  tap: { 
    scale: 0.95
  }
}

const AnimatedLinkButton = ({ field, children, className = "", ...props }) => {
  return (
    <PrismicNextLink field={field} className="inline-block" {...props}>
      <motion.div
        variants={linkButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`relative overflow-hidden whitespace-nowrap ${className}`} // 添加whitespace-nowrap
      >
        {children}
      </motion.div>
    </PrismicNextLink>
  )
}

export default AnimatedLinkButton