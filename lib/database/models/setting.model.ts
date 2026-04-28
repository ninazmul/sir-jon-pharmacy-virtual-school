import { Document, Schema, Types, model, models } from "mongoose";

export interface IFeedback {
  name?: string;
  photo?: string;
  rating?: number;
  comment?: string;
}

export interface ITestimonial {
  badge?: string;
  title?: string;
  description?: string;
  totalEnrollment?: number;
  totalSucceededStudents?: number;
  totalIndustryExperts?: number;
  feedbacks?: IFeedback[];
}

export interface IFaqItem {
  question?: string;
  answer?: string;
}

export interface IFaq {
  badge?: string;
  title?: string;
  description?: string;
  items?: IFaqItem[];
}

export interface IFeatureItem {
  title?: string;
  description?: string;
  icon?: string;
}

export interface IFeatures {
  badge?: string;
  title?: string;
  description?: string;
  items?: IFeatureItem[];
}

export interface ILogo {
  name?: string;
  photo?: string;
}

export interface ISetting extends Document {
  _id: Types.ObjectId;

  // Branding & Contact
  logo?: string;
  favicon?: string;
  name?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;

  // Social Media
  facebook?: string;
  instagram?: string;
  twitter?: string;
  facebookGroup?: string;
  youtube?: string;

  // Policies
  returnPolicy?: string;
  termsOfService?: string;
  privacyPolicy?: string;

  // Hero Section
  hero?: {
    title?: string;
    description?: string;
    image?: string;
    offerStartDate?: string;
    offerEndDate?: string;
  };

  // PopUp Section
  popup?: {
    image?: string;
    offerStartDate?: string;
    offerEndDate?: string;
  };

  certificate?: string;

  // Features (single object with arrays inside)
  features?: IFeatures;

  // Testimonials (single object with feedbacks array)
  testimonials?: ITestimonial;

  // FAQs (single object with items array)
  faqs?: IFaq;

  maintenanceMode?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISettingSafe {
  _id: string;

  // Branding & Contact
  logo?: string;
  favicon?: string;
  name?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;

  // Social Media
  facebook?: string;
  instagram?: string;
  twitter?: string;
  facebookGroup?: string;
  youtube?: string;

  // Policies
  returnPolicy?: string;
  termsOfService?: string;
  privacyPolicy?: string;

  // Hero Section
  hero?: {
    title?: string;
    description?: string;
    image?: string;
    offerStartDate?: string;
    offerEndDate?: string;
  };

  // PopUp Section
  popup?: {
    image?: string;
    offerStartDate?: string;
    offerEndDate?: string;
  };

  certificate?: string;

  // Features
  features?: {
    badge?: string;
    title?: string;
    description?: string;
    items?: {
      title?: string;
      description?: string;
      icon?: string;
    }[];
  };

  // Testimonials
  testimonials?: {
    badge?: string;
    title?: string;
    description?: string;
    totalEnrollment?: number;
    totalSucceededStudents?: number;
    totalIndustryExperts?: number;
    feedbacks?: {
      name?: string;
      photo?: string;
      rating?: number;
      comment?: string;
    }[];
  };

  // FAQs
  faqs?: {
    badge?: string;
    title?: string;
    description?: string;
    items?: {
      question?: string;
      answer?: string;
    }[];
  };

  maintenanceMode?: boolean;

  createdAt: string;
  updatedAt: string;
}

const FeatureItemSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
  },
  { _id: false },
);

const SettingSchema = new Schema<ISetting>(
  {
    logo: { type: String },
    favicon: { type: String },
    name: { type: String },
    tagline: { type: String },
    description: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },

    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    facebookGroup: { type: String },
    youtube: { type: String },

    returnPolicy: { type: String },
    termsOfService: { type: String },
    privacyPolicy: { type: String },

    hero: {
      title: { type: String },
      description: { type: String },
      image: { type: String },
      offerStartDate: { type: String, default: "" },
      offerEndDate: { type: String, default: "" },
    },

    popup: {
      image: { type: String },
      offerStartDate: { type: String, default: "" },
      offerEndDate: { type: String, default: "" },
    },

    certificate: { type: String },

    features: {
      badge: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },

      items: {
        type: [FeatureItemSchema],
        default: [],
      },
    },

    testimonials: {
      badge: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      totalEnrollment: { type: Number, default: 0 },
      totalSucceededStudents: { type: Number, default: 0 },
      totalIndustryExperts: { type: Number, default: 0 },
      feedbacks: [
        {
          name: { type: String, default: "" },
          photo: { type: String, default: "" },
          rating: { type: Number, default: 0 },
          comment: { type: String, default: "" },
        },
      ],
    },

    faqs: {
      badge: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      items: [
        {
          question: { type: String, default: "" },
          answer: { type: String, default: "" },
        },
      ],
    },

    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Setting = models.Setting || model<ISetting>("Setting", SettingSchema);
export default Setting;
