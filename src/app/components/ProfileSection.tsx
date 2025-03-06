import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileSectionProps {
  description: string;
}

const ProfileSection = ({ description }: ProfileSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative flex flex-col sm:flex-row items-center justify-center"
    >
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
        <Image
          src="/img/pp.svg"
          alt="Profile"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="mt-6">
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProfileSection; 