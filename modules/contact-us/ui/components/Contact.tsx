"use client";

import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

import { createInquiry } from "@/modules/admin/inquiries/server/actions";
import { InquirySchema } from "@/modules/admin/inquiries/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ContactUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof InquirySchema>>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      intrest: "",
      message: "",
    },
  });

  useGSAP(
    () => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Form animation
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll(".form-element");
        gsap.from(formElements, {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      // Contact info animation
      if (infoRef.current) {
        const infoItems = infoRef.current.querySelectorAll(".info-item");
        gsap.from(infoItems, {
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // Map animation
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    },
    { scope: sectionRef }
  );

  const onSubmit = async (values: z.infer<typeof InquirySchema>) => {
    setIsSubmitting(true);
    try {
      const result = await createInquiry(values);

      if (result.success) {
        toast.success("Thank you! Your message has been sent successfully.");
        setIsSubmitted(true);
        form.reset();
      } else {
        toast.error(
          result.error || "Failed to submit inquiry. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="bg-ivory py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold">
            Contact Us
          </h2>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-5">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
            <p className="text-green-800 font-medium">
              Thank you! Your message has been sent successfully. We&apos;ll get
              back to you soon.
            </p>
          </div>
        )}

        {/* Form and Contact Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 md:mb-20">
          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
              <h3 className="form-element text-ebony text-2xl md:text-3xl font-bold mb-2">
                Get in Touch
              </h3>
              <p className="form-element text-pewter text-base mb-8">
                We&apos;d love to hear from you. Please fill out this form and
                we&apos;ll get back to you as soon as possible.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="form-element">
                          <FormLabel className="text-ebony text-sm font-semibold mb-2">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-green transition-all duration-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="form-element">
                          <FormLabel className="text-ebony text-sm font-semibold mb-2">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-green transition-all duration-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Phone and Interest */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="form-element">
                          <FormLabel className="text-ebony text-sm font-semibold mb-2">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Your phone number"
                              {...field}
                              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-green transition-all duration-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="intrest"
                      render={({ field }) => (
                        <FormItem className="form-element">
                          <FormLabel className="text-ebony text-sm font-semibold mb-2">
                            Interest of Service
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What service are you interested in?"
                              {...field}
                              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-green transition-all duration-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="form-element">
                        <FormLabel className="text-ebony text-sm font-semibold mb-2">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            rows={10}
                            {...field}
                            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-green transition-all duration-300 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="form-element">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex cursor-pointer items-center gap-2 px-8 py-3 bg-teal-green text-white font-semibold rounded-lg hover:bg-turquoise-blue transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                      {isSubmitting ? "Sending..." : "Send Request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
              <h3 className="text-ebony text-2xl font-bold mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="info-item flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-teal-green/10 flex items-center justify-center shrink-0 group-hover:bg-teal-green/20 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-teal-green" />
                  </div>
                  <div>
                    <h4 className="text-ebony font-semibold mb-1">Address:</h4>
                    <p className="text-pewter text-sm leading-relaxed">
                      Plot No. 5/12, Road No. 7,
                      <br />
                      Opp Fire Station, GIDC,
                      <br />
                      Sarigam-396155, Gujarat, INDIA
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="info-item flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-teal-green/10 flex items-center justify-center shrink-0 group-hover:bg-teal-green/20 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-teal-green" />
                  </div>
                  <div>
                    <h4 className="text-ebony font-semibold mb-1">Phone:</h4>
                    <a
                      href="tel:+919825886288"
                      className="text-pewter text-sm hover:text-teal-green transition-colors duration-300 block"
                    >
                      (+91) 982 588 6288
                    </a>
                    <a
                      href="tel:+918511710167"
                      className="text-pewter text-sm hover:text-teal-green transition-colors duration-300 block"
                    >
                      (+91) 851 171 0167
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="info-item flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-teal-green/10 flex items-center justify-center shrink-0 group-hover:bg-teal-green/20 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-teal-green" />
                  </div>
                  <div>
                    <h4 className="text-ebony font-semibold mb-1">Email:</h4>
                    <a
                      href="mailto:info@gyangroup.in"
                      className="text-teal-green text-sm hover:text-turquoise-blue transition-colors duration-300"
                    >
                      info@gyangroup.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div ref={mapRef} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <h3 className="text-teal-green text-2xl md:text-3xl font-bold text-center mb-6">
            Find Us on Google Maps
          </h3>
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1214.5322443730358!2d72.85285!3d20.289094!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0d302a70efa6d%3A0x4a9971325fa7e1a7!2sReliable%20Life%20Science!5e1!3m2!1sen!2sin!4v1764760011379!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Reliable Life Science Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
