--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id text NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    username character varying(120) NOT NULL,
    password text NOT NULL,
    "isVerified" boolean DEFAULT false,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: blocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blocks (
    id text NOT NULL,
    "blockerId" text NOT NULL,
    "blockedId" text NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.blocks OWNER TO postgres;

--
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id text NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date,
    "tradeId" text NOT NULL
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- Name: cryptocurrencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cryptocurrencies (
    id text NOT NULL,
    "coingeckoId" character varying(200) NOT NULL,
    symbol character varying(200) NOT NULL,
    name character varying(200) NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.cryptocurrencies OWNER TO postgres;

--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedbacks (
    id text NOT NULL,
    "vendorId" text NOT NULL,
    "traderId" text NOT NULL,
    "offerId" text NOT NULL,
    message character varying(256) NOT NULL,
    type character varying(10) NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.feedbacks OWNER TO postgres;

--
-- Name: fiats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fiats (
    id text NOT NULL,
    name character varying(30) NOT NULL,
    symbol character varying(10) NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.fiats OWNER TO postgres;

--
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    id text NOT NULL,
    name character varying(50) NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- Name: offers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offers (
    id text NOT NULL,
    "paymentMethodType" text NOT NULL,
    "tradePricingType" text NOT NULL,
    "tradePricingListAt" double precision NOT NULL,
    "tradePricingTradeLimitsMin" double precision NOT NULL,
    "tradePricingTradeLimitsMax" double precision NOT NULL,
    "tradePricingTimeLimit" double precision NOT NULL,
    "tradeInstructionsTags" text[],
    "tradeInstructionsLabel" text NOT NULL,
    "tradeInstructionsTerms" text NOT NULL,
    "tradeInstructionsInstructions" text NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date,
    "vendorId" text NOT NULL,
    "cryptocurrencyId" text NOT NULL,
    "paymentMethodId" text NOT NULL,
    "fiatId" text NOT NULL
);


ALTER TABLE public.offers OWNER TO postgres;

--
-- Name: payment_method_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_method_categories (
    id text NOT NULL,
    name character varying(60) NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.payment_method_categories OWNER TO postgres;

--
-- Name: payment_methods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_methods (
    id text NOT NULL,
    name character varying(60) NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date,
    "paymentMethodCategoryId" text NOT NULL
);


ALTER TABLE public.payment_methods OWNER TO postgres;

--
-- Name: payment_receipts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_receipts (
    id text NOT NULL,
    name character varying(60) NOT NULL,
    key text NOT NULL,
    url text NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.payment_receipts OWNER TO postgres;

--
-- Name: system_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.system_messages (
    id text NOT NULL,
    message character varying(256) NOT NULL,
    "whenSeen" timestamp(3) without time zone,
    url text NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date,
    "userId" text NOT NULL
);


ALTER TABLE public.system_messages OWNER TO postgres;

--
-- Name: trades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trades (
    id text NOT NULL,
    "paymentReceiptId" text NOT NULL,
    "vendorId" text NOT NULL,
    "traderId" text NOT NULL,
    "offerId" text NOT NULL,
    "cryptocurrencyId" text NOT NULL,
    "fiatId" text NOT NULL,
    "cryptocurrencyAmount" double precision NOT NULL,
    "fiatAmount" double precision NOT NULL,
    "startedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endedAt" timestamp(3) without time zone,
    state text NOT NULL,
    paid boolean DEFAULT false,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.trades OWNER TO postgres;

--
-- Name: trusts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trusts (
    id text NOT NULL,
    "trusterId" text NOT NULL,
    "trustedId" text NOT NULL,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.trusts OWNER TO postgres;

--
-- Name: user_languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_languages (
    "userId" text NOT NULL,
    "languageId" text NOT NULL
);


ALTER TABLE public.user_languages OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    "profileColor" character varying(10) NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    username character varying(120) NOT NULL,
    password text NOT NULL,
    "privateKeys" text[],
    "isVerified" boolean DEFAULT false,
    "isDeleted" boolean DEFAULT false,
    "whenDelete" date,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7e7dc6d0-dbe8-46c9-87b3-317c922247cf	f2c5f080e58d900c1ec763bd342d5de256abcda2cc0756ba90a2a28f3fb61732	2023-05-23 21:23:46.976231+00	20230115184402_	\N	\N	2023-05-23 21:23:46.899552+00	1
f608dcc8-7518-4aac-87bd-66f015828b49	0a2973f1dfccd628cd528357b13c6fb4d876b24c317058bb5e327204524130ea	2023-05-23 21:23:46.981586+00	20230115190437_	\N	\N	2023-05-23 21:23:46.97783+00	1
907f2b2f-459c-4bed-8343-5ec5780101dd	f4c2eeb11b9c8ec8cd2dc69e531edaaadfe662a8c8d7aeec7176e44adbdb0860	2023-05-23 21:23:46.993291+00	20230115190735_	\N	\N	2023-05-23 21:23:46.98259+00	1
913e28ed-6de6-47ec-b755-0ec668c5d360	837a9592e90e42652944ad2b3f737e3ce85588cb38526ef77b10d702330162cd	2023-05-23 21:23:46.997902+00	20230115191315_	\N	\N	2023-05-23 21:23:46.994295+00	1
ae31206f-6788-4cd9-a47d-f6776166ec30	ef5d19d936561b8c9ae7545b4d7f869b98aafeb37d2340498c9a1243840071da	2023-05-23 21:23:47.002503+00	20230115191523_	\N	\N	2023-05-23 21:23:46.999118+00	1
9d5e7419-4fec-4cee-84d1-f92c99c78445	331484f2480c483c53f8e715e6f8ee0e1a9120d442c0c5a82ef890d45944e34c	2023-05-23 21:23:47.007778+00	20230204175726_	\N	\N	2023-05-23 21:23:47.003397+00	1
6a7bdf54-19ba-4f5b-aa45-2b3812f8cdd1	32df3c1ca408b98fa14797d6d29636e901578f60258cabd5c184ba87836dae3e	2023-05-23 21:23:47.015268+00	20230204202857_	\N	\N	2023-05-23 21:23:47.008611+00	1
984e98d4-ce6f-475f-a887-e9c3a9b67fcb	bb1190469804f2c735107c1ca65fa78bf2373a73648b88b240c70aeb19a74f62	2023-05-23 21:23:47.019628+00	20230204202956_	\N	\N	2023-05-23 21:23:47.016275+00	1
fd8d45f8-a385-463a-91e4-0e00e0de1b17	d47b26c15c494b35b74931ee4e31409b46f7c5627b2fe9e5bdfae877a9d58435	2023-05-23 21:23:47.024605+00	20230212131316_	\N	\N	2023-05-23 21:23:47.020639+00	1
1f4568db-0d7b-4c8d-a512-89c3e8e07ebe	a4230f59a5600053bfdad8e56a96b10497e40897da70d7db60f339b504bd1b02	2023-05-23 21:23:47.032319+00	20230212132840_	\N	\N	2023-05-23 21:23:47.02559+00	1
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, "firstName", "lastName", username, password, "isVerified", "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blocks (id, "blockerId", "blockedId", "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, "isDeleted", "whenDelete", "createdAt", "updatedAt", "tradeId") FROM stdin;
\.


--
-- Data for Name: cryptocurrencies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cryptocurrencies (id, "coingeckoId", symbol, name, "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedbacks (id, "vendorId", "traderId", "offerId", message, type, "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: fiats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fiats (id, name, symbol, "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.languages (id, name, "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
50dea425-6ad6-4c8e-ad8d-40c5d01fdd8e	English	f	\N	2023-05-23	2023-05-23
\.


--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers (id, "paymentMethodType", "tradePricingType", "tradePricingListAt", "tradePricingTradeLimitsMin", "tradePricingTradeLimitsMax", "tradePricingTimeLimit", "tradeInstructionsTags", "tradeInstructionsLabel", "tradeInstructionsTerms", "tradeInstructionsInstructions", "isDeleted", "whenDelete", "createdAt", "updatedAt", "vendorId", "cryptocurrencyId", "paymentMethodId", "fiatId") FROM stdin;
\.


--
-- Data for Name: payment_method_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_method_categories (id, name, "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_methods (id, name, "isDeleted", "whenDelete", "createdAt", "updatedAt", "paymentMethodCategoryId") FROM stdin;
\.


--
-- Data for Name: payment_receipts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_receipts (id, name, key, url, "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: system_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.system_messages (id, message, "whenSeen", url, "isDeleted", "whenDelete", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: trades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trades (id, "paymentReceiptId", "vendorId", "traderId", "offerId", "cryptocurrencyId", "fiatId", "cryptocurrencyAmount", "fiatAmount", "startedAt", "endedAt", state, paid, "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: trusts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trusts (id, "trusterId", "trustedId", "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: user_languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_languages ("userId", "languageId") FROM stdin;
e3987eac-729c-4783-b2e6-6ba5838bf2b2	50dea425-6ad6-4c8e-ad8d-40c5d01fdd8e
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "profileColor", "firstName", "lastName", username, password, "privateKeys", "isVerified", "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
e3987eac-729c-4783-b2e6-6ba5838bf2b2	#fff	Hostile	Snipe	hostile-snipe	$2a$10$6ITmLRRnUS/V/4fBYEUsce5zHTKJ4WyY5nglYhUnG2LxNIHi9M5mG	{$2a$10$iFLKA72kIRwkbLYzu.Ru7.dJojHFtQ.R8j7btZqDGYxg3LFIucCwS,$2a$10$SvcWbAR3kkMxg6IVmk.OBeSw/IQROwc1mq0HY2jSR0gpx0wVf.lHO,$2a$10$HRM7BomIBHRkQyp8z5lp8.yf/TlODWhH21XkdzUpykmtyoz29pW0m,$2a$10$Zvj7DwvGY0Rapu7L8YveMuSlLLVqQFc8wEvmS7MWMTCdrNAdv36Ea,$2a$10$l2u7NWQkjNgbOwzG7k.s5.DXb5kZ5u8QiK4LLMpzT0irLof8xuuWa,$2a$10$T2As.e4thaJRKO6h.eGU7.1utKbSXDuueOaqEVjDpipsX5U0wrF0O,$2a$10$PAwH2FiRX4mnwBzVu5V75OUntfpTksBvUziIzMkM/pHe6rNheN4ze,$2a$10$3Kyy6oN13iArBGY8FEE51ezm1Nfh6rwK7eP2JjR/PZwAvnapDmklq,$2a$10$d6uqc2NKsYGPq34ePTjwau2cSmD1xlQITLmYOE8EuQvJLUlSsVSwy,$2a$10$SR6PU3.AERv9CfiJby7jYeq6auwubkEthgKDal4ayxyeNuEcVPPXq,$2a$10$WYhniLPOqG9nVdxwLyTV.O/aJHu9.INQp20VeE2pZrEx4K0cltYM.,$2a$10$2a4qr/YkcegKJ5337iL8huMJELFIWN1yTBEDy3xFbrREoMQ6nuTiS}	t	f	\N	2023-05-23	2023-05-23
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: blocks blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: cryptocurrencies cryptocurrencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cryptocurrencies
    ADD CONSTRAINT cryptocurrencies_pkey PRIMARY KEY (id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- Name: fiats fiats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fiats
    ADD CONSTRAINT fiats_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- Name: payment_method_categories payment_method_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method_categories
    ADD CONSTRAINT payment_method_categories_pkey PRIMARY KEY (id);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id);


--
-- Name: payment_receipts payment_receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_receipts
    ADD CONSTRAINT payment_receipts_pkey PRIMARY KEY (id);


--
-- Name: system_messages system_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_messages
    ADD CONSTRAINT system_messages_pkey PRIMARY KEY (id);


--
-- Name: trades trades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT trades_pkey PRIMARY KEY (id);


--
-- Name: trusts trusts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusts
    ADD CONSTRAINT trusts_pkey PRIMARY KEY (id);


--
-- Name: user_languages user_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_languages
    ADD CONSTRAINT user_languages_pkey PRIMARY KEY ("userId", "languageId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: admins_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX admins_username_key ON public.admins USING btree (username);


--
-- Name: chats_tradeId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "chats_tradeId_key" ON public.chats USING btree ("tradeId");


--
-- Name: cryptocurrencies_coingeckoId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "cryptocurrencies_coingeckoId_key" ON public.cryptocurrencies USING btree ("coingeckoId");


--
-- Name: languages_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX languages_name_key ON public.languages USING btree (name);


--
-- Name: users_privateKeys_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "users_privateKeys_key" ON public.users USING btree ("privateKeys");


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: blocks blocks_blockedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: blocks blocks_blockerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT "blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chats chats_tradeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT "chats_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES public.trades(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: feedbacks feedbacks_offerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT "feedbacks_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: feedbacks feedbacks_traderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT "feedbacks_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: feedbacks feedbacks_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT "feedbacks_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: offers offers_cryptocurrencyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "offers_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES public.cryptocurrencies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: offers offers_fiatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "offers_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES public.fiats(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: offers offers_paymentMethodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "offers_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES public.payment_methods(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: offers offers_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "offers_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: payment_methods payment_methods_paymentMethodCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT "payment_methods_paymentMethodCategoryId_fkey" FOREIGN KEY ("paymentMethodCategoryId") REFERENCES public.payment_method_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: system_messages system_messages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_messages
    ADD CONSTRAINT "system_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trades trades_cryptocurrencyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT "trades_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES public.cryptocurrencies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trades trades_fiatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT "trades_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES public.fiats(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trades trades_offerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT "trades_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trades trades_traderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT "trades_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trades trades_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT "trades_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trusts trusts_trustedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusts
    ADD CONSTRAINT "trusts_trustedId_fkey" FOREIGN KEY ("trustedId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trusts trusts_trusterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trusts
    ADD CONSTRAINT "trusts_trusterId_fkey" FOREIGN KEY ("trusterId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_languages user_languages_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_languages
    ADD CONSTRAINT "user_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public.languages(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_languages user_languages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_languages
    ADD CONSTRAINT "user_languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

