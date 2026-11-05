import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoughEase } from 'gsap/EasePack';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, RoughEase, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
