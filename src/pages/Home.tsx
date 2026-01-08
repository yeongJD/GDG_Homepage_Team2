import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animations';

const Home = () => {
  return (
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
  );
};

export default Home;
