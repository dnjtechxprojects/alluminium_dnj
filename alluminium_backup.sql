--
-- PostgreSQL database dump
--

\restrict 8szzA3LKqX5uYSakneaLc5XJV7HSEF35LAJfRKWbvEf9ybcSKaMDYYVSUj7gp6F

-- Dumped from database version 14.23 (Ubuntu 14.23-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.23 (Ubuntu 14.23-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ProductPage; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProductPage" AS ENUM (
    'DIEMANUFACTURING',
    'EXTRUDEDPRODUCTS',
    'FABRICATION',
    'NEWALLOY'
);


ALTER TYPE public."ProductPage" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Blog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Blog" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    excerpt text,
    slug text NOT NULL,
    image text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Blog" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    page public."ProductPage" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Blog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Blog" (id, title, content, excerpt, slug, image, "createdAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, title, slug, description, image, page, "createdAt") FROM stdin;
cmlqg52y30005qhuq2ze7snys	Die Manufacturing	Efficient Die Production with Short Lead Times	At Natraj Aluform, we recognize the importance of speed and efficiency in die manufacturing. To meet the dynamic needs of our clients, we ensure a lead time of just 2-4 weeks for die production. This swift turnaround time allows us to deliver solutions quickly, without compromising on quality, ensuring that extrusion operations proceed seamlessly and without delay.	1771323266612-nl6tujw63ek.jpg	DIEMANUFACTURING	2026-02-17 10:14:30.699
cmlqg79on0006qhuq8jzrgd6e	State-of-the-Art Die Manufacturing Facilities	state-of-the-art-die-manufacturing-facilities	At Natraj Aluform, we have invested in world-class facilities that enhance our ability to deliver premium-quality dies efficiently and reliably. Our plants are equipped with dedicated die repair shops to ensure that any required maintenance or modifications are handled swiftly, reducing downtime and keeping our extrusion operations running smoothly.\nIn addition, we operate a Central Die Shop at our factory, a state-of-the-art manufacturing hub that plays a critical role in supporting our extensive die manufacturing capabilities. This central facility is designed to streamline our operations, allowing us to manage high production volumes while maintaining precision and quality. Our factory serves as a cornerstone of our die manufacturing operations, enabling us to meet the diverse and growing needs of our clients.	1771323369884-j9x0jdxvvom.jpg	DIEMANUFACTURING	2026-02-17 10:16:12.743
cmlqf41l70001qhqxjj5hlmg9	Natraj Aluform	Precision, Innovation, and Unmatched Capability	At Natraj Aluform, precision is at the core of everything we do. Our advanced aluminum extrusion processes are powered by cutting-edge technology and a deep commitment to excellence, enabling us to deliver top-tier accuracy and quality. Utilizing state-of-the-art laser technology, we ensure exceptional tolerance in every product we manufacture, meeting the most stringent specifications across a wide range of industries.\nWe pride ourselves on our ability to produce custom cut lengths that are specifically tailored to meet the unique requirements of each client. Whether it’s for transportation, aerospace, electronics, or renewable energy, our ability to provide custom profiles makes us the go-to partner for those seeking innovative, high-performance aluminum solutions.	1771321537080-lnaiwaakk6n.jpg	EXTRUDEDPRODUCTS	2026-02-17 09:45:42.667
cmlqfceq80003qhqx02m3oasc	Annual Production Capacity: 36,000 Tons	Homogenized Casting Billet for Superior Performance	Natraj Aluform boasts a formidable production capacity of 36,000 tons per year, making us one of the leading aluminum extrusion manufacturers in the industry. This scale of production enables us to fulfill high-volume orders while maintaining the highest standards of quality and precision.\nWe employ a continuous in-house homogenized casting process that ensures optimal performance during the extrusion process. This cutting-edge technology allows us to produce billets with uniform composition, enhancing the mechanical properties and consistency of the extrusions. By focusing on ultra-performance billets, we ensure that our products perform reliably across diverse industrial applications.	1771321929929-yq4x99a9lz8.jpg	EXTRUDEDPRODUCTS	2026-02-17 09:52:12.944
cmlqfe9tn0004qhqx4vmgxjnj	End-to-End Traceability for Assured Quality	end-to-end-traceability-for-assured-quality	Quality control is a cornerstone of our operations at Natraj Aluform. We offer end-to-end traceability throughout the entire extrusion process, from raw material sourcing to final delivery. This ensures that each product is manufactured to the highest standards and can be tracked throughout its lifecycle, giving our clients peace of mind and confidence in the quality and reliability of our extrusions.	1771322015566-8u6ua2u13mf.jpg	EXTRUDEDPRODUCTS	2026-02-17 09:53:39.898
cmlqfpn4w0000qhuqb7c18o3u	Natraj Aluform	Precision and Quality at the Core of Our Extrusion Process	At Natraj Aluform, the foundation of our aluminum extrusion process lies in the exceptional quality of our in-house cast billets. We pride ourselves on offering a comprehensive and flexible billet casting operation that allows for the customization of alloys to meet even the most specific client requirements. Our unwavering commitment to quality, coupled with cutting-edge technology, ensures that every billet we produce adheres to the highest industry standards, supporting a broad spectrum of applications across various industries.	1771322546840-lbzqo0wkksf.jpg	NEWALLOY	2026-02-17 10:02:30.365
cmlqfunvu0002qhuqe3t0ewdy	Casting Length	Quality Assurance Technologies	Our billets are cast up to a length of 6000 mm, providing the versatility required for different industrial applications, ensuring both flexibility and consistency in supply.\nEnsuring the highest level of purity and quality in our billets is paramount. That’s why we utilize industry-leading technologies such as ALSCAN and PoDFA (Porous Disc Filtration Analysis) to assess the purity of the aluminum during the casting process. These technologies enable us to detect and mitigate impurities, ensuring that every billet meets the highest metallurgical standards.	1771322781546-crhajmhogra.jpg	NEWALLOY	2026-02-17 10:06:24.587
cmlqg3f5v0004qhuqlqc4pxfi	Natraj Aluform	Precision and Innovation in Every Project	At Natraj Aluform, die manufacturing is at the heart of our extrusion process, ensuring that every product we deliver meets the highest standards of precision and quality. Our die manufacturing capabilities are driven by a relentless commitment to innovation, technical expertise, and customer satisfaction. We understand that each extrusion project has unique requirements, and our skilled design and development team works meticulously to ensure that every extrusion die is crafted with care and precision, aligning perfectly with the specific objectives of our clients.\nOur focus on exceeding customer expectations extends across all areas of die manufacturing, from design to execution, ensuring that our solutions are both technologically advanced and cost-effective. This focus has earned us a reputation as a trusted partner in the aluminum extrusion industry, delivering high-quality dies that support a diverse range of applications.	1771323190390-7rw8d63cvn.jpg	DIEMANUFACTURING	2026-02-17 10:13:13.191
cmlqfs8rw0001qhuqakp451zf	Annual Production Capacity	Billet Diameters	With an impressive annual production capacity of 45,000 tons, our billet casting operations are designed to handle high-volume demands while maintaining exceptional quality control throughout the process.\nTo accommodate a wide variety of extrusion profiles, we offer billet diameters ranging from 5 inches to 20 inches. This flexibility ensures that we can support a wide array of extrusion needs, from lightweight profiles to larger, more robust designs.	1771322660008-95vilr8n48.jpg	NEWALLOY	2026-02-17 10:04:31.724
cmlqf6q530002qhqxv9zdf5l2	Extrusion Division	Pushing the Boundaries of Technological Advancement	Our extrusion division exemplifies technological advancement and continuous innovation. We operate multiple production plants, each equipped with advanced machinery and processes designed to handle a wide variety of extrusion requirements. With press sizes ranging from 5 inches to 17 inches, including India’s largest extrusion press at 75 MN, we have the capability to meet the most demanding industrial applications with unmatched precision and efficiency.\nOur facilities are designed to optimize every aspect of the extrusion process, from material preparation to final production. By leveraging advanced design and development capabilities, we create custom solutions that not only meet but exceed industry standards, delivering products that set new benchmarks for performance and reliability.	1771321664042-2x95tjva9vv.jpg	EXTRUDEDPRODUCTS	2026-02-17 09:47:47.799
cmlqgheqb0008qhuq67xqa2fx	Natraj Aluform	Precision Craftsmanship for Diverse Applications	At Natraj Aluform, aluminum fabrication is more than just a process it's a craft. Our approach to aluminum fabrication reflects our commitment to precision, innovation, and excellence, ensuring that every product we create meets the highest standards of quality and performance. With extensive expertise in custom fabrication, we are equipped to serve a wide range of industries, offering tailor-made solutions that address the unique needs of each project.	1771323840651-gnpuv87tsfe.jpg	FABRICATION	2026-02-17 10:24:05.843
cmlqgjzxy0009qhuq29g44hbj	Welding and Joining	welding-and-joining	Welding is a critical part of aluminum fabrication, and at Natraj Aluform, we use a range of advanced welding techniques to join aluminum components with exceptional strength and durability. Our team of certified welders employs methods such as MIG (Metal Inert Gas) and TIG (Tungsten Inert Gas) welding, ensuring that the welded joints are of the highest quality, free from defects, and able to withstand heavy usage and stress.\nIn addition to traditional welding, we also offer mechanical joining techniques, such as riveting and fastening, to provide versatile solutions for applications where welding may not be ideal.	1771323963197-ssfnod4bw2k.jpg	FABRICATION	2026-02-17 10:26:06.612
cmlqglq0g000aqhuqe1864gmv	Machining and Precision Engineering	machining-and-precision-engineering	Natraj Aluform is equipped with a wide array of CNC machining tools that allow us to fabricate complex parts with tight tolerances. Our machining capabilities include milling, drilling, turning, and tapping, which enables us to manufacture intricate components with high precision. These precision-engineered parts are ideal for industries like aerospace, electronics, and automotive, where accuracy and quality are critical.	1771324037208-cbmeua6ewb9.jpg	FABRICATION	2026-02-17 10:27:27.088
cmlqgnvfg000bqhuqu015lyp8	Commitment to Sustainability	commitment-to-sustainability	At Natraj Aluform, we take pride in our commitment to sustainability and responsible manufacturing. Our aluminum fabrication processes are designed to minimize waste and reduce energy consumption, helping us lower our environmental footprint. By recycling aluminum scrap and utilizing sustainable production methods, we contribute to the circular economy while delivering high-quality, eco-friendly products to our customers.\n\nOur dedication to sustainability is reflected in our use of recycled aluminum, which reduces the need for virgin materials and decreases the environmental impact of our production processes. In addition, our energy-efficient manufacturing practices ensure that we remain at the forefront of environmentally responsible fabrication.\n\n	1771324144315-vy0vptnnh7.jpg	FABRICATION	2026-02-17 10:29:07.42
cmlqg93kt0007qhuqf1m4nb5n	Commitment to Excellence	commitment-to-excellence	Our commitment to excellence in die manufacturing is evident in every project we undertake. From the initial design phase to the final product, our team works closely with customers to ensure that their specific requirements are met with precision and attention to detail. We prioritize customer satisfaction above all, continuously striving to exceed expectations by delivering products that are not only technically superior but also reliable and durable.\nBy focusing on precision, speed, and innovation, Natraj Aluform has established itself as a leader in the die manufacturing industry. Our technological expertise, combined with a dedication to quality and efficiency, ensures that we remain a trusted partner for clients seeking the very best in aluminum extrusion solutions.	1771323454932-sbx5mmpq6id.jpg	DIEMANUFACTURING	2026-02-17 10:17:38.141
cmlqfvv0p0003qhuq54gtpew8	Ultrasonic Testing	ultrasonic-testing	To further guarantee the structural integrity of our billets, we perform Ultrasonic Testing. This advanced testing method ensures that each billet is free from internal defects, providing the reliability and consistency that our clients have come to expect from Natraj Aluform. Ultrasonic testing is crucial in ensuring that our billets are not only high in purity but also structurally sound, making them suitable for even the most demanding applications.	1771322837650-95ge8u32im7.jpg	NEWALLOY	2026-02-17 10:07:20.521
cmlqfgvkv0005qhqx1ki39g52	Custom Profile Production	custom-profile-production	Our expertise in custom profile production allows us to serve a wide range of industries, including transportation, aerospace, electronics, and renewable energy. Whether you need lightweight solutions for the automotive sector or high-strength components for defense and aerospace applications, Natraj Aluform is equipped to provide tailored extrusion solutions that meet the unique challenges of your industry\nWe pride ourselves on our ability to push the boundaries of aluminum extrusion, offering solutions that are highly specialized, cost-effective, and technologically advanced. Our clients rely on us to deliver precision-engineered products that meet their exacting requirements, and we consistently deliver on that promise.	1771322137715-5fv9hqqztk4.jpg	EXTRUDEDPRODUCTS	2026-02-17 09:55:41.38
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, password, "createdAt", "updatedAt") FROM stdin;
cmjr13mrl0000qhasgi6y8k8z	test@gmail.com	test	2025-12-29 10:41:50.337	2025-12-29 10:41:50.337
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
06dd058d-503f-48e4-a746-758ddace497b	4ec6a2f3f41928ed4bbb23fa18df00a5dc0e223b02949747c94c127b278e9ca0	2025-12-26 11:22:05.213812+00	20251226112205_new	\N	\N	2025-12-26 11:22:05.167946+00	1
\.


--
-- Name: Blog Blog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Blog_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Blog_slug_key" ON public."Blog" USING btree (slug);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- PostgreSQL database dump complete
--

\unrestrict 8szzA3LKqX5uYSakneaLc5XJV7HSEF35LAJfRKWbvEf9ybcSKaMDYYVSUj7gp6F

