'use client'
import { CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1
};

export default function Loading() {
    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(2px)',
            zIndex: 9999
        }}>
            <motion.div
                initial={{ scale: 0.5, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={spinTransition}
            >
                <CircularProgress />
            </motion.div>
        </Box>
    );
}
