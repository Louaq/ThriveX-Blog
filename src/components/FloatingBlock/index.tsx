'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { IoArrowUpOutline } from 'react-icons/io5';

const FloatingBlock = () => {
  const [isDragging, setIsDragging] = useState(false); // 拖拽状态
  const constraintsRef = useRef(null); // 拖拽约束参考

  // 处理拖拽开始
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    // 延迟重置拖拽状态，避免立即触发点击事件
    setTimeout(() => setIsDragging(false), 100);
  };

  // 返回顶部功能
  const onReturnTop = () => {
    if (isDragging) return; // 如果正在拖拽，不触发返回顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        className="absolute pointer-events-auto"
        initial={{ bottom: 180, right: 60 }}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05, zIndex: 1000 }}
        style={{
          cursor: isDragging ? 'grabbing' : 'pointer',
        }}
      >
        {/* 返回顶部按钮 */}
        <motion.div
          whileHover={{ scale: isDragging ? 1 : 1.1 }}
          whileTap={{ scale: isDragging ? 1 : 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Button
            isIconOnly
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full"
            onPress={onReturnTop}
            aria-label="返回顶部"
            title="返回顶部"
            style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
          >
            <IoArrowUpOutline className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FloatingBlock;
