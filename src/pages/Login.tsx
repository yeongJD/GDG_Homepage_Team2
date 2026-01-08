import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animations';

const Login = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-md mx-auto"
      >
        <motion.h1
          variants={slideUp}
          className="text-4xl font-bold text-grey-12 mb-8 text-center"
        >
          로그인
        </motion.h1>
        <motion.div
          variants={slideUp}
          className="bg-grey-1 p-8 rounded-lg"
        >
          <p className="text-center text-grey-7">
            로그인 페이지입니다.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
