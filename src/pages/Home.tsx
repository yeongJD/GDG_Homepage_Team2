import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animations';
import homeBackground from '@/assets/images/home_background.png';

const Home = () => {
  return (
    <>
      {/* 배경 레이어 - 헤더 뒤까지 덮음 */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBackground})` }}
      />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center"
        >
          <motion.h1
            variants={slideUp}
            className="text-5xl font-bold text-grey-12 mb-4"
          >
            Welcome to GDG
          </motion.h1>
          <motion.p
            variants={slideUp}
            className="text-xl text-grey-7 mb-8"
          >
            Google Developer Group Homepage
          </motion.p>
          <motion.button
            variants={slideUp}
            className="btn-primary"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default Home;