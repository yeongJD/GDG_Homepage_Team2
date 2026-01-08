import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animations';

const Intro = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.h1
          variants={slideUp}
          className="text-4xl font-bold text-grey-12 mb-4"
        >
          소개
        </motion.h1>
        <motion.p
          variants={slideUp}
          className="text-lg text-grey-7"
        >
          GDG 소개 페이지입니다.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Intro;
