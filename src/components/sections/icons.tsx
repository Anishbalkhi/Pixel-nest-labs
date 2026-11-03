import {
  Brain,
  Cloud,
  Coffee,
  GraduationCap,
  Megaphone,
  Microscope,
  ShoppingBag,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import type { Product, Service } from "@/content/site";

export const serviceIcons: Record<Service["icon"], typeof Brain> = {
  megaphone: Megaphone,
  shopping: ShoppingBag,
  cloud: Cloud,
  brain: Brain,
  coffee: Coffee,
};

export const productIcons: Record<Product["icon"], typeof Brain> = {
  microscope: Microscope,
  users: Users,
  utensils: UtensilsCrossed,
  graduation: GraduationCap,
};
