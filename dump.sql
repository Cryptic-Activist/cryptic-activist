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
60ae7406-e665-4083-97e3-9afe0e627e25	f2c5f080e58d900c1ec763bd342d5de256abcda2cc0756ba90a2a28f3fb61732	2023-05-25 12:05:46.715467+00	20230115184402_	\N	\N	2023-05-25 12:05:46.643879+00	1
23a97bf3-c53a-42d9-8dfb-e46712a6125b	0a2973f1dfccd628cd528357b13c6fb4d876b24c317058bb5e327204524130ea	2023-05-25 12:05:46.721166+00	20230115190437_	\N	\N	2023-05-25 12:05:46.71714+00	1
2d81e5d2-3283-4921-a25f-9b14a58c0d93	f4c2eeb11b9c8ec8cd2dc69e531edaaadfe662a8c8d7aeec7176e44adbdb0860	2023-05-25 12:05:46.742277+00	20230115190735_	\N	\N	2023-05-25 12:05:46.724617+00	1
1ca90de7-47a0-48cf-84b3-d96ec784f202	837a9592e90e42652944ad2b3f737e3ce85588cb38526ef77b10d702330162cd	2023-05-25 12:05:46.747556+00	20230115191315_	\N	\N	2023-05-25 12:05:46.743715+00	1
6eee569d-63c5-4f2f-b949-08a2c5effe28	ef5d19d936561b8c9ae7545b4d7f869b98aafeb37d2340498c9a1243840071da	2023-05-25 12:05:46.753695+00	20230115191523_	\N	\N	2023-05-25 12:05:46.749149+00	1
991350f5-f72f-4fbc-8e97-beaf414673c7	331484f2480c483c53f8e715e6f8ee0e1a9120d442c0c5a82ef890d45944e34c	2023-05-25 12:05:46.757702+00	20230204175726_	\N	\N	2023-05-25 12:05:46.754832+00	1
34ff2208-e7d1-4191-949c-e69c717336de	32df3c1ca408b98fa14797d6d29636e901578f60258cabd5c184ba87836dae3e	2023-05-25 12:05:46.766973+00	20230204202857_	\N	\N	2023-05-25 12:05:46.758528+00	1
6629fe47-b1fa-4fbe-98aa-2277e3ae37f9	bb1190469804f2c735107c1ca65fa78bf2373a73648b88b240c70aeb19a74f62	2023-05-25 12:05:46.770821+00	20230204202956_	\N	\N	2023-05-25 12:05:46.767878+00	1
862a1e5c-ccad-4f54-9ecf-8c3dd13b17c3	d47b26c15c494b35b74931ee4e31409b46f7c5627b2fe9e5bdfae877a9d58435	2023-05-25 12:05:46.775186+00	20230212131316_	\N	\N	2023-05-25 12:05:46.771693+00	1
ee0d4b1d-ad8e-4e31-9f77-e4fbbc02705d	a4230f59a5600053bfdad8e56a96b10497e40897da70d7db60f339b504bd1b02	2023-05-25 12:05:46.786207+00	20230212132840_	\N	\N	2023-05-25 12:05:46.778917+00	1
e3f1f7ef-0f62-4264-a2d3-b4dc76a367d0	f2c5f080e58d900c1ec763bd342d5de256abcda2cc0756ba90a2a28f3fb61732	2023-05-24 14:40:33.173925+00	20230115184402_	\N	\N	2023-05-24 14:40:33.087086+00	1
f040ab52-4a57-4527-a7fa-50395bd1fb40	0a2973f1dfccd628cd528357b13c6fb4d876b24c317058bb5e327204524130ea	2023-05-24 14:40:33.179404+00	20230115190437_	\N	\N	2023-05-24 14:40:33.17564+00	1
915dbb4d-9a35-40bc-a04d-f9811ad7f6aa	f4c2eeb11b9c8ec8cd2dc69e531edaaadfe662a8c8d7aeec7176e44adbdb0860	2023-05-24 14:40:33.201886+00	20230115190735_	\N	\N	2023-05-24 14:40:33.18231+00	1
ff020b4f-b6fe-489a-984c-9159a72cca7d	837a9592e90e42652944ad2b3f737e3ce85588cb38526ef77b10d702330162cd	2023-05-24 14:40:33.208235+00	20230115191315_	\N	\N	2023-05-24 14:40:33.204123+00	1
0256e680-19c7-499a-af5f-32893e0713e0	ef5d19d936561b8c9ae7545b4d7f869b98aafeb37d2340498c9a1243840071da	2023-05-24 14:40:33.213015+00	20230115191523_	\N	\N	2023-05-24 14:40:33.209836+00	1
41e54935-bc97-4d37-9796-b8f902fe5276	331484f2480c483c53f8e715e6f8ee0e1a9120d442c0c5a82ef890d45944e34c	2023-05-24 14:40:33.218502+00	20230204175726_	\N	\N	2023-05-24 14:40:33.213971+00	1
a5f74333-fa02-4863-a4bd-fc100c851640	32df3c1ca408b98fa14797d6d29636e901578f60258cabd5c184ba87836dae3e	2023-05-24 14:40:33.230597+00	20230204202857_	\N	\N	2023-05-24 14:40:33.219429+00	1
7a4c4320-439d-4f15-8fb6-fb5fb510398d	bb1190469804f2c735107c1ca65fa78bf2373a73648b88b240c70aeb19a74f62	2023-05-24 14:40:33.238566+00	20230204202956_	\N	\N	2023-05-24 14:40:33.231651+00	1
cf411f3f-973d-41cd-bf24-3f2e948a3f29	d47b26c15c494b35b74931ee4e31409b46f7c5627b2fe9e5bdfae877a9d58435	2023-05-24 14:40:33.244538+00	20230212131316_	\N	\N	2023-05-24 14:40:33.240629+00	1
0602bffa-155a-47ea-90ae-3676ac3af78b	a4230f59a5600053bfdad8e56a96b10497e40897da70d7db60f339b504bd1b02	2023-05-24 14:40:33.253433+00	20230212132840_	\N	\N	2023-05-24 14:40:33.245846+00	1
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
9aa1d3b1-d452-43fc-afe0-66440dd0028f	01coin	zoc	01coin	f	\N	2023-05-24	2023-05-24
bf865028-c926-44ec-8fd8-3082238b52d6	0chain	zcn	Zus	f	\N	2023-05-24	2023-05-24
a7fe39dc-b896-4815-aeaa-32f4d04965eb	0vix-protocol	vix	0VIX Protocol	f	\N	2023-05-24	2023-05-24
6aa8db50-cda0-41f4-9fed-180f2d4d906c	0x	zrx	0x Protocol	f	\N	2023-05-24	2023-05-24
3cf44112-e741-4411-88a8-52abd5088b4e	0x0-ai-ai-smart-contract	0x0	0x0.ai: AI Smart Contract	f	\N	2023-05-24	2023-05-24
ee0a7f94-f602-4069-9588-31311f156266	0xdao	oxd	0xDAO	f	\N	2023-05-24	2023-05-24
b3bedb24-ab62-460f-b9ad-e13f85ded84e	0xdao-v2	oxd v2	0xDAO V2	f	\N	2023-05-24	2023-05-24
96f4879b-5e21-42fd-9ff4-a89c93806d55	0xmonero	0xmr	0xMonero	f	\N	2023-05-24	2023-05-24
e5edea4a-0a0f-45af-9db0-9a85eb954a9f	0xshield	shield	0xShield	f	\N	2023-05-24	2023-05-24
6532ad91-e878-4bb2-be64-c44e00b8c019	12405-santa-rosa	realt-s-12405-santa-rosa-dr-detroit-mi	RealT - 12405 Santa Rosa Dr, Detroit, MI 48204	f	\N	2023-05-24	2023-05-24
60585364-f1a4-4755-9e4b-ce3df1d3fd39	12ships	tshp	12Ships	f	\N	2023-05-24	2023-05-24
da7e37d2-fc03-4cd4-af55-709c2168833c	1337	1337	Elite	f	\N	2023-05-24	2023-05-24
b8e0ab77-dea8-44db-8310-94079229fd89	14066-santa-rosa	realt-s-14066-santa-rosa-dr-detroit-mi	RealT - 14066 Santa Rosa Dr, Detroit, MI 48238	f	\N	2023-05-24	2023-05-24
e30fac5c-caae-4a8a-a74b-5c191802cabb	1617-s-avers	realt-s-1617-s.avers-ave-chicago-il	RealT - 1617 S Avers Ave, Chicago, IL 60623	f	\N	2023-05-24	2023-05-24
48d3dc23-4d35-4edd-a97d-0e4b86bb2b01	1art	1art	OneArt	f	\N	2023-05-24	2023-05-24
d5df275c-6ba3-4517-80ea-eeaf2bdd9699	1bch	1bch	1BCH	f	\N	2023-05-24	2023-05-24
bd36f8fe-6f6d-443c-8ca0-2c32ca990aac	1doge	1doge	1Doge	f	\N	2023-05-24	2023-05-24
f859c374-2fa3-4cb0-a15b-949c274a0881	1eco	1eco	1eco	f	\N	2023-05-24	2023-05-24
cd957f0d-c9ce-440b-8292-ce58ad1f3e0d	1hive-water	water	1Hive Water	f	\N	2023-05-24	2023-05-24
c7875a49-9936-4792-a4ae-3f3c1ad50d4c	1inch	1inch	1inch	f	\N	2023-05-24	2023-05-24
63350511-a56e-468e-b4e0-a123d50dd7df	1inch-yvault	yv1inch	1INCH yVault	f	\N	2023-05-24	2023-05-24
63958881-ec9e-41c8-86a7-cded41e282cb	1million-nfts	1mil	1MillionNFTs	f	\N	2023-05-24	2023-05-24
a6e179cc-aa3d-433f-ae60-7a5f25ff28ae	1minbet	1mb	1minBET	f	\N	2023-05-24	2023-05-24
31016071-0caa-44ed-8f28-324595df8ac3	1move token	1mt	1Move Token	f	\N	2023-05-24	2023-05-24
ab7829c9-aa85-49be-b1b4-765e8855edea	1peco	1peco	1peco	f	\N	2023-05-24	2023-05-24
61032a45-1580-4c39-8fa8-10a31dc4c099	1reward-token	1rt	1Reward Token	f	\N	2023-05-24	2023-05-24
bf11a83b-ce1b-4d3c-bdcc-3537282cb2fd	1safu	safu	1SAFU	f	\N	2023-05-24	2023-05-24
062e959f-cc6b-4e3e-8200-79e4885b4a69	1sol	1sol	1Sol	f	\N	2023-05-24	2023-05-24
429f5331-5eac-4948-b4ea-7e93952b764c	1sol-io-wormhole	1sol	1sol.io (Wormhole)	f	\N	2023-05-24	2023-05-24
0c56537a-4c01-4df9-86bc-5e00554c150b	1world	1wo	1World	f	\N	2023-05-24	2023-05-24
52ce49b3-ee73-4ec5-838d-095040c4c24e	20weth-80bal	20weth-80bal	20WETH-80BAL	f	\N	2023-05-24	2023-05-24
c9ef69ea-8920-4df4-9386-b5e9eac89e7f	28vck	vck	28VCK	f	\N	2023-05-24	2023-05-24
be44e7da-8954-42a9-affa-2a32f55370be	2acoin	arms	2ACoin	f	\N	2023-05-24	2023-05-24
915f79b7-374f-4bb9-b7af-984bea773d56	2crazynft	2crz	2crazyNFT	f	\N	2023-05-24	2023-05-24
fd5837a2-0170-4f82-8ddc-029dfc602f71	2g-carbon-coin	2gcc	2G Carbon Coin	f	\N	2023-05-24	2023-05-24
e5966c3b-4555-451c-ac51-b95f39b8e05b	2local-2	2lc	2local	f	\N	2023-05-24	2023-05-24
4c68a49b-7dc8-472e-8ab6-60668d686cce	2omb-finance	2omb	2omb	f	\N	2023-05-24	2023-05-24
a0f83e3b-71be-4745-a98e-526750522e37	2share	2shares	2SHARE	f	\N	2023-05-24	2023-05-24
68955ed0-f85d-40cc-b45d-281497a62611	300fit	fit	300FIT	f	\N	2023-05-24	2023-05-24
9e7529f7-3e19-49b8-bf98-30feeda0552a	30mb-token	3omb	3OMB	f	\N	2023-05-24	2023-05-24
ecfd3c05-1d97-47d6-b337-2ec4eb6cde02	3air	3air	3air	f	\N	2023-05-24	2023-05-24
fe5119df-44d2-44ce-bfdc-591657d45efd	3d3d	3d3d	3d3d	f	\N	2023-05-24	2023-05-24
1d821d24-0fbd-4cd7-bb40-ef19c1233f44	3-kingdoms-multiverse	3km	3 Kingdoms Multiverse	f	\N	2023-05-24	2023-05-24
bf6a4e09-e097-45bb-a58f-4fe556b17b1c	3shares	3share	3Share	f	\N	2023-05-24	2023-05-24
879e6a75-2f5f-4613-b723-c1a53cb1035a	3xcalibur	xcal	3xcalibur Ecosystem Token	f	\N	2023-05-24	2023-05-24
a61cb1d0-98b1-4979-98fd-24b6dd1d8d63	42-coin	42	42-coin	f	\N	2023-05-24	2023-05-24
797e15a5-9532-4661-8709-c03d8e21d89a	4852-4854-w-cortez	realt-s-4852-4854-w.cortez-st-chicago-il	RealT - 4852-4854 W Cortez St, Chicago, IL 60651	f	\N	2023-05-24	2023-05-24
0751bebb-78d4-4b23-b96a-ecb891a845fa	4artechnologies	4art	4ART Coin	f	\N	2023-05-24	2023-05-24
89cf569b-ba63-4166-be68-9eefc693cf06	4chan	4chan	4Chan	f	\N	2023-05-24	2023-05-24
a7df2bf6-b3a9-4051-9df2-58ab8ec44382	4d-twin-maps	map	4D Twin Maps	f	\N	2023-05-24	2023-05-24
723c8cc8-a4e5-4c78-a2d2-daafb8a4d4c5	4int	4int	4INT	f	\N	2023-05-24	2023-05-24
8184c1ce-810c-4567-a7e5-414f0d94025c	4jnet	4jnet	4JNET	f	\N	2023-05-24	2023-05-24
5e9f03a3-804a-489c-b99a-9ea23ecec3ca	50cent	50c	50Cent	f	\N	2023-05-24	2023-05-24
e846f1fe-d30e-44af-894b-0703d25d8105	5g-cash	vgc	5G-CASH	f	\N	2023-05-24	2023-05-24
8b49b80e-10ea-4cde-ab0c-968bed200001	5km-run	run	5KM RUN	f	\N	2023-05-24	2023-05-24
f9b140d1-0195-4e5d-b42f-abfa4c72e320	7pixels	7pxs	7Pixels	f	\N	2023-05-24	2023-05-24
bdf8f532-c26b-4bba-9abd-c15f6f3983be	888tron	888	888tron	f	\N	2023-05-24	2023-05-24
34792de3-fb3c-4363-b64b-151ec9f2d939	88mph	mph	88mph	f	\N	2023-05-24	2023-05-24
005de697-fb2c-4dd8-9d9d-0d350f3276f3	8bitearn	8bit	8BITEARN	f	\N	2023-05-24	2023-05-24
b3ba02c1-bc19-44c4-ac4c-607e0c955d3d	8pay	8pay	8Pay	f	\N	2023-05-24	2023-05-24
59de4b7f-2962-469c-b320-3927bb5f8d48	8x8-protocol	exe	8X8 Protocol	f	\N	2023-05-24	2023-05-24
a39a402f-4052-4c57-ba74-ee9767af137c	99defi	99defi	99Defi	f	\N	2023-05-24	2023-05-24
9f06a322-7f9a-4f91-a49f-1d6593574e21	99starz	stz	99Starz	f	\N	2023-05-24	2023-05-24
cbf1d6ed-37e5-42dc-9183-6a90a8ba8ad2	9-lives-network	ninefi	9 Lives Network	f	\N	2023-05-24	2023-05-24
fb0f14a3-6abd-4999-8bb1-f02e78a484a0	a4-finance	a4	A4 Finance	f	\N	2023-05-24	2023-05-24
f11d9838-9a14-4ce7-a9d5-12dba0d9dbb0	aada-finance	aada	Aada Finance	f	\N	2023-05-24	2023-05-24
d5eecb44-604e-451a-b264-c3e0e056b4ca	aag-ventures	aag	AAG	f	\N	2023-05-24	2023-05-24
1e0ccea9-6315-4b89-8ec0-67ac609b15fb	aave	aave	Aave	f	\N	2023-05-24	2023-05-24
17bd0a9c-c572-479a-b62b-76e23286dc28	aave-aave	aaave	Aave AAVE	f	\N	2023-05-24	2023-05-24
66879c3f-99c9-47a1-9b8f-fe150f4e7871	aave-amm-bptbalweth	aammbptbalweth	Aave AMM BptBALWETH	f	\N	2023-05-24	2023-05-24
fc2077e7-ae76-4848-b1d8-35d73ceb85dd	aave-amm-bptwbtcweth	aammbptwbtcweth	Aave AMM BptWBTCWETH	f	\N	2023-05-24	2023-05-24
6230ffcc-f7c0-45b6-86c0-5346fafc1274	aave-amm-dai	aammdai	Aave AMM DAI	f	\N	2023-05-24	2023-05-24
a0ad93a1-023c-47b0-9caa-cde7b9d3b197	aave-amm-uniaaveweth	aammuniaaveweth	Aave AMM UniAAVEWETH	f	\N	2023-05-24	2023-05-24
30f4de08-cec2-4d00-a96b-6b6e59bb75cc	aave-amm-unibatweth	aammunibatweth	Aave AMM UniBATWETH	f	\N	2023-05-24	2023-05-24
2f7fdec1-b509-4ac5-bc07-83ba5633091e	aave-amm-unicrvweth	aammunicrvweth	Aave AMM UniCRVWETH	f	\N	2023-05-24	2023-05-24
86efee19-33a0-4002-9690-484c0933021f	aave-amm-unidaiusdc	aammunidaiusdc	Aave AMM UniDAIUSDC	f	\N	2023-05-24	2023-05-24
4eb26d0f-f094-480c-ba71-f0b6ce8b8c92	aave-amm-unidaiweth	aammunidaiweth	Aave AMM UniDAIWETH	f	\N	2023-05-24	2023-05-24
5bb130f8-3062-4df5-974d-caebb1456386	aave-amm-unilinkweth	aammunilinkweth	Aave AMM UniLINKWETH	f	\N	2023-05-24	2023-05-24
952b9a6a-b843-4eda-88a2-99ffbe4c1cb0	aave-amm-unimkrweth	aammunimkrweth	Aave AMM UniMKRWETH	f	\N	2023-05-24	2023-05-24
849e3cd2-1281-410f-bee6-229a243563da	aave-amm-unirenweth	aammunirenweth	Aave AMM UniRENWETH	f	\N	2023-05-24	2023-05-24
dd6a3701-7d28-479f-9e95-ee2e0d30fbf4	aave-amm-unisnxweth	aammunisnxweth	Aave AMM UniSNXWETH	f	\N	2023-05-24	2023-05-24
e6ae1e0d-52ba-4550-bbc2-bab8b8421388	aave-amm-uniuniweth	aammuniuniweth	Aave AMM UniUNIWETH	f	\N	2023-05-24	2023-05-24
c22212ca-2aab-4171-8154-641e180e6046	aave-amm-uniusdcweth	aammuniusdcweth	Aave AMM UniUSDCWETH	f	\N	2023-05-24	2023-05-24
43a90c49-e54d-436e-99fe-b599f4688866	aave-amm-uniwbtcusdc	aammuniwbtcusdc	Aave AMM UniWBTCUSDC	f	\N	2023-05-24	2023-05-24
4169feca-1d5f-4bae-be65-34b3c3acd17f	aave-amm-uniwbtcweth	aammuniwbtcweth	Aave AMM UniWBTCWETH	f	\N	2023-05-24	2023-05-24
035bba24-1735-46ca-8bef-f75a6746edfb	aave-amm-uniyfiweth	aammuniyfiweth	Aave AMM UniYFIWETH	f	\N	2023-05-24	2023-05-24
eab0b74b-673c-4c3f-ac23-a6a70636b281	aave-amm-usdc	aammusdc	Aave AMM USDC	f	\N	2023-05-24	2023-05-24
1132282d-776f-4f28-a0f3-a9e86590c1e2	aave-amm-usdt	aammusdt	Aave AMM USDT	f	\N	2023-05-24	2023-05-24
27780921-1f63-4e3c-948e-86254d911a58	aave-amm-wbtc	aammwbtc	Aave AMM WBTC	f	\N	2023-05-24	2023-05-24
bdf62c52-2714-4b41-b14f-9cd7130e6463	aave-amm-weth	aammweth	Aave AMM WETH	f	\N	2023-05-24	2023-05-24
13227dcb-8cea-49f9-8381-db240cbe0903	aave-bal	abal	Aave BAL	f	\N	2023-05-24	2023-05-24
f554247f-96dc-49fa-9979-bcb91f3788ca	aave-balancer-pool-token	abpt	Aave Balancer Pool Token	f	\N	2023-05-24	2023-05-24
777001ea-65f8-4ae0-9a31-98dcdae34104	aave-bat	abat	Aave BAT	f	\N	2023-05-24	2023-05-24
b024e892-869a-4710-a802-ccbf758fc5db	aave-bat-v1	abat	Aave BAT v1	f	\N	2023-05-24	2023-05-24
09694ac7-d80c-408e-b3b7-2c710995192c	aave-busd	abusd	Aave BUSD	f	\N	2023-05-24	2023-05-24
48179721-2b74-4627-90a9-8c5c55f12264	aave-busd-v1	abusd	Aave BUSD v1	f	\N	2023-05-24	2023-05-24
57321e48-45ff-4919-80fe-90327e404367	aave-crv	acrv	Aave CRV	f	\N	2023-05-24	2023-05-24
7a1ae99e-5b65-4fc9-952f-ce15d7bb20eb	aave-dai	adai	Aave DAI	f	\N	2023-05-24	2023-05-24
0a92a9d5-7735-493b-bb97-e9c1f5fd98e8	aave-dai-v1	adai	Aave DAI v1	f	\N	2023-05-24	2023-05-24
048a3edd-5352-4c87-88ae-468801ba6ed9	aave-enj	aenj	Aave ENJ	f	\N	2023-05-24	2023-05-24
9accea66-c82c-48f0-8b82-f53160641619	aave-enj-v1	aenj	Aave ENJ v1	f	\N	2023-05-24	2023-05-24
48dcdaa4-699e-40c0-9577-b7c4e8458b27	aave-eth-v1	aeth	Aave ETH v1	f	\N	2023-05-24	2023-05-24
c29afdd5-2603-4d97-84e6-8d70cb92d517	aavegotchi	ghst	Aavegotchi	f	\N	2023-05-24	2023-05-24
b1ad0975-c92b-487b-960b-185413359c27	aavegotchi-alpha	alpha	Aavegotchi ALPHA	f	\N	2023-05-24	2023-05-24
610767e4-4d43-4654-a41e-03cac5d4f68f	aavegotchi-fomo	fomo	Aavegotchi FOMO	f	\N	2023-05-24	2023-05-24
dbc53071-ac3d-408e-93eb-b8d93b805826	aavegotchi-fud	fud	Aavegotchi FUD	f	\N	2023-05-24	2023-05-24
bc5c7cf8-6ec2-40b3-950f-6c1baac92917	aavegotchi-kek	kek	Aavegotchi KEK	f	\N	2023-05-24	2023-05-24
1592dad1-700d-40af-b31e-b36e51ddf72e	aave-gusd	agusd	Aave GUSD	f	\N	2023-05-24	2023-05-24
8cb8dc62-3abb-4d06-9edb-9a20108bb327	aave-interest-bearing-steth	asteth	Aave Interest Bearing STETH	f	\N	2023-05-24	2023-05-24
feb44b84-6a25-471d-be6f-80847a4ea57f	aave-knc	aknc	Aave KNC	f	\N	2023-05-24	2023-05-24
14b02aa7-19c9-4af5-be15-060531f5358b	aave-knc-v1	aknc	Aave KNC v1	f	\N	2023-05-24	2023-05-24
b37664ff-e526-448f-baba-549ea68e51eb	aave-link	alink	Aave LINK	f	\N	2023-05-24	2023-05-24
956074db-4833-460b-a838-fcbef0087138	aave-link-v1	alink	Aave LINK v1	f	\N	2023-05-24	2023-05-24
fb454440-8614-4f62-a55e-123a7ef55aac	aave-mana	amana	Aave MANA	f	\N	2023-05-24	2023-05-24
318b24dc-6f4b-436e-a947-8bffc327f9b4	aave-mana-v1	amana	Aave MANA v1	f	\N	2023-05-24	2023-05-24
4c3f1876-33d3-46b3-93a4-d52135186d48	aave-mkr	amkr	Aave MKR	f	\N	2023-05-24	2023-05-24
70c1b5f0-f7e7-4e85-aa63-b7e10d9f837b	aave-mkr-v1	amkr	Aave MKR v1	f	\N	2023-05-24	2023-05-24
638c92ce-4ae2-478c-9670-9a0de48fa8d9	aave-polygon-aave	amaave	Aave Polygon AAVE	f	\N	2023-05-24	2023-05-24
f2660507-c952-439f-bd14-870a0e222bdf	aave-polygon-dai	amdai	Aave Polygon DAI	f	\N	2023-05-24	2023-05-24
e7e53628-dfca-4ec5-8e9d-78435df8064a	aave-polygon-usdc	amusdc	Aave Polygon USDC	f	\N	2023-05-24	2023-05-24
5a0728b6-36b0-4803-b03f-5ffca2ccd1c2	aave-polygon-usdt	amusdt	Aave Polygon USDT	f	\N	2023-05-24	2023-05-24
12c0a14a-f52a-461f-9c03-a6773ae76e6a	aave-polygon-wbtc	amwbtc	Aave Polygon WBTC	f	\N	2023-05-24	2023-05-24
e13ae47d-fad7-4efd-9997-1d7392e576bc	aave-polygon-weth	amweth	Aave Polygon WETH	f	\N	2023-05-24	2023-05-24
7ab0b7b4-d42f-4640-89dd-105c9c329dca	aave-polygon-wmatic	amwmatic	Aave Polygon WMATIC	f	\N	2023-05-24	2023-05-24
7bf0dc7d-92b0-4e23-924c-a702a9f6a6ee	aave-rai	arai	Aave RAI	f	\N	2023-05-24	2023-05-24
c598905b-fb3a-4417-b99c-fc8a0360c6c0	aave-ren	aren	Aave REN	f	\N	2023-05-24	2023-05-24
b5921a48-63c7-453b-b5c7-934abe067cd1	aave-ren-v1	aren	Aave REN v1	f	\N	2023-05-24	2023-05-24
d4359f4d-31a2-496c-8a61-0b2411766219	aave-snx	asnx	Aave SNX	f	\N	2023-05-24	2023-05-24
c7097f82-3fa7-441c-bd5b-9446260c8edb	aave-snx-v1	asnx	Aave SNX v1	f	\N	2023-05-24	2023-05-24
5dac3e6a-4953-477b-9aac-8025dcf2e652	aave-susd	asusd	Aave SUSD	f	\N	2023-05-24	2023-05-24
623f258f-509f-4be4-8535-5021f3b3ea74	aave-susd-v1	asusd	Aave SUSD v1	f	\N	2023-05-24	2023-05-24
5e3e2126-2016-4fad-8d5d-9f6ee22020f2	aave-tusd	atusd	Aave TUSD	f	\N	2023-05-24	2023-05-24
b04763cb-55fb-4111-b375-5a0fd28ddf13	aave-tusd-v1	atusd	Aave TUSD v1	f	\N	2023-05-24	2023-05-24
805e3fb8-af31-4b7d-8919-843de9525e07	aave-uni	auni	Aave UNI	f	\N	2023-05-24	2023-05-24
af44809d-a0a4-4a7c-8052-11dd197eda7d	aave-usdc	ausdc	Aave USDC	f	\N	2023-05-24	2023-05-24
eafbc0f4-e163-4c01-ba46-35f5e49a98ad	aave-usdc-v1	ausdc	Aave USDC v1	f	\N	2023-05-24	2023-05-24
5af7bdca-d295-4340-a7c5-a5f1cdcd02e0	aave-usdt	ausdt	Aave USDT	f	\N	2023-05-24	2023-05-24
214ad3be-e304-4393-b207-fd3c2f84e41f	aave-usdt-v1	ausdt	Aave USDT v1	f	\N	2023-05-24	2023-05-24
008f6679-99b5-43c8-8767-4f300129298b	aave-wbtc	awbtc	Aave WBTC	f	\N	2023-05-24	2023-05-24
f7407f37-b168-4bf9-be9d-33930d5b2ee7	aave-wbtc-v1	awbtc	Aave WBTC v1	f	\N	2023-05-24	2023-05-24
0849e9ed-f2b3-4bdf-a17f-3b0de6d75928	aave-weth	aweth	Aave WETH	f	\N	2023-05-24	2023-05-24
0c5187ce-fd51-4565-9f30-57b4edb7dc3b	aave-xsushi	axsushi	Aave XSUSHI	f	\N	2023-05-24	2023-05-24
539be18e-d282-4d2a-abd2-9d7769367591	aave-yfi	ayfi	Aave YFI	f	\N	2023-05-24	2023-05-24
8d732e92-e1f0-46c4-a884-a32230c9589c	aave-yvault	yvaave	Aave yVault	f	\N	2023-05-24	2023-05-24
355a357b-ff68-48cb-becd-b21ff932760c	aave-zrx	azrx	Aave ZRX	f	\N	2023-05-24	2023-05-24
ffaa8b75-cb85-4ce1-aa2e-a2ddab41ec0e	aave-zrx-v1	azrx	Aave ZRX v1	f	\N	2023-05-24	2023-05-24
eb7e0cd0-8cc9-4a8f-bcba-e217abbbde81	abachi	abi	Abachi	f	\N	2023-05-24	2023-05-24
60ae9485-49a8-453a-861e-997798b49029	abased	$abased	aBASED	f	\N	2023-05-24	2023-05-24
764bd792-49ad-4a80-8561-5f83f3ccc67b	abcmeta	meta	ABCMETA	f	\N	2023-05-24	2023-05-24
f174cf10-b7f7-4841-a95d-c8f039c74faa	abc-pos-pool	abc	ABC PoS Pool	f	\N	2023-05-24	2023-05-24
c6fb2567-b0b1-4295-9610-f1f86759b1a4	abel-finance	abel	ABEL Finance	f	\N	2023-05-24	2023-05-24
e806ec5d-0dd0-4e7a-a6c8-90661cda1c9a	abelian	abel	Abelian	f	\N	2023-05-24	2023-05-24
8c216c66-430b-4716-bd0e-6ee93632d0e5	abey	abey	Abey	f	\N	2023-05-24	2023-05-24
073f4c9e-f785-4e3c-a17f-8387b3c5afb4	able-finance	able	Able Finance	f	\N	2023-05-24	2023-05-24
6ea3132c-5dd2-4702-8b25-48cd342b91b4	aboat-token-2	aboat	Aboat Token	f	\N	2023-05-24	2023-05-24
a72dbc93-c19d-4f4e-b634-2ec9d29a8e6b	absolute-sync-token	ast	Absolute Sync	f	\N	2023-05-24	2023-05-24
4f2c752a-ad32-4e5c-8f28-f49a9089d4cd	acala	aca	Acala	f	\N	2023-05-24	2023-05-24
14878008-9b0b-4d12-b1e0-39d177e91d7c	acala-dollar	ausd	Acala Dollar (Karura)	f	\N	2023-05-24	2023-05-24
375d1ad9-8bd5-472d-b54b-1a526f78fa70	acala-dollar-acala	ausd	Acala Dollar (Acala)	f	\N	2023-05-24	2023-05-24
a0331f08-e623-4e3e-a910-0ae5cea6529b	access-protocol	acs	Access Protocol	f	\N	2023-05-24	2023-05-24
4b6a8e4f-0f9d-4100-a275-30a22ed5e352	acent	ace	Acent	f	\N	2023-05-24	2023-05-24
35d33633-47bb-4ea0-988d-fec77ce7826f	acestarter	astar	AceStarter	f	\N	2023-05-24	2023-05-24
fb9df93c-9dda-4ee0-b65e-6d9c31041443	acetoken	ace	ACEToken	f	\N	2023-05-24	2023-05-24
9cfe9e6e-d489-4eed-97bc-505d97b9c846	acet-token	act	Acet	f	\N	2023-05-24	2023-05-24
5249298e-7adc-4f7a-b7d7-7caddc26b404	ac-exchange-token	acxt	ACDX Exchange	f	\N	2023-05-24	2023-05-24
8a42e240-700e-45ac-8125-c8c8912cc694	achain	act	Achain	f	\N	2023-05-24	2023-05-24
e28fb556-83a1-46ee-a71f-a6aecea90322	acid	acid	Acid	f	\N	2023-05-24	2023-05-24
b4d9e556-7745-4fab-bd8c-2c71a78164d2	acknoledger	ack	AcknoLedger	f	\N	2023-05-24	2023-05-24
12856e3f-c92d-483d-986e-7699159b70c1	ac-milan-fan-token	acm	AC Milan Fan Token	f	\N	2023-05-24	2023-05-24
3df5432b-4daa-406a-bb8b-ef75a9b7af18	acoconut	ac	ACoconut	f	\N	2023-05-24	2023-05-24
e2059d8c-7b11-4fda-b16c-1d5ee6fd9f08	acoin	acoin	Acoin	f	\N	2023-05-24	2023-05-24
49b9dd01-195f-4d3a-9a94-c6b4d52beda6	acquire-fi	acq	Acquire.Fi	f	\N	2023-05-24	2023-05-24
27d514ba-edb4-4075-a494-e9eb62f52ed9	acreage-coin	acr	Acreage Coin	f	\N	2023-05-24	2023-05-24
797a0cad-b6ed-408d-8346-b1809b459227	acria	acria	Acria.AI	f	\N	2023-05-24	2023-05-24
31bc297a-c69b-4d79-85e2-d3278df84a21	across-protocol	acx	Across Protocol	f	\N	2023-05-24	2023-05-24
58cef4cb-687b-4ae6-88cb-e440b25510f5	acryptos	acs	ACryptoS	f	\N	2023-05-24	2023-05-24
5faaa6b9-002d-4b3c-a9c3-e8d33b9023c3	acryptosi	acsi	ACryptoSI	f	\N	2023-05-24	2023-05-24
71549244-2815-4258-844c-f041fceeeec1	actinium	acm	Actinium	f	\N	2023-05-24	2023-05-24
11acaa9e-cd72-4374-b61c-1ed9361e471a	action-coin	actn	Action Coin	f	\N	2023-05-24	2023-05-24
cb1a4d1f-89ee-4068-94a3-d55e00b74f98	active-world-rewards-token	awrt	Active World Rewards	f	\N	2023-05-24	2023-05-24
0efa711e-f8da-47f5-9b59-a5106b27e551	acute-angle-cloud	aac	Double-A Chain	f	\N	2023-05-24	2023-05-24
b23b73d4-11b5-494f-a65a-4d3ee2758824	acy-finance	acy	ACY Finance	f	\N	2023-05-24	2023-05-24
6096a876-7190-42b1-a409-c9d1e489e832	adacash	adacash	ADAcash	f	\N	2023-05-24	2023-05-24
bdf2335f-5a74-442f-8379-d0f86383f579	adadao	adao	ADADao	f	\N	2023-05-24	2023-05-24
ff9428fe-5eb7-4132-b76f-ee863c699f14	adamant	addy	Adamant	f	\N	2023-05-24	2023-05-24
0d7da94b-4d75-4562-852d-c1183308cea8	adanaspor-fan-token	adana	Adanaspor Fan Token	f	\N	2023-05-24	2023-05-24
a17c9bbe-8e6a-4353-acd1-1f2c10f984ff	adapad	adapad	ADAPad	f	\N	2023-05-24	2023-05-24
506ddc15-d008-424c-8b16-6d9542584b2f	adappter-token	adp	Adappter	f	\N	2023-05-24	2023-05-24
7f9157cd-97d0-462a-b46d-18c3aa2b743e	adaswap	asw	AdaSwap	f	\N	2023-05-24	2023-05-24
4b99fe08-5e7f-4cf4-9dce-5ec4b86f3aaf	adax	adax	ADAX	f	\N	2023-05-24	2023-05-24
02110e8f-8885-443f-ad7b-6ba2079f9460	adazoo	zoo	ADAZOO	f	\N	2023-05-24	2023-05-24
64869d8f-c84e-4f81-8946-06b3f7e9639f	add-xyz-new	add	Add.xyz (NEW)	f	\N	2023-05-24	2023-05-24
346eaa4d-4d54-45dd-8f2e-47de2e0cb286	adex	adx	Ambire AdEx	f	\N	2023-05-24	2023-05-24
c53bf8fe-964f-4502-ae03-20460cac32d6	ad-flex-token	adf	Ad Flex	f	\N	2023-05-24	2023-05-24
ac6c48d6-3bc9-45fe-854e-587ddf79bd3d	aditus	adi	Aditus	f	\N	2023-05-24	2023-05-24
0a60f76e-0cb7-4906-8876-c75c0f0c0245	adonis-2	adon	Adonis	f	\N	2023-05-24	2023-05-24
c4b07d00-4c95-46e8-ad2b-0ca4db4114b2	adora-token	ara	Adora	f	\N	2023-05-24	2023-05-24
33ee6dc0-54ef-4dca-b78b-79bb8ff92e28	adreward	ad	ADreward	f	\N	2023-05-24	2023-05-24
88492d68-ccba-4589-b675-1be3aa7c5d17	adroverse	adr	Adroverse	f	\N	2023-05-24	2023-05-24
fd18e9ef-c29c-4f50-be5f-3e14ee1c8d6b	adshares	ads	Adshares	f	\N	2023-05-24	2023-05-24
9d24609a-1243-45fe-b91a-7110f85acb20	adtoken	adt	adChain	f	\N	2023-05-24	2023-05-24
633c1573-c6bc-4e57-bdc6-4fe123f0d8f2	adv3nture-xyz-gemstone	gem	Adv3nture.xyz Gemstone	f	\N	2023-05-24	2023-05-24
eb2a8aff-3a6e-454e-bf66-dbda723c6b72	adv3nture-xyz-gold	gold	Adv3nture.xyz Gold	f	\N	2023-05-24	2023-05-24
54b76001-a657-4611-9660-67cf28fbb650	advanced-internet-block	aib	Advanced Integrated Blocks	f	\N	2023-05-24	2023-05-24
a3df1148-c8e8-4630-a7ed-3295a9daa056	advanced-united-continent	auc	Advanced United Continent	f	\N	2023-05-24	2023-05-24
4f888c9d-2a82-4119-abf3-791318b5d3aa	advantis	advt	Advantis	f	\N	2023-05-24	2023-05-24
69560843-a4dd-4a2a-9ff7-4d2034bad137	adventure-gold	agld	Adventure Gold	f	\N	2023-05-24	2023-05-24
f576660b-90a1-4925-8a22-123bf64e8a2e	adventurer-gold	gold	Adventurer Gold	f	\N	2023-05-24	2023-05-24
db2c9dc0-4c20-4a4a-bee9-39c2796f29a6	advertise-coin	adco	Advertise Coin	f	\N	2023-05-24	2023-05-24
f8db4a30-eca4-4b47-84cc-e035bf4b1a35	aeggs	aeggs	aEGGS	f	\N	2023-05-24	2023-05-24
c6840dc0-c3bc-40b3-9b14-1eb55f310792	aegis	ags	Aegis	f	\N	2023-05-24	2023-05-24
33fc287a-2e8d-4a92-8702-63f7b2696ed9	aegis-token-f7934368-2fb3-4091-9edc-39283e87f55d	on	Onsen Token	f	\N	2023-05-24	2023-05-24
c8615e36-bc50-4217-9bbf-44d804304a11	aelf	elf	aelf	f	\N	2023-05-24	2023-05-24
e3b0bb52-8df7-468c-ada8-aeb405a5de2b	aelin	aelin	Aelin	f	\N	2023-05-24	2023-05-24
aa14e2d0-ad0c-47d7-bb57-cf7bf2426bb0	aelysir	ael	Aelysir	f	\N	2023-05-24	2023-05-24
c0e380ab-df34-478b-859c-f8d98f2c4c72	aeon	aeon	Aeon	f	\N	2023-05-24	2023-05-24
f840de41-002c-4256-909a-b402ec76f7e5	aerarium-fi	aera	Aerarium Fi	f	\N	2023-05-24	2023-05-24
6881b25a-eaf0-42c2-8ad5-d19b5e2cbb7a	aerdrop	aer	Aerdrop	f	\N	2023-05-24	2023-05-24
01fe6a30-bfd7-4856-99b0-3e975e06e263	aergo	aergo	Aergo	f	\N	2023-05-24	2023-05-24
bf9faa65-ec3d-481c-8fb0-ce143194ae6a	aeron	arnx	Aeron	f	\N	2023-05-24	2023-05-24
95b6ac50-7792-45ea-9ff3-30f8487afa9d	aerovek-aviation	aero	Aerovek Aviation	f	\N	2023-05-24	2023-05-24
e2482c42-aecf-4ded-a78b-2063caf5377d	aeternity	ae	Aeternity	f	\N	2023-05-24	2023-05-24
2b6172ed-24c0-4feb-9126-3dfe34ebd006	aether-games	aeg	Aether Games	f	\N	2023-05-24	2023-05-24
30c05e17-be25-4094-9b7c-284ecb73ded0	aeur	aeur	AEUR	f	\N	2023-05-24	2023-05-24
9eb1e73e-9af0-4cf1-bab8-a142a8c9d46e	aezora	azr	Azzure	f	\N	2023-05-24	2023-05-24
465967e5-fa70-4e38-b57b-0a748e3718cc	afen-blockchain	afen	AFEN Blockchain	f	\N	2023-05-24	2023-05-24
de729199-ec16-4287-bdef-8d80fb42c84d	affinity	afnty	Affinity	f	\N	2023-05-24	2023-05-24
7daf4a98-5cc1-4c5e-9d56-8e793d7fee7b	affyn	fyn	Affyn	f	\N	2023-05-24	2023-05-24
4d9a1fde-e7fe-4560-8224-970d473ac10e	afin-coin	afin	Asian Fintech	f	\N	2023-05-24	2023-05-24
c59dbd91-4b06-456b-b373-bc75e2607db1	afkdao	afk	AFKDAO	f	\N	2023-05-24	2023-05-24
ca5f218e-92ef-46f0-b510-62a2b24c8f4e	afreum	afr	Afreum	f	\N	2023-05-24	2023-05-24
f451a11d-0d53-42af-92c1-132cf0791d1a	afrix	afx	Afrix	f	\N	2023-05-24	2023-05-24
d58aece6-930f-458f-abd7-b3fd737f3cd8	afrostar	afro	Afrostar	f	\N	2023-05-24	2023-05-24
a8461cab-c0c5-4913-a00a-71adc62cc559	afyonspor-fan-token	afyon	Afyonspor Fan Token	f	\N	2023-05-24	2023-05-24
05af7072-a70c-43f2-a54d-f54ec1034a35	aga-carbon-credit	agac	AGA Carbon Credit	f	\N	2023-05-24	2023-05-24
672eaa6a-0cd3-49ab-a313-7026feeba4f2	aga-carbon-rewards	acar	AGA Carbon Rewards	f	\N	2023-05-24	2023-05-24
890a4fed-5c32-43c4-b51e-a5e51feb0eb6	agame	ag	AGAME	f	\N	2023-05-24	2023-05-24
caa9836b-3dd5-4d00-a25b-04ef04aba6b6	aga-rewards	edc	Edcoin	f	\N	2023-05-24	2023-05-24
0be8e00d-f76c-4066-b473-4455b728d3d4	aga-token	aga	AGA	f	\N	2023-05-24	2023-05-24
e664d42d-ff1c-4796-964b-add50d450049	agavecoin	agvc	AgaveCoin	f	\N	2023-05-24	2023-05-24
c493f800-86ca-41df-8534-d413916403a4	agave-token	agve	Agave	f	\N	2023-05-24	2023-05-24
3b85c435-78f2-4b56-a426-52cc9ce083d6	agenor	age	Agenor	f	\N	2023-05-24	2023-05-24
ef1a51d0-e84f-48de-a775-0a83d7452bd2	ageofgods	aog	AgeOfGods	f	\N	2023-05-24	2023-05-24
d9731085-c161-4854-bdc3-f8c95d33e018	age-of-tanks	a.o.t	Age Of Tanks	f	\N	2023-05-24	2023-05-24
85820ab6-735d-446b-9f7b-364beff61fbd	age-of-zalmoxis-koson	koson	Age of Zalmoxis KOSON	f	\N	2023-05-24	2023-05-24
1e609366-34de-4716-916b-151a8cf73026	ageur	ageur	agEUR	f	\N	2023-05-24	2023-05-24
aa6d6073-c530-41ea-a9cd-63d25fe83666	ageur-plenty-bridge	egeur.e	agEUR (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
8784e550-f3af-4c3a-8511-cedeaf96c8e7	aggle-io	aggl	aggle.io	f	\N	2023-05-24	2023-05-24
b071e4bb-42ee-4438-baf4-24fcbc5b7e07	agile	agl	Agile	f	\N	2023-05-24	2023-05-24
925fc2a0-47b4-4838-8240-cf7fcab49bb3	agility	agi	Agility	f	\N	2023-05-24	2023-05-24
bae40852-8c83-4b0a-afa7-051f5826905b	agora-defi	agora	Agora Defi	f	\N	2023-05-24	2023-05-24
74804b80-a231-43bc-81b6-b238ea6101ba	agoras-currency-of-tau	agrs	Agoras: Currency of Tau	f	\N	2023-05-24	2023-05-24
9400bd16-082d-413b-a24d-c49e9ecf5e57	agoric	bld	Agoric	f	\N	2023-05-24	2023-05-24
ba5fd232-ad5c-4de7-ac71-d56e878f4048	agrello	dlt	Agrello	f	\N	2023-05-24	2023-05-24
5130d89c-7009-4f92-921b-925f00c2a352	agricoin	agn	Agricoin	f	\N	2023-05-24	2023-05-24
293cfdbc-9650-4333-a70f-d9fb29b7b0d9	agrinode	agn	AgriNode	f	\N	2023-05-24	2023-05-24
e4c7d995-cd27-4605-b963-1e199e115d2b	agritech	agt	Agritech	f	\N	2023-05-24	2023-05-24
3aed60db-48bb-413e-a8b7-3b1ef069540e	agro-global	agro	Agro Global	f	\N	2023-05-24	2023-05-24
a8e78a27-737a-4005-830a-b65c4b2cbd14	agronomist	agte	Agronomist	f	\N	2023-05-24	2023-05-24
bd104a7c-bb60-4020-8e69-6abcd6ae16f8	agx-coin	agx	AGX Coin	f	\N	2023-05-24	2023-05-24
d8e89385-bbdf-4096-8e76-2d8127574240	ahatoken	aht	AhaToken	f	\N	2023-05-24	2023-05-24
32239ffb-f2da-4234-bdeb-46c00c88b04f	a-hunters-dream	caw	A Hunters Dream	f	\N	2023-05-24	2023-05-24
7288efe6-3256-4845-9c1e-faf5ec161a05	aibra	abr	AIBRA	f	\N	2023-05-24	2023-05-24
8e5bf2ff-5849-44a0-8366-96f07322fac9	ai-card-render	acr	AI Card Render	f	\N	2023-05-24	2023-05-24
f9e63c5f-2327-4fe9-8ed4-e33b92e78d3b	aichain	ait	AICHAIN	f	\N	2023-05-24	2023-05-24
e16e8e7c-a933-472d-926e-540f9de7dcbe	ai-code	aicode	AI CODE	f	\N	2023-05-24	2023-05-24
54f5e195-1bd1-4dc3-8ee7-4ff11f91fd74	aicoin-2	ai	AICoin	f	\N	2023-05-24	2023-05-24
13c1537b-5916-4893-80c3-6072aaa78610	aicon	aico	Aicon	f	\N	2023-05-24	2023-05-24
90f676f7-2722-4a04-afcf-140d910be4d0	aidcoin	aid	AidCoin	f	\N	2023-05-24	2023-05-24
5fa72171-42a1-4624-8f5d-6be765ab9cff	aidi-finance-2	aidi	Aidi Finance	f	\N	2023-05-24	2023-05-24
38d03333-8305-4273-845c-d4e1aaed14ad	ai-dogemini	aidogemini	AI DogeMini	f	\N	2023-05-24	2023-05-24
b036ab91-63e9-4a08-8bf5-3bd546992691	aidos-kuneen	adk	Aidos Kuneen	f	\N	2023-05-24	2023-05-24
7dc1ece2-4855-4497-82a1-e8c89e9bd760	aienglish	aien	AIENGLISH	f	\N	2023-05-24	2023-05-24
ea01f90a-63a5-4337-b19b-c1317ef0f0f9	ai-floki	aifloki	AI Floki	f	\N	2023-05-24	2023-05-24
3e8a385d-c2d4-4524-9fcc-8ed018932143	aimedis-new	aimx	Aimedis (NEW)	f	\N	2023-05-24	2023-05-24
504503ea-4704-4cf0-9562-da5158dd47e6	ai-network	ain	AI Network	f	\N	2023-05-24	2023-05-24
4ef15dbb-b8a0-4d20-a432-fdeb1199a269	ainu-token	ainu	Ainu	f	\N	2023-05-24	2023-05-24
69da3783-7ab9-4ff9-9fa2-2793e784230a	aion	aion	Aion	f	\N	2023-05-24	2023-05-24
140eb2c9-a757-410a-9f34-c8566b976884	aione	aione	AiONE	f	\N	2023-05-24	2023-05-24
20883a38-99c5-4322-82c6-c05a8e48f565	aioz-network	aioz	AIOZ Network	f	\N	2023-05-24	2023-05-24
714fc520-f82c-49e7-bfcc-b7e0ba7ae421	aipad	aipad	AIPad	f	\N	2023-05-24	2023-05-24
4ab72ad0-d996-40af-b4bd-e633403c8bd7	aipeople	aipeople	AIPeople	f	\N	2023-05-24	2023-05-24
97d309a9-c75d-4447-bdc8-cd0a451c7877	aiptp	atmt	AiPTP	f	\N	2023-05-24	2023-05-24
c334f897-2271-4db0-b817-6050c379cca0	airbloc-protocol	abl	Airbloc	f	\N	2023-05-24	2023-05-24
8abb1c27-f339-4b79-bf59-354419032aaf	aircoin-2	air	AirCoin	f	\N	2023-05-24	2023-05-24
4b535896-a268-4907-9bf6-0c72f5ae2697	aircoins	airx	Aircoins	f	\N	2023-05-24	2023-05-24
61b8e431-ba5a-4392-b55a-e33f3c42a99a	airight	airi	aiRight	f	\N	2023-05-24	2023-05-24
f00628ea-9b8a-4619-add7-ea9015d0a44f	airnft-token	airt	AirNFT	f	\N	2023-05-24	2023-05-24
267fe55d-c935-4033-9f01-51b1ea1eaf71	airswap	ast	AirSwap	f	\N	2023-05-24	2023-05-24
de0c3ab9-7874-440b-918c-f4248c210a94	airtnt	airtnt	AirTnT	f	\N	2023-05-24	2023-05-24
efdb5429-ef9b-410f-b387-c548f87768b0	airtor-protocol	ator	AirTor Protocol	f	\N	2023-05-24	2023-05-24
6b39a1ba-5310-4a5d-8de4-5d537ba868a0	aishiba	shibai	AiShiba	f	\N	2023-05-24	2023-05-24
8a19a7d1-6a65-4301-b71d-627e32ba11e8	ai-smart-chain	aisc	Ai Smart Chain	f	\N	2023-05-24	2023-05-24
ba0e3524-93fb-4ed1-aeaa-e944e4053149	ai-trader	ait	AI Trader	f	\N	2023-05-24	2023-05-24
d3dddb15-7cb4-4c87-8d23-fe25ebb65b17	aitravis	tai	AITravis	f	\N	2023-05-24	2023-05-24
3c112f23-c5c2-42a3-987c-e7a017a3de2b	aiwallet	aiwallet	AiWallet	f	\N	2023-05-24	2023-05-24
f0634315-a251-4c9b-888c-d35a7f614b78	aiwork	awo	AiWork	f	\N	2023-05-24	2023-05-24
bf5725d1-4063-432e-8236-6c023c620f41	ajna-protocol	ajna	Ajna Protocol	f	\N	2023-05-24	2023-05-24
6ada6508-b2c8-4ce9-bc89-03ffce8af4c3	ajuna-network	baju	Ajuna Network	f	\N	2023-05-24	2023-05-24
ff9855a8-352c-4f41-96ea-e10913b1643b	akash-network	akt	Akash Network	f	\N	2023-05-24	2023-05-24
ccbb4e70-796c-449f-bd9b-cb17da7dc14c	aki-protocol	aki	Aki Protocol	f	\N	2023-05-24	2023-05-24
409477a6-b2fd-4f79-9f90-cd92305f4ac2	akita-dao	hachi	Akita DAO	f	\N	2023-05-24	2023-05-24
a41629e7-4e26-47c8-850f-eee25dfd7cf9	akita-inu	akita	Akita Inu	f	\N	2023-05-24	2023-05-24
9e9dd8cf-16d7-4551-99a5-76b338a1f655	akita-inu-asa	akta	Akita Inu ASA	f	\N	2023-05-24	2023-05-24
258e8bf7-d93e-48f6-84d4-c3d7ebcd98ed	akitavax	akitax	Akitavax	f	\N	2023-05-24	2023-05-24
5cdeb880-356a-4f8d-90b8-7833d3862819	akitsuki	aki	Akitsuki	f	\N	2023-05-24	2023-05-24
7f6a54fe-4aad-42cc-b614-b411dd29e715	akoin	akn	Akoin	f	\N	2023-05-24	2023-05-24
f8d3b260-88c7-4682-af87-bbebdb729b32	akroma	aka	Akroma	f	\N	2023-05-24	2023-05-24
7b9c6f46-2344-4179-8f23-a966ce2443f0	akropolis	akro	Akropolis	f	\N	2023-05-24	2023-05-24
1020ad86-836b-4c8c-ab29-2b8c1dce49c7	akropolis-delphi	adel	Delphi	f	\N	2023-05-24	2023-05-24
8b4cb9ec-12c7-4c93-8bab-60a50f56d6c9	aktio	aktio	Aktio	f	\N	2023-05-24	2023-05-24
1622e550-0950-4c75-b8eb-559ca6b9710e	aladdin-cvxcrv	acrv	Aladdin cvxCRV	f	\N	2023-05-24	2023-05-24
491a893b-5d35-4161-b48e-8b56ed0971d7	aladdin-dao	ald	Aladdin DAO	f	\N	2023-05-24	2023-05-24
bc8a0c56-afe9-4ab0-991a-c163af5ea9c0	alanyaspor-fan-token	ala	Alanyaspor Fan Token	f	\N	2023-05-24	2023-05-24
b00f2509-33c2-4458-97dd-46fe645a3098	alaska-gold-rush	carat	Alaska Gold Rush	f	\N	2023-05-24	2023-05-24
8472ba34-74e8-450b-8dae-c1d2a9bb1517	alaya	atp	Alaya	f	\N	2023-05-24	2023-05-24
2dea1923-5c68-4a3a-84ee-36025355c687	albedo	albedo	ALBEDO	f	\N	2023-05-24	2023-05-24
66e3b57d-c005-4cbe-9add-6e28a523812a	alcazar	alcazar	Alcazar (OLD)	f	\N	2023-05-24	2023-05-24
823126ce-c750-4852-ae2e-3d6a71e5a192	alcazar-2	alcazar	Alcazar	f	\N	2023-05-24	2023-05-24
0c2e9f2c-5c79-40fa-804b-7982f7bb5783	alchemist	mist	Alchemist	f	\N	2023-05-24	2023-05-24
cc419a83-4349-4301-8c8a-c35e9e914e11	alchemix	alcx	Alchemix	f	\N	2023-05-24	2023-05-24
b0a803ed-5f79-49a4-b21d-3dfe4634eda8	alchemix-eth	aleth	Alchemix ETH	f	\N	2023-05-24	2023-05-24
af86d574-fd7e-4448-b846-9ec790325490	alchemix-usd	alusd	Alchemix USD	f	\N	2023-05-24	2023-05-24
1033d4e7-ca35-42b0-aa42-8df427a658de	alchemyai	acoin	AlchemyAi	f	\N	2023-05-24	2023-05-24
2f9accd3-0611-4f6e-910b-dd81cc7be193	alchemy-pay	ach	Alchemy Pay	f	\N	2023-05-24	2023-05-24
02182831-f080-49a1-b665-7ffda8378eab	aldrin	rin	Aldrin	f	\N	2023-05-24	2023-05-24
15a4bc1b-32e2-45c6-9d93-863b1af17376	aleph	aleph	Aleph.im	f	\N	2023-05-24	2023-05-24
48b4e737-d26d-47a3-82f7-973e2543fdd6	alephium	alph	Alephium	f	\N	2023-05-24	2023-05-24
ca48c980-ec29-4537-8272-e0c6ff33c81c	aleph-zero	azero	Aleph Zero	f	\N	2023-05-24	2023-05-24
98a20058-8c70-4e98-906e-34ccc7cf4e98	alert	alert	ALERT	f	\N	2023-05-24	2023-05-24
e4bccc92-1687-4cb8-aff1-3d80eda012c9	alethea-artificial-liquid-intelligence-token	ali	Artificial Liquid Intelligence	f	\N	2023-05-24	2023-05-24
f309c554-0df5-4326-a743-b44964c53d2c	alex-b20	$b20	ALEX $B20	f	\N	2023-05-24	2023-05-24
e8d0021b-a2ba-46d7-bcdb-c4e54e9be04d	alexgo	alex	ALEX Lab	f	\N	2023-05-24	2023-05-24
789278b3-9868-4431-906e-26f00301d601	alex-wrapped-usdt	susdt	ALEX Wrapped USDT	f	\N	2023-05-24	2023-05-24
a24b8635-1b61-4366-9903-9d1c3aeb09d5	alfa-romeo-racing-orlen-fan-token	sauber	Alfa Romeo Racing ORLEN Fan Token	f	\N	2023-05-24	2023-05-24
1e66adf9-b4ac-425a-b7de-db2297b2aa1d	alfprotocol	alf	AlfProtocol	f	\N	2023-05-24	2023-05-24
9bfc64d6-3e88-41f1-878d-beb46baee218	algebra	algb	Algebra	f	\N	2023-05-24	2023-05-24
27fa29fc-edbd-4ef4-b1d3-c427f3d16797	algoblocks	algoblk	AlgoBlocks	f	\N	2023-05-24	2023-05-24
f59dee7c-af8b-4c51-88df-8c232ba2f294	algofund	algf	AlgoFund	f	\N	2023-05-24	2023-05-24
0e14f2c7-a789-4ead-a2db-c0d9ae723aff	algomint	gomint	Algomint	f	\N	2023-05-24	2023-05-24
6f597950-05b8-4be1-9774-badd1ab749cf	algorand	algo	Algorand	f	\N	2023-05-24	2023-05-24
48a3a249-1d50-4cca-b396-fcf5aeee67fd	algory	alg	Algory	f	\N	2023-05-24	2023-05-24
f8bcc301-d523-40c6-8ccd-f07467d7c66b	algostable	stbl	AlgoStable	f	\N	2023-05-24	2023-05-24
f7f07f54-c7a8-4e91-97f3-eb90a87ff6db	algostake	stke	AlgoStake	f	\N	2023-05-24	2023-05-24
9df961a8-d8e1-4e5f-89af-9a7ea1b5e2d9	alibabacoin	abbc	ABBC	f	\N	2023-05-24	2023-05-24
270566a2-502c-40da-b3e5-feb080e9e9f3	alibaba-tokenized-stock-defichain	dbaba	Alibaba Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
48168644-0f7a-4bef-ac1c-d3d9a13e0fd1	alicenet	alca	AliceNet	f	\N	2023-05-24	2023-05-24
c50a96aa-4402-4de5-95a2-7e5a0a9aa2f6	alien-chicken-farm	acf	Alien Chicken Farm	f	\N	2023-05-24	2023-05-24
d2834de7-e55e-4821-9752-4be86c080f17	alienfi	alien	AlienFi	f	\N	2023-05-24	2023-05-24
b31cf5f5-f0f8-40c3-8a63-84fc3778dcc7	alien-inu	alien	Alien Inu	f	\N	2023-05-24	2023-05-24
21927f43-ea69-49d7-a09a-f5e523c7985f	alienswap	alien	AlienSwap	f	\N	2023-05-24	2023-05-24
6a0a5fc1-27f3-4562-b118-d1301d1e7b76	alien-worlds	tlm	Alien Worlds	f	\N	2023-05-24	2023-05-24
8658fe13-0c9f-4af6-ad4d-fe26fb70bc82	alif-coin	alif	AliF Coin	f	\N	2023-05-24	2023-05-24
79148b1f-7995-4c79-a9b3-4b2ece23e850	alink-ai	alink	ALINK AI	f	\N	2023-05-24	2023-05-24
890f4a1d-afc5-4ead-bfd1-a40fda66d250	alita	ali	Alita	f	\N	2023-05-24	2023-05-24
ffc44a28-c87c-440a-bc1b-7aa5091fe0e8	alitas	alt	Alitas	f	\N	2023-05-24	2023-05-24
4ba2a648-4942-48b7-a875-012df3ed6ca4	alium-finance	alm	Alium Finance	f	\N	2023-05-24	2023-05-24
a4dfde27-9a08-4d27-a026-5abbca8b4e45	alkimi	$ads	Alkimi	f	\N	2023-05-24	2023-05-24
4f8650db-433b-45df-bb62-0cd803669c1a	all-art	aart	ALL.ART	f	\N	2023-05-24	2023-05-24
f6c9ca0a-17f5-468e-8c47-7d08670fe643	allbridge	abr	Allbridge	f	\N	2023-05-24	2023-05-24
d6fb67d8-31a9-4f86-87f7-2286cd2ec877	all-coins-yield-capital	acyc	All Coins Yield Capital	f	\N	2023-05-24	2023-05-24
2458a9c9-8345-4484-9634-f1599ad27a33	allianceblock	albt	AllianceBlock	f	\N	2023-05-24	2023-05-24
a277b79c-24c6-4934-bbf6-f4c027a3a1ca	allianceblock-nexera	nxra	AllianceBlock Nexera	f	\N	2023-05-24	2023-05-24
835d9f03-f3a1-4afa-bbc5-32bcc94ca59b	alliance-fan-token	all	Alliance Fan Token	f	\N	2023-05-24	2023-05-24
208a64c6-1966-4b0e-8e92-b47eb15a2df6	alliance-x-trading	axt	Alliance X Trading	f	\N	2023-05-24	2023-05-24
885c3722-79ae-4882-8504-a04bd73e1df0	all-in	allin	All In	f	\N	2023-05-24	2023-05-24
a6040920-3c8e-4019-848f-440288279d1c	all-in-ai	aiai	ALLINAI	f	\N	2023-05-24	2023-05-24
841b4e7b-b9c9-4059-b732-1e8198d61e62	all-in-gpt	aigpt	All In GPT	f	\N	2023-05-24	2023-05-24
038f11e6-fe77-4052-8210-18091fd88dcf	allium-finance	alm	Allium Finance	f	\N	2023-05-24	2023-05-24
0f0d1c4e-a225-47d5-9375-e67ace39c641	all-me	me	All.me	f	\N	2023-05-24	2023-05-24
720e4aac-512b-4c1e-ac9c-3aaf37eb5bdf	allpaycoin	apcg	ALLPAYCOIN	f	\N	2023-05-24	2023-05-24
1f5c4e69-7a58-425a-b085-edf15dd75d37	allsafe	asafe	AllSafe	f	\N	2023-05-24	2023-05-24
fec1ac2f-1223-42ed-9d67-b725c25309a5	all-sports-2	soc	All Sports	f	\N	2023-05-24	2023-05-24
1fb39aa6-30f0-42b5-bd17-819d6ae7cda3	allstars	asx	AllStars	f	\N	2023-05-24	2023-05-24
920bc3b0-029a-49e1-9ca6-61126253fd6e	all-time-high	ath	All Time High	f	\N	2023-05-24	2023-05-24
f314dcbe-6dcb-4b9e-8369-a4bea2de7ca5	ally	aly	Ally	f	\N	2023-05-24	2023-05-24
ccff1d24-08ed-455b-ae64-78eb5afc6eb8	ally-direct	drct	Ally Direct	f	\N	2023-05-24	2023-05-24
e96e06a8-8659-4db4-a293-9da65279b353	almira-wallet	almr	Almira Wallet	f	\N	2023-05-24	2023-05-24
d36ea434-2fe9-43ae-9229-c8c80bbf9ef5	almond	alm	Almond	f	\N	2023-05-24	2023-05-24
7784a346-686e-4df5-baf2-3680caca00bc	alnair-finance-nika	nika	Alnair Finance NIKA	f	\N	2023-05-24	2023-05-24
cab24e27-8c62-44fe-8600-a39d0e5144c0	alon-mars	alonmars	Alon Mars	f	\N	2023-05-24	2023-05-24
0dd87620-f1bc-495c-a1b7-7ec350a1b680	alpaca	alpa	Alpaca City	f	\N	2023-05-24	2023-05-24
10feabad-c059-4fc0-bf31-94251b0b9358	alpaca-finance	alpaca	Alpaca Finance	f	\N	2023-05-24	2023-05-24
1346ee3d-ba00-4600-9638-d9a358f70276	alpha5	a5t	Alpha5	f	\N	2023-05-24	2023-05-24
77402fa3-ce86-4006-82b8-7d2951ed1d3c	alphabet	alt	Alphabet	f	\N	2023-05-24	2023-05-24
cd9d3fc6-c022-4298-b405-c386d5b50aed	alpha-brain-capital-2	acap	Alpha Capital	f	\N	2023-05-24	2023-05-24
90b10acd-7648-408e-9b45-696e3f720ae9	alphacoin	alpha	Alpha Coin	f	\N	2023-05-24	2023-05-24
0d737934-3ebc-43d0-bbaa-5c19fbb04c36	alpha-dex	roar	Alpha DEX	f	\N	2023-05-24	2023-05-24
647a53e6-79c1-4d00-902a-8878fc01c882	alpha-finance	alpha	Alpha Venture DAO	f	\N	2023-05-24	2023-05-24
c7bb4ce6-5868-4aa3-ad32-cd03fa12b429	alpha-intelligence	$ai	Alpha Intelligence	f	\N	2023-05-24	2023-05-24
556ef07f-c9b2-4a3e-994c-40b17c83cec3	alpha-quark-token	aqt	Alpha Quark	f	\N	2023-05-24	2023-05-24
0d27c37a-ae31-4b98-814f-fb12f99d906b	alpharushai	rushai	AlphaRushAI	f	\N	2023-05-24	2023-05-24
3343c649-c967-4522-9dbc-37eea38aef69	alpha-shares-v2	$alpha	Alpha Shares V2	f	\N	2023-05-24	2023-05-24
b0f77cf1-3a7d-461e-b10c-f2ccc5e2ba24	alphr	alphr	Alphr	f	\N	2023-05-24	2023-05-24
aac6d95c-aaf9-44d0-b98f-959220384885	alpine-f1-team-fan-token	alpine	Alpine F1 Team Fan Token	f	\N	2023-05-24	2023-05-24
239aa6db-2bef-43fb-8ec3-1c62e998e4be	altair	air	Altair	f	\N	2023-05-24	2023-05-24
82eff186-5205-41df-80da-e86ed965bb53	altava	tava	ALTAVA	f	\N	2023-05-24	2023-05-24
922937f3-141d-473f-bbb9-02312b137b6f	altbase	altb	Altbase	f	\N	2023-05-24	2023-05-24
6535aa66-c637-451e-89f2-5407cfcef5f6	altcommunity-coin	altom	ALTOM	f	\N	2023-05-24	2023-05-24
8d44235e-4591-4b05-bcaa-fe60b12361d3	altered-state-token	asto	Altered State Machine	f	\N	2023-05-24	2023-05-24
fe4cb14d-1d05-4718-8c66-e9ea3f2690c6	alterna-network	altn	Alterna Network	f	\N	2023-05-24	2023-05-24
e6da0536-4c98-448a-a1fe-69dfc6bcfbac	altfins	afins	altFINS	f	\N	2023-05-24	2023-05-24
a424d34d-3a5a-4ec0-87a9-430d96daf7a1	altfolio	alt	altfolio	f	\N	2023-05-24	2023-05-24
0383da33-be2d-46d8-a2bd-ebba8ad7439c	altitude	altd	Altitude	f	\N	2023-05-24	2023-05-24
ba2a5948-d6e0-4238-b94b-8db2e822f951	alt-markets	amx	Alt Markets	f	\N	2023-05-24	2023-05-24
cc98476a-6299-413a-9222-6929f5d4891e	altrucoin-2	altrucoin	Altrucoin	f	\N	2023-05-24	2023-05-24
6e6fd9af-e8c4-4b88-a25d-b7b77fd6465a	altura	alu	Altura	f	\N	2023-05-24	2023-05-24
1be0c2ac-0dea-4dec-b55a-07f9e6f5bf96	aluna	aln	Aluna	f	\N	2023-05-24	2023-05-24
fd702682-b112-4973-841a-8aca43f1cb33	alvey-chain	walv	Alvey Chain	f	\N	2023-05-24	2023-05-24
3d58fdae-00de-443c-9862-dfff7d0ebf63	alyattes	alya	Alyattes	f	\N	2023-05-24	2023-05-24
43756014-e268-4771-8a64-4c9121b09720	amasa	amas	Amasa	f	\N	2023-05-24	2023-05-24
a3b78a0b-c3c7-41be-8996-a4acb627c704	amateras	amt	Amateras	f	\N	2023-05-24	2023-05-24
2931ca93-ddd8-46d0-b1d7-8e59df443110	amaterasufi-izanagi	iza	AmaterasuFi Izanagi	f	\N	2023-05-24	2023-05-24
fe63ab5f-e91c-4874-a85a-322030ddcbca	amaurot	ama	AMAUROT	f	\N	2023-05-24	2023-05-24
e4158307-11f2-416d-836c-ac7e09ab7477	amax-network	amax	AMAX Network	f	\N	2023-05-24	2023-05-24
f57f3d69-48b6-49df-92eb-45548db56720	amazewallet	amt	AmazeToken	f	\N	2023-05-24	2023-05-24
1c781e4e-7fb6-4fea-b918-4e8102fa54e3	amazingteamdao	amazingteam	AmazingTeamDAO	f	\N	2023-05-24	2023-05-24
19fa12e7-5c38-431e-b90e-e60db5fd26e4	amazon-tokenized-stock-defichain	damzn	Amazon Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
02340c53-26ac-480e-94bb-7645f9598a04	amazy	azy	Amazy	f	\N	2023-05-24	2023-05-24
5a1fdf3e-2f62-4530-b3c6-f4140d5640b4	amazy-move-token	amt	Amazy Move Token	f	\N	2023-05-24	2023-05-24
a3352d32-a6a7-4004-9b93-e3bd478dad3d	amber	amb	AirDAO	f	\N	2023-05-24	2023-05-24
9eae34a2-eb0f-4d51-8f64-85c72849f3f8	ambire-wallet	wallet	Ambire Wallet	f	\N	2023-05-24	2023-05-24
44da0425-e55f-4b4a-8deb-b64cd3897cb9	amdg-token	amdg	AMDG	f	\N	2023-05-24	2023-05-24
e59e6909-fa70-4e4d-832e-6c7247dcabc5	amepay	ame	AME Chain	f	\N	2023-05-24	2023-05-24
1731f215-331d-40a6-89e6-0317ca046c93	american-shiba	ushiba	American Shiba	f	\N	2023-05-24	2023-05-24
95272b8b-f28f-4ab0-856f-f44328a17be3	amgen	amg	Amgen	f	\N	2023-05-24	2023-05-24
d19a450a-7d8a-4fd4-bae6-e0ab8ca26a52	ammyi-coin	ami	AMMYI Coin	f	\N	2023-05-24	2023-05-24
6b69a9d8-aec5-4e9e-bd5b-9cc1f29d8433	amo	amo	AMO Coin	f	\N	2023-05-24	2023-05-24
4403e3e2-1625-45e6-8163-42fb932d79e0	amond	amon	AmonD	f	\N	2023-05-24	2023-05-24
29593934-6d82-4215-a7d5-ededcb7162ef	ampleforth	ampl	Ampleforth	f	\N	2023-05-24	2023-05-24
1cd932eb-c00d-44af-841e-f16e49f6508e	ampleforth-governance-token	forth	Ampleforth Governance	f	\N	2023-05-24	2023-05-24
8d5df72c-d9b8-4faf-ab3c-22f6d6dad1af	ampleswap	ample	AmpleSwap	f	\N	2023-05-24	2023-05-24
fdb071f0-f29c-45d5-bbfa-5fa669c7a352	amplifi-dao	agg	AmpliFi DAO	f	\N	2023-05-24	2023-05-24
073912c0-db08-4110-be18-eb8f7e87c9f7	ampnet	aapx	AMPnet	f	\N	2023-05-24	2023-05-24
988c38c9-4fb3-4232-9b07-1c6a073c057d	amp-token	amp	Amp	f	\N	2023-05-24	2023-05-24
fe75fcc5-bda3-439a-8dfa-c19acfa3acd5	amulet-staked-sol	amtsol	Amulet Staked SOL	f	\N	2023-05-24	2023-05-24
95260eaa-bca8-44f7-a7d0-4c7a944d48ab	anarchy	anarchy	Anarchy	f	\N	2023-05-24	2023-05-24
1f72c812-0b40-45f6-9124-f036307444d1	anchor-protocol	anc	Anchor Protocol	f	\N	2023-05-24	2023-05-24
e7ff073b-eb46-4c2b-bb04-765c8bd052e4	anchorswap	anchor	AnchorSwap	f	\N	2023-05-24	2023-05-24
3f4120dc-e781-4415-a55b-b712220f5b3c	ancient-raid	raid	Ancient Raid	f	\N	2023-05-24	2023-05-24
580bcc02-334c-484e-b929-e54fa072524f	andronodes	andro	AndroNodes	f	\N	2023-05-24	2023-05-24
b973a3c7-8e5f-4ca4-bc9b-5434666acab1	anduschain	deb	Anduschain	f	\N	2023-05-24	2023-05-24
162c1cc2-ade1-4e63-9264-0bf8ef2979a7	angel-dust	ad	Angel Dust	f	\N	2023-05-24	2023-05-24
5a839947-e574-4eb8-8ee2-b68cedc3f1bf	angle-protocol	angle	ANGLE	f	\N	2023-05-24	2023-05-24
022bae10-5e82-4609-99f6-dbf48c1cafd8	angola	agla	Angola	f	\N	2023-05-24	2023-05-24
c7011398-b884-458b-ab1c-03b8c81256d4	angryb	anb	Angryb	f	\N	2023-05-24	2023-05-24
d00cfe96-1220-4581-a921-369c2d660b8c	angry-bulls-club	abc	Angry Bulls Club	f	\N	2023-05-24	2023-05-24
3c2f4dbb-2636-414a-9912-af83fc605050	anima	anima	ANIMA	f	\N	2023-05-24	2023-05-24
6b76beb0-6651-44fc-8aff-778bf5a1ae68	animal-concerts-token	anml	Animal Concerts	f	\N	2023-05-24	2023-05-24
af64e374-ce43-4f90-a035-15e04156b598	animalfam	totofo	AnimalFam	f	\N	2023-05-24	2023-05-24
59314790-bf13-4659-9e5f-574e8adb8c86	animal-farm	afd	Animal Farm Dogs	f	\N	2023-05-24	2023-05-24
2cb97324-ec0d-44f8-a647-370364f5bc70	animeswap	ani	AnimeSwap	f	\N	2023-05-24	2023-05-24
d0390484-5254-4618-a9d5-f28e5615d062	anime-token	ani	Anime	f	\N	2023-05-24	2023-05-24
fc7bf782-2393-4907-b6d3-e4ebc57b7890	aniverse	anv	Aniverse	f	\N	2023-05-24	2023-05-24
d2275892-a371-413e-8a52-dbc247d72313	aniverse-metaverse	aniv	Aniverse Metaverse	f	\N	2023-05-24	2023-05-24
ff305cd0-1e1f-4f00-acb4-215891cfe6d6	anji	anji	Anji	f	\N	2023-05-24	2023-05-24
1748df4d-6888-489e-acf2-57b7da3a897a	ankaa-exchange	ankaa	Ankaa Exchange	f	\N	2023-05-24	2023-05-24
4031e6ba-9bab-47a8-9e30-f26c89fa4cbc	ankaragucu-fan-token	anka	Ankaragücü Fan Token	f	\N	2023-05-24	2023-05-24
a485cb33-4ee9-438d-a360-cec681ddf499	ankr	ankr	Ankr Network	f	\N	2023-05-24	2023-05-24
9c70a415-9c75-4f6b-8afa-5dedb394f2b9	ankreth	ankreth	Ankr Staked ETH	f	\N	2023-05-24	2023-05-24
e44c15e9-6d61-4d83-bcc0-44b252b67948	ankr-reward-bearing-ftm	ankrftm	Ankr Staked FTM	f	\N	2023-05-24	2023-05-24
15a6c397-c884-4ecc-b377-bdf36eb8b650	ankr-reward-earning-matic	ankrmatic	Ankr Staked MATIC	f	\N	2023-05-24	2023-05-24
7c6f32ec-c02b-4e61-a32b-553f2bd6f967	ankr-staked-avax	ankravax	Ankr Staked AVAX	f	\N	2023-05-24	2023-05-24
a27d1dff-fdec-437b-aa25-7c8e2cbf03f4	ankr-staked-bnb	ankrbnb	Ankr Staked BNB	f	\N	2023-05-24	2023-05-24
4de36975-aa84-45ea-acd2-28425877b054	anomus-coin	anom	Anomus Coin	f	\N	2023-05-24	2023-05-24
e3c3eb9b-0aec-489f-a151-4bddfe49aeb3	anon	anon	ANON	f	\N	2023-05-24	2023-05-24
a4a0e08d-2d59-4451-b94a-9545364b1a76	anon-inu	ainu	Anon Inu	f	\N	2023-05-24	2023-05-24
66e2cb95-530f-4b3a-96fe-6425e1cde64f	anonzk	azk	AnonZK	f	\N	2023-05-24	2023-05-24
e55aa63f-4990-4d7e-96ac-cdf3c87324a6	another-world	awm	Another World	f	\N	2023-05-24	2023-05-24
60243de5-8537-4854-83a2-34e20165e363	anrkey-x	$anrx	AnRKey X	f	\N	2023-05-24	2023-05-24
72dad99d-9df9-4cda-8a97-3efee251c763	answer-governance	agov	Answer Governance	f	\N	2023-05-24	2023-05-24
cb38fdab-c5fd-411c-a7e1-7ccc7ca34f22	answerly	ansr	Answerly	f	\N	2023-05-24	2023-05-24
4a90bd15-4d82-4638-83c7-74095ea01b10	antedao	ante	AnteDAO	f	\N	2023-05-24	2023-05-24
2c2a6b4e-e447-4d03-bc4b-28686af5eb50	antfarm-governance-token	agt	Antfarm Governance Token	f	\N	2023-05-24	2023-05-24
deed0a13-8f17-4c4f-9aff-64363d8fde01	antfarm-token	atf	Antfarm Token	f	\N	2023-05-24	2023-05-24
afe8ca92-e041-4f62-b51c-4b3d2821b0bc	antgold	antg	AntGold	f	\N	2023-05-24	2023-05-24
638ebe0c-a825-494c-aaab-0b9161444057	antimatter	matter	AntiMatter	f	\N	2023-05-24	2023-05-24
bbdb0261-9479-4ad8-a1fe-7b0604808cc2	antnetworx	antx	AntNetworX	f	\N	2023-05-24	2023-05-24
1939ef63-07a8-441a-bb59-3e2bb72d6b5d	antspace	ant	Antspace	f	\N	2023-05-24	2023-05-24
f076fb3d-31ab-4829-9bf8-d75b7b68018a	anubit	anb	Anubit	f	\N	2023-05-24	2023-05-24
19c30cfb-1532-46e7-beb3-806b61d2ae8d	any-blocknet	ablock	ANY Blocknet	f	\N	2023-05-24	2023-05-24
fe35d59f-8f18-4ad2-b259-e1554a0d05a4	anypad	apad	Anypad	f	\N	2023-05-24	2023-05-24
bc771f1d-fadd-4aa9-8396-7a35824837be	anyswap	any	Anyswap	f	\N	2023-05-24	2023-05-24
98ca7713-ece2-49b8-acd4-6744e019b14e	aok	aok	AOK	f	\N	2023-05-24	2023-05-24
c4aa445a-d113-44f9-9845-5a1a9e760d72	aonea-coin	a1a	Aonea Coin	f	\N	2023-05-24	2023-05-24
f1e99f0d-ee79-498f-b955-8f8d452be0c8	apass-coin	apc	APass Coin	f	\N	2023-05-24	2023-05-24
0c87034e-e22c-41d1-8a67-b400663685e5	apch	apch	APCH	f	\N	2023-05-24	2023-05-24
038989e0-2d8e-4e17-be21-f00d6403ffd2	apecoin	ape	ApeCoin	f	\N	2023-05-24	2023-05-24
7ae6004d-d003-4e7e-9a5e-7b793f06e5eb	aped	aped	Aped	f	\N	2023-05-24	2023-05-24
e5377d77-9c0e-41d5-bb5e-8ab9ad4b0e28	apedoge	aped	Apedoge	f	\N	2023-05-24	2023-05-24
479e4acc-98ff-46cc-b527-c0ef7de5c153	ape-finance	apefi	Ape Finance	f	\N	2023-05-24	2023-05-24
fa8c5705-13ff-49ed-be02-d410f70c8bc1	ape-in	apein	Ape In	f	\N	2023-05-24	2023-05-24
9043a20b-8825-42a5-933d-f8b430e1678e	ape_in_records	air	Ape In Records	f	\N	2023-05-24	2023-05-24
f0813fb1-963b-41e0-b319-180a629158cb	apemove	ape	APEmove	f	\N	2023-05-24	2023-05-24
a07b4f53-6be7-4f60-9d0e-803d10b203e6	apenft	nft	APENFT	f	\N	2023-05-24	2023-05-24
89b71024-e7db-4e9e-b128-14b439c3737c	apes-go-bananas	agb	Apes Go Bananas	f	\N	2023-05-24	2023-05-24
512aabfc-ba09-461e-9cc8-221e33e2f9e3	apeswap-finance	banana	ApeSwap	f	\N	2023-05-24	2023-05-24
6aa54c50-ab82-4627-954c-27b476802f79	ape-universe	apeu	Ape Universe	f	\N	2023-05-24	2023-05-24
21a344d0-779a-44df-acaf-73432eeadf50	artify	afy	Artify	f	\N	2023-05-24	2023-05-24
a0b421a3-fe31-4528-8822-42cf073af7b1	apexit-finance	apex	ApeXit Finance	f	\N	2023-05-24	2023-05-24
19abb04d-36fc-4e09-913e-47d332dcb478	apex-token-2	apex	ApeX	f	\N	2023-05-24	2023-05-24
2e49e080-6b5f-4d7f-ab22-41f73b50969d	api3	api3	API3	f	\N	2023-05-24	2023-05-24
a2890e0c-604c-459d-90c2-17a56a562473	apidae	apt	Apidae	f	\N	2023-05-24	2023-05-24
26b2c02d-8648-4699-9314-b0c0f487e248	apiens	apn	Apiens	f	\N	2023-05-24	2023-05-24
48a1c049-04ac-4feb-9b81-dc2bcc02f278	apix	apix	APIX	f	\N	2023-05-24	2023-05-24
905c2c3d-1575-4459-9e87-e6e33614ba53	apm-coin	apm	apM Coin	f	\N	2023-05-24	2023-05-24
5bdfcd35-64d5-486f-93f4-5820ba3230ad	apollo	apl	Apollo	f	\N	2023-05-24	2023-05-24
f0c8a390-96f4-42e1-b8ce-9fa93cc710e1	apollo-crypto	apollo	Apollo Crypto	f	\N	2023-05-24	2023-05-24
52ea23e5-1019-486b-b00d-5d680cb0375e	apollon-limassol	apl	Apollon Limassol Fan Token	f	\N	2023-05-24	2023-05-24
29b2ee7f-ef2f-44fb-99bf-ea8cd2e404af	apollo-token	apollo	Apollo Token	f	\N	2023-05-24	2023-05-24
f4c69def-5926-44d0-8928-fbf848658f0a	apollox-2	apx	ApolloX	f	\N	2023-05-24	2023-05-24
b13b866e-83c1-438b-8c75-e079701cf8e5	appcoins	appc	AppCoins	f	\N	2023-05-24	2023-05-24
ec20f01f-4d20-4c7a-a125-86c7e5e6eae3	appics	apx	Appics	f	\N	2023-05-24	2023-05-24
27c6eb09-7fc2-4a90-8b64-10ba437f0d6d	apple-tokenized-stock-defichain	daapl	Apple Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
b001d43d-aa80-4fda-8e2a-224cd69a0e53	apricot	aprt	Apricot	f	\N	2023-05-24	2023-05-24
9bb606d0-3e02-40a3-907b-7ff9f6384d9e	april	april	April	f	\N	2023-05-24	2023-05-24
0daed2f0-8481-4df5-8946-c775c2cc5183	apron	apn	Apron	f	\N	2023-05-24	2023-05-24
3e8fd03e-f4ff-4edd-8bd6-9c9937aea056	aptopad	apd	Aptopad	f	\N	2023-05-24	2023-05-24
ec31c4c5-c361-494b-bd2f-00a5e78af5e3	aptos	apt	Aptos	f	\N	2023-05-24	2023-05-24
65c18f2d-aaaf-4cb4-b49a-7e5bb63a5181	aptos-launch-token	alt	AptosLaunch Token	f	\N	2023-05-24	2023-05-24
7fb907ff-40df-4737-b273-bea86e20934d	apwine	apw	APWine	f	\N	2023-05-24	2023-05-24
5482cdd6-af36-45e5-bf49-c5b595353c09	apy-finance	apy	APY.Finance	f	\N	2023-05-24	2023-05-24
0896c4d2-bd82-40b3-ba20-bf50c268ad5e	apyswap	apys	APYSwap	f	\N	2023-05-24	2023-05-24
199fd1a8-e180-47a0-8a77-23782fc99768	apy-vision	vision	APY.vision	f	\N	2023-05-24	2023-05-24
bcfa094d-6bfc-4d36-9a7b-71a35ce1af35	aqtis	aqtis	AQTIS	f	\N	2023-05-24	2023-05-24
0456e102-a3c2-4730-96df-ec28e8416a95	aquachain	aqua	Aquachain	f	\N	2023-05-24	2023-05-24
9417a21a-69a3-4feb-afce-05a1b6a4deee	aquadao	$aqua	AquaDAO	f	\N	2023-05-24	2023-05-24
fc33a3ab-b51e-4d05-8a32-6e6105f6b945	aqua-goat	aquagoat	Aqua Goat	f	\N	2023-05-24	2023-05-24
6a5cf8ad-6087-47bd-b75c-f4c3831eef4a	aquanee	aqdc	Aquanee	f	\N	2023-05-24	2023-05-24
5165f557-0924-4f2a-a62a-ea25f5bb33c6	aquari	aquari	Aquari	f	\N	2023-05-24	2023-05-24
8d1fe4c5-a8b7-47ab-b6a7-064ed4392bc3	aquarius	aqua	Aquarius	f	\N	2023-05-24	2023-05-24
cc84c4b0-611b-4675-9928-7282ae8ef457	aquariuscoin	arco	AquariusCoin	f	\N	2023-05-24	2023-05-24
fbfbb451-2b97-4b33-904f-df62223ba340	aquarius-fi	aqu	Aquarius.Fi	f	\N	2023-05-24	2023-05-24
e9978b1e-2c5a-4680-8d63-415043378b88	aquatank	aqua	AquaTank	f	\N	2023-05-24	2023-05-24
f45f0a93-0b74-4e23-8eeb-e0b687990b6b	arabic	abic	Arabic	f	\N	2023-05-24	2023-05-24
3b1e1613-6de8-4898-b4f1-90b7b44ea584	arable-protocol	acre	Arable Protocol	f	\N	2023-05-24	2023-05-24
a72d3738-82e2-4911-85c4-3c4f6ea5f9ba	arable-usd	arusd	Arable USD	f	\N	2023-05-24	2023-05-24
053367b5-c942-4bf1-9d00-ba0ef38c9e75	aragon	ant	Aragon	f	\N	2023-05-24	2023-05-24
8bcb546c-fd6d-4322-a5c3-9de1a00fa08b	ara-token	ara	Ara	f	\N	2023-05-24	2023-05-24
02926bff-5e4c-4bb5-9150-4667dbc21715	arbdoge-ai	aidoge	ArbDoge AI	f	\N	2023-05-24	2023-05-24
67f113ab-7a67-48fb-b506-cadcca6dd8f7	arb-furbo	farb	Arb Furbo	f	\N	2023-05-24	2023-05-24
ac36923c-aee5-4a81-89a6-e7008c9a1c22	arbidoge	adoge	ArbiDoge	f	\N	2023-05-24	2023-05-24
8d3ff07c-b709-465f-85cd-077c56fd17ec	arbigoat	agt	ArbiGoat	f	\N	2023-05-24	2023-05-24
b9b2d2b5-7b45-42fb-b997-10fbb3a368f8	arbinu	arbinu	Arbinu	f	\N	2023-05-24	2023-05-24
89faf34c-0602-434f-a9a0-27ca52680e76	arbinyan	nyan	ArbiNYAN	f	\N	2023-05-24	2023-05-24
76b04833-1e0b-459a-946e-0f55455ea1b3	arbipad	arbi	ArbiPad	f	\N	2023-05-24	2023-05-24
e14befda-19c9-4075-9664-8c28b51c03a4	arbiroul-casino-chip	roul	ArbiRoul Casino Chip	f	\N	2023-05-24	2023-05-24
c4fdabb0-d95a-462c-8236-d24dba64aa61	arbis-finance	arbis	Arbis Finance	f	\N	2023-05-24	2023-05-24
fa3dd3ae-0ecf-4489-bee5-e8647e1a18f8	arbismart-token	rbis	ArbiSmart	f	\N	2023-05-24	2023-05-24
c30ed17a-777f-469a-a394-d72ed789995b	arbisphere-launchpad	arsh	Arbisphere Launchpad	f	\N	2023-05-24	2023-05-24
b6de94bf-ae1c-4f20-97c5-883bc2a19127	arbiswap-42983059-37e1-4a8f-b46e-0d908c0d4cc0	arbi	ArbiSwap	f	\N	2023-05-24	2023-05-24
008d4c0d-b2ce-4d40-92f4-870eab6bcb77	arbiten	arbiten	ArbiTen	f	\N	2023-05-24	2023-05-24
35bcef8f-cb6f-422e-ba60-c43da12a1a42	arbiten-10share	10share	ArbiTen 10SHARE	f	\N	2023-05-24	2023-05-24
06f58e6b-14a0-4fc1-a2fb-1ab705fd1aba	arbitrum	arb	Arbitrum	f	\N	2023-05-24	2023-05-24
70d49ddf-c44d-48be-97ca-eeb5a1a81d16	arbitrum-charts	arcs	Arbitrum Charts	f	\N	2023-05-24	2023-05-24
698a76d3-a326-42c9-b5d0-9a5310b8d2dc	arbitrum-exchange	arx	Arbidex	f	\N	2023-05-24	2023-05-24
9e684f74-b150-4e45-99da-b7825c0d20f4	arbitrumpad	arbpad	ArbitrumPad	f	\N	2023-05-24	2023-05-24
c4c41457-c342-42d7-bc08-3203e4ce7b20	arbi-wiz	awiz	Arbi Wiz	f	\N	2023-05-24	2023-05-24
6b1485b5-8778-498d-b83b-a904dcdb9955	arbpanda-ai	aipanda	ArbPanda AI	f	\N	2023-05-24	2023-05-24
d72216fd-326a-4618-af55-7e120da2a4b9	arb-protocol	arb	ARB Protocol	f	\N	2023-05-24	2023-05-24
46b4408a-5e19-499d-8fce-e3f82c864caa	arbshib	aishib	ArbShib	f	\N	2023-05-24	2023-05-24
be8b7c8d-9ed0-4765-be27-ce4cad429c2a	arbucks	buck	Arbucks	f	\N	2023-05-24	2023-05-24
c94e6bf1-7756-44bd-b16c-a19f38f62b76	arbys	arbys	Arbys	f	\N	2023-05-24	2023-05-24
42e7880e-a760-4429-816f-f2a2027656dc	arbzilla	zilla	ArbZilla	f	\N	2023-05-24	2023-05-24
eb7ee525-27c2-4990-bc13-c8ef672ebe40	arc	arc	Arc	f	\N	2023-05-24	2023-05-24
1371769c-aef1-46b2-bbcf-faa1e29e309c	arcadeum	arc	Arcadeum	f	\N	2023-05-24	2023-05-24
44237f00-c02d-4a5d-b622-f02e0d0e682b	arcadium	arcadium	Arcadium	f	\N	2023-05-24	2023-05-24
bfa464bf-29ea-4fde-9502-b9e3f61a4c03	arcblock	abt	Arcblock	f	\N	2023-05-24	2023-05-24
cc03f2a5-9519-432c-9104-c3eba17410ca	arcc	arcc	ARCC	f	\N	2023-05-24	2023-05-24
a51b04f2-1eb9-4570-9572-274a1e49bf5c	archangel-token	archa	ArchAngel	f	\N	2023-05-24	2023-05-24
c972d45a-f48c-48ed-9276-6307a4a0028d	arch-blockchains	chain	Arch Blockchains	f	\N	2023-05-24	2023-05-24
692452c5-d12b-439d-8130-54f050534804	cyclos	cys	Cykura	f	\N	2023-05-24	2023-05-24
e2b6a3bc-9529-4e42-8f0f-11d821adb146	archer-dao-governance-token	arch	Archer DAO Governance	f	\N	2023-05-24	2023-05-24
15902605-1f8c-48aa-a187-36f166b8ec45	archerswap-bow	bow	Archerswap BOW	f	\N	2023-05-24	2023-05-24
16161872-f019-482b-890c-7b06397ff155	archerswap-hunter	hunt	ArcherSwap Hunter	f	\N	2023-05-24	2023-05-24
e70bac7d-1f37-41e8-8a48-3efaa0efc142	arch-ethereum-div-yield	aedy	Arch Ethereum Div. Yield	f	\N	2023-05-24	2023-05-24
1d034ab3-40a7-4924-bd0f-0277d162afc3	arch-ethereum-web3	web3	Arch Ethereum Web3	f	\N	2023-05-24	2023-05-24
3e6d6a2b-305e-4d60-ae40-8e0d9e272ddb	archethic	uco	Archethic	f	\N	2023-05-24	2023-05-24
3f0edc1f-cfa8-4e66-ad57-e6cce36d7cdd	archimedes	arch	Archimedes Finance	f	\N	2023-05-24	2023-05-24
d4bd6141-e892-4cbe-ba1e-4ef09274bb81	archive-ai	arcai	Archive AI	f	\N	2023-05-24	2023-05-24
a143cc77-a7ce-4cee-bdbc-755d63f6dc43	archloot	alt	ArchLoot	f	\N	2023-05-24	2023-05-24
d58a7608-544f-4ad5-aa90-8955e71cf0a9	arch-usd-div-yield	addy	Arch USD Div. Yield	f	\N	2023-05-24	2023-05-24
e1b5af05-6860-46ad-a932-7803757e6548	arcona	arcona	Arcona	f	\N	2023-05-24	2023-05-24
bc1d1fa6-e1d4-4831-a8e5-dc237eaaef6c	arcs	arx	ARCS	f	\N	2023-05-24	2023-05-24
48157c68-18e6-4748-887d-49289508e74c	ardana	dana	Ardana	f	\N	2023-05-24	2023-05-24
d7bea92d-754b-468a-9173-96827b8e6753	ardcoin	ardx	ArdCoin	f	\N	2023-05-24	2023-05-24
a4ccd918-aea4-4f71-872e-88a6ddd62630	ardor	ardr	Ardor	f	\N	2023-05-24	2023-05-24
634f63d1-e161-4855-a4db-da88de747125	arena-token	arena	ArenaSwap	f	\N	2023-05-24	2023-05-24
b2d9bcea-1205-44b3-a48f-0c00bf9afe53	arenum	arnm	Arenum	f	\N	2023-05-24	2023-05-24
4c5f4998-fcfe-4b6c-b21e-da6c135169a7	areon-network	area	Areon Network	f	\N	2023-05-24	2023-05-24
d5675f95-3fac-4b1e-ae2b-2af7cddfec36	ares3-network	ares	Ares3 Network	f	\N	2023-05-24	2023-05-24
1b1cdd7b-7a38-42ff-b67b-4cc5f0e21b7b	ares-protocol	ares	Ares Protocol	f	\N	2023-05-24	2023-05-24
c08013ca-7036-46ad-9b56-496e1aa920b5	argentine-football-association-fan-token	arg	Argentine Football Association Fan Token	f	\N	2023-05-24	2023-05-24
013ad37b-ce52-482f-9dde-2d55d9efb08d	argo	argo	ArGoApp	f	\N	2023-05-24	2023-05-24
f3f17b4c-669c-4abb-b6d1-ac07c5d9e3d3	argo-finance	argo	Argo Finance	f	\N	2023-05-24	2023-05-24
b2dcc8a4-5f8b-43df-a74e-bb4ba3f5fa6b	argon	argon	Argon	f	\N	2023-05-24	2023-05-24
c7cd8973-b99e-40cb-a7a2-a9a2b238ac38	argonon-helium	arg	Argonon Helium	f	\N	2023-05-24	2023-05-24
26194fd9-7a87-4356-8a5c-e738735270de	ari10	ari10	Ari10	f	\N	2023-05-24	2023-05-24
0da2a781-eede-4e57-b7be-f7b3468e657f	aria-currency	ria	aRIA Currency	f	\N	2023-05-24	2023-05-24
5b509e6b-1754-48ea-a232-ee7712875bfb	ariadne	ardn	Ariadne	f	\N	2023-05-24	2023-05-24
8d307603-6816-47ef-a5aa-ab931096e94a	arianee	aria20	Arianee	f	\N	2023-05-24	2023-05-24
e3bdd997-f3ee-4ea4-ac33-faac891e2c6e	arion	arion	Arion	f	\N	2023-05-24	2023-05-24
f8658472-a645-427b-bdb1-6ec5dc1ff360	ari-swap	ari	Ari Swap	f	\N	2023-05-24	2023-05-24
1cdb4746-7769-4154-81ee-9f34aa7ecced	ariva	arv	Ariva	f	\N	2023-05-24	2023-05-24
e29c681f-5967-48e8-82e9-1bd0bcf31def	arix	arix	Arix	f	\N	2023-05-24	2023-05-24
eecc5669-b37a-464c-9040-d4f54ca030b1	arize	arz	ARize	f	\N	2023-05-24	2023-05-24
beac966f-d31c-4a1d-a513-64d8fa7e4507	ark	ark	ARK	f	\N	2023-05-24	2023-05-24
9343ec83-e872-4ce1-8f16-c4e5bc388f9b	arkadiko-protocol	diko	Arkadiko	f	\N	2023-05-24	2023-05-24
e8ff516d-e4a6-4c24-a3ff-764f270243c5	arkadiko-usda	usda	Arkadiko USDA	f	\N	2023-05-24	2023-05-24
6b9c54ab-4469-4d50-9e50-f7a6111f976a	arkania-protocol	ania	Arkania Protocol	f	\N	2023-05-24	2023-05-24
693225c6-6452-4f3c-b5eb-2a46fa8f9001	arken-finance	$arken	Arken Finance	f	\N	2023-05-24	2023-05-24
16bc6977-afd1-4fa3-87aa-3f40f29567e2	arker-2	arker	Arker	f	\N	2023-05-24	2023-05-24
fc3259f3-63a2-49a0-9a3e-102b511c33d8	ark-innovation-etf-defichain	darkk	ARK Innovation ETF Defichain	f	\N	2023-05-24	2023-05-24
5a24f094-5061-441b-9283-f6d42106de18	ark-rivals	arkn	Ark Rivals	f	\N	2023-05-24	2023-05-24
9c86c61e-e69b-46e5-9e86-351b52e487c9	armor	armor	ARMOR	f	\N	2023-05-24	2023-05-24
254f8ad5-63e6-4697-8881-9c7ac3646d8c	armour-wallet	armour	Armour Wallet	f	\N	2023-05-24	2023-05-24
a2adf2bb-7992-46b5-a828-f10d9e757b8d	army-node-finance	army	Army Node Finance	f	\N	2023-05-24	2023-05-24
465b6f7b-5b0c-4c98-9f5f-6da03d580967	arnoya-classic	arnc	Arnoya classic	f	\N	2023-05-24	2023-05-24
3301e312-6638-4b19-bb4d-b3e90c05ad86	arora	aror	Arora	f	\N	2023-05-24	2023-05-24
7a0c9086-6926-4fac-9a82-4edfea19935d	arowana-token	arw	Arowana	f	\N	2023-05-24	2023-05-24
667c28b6-3290-4f03-b7b1-c8992204d3e0	arpa	arpa	ARPA	f	\N	2023-05-24	2023-05-24
498c79f9-d32c-408e-b0dc-78ca767110a8	arqma	arq	ArQmA	f	\N	2023-05-24	2023-05-24
3b6f5a45-b38f-4ed8-9210-50595dc31e9c	array	array	Array	f	\N	2023-05-24	2023-05-24
3d21862b-04ef-485a-baec-66f311e0887f	arrland-arrc	arrc	Arrland ARRC	f	\N	2023-05-24	2023-05-24
47fd5ab5-1fff-432e-b144-8335d84e077f	arrland-rum	rum	Arrland RUM	f	\N	2023-05-24	2023-05-24
92919851-fd64-4678-a18f-c649106b3f29	arrow	arw	Arrow	f	\N	2023-05-24	2023-05-24
e18220e8-2274-4e72-b46f-7c1cc7a28ef4	arsenal-fan-token	afc	Arsenal Fan Token	f	\N	2023-05-24	2023-05-24
5d323c65-942f-433d-8722-07751fb3c309	artbyte	aby	ArtByte	f	\N	2023-05-24	2023-05-24
2072f8a5-f6f0-4986-8e42-f156557f60f2	art-can-die	die	ART CAN DIE	f	\N	2023-05-24	2023-05-24
d940ec27-d877-4eaf-b03d-9189ced46ff9	arte	arte	ARTE	f	\N	2023-05-24	2023-05-24
92c99e89-5780-4288-b342-3e98d8f62507	artem	artem	Artem	f	\N	2023-05-24	2023-05-24
91fc6ec3-b3e1-4379-b043-45d1ccc19e1f	artemis	mis	Artemis	f	\N	2023-05-24	2023-05-24
00f2b2d2-799a-4af5-ab91-7c0141496907	artemis-vision	arv	Artemis Vision	f	\N	2023-05-24	2023-05-24
b2ba5a02-68c9-4315-8787-1905ef803631	arteq-nft-investment-fund	arteq	artèQ NFT Investment Fund	f	\N	2023-05-24	2023-05-24
5138a0f4-6203-4481-8c96-c8e8664345f4	artery	artr	Artery	f	\N	2023-05-24	2023-05-24
0da49f3c-9bd4-4e49-b80a-f08395a67ef3	art-gobblers-goo	goo	Art Gobblers Goo	f	\N	2023-05-24	2023-05-24
36cfefaf-dc10-4ae0-801b-a6c8491c0209	artgpt	agpt	artGPT	f	\N	2023-05-24	2023-05-24
f2edf3e2-e962-475c-a3a8-e856847e234f	arth	arth	ARTH	f	\N	2023-05-24	2023-05-24
e0294291-6a7e-4c82-9901-016bbf725c88	arthswap	arsw	ArthSwap	f	\N	2023-05-24	2023-05-24
85782a5f-92ac-43ce-b697-306b54d6d18b	artic-foundation	artic	ARTIC Foundation	f	\N	2023-05-24	2023-05-24
58f857d1-37c4-4afc-bfb7-921862dfb6ac	artichoke	choke	Artichoke	f	\N	2023-05-24	2023-05-24
57d16091-ce8c-4db1-bcec-082e2857ef76	articoin	atc	ArtiCoin	f	\N	2023-05-24	2023-05-24
129ca136-3dbd-4175-830b-350f4aa660fd	artificial-intelligence	ai	Artificial Intelligence	f	\N	2023-05-24	2023-05-24
a32143e4-9971-4ef9-8d18-c5ab4414d485	arti-project	arti	Arti Project	f	\N	2023-05-24	2023-05-24
f05693c1-21ae-4c59-a9af-a3511ccc62d0	artizen	atnt	Artizen	f	\N	2023-05-24	2023-05-24
db2eea87-48fa-4da3-bb03-89186c3debd2	artl	artl	ARTL	f	\N	2023-05-24	2023-05-24
18ca94f8-efbb-492b-8a82-38f8a949aae4	artm	artm	ARTM	f	\N	2023-05-24	2023-05-24
86facdb1-1811-4a92-a695-a1ab8113d7f1	artmeta	$mart	ArtMeta	f	\N	2023-05-24	2023-05-24
c9a2346a-ca84-487f-980d-e76d1d0731bb	artrade	atr	Artrade	f	\N	2023-05-24	2023-05-24
dab97ee2-a91d-4b49-8119-0758500dd97d	artube	att	Artube	f	\N	2023-05-24	2023-05-24
17947d4c-9613-4e20-8dfc-02ba7485b5f1	artx	artx	ARTX	f	\N	2023-05-24	2023-05-24
d311719e-43ff-427f-860d-db66adcb2f4f	arweave	ar	Arweave	f	\N	2023-05-24	2023-05-24
9df88d19-ba27-4904-a41c-a86cc4e5af3e	aryacoin	aya	Aryacoin	f	\N	2023-05-24	2023-05-24
391d438c-f246-4836-9389-9f445bd59230	asan-verse	asan	ASAN VERSE	f	\N	2023-05-24	2023-05-24
8c811fa8-ada9-4f78-9ec2-19b692832ca6	ascension	asn	Ascension	f	\N	2023-05-24	2023-05-24
56636168-cae8-4795-8ad4-adbc64f63182	ascension-protocol	ascend	Ascension Protocol	f	\N	2023-05-24	2023-05-24
fcf3e68f-acd1-4d51-ae2a-b269e2f565c7	asd	asd	AscendEx	f	\N	2023-05-24	2023-05-24
8f5f6a97-3da2-48b5-b279-fe1541b40c84	asgardx	odin	AsgardX	f	\N	2023-05-24	2023-05-24
9d91cc6a-e55a-401a-9df6-571301312860	ash	ash	ASH	f	\N	2023-05-24	2023-05-24
d856ff1d-a928-4c35-834a-495b21d95bff	ashera	ash	Ashera	f	\N	2023-05-24	2023-05-24
0d8d2116-48a1-44ba-b92e-8d85f2127e23	ashswap	ash	AshSwap	f	\N	2023-05-24	2023-05-24
438e0161-574c-4c48-bbd0-6d4e8e8b4832	ash-token	ash	Ash Token	f	\N	2023-05-24	2023-05-24
3c026adc-a202-43a5-b5f4-cb20568e4250	asia-coin	asia	Asia Coin	f	\N	2023-05-24	2023-05-24
0b562c93-9b43-4111-b36e-495af26434fe	asic-token	asic	ASIC Token	f	\N	2023-05-24	2023-05-24
bb9c9cd6-4289-4137-b386-bf28bc2babda	asimi	asimi	ASIMI	f	\N	2023-05-24	2023-05-24
561938a3-3079-4adf-a83a-f83696651c19	asix	asix	ASIX	f	\N	2023-05-24	2023-05-24
a330893c-c0cd-46eb-921e-d65002cdd56d	asixplus	asix+	AsixPlus	f	\N	2023-05-24	2023-05-24
96528e94-9a23-4545-907d-240648bc9030	ask-chip	chip	Ask Chip	f	\N	2023-05-24	2023-05-24
de6172ff-e3f0-407d-8d17-4a3b21905635	askobar-network	asko	Asko	f	\N	2023-05-24	2023-05-24
5ffa0fd6-b0b3-4eb6-a045-a607bd7d5c82	as-monaco-fan-token	asm	AS Monaco Fan Token	f	\N	2023-05-24	2023-05-24
44207ba0-c64d-4459-94d1-ffdb7ab01372	aspo-world	aspo	ASPO World	f	\N	2023-05-24	2023-05-24
f9aa1179-bcf6-41e2-98b2-454dbeff635e	as-roma-fan-token	asr	AS Roma Fan Token	f	\N	2023-05-24	2023-05-24
25838e66-5332-4b98-825a-f7fb2845dac7	assangedao	justice	AssangeDAO	f	\N	2023-05-24	2023-05-24
853bdba5-07c9-4a08-a626-d2a96d28b62b	assaplay	assa	AssaPlay	f	\N	2023-05-24	2023-05-24
866b9451-65df-4cc8-aaf0-69111db1bdbf	assemble-protocol	asm	Assemble Protocol	f	\N	2023-05-24	2023-05-24
66f1b467-1d80-40df-9450-026dabf9f938	assent-protocol	asnt	Assent Protocol	f	\N	2023-05-24	2023-05-24
b8b90e14-54a4-45ee-ae12-3a489175908e	assetmantle	mntl	AssetMantle	f	\N	2023-05-24	2023-05-24
f0c8440d-c4f1-45a4-9edb-5b5f320d0399	asta	asta	ASTA	f	\N	2023-05-24	2023-05-24
291c1202-ac1e-495a-a5aa-f7cc6d78fff4	astar	astr	Astar	f	\N	2023-05-24	2023-05-24
46cb6e11-44ad-4160-b236-813243e4bd4a	astar-moonbeam	$xcastr	Astar (Moonbeam)	f	\N	2023-05-24	2023-05-24
189de975-4432-4f7d-b516-d89b3972e4be	aster	atc	Aster	f	\N	2023-05-24	2023-05-24
07e10694-0391-4ad7-aa4e-58a1cf221cef	ast-finance	ast	AST.finance	f	\N	2023-05-24	2023-05-24
f9a62e92-07fe-46b3-a57c-374894664d4a	aston-martin-cognizant-fan-token	am	Aston Martin Cognizant Fan Token	f	\N	2023-05-24	2023-05-24
a26d820b-5e02-4211-b8a9-0c73c5718725	aston-villa-fan-token	avl	Aston Villa Fan Token	f	\N	2023-05-24	2023-05-24
69e5acc4-7ca4-4fc3-a002-fe5656d3fce7	astra-dao	astra	Astra DAO	f	\N	2023-05-24	2023-05-24
139ffcc6-53f8-4b1c-a10a-87823504617e	astrafer	astrafer	Astrafer	f	\N	2023-05-24	2023-05-24
786a3cbd-e12b-4317-8140-4c5e3654675c	astra-guild-ventures	agv	Astra Guild Ventures	f	\N	2023-05-24	2023-05-24
cae94a43-28cf-418b-9deb-188ca6724f5c	astral-ai	astral	Astral AI	f	\N	2023-05-24	2023-05-24
235cb71f-1066-41b9-b5dd-6f001a6b5d80	astral-credits	xac	Astral Credits	f	\N	2023-05-24	2023-05-24
c9b92023-05a4-4b7c-b346-fdd97d0d5666	astrals-glxy	glxy	Astrals GLXY	f	\N	2023-05-24	2023-05-24
25fc99a4-1274-4f17-86f7-b8809acefb78	astra-nova	$rvv	Astra Nova	f	\N	2023-05-24	2023-05-24
907d278c-b438-4a86-880e-ca6d33ca3635	astra-protocol-2	astra	Astra Protocol	f	\N	2023-05-24	2023-05-24
d7e82db1-90a0-4621-a036-07dee2eda86b	astrazion	aznt	AstraZion	f	\N	2023-05-24	2023-05-24
77c31cde-2d68-453b-bf46-7c3080d96b55	astriddao-token	atid	AstridDAO	f	\N	2023-05-24	2023-05-24
692c89b8-f28e-4f1b-9e8d-756b72c746db	astroai	astroai	AstroAI	f	\N	2023-05-24	2023-05-24
db64061d-aa73-4df2-b53e-f05dd57b31ab	astro-babies	abb	Astro Babies	f	\N	2023-05-24	2023-05-24
aef0e817-8873-4646-a335-cf75fa8a510e	astroelon	elonone	AstroElon	f	\N	2023-05-24	2023-05-24
5db76601-d4d0-4db5-b69d-7c245e79c652	astronaut	naut	Astronaut	f	\N	2023-05-24	2023-05-24
427c0eaa-f10c-48a1-aa5b-f3fc15c7d6d7	astro-pepe	astropepe	Astro Pepe	f	\N	2023-05-24	2023-05-24
70b2323e-7427-428f-9461-ea73c48bacd2	astroport	astroc	Astroport Classic	f	\N	2023-05-24	2023-05-24
79ab43b9-fc7e-4553-8a55-c73ea8653a2c	astroport-fi	astro	Astroport	f	\N	2023-05-24	2023-05-24
0770ea88-9ec3-4eff-aa77-ff5ffc9c1d50	astrospaces-io	spaces	AstroSpaces.io	f	\N	2023-05-24	2023-05-24
0cd78bb4-06dd-4516-aa27-9c258fd67653	astroswap	astro	AstroSwap	f	\N	2023-05-24	2023-05-24
ece001df-b11b-4416-8ea7-053aff8e1e7b	astrotools	astro	AstroTools	f	\N	2023-05-24	2023-05-24
1cbcebc2-a1d5-4698-a235-7dafd7b8583f	astrox	atx	AstroX	f	\N	2023-05-24	2023-05-24
8ab9e32b-6a95-467b-b8c4-cee5b00014e8	asva	asva	Asva Labs	f	\N	2023-05-24	2023-05-24
6945e5f5-a129-41ec-b497-5e9e3c42bca8	asyagro	asy	ASYAGRO	f	\N	2023-05-24	2023-05-24
65764cc0-79e2-4a7f-bf4c-7e8f61b40e48	asymetrix	asx	Asymetrix	f	\N	2023-05-24	2023-05-24
d73a5672-d266-4cd4-bf8d-97a099bb5e60	atari	atri	Atari	f	\N	2023-05-24	2023-05-24
57b7ba04-c780-435b-b001-1b646566c550	athena-returns-olea	olea	Olea Token	f	\N	2023-05-24	2023-05-24
3c1c5e66-93ce-4851-b433-1ff216fdc9fc	athenas	athenasv2	Athenas	f	\N	2023-05-24	2023-05-24
3b7658f9-c15a-4173-af44-7f56c8362f8c	atheneum	aem	Atheneum	f	\N	2023-05-24	2023-05-24
0b7ffe89-de76-4931-9a9e-d5d3a29c880e	athens	ath	Athens	f	\N	2023-05-24	2023-05-24
8def48c7-7277-4aae-bf4f-478c69fafc59	athos-finance	ath	Athos Finance	f	\N	2023-05-24	2023-05-24
7bede247-14fc-411a-afb6-f76ac19656b7	athos-finance-usd	athusd	Athos Finance USD	f	\N	2023-05-24	2023-05-24
ce0efe53-980e-4efe-a461-430f76ffc0dc	atlantis	atlas	Atlantis	f	\N	2023-05-24	2023-05-24
dc391dcd-3644-44c5-9e50-144a2d10cf2c	atlantis-loans	atl	Atlantis Loans	f	\N	2023-05-24	2023-05-24
0fee138c-ae76-40e7-8db3-7cbc9b8a1135	atlantis-loans-polygon	atlx	Atlantis Loans Polygon	f	\N	2023-05-24	2023-05-24
ce7fcc4a-6c71-4919-a0bf-bc0096ef03e1	atlantis-metaverse	tau	Atlantis Metaverse	f	\N	2023-05-24	2023-05-24
9102585c-ec52-44e4-81dc-65d0c3464b1c	atlas-aggregator	ata	Atlas Aggregator	f	\N	2023-05-24	2023-05-24
be3a52b8-1ae3-4dbe-b741-57e4feed4f94	atlas-dex	ats	Atlas DEX	f	\N	2023-05-24	2023-05-24
56c53d03-e991-4333-916f-32abe75d6430	atlas-fc-fan-token	atlas	Atlas FC Fan Token	f	\N	2023-05-24	2023-05-24
fb278632-7e0e-40f8-996e-315d6588ea3e	atlas-navi	navi	Atlas Navi	f	\N	2023-05-24	2023-05-24
fb507037-9936-4e6c-b10f-838465bdd735	atlas-protocol	atp	Atlas Protocol	f	\N	2023-05-24	2023-05-24
dd8ef05d-a8ea-4a0d-b68b-237e7c333322	atlas-usv	usv	Atlas USV	f	\N	2023-05-24	2023-05-24
7fbc11a4-0bf8-43c8-b512-701005fc4a90	atletico-madrid	atm	Atletico Madrid Fan Token	f	\N	2023-05-24	2023-05-24
1d4e0e12-a894-46eb-a783-0af5f2d3e3e7	atomic-wallet-coin	awc	Atomic Wallet Coin	f	\N	2023-05-24	2023-05-24
8c71875c-ee27-4fad-b0dc-a4dc2584aa64	atompad	atpad	AtomPad	f	\N	2023-05-24	2023-05-24
f00db144-56a5-43bf-af06-bce6694e0ade	atpay	atpay	AtPay	f	\N	2023-05-24	2023-05-24
5f5a93c1-afab-4d13-99af-cd8b3e428d0a	atromg8	ag8	ATROMG8	f	\N	2023-05-24	2023-05-24
8984fce1-d789-4ae5-bf4d-80bc2971d7e1	attack-wagon	atk	Attack Wagon	f	\N	2023-05-24	2023-05-24
acb6e9e1-a85b-4146-b17a-0676995f2253	attila	att	Attila	f	\N	2023-05-24	2023-05-24
943333b0-374c-405b-be7c-6c79d063fc64	auction	auction	Bounce	f	\N	2023-05-24	2023-05-24
63badfa2-82c1-4476-871b-8751cc8527b0	auctus	auc	Auctus	f	\N	2023-05-24	2023-05-24
f3ea789d-a7e2-472e-a436-c73fe5841a8f	auditchain	audt	Auditchain	f	\N	2023-05-24	2023-05-24
83da0f7b-530a-4447-81e0-0212eb6b64f7	audius	audio	Audius	f	\N	2023-05-24	2023-05-24
0fd6b433-82df-41b7-b9a9-b0b05db0183e	audius-wormhole	audio	Audius (Wormhole)	f	\N	2023-05-24	2023-05-24
935bdcec-69aa-447b-bc35-d0da6f1a4fc6	augmented-finance	agf	Augmented Finance	f	\N	2023-05-24	2023-05-24
a0a1f64e-3f09-4f21-b990-dc645748823e	augur	rep	Augur	f	\N	2023-05-24	2023-05-24
cfe9a691-68a7-4337-98ca-ea49f3e7d969	augury-finance	omen	Augury Finance	f	\N	2023-05-24	2023-05-24
902373cc-8074-4de3-ad86-bca7fea94f1d	aura-bal	aurabal	Aura BAL	f	\N	2023-05-24	2023-05-24
f2f1a06a-4f72-4f74-ab4c-0eb54330e544	auradx	dalle2	AuradX	f	\N	2023-05-24	2023-05-24
2d2bf292-8d73-4e23-ae1e-0332ac9e4f50	aura-finance	aura	Aura Finance	f	\N	2023-05-24	2023-05-24
4fd7058c-2ac4-4b6a-ac47-f4eeb62c4d6a	auragi	agi	Auragi	f	\N	2023-05-24	2023-05-24
6aec0ab1-7a72-4fc6-9e9a-10c050b8df13	aura-network	aura	Aura Network	f	\N	2023-05-24	2023-05-24
72e88ac4-975f-4945-aa59-4b384e93d907	aura-network-old	aura	Aura Network [OLD]	f	\N	2023-05-24	2023-05-24
1e446810-3772-4330-9620-67b55b0ffd0e	aureo	aur	AUREO	f	\N	2023-05-24	2023-05-24
634e7ff9-549c-4fe5-9409-70c196acd3f1	aureus-nummus-gold	ang	Aureus Nummus Gold	f	\N	2023-05-24	2023-05-24
eef8b7db-cd42-4ec9-bc35-d6ba12e2cf48	aurigami	ply	Aurigami	f	\N	2023-05-24	2023-05-24
1fa9e2e0-b80d-4b88-95ac-3d84fe51bb38	aurix	aur	Aurix	f	\N	2023-05-24	2023-05-24
44356775-33bf-421b-ae29-3d97c18b84e1	aurora	aoa	Aurora Chain	f	\N	2023-05-24	2023-05-24
f5049ce2-6892-4ca9-be23-1473a1915493	auroracoin	aur	Auroracoin	f	\N	2023-05-24	2023-05-24
4eb81c0a-b97c-41ab-aec3-3dcb5475187c	aurora-dao	idex	IDEX	f	\N	2023-05-24	2023-05-24
9ac1d40b-1311-4681-88b1-457442b188e5	aurora-near	aurora	Aurora	f	\N	2023-05-24	2023-05-24
4dd749e4-ed9e-4875-8b32-d31589059a99	auroratoken	aurora	AuroraToken	f	\N	2023-05-24	2023-05-24
a20f7796-7901-4950-813a-99403f91c9fc	aurora-token	$adtx	Aurora Dimension	f	\N	2023-05-24	2023-05-24
4b71f3db-a636-46f8-85a5-4d9773816384	aurory	aury	Aurory	f	\N	2023-05-24	2023-05-24
c052ac44-f754-47bd-894c-bb01a4350b96	aurusx	ax	AurusX	f	\N	2023-05-24	2023-05-24
a460d7df-9074-4412-b2ea-0c8878ce33d1	ausdc	ausdc	SpaceShipX aUSDC	f	\N	2023-05-24	2023-05-24
c63d17b7-f57d-47b9-98b8-7a2edf876520	australian-safe-shepherd	ass	Australian Safe Shepherd	f	\N	2023-05-24	2023-05-24
9cf2e804-6f92-4314-b206-36a30c89d2e5	authencity	auth	Authencity	f	\N	2023-05-24	2023-05-24
1cc1dec2-9c58-4e4a-a273-7d3bf54cca9f	auto	auto	Auto	f	\N	2023-05-24	2023-05-24
d036d7d1-36bb-4832-a5e5-3b17a0cfe362	autobahn-network	txl	Autobahn Network	f	\N	2023-05-24	2023-05-24
fb571b0b-e8b2-46e5-9c4c-92b9c28ff575	auto-core	acore	Auto Core	f	\N	2023-05-24	2023-05-24
8c605260-d4bf-4b1b-b7bf-f3dd81d66458	autocrypto	au	AutoCrypto	f	\N	2023-05-24	2023-05-24
de5d31db-3b25-4b3c-8d7e-f5193ea153b6	autodca	dca	AutoDCA	f	\N	2023-05-24	2023-05-24
afe7fb87-0b8b-4ac2-8d93-0e38d43bbe35	automata	ata	Automata	f	\N	2023-05-24	2023-05-24
a8ffb3db-2b10-4628-829a-c61cf5fb9ac8	autominingtoken	amt	AutoMiningToken	f	\N	2023-05-24	2023-05-24
07a9b9db-8158-442d-b572-635cc4795fb1	auton	atn	Auton	f	\N	2023-05-24	2023-05-24
e8ab8036-fb9f-4660-b635-4cb89f2f558e	autonio	niox	Autonio	f	\N	2023-05-24	2023-05-24
c7073d5f-e483-454a-937f-2ad00bb84b56	autoshark	jaws	AutoShark	f	\N	2023-05-24	2023-05-24
51ff2044-2963-49f9-867e-9d2d446372d0	autosingle	autos	AutoSingle	f	\N	2023-05-24	2023-05-24
dbc3f90a-100d-46d6-8998-ab3b01a9ce71	autumn	autumn	Autumn	f	\N	2023-05-24	2023-05-24
94d0c991-d0b6-42f8-ad0d-b156a117f141	aux-coin	aux	AUX Coin	f	\N	2023-05-24	2023-05-24
69c4e115-bace-485b-a516-1f65de393752	auxilium	aux	Auxilium	f	\N	2023-05-24	2023-05-24
873bf773-40ef-4d01-8d59-fa2db2527440	avadex-token	avex	AvaDex Token	f	\N	2023-05-24	2023-05-24
fcfee26f-9e87-4c4d-8d73-f73cbcdb6851	avalanche-2	avax	Avalanche	f	\N	2023-05-24	2023-05-24
00d48308-540b-40f0-af77-c65cbb6a5ecb	avalanche-wormhole	avax	Avalanche (Wormhole)	f	\N	2023-05-24	2023-05-24
2593a4f6-92fa-4a06-bce6-d3832d8142f0	avalaunch	xava	Avalaunch	f	\N	2023-05-24	2023-05-24
0ffd737f-7cf5-4831-983b-d482796f079b	avaocado-dao	avg	Avocado DAO	f	\N	2023-05-24	2023-05-24
0633ef47-0831-4dda-817a-d8e2964b44b2	avata-network	avat	AVATA Network	f	\N	2023-05-24	2023-05-24
e039c42b-62cb-4dc0-b70a-b56c6f89c09c	avatara-nox	nox	AVATARA NOX	f	\N	2023-05-24	2023-05-24
80096cdf-06b6-4d5a-93ab-8584314072e1	avatar-musk-verse	amv	Avatar Musk Verse	f	\N	2023-05-24	2023-05-24
3dbca5f4-2923-40cf-a97a-f8d54660c2f4	avatly	ava	Avatly	f	\N	2023-05-24	2023-05-24
694fc296-39ee-435e-9089-c96552dcdf78	avaware	ave	Avaware	f	\N	2023-05-24	2023-05-24
168598ba-29e2-4170-b7bb-da553747700c	avaxlauncher	avxl	Avaxlauncher	f	\N	2023-05-24	2023-05-24
cab5be89-4e99-42b7-ab0b-e064342fb295	avaxtars	avxt	Avaxtars	f	\N	2023-05-24	2023-05-24
583d736f-5220-4963-84d9-3204a05f5108	avefarm	ave	AveFarm	f	\N	2023-05-24	2023-05-24
01b7802d-78f7-46e1-b9ae-fd6b0e9b4429	aventus	avt	Aventus	f	\N	2023-05-24	2023-05-24
b88427fa-ffbe-475a-9c9c-54588c30e4c1	avenue-hamilton-token	aht	Avenue Hamilton Token	f	\N	2023-05-24	2023-05-24
f2564d61-e478-4cbf-a70d-7ca65dd09d89	avian-network	avn	AVIAN	f	\N	2023-05-24	2023-05-24
670e176b-a69c-4c69-bc13-d5af27e4cca1	avinoc	avinoc	AVINOC	f	\N	2023-05-24	2023-05-24
c0c364f1-75ae-41a0-ad15-c9c5a69acc50	avme	avme	AVME	f	\N	2023-05-24	2023-05-24
dd197a19-5115-46d1-bad8-ea6755cba176	avnrich	avn	AVNRich	f	\N	2023-05-24	2023-05-24
45f8cf22-6c3e-4861-834a-ee4391bbc52b	avocadocoin	avdo	AvocadoCoin	f	\N	2023-05-24	2023-05-24
4d8f2338-0218-4c89-a221-70d77f46efa5	avoteo	avo	Avoteo	f	\N	2023-05-24	2023-05-24
73d221bf-aef2-4d19-a1fc-1dc9730c1730	axe	axe	Axe	f	\N	2023-05-24	2023-05-24
c3a5a9fe-2947-4698-ac5d-9ee84fe7651a	axel	axel	AXEL	f	\N	2023-05-24	2023-05-24
f1319bdc-a4a5-4bc4-8e50-d280ab85bbce	axelar	axl	Axelar	f	\N	2023-05-24	2023-05-24
a3685c1e-f5f0-4b66-9a25-478df6f828cf	axia	axiav3	Axia	f	\N	2023-05-24	2023-05-24
cb97be40-b6ec-4556-b989-8fb7acd65040	axial-token	axial	Axial Token	f	\N	2023-05-24	2023-05-24
82ec5c53-409f-48f0-99e3-58579a754832	axie-infinity	axs	Axie Infinity	f	\N	2023-05-24	2023-05-24
1d020feb-fc37-42ec-ad31-b115b083b99b	axie-infinity-shard-wormhole	axset	Axie Infinity Shard (Wormhole)	f	\N	2023-05-24	2023-05-24
33a6c2ad-1d8c-4f62-b622-542c891d1a4b	axioms	axi	Axioms	f	\N	2023-05-24	2023-05-24
e57717a4-b725-4a1c-8c43-1eaa248e3833	axion	axn	Axion	f	\N	2023-05-24	2023-05-24
af174f3c-7adb-4c95-882d-7dfcad631bb6	axis-defi	axis	Axis DeFi	f	\N	2023-05-24	2023-05-24
9879187f-1bcd-4800-989f-cb021cef22c1	axis-token	axis	AXIS	f	\N	2023-05-24	2023-05-24
8ae508a9-c6fd-4b96-a933-2a77b1fb175e	axle-games	axle	Axle Games	f	\N	2023-05-24	2023-05-24
00da0b88-40ca-481e-b8bf-9f2b7a136fd4	axl-inu	axl	AXL INU	f	\N	2023-05-24	2023-05-24
a47e7dab-9b28-478d-b84f-14d1adcd077d	axlusdc	axlusdc	Axelar USDC	f	\N	2023-05-24	2023-05-24
c73d65e5-62f3-4b1e-aee6-5decc79b195e	axlwbtc	axlwbtc	axlWBTC	f	\N	2023-05-24	2023-05-24
6bdabff8-59c5-4de0-80dd-a5a261437169	axlweth	axlweth	axlWETH	f	\N	2023-05-24	2023-05-24
90c4b5bd-deb1-45df-98ff-b39cfe4f47c2	axpire	axpr	Moola	f	\N	2023-05-24	2023-05-24
197b4c80-f587-4f8c-a734-f4548536fa7f	azbit	az	Azbit	f	\N	2023-05-24	2023-05-24
f2025d45-eee3-4dff-9ba5-1288336f97cc	azit	azit	azit	f	\N	2023-05-24	2023-05-24
9ab5025f-cdd6-4bdc-a7a4-b7c096829c30	azuki	azuki	Azuki	f	\N	2023-05-24	2023-05-24
f12ec010-2117-4fea-aa61-7364ee06d025	azuma-coin	azum	Azuma Coin	f	\N	2023-05-24	2023-05-24
856e6e81-272c-4ef0-97de-b40f5300ed1e	b20	b20	B20	f	\N	2023-05-24	2023-05-24
353b28f5-8ba6-4b82-bfc5-841a8f72b728	b8dex	b8t	B8DEX	f	\N	2023-05-24	2023-05-24
4a057b49-5000-47b8-a83f-3c96556928b9	baanx	bxx	Baanx	f	\N	2023-05-24	2023-05-24
ad2200a5-db9b-4011-af6e-05e8a2e2f682	baasid	baas	BaaSid	f	\N	2023-05-24	2023-05-24
bb69036a-b1ac-45d8-8cb9-62a65899f11a	babacoin	bbc	Babacoin	f	\N	2023-05-24	2023-05-24
03aefdca-e275-4749-8608-0d1773b14b6d	babb	bax	BABB	f	\N	2023-05-24	2023-05-24
30ab490e-a97c-4582-82e3-cf7da59e474d	babil-token	babil	BABIL TOKEN	f	\N	2023-05-24	2023-05-24
17919997-9938-4ee8-8fd0-05768d3c8080	baby-alvey	balvey	Baby Alvey	f	\N	2023-05-24	2023-05-24
7f341203-d334-44b5-bd75-d345c2fa6982	babyapefunclub	bafc	BabyApeFunClub	f	\N	2023-05-24	2023-05-24
2e24192d-5b68-4ad1-af50-8642fbe5815f	baby-aptos	baptos	Baby Aptos	f	\N	2023-05-24	2023-05-24
a210d9c7-1bd3-46ef-9b60-9f63fcb39ca0	baby-arbitrum	barb	Baby Arbitrum	f	\N	2023-05-24	2023-05-24
eed94344-d087-47e8-89ce-49edde110118	baby-bali	bb	Baby Bali	f	\N	2023-05-24	2023-05-24
532e259d-739d-43ad-a5e4-f77b8311614c	baby-bitcoin	bbtc	Baby Bitcoin	f	\N	2023-05-24	2023-05-24
2b8c5268-0167-4610-98b5-37f9b2b1bf45	babybnbtiger	babybnbtig	BabyBNBTiger	f	\N	2023-05-24	2023-05-24
a3441bd4-b664-431e-be90-10216d8c7281	babyboo	babyboo	BabyBoo	f	\N	2023-05-24	2023-05-24
33494f43-5600-425d-90e1-f571eb7ff2a9	babydogearmy	army	BabyDogeARMY	f	\N	2023-05-24	2023-05-24
33d06146-76a8-421a-84ec-eb6d11c7d4bc	babydogecake	bdc	BabyDogeCake	f	\N	2023-05-24	2023-05-24
df2a8a33-1e23-4c9b-9272-39d8747fda3f	baby-doge-cash	babydogecash	Baby Doge Cash	f	\N	2023-05-24	2023-05-24
6e6cca10-ea49-47a1-8ed5-68c4e511b27d	baby-doge-ceo	babyceo	Baby Doge CEO	f	\N	2023-05-24	2023-05-24
1c1865e6-847a-4902-9153-6438f328dccf	babydoge-ceo	bceo	BabyDoge CEO	f	\N	2023-05-24	2023-05-24
9c05cc43-8f09-4b87-9054-a0f772d571cb	baby-doge-coin	babydoge	Baby Doge Coin	f	\N	2023-05-24	2023-05-24
89f84ae1-056b-454d-83cd-9f0884d5e009	babydoge-coin-eth	babydoge	BabyDoge ETH	f	\N	2023-05-24	2023-05-24
57265dd4-c682-4c14-9d7f-4f6a4803952a	baby-doge-inu	$babydogeinu	Baby Doge Inu	f	\N	2023-05-24	2023-05-24
a309b626-b8ed-4f89-bdbc-ab4599982245	babydot	bdot	BabyDot	f	\N	2023-05-24	2023-05-24
3125a16b-f09f-47c5-a3ca-7da36d14fa92	babyfloki	babyfloki	BabyFloki	f	\N	2023-05-24	2023-05-24
63c4e62c-95ab-4c44-8a1b-fbb09283dc40	baby-floki	babyfloki	Baby Floki	f	\N	2023-05-24	2023-05-24
ab98662a-5a07-4104-a6bd-13a6b7805908	baby-floki-coin	babyflokicoin	Baby Floki Coin	f	\N	2023-05-24	2023-05-24
9249fb65-1741-4889-bc15-52f8b657d712	baby-floki-inu	bfloki	Baby Floki Inu	f	\N	2023-05-24	2023-05-24
6c30adad-4aed-4887-b016-78844e2059af	baby-g	babyg	Baby G	f	\N	2023-05-24	2023-05-24
0f036140-ecc5-4a0e-b520-c5bb9042ed56	babykitty	babykitty	BabyKitty	f	\N	2023-05-24	2023-05-24
f4ec4c68-5b53-4bc7-b8bb-e1442cce544a	baby-lambo-inu	blinu	Baby Lambo Inu	f	\N	2023-05-24	2023-05-24
fadb28e5-596c-40cd-96f8-c8fa82e03609	babylon-finance	babl	Babylon Finance	f	\N	2023-05-24	2023-05-24
39f08c08-dae5-41a2-bfce-4552c83de60f	babylons	babi	Babylons	f	\N	2023-05-24	2023-05-24
372bb7a1-39be-433b-aaa2-a0c8df95b2bd	baby-lovely-inu	blovely	Baby Lovely Inu	f	\N	2023-05-24	2023-05-24
b6cde536-622d-49a0-b354-25ee969c0d28	baby-moon-floki	floki	Baby Moon Floki	f	\N	2023-05-24	2023-05-24
5b180922-6102-4139-9740-8985a8c84fd2	babyokx-2	babyokx	BABYOKX	f	\N	2023-05-24	2023-05-24
9410b8c1-a579-4cbc-abbc-d59835c96325	babypepe	babypepe	BabyPepe	f	\N	2023-05-24	2023-05-24
1c4108e5-90b9-4957-b8b5-74c01c00542c	baby-pepe	baby pepe	Baby Pepe	f	\N	2023-05-24	2023-05-24
b5ce9932-2192-4629-8821-c4d021ea1f1f	babypepeentire	babypepe	BabyPepeEntire	f	\N	2023-05-24	2023-05-24
3bfbcf9c-d21a-42b2-ad4f-e9744737c10a	babyrabbit	babyrabbit	Babyrabbit	f	\N	2023-05-24	2023-05-24
4d02c814-83ed-4e39-b44e-ffb2402e1fab	baby-richard-heart	$brich	Baby Richard Heart	f	\N	2023-05-24	2023-05-24
d5e6dd79-a50d-42b8-9662-4c6fd3a6aad1	baby-ripple	babyxrp	Baby Ripple	f	\N	2023-05-24	2023-05-24
2a691f36-8461-41d8-b726-eefeba1392d7	baby-saitama	babysaitama	Baby Saitama	f	\N	2023-05-24	2023-05-24
727672c7-e67e-4bac-ac5b-34cf5f7efbe0	baby-samo-coin	baby	Baby Samo Coin	f	\N	2023-05-24	2023-05-24
f1b990c6-0b44-423b-b3fb-053eb83b18ed	baby-shark	shark	Baby Shark	f	\N	2023-05-24	2023-05-24
2043c014-6702-469f-8789-3e4135a3de11	baby-shark-tank	bashtank	Baby Shark Tank	f	\N	2023-05-24	2023-05-24
30b51065-1ed3-4034-86df-01e2882565c2	baby-shiba-coin	babyshiba	Baby Shiba Coin	f	\N	2023-05-24	2023-05-24
a8386da5-3f1d-4317-8521-ae19d1ceaf5c	baby-shiba-inu	babyshibainu	Baby Shiba Inu	f	\N	2023-05-24	2023-05-24
7368129a-60ca-4e4d-9fe4-366560b22821	babyshibby-inu	babyshib	BabyShibby Inu	f	\N	2023-05-24	2023-05-24
193d261f-c771-4bee-acab-7aad15ec3cea	babyswap	baby	BabySwap	f	\N	2023-05-24	2023-05-24
c83d6191-0a6c-41c1-83dd-dc02a30babe4	babywhale	bbw	BabyWhale	f	\N	2023-05-24	2023-05-24
41f5ec2b-9272-4e95-9b30-201906599d8d	baby-woj	bwj	Baby WOJ	f	\N	2023-05-24	2023-05-24
d531d6d6-dda7-4414-b250-bfe18752d249	babyxrp	bbyxrp	BabyXrp	f	\N	2023-05-24	2023-05-24
101548f0-b7a0-478e-90ea-b2c3523b7651	bacondao	bacon	BaconDAO	f	\N	2023-05-24	2023-05-24
8b9f2370-b3dd-42d0-b779-45d52bd5fee8	bacon-protocol-home	home	Home	f	\N	2023-05-24	2023-05-24
0d422695-6bad-4ce0-b492-ebdc03f1f6d5	badger-dao	badger	Badger DAO	f	\N	2023-05-24	2023-05-24
61d83598-bf5f-4d2d-aa94-c8b6ddd24fab	badger-sett-badger	bbadger	Badger Sett Badger	f	\N	2023-05-24	2023-05-24
3eb62d65-1010-42e7-8045-407d612d2086	bafi-finance-token	bafi	Bafi Finance	f	\N	2023-05-24	2023-05-24
cb1a3d0d-3cd9-4e2f-9fb1-5da4e58587db	bagholder	bag	Bagholder	f	\N	2023-05-24	2023-05-24
0e88fae3-188e-41a1-8935-85d55bbcbdd9	bahtcoin	bht	Bahtcoin	f	\N	2023-05-24	2023-05-24
3ad942f5-be38-40a6-bbb8-46078d29e55c	bai-stablecoin	bai	BAI Stablecoin	f	\N	2023-05-24	2023-05-24
dd8fa49a-2398-4e88-a122-5a7c509aa35e	baked-token	baked	Baked	f	\N	2023-05-24	2023-05-24
9f044a5e-914b-476d-a715-8e5bc093c582	bakerytoken	bake	BakerySwap	f	\N	2023-05-24	2023-05-24
ee9e7cbd-160c-4d31-b987-de6ea97197f7	bakerytools	tbake	BakeryTools	f	\N	2023-05-24	2023-05-24
71ba8089-edd8-4caf-8d39-ecdc010788e3	baklava	bava	Baklava	f	\N	2023-05-24	2023-05-24
6cfe1998-b44b-42a1-8210-776970ceb95d	balanced-dollars	bnusd	Balanced Dollars	f	\N	2023-05-24	2023-05-24
ad9ab0be-6928-459c-950c-764ada6c79db	balancer	bal	Balancer	f	\N	2023-05-24	2023-05-24
df4ac8b0-5cde-4bcc-a828-97017ca5361e	balancer-80-bal-20-weth	b-80bal-20weth	Balancer 80 BAL 20 WETH	f	\N	2023-05-24	2023-05-24
7278681c-8160-42ff-aa48-54b8a712997f	balancer-boosted-aave-dai	bb-a-dai	Balancer Boosted Aave DAI	f	\N	2023-05-24	2023-05-24
dd12f4f4-3125-4556-bca8-6ea388f83e11	balancer-boosted-aave-usdc	bb-a-usdc	Balancer Boosted Aave USDC	f	\N	2023-05-24	2023-05-24
b80ff41e-965d-4a1f-90c6-fe8b8ada305e	balancer-boosted-aave-usdt	bb-a-usdt	Balancer Boosted Aave USDT	f	\N	2023-05-24	2023-05-24
1c68458f-68af-4179-adc3-d50719de0f0d	balancer-boosted-aave-weth	bb-a-weth	Balancer Aave v3 Boosted Pool (WETH)	f	\N	2023-05-24	2023-05-24
9b641bd5-b007-4b2e-8fd1-04124af5faf8	balance-tokens	baln	Balanced	f	\N	2023-05-24	2023-05-24
5b884516-b628-40ce-bbd0-c002225491a5	balicoin	bali	Bali Coin	f	\N	2023-05-24	2023-05-24
ff71bc0b-ed14-48a3-973d-2ecf5137c33b	bali-social-integrated	bsi	Bali Social Integrated	f	\N	2023-05-24	2023-05-24
53a88e34-a9e1-4b2d-abae-575c32f5e6db	bali-token	bli	Bali Token	f	\N	2023-05-24	2023-05-24
63c52cb7-2f51-4717-b7b2-aed583518f7a	bali-united-fc-fan-token	bufc	Bali United FC Fan Token	f	\N	2023-05-24	2023-05-24
3024ac67-516f-431e-b8a3-2d341e903a5a	balkari-token	bkr	Balkari	f	\N	2023-05-24	2023-05-24
01fe7216-3eaa-4573-a354-e870baa3ed63	ball-coin	ball	BALL Coin	f	\N	2023-05-24	2023-05-24
da0c32f1-8e72-4a98-8637-637b59a0d9bb	balloonsville-air	air	Balloonsville AIR	f	\N	2023-05-24	2023-05-24
15434d3c-7f07-499c-8e52-55fc184411c1	ballswap	bsp	BallSwap	f	\N	2023-05-24	2023-05-24
e3bd6dd9-46ca-4cdd-bdd3-79f47c295538	ball-token	ball	Ball	f	\N	2023-05-24	2023-05-24
c3389e2e-c9f9-43cc-b76f-7e05da77c1bd	balpha	balpha	bAlpha	f	\N	2023-05-24	2023-05-24
3e2c898a-0e48-4e28-a55b-b6a28aa53f91	balto-token	balto	Balto Token	f	\N	2023-05-24	2023-05-24
bb1b9684-493f-449b-836c-f7a0076a603c	bamboo-coin	bmbo	Bamboo Coin	f	\N	2023-05-24	2023-05-24
1f108614-9abc-4dc8-980e-83e0e21e4b8a	bamboo-defi	bamboo	BambooDeFi	f	\N	2023-05-24	2023-05-24
e24c254b-576a-4de2-9733-86843455b67c	bamboo-token-c90b31ff-8355-41d6-a495-2b16418524c2	bbo	PandaFarm (BBO)	f	\N	2023-05-24	2023-05-24
df6172bc-8df2-47c5-adee-327bcb9da6b6	banana	banana	Banana	f	\N	2023-05-24	2023-05-24
1a86f982-6afa-4ded-8643-1c4937f4366e	bananaclubtoken	bct	BananaClubToken	f	\N	2023-05-24	2023-05-24
6c22ee93-9591-409d-a5b1-1e3b89a6b918	banana-coin	bananacoin	Banana Coin	f	\N	2023-05-24	2023-05-24
9d973f6f-ce7a-4be5-bf67-a12271e9e25a	banana-task-force-ape	btfa	Banana Task Force Ape	f	\N	2023-05-24	2023-05-24
9f088fe9-aae1-49a0-a983-a31842ec0732	bananatok	bna	BananaTok	f	\N	2023-05-24	2023-05-24
09757d54-b6bc-46cf-80f5-e1ea59339b03	banana-token	bnana	Chimpion	f	\N	2023-05-24	2023-05-24
6672a74e-583f-452e-8bdc-91923171c513	banano	ban	Banano	f	\N	2023-05-24	2023-05-24
5061a49e-2b8b-4ae6-b517-bccfccc56148	bancor	bnt	Bancor Network	f	\N	2023-05-24	2023-05-24
1ad81aa4-c37f-40b9-8433-3385d860d59b	bancor-governance-token	vbnt	Bancor Governance	f	\N	2023-05-24	2023-05-24
60642034-8fc7-403b-8d23-b341b82b3058	band-protocol	band	Band Protocol	f	\N	2023-05-24	2023-05-24
56c3b2ce-f46c-46a5-8ef3-c58961b62d9f	bankbrc	bank	BANK (Ordinals)	f	\N	2023-05-24	2023-05-24
d003c461-207f-44bc-87ec-1fcab94a0e6a	bankera	bnk	Bankera	f	\N	2023-05-24	2023-05-24
07ef3ae2-740d-4485-8ebb-3977e3f7338e	bankers-dream	bank$	Bankers Dream	f	\N	2023-05-24	2023-05-24
944fe6f3-6b82-41e7-a0d0-89d156408d2b	bankless-bed-index	bed	Bankless BED Index	f	\N	2023-05-24	2023-05-24
77e2ad33-b964-41df-a5db-b76a01b73ccb	bankless-dao	bank	Bankless DAO	f	\N	2023-05-24	2023-05-24
4ce65336-a34b-4f98-99c8-7c3e98e411d5	bankroll-extended-token	bnkrx	Bankroll Extended	f	\N	2023-05-24	2023-05-24
4b2c00c2-8ad9-477e-8088-fd52aac97fed	bankroll-vault	vlt	Bankroll Vault	f	\N	2023-05-24	2023-05-24
6247e9ac-ac0f-402f-9a57-cf277a4fcef4	banksocial	bsl	BankSocial	f	\N	2023-05-24	2023-05-24
eb1fa316-7117-48f3-8d50-054ec4bafdeb	bantu	xbn	Bantu	f	\N	2023-05-24	2023-05-24
80435843-5111-4eb7-a39e-9e692004e24b	bao	bao	BAO	f	\N	2023-05-24	2023-05-24
4706d2b5-ff8a-4538-94f1-8be2aeb0d1fe	bao-finance	bao	Bao Finance	f	\N	2023-05-24	2023-05-24
0ddc48e4-7ec9-42b6-b494-08e6ded1c6e7	bao-finance-v2	bao	Bao Finance V2	f	\N	2023-05-24	2023-05-24
316b605c-6697-472c-8d80-e427a7b2177a	baousd	baousd	baoUSD	f	\N	2023-05-24	2023-05-24
9658da79-bad6-4212-8146-eae55acbea4c	baptlabs	bapt	BaptLabs	f	\N	2023-05-24	2023-05-24
d12427e1-6194-4e0c-982a-0c5cd157e125	barbecueswap	bbq	BarbecueSwap	f	\N	2023-05-24	2023-05-24
71c8245b-76bc-4530-b0a6-1cdf8151427f	bark	bark	Bark	f	\N	2023-05-24	2023-05-24
2b43d415-4ff8-4914-bfb3-77f4b8d688be	barking	bark	Barking	f	\N	2023-05-24	2023-05-24
391577ea-a3b8-4982-bf73-16c2e8a6ec53	barnbridge	bond	BarnBridge	f	\N	2023-05-24	2023-05-24
1d4095a5-dbac-4f32-a7a3-3eb1375289fb	barter	brtr	Barter	f	\N	2023-05-24	2023-05-24
a84e4821-102d-45ab-8273-246ca13b746a	bart-simpson-coin	bart	Bart Simpson Coin	f	\N	2023-05-24	2023-05-24
d6fc3532-1c71-4243-beea-20b73b0b0f06	basan	basan	Basan	f	\N	2023-05-24	2023-05-24
7b0e784a-c433-45bc-9144-4fffeb5825ee	based-ai	bai	Based AI	f	\N	2023-05-24	2023-05-24
0f803844-1104-4bad-822f-a4df8e5cf94a	based-finance	based	Based Finance	f	\N	2023-05-24	2023-05-24
de5c2c53-b747-44bb-b439-5ddca28c3a2b	basedpepe	bpepe	BasedPepe	f	\N	2023-05-24	2023-05-24
877701ab-f78f-4410-87a1-9bafa3b5b939	based-shares	bshare	BASED Shares	f	\N	2023-05-24	2023-05-24
6b791761-16db-4693-821a-af0e1c3fc3ad	base-protocol	base	Base Protocol	f	\N	2023-05-24	2023-05-24
950f5065-475a-403d-a6bf-5ff66d1f4345	basic	basic	BASIC	f	\N	2023-05-24	2023-05-24
ee6f34a0-2c56-4afe-b25a-a37e390f2109	basic-attention-token	bat	Basic Attention	f	\N	2023-05-24	2023-05-24
fc241c24-78a3-4f9d-be0f-ff0aa371fa95	basilisk	bsx	Basilisk	f	\N	2023-05-24	2023-05-24
34fac633-fac2-4a8f-9ba7-d0f969a7a8ad	basis-cash	bac	Basis Cash	f	\N	2023-05-24	2023-05-24
45eaf60c-bd01-4c99-84b4-745f26368f76	basis-gold-share-heco	bags	Basis Gold Share (Heco)	f	\N	2023-05-24	2023-05-24
d0215c79-6335-4f69-a06f-7f4fb6216e75	basis-markets	basis	basis.markets	f	\N	2023-05-24	2023-05-24
380d12dc-8dcc-411c-8daa-727b4a44c6f3	basis-share	bas	Basis Share	f	\N	2023-05-24	2023-05-24
52e493e9-8693-4944-9ab7-b5f421c954b1	basketball-legends	bbl	Basketball Legends	f	\N	2023-05-24	2023-05-24
7f88f7c2-e2e1-42fd-9aa9-99d99fd398c6	basketcoin	bskt	BasketCoin	f	\N	2023-05-24	2023-05-24
30904a92-f18f-4f74-9b73-9f7a5cf162b7	baskonia-fan-token	bkn	Baskonia Fan Token	f	\N	2023-05-24	2023-05-24
e135c0ab-f933-48bc-a495-7aca1e6c3078	bastion-protocol	bstn	Bastion Protocol	f	\N	2023-05-24	2023-05-24
f316e158-a2d4-4821-a518-a07138a83fba	bata	bta	Bata	f	\N	2023-05-24	2023-05-24
5a6ca205-1ee2-4f10-940f-13a8622ed002	battlefly	gfly	BattleFly	f	\N	2023-05-24	2023-05-24
3535f0c6-789d-4f8e-ac9e-9b12f88bdf1d	battle-for-giostone	bfg	Battle For Giostone	f	\N	2023-05-24	2023-05-24
a3e8563b-aa38-446b-b446-dd4a9f350e3a	battleforten	bft	BattleForTEN	f	\N	2023-05-24	2023-05-24
bb11986b-2c94-4a82-a754-c59aae88b773	battle-hero	bath	Battle Hero	f	\N	2023-05-24	2023-05-24
e5e10352-02bc-44a2-b105-819f110d4734	battle-infinity	ibat	Battle Infinity	f	\N	2023-05-24	2023-05-24
69436556-b2fe-4e6c-a194-c92c3bbbebbf	battle-of-guardians-share	bgs	Battle of Guardians Share	f	\N	2023-05-24	2023-05-24
82366b76-ad66-4b29-a8ec-45bf3e7915c7	battle-pets	pet	Hello Pets	f	\N	2023-05-24	2023-05-24
ebd90d7a-d414-40be-80cc-75308f344d32	battle-saga	btl	Battle Saga	f	\N	2023-05-24	2023-05-24
96661612-51b7-4da8-a525-d5f5323e03b1	battleverse	bvc	BattleVerse	f	\N	2023-05-24	2023-05-24
e5baf69e-e437-440e-9108-06a994af3d98	battle-world	bwo	Battle World	f	\N	2023-05-24	2023-05-24
35b62405-3626-4367-b8f7-d9ecd7c251f3	bayc-vault-nftx	bayc	BAYC Vault (NFTX)	f	\N	2023-05-24	2023-05-24
9d5b57f2-e091-4e28-9aa0-3ae3273c5b4d	baymax-finance	bay	BayMax Finance	f	\N	2023-05-24	2023-05-24
3dd98f81-ca41-4fb7-b2ea-c7d7816ec19a	bazaars	bzr	Bazaars	f	\N	2023-05-24	2023-05-24
ee97c2b3-905a-4e7a-bd55-836a4794af85	bb-gaming	bb	BB Gaming	f	\N	2023-05-24	2023-05-24
a7643a31-cb61-4d9c-8716-6c2a3c78bbe3	bbs-network	bbs	BBS Network	f	\N	2023-05-24	2023-05-24
7f4c56da-ab9f-4b71-9651-4d4909e19dba	bcpay-fintech	bcpay	BCPAY FinTech	f	\N	2023-05-24	2023-05-24
bedc7be0-581f-44b7-a119-72b4636eb00b	b-cube-ai	bcube	B-cube.ai	f	\N	2023-05-24	2023-05-24
5f59e84c-e173-4eca-b73f-3ca474f3f178	bdollar	bdo	bDollar	f	\N	2023-05-24	2023-05-24
f0e4fb41-0502-4458-8f44-2d9860b54eb3	beach-token	beach	Beach Token	f	\N	2023-05-24	2023-05-24
e5cc1752-0aba-436b-968c-055340b15dde	beacon	becn	Beacon	f	\N	2023-05-24	2023-05-24
a3466f82-d60a-40a2-82a5-63afb8167a50	beam	beam	BEAM	f	\N	2023-05-24	2023-05-24
503eda89-f3dd-4bb8-85d4-e5a65a13ff4d	beamswap	glint	BeamSwap	f	\N	2023-05-24	2023-05-24
66d41aa6-ab57-4608-ae64-c10e18b206c7	bean	bean	Bean	f	\N	2023-05-24	2023-05-24
5583dd79-2fb8-4fa6-a6c7-046e3b3d8347	bean-cash	bitb	Bean Cash	f	\N	2023-05-24	2023-05-24
aeac508d-7d2d-4ddd-8f84-3892ab8865e4	bear-inu	bear	Bear Inu	f	\N	2023-05-24	2023-05-24
c1bc8451-7bef-487e-b90f-2ee05e3ba7e2	bear-scrub-money	bear	Bear Scrub Money	f	\N	2023-05-24	2023-05-24
abdde54e-bed0-4f32-a3c0-d879633c9f37	beatgen-nft	bgn	BeatGen NFT	f	\N	2023-05-24	2023-05-24
d97767be-2ef8-470f-b918-1ee341ac2ad1	beatzcoin	btzc	BeatzCoin	f	\N	2023-05-24	2023-05-24
ec47e80f-d158-4f1e-983c-3b8cdfaf2a8e	beauty-bakery-linked-operation-transaction-technology	lott	Beauty Bakery Linked Operation Transaction Technology	f	\N	2023-05-24	2023-05-24
457f0941-3204-4770-ae47-ee58b21a2a25	becoswap-token	beco	BecoSwap	f	\N	2023-05-24	2023-05-24
c6535434-cb29-45fc-b0e1-491b6f79de04	bedlingtonterriertoken	bett	BedlingtonTerrierToken	f	\N	2023-05-24	2023-05-24
760f2a51-25bc-45da-a9b8-378750863f49	bedrock	rock	Bedrock	f	\N	2023-05-24	2023-05-24
a7303192-67d9-4c69-a047-cb7837ac4801	beechat	chat	BeeChat	f	\N	2023-05-24	2023-05-24
4ae00c31-3a9f-47e4-91a1-bc8a78d6616d	beeco	bgc	Bee Token	f	\N	2023-05-24	2023-05-24
e2787ee5-1c7b-4be4-8149-b75dbc2d9bef	beefy-escrowed-fantom	beftm	Beefy Escrowed Fantom	f	\N	2023-05-24	2023-05-24
e49548b7-35d4-4498-9d9a-50d46c215752	beefy-finance	bifi	Beefy.Finance	f	\N	2023-05-24	2023-05-24
7da22fe2-fef3-44c0-be03-16595ec991e5	beenode	bnode	Beenode	f	\N	2023-05-24	2023-05-24
ae8602a8-d1a9-48dd-853f-5fb6887f3d22	beer	beer	BEER	f	\N	2023-05-24	2023-05-24
d3ddaf2c-a603-416e-a7ac-903bc8f2479d	beer-money	beer	Beer Money	f	\N	2023-05-24	2023-05-24
ddda281c-8cd5-492a-8b61-f1ffe9d2736e	beethoven-x	beets	Beethoven X	f	\N	2023-05-24	2023-05-24
35c1185a-c426-4369-8f91-56c491c3999d	befasterholdertoken	bfht	BeFaster Holder Token	f	\N	2023-05-24	2023-05-24
2eb62fdf-b940-47d8-9e42-f895b4879b73	befitter	fiu	beFITTER	f	\N	2023-05-24	2023-05-24
46420d3f-fefd-493d-a25c-eb24c80c1808	befitter-health	hee	beFITTER Health	f	\N	2023-05-24	2023-05-24
746b4ce8-dc30-4c3f-8712-ebf815c20225	be-gaming-coin	bgc	Be Gaming Coin	f	\N	2023-05-24	2023-05-24
8f9640e4-e398-4a27-98e1-397333394e73	beholder	eye	Behodler	f	\N	2023-05-24	2023-05-24
e1f73598-f895-4ae8-b4a2-eda70578c010	bela	aqua	Bela Aqua	f	\N	2023-05-24	2023-05-24
87e9b82b-70ee-49ba-9869-a2bbee6f4142	beldex	bdx	Beldex	f	\N	2023-05-24	2023-05-24
06279cd3-b75d-41ec-a9f2-d4447613099c	belifex	befx	Belifex	f	\N	2023-05-24	2023-05-24
53224a4b-d422-4cf6-9078-4ca2962c956f	bella-protocol	bel	Bella Protocol	f	\N	2023-05-24	2023-05-24
1615cafd-dce1-4149-be8d-aa5b0d08fa2c	bellcoin	bell	Bellcoin	f	\N	2023-05-24	2023-05-24
55bf7cf9-ccc9-4c01-b871-283e1e2a8cbf	belt	belt	Belt	f	\N	2023-05-24	2023-05-24
ee151a99-74e3-4f79-bc1e-6a9f471982ce	beluga-fi	beluga	Beluga.fi	f	\N	2023-05-24	2023-05-24
c7b5f3ad-1402-4243-a4c2-65421fd86404	beluga-protocol	bela	Beluga Protocol	f	\N	2023-05-24	2023-05-24
4de0f395-2ca2-4c89-91da-bc2364e37422	bemchain	bcn	Bemchain	f	\N	2023-05-24	2023-05-24
8e2fd73a-3272-413f-848b-0c2335265e17	be-meta-famous	bmf	Be Meta Famous	f	\N	2023-05-24	2023-05-24
aa57e55f-54ce-4d39-b46c-9290630e8c1d	bemil-coin	bem	Bemil Coin	f	\N	2023-05-24	2023-05-24
16e9c555-6a32-47ef-b4f1-b0cc95c08e12	ben-2	ben	Ben	f	\N	2023-05-24	2023-05-24
0cbf287e-f53c-498f-9ccb-83a82790fc41	benddao	bend	BendDAO	f	\N	2023-05-24	2023-05-24
e4425628-d6cc-4c09-b0bf-3e3687d685b5	bened	bnd	Bened	f	\N	2023-05-24	2023-05-24
07f205e1-7f1f-41bb-ac3f-dd3275b8f5c5	benqi	qi	BENQI	f	\N	2023-05-24	2023-05-24
7b2cd983-2aaf-41cb-bbbb-cf428038ed17	benqi-liquid-staked-avax	savax	BENQI Liquid Staked AVAX	f	\N	2023-05-24	2023-05-24
60f52eb2-28b9-49d7-b21e-71262fb99fc6	bent-finance	bent	Bent Finance	f	\N	2023-05-24	2023-05-24
a4a32295-452e-42a5-acdb-407fa929bb3f	benzene	bzn	Benzene	f	\N	2023-05-24	2023-05-24
07e2be85-8809-4a5c-b459-b96ba9caa8b8	bep20-leo	bleo	BEP20 LEO	f	\N	2023-05-24	2023-05-24
e8a25c0c-3b94-4982-a812-1a26731356c4	bepay	becoin	bePAY Finance	f	\N	2023-05-24	2023-05-24
51d82cc4-9def-45ae-a2d2-859d35f997de	bepro-network	bepro	BEPRO Network	f	\N	2023-05-24	2023-05-24
5f5ed46b-cfd2-4f2a-9573-ed75e2f506a4	beradex	brdx	Beradex	f	\N	2023-05-24	2023-05-24
9c704cbb-5f6f-4484-8dc3-340834f2afb9	bergerdoge	bergerdoge	BergerDoge	f	\N	2023-05-24	2023-05-24
3c362659-65fd-4b5d-888a-424774667bf4	bermuda	bmda	Bermuda	f	\N	2023-05-24	2023-05-24
b5da2de9-fc57-4f39-95e7-dac7bbe13957	berry	berry	Berry	f	\N	2023-05-24	2023-05-24
eb65cdcf-4cff-49bf-8ad2-9b2277a5b149	berry-data	bry	Berry Data	f	\N	2023-05-24	2023-05-24
695d2465-9d37-461b-817a-115ad5b3c9ef	berryswap	berry	BerrySwap	f	\N	2023-05-24	2023-05-24
e0f0ca72-16c5-47b0-92ae-1826040b4acb	berylbit	brb	Berylbit Layer-3 Network	f	\N	2023-05-24	2023-05-24
8d2b2332-54f0-45f3-8de7-4917a5ec2fbf	beshare-token	bst	Beshare	f	\N	2023-05-24	2023-05-24
8c822346-47b5-4336-ab5f-7bea35b39d2b	beskar	bsk-baa025	Beskar	f	\N	2023-05-24	2023-05-24
22d6ee9c-d022-49ad-a8eb-79e456b6d0d3	bestay	bsy	Bestay	f	\N	2023-05-24	2023-05-24
2944c69a-5ced-456f-99ef-4e00341485c3	bet2bank	bxb	Bet2Bank	f	\N	2023-05-24	2023-05-24
9af6e9ea-850d-4904-a6f6-f0882a95e23b	beta-finance	beta	Beta Finance	f	\N	2023-05-24	2023-05-24
c97c78c0-7c64-41f7-99f2-f4ddc946eb10	beta-token	beta	Beta	f	\N	2023-05-24	2023-05-24
cc9063d0-4622-4faa-bc36-eeae6a9aaad8	betero	bte	Betero	f	\N	2023-05-24	2023-05-24
da9ebc0e-b2b4-49d2-97e6-639a7571b89c	betswap-gg	bsgg	Betswap.gg	f	\N	2023-05-24	2023-05-24
e37c0937-3ea7-4376-817d-54b4951e5bc2	betswirl	bets	BetSwirl	f	\N	2023-05-24	2023-05-24
f88c5e7f-6e36-4cba-b9f8-c62462709185	betted	bet	Betted	f	\N	2023-05-24	2023-05-24
7acd2096-3634-4e45-afc1-c8bd72758eed	betterfan	bff	BetterFan	f	\N	2023-05-24	2023-05-24
3085f867-de62-45e8-a2f0-4efc42fca9b5	betterment-digital	bemd	Betterment Digital	f	\N	2023-05-24	2023-05-24
b9236ada-e2ae-4f2c-83b2-7c9e3ae6a898	betu	betu	Betu	f	\N	2023-05-24	2023-05-24
0dc33d68-df5d-4717-b4cc-2ebf77e3d76f	beyondcoin	bynd	Beyondcoin	f	\N	2023-05-24	2023-05-24
a6d9a357-00ff-4b5a-8fd6-30b3dfa0aad2	beyond-finance	byn	NBX	f	\N	2023-05-24	2023-05-24
28a46dab-82d6-47be-ad73-5395034e190c	beyondpay	bpay	Beyondpay	f	\N	2023-05-24	2023-05-24
c74f0ead-807d-4cf0-b40a-07bcd1d915ea	beyond-protocol	bp	Beyond Protocol	f	\N	2023-05-24	2023-05-24
859902ca-6968-4ae1-9a4e-1a2f3d61fccc	bezoge-earth	bezoge	Bezoge Earth	f	\N	2023-05-24	2023-05-24
d7b15fbb-a378-4623-bd42-b88aeae21d97	bfg-token	bfg	BetFury	f	\N	2023-05-24	2023-05-24
0bb8d649-e9f5-4612-a9b3-a3fa962880f5	bficoin	bfic	Bficoin	f	\N	2023-05-24	2023-05-24
95aafe81-79a8-4e84-b213-f9890519274c	bfk-warzone	bfk	BFK WARZONE	f	\N	2023-05-24	2023-05-24
cb9af47a-5512-4f27-8824-65935e41262f	bhnetwork	bhat	BHNetwork	f	\N	2023-05-24	2023-05-24
52866e7c-f7f4-4f07-a8c4-a60f454faf24	bho-network	bho	BHO Network	f	\N	2023-05-24	2023-05-24
b0191699-cb2b-4da5-a360-9d8563c17642	bibi	bibi	BIBI	f	\N	2023-05-24	2023-05-24
7e749c2b-1cdc-4e24-bdeb-69298a280bf1	biblecoin	bibl	Biblecoin	f	\N	2023-05-24	2023-05-24
fb65deca-1db3-4ef2-8df9-0467da3499a9	biblepay	bbp	BiblePay	f	\N	2023-05-24	2023-05-24
bdd85c3f-5d4f-490c-ba01-4121667058f6	bibox-token	bix	Bibox	f	\N	2023-05-24	2023-05-24
357f341c-f19a-4cb6-8c55-62940ceee54b	bib-token	bib	BIB Token	f	\N	2023-05-24	2023-05-24
8a8747bc-4715-4ddd-99c0-17892efd5530	biconomy	bico	Biconomy	f	\N	2023-05-24	2023-05-24
c035e34e-293c-4207-bac8-23e47863c52a	biconomy-exchange-token	bit	Biconomy Exchange	f	\N	2023-05-24	2023-05-24
22ad66c4-eccb-4b48-968d-86fe0647d05f	bidao	bid	Bidao	f	\N	2023-05-24	2023-05-24
5f638501-0473-489f-b30f-52fdf8bdf9b8	bidao-smart-chain	bisc	Bidao Smart Chain	f	\N	2023-05-24	2023-05-24
1f3c1c75-d6b4-4dad-9dcf-67fb9d0bacf0	bidipass	bdp	BidiPass	f	\N	2023-05-24	2023-05-24
0186af9a-7a04-4273-89f5-9e18025172cb	bidshop	bids	BIDSHOP	f	\N	2023-05-24	2023-05-24
09d42d13-2ccc-48d6-bf26-1080498c8554	bidz-coin	bidz	BIDZ Coin	f	\N	2023-05-24	2023-05-24
12dc8de4-7af2-45fd-ab28-915729315cd9	bifi	bifi	BiFi	f	\N	2023-05-24	2023-05-24
e70c3e10-815b-4605-ab2a-f1e4a530d80f	bifrost	bfc	Bifrost	f	\N	2023-05-24	2023-05-24
cde1d26e-e7c3-4f74-98d8-810a257e208b	bifrost-native-coin	bnc	Bifrost Native Coin	f	\N	2023-05-24	2023-05-24
207312bb-1e67-4eda-8623-6af7fa2c2999	bigcap	bigcap	BIGCAP	f	\N	2023-05-24	2023-05-24
a92f5912-7520-4999-b53f-6f392176490c	big-crypto-game	crypto	Big Crypto Game	f	\N	2023-05-24	2023-05-24
d12de53a-db33-49ec-ab64-8f92c152f844	big-data-protocol	bdp	Big Data Protocol	f	\N	2023-05-24	2023-05-24
e6d0d22a-6200-429c-b6ff-5cb674f0be84	big-defi-energy	bde	Big Defi Energy	f	\N	2023-05-24	2023-05-24
061bbf08-2fe4-4aef-82ab-f5171c40388f	big-digital-shares	bds	Big Digital Shares	f	\N	2023-05-24	2023-05-24
ee8e6ade-f11f-44fd-b334-d2e4c5780fd0	biggerminds	mind+	BiggerMINDS	f	\N	2023-05-24	2023-05-24
e512768e-7d1c-4b3c-bd6b-19e591d83f18	big-turn	turn	Big Turn	f	\N	2023-05-24	2023-05-24
468d2e06-c9d4-4e16-a3e7-17400735ae7f	bikerush	brt	Bikerush	f	\N	2023-05-24	2023-05-24
b3399e2e-0efc-470f-b7a5-34ba9e49457a	bilira	tryb	BiLira	f	\N	2023-05-24	2023-05-24
c8653aae-2c17-433a-a60e-1ecaaf15dc23	billiard-crypto	bic	Billiard Crypto	f	\N	2023-05-24	2023-05-24
06387fbd-3f87-46d9-8c24-8908cbdb1723	billionaires-pixel-club	bpc	Billionaires Pixel Club	f	\N	2023-05-24	2023-05-24
42ccddf2-484e-48dc-8c09-90af6c2c6322	billionhappiness	bhc	BillionHappiness	f	\N	2023-05-24	2023-05-24
dfdaec05-7e83-46fa-a1d5-f30da09d26f7	billy-token	billy	Billy Token	f	\N	2023-05-24	2023-05-24
21577007-9f8b-4755-910d-6895893559a4	bim	bim	BIM	f	\N	2023-05-24	2023-05-24
a0e43de9-a21b-492a-93e9-aaedce49ed9b	binamon	bmon	Binamon	f	\N	2023-05-24	2023-05-24
d8f3c23c-fae9-40b1-8a7a-fcba1c4e7655	binance-bitcoin	btcb	Binance Bitcoin	f	\N	2023-05-24	2023-05-24
0f3e710b-65e6-4d52-babf-f9ba01780759	binancecoin	bnb	BNB	f	\N	2023-05-24	2023-05-24
ba42523c-a8d1-4c12-896b-63dc544edf17	binance-coin-wormhole	bnb	Binance Coin (Wormhole)	f	\N	2023-05-24	2023-05-24
a6249b27-7ab9-49b8-998a-29d775925129	binance-eth	beth	Binance ETH staking	f	\N	2023-05-24	2023-05-24
088dba85-cd88-4643-abc7-daa7275e25e0	binanceidr	bidr	BIDR	f	\N	2023-05-24	2023-05-24
4f1df294-5e3f-47b1-82b1-8f8bbe442bbd	binance-peg-avalanche	avax	Binance-Peg Avalanche	f	\N	2023-05-24	2023-05-24
447896f7-c6e0-4de9-96a3-6a3ad408c49a	binance-peg-bitcoin-cash	bch	Binance-Peg Bitcoin Cash	f	\N	2023-05-24	2023-05-24
d2775dac-037b-40ab-a578-ac3b26b69ced	binance-peg-cardano	ada	Binance-Peg Cardano	f	\N	2023-05-24	2023-05-24
1f522fd0-73b4-4f71-b759-b66daa1f2000	binance-peg-dogecoin	doge	Binance-Peg Dogecoin	f	\N	2023-05-24	2023-05-24
447ee312-ed48-4d00-a1e4-e939ae973e8b	binance-peg-eos	eos	Binance-Peg EOS	f	\N	2023-05-24	2023-05-24
423e3187-b77e-4f3f-9d15-847ed54220dd	binance-peg-filecoin	fil	Binance-Peg Filecoin	f	\N	2023-05-24	2023-05-24
fd8cac70-ca93-4fc2-9db9-bf7780df22fb	binance-peg-firo	firo	Binance-Peg Firo	f	\N	2023-05-24	2023-05-24
3c91623a-f98b-4afb-b753-11180f82e66c	binance-peg-iotex	iotx	Binance-Peg IoTeX	f	\N	2023-05-24	2023-05-24
32cd8936-fe06-4c2d-afca-545a7b46f972	binance-peg-litecoin	ltc	Binance-Peg Litecoin	f	\N	2023-05-24	2023-05-24
4c161d1c-0efa-4a83-9cff-183d2a7f0670	binance-peg-ontology	ont	Binance-Peg Ontology	f	\N	2023-05-24	2023-05-24
0a7220d4-61d2-436f-8fb8-e22b7556ed9f	binance-peg-polkadot	dot	Binance-Peg Polkadot	f	\N	2023-05-24	2023-05-24
1755d344-f4e8-4550-9f6c-228623db7674	binance-peg-xrp	xrp	Binance-Peg XRP	f	\N	2023-05-24	2023-05-24
42d58a63-8cbd-4b45-b8d2-cb994708a0ea	binance-usd	busd	Binance USD	f	\N	2023-05-24	2023-05-24
034e05ff-c6a3-4677-9d3b-4be9cb6ec5cd	binance-wrapped-btc	bbtc	Binance Wrapped BTC	f	\N	2023-05-24	2023-05-24
828c90bb-0686-4f44-8ff5-df606529adc2	binance-wrapped-dot	bdot	Binance Wrapped DOT	f	\N	2023-05-24	2023-05-24
0d20b5a1-9475-49d0-8043-75d459256353	binarydao	byte	BinaryDAO	f	\N	2023-05-24	2023-05-24
884f63fa-20d0-483b-83a3-6f5862b836df	binaryx	bnx	BinaryX [OLD]	f	\N	2023-05-24	2023-05-24
e8e7749e-d679-4be0-bdfe-aabd10b651bf	binaryx-2	bnx	BinaryX	f	\N	2023-05-24	2023-05-24
8dd3d2ca-cebd-4738-8115-fc527eda6d2a	bincentive	bcnt	Bincentive	f	\N	2023-05-24	2023-05-24
cb6fc6ba-9d56-4fc3-b84f-970ca9d2ab4d	binemon	bin	Binemon	f	\N	2023-05-24	2023-05-24
43939baf-1d3d-4e33-9e74-dc2846cdaa53	bingo	$bingo	Tomorrowland	f	\N	2023-05-24	2023-05-24
9e5cf906-e9dc-4b95-b2b7-d4149ff23acb	binjit-coin	bnj	Binjit Coin	f	\N	2023-05-24	2023-05-24
8291e501-40b9-4c71-80b2-dd73e1b0d148	binopoly	bino	Binopoly	f	\N	2023-05-24	2023-05-24
9f38fd4f-8d2b-463f-93b2-c952e831a060	binspirit	binspirit	binSPIRIT	f	\N	2023-05-24	2023-05-24
fc1f138b-e377-4163-9c48-71b80baa21fd	binstarter	bsr	BinStarter	f	\N	2023-05-24	2023-05-24
2edacec4-88a3-4724-a2da-25ed1009286e	bintex-futures	bntx	Bintex Futures	f	\N	2023-05-24	2023-05-24
b57002fa-4606-4d8a-8d81-2c4b41d01059	biometric-financial	biofi	BiometricFinancial	f	\N	2023-05-24	2023-05-24
529e4a7b-6163-4e26-8bd7-3da8887c1d27	biopassport	biot	Bio Passport	f	\N	2023-05-24	2023-05-24
9fb28bc1-fa8a-4578-8b70-2534ee23e2c6	bios	bios	0x_nodes	f	\N	2023-05-24	2023-05-24
c7c6b2af-ab6a-49ce-92c8-6fc40f00f7ee	birake	bir	Birake	f	\N	2023-05-24	2023-05-24
97ceec92-9495-44d2-9b2d-9cff9d2f223e	birb-2	birb	Birb	f	\N	2023-05-24	2023-05-24
a721bc1e-c9d3-4ee7-b0fd-4a653c9b431c	bird-money	bird	Bird.Money	f	\N	2023-05-24	2023-05-24
81b6dc68-f6c1-41a6-b0dd-13489823c5c3	birdtoken	birdtoken	birdToken	f	\N	2023-05-24	2023-05-24
3cf36fcb-46b3-4440-886b-e9d6b35671ac	biskit-protocol	biskit	Biskit Protocol	f	\N	2023-05-24	2023-05-24
f11ac825-c7a2-4232-972a-906940126502	bismuth	bis	Bismuth	f	\N	2023-05-24	2023-05-24
26d74d85-2647-496c-9aae-e85fdbcc3087	biso	biso	BISO	f	\N	2023-05-24	2023-05-24
1416f146-00a4-47bd-90f2-5ce25ef33abc	bistroo	bist	Bistroo	f	\N	2023-05-24	2023-05-24
76d24cfa-43ce-4d1e-8794-a38d8433c533	biswap	bsw	Biswap	f	\N	2023-05-24	2023-05-24
dc509f6a-b3aa-45f3-a9c7-52749b2748df	bit2me	b2m	Bit2Me	f	\N	2023-05-24	2023-05-24
a65bc4d8-eae9-497d-a1bf-2bfb4867eb5a	bitant	bitant	BitANT	f	\N	2023-05-24	2023-05-24
5c5544cf-a8f8-4127-9ced-5365a2fa5453	bitazza	btz	Bitazza	f	\N	2023-05-24	2023-05-24
e478e73e-9f63-4fc9-af5c-055c67cd2b2a	bitball	btb	Bitball	f	\N	2023-05-24	2023-05-24
5ee83b82-11ee-49c8-9e0f-1c114b1d4e1c	bitbar	btb	Bitbar	f	\N	2023-05-24	2023-05-24
c09b69bb-182a-4ce7-bd11-da644d65e18f	bitbase-token	btbs	BitBase Token	f	\N	2023-05-24	2023-05-24
ce747eff-cdb6-4fa9-9596-befaaa1080c7	bitbook-token	bbt	BitBook	f	\N	2023-05-24	2023-05-24
03f43e0a-be0c-4680-bc90-ccba52fb5c63	bitboost	bbt	BitBoost	f	\N	2023-05-24	2023-05-24
b9397765-7359-4faf-a675-62a688029e1d	bitcanna	bcna	BitCanna	f	\N	2023-05-24	2023-05-24
65533057-9da6-4740-9f99-da9efe0f7277	bitcash	bitc	BitCash	f	\N	2023-05-24	2023-05-24
2dddcbb5-51d9-48e9-98b6-c8f80f526b5b	bitcastle	castle	bitcastle	f	\N	2023-05-24	2023-05-24
7b2c0742-4a1a-4eaf-aa70-d1518d782d23	bitcci-cash	bitcca	Bitcci Cash	f	\N	2023-05-24	2023-05-24
5057f3e8-62c6-4a95-88d9-1ccfe93dc3af	bitcicoin	bitci	Bitcicoin	f	\N	2023-05-24	2023-05-24
82fa54e0-5e9d-4489-8aff-4f2b53b6e9be	bitci-racing-token	brace	Bitci Racing Token	f	\N	2023-05-24	2023-05-24
fa74721f-0e0a-4aac-a955-e8b116e972c8	bitcoin	btc	Bitcoin	f	\N	2023-05-24	2023-05-24
8b6b6728-46a0-42bc-b57d-c863ac2508ef	bitcoin-2	btc2	Bitcoin 2	f	\N	2023-05-24	2023-05-24
2d00511e-5fa2-408e-8633-cd657c66792d	bitcoin-anonymous	btca	Bitcoin Anonymous	f	\N	2023-05-24	2023-05-24
4ef5ae2a-cf31-46b1-a196-99fec567c7ea	bitcoin-asia	btca	Bitcoin Asia	f	\N	2023-05-24	2023-05-24
80be45f2-2595-4d57-81db-67a08d7fc993	bitcoin-atom	bca	Bitcoin Atom	f	\N	2023-05-24	2023-05-24
e3d74bb3-d6ec-44cc-88e6-554ad19365cb	bitcoin-avalanche-bridged-btc-b	btc.b	Bitcoin Avalanche Bridged (BTC.b)	f	\N	2023-05-24	2023-05-24
c46a4a21-eeb0-448d-aa22-3d960f42ad01	bitcoinbam	btcbam	BitcoinBam	f	\N	2023-05-24	2023-05-24
7faf837c-268f-46a8-91da-3ced384e8ba7	bitcoin-bep2	btcb	Bitcoin BEP2	f	\N	2023-05-24	2023-05-24
f331b3e8-80d7-43db-9e20-d5b88a1766c2	bitcoin-br	btcbr	Bitcoin BR	f	\N	2023-05-24	2023-05-24
96336a92-3abf-41a1-aa72-8590f8122a2e	bitcoin-cash	bch	Bitcoin Cash	f	\N	2023-05-24	2023-05-24
a1032e5b-3c21-4c8e-811c-669601ba528b	bitcoin-cash-sv	bsv	Bitcoin SV	f	\N	2023-05-24	2023-05-24
5e5a360e-81f4-4822-b9dc-f0da75bd37da	bitcoin-confidential	bc	Bitcoin Confidential	f	\N	2023-05-24	2023-05-24
6bd06242-83e0-40d7-b753-1ccaba9ed859	bitcoin-diamond	bcd	Bitcoin Diamond	f	\N	2023-05-24	2023-05-24
be215f4b-96b6-4b0e-af86-d6823aeb72c6	bitcoin-e-wallet	bitwallet	Bitcoin E-wallet	f	\N	2023-05-24	2023-05-24
2bf9dad5-f8a1-4581-96c3-c19606b0112f	bitcoin-fast	bcf	Bitcoin Fast	f	\N	2023-05-24	2023-05-24
bb94a6ae-1bbd-4f3e-a645-b9bc1e355839	bitcoin-free-cash	bfc	Bitcoin Free Cash	f	\N	2023-05-24	2023-05-24
1a7479d3-6063-436a-8136-0f24e0af1222	bitcoin-god	god	Bitcoin God	f	\N	2023-05-24	2023-05-24
225d45ef-0f42-4612-ab5f-575dee381242	bitcoin-gold	btg	Bitcoin Gold	f	\N	2023-05-24	2023-05-24
b2911bdd-fcf5-413c-93eb-6367d15a3d8b	bitcoin-green	bitg	Bitcoin Green	f	\N	2023-05-24	2023-05-24
307b249c-9be3-480a-b995-24f60d75a052	bitcoin-hd	bhd	Bitcoin HD	f	\N	2023-05-24	2023-05-24
6429cbb3-6b24-42d3-b2f2-3aa8f90b4325	bitcoin-international	btci	Bitcoin International	f	\N	2023-05-24	2023-05-24
48de80f8-c8df-4373-9c43-7bb9479b8bbf	bitcoin-latinum	ltnm	Bitcoin Latinum	f	\N	2023-05-24	2023-05-24
9ff5c0c4-5bf1-4d55-a2bf-4ffcf28baeea	bitcoin-legend	bcl	Bitcoin Legend	f	\N	2023-05-24	2023-05-24
dce51408-fd87-4aac-830a-716672eb51d7	bitcoinmono	btcmz	BitcoinMono	f	\N	2023-05-24	2023-05-24
2e96724f-5c3e-4eeb-be70-13da1e8f0494	bitcoin-pay	btcpay	Bitcoin Pay	f	\N	2023-05-24	2023-05-24
5a6974a3-3865-40ed-942c-1468bc1e4ae9	bitcoinpepe	btcpep	BitcoinPepe	f	\N	2023-05-24	2023-05-24
0d6ef9be-b341-4499-b080-b648d23e7d7d	bitcoin-plus	xbc	Bitcoin Plus	f	\N	2023-05-24	2023-05-24
8afcb1a3-28ef-4208-b7c8-477b5e780a51	bitcoinpos	btcs	BitcoinPoS	f	\N	2023-05-24	2023-05-24
8d3fe086-6bd7-48bc-97fe-eb684cafdd8b	bitcoin-private	btcp	Bitcoin Private	f	\N	2023-05-24	2023-05-24
f38e1d29-0da0-4533-b996-02e0c3dd70e5	bitcoin-pro	btcp	Bitcoin Pro	f	\N	2023-05-24	2023-05-24
4cb4474c-a734-4351-9034-5e539bcbec28	bitcoin-red	btcred	Bitcoin Red	f	\N	2023-05-24	2023-05-24
0b8a44cd-4c7b-48b6-ba13-4a258ea9310c	bitcoin-scrypt	btcs	Bitcoin Scrypt	f	\N	2023-05-24	2023-05-24
3db7d3bf-1e9a-4a27-914b-108fa20e101d	bitcoin-subsidium	xbtx	Bitcoin Subsidium	f	\N	2023-05-24	2023-05-24
e40bdaad-1e4b-4a43-8adc-1d31d955ef09	bitcoin-trc20	btct	Bitcoin TRC20	f	\N	2023-05-24	2023-05-24
fb7c4926-7247-4749-84be-9cda7a38d249	bitcoin-trust	bct	Bitcoin Trust	f	\N	2023-05-24	2023-05-24
9c96caac-36eb-4222-9fde-d7f7ebd70b68	bitcointry-token	btty	Bitcointry Token	f	\N	2023-05-24	2023-05-24
5ed05aa7-eef1-443a-9e44-a020f3350023	bitcoinv	btcv	BitcoinV	f	\N	2023-05-24	2023-05-24
29399e58-adb8-4724-a784-a8db67fffe49	bitcoin-vault	btcv	Bitcoin Vault	f	\N	2023-05-24	2023-05-24
17e09ad7-bc19-43e3-aaa4-ffa7701fa302	bitcoinvb	btcvb	BitcoinVB	f	\N	2023-05-24	2023-05-24
829da2f4-3ada-4eba-a9fb-a249f2c04eb0	bitcoinx	bcx	BitcoinX	f	\N	2023-05-24	2023-05-24
1609e460-772f-47ab-896e-80a99c389fac	bitcoinz	btcz	BitcoinZ	f	\N	2023-05-24	2023-05-24
287fedb0-f4a1-48aa-9d2d-3c6018917cc6	bitcoiva	bca	Bitcoiva	f	\N	2023-05-24	2023-05-24
3825969c-bb48-4a8d-903a-d4c199a929c4	bitcomine	bme	BitcoMine	f	\N	2023-05-24	2023-05-24
eb441b6a-fe76-4668-98c9-7919ec4d5255	bitconey	bitconey	BitConey	f	\N	2023-05-24	2023-05-24
6f09f6ab-abcb-475f-a8c4-2802a6da2f1b	bitcore	btx	BitCore	f	\N	2023-05-24	2023-05-24
7cc2f523-aa4e-4bdf-8229-ccd30ea7c8d9	bitdao	bit	BitDAO	f	\N	2023-05-24	2023-05-24
31306325-2539-49ec-b105-75778b84edb9	bite	bite	BITE	f	\N	2023-05-24	2023-05-24
9a30ba2d-b028-4b47-a773-d07ef9cf8602	bitenium-token	bt	Bitenium	f	\N	2023-05-24	2023-05-24
e3c9ffda-513c-44c7-8ca4-ab6a821afc5c	bitflowers	petal	bitFlowers	f	\N	2023-05-24	2023-05-24
2f48b60b-5ebe-48f7-9de0-98f2441782b2	bitforex	bf	Bitforex	f	\N	2023-05-24	2023-05-24
3754e8e4-2782-41bc-b1ab-5bf99ede194d	bit-game-verse-token	bgvt	Bit Game Verse Token	f	\N	2023-05-24	2023-05-24
62d3e6a2-0904-483b-a160-4b8c5d7471f9	bitget-token	bgb	Bitget Token	f	\N	2023-05-24	2023-05-24
fe93712e-8e81-4777-b851-e819a93e17e7	bithachi	bith	Bithachi	f	\N	2023-05-24	2023-05-24
8549e63b-8fba-4bd7-be0c-4763f1f4e842	bithash-token	bt	BitHash	f	\N	2023-05-24	2023-05-24
21ddbe4a-4229-4c5b-9142-1325361a02fb	bit-hotel	bth	Bit Hotel	f	\N	2023-05-24	2023-05-24
18a6f974-3383-4704-bc4e-01c6adcd48d4	bitica-coin	bdcc	BITICA COIN	f	\N	2023-05-24	2023-05-24
e6098441-2055-4eb4-b52c-a8b7c107cf44	bitindi-chain	bni	Bitindi Chain	f	\N	2023-05-24	2023-05-24
a16cbcc2-47c3-4737-8200-bc877c796f8e	bitkub-coin	kub	Bitkub Coin	f	\N	2023-05-24	2023-05-24
dd1951be-d8a2-40e3-8e66-9d3d33cf493b	bitlocus	btl	Bitlocus	f	\N	2023-05-24	2023-05-24
f604b080-077d-412b-bc79-1f82a26aa370	bitmark	marks	Bitmark	f	\N	2023-05-24	2023-05-24
6917c42a-b18d-4aa1-bfe2-7e903abd5f62	bitmart-token	bmx	BitMart	f	\N	2023-05-24	2023-05-24
f1b57e2d-2c50-400b-baf7-2dada3015375	bitmex-token	bmex	BitMEX	f	\N	2023-05-24	2023-05-24
cbb22130-ecf8-48ae-9be4-6e1954877736	bitmon	bit	Bitmon	f	\N	2023-05-24	2023-05-24
e1e505bf-32c8-4ce3-8a9c-4375b4fc486e	bitnautic	btntv2	BitNautic	f	\N	2023-05-24	2023-05-24
51ac03e3-cc3b-4c14-9052-a53de7d0f0f3	bito-coin	bito	BITO Coin	f	\N	2023-05-24	2023-05-24
a1dfc3ec-b570-4ba8-8bd6-e1f0d593db6b	bitone	bio	BITONE	f	\N	2023-05-24	2023-05-24
52771ad5-2e43-492c-b7fe-c39d4c1c5f8c	bitorbit	bitorb	BitOrbit	f	\N	2023-05-24	2023-05-24
38aaf4e8-86f8-48c7-aa24-47bf9d1d4e8b	bitoreum	btrm	Bitoreum	f	\N	2023-05-24	2023-05-24
eb9a696d-0e02-4862-a83c-7edcd3271b21	bitpaid-token	btp	Bitpaid	f	\N	2023-05-24	2023-05-24
d264dfb6-9408-42d4-9a28-f2e2d2be5282	bitpanda-ecosystem-token	best	Bitpanda Ecosystem	f	\N	2023-05-24	2023-05-24
e540e5c1-e18c-4bb1-b7d4-657faf6699f5	bitrise-token	brise	Bitgert	f	\N	2023-05-24	2023-05-24
96f19a9e-31b3-4828-ac5a-53749c05f3a9	bitrue-token	btr	Bitrue Coin	f	\N	2023-05-24	2023-05-24
fd778169-d4af-4e36-a504-082c527ab218	bitscrow	btscrw	Bitscrow	f	\N	2023-05-24	2023-05-24
5e2de039-9ef3-403b-83a6-873889245dba	bitshares	bts	BitShares	f	\N	2023-05-24	2023-05-24
b4bc1b4e-60fc-49ab-a932-ab556ac75424	bitshiba	shiba	BitShiba	f	\N	2023-05-24	2023-05-24
fe480000-d42a-41a9-85ee-4d59cf5c12df	bitsong	btsg	BitSong	f	\N	2023-05-24	2023-05-24
6a9e53f7-97ad-465e-a1ec-a11d5ab5534d	bitspawn	spwn	Bitspawn	f	\N	2023-05-24	2023-05-24
e8d2ba62-2b95-4fa5-b4fd-bf38dc2a3483	bitstake	xbs	BitStake	f	\N	2023-05-24	2023-05-24
67563a40-2174-43eb-8b55-c6706dd89103	bitsten-token	bst	Bitsten [OLD]	f	\N	2023-05-24	2023-05-24
a7daa140-935b-47fe-947f-f1524ab393d5	bit-store-coin	store	Bit Store	f	\N	2023-05-24	2023-05-24
8e7d23d4-54ee-421b-8f61-c59f4eaef6f0	bitstubs	stub	BitStubs	f	\N	2023-05-24	2023-05-24
a76b25a2-d44e-45f1-bdb3-1b9efff7be4b	bitsum	mat	Matka	f	\N	2023-05-24	2023-05-24
0ad4a82c-ccc4-4761-ba33-9b17435574b4	bittensor	tao	Bittensor	f	\N	2023-05-24	2023-05-24
bc1ce5d2-9818-425e-8e05-db6f610fe4c0	bittoken	bitt	BITT	f	\N	2023-05-24	2023-05-24
4c0f018a-528a-4620-b386-605ce468ab9e	bittorrent	btt	BitTorrent	f	\N	2023-05-24	2023-05-24
ad6bf0ec-491f-4a54-89ad-049082aa2d9b	bittorrent-old	bttold	BitTorrent [OLD]	f	\N	2023-05-24	2023-05-24
f7dd1a8b-52f9-4b11-9b51-e9e932586605	bittube	tube	BitTube	f	\N	2023-05-24	2023-05-24
45058589-80ca-4666-9583-eff2a5f53f3a	bittwatt	bwt	Bittwatt	f	\N	2023-05-24	2023-05-24
279011c0-d27b-4981-a1ae-fab0ef608949	bitvalley	bitv	BitValley	f	\N	2023-05-24	2023-05-24
933edd3d-f1f9-40d8-9455-5a2309ddd5f7	bitvote	btv	Bitvote	f	\N	2023-05-24	2023-05-24
bdb413bb-9653-413c-a6e4-fb8d06472662	bitwhite	btw	BitWhite	f	\N	2023-05-24	2023-05-24
3e21a33a-1278-478e-8b99-d299605a57b0	bitxor	bxr	Bitxor	f	\N	2023-05-24	2023-05-24
c03811df-4249-4008-86ff-38db3a98f937	bitzen	bzen	Bitzen	f	\N	2023-05-24	2023-05-24
11a5bb5f-f405-4794-a7f7-819c59e1d46e	biu-coin	biu	BIU COIN	f	\N	2023-05-24	2023-05-24
2448881a-d018-44ed-8592-8faf1cbca69b	bixb-coin	bixb	BixB Coin	f	\N	2023-05-24	2023-05-24
6bdc2bd8-52a9-478d-9c64-c38fd1e74c0f	bizzcoin	bizz	BIZZCOIN	f	\N	2023-05-24	2023-05-24
86c79342-d98b-45c1-ae47-bb3268f43e8e	bkex-token	bkk	BKEX Chain	f	\N	2023-05-24	2023-05-24
19a8e5df-4071-4230-8abc-2a4744af6467	blackcoin	blk	BlackCoin	f	\N	2023-05-24	2023-05-24
983fa280-017d-4284-8dc1-f7ef3b74adda	black-dragon-society	bds	Black Dragon Society	f	\N	2023-05-24	2023-05-24
9a59fd47-d220-488d-9161-1f9c3d1af4b4	blackdragon-token	bdt	BlackDragon	f	\N	2023-05-24	2023-05-24
ead2f343-e5a8-47fd-84d5-77127b85563d	black-eyed-dragon	bleyd	Black Eyed Dragon	f	\N	2023-05-24	2023-05-24
6da75af8-33be-4fe0-97ad-2a296b80a5af	blackhat-coin	blkc	BlackHat Coin	f	\N	2023-05-24	2023-05-24
843254ef-d01e-4d25-a06c-811560d51587	blackhole-protocol	black	BlackHole Protocol	f	\N	2023-05-24	2023-05-24
7498f950-c4fd-45af-8b08-d2e3bdccafa5	blackpearl-chain	bplc	BlackPearl	f	\N	2023-05-24	2023-05-24
31f3a513-62dc-4456-abdb-774963ddcd02	black-phoenix	bpx	Black Phoenix	f	\N	2023-05-24	2023-05-24
78fa96d8-3112-4455-8630-d79ba515571f	blackpool-token	bpt	BlackPool	f	\N	2023-05-24	2023-05-24
406f94d4-43c5-44cb-bf56-ca8f83f08542	black-rabbit-ai	brain	Black Rabbit AI	f	\N	2023-05-24	2023-05-24
9106054f-bb63-4830-a57e-df9c4dd40dcb	black-stallion	bs	Black Stallion	f	\N	2023-05-24	2023-05-24
e569a610-8b0d-43e7-8e50-471dd9e2e065	black-token	black	Black Token	f	\N	2023-05-24	2023-05-24
6cc72b43-f7f3-469c-b6ee-7e3eaa8d3cdb	blade	blade	BladeWarrior	f	\N	2023-05-24	2023-05-24
677a5d44-ecef-4d8a-b7fa-3000381060eb	blank	blank	BlockWallet	f	\N	2023-05-24	2023-05-24
93d91cba-25e3-4a70-a5b7-136b3aed275a	blaze-network	blzn	Blaze Network	f	\N	2023-05-24	2023-05-24
00f85de9-971e-4e28-a11d-0790ad5230b1	blazestake-staked-sol	bsol	BlazeStake Staked SOL	f	\N	2023-05-24	2023-05-24
1954523a-5a87-4147-98a6-1ff8c4db07b9	bless-global-credit	blec	Bless Global Credit	f	\N	2023-05-24	2023-05-24
92e70d02-28dc-40d4-b500-4b6e5b4a3c5e	blind-boxes	bles	Blind Boxes	f	\N	2023-05-24	2023-05-24
2eadeed0-d661-4e27-8010-3865198da4e0	blin-metaverse	blin	Blin Metaverse	f	\N	2023-05-24	2023-05-24
ab56d170-496d-4377-b8e3-255d9a04e3a3	blithe	blt	Blithe	f	\N	2023-05-24	2023-05-24
5890c723-a4f7-4964-a885-d369397eada6	blitz-labs	blitz	Blitz Labs	f	\N	2023-05-24	2023-05-24
39c8fe6f-772d-465b-be5c-27dd590f5be0	blitzpredict	xbp	BlitzPick	f	\N	2023-05-24	2023-05-24
73769b88-531a-481d-8bae-66c020ffded8	blizzard-network	blizz	Blizzard Network	f	\N	2023-05-24	2023-05-24
7444e324-5a30-48f3-a041-d059abb99ad8	blizz-finance	blzz	Blizz Finance	f	\N	2023-05-24	2023-05-24
d72cfd0e-1980-4344-99ff-ea1dd3ee8f8c	blocery	bly	Blocery	f	\N	2023-05-24	2023-05-24
85b509a6-4ca6-4189-821c-c251d12e8632	block-ape-scissors	bas	Block Ape Scissors	f	\N	2023-05-24	2023-05-24
476a98fd-3e15-481e-bc88-3c27d378d3aa	blockasset	block	Blockasset	f	\N	2023-05-24	2023-05-24
5669d2a7-dde4-400f-9b85-d5e9a39af81a	blockaura	tbac	BlockAura	f	\N	2023-05-24	2023-05-24
07ab6624-471f-4566-a102-108db348ea60	blockbank	bbank	blockbank	f	\N	2023-05-24	2023-05-24
a0949956-1ce8-4ed4-b2fe-89fceaa9e09d	blockbase	bbt	BlockBase	f	\N	2023-05-24	2023-05-24
91e71f35-eebb-4285-ab30-822d4958a9d3	blockcdn	bcdn	BlockCDN	f	\N	2023-05-24	2023-05-24
9a3040ce-6734-4c64-b164-15f63f4a0943	blockchain-bets	bcb	Blockchain Bets	f	\N	2023-05-24	2023-05-24
14a5d776-32a1-4ad6-8aa0-71abccbeb10f	blockchain-brawlers	brwl	Blockchain Brawlers	f	\N	2023-05-24	2023-05-24
d50a8b15-ad93-43c5-8e29-37f6fc7b2a7e	blockchain-certified-data-token	bcdt	EvidenZ	f	\N	2023-05-24	2023-05-24
7e0e592f-61e2-48f8-97e4-171a9811c465	blockchain-cuties-universe-governance	bcug	Blockchain Cuties Universe Governance	f	\N	2023-05-24	2023-05-24
0c62c4b4-48b2-48fe-aeff-547d7bbaf11d	blockchain-euro-project	bepr	Blockchain Euro Project	f	\N	2023-05-24	2023-05-24
6837b2f7-1e03-4579-9d50-3f7240c672a1	blockchaingames	bcg	BlockChainGames	f	\N	2023-05-24	2023-05-24
b8276fcb-e276-4173-b529-43a09d764d9c	blockchain-monster-hunt	bcmc	Blockchain Monster Hunt	f	\N	2023-05-24	2023-05-24
46bd6bc7-5d5b-40b1-8ae2-88c5fc5e1b88	blockchainpoland	bcp	BlockchainPoland	f	\N	2023-05-24	2023-05-24
826e77b9-64cd-4f97-926a-06a9e251153f	blockchainspace	guild	BlockchainSpace	f	\N	2023-05-24	2023-05-24
a6a3618c-6c9b-4e14-ba57-9286795768e6	block-commerce-protocol	bcp	Block Commerce Protocol	f	\N	2023-05-24	2023-05-24
09cfcb9d-26ee-4152-af66-62c108343207	blockcreate	block	BlockCreate	f	\N	2023-05-24	2023-05-24
fff924b7-7cac-4500-af9e-32445dd03080	block-creatures	moolah	Block Creatures	f	\N	2023-05-24	2023-05-24
f4fc4870-549e-4cb3-8399-02bcfd8f315b	block-e	block-e	BLOCK-E	f	\N	2023-05-24	2023-05-24
886f3096-9a37-4d8e-bddd-ca44af3a7829	blockless	bls	Blockless	f	\N	2023-05-24	2023-05-24
730a7133-53ff-44ce-abe2-307aec0bd511	blockmax	ocb	BLOCKMAX	f	\N	2023-05-24	2023-05-24
c7bc4448-5d9e-4319-aeb0-b65598e3964d	blocknet	block	Blocknet	f	\N	2023-05-24	2023-05-24
4882ce6e-557e-4c12-a7b7-8eaf7569a4a5	blockombat	bkb	BlocKombat	f	\N	2023-05-24	2023-05-24
5e959432-70ca-436d-b2b2-2aa85722eb4e	blockport	bux	BUX	f	\N	2023-05-24	2023-05-24
d5f0160f-af24-4fc2-b6a5-52b3d64b672d	blockportal	bptl	BlockPortal	f	\N	2023-05-24	2023-05-24
1b1774ef-1611-4697-8d86-333b0c1a462e	blockremit	remit	BlockRemit	f	\N	2023-05-24	2023-05-24
02408039-3829-41c8-8bf0-5c7127d864a7	blocks	blocks	BLOCKS	f	\N	2023-05-24	2023-05-24
32cbc4ab-f4f3-4c5e-8cd0-469057db10c3	blocksafu	bsafu	BlockSafu	f	\N	2023-05-24	2023-05-24
8fef8079-bd74-4f88-8b8b-18bc92067f5e	blockscape	blc	Blockscape	f	\N	2023-05-24	2023-05-24
409e4e10-80e2-41eb-80dc-1bd3bc14bd68	blocksmith-labs-forge	$forge	Blocksmith Labs Forge	f	\N	2023-05-24	2023-05-24
41eb7452-21ca-4603-8d0d-996e2437b4a3	blocksport	bspt	Blocksport	f	\N	2023-05-24	2023-05-24
45e3ff1d-7983-4536-b2d3-dfcafe94902b	blocksquare	bst	Blocksquare	f	\N	2023-05-24	2023-05-24
bb0574a9-960d-4292-94de-c50a302a43f2	blockstack	stx	Stacks	f	\N	2023-05-24	2023-05-24
2d0f82a5-60af-4428-86dd-2ca1487ea38f	blockstar	bst	BlockStar	f	\N	2023-05-24	2023-05-24
dc2ffd6d-5a8e-4c14-9911-43c29c02b08f	blockster	bxr	Blockster	f	\N	2023-05-24	2023-05-24
20a93cc0-fc32-4b55-8f20-415d992ea214	blocksworkz	blkz	BlocksWorkz	f	\N	2023-05-24	2023-05-24
1884803e-11c4-4f3c-a679-073149e0a001	blockton	bton	Blockton	f	\N	2023-05-24	2023-05-24
a75cefb1-839e-4a0d-a221-7def9fd2b967	blockv	vee	BLOCKv	f	\N	2023-05-24	2023-05-24
df4eda0a-a836-4ddc-a624-64b0cfe48fba	blockverse	block	BlockVerse	f	\N	2023-05-24	2023-05-24
e8a87afa-ca6d-4c6b-a766-e92787363d4b	blockx	bcx	BlockX	f	\N	2023-05-24	2023-05-24
9ea7988e-4642-412f-a7e9-e20adb025a15	blockxpress	bx	BlockXpress	f	\N	2023-05-24	2023-05-24
7aaeaa63-dbb0-4f50-ac36-db4146190219	bloc-money	bloc	Bloc.Money	f	\N	2023-05-24	2023-05-24
6f08f450-0d4c-43fa-bfcc-d7290b239b48	blocsport-one	bls	Metacourt	f	\N	2023-05-24	2023-05-24
b7563179-3b92-4783-bd10-04cc08313aeb	blocto-token	blt	Blocto	f	\N	2023-05-24	2023-05-24
cefafd71-2313-446f-9140-c343bf1f80ea	blokpad	bpad	BlokPad	f	\N	2023-05-24	2023-05-24
65f939fe-d68a-46e0-9e06-1e95309f4265	bloktopia	blok	Bloktopia	f	\N	2023-05-24	2023-05-24
81bf9693-30d0-43bd-8d63-c27f4a80ad16	bloody-bunny	bony	Bloody Bunny	f	\N	2023-05-24	2023-05-24
9f76755b-cc90-437f-a550-56af88fc77b7	bloom	blt	Bloom	f	\N	2023-05-24	2023-05-24
191aaf3f-32c3-4ee9-a0ac-be758aa1404f	blossom	sakura	Blossom	f	\N	2023-05-24	2023-05-24
29f34f33-3b01-44a1-8204-3514405db8e0	blox	cdt	Blox	f	\N	2023-05-24	2023-05-24
69653695-3e04-473d-a618-b8e316a44ef4	bloxmove-erc20	blxm	bloXmove	f	\N	2023-05-24	2023-05-24
b9fd196d-d2ba-4cd7-9b60-2d29a4f3206c	blox-token	blox	Blox SDK	f	\N	2023-05-24	2023-05-24
8a46aba8-2f99-420f-8c39-b62fd661961d	blueart	bla	BLUEART TOKEN	f	\N	2023-05-24	2023-05-24
ac49a41c-a7a4-475f-b7e9-384d5706e21e	blue-baikal	bbc	Blue Baikal	f	\N	2023-05-24	2023-05-24
4bb8b754-d61c-4d60-9887-0933c4fe6390	bluebenx-2	benx	BlueBenx	f	\N	2023-05-24	2023-05-24
69310f24-a84c-4078-9cdc-194fe39cb7b8	bluebit	bbt	BlueBit	f	\N	2023-05-24	2023-05-24
d346d9df-c7d3-4f52-bbb5-c4cf76df07ae	bluejay	blu	Bluejay	f	\N	2023-05-24	2023-05-24
bc590596-3a82-45ba-be04-1e0914092afc	bluelight	kale	Bluelight	f	\N	2023-05-24	2023-05-24
aca43864-3eb9-4d7f-b328-413da64f5b11	bluemove	move	BlueMove	f	\N	2023-05-24	2023-05-24
a876eb0d-f095-4304-9d90-fa1e27084eaf	bluesale	bls	BlueSale	f	\N	2023-05-24	2023-05-24
565f29a3-e1fc-4ba8-9056-a16811d2b679	blueshift	blues	Blueshift	f	\N	2023-05-24	2023-05-24
9169ab3e-2bd0-4f6f-aa47-9fa1b62897c7	bluesparrow	bluesparrow	BlueSparrow	f	\N	2023-05-24	2023-05-24
4c1c6f57-728f-4251-83a8-35f17faecac9	bluesparrow-token	bluesparrow	BlueSparrow [OLD]	f	\N	2023-05-24	2023-05-24
29397bfb-3cdf-4f23-bf1e-a69f41fb7ec1	bluewizard	wiz	BlueWizard	f	\N	2023-05-24	2023-05-24
5a9fb637-7c49-43e6-afba-5125783e75be	blur	blur	Blur	f	\N	2023-05-24	2023-05-24
8cce938a-47e2-4570-bb1e-96ee9da33ae9	blurt	blurt	Blurt	f	\N	2023-05-24	2023-05-24
dccecb37-99f2-4e38-85ab-93d81f4dc88f	bluzelle	blz	Bluzelle	f	\N	2023-05-24	2023-05-24
6de00937-a665-45d8-bdc8-5a19fa3068a7	bmax	bmax	BMAX	f	\N	2023-05-24	2023-05-24
5325834b-a6e7-4116-b6b4-21b437ffd272	bmchain-token	bmt	BMCHAIN	f	\N	2023-05-24	2023-05-24
8ad937ed-62a6-4f95-9f9b-eaeab928e9da	bnb48-club-token	koge	KOGE	f	\N	2023-05-24	2023-05-24
60b0b281-fb07-4c98-abac-9d00a4b0a116	bnbback	bnbback	BNBBack	f	\N	2023-05-24	2023-05-24
91da88b2-2867-45f7-b5ab-1703290555d1	bnb-bank	bbk	BNB Bank	f	\N	2023-05-24	2023-05-24
0d2b1f84-42d1-4627-879c-87774999b3a9	bnb-diamond	bnbd	BNB Diamond	f	\N	2023-05-24	2023-05-24
b9aa2366-53b7-43b6-833b-cc7aae62eb13	bnbpot	bnbp	BNBPot	f	\N	2023-05-24	2023-05-24
5bb703d5-a53c-4656-8187-80fdcb80899d	bnbtiger	bnbtiger	BNB Tiger Inu	f	\N	2023-05-24	2023-05-24
ae9b669b-b294-49ae-888e-94085ee18b64	bnext-b3x	b3x	Bnext B3X	f	\N	2023-05-24	2023-05-24
e364cfbc-6ed0-4fa3-a41b-573e9fa763c2	bnktothefuture	bft	BnkToTheFuture	f	\N	2023-05-24	2023-05-24
e68f5900-2070-4fdb-8592-c9b2c4b86eee	bnpl-pay	bnpl	BNPL Pay	f	\N	2023-05-24	2023-05-24
747b654b-be7a-4624-a429-89be5b8700dc	bnsd-finance	bnsd	BNSD Finance	f	\N	2023-05-24	2023-05-24
750a5479-27f9-4694-a0a3-d2acce4ab63c	bns-token	bns	BNS	f	\N	2023-05-24	2023-05-24
e8408cf9-e722-4024-a717-3774f3d5a489	bob	bob	BOB	f	\N	2023-05-24	2023-05-24
b4fbcf76-9d09-4c94-a332-85a2af606b4c	boba-brewery	bre	Boba Brewery	f	\N	2023-05-24	2023-05-24
96226d57-4084-4edd-9c93-4cdcfb8956fc	boba-network	boba	Boba Network	f	\N	2023-05-24	2023-05-24
defbc629-198c-496b-9ebe-01e80ac45586	bobcoin	bobc	Bobcoin	f	\N	2023-05-24	2023-05-24
bf62db88-167b-4c36-99ed-c77d64669d70	bobo	bobo	Bobo	f	\N	2023-05-24	2023-05-24
2a557a3a-e9b6-4ffb-95ff-1dff28dc8caa	bobo-coin	bobo	BOBO Coin	f	\N	2023-05-24	2023-05-24
f1616b02-da41-44a9-a43f-00dda1dee891	bobs_repair	bob	Bob's Repair	f	\N	2023-05-24	2023-05-24
6e9e047a-bed9-48b7-88f4-b7c1d51deea5	bob-token	bob	BOB Token	f	\N	2023-05-24	2023-05-24
fd5a4c1e-c21f-4d75-b223-dab054a4341d	bocachica	chica	BocaChica	f	\N	2023-05-24	2023-05-24
9b42768d-38ce-442c-8f70-5509ba17b3ed	boda-token	bodav2	BODA	f	\N	2023-05-24	2023-05-24
4ba949d6-dd81-4882-b3c9-569dda1955c0	bodrumspor-fan-token	bdrm	Bodrumspor Fan Token	f	\N	2023-05-24	2023-05-24
38f5b9cc-31ce-4186-b646-d7a8e346becf	body-ai	bait	Body Ai	f	\N	2023-05-24	2023-05-24
045d7f96-2e8f-46fa-b820-61151e336065	bogdanoff	bog	Bogdanoff	f	\N	2023-05-24	2023-05-24
b2e9d76f-f104-4c7c-af2c-0575bc32100f	bogged-finance	bog	Bogged Finance	f	\N	2023-05-24	2023-05-24
1a3c56ed-f3a9-4ab3-bbdb-a082b7acd7f0	boid	boid	Boid	f	\N	2023-05-24	2023-05-24
a7cfd783-6175-438a-9f5f-3d901dc0ba31	boji	boji	BOJI	f	\N	2023-05-24	2023-05-24
7c0c354a-c578-4bcb-91ae-ec11df3b43c0	boku	boku	Boryoku Dragonz	f	\N	2023-05-24	2023-05-24
869878e1-18d8-44e0-8937-2de81330aab5	bold-point	bpt	Bold Point	f	\N	2023-05-24	2023-05-24
7de6d8a9-a2ab-4ec6-b22f-fecd95a6ce10	bole-token	bole	Boleld	f	\N	2023-05-24	2023-05-24
a0a19e2f-22fe-40d0-9271-d73fa58d4edf	bolide	blid	Bolide	f	\N	2023-05-24	2023-05-24
5bf75c43-d1c3-4143-b168-449be35d90ed	bolivarcoin	boli	Bolivarcoin	f	\N	2023-05-24	2023-05-24
4f49fb53-6968-4e7e-8177-e8a04ad826c2	bollycoin	bolly	BollyCoin	f	\N	2023-05-24	2023-05-24
fc7b8d54-f042-45ef-adb4-ecf9a9bb92ad	bologna-fc-fan-token	bfc	Bologna FC Fan Token	f	\N	2023-05-24	2023-05-24
20e22be4-2c9c-4933-ad19-885304d5c160	bolt	bolt	Bolt	f	\N	2023-05-24	2023-05-24
cfd6b078-a778-4006-90e9-e0c84d9544b2	bolt-token-023ba86e-eb38-41a1-8d32-8b48ecfcb2c7	$bolt	Bolt Token	f	\N	2023-05-24	2023-05-24
de60ee40-b6a6-44e0-aad4-02577029d78d	bomb	bomb	BOMB	f	\N	2023-05-24	2023-05-24
b636e1cb-ed0f-4e71-bb18-896effe1c0d1	bombcrypto-coin	bomb	Bombcrypto Coin	f	\N	2023-05-24	2023-05-24
29c5d02a-fcf0-4373-bd18-58b6c2f5e7bb	bomber-coin	bcoin	BombCrypto	f	\N	2023-05-24	2023-05-24
504d2ef9-5b60-42e0-b25e-2a9c1d8913f7	bomb-money	bomb	Bomb Money	f	\N	2023-05-24	2023-05-24
c4415aeb-3ba4-4727-b57e-2a94b0115c32	bomb-money-bshare	bshare	Bomb Money BShare	f	\N	2023-05-24	2023-05-24
f216ab96-d3d4-4d79-bca6-10e7b3ef9a9f	bonded-cronos	bcro	Bonded Cronos	f	\N	2023-05-24	2023-05-24
12b736e3-1526-417c-a593-5fbfc456f684	bondly	bondly	Forj	f	\N	2023-05-24	2023-05-24
19805ce8-f077-471a-b125-99cb60ae1033	bone-2	bone	Bone	f	\N	2023-05-24	2023-05-24
a457d726-9362-4432-a17c-6e112f81c26d	bonerium-boneswap	bswp	Bonerium BoneSwap	f	\N	2023-05-24	2023-05-24
91e4e5d2-a4b6-4e5e-91f4-41cdb70e1d6d	bone-shibaswap	bone	Bone ShibaSwap	f	\N	2023-05-24	2023-05-24
0bead641-fe19-4c34-82e5-b2bde8c30b38	boneswap	bone	BoneSwap	f	\N	2023-05-24	2023-05-24
4398ec0d-691b-4b80-913f-799f3377276a	bone-token	bone	PolyPup Bone	f	\N	2023-05-24	2023-05-24
ee0d934b-3fdd-4a90-bc0a-477f2b42358e	bonfi	bnf	BonFi	f	\N	2023-05-24	2023-05-24
f337ad97-8c8f-4ce8-8d3c-75c436421334	bonfida	fida	Bonfida	f	\N	2023-05-24	2023-05-24
6372898f-2c26-4513-85f0-1ba26e699327	bonfire	bonfire	Bonfire	f	\N	2023-05-24	2023-05-24
9e589950-2e39-4c54-9acb-77c7d479d416	bongweedcoin	bwc	BongWeedCoin	f	\N	2023-05-24	2023-05-24
5596298b-3818-4ffd-b7c8-5c603001d298	bonk	bonk	Bonk	f	\N	2023-05-24	2023-05-24
8b0742f9-6397-493f-b3eb-168ae70198d4	bonq	bnq	Bonq	f	\N	2023-05-24	2023-05-24
95deb6fe-a3a0-4e3a-8791-c7b933427f52	bonq-euro	beur	Bonq Euro	f	\N	2023-05-24	2023-05-24
3766a65c-b079-43b3-80c8-608ec8c9a47a	bontecoin	bonte	Bontecoin	f	\N	2023-05-24	2023-05-24
3c0116bf-5012-46e3-a27c-825e9875af8f	boo	boo	Boo	f	\N	2023-05-24	2023-05-24
4f6bada3-5884-4fd8-b936-e182b983bd2f	boo-finance	boofi	Boo Finance	f	\N	2023-05-24	2023-05-24
92ed1026-372d-4708-abb3-57620c62026a	boo-mirrorworld	xboo	Boo MirrorWorld	f	\N	2023-05-24	2023-05-24
bfd74f6b-e6bc-4298-b990-9b6a69c2b98c	boop	boop	Boop	f	\N	2023-05-24	2023-05-24
7f7cc021-87ed-442b-9811-a6a3c50fcf8d	boosted-lusd	blusd	Boosted LUSD	f	\N	2023-05-24	2023-05-24
7aaeb263-3dc5-405f-9676-d4a890d07503	booster	boo	Booster	f	\N	2023-05-24	2023-05-24
c94428cf-f08c-4ae9-85c5-c18c4b2b3f18	bora	bora	BORA	f	\N	2023-05-24	2023-05-24
4f6c5636-09b0-42a2-a830-5384dc973b1f	borderless-money	bom	Borderless Money	f	\N	2023-05-24	2023-05-24
e0bcb64b-b7f7-4de5-8801-859fc3ac187e	borealis	brl	Borealis	f	\N	2023-05-24	2023-05-24
0be87091-b370-4eec-9ec7-3b00593c80fe	bored	$bored	Bored Token	f	\N	2023-05-24	2023-05-24
55236a23-34db-4a7c-9f5e-a28e612501a8	bored-apemove	bape	Bored APEmove	f	\N	2023-05-24	2023-05-24
51e6b8f3-73dd-434c-8a87-9d1250bf77ea	bored-ape-social-club	bape	Bored Ape Social Club	f	\N	2023-05-24	2023-05-24
70a4e9b4-1872-4764-b956-906def292485	bored-candy-city	candy	Bored Candy City	f	\N	2023-05-24	2023-05-24
98aa1be4-1766-4661-8939-98ecc0b8cc13	boringdao	boring	BoringDAO	f	\N	2023-05-24	2023-05-24
dbaa28bb-5be9-4dd1-8d21-82ce4525a740	boringdao-[old]	bor	BoringDAO [OLD]	f	\N	2023-05-24	2023-05-24
c7f31bbb-aa0a-44c4-aec6-a21102a72ab4	boring-protocol	bop	Boring Protocol	f	\N	2023-05-24	2023-05-24
6dd94525-2579-4b8c-b4ee-ecdfeecb58ff	bosagora	boa	BOSagora	f	\N	2023-05-24	2023-05-24
88dee822-4aeb-4f9a-8cdb-abba3a9e84b2	boson-protocol	boson	Boson Protocol	f	\N	2023-05-24	2023-05-24
e1ece916-b764-4369-b41e-54baaa1ce218	boss	boss	Boss	f	\N	2023-05-24	2023-05-24
9e06b23c-4af6-4e76-9286-2da6961952f2	bossdao	boss	BossDao	f	\N	2023-05-24	2023-05-24
29abdf52-6c3e-480c-aec6-985975f9ff94	bossswap	boss	Boss Swap	f	\N	2023-05-24	2023-05-24
5e4fd976-7cb9-4b98-b5fe-840297761b39	bostrom	boot	Bostrom	f	\N	2023-05-24	2023-05-24
afb140de-544a-4b5b-a772-3b6e8af14c6c	botopiafinance	btop	BotopiaFinance	f	\N	2023-05-24	2023-05-24
8f8f8014-21a3-41fe-b795-32891814df3e	bot-planet	bot	Bot Planet	f	\N	2023-05-24	2023-05-24
c28dcc31-ed47-4010-a8df-81402b6e638b	botto	botto	Botto	f	\N	2023-05-24	2023-05-24
ec44144b-0e07-42d6-86b1-000ee5d1860e	bottos	bto	Bottos	f	\N	2023-05-24	2023-05-24
404f4041-86b0-4813-bca0-75accf90286a	botxcoin	botx	BOTXCOIN	f	\N	2023-05-24	2023-05-24
41bb835b-ff0e-417c-9561-d4d15ef2d5ab	bountie-hunter	bountie	Bountie Hunter	f	\N	2023-05-24	2023-05-24
f14232b3-318a-4164-8375-f0319e2b7c56	bounty0x	bnty	Bounty0x	f	\N	2023-05-24	2023-05-24
2c8bf132-b3f6-4e64-a501-064d6573af12	bountykinds-yu	yu	BountyKinds YU	f	\N	2023-05-24	2023-05-24
f8db0a5c-f58e-4c7c-b7c1-ddb982421ffc	bountymarketcap	bmc	BountyMarketCap	f	\N	2023-05-24	2023-05-24
3bbcbbf6-91bb-44f9-8f44-2d324df34d0d	bovineverse-bvt	bvt	Bovineverse BVT	f	\N	2023-05-24	2023-05-24
bf129b03-6a56-4af9-9fb2-f9607f5a4c05	bowl-shibarium	bowl	BOWL SHIBARIUM	f	\N	2023-05-24	2023-05-24
d3dadaa1-7681-4743-a421-87fc8ceb0d74	bowscoin	bsc	BowsCoin	f	\N	2023-05-24	2023-05-24
eb191e94-bfc5-47e1-a0f6-280be29827e6	boxa	boxa	BOXA	f	\N	2023-05-24	2023-05-24
4e9bd57c-4cf1-4fa1-b049-4408cf5cfbb5	boxaxis	baxs	BoxAxis	f	\N	2023-05-24	2023-05-24
ca56d077-e4ca-4db5-822a-3dc67c1bdc31	boxch	boxch	Utility Token Boxch	f	\N	2023-05-24	2023-05-24
e3653361-c9b4-452a-bc63-dd9854523f96	bpegd	bpeg	BPEGd	f	\N	2023-05-24	2023-05-24
422d4eaa-46a0-4643-ac4d-48c4c1a95cc5	bpm	bpm	BPM	f	\N	2023-05-24	2023-05-24
58a91cfe-5abf-45f9-86e2-8f433be55e91	b-protocol	bpro	B.Protocol	f	\N	2023-05-24	2023-05-24
e2667fb6-9b43-48d8-8808-e490482cd914	bracelet	brc	Bracelet	f	\N	2023-05-24	2023-05-24
ae720b1c-4c85-4e15-b504-9b7ddbc987a6	brain-sync	syncbrain	Brain Sync	f	\N	2023-05-24	2023-05-24
6e00fc07-31db-4fe1-8445-84b121118e2d	braintrust	btrst	Braintrust	f	\N	2023-05-24	2023-05-24
609a5380-9a68-4fe0-b50a-f8b281f19481	brandpad-finance	brand	BrandPad Finance	f	\N	2023-05-24	2023-05-24
5164b8ef-0f14-4eb3-81e7-74d5ac9ed9f1	brave-power-crystal	bpc	Brave Power Crystal	f	\N	2023-05-24	2023-05-24
cc9673f0-0783-4b24-8714-61c09142a4a4	brazil-fan-token	bft	Brazil National Football Team Fan Token	f	\N	2023-05-24	2023-05-24
c789f8dc-d3ce-4ab3-8b53-325c99fd86eb	brcp-token	brcp	BRCP	f	\N	2023-05-24	2023-05-24
c091ca80-30ca-4eae-a92d-228555499375	brd	brd	Board	f	\N	2023-05-24	2023-05-24
f6b62e4e-71f9-4fd2-a3ec-90d1e45264f3	bread	brd	Bread	f	\N	2023-05-24	2023-05-24
b22d8b9f-17e3-4519-ba1f-6fe738de0276	breederdao	breed	BreederDAO	f	\N	2023-05-24	2023-05-24
d5b20f8d-ed6e-4318-940a-d99f18611443	brewlabs	brewlabs	Brewlabs	f	\N	2023-05-24	2023-05-24
5b9357ed-592c-4756-a983-9a909d9bbbfb	brick	brick	r/FortNiteBR Bricks	f	\N	2023-05-24	2023-05-24
6ca8dd07-a5af-4b20-8ba2-b31248e741ed	brick-token	brick	Brick	f	\N	2023-05-24	2023-05-24
cde074c3-a127-4842-b4a6-91782c807747	bridge-mutual	bmi	Bridge Mutual	f	\N	2023-05-24	2023-05-24
6bc236b2-97d6-4fe7-84f1-71bc38b590f6	bridge-network	brdg	Bridge Network	f	\N	2023-05-24	2023-05-24
910a5f9f-7881-4fc7-b3bd-fa4d46e020e2	bridge-oracle	brg	Bridge Oracle	f	\N	2023-05-24	2023-05-24
47b968ac-853b-4efc-9460-62686b54bcdf	bright-token	bright	BrightID	f	\N	2023-05-24	2023-05-24
095e155d-a407-4332-a609-6d65761b3576	bright-union	bright	Bright Union	f	\N	2023-05-24	2023-05-24
43fb2afb-f080-4ea8-8a53-11e52239b517	brise-paradise	prds	Brise Paradise	f	\N	2023-05-24	2023-05-24
ef9470d7-08d4-4b3e-a717-fd5038fdb729	britto	brt	Britto	f	\N	2023-05-24	2023-05-24
5eebff32-68f4-4b33-ba02-10a927c17963	brmv-token	brmv	BRMV	f	\N	2023-05-24	2023-05-24
0a6289b8-f269-4c7b-8eb3-224a59db66c9	brn-metaverse	brn	BRN Metaverse	f	\N	2023-05-24	2023-05-24
c993eba4-ac31-4065-b902-f7bdca59a4cb	brokkr	bro	Brokkr	f	\N	2023-05-24	2023-05-24
2d57c11e-9846-4a66-9fc5-1d9eeb74de79	brokoli	brkl	Brokoli	f	\N	2023-05-24	2023-05-24
28d66034-4661-4615-af81-7669ffa7cee2	broovs-projects	brs	Broovs Projects	f	\N	2023-05-24	2023-05-24
0ace13bd-af7d-4a1f-a10c-ca1d97fc84f2	brother-music-platform	bmp	Brother Music Platform	f	\N	2023-05-24	2023-05-24
73aeb42a-8140-4806-a188-4d87c0891101	brr-protocol	brr	Brr Protocol	f	\N	2023-05-24	2023-05-24
765085e9-9890-4db3-a6c2-fee8d5c70fe1	bruv	bruv	Bruv	f	\N	2023-05-24	2023-05-24
8b851925-86f7-4238-9e1d-35000c1920c6	brz	brz	Brazilian Digital	f	\N	2023-05-24	2023-05-24
de81c989-58c5-45a7-92b7-923d77ab8326	bscex	bscx	BSCEX	f	\N	2023-05-24	2023-05-24
9ffc43f9-1e03-455b-957a-42dc0810fb7e	bsclaunch	bsl	BSClaunch	f	\N	2023-05-24	2023-05-24
8390cfcd-adad-4e8b-a494-06256005aeb0	bscpad	bscpad	BSCPAD	f	\N	2023-05-24	2023-05-24
9fe0c372-0737-45ed-bd96-cb5cf49fe9ac	bscstarter	start	Starter.xyz	f	\N	2023-05-24	2023-05-24
3a415660-47de-41e1-95c8-ee2c6035784d	bsc-station	bscs	BSC Station	f	\N	2023-05-24	2023-05-24
5aad7c80-5621-4784-80d2-416542b186ca	bsdium	bscd	BSDium	f	\N	2023-05-24	2023-05-24
532b32de-6d6d-4c73-a7ce-c688e36498ad	bsv	bsv	$BSV	f	\N	2023-05-24	2023-05-24
ee28883b-cadd-4e29-a1ca-d371c2d9ce61	btaf-token	btaf	BTAF token	f	\N	2023-05-24	2023-05-24
a3ec008d-f568-4080-891d-597ee2a30722	btc-2x-flexible-leverage-index	btc2x-fli	BTC 2x Flexible Leverage Index	f	\N	2023-05-24	2023-05-24
fac2d00b-a854-463a-b618-54cf9f0adc16	btcmoon	btcm	BTCMoon	f	\N	2023-05-24	2023-05-24
aa6c72d7-1680-4a6c-89ea-f3fc2739c8bd	btc-proxy	btcpx	BTC Proxy	f	\N	2023-05-24	2023-05-24
0adca27c-fbcc-46dd-a063-5dbcc342f20a	btc-standard-hashrate-token	btcst	BTC Standard Hashrate Token	f	\N	2023-05-24	2023-05-24
302ecd0e-c513-4647-b0e1-787350a61f86	btf	btf	Bitcoin Faith	f	\N	2023-05-24	2023-05-24
e3cc7746-56d7-4322-97e2-934d092ebec4	btour-chain	msot	BTour Chain	f	\N	2023-05-24	2023-05-24
36508659-655b-441e-b8d8-5593e7d19cbf	btrips	btr	BTRIPS	f	\N	2023-05-24	2023-05-24
f020141d-6fcf-456d-af67-eb6d41e93999	bts-chain	btsc	BTS Chain	f	\N	2023-05-24	2023-05-24
199219bf-017e-4e69-94b8-bac77420cdd8	btse-token	btse	BTSE Token	f	\N	2023-05-24	2023-05-24
da8ba483-b7e1-41cc-b3d3-01afcd924a45	btu-protocol	btu	BTU Protocol	f	\N	2023-05-24	2023-05-24
a6e40eb6-20b6-4608-94bc-a31e88a08fde	bubblefong	bbf	Bubblefong	f	\N	2023-05-24	2023-05-24
fdac0bcb-8d35-425d-9ffa-583e6a20f964	buckhath-coin	bhig	BuckHath Coin	f	\N	2023-05-24	2023-05-24
b4fbee27-4065-4607-844b-49c404afc599	buddy-dao	bdy	Buddy DAO	f	\N	2023-05-24	2023-05-24
e5b1057c-4f14-4386-b81f-d4a06ed1e3d1	buff-coin	buff	Buff Coin	f	\N	2023-05-24	2023-05-24
0d410bc7-d367-4168-a8be-233c44ed0207	buff-doge-coin	dogecoin	Buff Doge Coin	f	\N	2023-05-24	2023-05-24
42f1887e-2643-439a-a08b-15dc18777452	buffedshiba	bshib	BuffedShiba	f	\N	2023-05-24	2023-05-24
3c48ec45-b386-4874-a2d1-c7835e30d875	buff-samo	bsamo	Buff Samo	f	\N	2023-05-24	2023-05-24
77695d31-5cf7-4692-8a9f-9fc1a6bda606	buffswap	buffs	BuffSwap	f	\N	2023-05-24	2023-05-24
48f4794f-777d-41f2-9e1d-3fd40df1cfbc	bugg-finance	bugg	BUGG Finance	f	\N	2023-05-24	2023-05-24
367d3310-c1f5-47a9-b1fd-2d20d73a1382	buhund	buh	Buhund	f	\N	2023-05-24	2023-05-24
65bb754b-1c47-4832-a709-59919a9f3aab	build	build	BUILD	f	\N	2023-05-24	2023-05-24
f600f936-37ac-413d-829d-3c291fed95c2	buildup	bup	BuildUp	f	\N	2023-05-24	2023-05-24
7bf6e314-8265-4450-8389-19e6af8cbfae	bullbear-ai	aibb	BullBear AI	f	\N	2023-05-24	2023-05-24
7e85259f-1434-402a-99bc-0a49450591a9	bull-btc-club	bbc	Bull BTC Club	f	\N	2023-05-24	2023-05-24
22c7f711-d39f-467a-9ade-f1924ddf5921	bull-coin	bull	Bull Coin	f	\N	2023-05-24	2023-05-24
8b5fea93-1bbb-4001-876e-7b2b9e782ddd	bullets	blt	Bullets	f	\N	2023-05-24	2023-05-24
4dbb4682-bd77-4868-a63d-41580d1c648a	bull-game	bgt	Bull Game ToKens	f	\N	2023-05-24	2023-05-24
dcbcf0a4-e372-49ae-8e62-5d24903e3af7	bullieverse	bull	Bullieverse	f	\N	2023-05-24	2023-05-24
bd7b41d8-64cf-441c-8108-de9a037f4668	bullion	cbx	Bullion	f	\N	2023-05-24	2023-05-24
5092ad9b-c3f8-4ebb-bb8a-328d01b64af3	bull-market	$bull	Bull Market	f	\N	2023-05-24	2023-05-24
0dcff039-c500-4723-a224-4a680eea5e62	bullperks	blp	BullPerks	f	\N	2023-05-24	2023-05-24
0335e1ca-f501-4e41-8ddd-883546e9f40b	bumblebot	bumble	Bumblebot	f	\N	2023-05-24	2023-05-24
cc0c5357-10dd-4398-a8cd-2cc0a65a4bbc	bumble-c	bumblec	Bumble-C	f	\N	2023-05-24	2023-05-24
bb1db42f-52dd-4cd6-8851-12cccf342081	bumoon	bumn	BUMooN	f	\N	2023-05-24	2023-05-24
30f8192a-444e-4044-9ba4-2fc587da770b	bumper	bump	Bumper	f	\N	2023-05-24	2023-05-24
cf22d160-58e9-420c-b874-bdbe946120d4	bundles	bund	Bund V2	f	\N	2023-05-24	2023-05-24
112df9d6-7e25-4455-93a6-cd8d2fc9f3f9	bunicorn	buni	Bunicorn	f	\N	2023-05-24	2023-05-24
426b75ff-8ff6-4347-af06-f7a23c115945	bunnycoin	bun	Bunnycoin	f	\N	2023-05-24	2023-05-24
072e783b-6727-4773-b573-85d7e786ad81	bunnypark	bp	BunnyPark	f	\N	2023-05-24	2023-05-24
aef4d9c4-1393-45a0-8df9-ade35fce219a	bunnypark-game	bg	BunnyPark Game	f	\N	2023-05-24	2023-05-24
317c190e-d061-4697-9a8b-9add70a5c36b	bunny-token-polygon	polybunny	Pancake Bunny Polygon	f	\N	2023-05-24	2023-05-24
5261b143-df3d-409a-a51d-d19590a0798b	bunnyverse	bnv	BunnyVerse	f	\N	2023-05-24	2023-05-24
27f941f8-2ce9-4a2d-972e-b2cdc89500d2	bunscake	bscake	Bunscake	f	\N	2023-05-24	2023-05-24
bd7c8197-a2d4-4a0f-b3dd-adae6d31f9aa	burency	buy	Burency	f	\N	2023-05-24	2023-05-24
fb1b0119-81da-4b80-a270-be3247c6a1e7	burger-swap	burger	BurgerCities	f	\N	2023-05-24	2023-05-24
121b6c2f-de93-44db-beb0-c82d2fcc569a	burn	burn	BURN	f	\N	2023-05-24	2023-05-24
c11620d3-f307-42bb-a773-e7410e080209	burp	burp	Burp	f	\N	2023-05-24	2023-05-24
12567e51-75c7-46c5-bb56-a2d9ac6604c6	burrito-boyz-floor-index	burr	Burrito Boyz Floor Index	f	\N	2023-05-24	2023-05-24
64dd0f8c-8087-4925-b26b-7de3773d09fa	burrow	brrr	Burrow	f	\N	2023-05-24	2023-05-24
334219a4-ebea-4ef2-9fb0-01b4fa9bca08	bursaspor-fan-token	tmsh	Bursaspor Fan Token	f	\N	2023-05-24	2023-05-24
b6ac8339-0f2f-4d35-b1c5-d0b30a60f278	busd-plenty-bridge	busd.e	BUSD (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
673d7a35-97f8-40bd-a4ad-f3e2125c9452	busdx	busdx	BUSDX	f	\N	2023-05-24	2023-05-24
d171c775-69bc-4c7a-bcb9-1f5e8677aaac	business-universe	buun	Business Universe	f	\N	2023-05-24	2023-05-24
c0eeea3d-9c95-4d15-8016-79a1212b6457	busy-dao	busy	Busy	f	\N	2023-05-24	2023-05-24
116b4c7e-4d75-4974-938c-326c49f22d2f	butter	butter	Butter	f	\N	2023-05-24	2023-05-24
1ad73c9a-9d52-4d3b-9680-05b0939ffa05	butterfly-protocol-2	bfly	Butterfly Protocol	f	\N	2023-05-24	2023-05-24
cc6ae444-14af-43b3-9ed3-b057419a9527	buying	buy	Buying.com	f	\N	2023-05-24	2023-05-24
17098fa0-1c07-45fe-9fdb-40cad5b203d0	buymainstreet	mainst	Main Street	f	\N	2023-05-24	2023-05-24
e48f0e37-6c80-4f32-8035-bf40346219a9	buymore	more	BuyMORE	f	\N	2023-05-24	2023-05-24
2cd35c4a-036b-40cc-a08b-526c25cd594f	b-watch-box	box	B.watch Box	f	\N	2023-05-24	2023-05-24
dec8fc3e-8e0d-4dfe-b64c-43f2f97a8dca	bxh	bxh	BXH	f	\N	2023-05-24	2023-05-24
814ce727-ab91-496b-9d58-c16f64d56511	byepix	epix	Byepix	f	\N	2023-05-24	2023-05-24
6bfa2b75-1d73-4d09-953a-460e4b003896	byld	byld	bYLD	f	\N	2023-05-24	2023-05-24
5ae9a72b-8f39-49fc-b8b8-23ad08ab074b	byteball	gbyte	Obyte	f	\N	2023-05-24	2023-05-24
c9548516-1588-4c5f-b30a-f17f2391bdf4	bytecoin	bcn	Bytecoin	f	\N	2023-05-24	2023-05-24
132c66c9-edee-4463-aadd-54ede14acfce	byteex	bx	ByteEx	f	\N	2023-05-24	2023-05-24
d1a1c1fa-981f-4c06-b67d-2511a26a9b69	bytenext	bnu	ByteNext	f	\N	2023-05-24	2023-05-24
f811ae56-602e-415a-a5b8-ccc624a87493	bytom	btm	Bytom	f	\N	2023-05-24	2023-05-24
e6ba0d7a-16e0-4a37-abdd-bcf8aeb62d32	bytz	bytz	BYTZ	f	\N	2023-05-24	2023-05-24
89283cb1-43cb-4fe0-b5f1-ca52ea473e50	bzetcoin	bzet	BzetCoin	f	\N	2023-05-24	2023-05-24
ecf2955a-a7de-4a6b-890c-9e83e24ff770	bzx-protocol	bzrx	bZx Protocol	f	\N	2023-05-24	2023-05-24
11e67be4-b5bc-4c21-b1b4-1602e9eebdb9	caave	caave	cAAVE	f	\N	2023-05-24	2023-05-24
a9bec21a-a8a3-44d9-994f-b70d911b3f9d	cacao	cacao	Maya Protocol	f	\N	2023-05-24	2023-05-24
545b5e1c-e188-4ef4-8ec5-34319f2d01b5	cache-gold	cgt	CACHE Gold	f	\N	2023-05-24	2023-05-24
e799875b-44bd-4294-b5be-d1b44db40604	cad-coin	cadc	CAD Coin	f	\N	2023-05-24	2023-05-24
3f83e9a8-0037-4ce8-adf4-8e60dfdff2e1	caduceus	cmp	Caduceus	f	\N	2023-05-24	2023-05-24
5e9c1845-9423-49b9-b8d7-773e46d7a876	caica-coin	cicc	CAICA Coin	f	\N	2023-05-24	2023-05-24
5649df29-4774-4537-87e3-fe52191c3c48	cajutel	caj	Cajutel	f	\N	2023-05-24	2023-05-24
10d944f7-4c7b-4aa0-ba33-23ae28887a3d	cake-monster	monsta	Cake Monster	f	\N	2023-05-24	2023-05-24
32ff25fe-4661-4c9c-9880-c3802c92ec9b	cakeswap	cakeswap	CakeSwap	f	\N	2023-05-24	2023-05-24
46abacd9-5135-49fe-841a-be0083e0cc68	caketools	ckt	Caketools	f	\N	2023-05-24	2023-05-24
2a838b27-c1f4-4f15-b48e-16f86acda55e	calamari-network	kma	Calamari Network	f	\N	2023-05-24	2023-05-24
7c4f3cbf-0d83-4b90-a538-d53adce89407	calaxy	clxy	Calaxy	f	\N	2023-05-24	2023-05-24
6d7287bf-c74c-4ab7-9378-ef988111064f	calicoin	cali	CaliCoin	f	\N	2023-05-24	2023-05-24
27287b8a-a294-4ddc-b67d-a1dfecc74e1e	callisto	clo	Callisto Network	f	\N	2023-05-24	2023-05-24
58819789-f3e0-4576-b3a4-e2b4a488a185	calo-app	calo	Calo	f	\N	2023-05-24	2023-05-24
6594bee9-00e2-47f3-ab34-c1810650d0e4	calo-fit	fit	Calo FIT	f	\N	2023-05-24	2023-05-24
6ffe24f4-f6ac-4bf6-b1d6-dcab266665be	calorie	cal	FitBurn	f	\N	2023-05-24	2023-05-24
06ced35f-ecaf-4578-b10a-b052eb6459d4	calvaria-doe	ria	Calvaria: DoE	f	\N	2023-05-24	2023-05-24
69be5631-b6c9-45a4-b7cc-2f3cc3074e2d	camelcoin	cml	Camelcoin	f	\N	2023-05-24	2023-05-24
da258c0e-0928-467d-97b7-152171959f0c	camelot-token	grail	Camelot Token	f	\N	2023-05-24	2023-05-24
f725c9f5-82bd-4e92-867f-7387122c9013	camp	camp	Camp	f	\N	2023-05-24	2023-05-24
c49025ed-513e-4b06-8628-259ef0186c5a	canadian-inuit-dog-2	cadinu	Canadian Inuit Dog	f	\N	2023-05-24	2023-05-24
e4e224d2-cda7-48a7-850c-7f8271d7996a	canary	cnr	Canary	f	\N	2023-05-24	2023-05-24
f74b1fac-43f4-4d51-9a58-aa49a80663ee	canary-dollar	cand	Canary Dollar	f	\N	2023-05-24	2023-05-24
10ad9b4b-755c-412b-84dd-9d6ae2c374fa	canaryx	cnyx	CanaryX	f	\N	2023-05-24	2023-05-24
9f87f607-886c-447a-90ab-1cc80060d9d7	candylad	candylad	Candylad	f	\N	2023-05-24	2023-05-24
4af916dd-f44d-4f18-803f-f8db815b54c7	cannabiscoin	cann	CannabisCoin	f	\N	2023-05-24	2023-05-24
650ec0da-e8e6-44f9-a46a-edffcf6ebf70	cantina-royale	crt	Cantina Royale	f	\N	2023-05-24	2023-05-24
8a825980-22bd-4fb8-9199-7234eaa00e90	canto	canto	CANTO	f	\N	2023-05-24	2023-05-24
1bbb64cc-a88f-4dae-9bfa-38e04d96e551	cantobelieve	believe	CantoBelieve	f	\N	2023-05-24	2023-05-24
cb172ff8-b7ff-498f-b046-ca4445dc739f	cantobonk	cbonk	CantoBonk	f	\N	2023-05-24	2023-05-24
92de0bd7-6a2c-4e41-8eb1-31c1dc06c848	canto-crabs-chip	crab	Canto Crabs Chip	f	\N	2023-05-24	2023-05-24
a2df616f-db1e-4d52-a89f-05c51624769a	cantohm	cohm	CantOHM	f	\N	2023-05-24	2023-05-24
337769c1-dd50-48a3-b233-a0c60c33f123	canto-inu	cinu	Canto Inu	f	\N	2023-05-24	2023-05-24
7ebfbaa0-003f-4fdf-99a2-59e49e00ab5e	canto-shib	cshib	Canto Shib	f	\N	2023-05-24	2023-05-24
6de5c093-c3d6-4470-8212-1d7bd39ff484	cantosino-com-profit-pass	cpp	Cantosino.com Profit Pass	f	\N	2023-05-24	2023-05-24
76fc36d8-0cb3-42c5-b0d3-2fa4a12fc8a4	canvas-n-glr	glr	GalleryCoin	f	\N	2023-05-24	2023-05-24
35dc53a3-79f8-4c4c-bb88-472768bab579	cap	cap	Cap	f	\N	2023-05-24	2023-05-24
9f02bf8a-ca47-45bb-ab32-a1f8c11539e7	capapult	capa	Capapult	f	\N	2023-05-24	2023-05-24
2448126e-fe8d-4a7f-8083-fd867d6119fa	capital-dao-starter-token	cds	Capital DAO Starter	f	\N	2023-05-24	2023-05-24
b99ab472-0125-4f24-bf5d-d7261bc920cf	capital-x-cell	cxc	CAPITAL X CELL	f	\N	2023-05-24	2023-05-24
134fdd28-fa04-4439-a249-bc4b36b0bcac	capone	capone	Capone	f	\N	2023-05-24	2023-05-24
70ed0be3-5db2-4522-a657-9b427fe796d5	cappasity	capp	Cappasity	f	\N	2023-05-24	2023-05-24
b4fd61b4-eac2-4cc0-bd45-c9107815092a	capricorn	corn	Capricorn	f	\N	2023-05-24	2023-05-24
33cfc38f-7f3c-4d53-9e9a-6007bc3369f0	captain-inu	cptinu	Captain Inu	f	\N	2023-05-24	2023-05-24
c7c15d0a-cdd2-44db-9549-cbcb8a24fe72	captain-planet	ctp	Captain Planet	f	\N	2023-05-24	2023-05-24
cf6ee59e-3712-4c82-881c-b40355cbd578	capybara	capy	Capybara	f	\N	2023-05-24	2023-05-24
e1353481-5b8e-4b0e-9582-77d61df2f998	capybara-bsc	capy	Capybara BSC	f	\N	2023-05-24	2023-05-24
524b7391-98ad-4c4d-a14f-d41e40143a76	capybara-memecoin	bara	Capybara Memecoin	f	\N	2023-05-24	2023-05-24
a43fe5f6-01d6-4bd6-8961-d0df2e58fe44	capybara-token	capy	Capybara Token	f	\N	2023-05-24	2023-05-24
623632cb-9a12-435b-ac7d-207867cc58d5	carbify	cby	Carbify	f	\N	2023-05-24	2023-05-24
03ac9976-fe52-4273-bbf4-d934918c65cb	carbon	crbn	Carbon	f	\N	2023-05-24	2023-05-24
16693b67-eadd-41fb-8d72-a06e02afe282	carbon-browser	csix	Carbon Browser	f	\N	2023-05-24	2023-05-24
9fd043cf-bbff-4622-8266-5302fd28077f	carboncoin	carbon	Carboncoin	f	\N	2023-05-24	2023-05-24
7be3f141-55ee-4100-b3d9-a81145789eb9	carbon-credit	cct	Carbon Credit	f	\N	2023-05-24	2023-05-24
32291384-f739-4554-b5a2-860ed38214d4	carbon-labs	carb	Carbon Labs	f	\N	2023-05-24	2023-05-24
21699577-a27a-4510-b1f3-3bc1cac2ca9f	carbon-usd	usc	Carbon USD	f	\N	2023-05-24	2023-05-24
95f2c3e3-3d83-438e-82c5-fe0bd5e1c320	cardano	ada	Cardano	f	\N	2023-05-24	2023-05-24
a0c76471-9429-4830-a297-69413d8b1319	cardanum	carda	Cardanum	f	\N	2023-05-24	2023-05-24
f5ba0f8d-e5c5-4096-b47a-44c585343e29	cardence	$crdn	Cardence	f	\N	2023-05-24	2023-05-24
b86cb8aa-ee27-4071-ad03-b3909e162fc4	cardiocoin	crdc	Cardiocoin	f	\N	2023-05-24	2023-05-24
1eafec89-135c-466e-ab24-3b25c997373d	cardstack	card	Cardstack	f	\N	2023-05-24	2023-05-24
9c2b5574-fb91-43b7-9cc8-8c35cc4dba83	cardstarter	cards	Cardstarter	f	\N	2023-05-24	2023-05-24
8b6ed421-bc6a-4c4d-91b2-5da7980b787a	carecoin	care	CareCoin	f	\N	2023-05-24	2023-05-24
97fa836f-1a13-4d03-8e87-5d20f4a66284	cargox	cxo	CargoX	f	\N	2023-05-24	2023-05-24
4b5ed8ea-df69-41c0-bdde-3f12ed827bfd	carmin	carmin	Carmin	f	\N	2023-05-24	2023-05-24
8a7ff308-f7e4-4893-9232-2d733794f2da	carnomaly	carr	Carnomaly	f	\N	2023-05-24	2023-05-24
575491e0-2e23-4547-a265-3ec1942eb3b4	caroline	her	Caroline	f	\N	2023-05-24	2023-05-24
b194858d-203b-4942-a03c-bda3b420cdf4	carrieverse	cvtx	CarrieVerse	f	\N	2023-05-24	2023-05-24
e57ef00c-1b24-4cf7-a772-f886296fd817	carry	cre	Carry	f	\N	2023-05-24	2023-05-24
8245d979-e7fd-4809-a6db-d6771ffe9027	cartel-coin	cartel	Cartel Coin	f	\N	2023-05-24	2023-05-24
7399deb4-0da8-4a35-b75c-a303ac766226	cartesi	ctsi	Cartesi	f	\N	2023-05-24	2023-05-24
805a65df-9595-4575-bfe5-6d2a51dad1d7	carvertical	cv	carVertical	f	\N	2023-05-24	2023-05-24
564b0b4c-93e6-4384-b5e6-5efe77fbe068	cascadia	cc	Cascadia	f	\N	2023-05-24	2023-05-24
fe2d3343-38fc-409a-80d4-2f1d4e1c385b	cashaa	cas	Cashaa	f	\N	2023-05-24	2023-05-24
83da2677-c926-4a9b-bace-f088a103a9fe	cashbackpro	cbp	CashBackPro	f	\N	2023-05-24	2023-05-24
d3b95c83-ef34-4205-92d1-590bc429d92a	cashbet-coin	cbc	CBC.network	f	\N	2023-05-24	2023-05-24
97ed5a8a-328f-4aa6-9a63-273899cc17a3	cashcats	$cats	CashCats	f	\N	2023-05-24	2023-05-24
a0c24a52-c05c-444a-9ab7-b73dee6ccbd1	cashcow	cow	CashCow	f	\N	2023-05-24	2023-05-24
6658c9b1-d2b0-4317-a9a1-59be6fc6c2b0	cash-driver	cd	Cash Driver	f	\N	2023-05-24	2023-05-24
6a514408-f22e-4cce-8554-fd3f75de5eb1	cashzone	cashz	CashZone	f	\N	2023-05-24	2023-05-24
431eb5b8-33c0-46b7-b728-e47348334b80	casinocoin	csc	Casinocoin	f	\N	2023-05-24	2023-05-24
9b6cd610-c6ba-454a-93ad-623f7ed4d952	casper-network	cspr	Casper Network	f	\N	2023-05-24	2023-05-24
ec6ac6bb-78f3-4420-b615-d8c332522277	casperpad	cspd	CasperPad	f	\N	2023-05-24	2023-05-24
dc7aac91-3cb3-4432-9f15-49e866856eb8	castello-coin	cast	Castello Coin	f	\N	2023-05-24	2023-05-24
a5b795b1-dc7f-4840-b0d3-139491e2ffee	cat	cat	Kitty Finance CAT	f	\N	2023-05-24	2023-05-24
0544b69e-b213-469d-8e38-5280e08308c1	catalina-whales-index	whales	Catalina Whales Index	f	\N	2023-05-24	2023-05-24
2f755048-6811-455b-a40a-064e614cbcdf	catapult	atd	A2DAO	f	\N	2023-05-24	2023-05-24
21b30bc0-f508-4c01-ba09-fe6b5444aa8f	catbonk	cabo	Catbonk	f	\N	2023-05-24	2023-05-24
20eea791-d223-4fe6-a898-aa1f82b2f97e	catboy-2	catboy	CatBoy	f	\N	2023-05-24	2023-05-24
5c52fc6b-c4ae-4ef2-9ab9-047ef121a1b9	cat-cat-token	cat	Cat	f	\N	2023-05-24	2023-05-24
eec8be23-c70c-45f3-9aaa-eb9596673c76	catceo	catceo	CATCEO	f	\N	2023-05-24	2023-05-24
0f796063-b0ce-49e7-941c-a80abd400c46	catchy	catchy	Catchy	f	\N	2023-05-24	2023-05-24
5bdf5ef4-7602-47df-9632-e7bb7e57f70d	catcoin-bsc	cat	Catcoin BSC	f	\N	2023-05-24	2023-05-24
bd3d2ef1-984f-4a5b-ad3e-fa5f5425afd0	catcoin-cash	catcoin	Catcoin	f	\N	2023-05-24	2023-05-24
fad1052e-5804-46bd-8cd6-4359c555e4e7	catcoin-token	cats	CatCoin Token	f	\N	2023-05-24	2023-05-24
31444320-156a-414c-b427-cb256e35dd0c	catecoin	cate	CateCoin	f	\N	2023-05-24	2023-05-24
ca5f1b68-9140-4d7c-85a8-67fb0804cad9	catex-token	catt	Catex	f	\N	2023-05-24	2023-05-24
fccd6806-3c37-4a9f-a284-772e9a526130	catge-coin	catge	Catge Coin	f	\N	2023-05-24	2023-05-24
b924bd8f-00d7-4c98-a81c-c22cea5ca740	catgirl	catgirl	Catgirl	f	\N	2023-05-24	2023-05-24
358b3733-3cc5-40c2-bd17-5fcdf560904d	catgirl-ai	catai	Catgirl AI	f	\N	2023-05-24	2023-05-24
d4226d12-5478-4c76-9d06-33221f08b290	catgirl-optimus	optig	Catgirl Optimus	f	\N	2023-05-24	2023-05-24
3f7724b7-106c-47bf-aebb-2c72c1426972	catheon-gaming	catheon	Catheon Gaming	f	\N	2023-05-24	2023-05-24
93cdf8eb-c704-48ef-b58a-73c7046f2fae	cat-in-a-box-ether	boxeth	Cat-in-a-Box Ether	f	\N	2023-05-24	2023-05-24
36b49b50-087d-486e-89ad-66f3ffa9a1c3	cat-in-a-box-fee-token	boxfee	Cat-in-a-Box Fee Token	f	\N	2023-05-24	2023-05-24
946a639f-f53a-4063-a2a9-d11093766a8a	catking	cking	CatKing	f	\N	2023-05-24	2023-05-24
b29b706b-952f-407f-983e-6eea40722d5a	cat-mouse	catmouse	Cat & Mouse	f	\N	2023-05-24	2023-05-24
834aab77-ba06-4e37-ab1c-3cedd2b23e02	catmouseworld-rice	rice	CatMouseWorld RICE	f	\N	2023-05-24	2023-05-24
19534015-191e-46d2-aea6-90586fe79c37	cato	cato	CATO	f	\N	2023-05-24	2023-05-24
24861225-5eb7-4f9f-a2cb-496e805dbd96	catocoin	cato	CatoCoin	f	\N	2023-05-24	2023-05-24
775a82df-79cb-4d42-81d8-95bdeec8c763	catpay	catpay	CATpay	f	\N	2023-05-24	2023-05-24
b8c5bebe-f827-4fb4-ab89-c089e43ed0ef	cats	cats	Cats	f	\N	2023-05-24	2023-05-24
38b54208-1ae6-4ed9-ae20-5506514d7bd1	catscoin	cats	Catscoin	f	\N	2023-05-24	2023-05-24
d900494e-229a-48e4-a881-b2b4090b3a87	cats-coin-1722f9f2-68f8-4ad8-a123-2835ea18abc5	cts	Cats Coin (BSC)	f	\N	2023-05-24	2023-05-24
27e4d828-7228-47a9-a57c-0f4f4d87f757	cat-token	cat	Mooncat CAT	f	\N	2023-05-24	2023-05-24
837aa81d-656d-4e03-9413-5a62058fd100	catvills-coin	catvills	Catvills Coin	f	\N	2023-05-24	2023-05-24
05e15d19-b281-47c1-9ea3-213c6a6e436c	catzcoin	catz	CatzCoin	f	\N	2023-05-24	2023-05-24
2bd15024-3ed1-41b6-8d5d-0a2d3b2dafb7	cavapoo	cava	Cavapoo	f	\N	2023-05-24	2023-05-24
3dda4a1f-e394-4677-9a6a-3438cdfdbb36	cavatar	cavat	Cavatar	f	\N	2023-05-24	2023-05-24
ec62f853-5444-498a-8717-09403c4e6767	cave	cave	CaveWorld	f	\N	2023-05-24	2023-05-24
77087d74-aa98-42b4-b584-a8c574126d48	caw-ceo	cawceo	Caw CEO	f	\N	2023-05-24	2023-05-24
0245efbe-1277-477a-9545-689441eae2ad	cbomber	cbomber	CBOMBER	f	\N	2023-05-24	2023-05-24
cb7dd5a0-e427-4213-8a55-fdb15cc1465c	cbyte-network	cbyte	CBYTE Network	f	\N	2023-05-24	2023-05-24
2bad24b8-0c55-4f8f-a17b-4961104c9ba6	cca	cca	CCA	f	\N	2023-05-24	2023-05-24
1c6f12d4-6652-4dfc-a8b5-99d2de0d479c	ccgds	ccgds	CCGDS	f	\N	2023-05-24	2023-05-24
3e28cfab-7da3-47db-a705-3bc641765922	c-charge	cchg	C+Charge	f	\N	2023-05-24	2023-05-24
3c361234-b74c-4800-aefe-ead16558d525	ccomp	ccomp	cCOMP	f	\N	2023-05-24	2023-05-24
3dce8b14-1937-4c55-a6d5-9a7ca105775a	ccore	cco	Ccore	f	\N	2023-05-24	2023-05-24
396e1d04-9b41-41a3-b0cd-abb0479b9fb9	cdai	cdai	cDAI	f	\N	2023-05-24	2023-05-24
bbb526c2-aae0-4e63-bbdc-e2113d38c564	cdbio	mcd	CDbio	f	\N	2023-05-24	2023-05-24
2d8e0c3d-9d3a-4002-a01a-6cc9366f092e	ceasports	cspt	CEASports	f	\N	2023-05-24	2023-05-24
7efbaf19-6c83-427b-b5e7-1afc722cd208	cebiolabs	cbsl	CeBioLabs	f	\N	2023-05-24	2023-05-24
a1b635d1-e667-4e6e-974e-d7ede4194bce	ceek	ceek	CEEK Smart VR	f	\N	2023-05-24	2023-05-24
2e25eeea-26a4-4e54-9d50-4aecbfaa02ba	ceji	ceji	Ceji	f	\N	2023-05-24	2023-05-24
095c1f83-96ab-423c-a2af-4c88fa074113	celeb	celeb	CelebQ	f	\N	2023-05-24	2023-05-24
4fd06ebe-e2b9-4ff8-8f77-74786ecbaf8b	celer-network	celr	Celer Network	f	\N	2023-05-24	2023-05-24
e840be1b-419c-4170-831c-a143d1dcbcc2	celery	cly	Celery	f	\N	2023-05-24	2023-05-24
6430f17e-0199-452d-95e3-8844a417cf7d	celestial	celt	Celestial	f	\N	2023-05-24	2023-05-24
aa71910e-81d9-4b67-bc1e-df7071a11c00	celletf	ecell	Consensus Cell Network	f	\N	2023-05-24	2023-05-24
c3594882-ecd4-4af7-a284-6ef2ce475d8d	cellframe	cell	Cellframe	f	\N	2023-05-24	2023-05-24
1368d083-962d-4170-8715-87abe8132d81	cells-token	cells	Cells Token	f	\N	2023-05-24	2023-05-24
3d34f756-8f8c-467b-a77c-130fa69a717f	celo	celo	Celo	f	\N	2023-05-24	2023-05-24
e82acb3f-950c-4123-98f4-e27f0383f79d	celo-dollar	cusd	Celo Dollar	f	\N	2023-05-24	2023-05-24
e348c65b-5c38-42e4-b0a4-dc3fc1f4665f	celo-euro	ceur	Celo Euro	f	\N	2023-05-24	2023-05-24
dde97896-a7ea-4bb3-8d80-f9f47e274fff	celolaunch	cla	CeloLaunch	f	\N	2023-05-24	2023-05-24
13170a5b-68da-450f-8be6-8ef12cb360ed	celo-real-creal	creal	Celo Real (cREAL)	f	\N	2023-05-24	2023-05-24
a783b479-48db-4c97-a82c-b348984027e7	celostarter	cstar	CeloStarter	f	\N	2023-05-24	2023-05-24
056c7d92-28b4-4af8-a182-92a91f7d7134	celsius-degree-token	cel	Celsius Network	f	\N	2023-05-24	2023-05-24
12633bcd-ab64-4ade-9899-c3eb712ce7a9	celsiusx-wrapped-eth	cxeth	CelsiusX Wrapped ETH	f	\N	2023-05-24	2023-05-24
1fa8ad82-6299-413b-ae8b-c429c10605a7	cens-world	cens	Cens World	f	\N	2023-05-24	2023-05-24
8285cfdd-fe7f-40ca-951f-5295fb535fb8	centaur	cntr	Centaur	f	\N	2023-05-24	2023-05-24
d3034697-45f2-4032-8ed3-c3a335389f13	centaurify	cent	Centaurify	f	\N	2023-05-24	2023-05-24
cd137afb-02a1-4e7b-a4a5-d4acabe211ca	centcex	cenx	Centcex	f	\N	2023-05-24	2023-05-24
396ad054-0082-4ba0-a281-73e2afb7a5b4	centrality	cennz	CENNZnet	f	\N	2023-05-24	2023-05-24
6f39e54c-d29e-4755-a7d4-db12c51d8381	centric-cash	cns	Centric Swap	f	\N	2023-05-24	2023-05-24
c0633628-9cc5-4567-8257-849b8b5f4a0f	centrifuge	cfg	Centrifuge	f	\N	2023-05-24	2023-05-24
9b0d1e1a-5937-4758-856a-2af4a26397b5	centrofi	centro	CentroFi	f	\N	2023-05-24	2023-05-24
66022cdc-ef00-482e-8776-63b9779691f9	centurion-invest	cix	Centurion Invest	f	\N	2023-05-24	2023-05-24
f8f1dc11-abbd-4958-8326-f8f2d7cbce6b	ceo	ceo	CEO	f	\N	2023-05-24	2023-05-24
71ef020c-f3db-4e26-82ef-b89f6842d01f	cerberus-2	crbrus	Cerberus	f	\N	2023-05-24	2023-05-24
9a05a8d6-4230-4f50-89c9-5cb80c0dd472	cere-network	cere	Cere Network	f	\N	2023-05-24	2023-05-24
17fd1a37-e52d-4bc1-a672-7d9075863e68	ceres	ceres	Ceres	f	\N	2023-05-24	2023-05-24
77e6b004-b417-47e4-8345-d26add30186c	certik	ctk	Shentu	f	\N	2023-05-24	2023-05-24
0db01b49-f4a7-4a5b-99d2-eb5f51248211	cetf	cetf	Cell ETF	f	\N	2023-05-24	2023-05-24
fd410483-19ec-4e53-8545-57ccf5ccd155	cetus-protocol	cetus	Cetus Protocol	f	\N	2023-05-24	2023-05-24
232345e2-a4f8-4b38-99a1-fb6081ac708d	cex-ai	cex-ai	CEX AI	f	\N	2023-05-24	2023-05-24
b156bd69-06e2-4091-b806-2baf07830e24	cex-trade	cexd	Cex-Trade	f	\N	2023-05-24	2023-05-24
dee34503-d68f-404c-a6c3-3dcebb1b5133	cfl365-finance	cfl365	CFL365 Finance	f	\N	2023-05-24	2023-05-24
d52d5bb5-1543-4a2f-a499-eb76f57bf5b1	cfx-quantum	cfxq	CFX Quantum	f	\N	2023-05-24	2023-05-24
dad48488-f8f5-4575-aa73-dd550045e2ee	chad-coin	chad	Chad Coin	f	\N	2023-05-24	2023-05-24
8c52b46b-21e1-48d1-a65e-5ee41450ef7c	chain-2	xcn	Onyxcoin	f	\N	2023-05-24	2023-05-24
2dcf4ba4-73cf-4905-a8aa-1436fb5cd9b9	chainbing	cbg	Chainbing	f	\N	2023-05-24	2023-05-24
5f7cc2f5-b377-4eb6-9e1f-a14d59394625	chaincade	chaincade	ChainCade	f	\N	2023-05-24	2023-05-24
83054bcd-1df9-45f7-92dd-93da05a03160	chainflix	cfxt	Chainflix	f	\N	2023-05-24	2023-05-24
a5594ef7-6cb4-4e28-a393-65ec88d9d11d	chain-games	chain	Chain Games	f	\N	2023-05-24	2023-05-24
e98c559f-9608-48fa-b8ca-daece4d48f89	chainge-finance	chng	Chainge Finance	f	\N	2023-05-24	2023-05-24
54e40b2d-3da4-4e8c-8c8c-5c54fe94f0d9	chaingpt	cgpt	ChainGPT	f	\N	2023-05-24	2023-05-24
4faf9308-0f1e-45cf-a3b4-c22049ee03f1	chain-guardians	cgg	Chain Guardians	f	\N	2023-05-24	2023-05-24
b14ab6a4-5bfc-43bb-a208-40599a3b0dc4	chainlink	link	Chainlink	f	\N	2023-05-24	2023-05-24
1ff7b5f6-a555-4fd5-8682-6de8a8bcefb3	chainlink-plenty-bridge	link.e	Chainlink (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
8b95783f-8e9f-4004-8df4-7cd80a4fbf49	chain-of-legends	cleg	Chain of Legends	f	\N	2023-05-24	2023-05-24
cf7d2b3b-e869-4840-a0c1-801797ed7b40	chainpay	cpay	Chainpay	f	\N	2023-05-24	2023-05-24
1ec3a1db-1566-465b-8d9d-a7fbdd260495	chainport	portx	ChainPort	f	\N	2023-05-24	2023-05-24
a283a0db-9600-4b57-8f62-5e48c544087a	chains	cha	Chains	f	\N	2023-05-24	2023-05-24
bfc31bdc-ef03-4aff-a540-3283a7e2e071	chains-of-war	mira	Chains of War	f	\N	2023-05-24	2023-05-24
656dd38e-dbb1-42c5-a565-65b77b9b10eb	chainsquare	chs	Chainsquare	f	\N	2023-05-24	2023-05-24
c0f19309-7ac0-427e-a738-f08fe5531e0e	chain-wars-essence	cwe	Chain Wars	f	\N	2023-05-24	2023-05-24
b0b2e452-c905-404c-8e1e-3a6db42fece7	chainx	pcx	ChainX	f	\N	2023-05-24	2023-05-24
10957ff4-71db-45c7-9189-3d44696d78f5	challenge-coin	hero	Challenge Coin	f	\N	2023-05-24	2023-05-24
a4ad49db-8801-4ea8-b267-230ca778c768	champion	cham	Champion	f	\N	2023-05-24	2023-05-24
14b761e9-5fe3-4511-aa28-7e7ead1b9b2d	change	cag	Change	f	\N	2023-05-24	2023-05-24
adc3d13d-e8c8-4139-8519-7c3693f1c74f	changenow	now	ChangeNOW	f	\N	2023-05-24	2023-05-24
cdbcf7fd-1285-4b1a-af1c-6e21eeece3cb	changer	cng	Changer	f	\N	2023-05-24	2023-05-24
1b1a2756-cad9-4695-a5de-bc4fd4cf9947	changex	change	Changex	f	\N	2023-05-24	2023-05-24
627bb094-d239-4933-951c-656a3548d88c	channels	can	Channels	f	\N	2023-05-24	2023-05-24
ccc3f8b1-70ad-4afa-8a2b-56407c565879	chaotic-finance	chaos	Chaotic Finance	f	\N	2023-05-24	2023-05-24
70ac995c-219e-42dc-a79c-6d2e984f06c0	charactbit	chb	Charactbit	f	\N	2023-05-24	2023-05-24
2b030337-5d02-4d8c-912d-41b09d625970	characterai	chai	CharacterAI	f	\N	2023-05-24	2023-05-24
fc158be7-6918-411d-88d5-d4f3dbf7cf14	chargedefi-static	static	ChargeDeFi Static	f	\N	2023-05-24	2023-05-24
45aa40d7-ceff-4f98-ad06-c4d4793d5201	charged-particles	ionx	Charged Particles	f	\N	2023-05-24	2023-05-24
637ce3a5-6926-4110-b279-ee4c9130fe65	charity-alfa	mich	Charity Alfa	f	\N	2023-05-24	2023-05-24
48eceb39-9b19-43c7-99fc-f4a04df5ce07	charity-dao-token	chdao	Charity DAO Token	f	\N	2023-05-24	2023-05-24
bdf8e46b-71b0-488c-b06b-4cd5172911e8	charli3	c3	Charli3	f	\N	2023-05-24	2023-05-24
e93cb994-f815-4948-b741-3cdb4ea79ea9	charm	charm	Charm	f	\N	2023-05-24	2023-05-24
f815e90b-749d-4ef7-b3ab-e4481d58d1e1	chartex	chart	ChartEx	f	\N	2023-05-24	2023-05-24
dbdc94a3-48e8-4c42-bd5e-b7dccbc34f8a	chat-ai	ai	Chat AI	f	\N	2023-05-24	2023-05-24
d9779c4e-889d-4e11-816c-3fe33aa597cc	checkdot	cdt	CheckDot	f	\N	2023-05-24	2023-05-24
5ecd1bfe-f3d7-4d62-859d-f2d1c5e5a908	checkerchain	checkr	CheckerChain	f	\N	2023-05-24	2023-05-24
991b6d00-6caf-4421-9269-df871c97bbe9	checkmate-token	cmt	CheckMate Token	f	\N	2023-05-24	2023-05-24
cfcb6368-f9cc-464e-b1b9-3fe7c693a10f	checks-token	checks	Checks Token	f	\N	2023-05-24	2023-05-24
cc94c70d-c722-4771-8e9c-f3fcceb0b018	checoin	checoin	CheCoin	f	\N	2023-05-24	2023-05-24
f58e02fc-8336-4014-82d9-79ff63c71868	chedda	chedda	Chedda	f	\N	2023-05-24	2023-05-24
3114a1ad-d04a-4854-a6b9-db9279dad7eb	cheelee	cheel	Cheelee	f	\N	2023-05-24	2023-05-24
1b48be71-46e7-4bcf-9e21-324b7a798264	cheems	cheems	Cheems	f	\N	2023-05-24	2023-05-24
52c89b8a-9979-41ad-91c5-02fe31baa33b	cheems-inu-new	cinu	Cheems Inu [NEW]	f	\N	2023-05-24	2023-05-24
dbe215ab-ccc9-42ce-b2d7-011df8b28a7f	cheems-token	cheems	Cheems Token	f	\N	2023-05-24	2023-05-24
8d247a7d-ed6f-4b58-bfbc-3c4c7274ee61	cheersland	cheers	CheersLand	f	\N	2023-05-24	2023-05-24
76eff90c-66af-4815-a47a-fdfeec464aca	cheesecakeswap	ccake	CheesecakeSwap	f	\N	2023-05-24	2023-05-24
341512db-dfff-4f92-8fd5-ff4b4c419ff7	cheese-swap	cheese	Cheese Swap	f	\N	2023-05-24	2023-05-24
5a0f212c-ada0-4954-a994-8e730610ffc7	chellitcoin	chlt	Chellitcoin	f	\N	2023-05-24	2023-05-24
7abec8b6-10ba-4296-9c68-a503ff5fff5a	cheqd-network	cheq	CHEQD Network	f	\N	2023-05-24	2023-05-24
7b02fa8e-a371-45c5-9659-0dc6f7ceb49f	cherish	chc	Cherish	f	\N	2023-05-24	2023-05-24
dcaf3b79-74b3-4cd0-a17c-16bd39551d02	cherrylend	chry	CherryLend	f	\N	2023-05-24	2023-05-24
e57446fb-0ee1-4703-a385-42945aa5318c	cherry-network	cher	Cherry Network	f	\N	2023-05-24	2023-05-24
b8290138-0161-45ad-b6bd-a9118b51001c	cherryswap	che	CherrySwap	f	\N	2023-05-24	2023-05-24
df472ec7-4ab5-4424-a24a-565412743d44	chesscoin-0-32	chess	ChessCoin 0.32%	f	\N	2023-05-24	2023-05-24
e2a3cca4-27ba-42ab-9c3b-2bc4685984fe	chew	chew	CHEW	f	\N	2023-05-24	2023-05-24
d6664150-10fa-4940-926b-460d0d667ab5	chex-token	chex	CHEX Token	f	\N	2023-05-24	2023-05-24
92a4808d-9908-4440-8c17-de88dbb55b34	chia	xch	Chia	f	\N	2023-05-24	2023-05-24
94a6d89c-6359-494a-979a-a6d2a5aba588	chicken	kfc	Chicken	f	\N	2023-05-24	2023-05-24
8f28b912-4e14-4f1f-8f5a-d1e725786854	chicken-town	chickentown	Chicken Town	f	\N	2023-05-24	2023-05-24
e3656207-ca33-4899-8cbd-6f7478167168	chi-gastoken	chi	Chi Gas	f	\N	2023-05-24	2023-05-24
79c0a47b-643a-4107-93ab-956b7595ac11	chihiro-inu	chiro	Chihiro Inu	f	\N	2023-05-24	2023-05-24
930ebfe3-880d-4dbc-815b-a1efa5c8575c	chihuahua	hua	Chihuahua	f	\N	2023-05-24	2023-05-24
5b7b63a1-6a71-46c4-8e64-3f8d72421dd9	chihuahuasol	chih	ChihuahuaSol	f	\N	2023-05-24	2023-05-24
7f294b60-77fc-4d88-814f-9e53d66200e2	chihuahua-token	huahua	Chihuahua Chain	f	\N	2023-05-24	2023-05-24
39913c12-2bd6-4230-b9ed-3dcd0849a8f3	chihuahua-token-19fcd0de-eb4d-4fd7-bc4a-a202247dfdbb	chh	Chihuahua Token	f	\N	2023-05-24	2023-05-24
4912f1b2-3048-4e61-9958-e124988009d3	chikincoin	ckc	ChikinCoin	f	\N	2023-05-24	2023-05-24
478792c5-28dc-4fff-a3b8-e51e7337a98e	chikn-egg	egg	Chikn Egg	f	\N	2023-05-24	2023-05-24
c9da54f2-ff82-4c95-be30-1f292ac4ab21	chikn-feed	feed	chikn feed	f	\N	2023-05-24	2023-05-24
c4aacd84-442f-44c4-9e69-0db836bce973	chikn-fert	fert	Chikn Fert	f	\N	2023-05-24	2023-05-24
94514052-48fa-4af0-8b4c-58b0fc122c83	chikn-worm	worm	Chikn Worm	f	\N	2023-05-24	2023-05-24
a5730f70-be91-4758-a0e9-148b7e8c3056	childhoods-end	o	Childhoods End	f	\N	2023-05-24	2023-05-24
9c1a7333-e08a-4739-a2d5-befa43f23819	child-support	$cs	Child Support	f	\N	2023-05-24	2023-05-24
c50ef5e4-c831-4e1d-acd9-79ce7440fdd2	chili	chili	CHILI	f	\N	2023-05-24	2023-05-24
d988a771-9138-4bc4-bbba-95bb159aa360	chiliz	chz	Chiliz	f	\N	2023-05-24	2023-05-24
1aefc736-de90-4eb1-bd18-5e2e72cbc61b	chillpill	$chill	ChillPill	f	\N	2023-05-24	2023-05-24
6ae16578-74f6-4c0b-a3e7-cc8966fe794a	chimaera	wchi	XAYA	f	\N	2023-05-24	2023-05-24
adff72c5-34a9-495e-8862-09fbd0127150	chimeras	chim	Chimeras	f	\N	2023-05-24	2023-05-24
d5c6c50e-c4b0-4d8c-9eb9-8835726727fa	chimp-fight	nana	Nana	f	\N	2023-05-24	2023-05-24
71cab7e9-de24-4434-93cf-a6bf42499efb	chirpley	chrp	Chirpley	f	\N	2023-05-24	2023-05-24
9a5cc828-54a6-485f-901d-f99656f7500b	chitaverse	bct	Chitaverse	f	\N	2023-05-24	2023-05-24
2e11569e-453f-403e-b945-4941b795d1db	chitcat	chitcat	ChitCAT	f	\N	2023-05-24	2023-05-24
1ba98d50-1931-4c20-ab4d-9b40eafd0234	chives-coin	xcc	Chives Coin	f	\N	2023-05-24	2023-05-24
056e0aa5-9662-4807-8457-4da63f5eced7	choccyswap	ccy	ChoccySwap	f	\N	2023-05-24	2023-05-24
e1d5cb12-93e9-496d-be14-ab5e4f7c6236	chocolate-like-butterfly	clb	Chocolate Like Butterfly	f	\N	2023-05-24	2023-05-24
8c633f2e-ef5f-4466-a035-3ee6aa1fac39	choice-coin	choice	Choice Coin	f	\N	2023-05-24	2023-05-24
c6c92714-e961-48b0-9db4-34a93ca15a41	dehub	dhb	DeHub	f	\N	2023-05-24	2023-05-24
99a973ce-5394-40c2-9c1c-3d431f9696f9	choise	cho	Choise.com	f	\N	2023-05-24	2023-05-24
503e51a5-5ab0-4c1f-b788-4ca3b4ce4400	chonk	chonk	Chonk	f	\N	2023-05-24	2023-05-24
3f6f117c-41e5-4a6f-8e97-7dfbd105805e	chooky-inu	$choo	Chooky Inu	f	\N	2023-05-24	2023-05-24
61b1bd50-9947-4c52-beea-d7383964a7b9	chorusx	cx1	ChorusX	f	\N	2023-05-24	2023-05-24
9ba093b2-8657-4018-bb97-0142f5b676ac	christmas-floki	floc	Christmas Floki	f	\N	2023-05-24	2023-05-24
fc733663-3405-4e9d-99ff-0157953a2c63	christmas-shiba	xshib	Christmas Shiba	f	\N	2023-05-24	2023-05-24
030ae3b5-31f1-4048-811d-c9021e5167f5	chromaway	chr	Chromia	f	\N	2023-05-24	2023-05-24
5f6a03c0-6d4a-45f7-8071-9f12f8dd5285	chromium-dollar	cr	Chromium Dollar	f	\N	2023-05-24	2023-05-24
e633d328-e378-4faa-b736-3590b5623011	chronicle	xnl	Chronicle	f	\N	2023-05-24	2023-05-24
7fcc5b9e-ce47-46ea-896c-cfe52991eabb	chronicum	chro	Chronicum	f	\N	2023-05-24	2023-05-24
88b3981d-b979-4d26-a2c1-0e92a3250bba	chronobank	time	chrono.tech	f	\N	2023-05-24	2023-05-24
fb66578d-acec-4b27-b830-4af7c57902cd	chronos-finance	chr	Chronos Finance	f	\N	2023-05-24	2023-05-24
d4cf9f9d-d671-484c-a176-e9d172ad6264	chubbyakita	cakita	ChubbyAkita	f	\N	2023-05-24	2023-05-24
4256939c-2afc-4447-ab65-20532a5671bb	chumbai-valley	chmb	Chumbi Valley	f	\N	2023-05-24	2023-05-24
5f06496c-2bc0-49cb-994d-e917e98fb1c0	chunks	chunks	Chunks	f	\N	2023-05-24	2023-05-24
e0f41ffb-7eef-4dd7-9519-63c917c7d885	cia	cia	CIA	f	\N	2023-05-24	2023-05-24
eb380d17-2eaa-404d-a522-335a5f999b54	ciento-exchange	cnto	Ciento Exchange	f	\N	2023-05-24	2023-05-24
1191f0af-dac4-48f6-a225-6f2b05a70050	cigarette-token	cig	Cigarette	f	\N	2023-05-24	2023-05-24
10cfdc4b-51a4-4bf5-a2ec-29900f18f618	cindicator	cnd	Cindicator	f	\N	2023-05-24	2023-05-24
d25b15ff-2b25-4c23-b09d-14154880c9e8	cindrum	cind	Cindrum	f	\N	2023-05-24	2023-05-24
9491a966-5e8a-47f2-8ff5-142e52c89633	cinnamoon	cimo	Cinnamoon	f	\N	2023-05-24	2023-05-24
38c8b315-5efd-4fde-8aee-7693c5bfc92a	cino-games	cino	Cino Token	f	\N	2023-05-24	2023-05-24
aaad008e-ea49-434c-bff2-1b1acae72200	cipher-2	cpr	CIPHER	f	\N	2023-05-24	2023-05-24
2fbf13f7-969e-4890-a018-288e2ea33e14	circlepod	cpx	Circlepod	f	\N	2023-05-24	2023-05-24
649358c5-0cd0-4c36-a2b7-c7f831a3aa07	circleswap	cir	CircleSwap	f	\N	2023-05-24	2023-05-24
ca2d82c6-5a9f-472e-8aec-b7361795c713	circuits-of-value	coval	Circuits of Value	f	\N	2023-05-24	2023-05-24
b18fc178-ad2b-46aa-8d15-009d1c435337	cirquity	cirq	Cirquity	f	\N	2023-05-24	2023-05-24
40d975f3-c72e-401e-a4da-92ee6d5c4d06	cirus	cirus	Cirus	f	\N	2023-05-24	2023-05-24
66fb18fa-83df-4259-8a2a-611d0ab14fac	citadao	knight	CitaDAO	f	\N	2023-05-24	2023-05-24
ab7c9cda-caf7-4633-a3bf-bdf63bfc2aab	citadel	ctl	Citadel	f	\N	2023-05-24	2023-05-24
d0ce2457-c546-4928-b87c-50fec621a67a	citadel-one	xct	Citadel.one	f	\N	2023-05-24	2023-05-24
931d8fae-7d79-4491-8d6d-9091893e0020	citystates-medieval	csm	CityStates Medieval	f	\N	2023-05-24	2023-05-24
c01e495c-b6fc-46e9-a80c-ee1376907543	city-tycoon-games	ctg	City Tycoon Games	f	\N	2023-05-24	2023-05-24
3764a0f4-e718-4ecd-9c46-5a5c0fd77a09	civfund-stone	0ne	Civfund Stone	f	\N	2023-05-24	2023-05-24
9aa7e1f2-3dff-4ab5-b205-24c5e07e5537	civic	cvc	Civic	f	\N	2023-05-24	2023-05-24
16716d72-c130-4d3b-9c0c-bafc2080c525	civilization	civ	Civilization	f	\N	2023-05-24	2023-05-24
4638e376-2b93-4c15-aa37-252ae3700cf5	civilization-network	cvl	Civilization Network	f	\N	2023-05-24	2023-05-24
85ba8dff-b518-4548-b252-7efe487cca11	claimswap	cla	ClaimSwap	f	\N	2023-05-24	2023-05-24
d1749dbd-7acb-40df-8453-a1926b513d93	clams	clam	Clams	f	\N	2023-05-24	2023-05-24
1e8d0f87-2a8f-4bbd-93d3-df995b07fa03	clash-of-lilliput	col	Clash of Lilliput	f	\N	2023-05-24	2023-05-24
6c52a581-4362-41f0-ac32-14e70da33602	classicbitcoin	cbtc	ClassicBitcoin	f	\N	2023-05-24	2023-05-24
8e8e2b29-9a6a-4488-bee3-c32b1624123b	classzz	czz	ClassZZ	f	\N	2023-05-24	2023-05-24
63995898-a43d-4113-aaac-2415a705bea4	claw	claw	Claw [OLD]	f	\N	2023-05-24	2023-05-24
3bf5d897-9d52-40a5-a5ba-eeed6cabade9	claw-2	claw	Claw	f	\N	2023-05-24	2023-05-24
d7a887eb-787e-44c5-842e-daca2fcfb33b	clay-nation	clay	Clay Nation	f	\N	2023-05-24	2023-05-24
208f7365-1b9d-44ff-8d59-e2559b952589	claystack-staked-matic	csmatic	ClayStack Staked MATIC	f	\N	2023-05-24	2023-05-24
288a4ecc-5404-45b0-9ebf-526658c978dd	cleancarbon	carbo	CleanCarbon	f	\N	2023-05-24	2023-05-24
28e8b511-1be8-4fd4-a949-8ce22a67a424	clearcryptos	ccx	ClearCryptos	f	\N	2023-05-24	2023-05-24
530b0d79-1602-45d7-bd29-231d9dbef919	cleardao	clh	ClearDAO	f	\N	2023-05-24	2023-05-24
53f88484-d251-4ff2-8e9f-e1e9e9410e19	clearpoll	poll	ClearPoll	f	\N	2023-05-24	2023-05-24
870b5c1a-4242-4fe1-b724-f3164f7d8ba5	clearpool	cpool	Clearpool	f	\N	2023-05-24	2023-05-24
611262a2-f009-496b-88a5-90d1265fbc75	clear-water	$clear	Clear Water	f	\N	2023-05-24	2023-05-24
b882f8da-7e4e-444e-bf1f-877d926f09bf	clever-token	clev	CLever	f	\N	2023-05-24	2023-05-24
43d7624b-89bb-43bd-ab0b-f97df719e7bf	climb-token-finance	climb	Climb Token Finance	f	\N	2023-05-24	2023-05-24
172c432e-16cd-45a1-b9da-77a7fb1ebfed	clinq-gold-token	cgt	Clinq.Gold Token	f	\N	2023-05-24	2023-05-24
c1111995-c8e1-4315-8221-f9f1aa8218f9	clintex-cti	cti	ClinTex CTi	f	\N	2023-05-24	2023-05-24
b1744f59-e17d-4bf0-9ec2-220aedb16ca6	clips	clips	Clips	f	\N	2023-05-24	2023-05-24
4c0b04a7-afd8-4be8-a2a6-113c302a2940	cliq	ct	CLIQ	f	\N	2023-05-24	2023-05-24
ecdb1898-97fb-4742-bd61-75408d4e503f	cloakcoin	cloak	Cloakcoin	f	\N	2023-05-24	2023-05-24
4e03fd10-b9c7-4add-af30-8af377909e81	cloak-coin	cloak	Cloak Coin	f	\N	2023-05-24	2023-05-24
d56ce657-663e-41e8-aab0-4cc712601895	cloudbric	clbk	Cloudbric	f	\N	2023-05-24	2023-05-24
168e2ee6-ea9f-4454-8e82-990c179cdf84	cloudchat	cc	CloudChat	f	\N	2023-05-24	2023-05-24
5a49e5ef-1ef3-4cdd-b35d-aaf7ba4b0f3f	cloudname	cname	Cloudname	f	\N	2023-05-24	2023-05-24
f63580ff-6ae8-411b-aa2c-3c4cc16a4b32	cloud-pet	cpet	Cloud Pet	f	\N	2023-05-24	2023-05-24
dd3b7a19-e92a-4fce-b360-e51dfb2c3dd8	cloudtx	cloud	CloudTx	f	\N	2023-05-24	2023-05-24
bc086510-3271-431b-b8f5-3d27c2075133	cloutcontracts	ccs	CloutContracts	f	\N	2023-05-24	2023-05-24
16ceab88-a0f0-4b7f-9e72-b0dbebd17ffd	clover-finance	clv	Clover Finance	f	\N	2023-05-24	2023-05-24
e6ba3e6a-ba1c-4bda-aadb-8b0ad85aa39a	clown-pepe	honk	Clown Pepe	f	\N	2023-05-24	2023-05-24
6e3fde94-e9a1-4307-a1a5-af7ec7ee31c7	club-atletico-independiente	cai	Club Atletico Independiente Fan Token	f	\N	2023-05-24	2023-05-24
64d6885c-6bfa-4bcf-a4ef-0f64e88973b9	clube-atletico-mineiro-fan-token	galo	Clube Atlético Mineiro Fan Token	f	\N	2023-05-24	2023-05-24
1fabd56c-6f5d-4fa2-947e-df22758ff0b7	clubrare-empower	mpwr	Empower	f	\N	2023-05-24	2023-05-24
dce58aba-52d2-4634-a5cd-849ebb741437	club-santos-laguna-fan-token	san	Club Santos Laguna Fan Token	f	\N	2023-05-24	2023-05-24
a678df89-244b-49f2-b375-f09aa8eedb6b	clucoin	clu	CluCoin	f	\N	2023-05-24	2023-05-24
8456fd94-ca53-45b3-9336-ce3173ca3940	cmc-coin	cmcc	CMC Coin	f	\N	2023-05-24	2023-05-24
ada53c17-93c4-4a54-8d0a-a5f59b91e7f6	cncl	cncl	The Ordinals Council	f	\N	2023-05-24	2023-05-24
7315dc16-a831-4297-b087-4aacad428ed1	cneta	cneta	cNETA	f	\N	2023-05-24	2023-05-24
172997d5-d7a2-4238-9e93-15537a5d422e	cng-casino	cng	CNG Casino	f	\N	2023-05-24	2023-05-24
71d339a1-a878-42ae-816c-ae4b474e217c	cnh-tether	cnht	CNH Tether	f	\N	2023-05-24	2023-05-24
f11d4676-fa03-4427-bb23-5c6f6455c415	cnns	cnns	CNNS	f	\N	2023-05-24	2023-05-24
f59055d7-a2f0-4b2f-ad6f-6cedfa5a043a	coalculus	coal	Coalculus	f	\N	2023-05-24	2023-05-24
8f212b0d-0d53-4396-85b3-01e9bc4826fe	cobak-token	cbk	Cobak	f	\N	2023-05-24	2023-05-24
271a93ce-bdce-4021-893b-04c62b624f42	coban	coban	COBAN	f	\N	2023-05-24	2023-05-24
d52b8ab9-8e2c-44fa-b7e8-4bca3dfc281a	cockapoo	cpoo	Cockapoo	f	\N	2023-05-24	2023-05-24
e454b58d-fc26-4ae8-85d9-867c6b067bcf	cocktailbar	coc	cocktailbar.finance	f	\N	2023-05-24	2023-05-24
f3a726c9-d1b8-475e-bb95-cc204e6d9a04	cocos-bcx	cocos	COCOS BCX	f	\N	2023-05-24	2023-05-24
ae7a7a76-25b2-4e87-bae7-992acb22163a	codex	cdex	Codex	f	\N	2023-05-24	2023-05-24
769642be-6b67-4c77-bbc4-8958effc2b2b	coffin-finance	coffin	Coffin Finance	f	\N	2023-05-24	2023-05-24
4cbc7025-8412-4398-9033-3f01c502b030	cofix	cofi	CoFiX	f	\N	2023-05-24	2023-05-24
442db96d-186f-461a-b9a0-60760838c41a	cogecoin	coge	Cogecoin	f	\N	2023-05-24	2023-05-24
d5874e28-6e7e-4a76-aa34-a514aa7502df	cogent-sol	cgntsol	Cogent SOL	f	\N	2023-05-24	2023-05-24
f2b5bb9f-bacd-44e5-a19b-7d43c13526a5	cogiverse	cogi	9D NFT	f	\N	2023-05-24	2023-05-24
545afcb8-fa12-4104-96f2-4a7744e6a8f2	coin98	c98	Coin98	f	\N	2023-05-24	2023-05-24
5af99e95-a799-4e8a-98bd-55d84836a70e	coin98-dollar	cusd	Coin98 Dollar	f	\N	2023-05-24	2023-05-24
7acf54f1-006a-4412-87a5-e57c2f6799da	coinalpha	alp	CoinAlpha	f	\N	2023-05-24	2023-05-24
06316da0-45b3-4548-bd9d-3219876aa858	coin-artist	coin	Coin Artist	f	\N	2023-05-24	2023-05-24
242ee3b3-7ec7-4aa9-ad0d-97abc7aa34f7	coinary-token	cyt	Coinary	f	\N	2023-05-24	2023-05-24
787785e4-89f1-47e8-bda1-41fbd0f6f785	coinbase-tokenized-stock-defichain	dcoin	Coinbase Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
a23197e9-283c-457f-b992-8b30263658c8	coinbase-wrapped-staked-eth	cbeth	Coinbase Wrapped Staked ETH	f	\N	2023-05-24	2023-05-24
766c7ec5-fd20-4f97-af5a-6fecd74491a6	coinbet-finance	cfi	Coinbet Finance	f	\N	2023-05-24	2023-05-24
60f26fd6-9e28-4257-8975-27b9a3385c6b	coin-capsule	caps	Ternoa	f	\N	2023-05-24	2023-05-24
8fd4a616-e5df-4d48-a679-753bbec32ed5	coinclaim	clm	CoinClaim	f	\N	2023-05-24	2023-05-24
3b6972ab-e7e7-48d8-8984-69702c81c8f9	coindom	scc	Stem Cell Coin	f	\N	2023-05-24	2023-05-24
292798d2-f421-4bc0-b040-328bde86c96b	coin-edelweis	edel	Coin Edelweis	f	\N	2023-05-24	2023-05-24
a191e41b-812f-4cf7-8a5c-724c36388da7	coinerr	err	Coinerr	f	\N	2023-05-24	2023-05-24
65a06630-dcd3-461c-9686-c5ba2f275e56	coinex-token	cet	CoinEx	f	\N	2023-05-24	2023-05-24
61552d9e-ef81-4181-b669-8020aaa54684	coinfi	cofi	CoinFi	f	\N	2023-05-24	2023-05-24
40eb86b8-0e59-46d3-9b3b-015e19464781	coinfirm-amlt	amlt	AMLT Network	f	\N	2023-05-24	2023-05-24
dfeced8d-ba5f-4911-befc-aeb8a644b77d	coinflect	wcflt	Coinflect	f	\N	2023-05-24	2023-05-24
52cde2ea-1b9f-4990-8cef-af289b8c0365	coinhound	cnd	Coinhound	f	\N	2023-05-24	2023-05-24
9630628b-e94b-4173-baf3-209c52fc79c6	coinhub	chb	COINHUB	f	\N	2023-05-24	2023-05-24
476a0d57-15ce-4637-b2e7-3fca28602fd0	coinloan	clt	CoinLoan	f	\N	2023-05-24	2023-05-24
ad53f306-5aa9-4190-8eb3-3fff5ae9b285	coinlocally	clyc	Coinlocally	f	\N	2023-05-24	2023-05-24
2c7438e0-a351-4409-b161-b6135eaacd30	coinmatch-ai	cmai	CoinMatch AI	f	\N	2023-05-24	2023-05-24
3ac97309-c834-492c-a54e-6834ab05b65f	coinmerge-os	cmos	CoinMerge OS	f	\N	2023-05-24	2023-05-24
77a3df3d-8c2d-45cb-ac11-4a74b9542d29	coinmetro	xcm	Coinmetro	f	\N	2023-05-24	2023-05-24
d1e31a15-05ed-48d8-9a8c-98919b63c778	coinmooner	mooner	CoinMooner	f	\N	2023-05-24	2023-05-24
0af378f3-d6eb-4787-a67b-707fbff0bf1d	coin-of-nature	con	Coin of Nature	f	\N	2023-05-24	2023-05-24
416224a1-ea3f-4085-84af-6c632972d5ee	coin-of-the-champions	coc	Coin of the champions	f	\N	2023-05-24	2023-05-24
467e5302-b0b4-46c0-ad15-edb3ffc635d8	coinpoker	chp	CoinPoker	f	\N	2023-05-24	2023-05-24
3444ab7a-d35f-4594-856d-4a65bcf2f69c	coinracer	crace	Coinracer	f	\N	2023-05-24	2023-05-24
fb948fbe-2ca8-41a6-9fb4-d04a33e3f281	coinradr	radr	CoinRadr	f	\N	2023-05-24	2023-05-24
3a98644b-9e56-4ec2-9d05-b75d3aabc3b1	coinsale-token	coinsale	CoinSale Token	f	\N	2023-05-24	2023-05-24
eb27b338-4345-48aa-9755-40d549ea31ea	coinsbit-token	cnb	Coinsbit Token	f	\N	2023-05-24	2023-05-24
b4d844cf-53a6-4259-85b6-b24bb0bf8bd1	coinscan	scan	CoinScan	f	\N	2023-05-24	2023-05-24
45f11694-97ea-4fff-9b0f-4d423a72537c	coinscope	coinscope	Coinscope	f	\N	2023-05-24	2023-05-24
327cbcb6-b228-4ec8-b0ef-73aadbef3033	coinspaid	cpd	CoinsPaid	f	\N	2023-05-24	2023-05-24
895cae79-59cd-4034-a93f-0dd2622ecc99	coinstox	csx	Coinstox	f	\N	2023-05-24	2023-05-24
a4785839-c317-4f2e-85a1-b2f2bfb9ecfa	coinwealth	cnw	CoinWealth	f	\N	2023-05-24	2023-05-24
9672a8c5-341d-400f-8a9c-559dd819121c	coinweb	cweb	Coinweb	f	\N	2023-05-24	2023-05-24
aaca5533-a73e-497c-be52-487b9aecdc56	coinwind	cow	CoinWind	f	\N	2023-05-24	2023-05-24
721494be-bf31-4ebd-8816-39a8763633be	coinxpad	cxpad	CoinxPad	f	\N	2023-05-24	2023-05-24
5fee48b1-5069-4476-988d-152aa4d06fff	coinzix-token	zix	Coinzix Token	f	\N	2023-05-24	2023-05-24
e229db05-6adb-4656-a481-3a88ea630ee0	coldstack	cls	Coldstack	f	\N	2023-05-24	2023-05-24
dfcdf954-8f50-4837-8330-2d2fa376d1aa	colizeum	zeum	Colizeum	f	\N	2023-05-24	2023-05-24
a9b428ad-7d6e-4c10-a2ab-cafc39c14f8b	collab-land	collab	Collab.Land	f	\N	2023-05-24	2023-05-24
20c2d3c3-255d-40dd-83d2-cbeb17b12109	collar	collar	Collar	f	\N	2023-05-24	2023-05-24
128f8182-2521-483d-8902-affb57c0609a	collarswap	collar	CollarSwap	f	\N	2023-05-24	2023-05-24
b53693e9-659d-41eb-bb76-cb05dd93cf72	collateral-network	colt	Collateral Network	f	\N	2023-05-24	2023-05-24
a518eff3-da45-4b8b-9131-2f66bcd17e16	collateral-pay	coll	Collateral Pay	f	\N	2023-05-24	2023-05-24
7a623784-d18c-4fbb-9a93-48ce1e68151e	collectcoin-2	clct	CollectCoin	f	\N	2023-05-24	2023-05-24
2c54874a-0df4-4cae-874b-2f1cf387c222	collector-coin	ags	Collector Coin	f	\N	2023-05-24	2023-05-24
009e01ce-20a4-446d-bb0f-c75917ee64ae	collie-inu	collie	COLLIE INU	f	\N	2023-05-24	2023-05-24
51f6beea-5caa-40e3-bf47-13715a04d325	colony	cly	Colony	f	\N	2023-05-24	2023-05-24
15f6e097-b1cb-4f69-9a9e-6060548dd293	colony-avalanche-index	cai	Colony Avalanche Index	f	\N	2023-05-24	2023-05-24
936c8b30-2fd1-4356-9077-c96c2498d348	colony-network-token	clny	Colony Network	f	\N	2023-05-24	2023-05-24
23f21d55-7586-41a7-aa2c-1ec4ceea0989	colossuscoinxt	colx	ColossusXT	f	\N	2023-05-24	2023-05-24
77f8614c-a1cf-4877-8ab9-068e151e19b6	colr-coin	$colr	colR Coin	f	\N	2023-05-24	2023-05-24
8a70c7f8-013e-4430-8648-511b02afa356	comb-finance	comb	Comb Finance	f	\N	2023-05-24	2023-05-24
4e49ee36-b315-426d-8949-ea865e5bfb9a	comdex	cmdx	COMDEX	f	\N	2023-05-24	2023-05-24
b227f383-937e-4301-a65b-0f29418f92ae	communique	cmq	Communique	f	\N	2023-05-24	2023-05-24
1fded99c-f6a8-4e9c-805e-6007c95a495c	communis	com	Communis	f	\N	2023-05-24	2023-05-24
74b4aad4-57d8-4e86-aa1d-470b839da90b	community-business-token	cbt	Community Business Token	f	\N	2023-05-24	2023-05-24
b5ffe781-2dc5-4bd8-b7f2-df7fe55ea0bf	communitytoken	ct	Cojam	f	\N	2023-05-24	2023-05-24
98953196-8b67-4069-8bb0-fae0eb604c37	compendium-fi	cmfi	Compendium	f	\N	2023-05-24	2023-05-24
d5274e9f-9ae0-4aa5-8faf-9d7d5e490ad5	composite	cmst	Composite	f	\N	2023-05-24	2023-05-24
2e1964f6-7cac-4202-85e7-8712e60a06f8	compound-0x	czrx	c0x	f	\N	2023-05-24	2023-05-24
44e080b8-54c6-4c2d-890c-51e14107f367	compound-basic-attention-token	cbat	cBAT	f	\N	2023-05-24	2023-05-24
84777f8f-4bb9-4d9f-ae1c-62e883bc4174	compound-chainlink-token	clink	cLINK	f	\N	2023-05-24	2023-05-24
040e8587-be7e-418e-9f15-04cf984c8bbe	compound-coin	comp	Compound Coin	f	\N	2023-05-24	2023-05-24
ed31a546-bee8-4df5-9435-f4ef7bc004c8	compounded-marinated-umami	cmumami	Compounded Marinated UMAMI	f	\N	2023-05-24	2023-05-24
f6cb4cce-15a0-4637-8ace-5007ef36c3ca	compound-ether	ceth	cETH	f	\N	2023-05-24	2023-05-24
5eee1197-39ae-46b4-8208-29010e348c8e	compound-governance-token	comp	Compound	f	\N	2023-05-24	2023-05-24
8026e6a6-4c21-4bac-9285-7ee9cd88242f	compound-maker	cmkr	cMKR	f	\N	2023-05-24	2023-05-24
d860415e-d889-46fa-a50f-0447ca40c9f5	compound-meta	coma	Compound Meta	f	\N	2023-05-24	2023-05-24
87d7acbd-41ec-4ffe-bb25-e640b44b9ec2	compound-sushi	csushi	cSUSHI	f	\N	2023-05-24	2023-05-24
9534cad8-f412-43ac-ad36-06cb5b911835	compound-uniswap	cuni	cUNI	f	\N	2023-05-24	2023-05-24
7c3ec46b-645c-453d-91f1-0ba2f361d754	compound-usd-coin	cusdc	cUSDC	f	\N	2023-05-24	2023-05-24
b86a2a80-bb50-452f-b1f2-17d44b90f129	compound-usdt	cusdt	cUSDT	f	\N	2023-05-24	2023-05-24
72c526b7-573d-42e8-ae78-96be733568f6	compound-wrapped-btc	cwbtc	cWBTC	f	\N	2023-05-24	2023-05-24
1449eeb5-e579-404b-8b7b-9cc9cff604ef	compound-yearn-finance	cyfi	cYFI	f	\N	2023-05-24	2023-05-24
989f471c-0dd0-4120-860f-b6da322c547a	comp-yvault	yvcomp	COMP yVault	f	\N	2023-05-24	2023-05-24
df717c9d-9b72-4080-8573-2862dc594c60	comsa	cms	COMSA	f	\N	2023-05-24	2023-05-24
89b9b70d-a5c6-4962-a055-192f5d6dfc6c	comtech-gold	cgo	Comtech Gold	f	\N	2023-05-24	2023-05-24
0d1217a6-e19a-4cc3-9336-ab43dd877737	concave	cnv	Concave	f	\N	2023-05-24	2023-05-24
ce22816a-0b00-4ec7-a084-be1ed86b6531	conceal	ccx	Conceal	f	\N	2023-05-24	2023-05-24
13db90fd-699e-4e8e-bcdf-7e6bbb396baf	concentrated-voting-power	cvp	PowerPool Concentrated Voting Power	f	\N	2023-05-24	2023-05-24
8ecd6609-f2f2-4f04-bcbe-ba465b46aa9e	concentrator	ctr	Concentrator	f	\N	2023-05-24	2023-05-24
e4ee1a42-af6b-4219-917b-a378176e8352	concertvr	cvt	concertVR	f	\N	2023-05-24	2023-05-24
fcc86a95-d58b-45ee-a016-8624764a9fb2	concierge-io	ava	Travala.com	f	\N	2023-05-24	2023-05-24
81f47bf5-f992-4845-96d9-5c986a310709	concordium	ccd	Concordium	f	\N	2023-05-24	2023-05-24
fce9351e-9c0b-4434-b629-658b4f2e3f12	conflux-token	cfx	Conflux	f	\N	2023-05-24	2023-05-24
c839d7e6-8bc5-472a-877e-9be5fedc0fc9	conic-finance	cnc	Conic	f	\N	2023-05-24	2023-05-24
4e6464d6-ebcf-4c5b-9d33-543096e3e9f5	coniun	coni	Coniun	f	\N	2023-05-24	2023-05-24
0ca548a9-f70d-404c-bb51-9ce2c460185e	connect-financial	cnfi	Connect Financial	f	\N	2023-05-24	2023-05-24
75edd803-c71d-462d-b701-06947a8a1eed	connectico	con	Connectico	f	\N	2023-05-24	2023-05-24
14ce5547-a871-4249-beb0-72fe7de865ea	connectome	cntm	Connectome	f	\N	2023-05-24	2023-05-24
c0d4def9-e01a-4cd8-aa54-639517212c11	connect-token	cnt	Connect Stela	f	\N	2023-05-24	2023-05-24
e7205b8a-73c8-4462-b7b4-523ada5f79de	constellation-labs	dag	Constellation	f	\N	2023-05-24	2023-05-24
4885b052-0b64-4720-bfac-d9fe882ff8d0	constitutiondao	people	ConstitutionDAO	f	\N	2023-05-24	2023-05-24
19971abb-e8df-41b4-887a-5c6658bbf3e1	constitutiondao-wormhole	people	ConstitutionDAO (Wormhole)	f	\N	2023-05-24	2023-05-24
3d96e182-36f7-4b5e-940d-ee53dcc01aaa	contentbox	box	ContentBox	f	\N	2023-05-24	2023-05-24
9ced61c0-f1e4-4c7b-84bf-390d70736b08	contentos	cos	Contentos	f	\N	2023-05-24	2023-05-24
4306edec-0f41-46c4-bd05-7ed9acd6faf8	contents-shopper-token	cst	Contents Shopper Token	f	\N	2023-05-24	2023-05-24
8e8bacc4-b8b1-440b-bb49-5425bbac3a93	content-value-network	cvnt	Conscious Value Network	f	\N	2023-05-24	2023-05-24
0c306c09-67a6-4178-8b32-9fdeb4a7fd60	continuum-finance	ctn	Continuum Finance	f	\N	2023-05-24	2023-05-24
32406cb3-dfb9-4d38-b006-60ea05502a48	continuum-world	um	Continuum World	f	\N	2023-05-24	2023-05-24
8c9ab65d-b863-43a3-83e6-a2f0af056e98	contracoin	ctcn	Contracoin	f	\N	2023-05-24	2023-05-24
47f5ba3a-7cf3-4b04-95b4-18a5783f6861	conun	con	CONUN	f	\N	2023-05-24	2023-05-24
ab944e0d-8020-47c8-bf11-0fa313bc02a9	convergence	conv	Convergence	f	\N	2023-05-24	2023-05-24
2725bee6-a1f2-4911-b1f5-b3c27199575c	converter-finance	con	Converter Finance	f	\N	2023-05-24	2023-05-24
8fa4265a-cae7-4556-b1c2-9bc8d708a4db	convex-crv	cvxcrv	Convex CRV	f	\N	2023-05-24	2023-05-24
11c52f1d-2f9d-47b1-bdaf-f5b41119f013	convex-finance	cvx	Convex Finance	f	\N	2023-05-24	2023-05-24
ee68d082-cb7f-4f85-b091-fdd37c2803a8	convex-fpis	cvxfpis	Convex FPIS	f	\N	2023-05-24	2023-05-24
820409c3-925f-458b-86b6-3af035b5e3e5	convex-fxs	cvxfxs	Convex FXS	f	\N	2023-05-24	2023-05-24
c9d08e7c-e7f0-4636-903e-2a0851e50538	cook	cook	Cook	f	\N	2023-05-24	2023-05-24
f147824b-fb9d-40ef-bee8-50c5903191a4	cookiesale	cookie	CookieSale	f	\N	2023-05-24	2023-05-24
1d5a0e3b-52a1-4e03-a8f6-5788614aff69	cookies-protocol	cp	Cookies Protocol	f	\N	2023-05-24	2023-05-24
db984739-28db-486d-a776-c82417693747	coolmining	cooha	CoolMining	f	\N	2023-05-24	2023-05-24
836c1be9-caaf-4529-b63e-94a3bd818c3b	cool-vault-nftx	cool	COOL Vault (NFTX)	f	\N	2023-05-24	2023-05-24
6c77cc03-dd20-46f0-b1cc-28b6ca1fb186	cope	cope	Cope	f	\N	2023-05-24	2023-05-24
faf7d7af-71af-463c-82ad-94d3ef3fe76a	cope-coin	cope	Cope Coin	f	\N	2023-05-24	2023-05-24
c9628b17-f6ad-43e2-8982-1e056c6f01d4	cope-token	cope	Cope Token	f	\N	2023-05-24	2023-05-24
c2b4e493-7288-48c6-ac63-cf32dcc99d37	copiosa	cop	Copiosa	f	\N	2023-05-24	2023-05-24
0f1dee8d-f263-4291-aa07-051098204654	copium	$copium	Copium	f	\N	2023-05-24	2023-05-24
85cf0fb7-b52c-4961-b4da-2072b6a23a2f	copycat-finance	copycat	Copycat Finance	f	\N	2023-05-24	2023-05-24
5893e3b3-5836-427c-9a9a-b430a856bbb4	coral-swap	coral	Coral Swap	f	\N	2023-05-24	2023-05-24
418a6228-64b0-4cf4-b60b-0d83bdbfad68	core	cmcx	CORE MultiChain	f	\N	2023-05-24	2023-05-24
aa696d32-7533-4f42-960c-0c6b83c88a8a	coredao	coredao	coreDAO	f	\N	2023-05-24	2023-05-24
f357d1aa-8e8d-4351-aedf-b9c3805d56a9	coredaoorg	core	Core	f	\N	2023-05-24	2023-05-24
26da37a1-67bf-4113-b58a-72d08f0c3b66	coredaoswap	cdao	CoreDaoSwap	f	\N	2023-05-24	2023-05-24
0feedfb3-3df3-4264-8e0b-10ea6b3025c1	core-id	cid	CORE ID	f	\N	2023-05-24	2023-05-24
07a6c40c-a24b-4555-bab9-0fecbce83e83	corestarter	cstr	CoreStarter	f	\N	2023-05-24	2023-05-24
e87951e2-8eb0-48da-aba3-ce35e7031e0d	coreto	cor	COR Token	f	\N	2023-05-24	2023-05-24
b029ae65-868a-4382-8da7-3579155935f5	coreum	core	Coreum	f	\N	2023-05-24	2023-05-24
5315e563-9ea6-4570-802a-7414f519728b	corgi-ceo	corgiceo	CORGI CEO	f	\N	2023-05-24	2023-05-24
ed56deb3-6ad5-4775-a3b3-d461186bc0e7	corgicoin	corgi	CorgiCoin	f	\N	2023-05-24	2023-05-24
a40daba3-dc0c-4096-943a-de00622ea7b4	corgidoge	corgi	Corgidoge	f	\N	2023-05-24	2023-05-24
9578e1f3-ec31-44ff-b739-e9a3dc8ac3ae	corionx	corx	CorionX	f	\N	2023-05-24	2023-05-24
2c529580-9435-4fb5-9a1c-00e9e30b9298	corite	co	Corite	f	\N	2023-05-24	2023-05-24
08312b89-0c2b-434b-8a1c-1586ca39045b	coritiba-f-c-fan-token	crtb	Coritiba F.C. Fan Token	f	\N	2023-05-24	2023-05-24
f47beb77-e076-4800-b684-0662d38f2b9e	corn	corn	CORN	f	\N	2023-05-24	2023-05-24
33508c1a-568a-4639-a13d-a75dbaeeda52	cornatto	cnc	Cornatto	f	\N	2023-05-24	2023-05-24
c6234514-0ec6-4fd5-960f-4a4c153134d1	cornucopias	copi	Cornucopias	f	\N	2023-05-24	2023-05-24
c04f8704-01a3-4067-a019-2f2d50af8c7a	cortex	ctxc	Cortex	f	\N	2023-05-24	2023-05-24
096d1c08-d303-41c5-99a9-9bbde83a82db	cortexdao	cxd	CortexDAO	f	\N	2023-05-24	2023-05-24
3df3a723-a7ab-4117-b0c2-cce618017467	cosanta	cosa	Cosanta	f	\N	2023-05-24	2023-05-24
d8974631-4b5e-4ae0-a3db-25c7a8526f15	coshi-inu	coshi	CoShi Inu	f	\N	2023-05-24	2023-05-24
5486a27c-4035-4d4a-bfc3-da1a57988ec4	cosmic-chain	cosmic	Cosmic Chain	f	\N	2023-05-24	2023-05-24
ec6f6b27-9b46-407a-b6a3-b91948b0c3f0	cosmic-champs	cosg	Cosmic Champs	f	\N	2023-05-24	2023-05-24
a0962f28-b64b-4da8-a063-c70c9887ae26	cosmic-fomo	cosmic	Cosmic FOMO	f	\N	2023-05-24	2023-05-24
b5547679-f11a-46a5-82c5-00f4f985cd32	cosmicswap	cosmic	CosmicSwap	f	\N	2023-05-24	2023-05-24
b221ca91-4c16-43db-baff-d9ee2089beb9	cosmic-universe-magic-token	magic	Cosmic Universe Magic	f	\N	2023-05-24	2023-05-24
9bbf6dfd-8db4-4480-824d-ac2c5c48634f	cosmos	atom	Cosmos Hub	f	\N	2023-05-24	2023-05-24
c951478f-ed3e-4677-ba06-0864646380d1	cosplay-token-2	cot	Cosplay Token	f	\N	2023-05-24	2023-05-24
11a56285-9256-434b-bfb7-86b2cc69432a	coti	coti	COTI	f	\N	2023-05-24	2023-05-24
a94b8810-75ea-4112-ae35-062146027d76	cotrader	cot	CoTrader	f	\N	2023-05-24	2023-05-24
36f05244-f309-4f67-b6f2-4f1f7eb3407d	cougar-token	cgs	CougarSwap	f	\N	2023-05-24	2023-05-24
2e15b008-54a0-4eab-b421-075249191f42	counosx	ccxx	CounosX	f	\N	2023-05-24	2023-05-24
f1f4d6c7-ef5c-4aeb-bedf-08312969fc05	counterparty	xcp	Counterparty	f	\N	2023-05-24	2023-05-24
25e4a251-9699-407c-867f-f1778af868e7	couponbay	cup	CouponBay	f	\N	2023-05-24	2023-05-24
6bda6b1e-ece9-4d30-afd4-e0923771c554	covalent	cqt	Covalent	f	\N	2023-05-24	2023-05-24
c83b4d75-bd8a-4857-81d0-242f36da4156	covalent-cova	cova	Cova Unity	f	\N	2023-05-24	2023-05-24
0df964b8-00a1-428d-bd7d-dab2484f88e6	covenant-child	covn	Covenant	f	\N	2023-05-24	2023-05-24
f8779c35-82d0-49a4-9945-d02d96f0065d	covercompared	cvr	CoverCompared	f	\N	2023-05-24	2023-05-24
25287900-04dc-4e33-8145-820da94f5e44	cover-protocol	cover	Cover Protocol	f	\N	2023-05-24	2023-05-24
d0f41c2b-ae3f-4013-97f7-ff8ea0a797bc	covesting	cov	Covesting	f	\N	2023-05-24	2023-05-24
9129b629-d498-414f-bac2-8cd210439703	covicoin	cvc	CoviCoin	f	\N	2023-05-24	2023-05-24
dbb44ecb-4175-4a24-82a4-60c80dd8687f	cowboy-snake	cows	Cowboy Snake	f	\N	2023-05-24	2023-05-24
6c535539-beec-4aff-bffd-c41b5276a9b1	cow-protocol	cow	CoW Protocol	f	\N	2023-05-24	2023-05-24
89938777-dc42-4050-b175-0603230b970c	cowrie	cowrie	Cowrie	f	\N	2023-05-24	2023-05-24
23ff7285-6b43-4351-9212-15158eece317	cpchain	cpc	CPChain	f	\N	2023-05-24	2023-05-24
02d5f761-b3d7-4d1f-88a7-4e0a37f16a86	cpos-cloud-payment	cpos	CPOS Cloud Payment	f	\N	2023-05-24	2023-05-24
f894995f-71af-484e-a819-b99896960a27	cpucoin	cpu	CPUcoin	f	\N	2023-05-24	2023-05-24
18c56a38-51a4-4335-8082-a0fbf2359b0c	crabada	cra	Crabada	f	\N	2023-05-24	2023-05-24
3ebe1a16-ebde-42e7-8192-e2541de7fba6	crab-market	crab	Crab Market	f	\N	2023-05-24	2023-05-24
96e72ee9-a954-4f8f-b098-b4cc6b10d52c	cracle	cra	Cracle	f	\N	2023-05-24	2023-05-24
258410ff-67f2-46c6-9179-b35358b89ae9	cradle-of-sins	cos	Cradle of Sins	f	\N	2023-05-24	2023-05-24
64625e04-4bf3-482a-9fc4-25e42c68b967	crafting-finance	crf	Crafting Finance	f	\N	2023-05-24	2023-05-24
8f1f6376-34b1-48c9-97c6-01398d417a1b	cramer-coin	$cramer	Cramer Coin	f	\N	2023-05-24	2023-05-24
4bf5b9a4-4f98-4951-9b9b-eed2befbc317	cranx-chain	granx	GranX Chain	f	\N	2023-05-24	2023-05-24
820d2b4d-1578-46f6-8f3f-6719ae319e9c	cratos	crts	Cratos	f	\N	2023-05-24	2023-05-24
ff733215-ece3-4f9f-a089-50ad2092d65e	crave	crave	Crave	f	\N	2023-05-24	2023-05-24
65b8febd-06e3-4f2c-ad1d-6b4f8f76ec44	crazy-bunny	crazybunny	Crazy Bunny	f	\N	2023-05-24	2023-05-24
b214f187-5c62-4749-b54b-6de581d77e32	crazy-bunny-equity-token	cbunny	Crazy Bunny Equity	f	\N	2023-05-24	2023-05-24
a85be254-1ac2-4678-aae8-588e4afaa1b7	crazy-internet-coin	cic	Crazy Internet Coin	f	\N	2023-05-24	2023-05-24
ddfa56f9-0938-43f0-90c9-45e063510cd7	crazyminer	pwr	CrazyMiner	f	\N	2023-05-24	2023-05-24
1fcc2e02-47e4-4a99-9901-047daaca54dc	crazy-tiger	crazytiger	Crazy Tiger	f	\N	2023-05-24	2023-05-24
93d2e848-6deb-4618-af0e-18cd998f2e89	crb-coin	crb	CRB Coin	f	\N	2023-05-24	2023-05-24
e3e76ed5-bc9f-4918-bac9-03623eea3348	cre8r-dao	cre8r	CRE8R DAO	f	\N	2023-05-24	2023-05-24
8dc9f16c-9b80-4c9f-bbbc-ebea079d50f5	cream	crm	Creamcoin	f	\N	2023-05-24	2023-05-24
3722210a-7a63-4317-9010-901531a7ef11	cream-2	cream	Cream	f	\N	2023-05-24	2023-05-24
94e45b1a-4a20-495c-be78-afa91ccc8fb6	cream-eth2	creth2	Cream ETH 2	f	\N	2023-05-24	2023-05-24
d329f5b8-55bb-4074-9050-c4cb75098d97	creamlands	cream	Creamlands	f	\N	2023-05-24	2023-05-24
ce8696fc-cb55-4bb1-9440-25b10c3baef0	creamy	creamy	Creamy	f	\N	2023-05-24	2023-05-24
b676273f-f60e-47aa-b053-92db715478d8	create	ct	Create	f	\N	2023-05-24	2023-05-24
483a2083-0af8-4d13-8b5b-d054efad7d35	creaticles	cre8	Creaticles	f	\N	2023-05-24	2023-05-24
999af8b3-65f0-4128-9b06-4581e5390f93	creator-platform	ctr	Creator Platform	f	\N	2023-05-24	2023-05-24
adbec30a-1c59-4216-be31-dd210b494eee	creda	creda	CreDA	f	\N	2023-05-24	2023-05-24
17133aed-5703-4c97-a493-d05d5ceb23ca	cred-coin-pay	cred	CRED COIN PAY	f	\N	2023-05-24	2023-05-24
56e9b195-597c-48bd-89ad-721ebe2455cc	credefi	credi	Credefi	f	\N	2023-05-24	2023-05-24
ccb2308f-7033-4e75-afa3-e6c6414c5095	credit	credit	Credit	f	\N	2023-05-24	2023-05-24
81d8b3a8-0a10-45e7-be8e-a71a530f5c3e	credit-2	credit	PROXI DeFi	f	\N	2023-05-24	2023-05-24
4b058544-07e7-447c-a21c-8227ecc7da6e	creditcoin-2	ctc	Creditcoin	f	\N	2023-05-24	2023-05-24
2849a3b5-011c-412e-9c2e-69268329304d	credits	cs	CREDITS	f	\N	2023-05-24	2023-05-24
28ea2608-bf3a-43af-acfa-eb3e0652bc7c	creditum	credit	Creditum	f	\N	2023-05-24	2023-05-24
cb7765ae-e4b4-45c5-a82c-74f29a6d6d76	creds	creds	Creds	f	\N	2023-05-24	2023-05-24
aadc48f0-f737-4532-980f-cb5951229c8b	cremation-coin	cremat	Cremation Coin	f	\N	2023-05-24	2023-05-24
0b88540e-7155-4fca-9f22-78ae9bb311fc	creo-engine	creo	Creo Engine	f	\N	2023-05-24	2023-05-24
055554f8-ff37-492f-abf3-3fb6f8b997ea	crescent-network	cre	Crescent Network	f	\N	2023-05-24	2023-05-24
19828915-1007-4d31-824f-563de94a231d	cresio	xcre	Cresio	f	\N	2023-05-24	2023-05-24
e8b92820-ed34-4810-b43a-fdd7703e0bda	creta-world	creta	Creta World	f	\N	2023-05-24	2023-05-24
893c978d-ac4d-4b21-8436-4d11358bfd49	cri3x	cri3x	Cri3x	f	\N	2023-05-24	2023-05-24
b2f3d07f-9416-43fa-8b29-bec93e14c721	cricket-foundation	cric	Cricket Foundation	f	\N	2023-05-24	2023-05-24
c717d00c-a17d-471a-ae14-36bd0c07bbc2	cricket-star-manager	csm	Cricket Star Manager	f	\N	2023-05-24	2023-05-24
10943577-247f-4280-b2d7-b3d664a14de9	crime-gold	crime	Crime Gold	f	\N	2023-05-24	2023-05-24
d4bf967b-fdc0-4de6-a2be-b97c530ffcb1	crimson-network	crimson	Crimson Network	f	\N	2023-05-24	2023-05-24
387e2b20-5263-4128-89b1-b93e86817802	cripco	ip3	Cripco	f	\N	2023-05-24	2023-05-24
0010c84e-1a11-4347-8730-688c5303d779	criptoville-coins-2	cvlc2	CriptoVille Coins 2	f	\N	2023-05-24	2023-05-24
c8909ea1-e26c-4397-9982-5b160b92b9f4	crir-msh	msh	CRIR MSH	f	\N	2023-05-24	2023-05-24
ea6eb604-325c-43ee-a497-f77fbd434826	croatian-ff-fan-token	vatreni	Croatian FF Fan Token	f	\N	2023-05-24	2023-05-24
59167f3c-249f-46cd-8ebc-b14661b44df1	crodex	crx	Crodex	f	\N	2023-05-24	2023-05-24
85fff12d-ee7d-492a-9575-0026a8e424c1	crogecoin	croge	Crogecoin	f	\N	2023-05-24	2023-05-24
e801d88d-7089-425b-9851-43635f4f2c69	croissant-games	croissant	Croissant Games	f	\N	2023-05-24	2023-05-24
3f445198-c2e4-4159-abe3-cbbfa88fc5e3	croking	crk	Croking	f	\N	2023-05-24	2023-05-24
fa6c4617-0bab-4316-b665-ab2421cd8b6c	crolon-mars	clmrs	Crolon Mars	f	\N	2023-05-24	2023-05-24
c9438293-1284-41c5-b3c8-feefc446a10c	cronaswap	crona	CronaSwap	f	\N	2023-05-24	2023-05-24
e678cddf-bb6f-4004-ae2a-955ad16bad55	cronodes	crn	CroNodes	f	\N	2023-05-24	2023-05-24
56e59db7-5f7f-4181-8f4b-9a5eca39a533	cronos-id	croid	Cronos ID	f	\N	2023-05-24	2023-05-24
1ecb73e7-82e2-4328-b5ed-a5e5dfde573a	cronosphere	sphere	Cronosphere	f	\N	2023-05-24	2023-05-24
34205862-7333-4947-81f3-cc0faca36369	cronosverse	vrse	CronosVerse	f	\N	2023-05-24	2023-05-24
e50e3cd2-6957-4800-81ca-8f1795562a06	cropbytes	cbx	CropBytes	f	\N	2023-05-24	2023-05-24
4f32517b-af59-48ab-82f7-d552b52dbf8b	cropperfinance	crp	CropperFinance	f	\N	2023-05-24	2023-05-24
02ac97f6-2453-4dcd-b17c-a55da1e4e1f3	cross-chain-bridge	bridge	Cross-Chain Bridge	f	\N	2023-05-24	2023-05-24
e05e0e9c-7d36-4f61-b103-85e62c609158	crosschain-iotx	ciotx	Crosschain IOTX	f	\N	2023-05-24	2023-05-24
f18cfd8e-b1ae-4063-b3c1-64af3e39ac18	crossfi	crfi	CrossFi	f	\N	2023-05-24	2023-05-24
75213767-81ab-4678-8535-1b794ebd8d91	crossswap	cswap	CrossSwap	f	\N	2023-05-24	2023-05-24
8c4787c3-35fd-40f1-93f6-a4805b1efc64	crosswallet	cwt	CrossWallet	f	\N	2023-05-24	2023-05-24
78b2819d-bb17-4fec-895d-f791708afe75	crossx	crx	CrossX	f	\N	2023-05-24	2023-05-24
54dafe45-88c7-4331-8925-c9ba726094c2	croswap	cros	CroSwap	f	\N	2023-05-24	2023-05-24
5fa08f3b-7873-46de-babe-e5ca8b2eca06	crowd	cwd	CROWD	f	\N	2023-05-24	2023-05-24
f1c9c9c6-1d67-42da-908b-588ef8c82915	crowdswap	crowd	CrowdSwap	f	\N	2023-05-24	2023-05-24
25edeae8-d193-475b-8183-2adb1c15ad3c	crown	crw	Crown	f	\N	2023-05-24	2023-05-24
66fbe12c-c241-4d46-85e0-c2d1c6467f37	crown-by-third-time-games	crown	Crown by Third Time Games	f	\N	2023-05-24	2023-05-24
6ce4eed1-b718-48c2-9fc0-baf3c1665ff5	crowns	cws	Seascape Crowns	f	\N	2023-05-24	2023-05-24
0a0f26b1-6b03-4688-99b2-d24abe909819	crown-sovereign	csov	Crown Sovereign	f	\N	2023-05-24	2023-05-24
2c11fbae-1abe-48d8-ba27-474b095fd165	crownsterling	wcsov	CrownSterling	f	\N	2023-05-24	2023-05-24
9f192325-f122-476d-83ff-96133e9484f9	crown-token-77469f91-69f6-44dd-b356-152e2c39c0cc	crown	Crown Token	f	\N	2023-05-24	2023-05-24
950d4b75-f415-4d64-a3d4-a89f161e01bc	crowny-token	crwny	Crowny	f	\N	2023-05-24	2023-05-24
5f874e5b-1b31-4027-b847-24e752f6bae3	crunchy-dao	crdao	Crunchy DAO	f	\N	2023-05-24	2023-05-24
5848386a-e284-4c4a-b700-727dcb57ad25	crunchy-network	crnchy	Crunchy Network	f	\N	2023-05-24	2023-05-24
cb7a1ff4-f097-48fd-8de3-f924e4ee90a2	crusaders-of-crypto	crusader	Crusaders of Crypto	f	\N	2023-05-24	2023-05-24
3dc5961e-3e42-41d8-bc64-d2aaba673a04	crust-exchange	crust	Crust Exchange	f	\N	2023-05-24	2023-05-24
c4b05878-4edc-4c93-b84f-5d5304af5982	crust-network	cru	Crust Network	f	\N	2023-05-24	2023-05-24
c9870b53-3bd4-4e45-a86d-db5d8d51ad7d	crust-storage-market	csm	Crust Shadow	f	\N	2023-05-24	2023-05-24
177cdf64-cb83-4220-b098-95b604b1b6b7	crvusd	crvusd	crvUSD	f	\N	2023-05-24	2023-05-24
c4fbf773-a2eb-44ff-9888-4e988def7fb9	cry-coin	cryy	Cry Cat Coin	f	\N	2023-05-24	2023-05-24
43f6b4d1-887a-4b80-8950-148e7602db06	cryn	cryn	CRYN	f	\N	2023-05-24	2023-05-24
db291b49-9fe1-41f0-8a47-35813efcfc8b	cryowar-token	cwar	Cryowar	f	\N	2023-05-24	2023-05-24
038284bc-b93d-4de4-a1fe-00594860a219	cryptaur	cpt	Cryptaur	f	\N	2023-05-24	2023-05-24
68b34f44-fc98-4bea-aeae-df02153b5209	cryptegrity-dao	escrow	Cryptegrity Dao	f	\N	2023-05-24	2023-05-24
1b7089bd-5674-42d8-ba23-a035ac0f191e	crypterium	crpt	Crypterium	f	\N	2023-05-24	2023-05-24
57a222dd-0474-4fbd-9221-841caf30694e	crypteriumcoin	ccoin	Crypteriumcoin	f	\N	2023-05-24	2023-05-24
4d6af88d-e586-4c5d-95d0-89ebc9e5aced	cryptex	crx	CryptEx	f	\N	2023-05-24	2023-05-24
44ceeca1-3b3b-4a31-8c30-266f11ecfed8	cryptex-finance	ctx	Cryptex Finance	f	\N	2023-05-24	2023-05-24
81ba9189-34d0-4dfc-bd00-b4bc34f69ce9	cryption-network	cnt	Cryption Network	f	\N	2023-05-24	2023-05-24
dd53c106-4ccd-4d72-82e3-0e8ebd1ef50d	cryptmi	cymi	CryptMi	f	\N	2023-05-24	2023-05-24
5af39d56-2962-4feb-84a0-1c3edc391918	cryptoai	cai	CryptoAI	f	\N	2023-05-24	2023-05-24
424fb585-f85c-417e-863f-dbc50e55b9fd	crypto-ai	cai	Crypto AI	f	\N	2023-05-24	2023-05-24
51c2a303-8831-417a-b3ff-8c8d8044b97c	crypto-arc	arc	CryptoArc	f	\N	2023-05-24	2023-05-24
cf794e7d-bd5c-40cc-b09f-85a5bee830b0	cryptoart-ai	cart	CryptoArt.Ai	f	\N	2023-05-24	2023-05-24
abba9f08-bd1b-4e3b-8800-981610be2c75	cryptobank	cbex	CryptoBank	f	\N	2023-05-24	2023-05-24
e456e507-0ab2-4288-8f38-782a3a320e22	crypto-bank	cbank	Crypto Bank	f	\N	2023-05-24	2023-05-24
86852c54-c43e-4d92-b085-f8a8a5b894f1	cryptobill	crb	CryptoBill	f	\N	2023-05-24	2023-05-24
771bf34a-202e-47d6-b507-edaf9f8e66e4	crypto-birds	xcb	Crypto Birds	f	\N	2023-05-24	2023-05-24
fa7e1043-ef1e-453f-ae0d-7c6a6c3c7b1f	cryptoblades	skill	CryptoBlades	f	\N	2023-05-24	2023-05-24
87047c76-8331-4998-94a6-f171380c18c4	cryptoblades-kingdoms	king	CryptoBlades Kingdoms	f	\N	2023-05-24	2023-05-24
4e3e2d05-a8d0-4af5-b84b-595dc392811a	cryptoblast	cbt	CryptoBlast	f	\N	2023-05-24	2023-05-24
b26d811d-8f7d-457c-a95a-4b4537033a16	cryptobonusmiles	cbm	CryptoBonusMiles	f	\N	2023-05-24	2023-05-24
ed581eea-ca5a-473d-b34a-0b4bc1bc36cb	cryptobosscoin	cbc	CryptoBossCoin	f	\N	2023-05-24	2023-05-24
b1a5f078-ec64-4f3b-8920-55ddafacf774	crypto-bros	bros	Crypto Bros	f	\N	2023-05-24	2023-05-24
8eb7e9ef-f17c-4d03-b7c7-47efea6754fe	crypto-carbon-energy-2	cyce	Crypto Carbon Energy	f	\N	2023-05-24	2023-05-24
4e4ee669-7e6c-4b19-ac0e-8c1006f16d1f	cryptocart	ccv2	CryptoCart V2	f	\N	2023-05-24	2023-05-24
eeb74504-3354-4ea7-81df-f34bd4ebe0c2	cryptocean	cron	Cryptocean	f	\N	2023-05-24	2023-05-24
22dbfcce-55a3-4134-b0b1-756801fd1b67	crypto-classic	crc	Crypto Classic	f	\N	2023-05-24	2023-05-24
fb7ceb44-419c-4df2-bdf4-df1c8cc7538d	cryptocoinpay	ccp	CryptoCoinPay	f	\N	2023-05-24	2023-05-24
970031dc-2516-4140-af58-8519d2991f29	crypto-com-chain	cro	Cronos	f	\N	2023-05-24	2023-05-24
819cc365-034c-4035-8387-c49b9edb8702	crypto-development-services	cds	Crypto Development Services	f	\N	2023-05-24	2023-05-24
c3840b22-209c-4b47-bacd-a8b09a904a09	cryptodrop	juice	CryptoDrop	f	\N	2023-05-24	2023-05-24
b7a6afd3-991c-4a43-ba24-895cb028686c	crypto-emergency	cem	Crypto Emergency	f	\N	2023-05-24	2023-05-24
bde204b2-ab75-4c7a-a062-0636b090aaee	cryptoexpress	xpress	CryptoXpress	f	\N	2023-05-24	2023-05-24
943dd87d-1999-4d95-9b50-f1fc5e850f81	cryptofi	cfi	Cryptofi	f	\N	2023-05-24	2023-05-24
b3a794c6-5391-42ab-a298-8ab598427f4e	crypto-fight-club	fight	Crypto Fight Club	f	\N	2023-05-24	2023-05-24
84c0c003-126d-436c-b4e1-203efce18ffc	cryptoflow	cfl	Cryptoflow	f	\N	2023-05-24	2023-05-24
f1e68bb8-5b5e-483c-afac-01efa532afa4	cryptofranc	xchf	CryptoFranc	f	\N	2023-05-24	2023-05-24
9084c2f1-bddc-454f-b2f4-333fd0a17d84	cryptogcoin	crg	Cryptogcoin	f	\N	2023-05-24	2023-05-24
6e77d2f1-9af5-4ffc-bd2f-edc45cd269e1	crypto-gladiator-shards	cgl	Crypto Gladiator League	f	\N	2023-05-24	2023-05-24
fab6aa52-42c1-4d1c-8081-36a9045284f7	crypto-global-united	cgu	Crypto Global United	f	\N	2023-05-24	2023-05-24
2f69ce3e-7d32-4f9c-9ce6-d430d85d0763	cryptogpt-token	lai	LayerAI	f	\N	2023-05-24	2023-05-24
0b7c2313-a136-4cc1-9dfc-a5b133c134a5	crypto-holding-frank-token	chft	Crypto Holding Frank	f	\N	2023-05-24	2023-05-24
72aecf13-8cd3-4b59-b63f-73b5d2de185f	cryptoindex-io	cix100	Cryptoindex.com 100	f	\N	2023-05-24	2023-05-24
ef5a6372-5293-49b8-8148-7a24e4c2a2af	crypto-international	cri	Crypto International	f	\N	2023-05-24	2023-05-24
12adabf2-b205-4718-8cde-936e6425d609	crypto-island	cisla	Crypto Island	f	\N	2023-05-24	2023-05-24
246f862e-7d36-4d36-a33a-ed5704e22695	cryptojetski	cjet	CryptoJetski	f	\N	2023-05-24	2023-05-24
3c5b28f8-ef4a-4881-a47d-a873e900cc26	crypto-kart-racing	ckracing	Crypto Kart Racing	f	\N	2023-05-24	2023-05-24
a220dc3d-748e-46fb-a41a-653e62674061	cryptokenz	cyt	Cryptokenz	f	\N	2023-05-24	2023-05-24
45977f7e-fc32-42f4-8e23-b4b73f476873	cryptokki	tokki	CRYPTOKKI	f	\N	2023-05-24	2023-05-24
f3cb4d2c-b3c9-44f0-bbde-034c9583b928	cryptoku	cku	Cryptoku	f	\N	2023-05-24	2023-05-24
9ddf2136-c6f8-4b8a-acc2-14a7f54a4d6a	cryptolic	cptlc	Cryptolic	f	\N	2023-05-24	2023-05-24
d2ad2903-f69e-4690-bfda-1cf7dd12a944	cryptomeda	tech	Cryptomeda	f	\N	2023-05-24	2023-05-24
edc0790b-68f2-4abd-8fcd-e8c39604353f	cryptomines-eternal	eternal	CryptoMines Eternal	f	\N	2023-05-24	2023-05-24
4edf8072-f704-424b-97e3-bea5e5af13c9	cryptomines-reborn	crux	CryptoMines Reborn	f	\N	2023-05-24	2023-05-24
65812d0d-75ba-4321-b827-fc6e588ec979	cryptomoonshots	cms	CryptoMoonShots	f	\N	2023-05-24	2023-05-24
29a1bd5a-cc8d-4db7-ac64-54fb70818670	cryptoneur-network-foundation	cnf	CryptoNeur Network foundation	f	\N	2023-05-24	2023-05-24
a0668163-0c1a-4d29-b70b-d6d47bc88528	cryptonits	crt	Cryptonits	f	\N	2023-05-24	2023-05-24
b1be1c01-eb70-41f4-a4be-c3cc00efcb2f	cryptonovae	yae	Cryptonovae	f	\N	2023-05-24	2023-05-24
4e3443d8-0095-4596-bb6a-2c257be005ab	cryptopay	cpay	Cryptopay	f	\N	2023-05-24	2023-05-24
189431cd-a5cf-48c3-bc20-ede801dbacb6	cryptoperformance-coin	cpc	CryptoPerformance Coin	f	\N	2023-05-24	2023-05-24
eccc220c-1fde-4f61-b01e-f5ccc73aef53	crypto-perx	cprx	Crypto Perx	f	\N	2023-05-24	2023-05-24
f73902e0-9927-4d5a-be89-30369c3c6e28	cryptopirates	ogmf	CryptoPirates	f	\N	2023-05-24	2023-05-24
1ec84313-d042-429a-b4e8-be8e61d064fa	cryptoplanes	cpan	CryptoPlanes	f	\N	2023-05-24	2023-05-24
449cdf4f-8426-4b14-b4b0-b89968e6450e	cryptopolis	cpo	Cryptopolis	f	\N	2023-05-24	2023-05-24
5404e4ee-f435-418e-a994-297a9d6cf034	crypto-price-index	cpi	Crypto Price Index	f	\N	2023-05-24	2023-05-24
590ef93f-7ade-4dc8-8eae-36f56d69bb3c	crypto-puffs	puffs	Crypto Puffs	f	\N	2023-05-24	2023-05-24
005baec0-6805-4345-97e7-ad7178b11d12	cryptopunk-7171-hoodie	hoodie	CryptoPunk #7171	f	\N	2023-05-24	2023-05-24
53b1e463-6a44-45de-8e5e-9c4a6769e3a8	cryptopunks-fraction-toke	ipunks	CryptoPunks Fraction Token	f	\N	2023-05-24	2023-05-24
5a656e6f-27bc-409e-9b1a-2ca3dcb53f5c	crypto-raiders	raider	Crypto Raiders	f	\N	2023-05-24	2023-05-24
50cc653d-7b06-4305-8f28-e9682037872f	crypto-real-estate	cre	Crypto Real Estate	f	\N	2023-05-24	2023-05-24
3186177a-6f5e-4bfd-88dd-47fa08a8f194	cryptorg-token	ctg	Cryptorg	f	\N	2023-05-24	2023-05-24
c730b7df-3bd8-424b-9ebc-48b664a873e3	crypto-royale	roy	Crypto Royale	f	\N	2023-05-24	2023-05-24
29cc1a44-282e-434f-94e7-6c7220c0a55f	cryptosaga	saga	CryptoSaga	f	\N	2023-05-24	2023-05-24
6b74e1b5-4938-4ac3-8344-0f75ad1bc7be	crypto-sdg	sdg	Crypto SDG	f	\N	2023-05-24	2023-05-24
773fda9f-ca75-429d-8278-49a6b1416d3d	cryptoshares	shares	Cryptoshares	f	\N	2023-05-24	2023-05-24
805ab140-b19b-463f-b9af-49bcc1834ed8	crypto-shield	shield	Crypto Shield	f	\N	2023-05-24	2023-05-24
a61fc105-6e83-4b82-a843-b708a940f720	crypto-snack	snack	Crypto Snack	f	\N	2023-05-24	2023-05-24
108f1df1-37ca-4b21-b3d9-68079e9e2e9e	cryptosroom	croom	Cryptosroom	f	\N	2023-05-24	2023-05-24
2e828326-4236-4853-93d5-e03c9a9ceb11	cryptostone	cps	Cryptostone	f	\N	2023-05-24	2023-05-24
fd15306a-f3b9-42a4-92db-79d1eeb9e8ff	cryptostribe	cstc	CryptosTribe	f	\N	2023-05-24	2023-05-24
bdb94600-89af-46b4-b86d-d17d3fb0b555	cryptotanks	tank	CryptoTanks	f	\N	2023-05-24	2023-05-24
f1b05acf-5c70-41be-bc84-4e49a1d3d4c1	cryptotask-2	ctask	CryptoTask	f	\N	2023-05-24	2023-05-24
4decae45-0a81-416b-8441-3a4b5b2591ae	cryptotem	totem	Cryptotem	f	\N	2023-05-24	2023-05-24
15b47d2c-a569-43ce-b3f9-0374a374f025	crypto-tex	ctex	CRYPTO TEX	f	\N	2023-05-24	2023-05-24
9b2c4da8-a074-49b9-a884-96e5e00245de	cryptotwitter	ct	CryptoTwitter	f	\N	2023-05-24	2023-05-24
f65ce267-fb6b-4c6e-9a3e-cdf97a59c613	cryptotycoon	ctt	CryptoTycoon	f	\N	2023-05-24	2023-05-24
1364c5b5-ee52-46a5-8d73-61ce97e3429d	cryptounit	cru	Cryptounit	f	\N	2023-05-24	2023-05-24
e47655e7-8e0f-438e-a786-ac955b1732d6	crypto-village-accelerator	cva	Crypto Village Accelerator	f	\N	2023-05-24	2023-05-24
b9eec952-5229-4899-b33c-3db58214fc25	crypto-village-accelerator-cvag	cvag	Crypto Village Accelerator CVAG	f	\N	2023-05-24	2023-05-24
20f08bc8-60ff-428d-a42b-ad655d1bde4c	crypto-volatility-token	cvi	Crypto Volatility	f	\N	2023-05-24	2023-05-24
15ac5609-369e-450c-ae5d-99a4c45f2e13	cryptowar-xblade	open	OpenWorld	f	\N	2023-05-24	2023-05-24
24c8f8a1-9a69-4d4d-a6a7-735608d3fb2d	cryptozoo	zoo	CryptoZoo	f	\N	2023-05-24	2023-05-24
c551cf00-2deb-412c-b1e9-4f03698eb34b	cryptozoon	zoon	CryptoZoon	f	\N	2023-05-24	2023-05-24
4488b267-9bab-46b0-b645-222ecb763ce4	cryptyk	ctk	Cryptyk	f	\N	2023-05-24	2023-05-24
e669e987-c779-409d-948a-26cb5b82caf8	crypworld	cwc	CrypWorld	f	\N	2023-05-24	2023-05-24
dc53cdfc-3281-402a-a3ee-ebc880743721	crystal	crystal	Crystal	f	\N	2023-05-24	2023-05-24
e65af8d2-5bbb-4f0b-8623-253cfb18294c	crystal-clear	cct	Crystal Clear	f	\N	2023-05-24	2023-05-24
b7069bd8-41de-4ce8-b445-ff6197e94346	crystal-palace-fan-token	cpfc	Crystal Palace FC Fan Token	f	\N	2023-05-24	2023-05-24
f4288ff5-e70b-47cc-86d6-b89c3dcc95ef	crystal-token	cyl	Crystal CYL	f	\N	2023-05-24	2023-05-24
893d5c58-cc1e-4f53-81c0-427a81286012	crystl-finance	crystl	Crystl Finance	f	\N	2023-05-24	2023-05-24
b4587309-3ce7-436f-87f8-781aa354f4fa	csp-dao-network	nebo	CSP DAO Network	f	\N	2023-05-24	2023-05-24
cef4d462-6dc1-484d-a455-8df9b740ec6f	csr	csr	CSR	f	\N	2023-05-24	2023-05-24
bc4d172f-f7d3-481e-a737-df15c08b6bed	ctez	ctez	Ctez	f	\N	2023-05-24	2023-05-24
0b82cfcf-afd8-4bd7-ab85-fc045edd446b	cthulhu-finance	cth	Cthulhu Finance	f	\N	2023-05-24	2023-05-24
23193072-3794-475b-8fde-6e5c34b51bb8	ctomorrow-platform	ctp	Ctomorrow Platform	f	\N	2023-05-24	2023-05-24
c8d65d8f-cdc2-472c-b02c-16339ea12ae8	cube	itamcube	CUBE	f	\N	2023-05-24	2023-05-24
7ea60d04-ad21-4853-8fc7-70f91afa3dd6	cube-intelligence	auto	Cube Intelligence	f	\N	2023-05-24	2023-05-24
addd2989-aca2-42e7-a93f-33e96eabf41b	cub-finance	cub	Cub Finance	f	\N	2023-05-24	2023-05-24
583d04aa-9621-42c3-9359-a4bd28db557c	cubiex-power	cbix-p	Cubiex Power	f	\N	2023-05-24	2023-05-24
10869d0d-72bc-430d-a82a-7cc863d10a99	cubix	cubix	CUBIX	f	\N	2023-05-24	2023-05-24
9a4cee5b-91fa-46f2-8546-356f0153356c	cubtoken	cubt	CubToken	f	\N	2023-05-24	2023-05-24
8327e55b-ebaf-4ca3-bb33-28c500b122e8	cudos	cudos	Cudos	f	\N	2023-05-24	2023-05-24
8dfd1412-020e-4d7b-a347-cd6be16c11a0	cult-dao	cult	Cult DAO	f	\N	2023-05-24	2023-05-24
52a20dc2-1acc-4299-bd60-c808e5cf0575	cultiplan	ctpl	Cultiplan	f	\N	2023-05-24	2023-05-24
227d4ecb-07f2-4cad-95ea-40480ee8dfd9	cuminu	cuminu	Cuminu	f	\N	2023-05-24	2023-05-24
b5fa3c6b-8dbc-4652-a581-484c91f00aa6	cumrocket	cummies	CumRocket	f	\N	2023-05-24	2023-05-24
6a3821b0-3afe-406f-91f1-637a5b61e0fe	cuprum-coin	cuc	Cuprum Coin	f	\N	2023-05-24	2023-05-24
d4c8073a-da5e-43f9-acab-7649ee5f2f43	curate	xcur	Curate	f	\N	2023-05-24	2023-05-24
a074f93a-833b-4785-a96b-bfbb242ef7d7	curecoin	cure	Curecoin	f	\N	2023-05-24	2023-05-24
95e82537-af24-4825-a644-65394375284a	cure-token-v2	cure	CURE V2	f	\N	2023-05-24	2023-05-24
cca2db5a-0b8b-44ad-a4d1-a16b22b88842	curio-governance	cgt	Curio Governance	f	\N	2023-05-24	2023-05-24
b71a9b86-df76-405e-9c9f-75039713854e	curve-dao-token	crv	Curve DAO	f	\N	2023-05-24	2023-05-24
d5f44f67-84ce-41eb-afe7-9900824d39c0	curve-fi-amdai-amusdc-amusdt	am3crv	Curve.fi amDAI/amUSDC/amUSDT	f	\N	2023-05-24	2023-05-24
320c1e3d-1d99-47b9-ac15-3380b0f67b40	curve-fi-dai-usdc	dai+usdc	Curve.fi DAI/USDC	f	\N	2023-05-24	2023-05-24
c205e9d0-1399-4aca-bb7c-2c3b440a7acc	curve-fi-frax-usdc	crvfrax	Curve.fi FRAX/USDC	f	\N	2023-05-24	2023-05-24
893dc42f-92b9-418a-8254-651d7b4e1bfb	curve-fi-gdai-gusdc-gusdt	g3crv	Curve.fi gDAI/gUSDC/gUSDT	f	\N	2023-05-24	2023-05-24
82843dc3-9cbf-43d4-ba6c-a2f8eaca20f5	curve-fi-renbtc-wbtc-sbtc	crvrenwsbtc	Curve.fi renBTC/wBTC/sBTC	f	\N	2023-05-24	2023-05-24
565f87b7-92d8-4349-9ab4-ec02df9ec5c6	curve-fi-usdc-usdt	2crv	Curve.fi USDC/USDT	f	\N	2023-05-24	2023-05-24
4ae519b9-90c4-4955-9cf0-eb380dc35e77	curve-fi-ydai-yusdc-yusdt-ytusd	ycurve	LP-yCurve	f	\N	2023-05-24	2023-05-24
7da9d2a2-5be7-4d15-af53-b259616de8ec	curve-network	curve	Curve Network	f	\N	2023-05-24	2023-05-24
eb09c468-6473-4fd3-9e2d-6bb54af69dc1	custodiy	cty	CUSTODIY	f	\N	2023-05-24	2023-05-24
4ea11c99-4d84-40c5-a60e-29082de09412	cut-it-off	cut	Cut It Off	f	\N	2023-05-24	2023-05-24
2130cbb0-d6e5-4b27-a494-aa1915b8a69a	cvault-finance	core	cVault.finance	f	\N	2023-05-24	2023-05-24
91d53a51-e515-4eed-abb8-ee94ec695fcd	cvnx	cvnx	CVNX	f	\N	2023-05-24	2023-05-24
bd3c87f0-0bf4-4832-86b6-19c9927b57ff	cvshots	cvshot	CVSHOTS	f	\N	2023-05-24	2023-05-24
9e115a47-f3b3-4403-a085-8f66d27b6386	cyberdragon-gold	gold	CyberDragon Gold	f	\N	2023-05-24	2023-05-24
7a40f602-c642-4bcb-a88c-8e4eb145889f	cyberfi	cfi	CyberFi	f	\N	2023-05-24	2023-05-24
0203202a-6c06-4da6-8bd5-0f06f804e2e3	cyberfm	cyfm	CyberFM	f	\N	2023-05-24	2023-05-24
bbb8b79e-4d8c-49a7-9551-7a2bddda8616	cyberharbor	cht	CyberHarbor	f	\N	2023-05-24	2023-05-24
a5a5bd7e-4b17-43b7-9e93-5b8868d68f9b	cyberpunk-city	cyber	Cyberpunk City	f	\N	2023-05-24	2023-05-24
844e9476-d1d0-4899-b226-3a4f1e0cf068	cybertronchain	ctc	CyberTronchain	f	\N	2023-05-24	2023-05-24
d897ff20-0a83-4982-8ee6-d5945bdf814b	cybervein	cvt	CyberVein	f	\N	2023-05-24	2023-05-24
a7290f2c-1827-4325-a693-d177ff945327	cyberyen	cy	Cyberyen	f	\N	2023-05-24	2023-05-24
803cac90-0b7a-4c8d-bb68-e11e0c591aac	cyborg-apes	borg	Cyborg Apes	f	\N	2023-05-24	2023-05-24
42ceb990-a71d-46cb-bf4c-1d14399ea31e	cyclone-protocol	cyc	Cyclone Protocol	f	\N	2023-05-24	2023-05-24
19e55a12-04be-4c9e-9f78-9e0ba35f28b4	cydotori	dotr	Cydotori	f	\N	2023-05-24	2023-05-24
a82c5ce8-c3a3-457f-bf89-a5a078eec066	cyop	cyop	CyOp	f	\N	2023-05-24	2023-05-24
62c06db0-d56d-4e78-a035-b0d41c3a259c	cyop-protocol	cyop	CyOp Protocol	f	\N	2023-05-24	2023-05-24
2b2e944e-e01e-4e4c-b0a9-11d1aef3b23c	cypherium	cph	Cypherium	f	\N	2023-05-24	2023-05-24
d6702429-9f6d-4b9a-9162-2e2a88dbe76d	czred	czr	CZRed	f	\N	2023-05-24	2023-05-24
bd6bd398-15d1-4ded-b95a-ab0ebfbe6ce2	czusd	czusd	CZUSD	f	\N	2023-05-24	2023-05-24
db4055f9-3a39-416d-a8df-a344b30418bc	d3d-social	d3d	D3D Social	f	\N	2023-05-24	2023-05-24
c9cea655-c1ed-4c9c-98bf-56f3ebbac7ed	dab-coin	dab	DAB Coin	f	\N	2023-05-24	2023-05-24
df80c5b2-4b43-4b7c-a23b-57e31e8c284a	dacxi	dacxi	Dacxi	f	\N	2023-05-24	2023-05-24
ad66335d-92cc-4821-8e24-6921370bc0a7	daddy-doge	daddydoge	Daddy Doge	f	\N	2023-05-24	2023-05-24
1c534735-4bdc-4f3e-8ee4-c82521f92345	daefrom	dae	Daefrom	f	\N	2023-05-24	2023-05-24
d91eddf6-bf11-478b-8cd3-7c089f3c0e6d	daex	dax	DAEX	f	\N	2023-05-24	2023-05-24
383a9acb-bd7c-45c2-b0f9-74f73a32c200	dafin	daf	DaFIN	f	\N	2023-05-24	2023-05-24
618afc72-ecdc-4d8d-888a-7bf0d9ca958f	dafi-protocol	dafi	Dafi Protocol	f	\N	2023-05-24	2023-05-24
b90d0cde-114f-4177-ac89-ba288b89a3ef	dagger	xdag	Dagger	f	\N	2023-05-24	2023-05-24
4428bcef-147e-4e55-8890-b87063eed882	dai	dai	Dai	f	\N	2023-05-24	2023-05-24
9ebd3b85-ea7a-4c2f-9edc-c01b04312acd	daikicoin	dic	Daikicoin	f	\N	2023-05-24	2023-05-24
a56df9be-87ad-4c05-9170-527216917196	dain-token	dain	Dain	f	\N	2023-05-24	2023-05-24
c7d679e6-42c0-4dbb-a62d-4ec99f10a18d	dai-pulsechain	dai	DAI (PulseChain)	f	\N	2023-05-24	2023-05-24
3ce9aae9-6b79-428c-b934-52dfccea29fe	daisy	daisy	Daisy Protocol	f	\N	2023-05-24	2023-05-24
8ba13c4f-1033-4747-8a23-bf412e000b31	dalecoin	dalc	Dalecoin	f	\N	2023-05-24	2023-05-24
d0d2b316-34ec-4255-be97-aed8ffd6f5b8	dali	dali	DALI	f	\N	2023-05-24	2023-05-24
bfa02459-ca83-40f3-9708-e43a87d33872	damex-token	damex	Damex Token	f	\N	2023-05-24	2023-05-24
f8f129ae-1430-4f19-8015-f1eb268bb296	dam-finance	d2o	Deuterium	f	\N	2023-05-24	2023-05-24
7e4772b8-5508-47ce-839a-560561702a17	damm	damm	dAMM	f	\N	2023-05-24	2023-05-24
ca7d79af-8d7e-4a70-ace2-af739f31fc10	danat-coin	dnc	Danat Coin	f	\N	2023-05-24	2023-05-24
c6968489-fd43-40c8-87b3-04338dce6116	danketsu	ninjaz	Danketsu	f	\N	2023-05-24	2023-05-24
fb0d61f9-5333-4d31-bf8e-63edb01defd7	daohaus	haus	DAOhaus	f	\N	2023-05-24	2023-05-24
b1aefc13-095f-42c7-9480-a755f814a78c	dao-invest	vest	DAO Invest	f	\N	2023-05-24	2023-05-24
fb8cc2fc-a525-4baa-b460-9f9ad8717b15	daolaunch	dal	DAOLaunch	f	\N	2023-05-24	2023-05-24
bb8c8226-c0a2-42db-836e-7ef3c48659ba	dao-maker	dao	DAO Maker	f	\N	2023-05-24	2023-05-24
0fccb70d-e64d-4f96-acc8-7247296e145b	daosol	daosol	daoSOL	f	\N	2023-05-24	2023-05-24
5d43cdd0-eace-4783-8f59-876e3b948851	dao-space	daop	Dao Space	f	\N	2023-05-24	2023-05-24
705a68e8-e084-4cad-bed6-d28893324bfc	daosquare	rice	DAOSquare	f	\N	2023-05-24	2023-05-24
3bdb7bbf-7cbc-4549-9a6d-1f64a7db9712	daostack	gen	DAOstack	f	\N	2023-05-24	2023-05-24
85152c18-03e3-48c2-b419-0012737147e7	daovc	daovc	DAOvc	f	\N	2023-05-24	2023-05-24
87918b7e-d952-4c97-b6b0-fa9b5598aef7	daoverse	dvrs	DaoVerse	f	\N	2023-05-24	2023-05-24
ad0575a3-0134-431b-9723-f48ac638d7be	dapp	dapp	LiquidApps	f	\N	2023-05-24	2023-05-24
cea60eb6-71eb-443a-8d2d-6229839cae5e	dapp-com	dappt	Dapp.com	f	\N	2023-05-24	2023-05-24
8ab6bdaf-b78a-4aa5-a375-5e77f152e433	dappradar	radar	DappRadar	f	\N	2023-05-24	2023-05-24
7e1d100f-58f5-49b6-b6e5-aa06b053d46b	dappstore	dappx	dAppstore	f	\N	2023-05-24	2023-05-24
7012cff1-d245-4eb3-9dfa-b1e4a3eddebb	dappsy	app	Dappsy	f	\N	2023-05-24	2023-05-24
965b22e4-7c79-43a8-8a12-2aff1778d262	darcmatter-coin	darc	Konstellation	f	\N	2023-05-24	2023-05-24
2407129e-7d64-473d-a656-457b9f3e5cb5	darenft	dnft	DareNFT	f	\N	2023-05-24	2023-05-24
61206f48-336d-48c5-b81b-d439cd3698f7	darkcrypto	dark	DarkCrypto	f	\N	2023-05-24	2023-05-24
9c0f2128-b16b-4b3a-955a-d03667ffc682	darkcrypto-share	sky	DarkCrypto Share	f	\N	2023-05-24	2023-05-24
0d48d4e2-7f1f-45fe-8cc2-3477738bc004	darkcrystl	darkcrystl	DarkCrystl	f	\N	2023-05-24	2023-05-24
9cc11d79-8202-4f74-bb12-2b75f77909f8	dark-energy-crystals	dec	Dark Energy Crystals	f	\N	2023-05-24	2023-05-24
350ff63d-7d18-4ed9-a5b6-84b808449da7	dark-frontiers	dark	Dark Frontiers	f	\N	2023-05-24	2023-05-24
9f2c70fa-c6c8-454a-99aa-c80ee5a47af7	darkgang-finance	darkg	DarkGang Finance	f	\N	2023-05-24	2023-05-24
e5bfa403-7e6d-4671-8f28-f01458e4d9ce	darkknight	dknight	Dark Knight	f	\N	2023-05-24	2023-05-24
de3a8dde-7cb0-46d1-8445-d29775135431	dark-magic	dmagic	Dark Magic	f	\N	2023-05-24	2023-05-24
5d88ef5c-8133-4974-ba40-9d9e98e5bd26	darkmatter	dmt	DarkMatter	f	\N	2023-05-24	2023-05-24
38fc033a-3c72-4861-91e5-0ff1a8f28c68	dark-matter	dmt	Dark Matter	f	\N	2023-05-24	2023-05-24
f7a0d7a1-bdbf-42c7-999b-48a71629e1ae	dark-matter-defi	dmd	Dark Matter Defi	f	\N	2023-05-24	2023-05-24
68ef24ed-5723-4c18-812b-1819a63efa40	darkness-dollar	dusd	Darkness Dollar	f	\N	2023-05-24	2023-05-24
4698ee6d-d722-48ee-bfd8-7c1ce52e7a23	darkness-share	ness	Darkness Share	f	\N	2023-05-24	2023-05-24
af8e26c5-046b-4e45-8bbe-9b969fc0e805	darkshield	dks	DarkShield	f	\N	2023-05-24	2023-05-24
9e83eeeb-393d-4ece-b949-14864b5d5d56	darleygo-essence	dge	DarleyGo Essence	f	\N	2023-05-24	2023-05-24
9b7ad9ae-357b-4c88-a3db-3d73882fc9fd	daruma	daruma	Daruma	f	\N	2023-05-24	2023-05-24
0f980ae0-1bbf-4011-8a3f-388d5e008c31	darwinia-commitment-token	kton	Darwinia Commitment	f	\N	2023-05-24	2023-05-24
69d29401-b808-471a-8651-6e04c4564efd	darwinia-network-native-token	ring	Darwinia Network	f	\N	2023-05-24	2023-05-24
0c46c29c-ea53-4979-a581-5664034fe76e	dascoin	grn	GreenPower	f	\N	2023-05-24	2023-05-24
48d32a9e-dfdf-4d9e-b5ec-290fdbef0b88	dash	dash	Dash	f	\N	2023-05-24	2023-05-24
23d1bb58-f502-4379-8641-3bd6f7475b3a	dash-2-trade	d2t	Dash 2 Trade	f	\N	2023-05-24	2023-05-24
e0e19bdc-467e-432b-a378-94af30a7ed42	dash-diamond	dashd	Dash Diamond	f	\N	2023-05-24	2023-05-24
64ab1feb-7fbd-4731-908d-d8269e5b30d4	dashsports	dass	DashSports	f	\N	2023-05-24	2023-05-24
8f496260-3a28-4812-b5be-5aabcc00024b	data	dta	DATA	f	\N	2023-05-24	2023-05-24
20d50b48-9fb6-4860-9fdd-179b638c1dec	databroker-dao	dtx	DaTa eXchange DTX	f	\N	2023-05-24	2023-05-24
d3086488-d09e-433e-a2c9-c1e8059ec7ea	datachain-foundation	dc	DATACHAIN FOUNDATION	f	\N	2023-05-24	2023-05-24
1c48decc-6c3e-4a3b-8eda-dd23f2c5b35f	datahighway	dhx	DataHighway	f	\N	2023-05-24	2023-05-24
5c4a8ed1-e6f6-4d82-812f-037aadbf7683	datakyc	dkyc	DataKYC	f	\N	2023-05-24	2023-05-24
06d26ad1-a6c6-4f72-a2d1-e4ffe9d96b79	dione	dione	Dione	f	\N	2023-05-24	2023-05-24
f1f4f8ab-c849-4a4d-bbb7-cd681da1f39b	data-lake	lake	Data Lake	f	\N	2023-05-24	2023-05-24
2641a407-fa74-4be7-b442-1b2dc0992bbb	datamine	dam	Datamine	f	\N	2023-05-24	2023-05-24
5a2f6ff4-3d19-4488-a258-ff5815e05fac	dav	dav	DAV Network	f	\N	2023-05-24	2023-05-24
2cfbb806-8174-4543-9d18-320ef3173c77	davidcoin	dc	DavidCoin	f	\N	2023-05-24	2023-05-24
fe8f9559-55ce-488b-8f1f-49fc786d4c1f	davis-cup-fan-token	davis	Davis Cup Fan Token	f	\N	2023-05-24	2023-05-24
e701837c-2b9e-4d0b-99f9-274563afc0fb	davos-protocol	davos	Davos	f	\N	2023-05-24	2023-05-24
7ecdc344-c3df-4665-a2ae-d4bb40cdf35a	dawg	dawg	DAWG	f	\N	2023-05-24	2023-05-24
f3442d28-364d-48be-883a-9dbd5048be22	dawin-token	dwt	DaWin Token	f	\N	2023-05-24	2023-05-24
d58ec682-8220-4409-9b94-273e9eac5673	dawn-protocol	dawn	Dawn Protocol	f	\N	2023-05-24	2023-05-24
7998e4e9-53bc-411d-a4c4-ecdf3c3c3ba9	dawn-star-share	solar	Dawn Star Share	f	\N	2023-05-24	2023-05-24
86d54264-3925-46d7-b0c1-20dd64e3b8ac	dawn-star-token	dsf	Dawn Star Token	f	\N	2023-05-24	2023-05-24
c80f8f08-dfa2-4d5a-a988-54ed2175347e	day-by-day	dbd	Day By Day	f	\N	2023-05-24	2023-05-24
16c3191c-23e8-46fc-8a48-f00bac0bcfe9	daylight-protocol	dayl	Daylight Protocol	f	\N	2023-05-24	2023-05-24
919b1e37-42be-4dc0-8c2d-2dad497991f5	daystarter	dst	DAYSTARTER	f	\N	2023-05-24	2023-05-24
e1337075-f9e5-4b3f-9818-a1a50595c008	dbx-2	dbx	DBX	f	\N	2023-05-24	2023-05-24
0ef3551a-2da5-4139-9836-efce75e4a0db	dbxen	dxn	DBXen	f	\N	2023-05-24	2023-05-24
db8164f5-0a8a-42b3-8eea-1226bc1e00bf	dchess-king	king	DChess King	f	\N	2023-05-24	2023-05-24
d348613f-af86-4079-b520-12126411b1b3	dcoin-token	dt	Dcoin	f	\N	2023-05-24	2023-05-24
fd571e08-645f-40e5-842f-841cd230ff9b	d-community	dili	D Community	f	\N	2023-05-24	2023-05-24
838b5c1f-a7af-42c3-b8a6-cfc911de3b7b	dcomy	dco	DCOMY	f	\N	2023-05-24	2023-05-24
f966b875-6dcf-4ffb-9fbb-b4b33c791eb5	dcoreum	dco	DCOREUM	f	\N	2023-05-24	2023-05-24
05aa3ae9-6355-48d7-b94c-aa11a5ce182f	d-drops	dop	D-Drops	f	\N	2023-05-24	2023-05-24
dbf9f732-7ba3-4605-ab8a-c3cb8d6210b9	dead-knight	dkm	Dead Knight	f	\N	2023-05-24	2023-05-24
d28c133c-5211-4314-8bee-1062362f5978	deadpxlz	ding	DEADPXLZ	f	\N	2023-05-24	2023-05-24
eb4eb972-a024-4d11-ac59-4c972b605f4e	deapcoin	dep	DEAPCOIN	f	\N	2023-05-24	2023-05-24
86e3b743-4951-4da3-990b-0555edc4b593	deathroad	drace	DeathRoad	f	\N	2023-05-24	2023-05-24
97bdb889-b4a7-4219-833b-9d90126b5b6c	death-token	death	Death	f	\N	2023-05-24	2023-05-24
ab99259b-cbb6-43f2-a5e6-be4799117a77	deathwolf	dth	DeathWolf	f	\N	2023-05-24	2023-05-24
8506ca42-5caa-45ba-8992-0192b422e188	decanect	dcnt	Decanect	f	\N	2023-05-24	2023-05-24
bb71d404-eeb8-48cf-bc3a-0e0dcb189c0f	decentbet	dbet	DecentBet	f	\N	2023-05-24	2023-05-24
02c4794c-71ee-4ce6-8904-372372f1457e	decent-database	decent	DECENT Database	f	\N	2023-05-24	2023-05-24
06d3714d-a676-4c0d-a830-09e5fa03bf16	decentify	dfy	Decentify	f	\N	2023-05-24	2023-05-24
882c0688-c8c4-4427-90e4-19f6b0d641a1	decentr	dec	Decentr	f	\N	2023-05-24	2023-05-24
5b202978-c859-48c8-aca8-566190e3f9fa	decentrabnb	dbnb	DecentraBNB	f	\N	2023-05-24	2023-05-24
7259e059-51e4-4248-845b-9c282dd195a1	decentra-box	dbox	Decentra Box	f	\N	2023-05-24	2023-05-24
6cb469a4-d6ba-4c45-a8d1-fef01d7721d4	decentraland	mana	Decentraland	f	\N	2023-05-24	2023-05-24
93e866e0-09bb-49f2-9f48-bc06c8524159	decentraland-wormhole	mana	Decentraland (Wormhole)	f	\N	2023-05-24	2023-05-24
23ba971a-c6a3-4ba7-a1a1-a99b24357479	decentral-art	art	Decentral ART	f	\N	2023-05-24	2023-05-24
b3893c12-6a0f-49b4-903a-73b73b811234	decentralfree	freela	DecentralFree	f	\N	2023-05-24	2023-05-24
9fef7a5d-4998-4020-8b00-022fcb2f5d26	decentral-games	dg	Decentral Games	f	\N	2023-05-24	2023-05-24
43f9ca2f-d268-4be9-8f3f-290cc06b6709	decentral-games-governance	xdg	Decentral Games Governance	f	\N	2023-05-24	2023-05-24
88c46218-dfe3-46ca-b6f7-eff03092391e	decentral-games-ice	ice	Decentral Games ICE	f	\N	2023-05-24	2023-05-24
8dedb2ba-1849-4212-9747-5674c895271c	decentral-games-old	dg	Decentral Games (Old)	f	\N	2023-05-24	2023-05-24
900d1f5b-f01e-4eb5-90cb-40af128830f1	decentralized-activism	dact	Decentralized Activism	f	\N	2023-05-24	2023-05-24
39747c2f-ef65-422d-bcf6-945000a8cd0e	decentralized-advertising	dad	DAD	f	\N	2023-05-24	2023-05-24
86816c55-ddf7-4609-8eb9-0dd4fb2f859d	decentralized-community-investment-protocol	dcip	Decentralized Community Investment Protocol	f	\N	2023-05-24	2023-05-24
2127f2b0-788d-42d6-be41-1cf352f5bcd9	decentralized-intelligence-agency	dia	Decentralized Intelligence Agency	f	\N	2023-05-24	2023-05-24
323c5523-c59a-4b73-99bf-06abe8641920	decentralized-liquidity-program	dlp	Decentralized Liquidity Program	f	\N	2023-05-24	2023-05-24
15ac8900-dc60-4f9b-afb6-ad038d36676e	decentralized-mining-exchange	dmc	Decentralized Mining Exchange	f	\N	2023-05-24	2023-05-24
a6e8b1b5-6b91-414d-b1a5-b588cc34bc3f	decentralized-nations	dena	Decentralized Nations	f	\N	2023-05-24	2023-05-24
8b3fc084-c0cb-483c-b9de-4ffb0283b3d4	decentralized-united	dcu	Decentralized United	f	\N	2023-05-24	2023-05-24
7cd7764c-bb07-4bef-91cc-86a0a73f4f87	decentralized-universal-basic-income	dubi	Decentralized Universal Basic Income	f	\N	2023-05-24	2023-05-24
39a96ba6-d998-4cf4-b8d6-29ffcf44b33c	decentralized-usd	dusd	Decentralized USD	f	\N	2023-05-24	2023-05-24
49b5d22d-6f93-4d02-9859-58c3a2e9add6	decentralized-vulnerability-platform	dvp	Decentralized Vulnerability Platform	f	\N	2023-05-24	2023-05-24
5320b3b3-651f-433d-b7fa-e20d6721254e	decentraweb	dweb	DecentraWeb	f	\N	2023-05-24	2023-05-24
1a81c459-d9dd-4640-8267-89ce3b4a6565	decentrawood	deod	Decentrawood	f	\N	2023-05-24	2023-05-24
a7f51827-9378-4d3f-a7f4-ee015fe42d26	decimal	del	Decimal	f	\N	2023-05-24	2023-05-24
6ca33225-72b2-48b2-a508-c57a7b190bf8	decimated	dio	Decimated	f	\N	2023-05-24	2023-05-24
54c03f74-f5d3-497a-b88d-d62f7bf99a7e	decred	dcr	Decred	f	\N	2023-05-24	2023-05-24
3a04dc50-616f-4f5b-b3a5-9955670665d9	decredit	cdtc	DeCredit	f	\N	2023-05-24	2023-05-24
4eea724d-fc73-4a4b-b263-971885df6705	decred-next	dcrn	Decred-Next	f	\N	2023-05-24	2023-05-24
cb5330a4-e95b-49cd-a445-914668ec311e	decubate	dcb	Decubate	f	\N	2023-05-24	2023-05-24
9e9692fa-1f19-4ec3-8cea-5659d6f547c4	ded	ded	DED	f	\N	2023-05-24	2023-05-24
93a4209e-c486-4cb2-a539-3efd3ddfe577	deep-blue-sea	dbea	Deep Blue Sea	f	\N	2023-05-24	2023-05-24
d02b3b06-4eaf-4ee6-8e02-f01ec2385c3f	deepbrain-chain	dbc	DeepBrain Chain	f	\N	2023-05-24	2023-05-24
f3f13f10-ce2b-491c-b129-84e4be4d26cc	deeper-network	dpr	Deeper Network	f	\N	2023-05-24	2023-05-24
aeb6e9f1-c19a-41dd-aa7f-590af5e0a86b	deeponion	onion	DeepOnion	f	\N	2023-05-24	2023-05-24
bac13be8-859c-4e2f-b71b-c0b3aed775fc	deepspace	dps	DEEPSPACE	f	\N	2023-05-24	2023-05-24
a4179095-f21a-4d40-a0b5-4064b87e9428	deepwaters	wtr	Deepwaters	f	\N	2023-05-24	2023-05-24
7eca4adf-3e65-4fc9-ab74-8345a2a4c679	deesse	love	Deesse	f	\N	2023-05-24	2023-05-24
3e05894b-6011-42ef-9b57-5bc4b52d532a	deez-nuts	deeznuts	Deez Nuts	f	\N	2023-05-24	2023-05-24
875db1ce-bfb4-42d6-bcb7-43ca4bfcfb13	defactor	factr	Defactor	f	\N	2023-05-24	2023-05-24
8cdc85e1-402d-4cf5-bcaf-b44e28ed223a	defhold	defo	DefHold	f	\N	2023-05-24	2023-05-24
69a787e1-a0ca-417e-b7ad-4aae463bf549	defi-04ab07ad-43a9-4d63-a379-2c6a2499f748	dfx	DeFi²	f	\N	2023-05-24	2023-05-24
9e047eb5-233b-4c3d-b790-da8f40eb883a	defi11	d11	DeFi11	f	\N	2023-05-24	2023-05-24
e559a36a-f377-4232-a247-cbcda65d6241	defiai	dfai	DeFiAI	f	\N	2023-05-24	2023-05-24
6f786b04-e4dc-4ec7-968f-a7dee151ed24	defiato	dfiat	DeFiato	f	\N	2023-05-24	2023-05-24
8baf25d1-ad8e-4e2a-8209-45d75a6c200b	defibox	box	DefiBox	f	\N	2023-05-24	2023-05-24
bfd894f0-3ec8-4426-9c05-13f0422124f0	defichain	dfi	DeFiChain	f	\N	2023-05-24	2023-05-24
272686c6-0357-41b0-acf6-f775220c5550	deficliq	cliq	DefiCliq	f	\N	2023-05-24	2023-05-24
a40ec80f-5399-4df1-8ce6-765e22394ec1	defi-coin	defc	DeFi Coin	f	\N	2023-05-24	2023-05-24
b6d4eb3d-e80f-47fa-8caf-657a53170104	deficonnect	dfc	DefiConnect V1	f	\N	2023-05-24	2023-05-24
9ee2c763-8031-4f20-ba8d-7b65eab15a0b	deficonnect-v2	dfc	DefiConnect V2	f	\N	2023-05-24	2023-05-24
2f3cedda-65b6-48f4-b059-0a749cfbe81a	defi-degen-land	ddl	DeFi Degen Land	f	\N	2023-05-24	2023-05-24
0e47ae2f-3806-41ed-b8e5-1053391e0de2	defido	defido	DeFido	f	\N	2023-05-24	2023-05-24
54632910-7c7b-436c-99f4-72ba5c873a65	defidollar-dao	dfd	DefiDollar DAO	f	\N	2023-05-24	2023-05-24
05de829a-88dc-4260-953f-ab58886dceea	defi-for-you	dfy	Defi For You	f	\N	2023-05-24	2023-05-24
abf048f0-9692-47e9-b381-09f4490c2f91	defi-franc	dchf	DeFi Franc	f	\N	2023-05-24	2023-05-24
9c9171e6-225c-4050-bd3a-51ffade0948b	defi-franc-moneta	mon	Moneta DAO	f	\N	2023-05-24	2023-05-24
e279dd77-bc88-4e73-aed4-372fca529b87	defigram	dfg	Defigram	f	\N	2023-05-24	2023-05-24
ad11a140-5f7d-4ef2-8129-cf7f88f569a1	defihorse	dfh	DeFiHorse	f	\N	2023-05-24	2023-05-24
bfef8421-2083-4291-aece-0846df3835f2	defi-hunters-dao	ddao	DDAO Hunters	f	\N	2023-05-24	2023-05-24
96af4c82-5c53-4ac4-b1e6-cd1ae7b9ade1	defi-kingdoms	jewel	DeFi Kingdoms	f	\N	2023-05-24	2023-05-24
a44ff404-afcb-4923-b773-19bd581d20e3	defi-kingdoms-crystal	crystal	DeFi Kingdoms Crystal	f	\N	2023-05-24	2023-05-24
4ce5c8cb-c5ea-4cfc-9ee3-108072e866f7	defil	dfl	DeFIL	f	\N	2023-05-24	2023-05-24
22ca1650-3a48-4903-82c7-b771b64381a8	defi-land	dfl	DeFi Land	f	\N	2023-05-24	2023-05-24
881f8ae1-14dd-4750-b901-6400f51a6a97	defi-land-gold	goldy	DeFi Land Gold	f	\N	2023-05-24	2023-05-24
9836bd46-1c2b-4283-8ed7-22047dd02e11	defily	dfl	Defily	f	\N	2023-05-24	2023-05-24
85efeb0b-bcd7-4b20-94ca-658d264c5082	defina-finance	fina	Defina Finance	f	\N	2023-05-24	2023-05-24
6834fbcb-e400-466d-8697-a5e46d0215d8	define	dfa	DeFine	f	\N	2023-05-24	2023-05-24
de80fccb-b474-4624-b3af-d2d5baae73b3	definer	fin	DeFiner	f	\N	2023-05-24	2023-05-24
efcb28ec-8f8d-44d0-bf56-aeb6906d5011	definet	net	Definet	f	\N	2023-05-24	2023-05-24
5750996f-65fc-4cab-b565-3221ef4990d4	definity	defx	DeFinity	f	\N	2023-05-24	2023-05-24
3432e2d0-7c23-49d3-890c-0b324da842d5	defipie	pie	DeFiPie	f	\N	2023-05-24	2023-05-24
5fc03d2e-202a-4d13-bc19-048aa4679d94	defiplaza	dfp2	DefiPlaza	f	\N	2023-05-24	2023-05-24
f42c60c0-f932-48cf-bd94-6e4e3df1840d	defipulse-index	dpi	DeFi Pulse Index	f	\N	2023-05-24	2023-05-24
bc6187f7-edae-479d-a6ad-4b3cf012bc8d	defire	cwap	DeFIRE	f	\N	2023-05-24	2023-05-24
f1d31dcb-da60-4a55-ac93-8ecc74754cc3	defi-shopping-stake	dss	Defi Shopping Stake	f	\N	2023-05-24	2023-05-24
bb6e6ddb-060a-4e40-8945-3ac21c71cec2	defis-network	dfs	Defis Network	f	\N	2023-05-24	2023-05-24
c7fc6733-d5b2-4ce3-8d69-7e5ff3c9a175	defistarter	dfi	DfiStarter	f	\N	2023-05-24	2023-05-24
b0c1b429-8803-4d3e-bdde-fe5447af6475	defi-stoa	sta	STOA Network	f	\N	2023-05-24	2023-05-24
35a13026-9552-4d56-8ea1-cfc722ab6ead	defit	defit	Digital Fitness	f	\N	2023-05-24	2023-05-24
2b886bd3-6ccc-4abc-a29a-472b9d8adac9	defitankland	dftl	DefiTankLand	f	\N	2023-05-24	2023-05-24
91d4e62c-38b0-4eaa-94e5-a9827db63953	defi-tiger	dtg	Defi Tiger	f	\N	2023-05-24	2023-05-24
a029a090-3eab-481c-993c-d40352309342	defiville-island	isla	DefiVille Island	f	\N	2023-05-24	2023-05-24
b33a5872-04eb-42a3-aaa0-4f5e6f298e4c	defi-warrior	fiwa	Defi Warrior	f	\N	2023-05-24	2023-05-24
2034db9e-6052-4723-9418-84882c2de105	defi-yield-protocol	dyp	Dypius	f	\N	2023-05-24	2023-05-24
1c7024a7-0a9d-4d95-8fa5-5adb09fa6b20	defly	defly	Defly	f	\N	2023-05-24	2023-05-24
1f2a6711-662a-408b-9be2-eca4d2154b6a	deflyball	defly	Deflyball	f	\N	2023-05-24	2023-05-24
9aa770c6-10c7-4f45-9da1-1d9c848bcb39	defrost-finance	melt	Defrost Finance	f	\N	2023-05-24	2023-05-24
640ddb6b-0fb1-46dd-9060-6fb497057f38	defy	defy	DEFY	f	\N	2023-05-24	2023-05-24
0b59c949-eee7-496d-9624-b3e17e111ca5	degate	dg	DeGate	f	\N	2023-05-24	2023-05-24
2568bd08-ea9f-4534-8bc0-fad70b303364	degen	degn	Degen	f	\N	2023-05-24	2023-05-24
b44e127b-5f0f-4b48-9f47-a74a4ebc45e7	degenerator	meme	Meme	f	\N	2023-05-24	2023-05-24
0115e288-5cac-4599-b52f-2cd5c367c5b3	degen-index	degen	DEGEN Index	f	\N	2023-05-24	2023-05-24
0b4d60a4-9798-4e58-a12d-2ed294f8a205	degenreborn	degen	DegenReborn	f	\N	2023-05-24	2023-05-24
8dba5e4d-8d12-47ff-a8c0-5775f8781ddf	degenstogether	degen	DegensTogether	f	\N	2023-05-24	2023-05-24
b9e998a7-2a62-45b2-9c3e-958561b69d50	degenvc	dgvc	DegenVC	f	\N	2023-05-24	2023-05-24
e1ac04fb-76a6-4460-b07a-c37ba3837a97	degenx	dgnx	DegenX	f	\N	2023-05-24	2023-05-24
634bd9da-e604-42fb-995c-b4fb194d5349	degen-zoo	dzoo	Degen Zoo	f	\N	2023-05-24	2023-05-24
c1a84cf8-7ef2-45bb-9825-c4a59b526171	degis	deg	Degis	f	\N	2023-05-24	2023-05-24
c12b8c30-0a4c-4890-afb3-628db15d7c4e	dego-finance	dego	Dego Finance	f	\N	2023-05-24	2023-05-24
050885c0-7c0b-4865-8052-e14ae22501ab	degrain	dgrn	Degrain	f	\N	2023-05-24	2023-05-24
0ffb27f0-6e7b-48cf-92a2-f0aecef3a5e0	degree-crypto-token	dct	Degree Crypto	f	\N	2023-05-24	2023-05-24
20736f13-0ef0-45a2-a712-ad1bbad79bbf	dehealth	dhlt	DeHealth	f	\N	2023-05-24	2023-05-24
34a13cbb-2afe-4bf4-ac59-cfcc473b341a	dehero-community-token	heroes	Dehero Community	f	\N	2023-05-24	2023-05-24
75cea25f-78f1-4f6c-a0af-136c816612d6	deherogame-amazing-token	amg	DeHeroGame Amazing Token	f	\N	2023-05-24	2023-05-24
8496f9d3-e92d-4b96-841e-17079e6cabd3	dehive	dhv	DeHive	f	\N	2023-05-24	2023-05-24
9121b835-b5d7-4c86-af56-986bb4ea11a2	dehorizon	devt	DeHorizon	f	\N	2023-05-24	2023-05-24
7b4dc18a-c9e1-464d-bb87-f0d30cdca599	dehr-network	dhr	DeHR Network	f	\N	2023-05-24	2023-05-24
b3b448ea-3a6b-4da5-9134-2624f7a8ebdf	dejitaru-shirudo	shield	Dejitaru Shirudo	f	\N	2023-05-24	2023-05-24
ccdbf909-627f-4c0a-864d-81e3baddc114	dejitaru-tsuka	tsuka	Dejitaru Tsuka	f	\N	2023-05-24	2023-05-24
c5e9bd82-0e9c-407c-8e61-07f798404b67	dekbox	dek	DekBox	f	\N	2023-05-24	2023-05-24
a1b90604-f999-480a-8a78-0fea357f26e2	delio-dsp	dsp	Delio DSP	f	\N	2023-05-24	2023-05-24
93641cfe-3971-42a1-af5c-3395a0c59cd9	delion	dln	Delion	f	\N	2023-05-24	2023-05-24
fcad00e4-0950-4937-8e5f-bb4ee1a69eba	deliq	dlq	Deliq	f	\N	2023-05-24	2023-05-24
8a115604-6f68-4d9a-a7b0-983612fee0d7	delot-io	delot	DELOT.IO	f	\N	2023-05-24	2023-05-24
6f819cb0-25a6-4ff3-b3ee-4661ca9a219d	delphy	dpy	Delphy	f	\N	2023-05-24	2023-05-24
6c7c8d9a-7bde-48ef-bf93-bb112e50899d	delrey-inu	delrey	Delrey Inu	f	\N	2023-05-24	2023-05-24
0004a81f-2c46-4857-865f-07ad7440097f	delta-exchange-token	deto	Delta Exchange	f	\N	2023-05-24	2023-05-24
11329c5c-3f68-4272-a05f-74a1365a4eac	deltafi	delfi	DeltaFi	f	\N	2023-05-24	2023-05-24
292e5eba-ce60-4609-8ec5-92b449745783	delta-financial	delta	Delta Financial	f	\N	2023-05-24	2023-05-24
e067c05d-d981-4e0b-9ca5-91a86060c08e	deltaflare	honr	DeltaFlare	f	\N	2023-05-24	2023-05-24
c0076507-d899-449e-bfbf-5fac95f25c56	deltahub-community	dhc	DeltaHub Community	f	\N	2023-05-24	2023-05-24
33603a11-6039-4211-86ff-ec7f141b17d7	delta-theta	dlta	delta.theta	f	\N	2023-05-24	2023-05-24
2e6cc2e5-8e72-4d59-8e55-4fd826f13ab9	delysium	agi	Delysium	f	\N	2023-05-24	2023-05-24
7cb223cd-8aa6-4702-b266-d8b6cdf7c366	demeter	deo	Demeter	f	\N	2023-05-24	2023-05-24
de37cb70-899c-419f-b81a-991d5b3c04c7	demeter-usd	dusd	Demeter USD	f	\N	2023-05-24	2023-05-24
5462c467-2e10-4f3c-ad0f-69f9b3f7adf2	demodyfi	dmod	Demodyfi	f	\N	2023-05-24	2023-05-24
5c496f2f-0f50-43b6-8ac8-cd7c89d2c154	demole	dmlg	Demole	f	\N	2023-05-24	2023-05-24
032ecd22-395a-458f-aa2e-ec114a686bec	demx	demx	DemX	f	\N	2023-05-24	2023-05-24
d4f73f22-e051-424f-a88a-386dce9cfe67	denarius	d	Denarius	f	\N	2023-05-24	2023-05-24
ab066efa-66e3-448a-93c9-53fecc71b53d	denizlispor-fan-token	dnz	Denizlispor Fan Token	f	\N	2023-05-24	2023-05-24
1a8b3a42-f353-449d-9b17-d3e9f7644b07	dent	dent	Dent	f	\N	2023-05-24	2023-05-24
30823446-dd6f-40b7-852a-2f01e542cc62	dentacoin	dcn	Dentacoin	f	\N	2023-05-24	2023-05-24
7d0d685b-7604-4062-a027-a749c307bda8	deonex-token	don	DEONEX	f	\N	2023-05-24	2023-05-24
49ae8254-47c8-428c-89b6-7f34bb47051e	depay	depay	DePay	f	\N	2023-05-24	2023-05-24
07bf024a-710e-4b1b-88af-a5b55c6f4bb3	deportivo-alaves-fan-token	daft	Deportivo Alavés Fan Token	f	\N	2023-05-24	2023-05-24
114b1b83-8eb2-49da-8747-c8e40830127d	dequant	deq	Dequant	f	\N	2023-05-24	2023-05-24
f860e138-99e7-455a-a105-4a457f37c3a0	derace	derc	DeRace	f	\N	2023-05-24	2023-05-24
16ea9d5d-02e8-4dbf-9c11-5d3c99977a15	deracoin	drc	Deracoin	f	\N	2023-05-24	2023-05-24
9d523baf-4f12-4db5-abb3-394745d4c747	derify-protocol	drf	Derify Protocol	f	\N	2023-05-24	2023-05-24
dc3841c7-857e-4818-a18b-9957faea5f55	deri-protocol	deri	Deri Protocol	f	\N	2023-05-24	2023-05-24
9e261794-bb15-4a69-84c8-661a347f8f22	derivadao	ddx	DerivaDAO	f	\N	2023-05-24	2023-05-24
7596dc95-3c8e-4c5a-9d7c-7fcc6bc935ac	dero	dero	Dero	f	\N	2023-05-24	2023-05-24
fc3b7d0b-a16c-465e-86e7-bc5bc404e31b	derp-coin	derp	Derp Coin	f	\N	2023-05-24	2023-05-24
e6e8d0fa-5d7a-4d7f-bc9a-7e17bdf10e43	desmos	dsm	Desmos	f	\N	2023-05-24	2023-05-24
a21c2f8a-4082-4f11-9b06-3c4ea3cd2520	deso	deso	Decentralized Social	f	\N	2023-05-24	2023-05-24
787306f4-efc4-4e9f-aa31-78c5cbf1637e	despace-protocol	des	DeSpace Protocol	f	\N	2023-05-24	2023-05-24
02d40762-84d7-4036-b11c-ed39ed8227de	destorage	ds	DeStorage	f	\N	2023-05-24	2023-05-24
f3b5672d-7343-43c4-8360-7bca70aa967c	deusdc	deusdc	deUSDC	f	\N	2023-05-24	2023-05-24
723711fe-c9cb-4df2-9bda-eb049821223e	deus-finance-2	deus	DEUS Finance	f	\N	2023-05-24	2023-05-24
c6d4f55a-d7b9-440e-9c05-cd6b4f32bbb0	deutsche-emark	dem	Deutsche eMark	f	\N	2023-05-24	2023-05-24
92e67fb3-8a01-401c-8aea-e158f4da7917	devault	dvt	DeVault	f	\N	2023-05-24	2023-05-24
ec786d79-d1fd-42da-86f6-113f8ed5fb23	developer-dao	code	Developer DAO	f	\N	2023-05-24	2023-05-24
d11bb85d-a02f-43c6-8706-022a2c60f675	devikins	dvk	Devikins	f	\N	2023-05-24	2023-05-24
1e7bf965-fa89-4b22-8636-1feb463ac17d	devil-finance	devil	Devil Finance	f	\N	2023-05-24	2023-05-24
0aee867e-1cd1-4375-838d-2bcc87577a2d	devita-global	life	DEVITA	f	\N	2023-05-24	2023-05-24
00db900a-1ff3-4bb2-ac12-a1b2929be6bb	devolution	devo	DeVolution	f	\N	2023-05-24	2023-05-24
95d4a863-427b-4a71-a91d-12251ca4ce06	devops	dev	DevOps	f	\N	2023-05-24	2023-05-24
61086590-5ffc-4612-9cd7-747ce3b73613	devour-2	dpay	Devour	f	\N	2023-05-24	2023-05-24
d4c4a8ff-8ffe-4f76-ad5a-6f2db8fde2b9	dev-protocol	dev	Dev Protocol	f	\N	2023-05-24	2023-05-24
90850192-0874-41e2-b3da-20848f82971c	devvio	devve	Devvio	f	\N	2023-05-24	2023-05-24
b9e7d915-0d8f-460f-8109-220cb321965f	dexa-coin	dexa	DEXA COIN	f	\N	2023-05-24	2023-05-24
137aee4a-c098-4497-9b67-43fd38621656	dexalot	alot	Dexalot	f	\N	2023-05-24	2023-05-24
ab1f0fc9-5db1-45cb-b6c9-b2b8e318a72e	dexbet	dxb	Dexbet	f	\N	2023-05-24	2023-05-24
f529aa54-e0d3-40b9-b652-3722b4d57681	dexbrowser	bro	DexBrowser	f	\N	2023-05-24	2023-05-24
5f022ac5-540a-4c63-bf0a-8a4f6499bf13	dexe	dexe	DeXe	f	\N	2023-05-24	2023-05-24
154a6d76-0210-4800-90c7-ca7519dd2419	dexfin	dxf	Dexfin	f	\N	2023-05-24	2023-05-24
9565a0d3-592a-4a07-8eca-cfa1efe17f97	dexfolio	dexf	Dexfolio	f	\N	2023-05-24	2023-05-24
829d939b-bfbc-4e55-a195-82996bf5beee	dex-game	dxgm	DexGame	f	\N	2023-05-24	2023-05-24
3927c324-a370-4d28-97c1-864033835f33	dexioprotocol-v2	dexi	Dexioprotocol	f	\N	2023-05-24	2023-05-24
7855765b-77bc-496e-895f-817478a45a78	dexira	dex	dexIRA	f	\N	2023-05-24	2023-05-24
44ec6184-66d4-45bf-ad6b-f8c566f43d49	dexit-finance	dxt	Dexit Network	f	\N	2023-05-24	2023-05-24
f4348c2d-f702-4746-8451-ac3343a7a30d	dexkit	kit	DexKit	f	\N	2023-05-24	2023-05-24
6374e6b6-0b95-49a2-aef8-5fc24552fab0	dexlab	dxl	Dexlab	f	\N	2023-05-24	2023-05-24
aa017866-81fd-49a6-b612-efaef652378c	dexo	dexo	DEXO	f	\N	2023-05-24	2023-05-24
e498b2ce-fa18-4f19-a64b-14a271fcc923	dexpad	dxp	DexPad	f	\N	2023-05-24	2023-05-24
0b043dad-f0f6-460a-a51f-389f5f2ea229	dexpools	dxp	Vela Exchange	f	\N	2023-05-24	2023-05-24
0228a5e3-a976-4274-93d6-38ea8fefaf9a	dexshare	dexshare	dexSHARE	f	\N	2023-05-24	2023-05-24
d3e47b6a-a304-44f8-8e3a-b1772123214d	dexsport	desu	Dexsport	f	\N	2023-05-24	2023-05-24
38c4e568-2d84-4cb6-a8bb-c90988f7365d	dextf	dextf	Domani Protocol	f	\N	2023-05-24	2023-05-24
ffa59bb2-f17a-4d87-b9d5-dc28bf85f376	dextools	dext	DexTools	f	\N	2023-05-24	2023-05-24
8f9d6255-21f9-4937-a053-cbc34c9a12e6	eron	eron	ERON	f	\N	2023-05-24	2023-05-24
1cf0c598-ea1d-49ca-af2a-4073e5d0295b	dex-trade-coin	dxc	Dex-Trade Coin	f	\N	2023-05-24	2023-05-24
c28bef0c-3e2b-40b6-b0a7-bfd8386446d0	dextro	dxo	Dextro	f	\N	2023-05-24	2023-05-24
ea2e9bad-8352-421b-b343-0f96dfb5db99	dexwallet	dwt	DexWallet	f	\N	2023-05-24	2023-05-24
85db3afc-9b77-40f0-85be-fccb45e2c8e0	dfe-finance	dfe	DFE.Finance	f	\N	2023-05-24	2023-05-24
b2fe61a4-2d0e-401d-ac84-22e6241e834e	dfohub	buidl	dfohub	f	\N	2023-05-24	2023-05-24
aa13e78a-2fe8-4758-909f-2c3352855915	dforce-token	df	dForce	f	\N	2023-05-24	2023-05-24
6ae1a61d-8eab-4279-8d1a-54b0bca936a1	dfs-mafia	dfsm	DFS Mafia V2	f	\N	2023-05-24	2023-05-24
78b5436a-ad14-4f01-9f28-08b60985b03a	dfuk	dfuk	DFUK	f	\N	2023-05-24	2023-05-24
d1cad413-4eb5-449a-a67f-f7b32becc4a1	dfund	dfnd	dFund	f	\N	2023-05-24	2023-05-24
b62ae6ce-46b7-42b5-90c0-1bda855915f0	dfx-finance	dfx	DFX Finance	f	\N	2023-05-24	2023-05-24
41b1b38a-83da-4945-8aad-1a2b8e98652f	dfyn-network	dfyn	Dfyn Network	f	\N	2023-05-24	2023-05-24
ddf405cd-d2f2-48f8-91d6-c6345f47206a	dgnapp-ai	degai	DGNAPP.AI	f	\N	2023-05-24	2023-05-24
0d25d206-ac93-476e-90be-3c52e61b5f67	dgpayment	dgp	DGPayment	f	\N	2023-05-24	2023-05-24
d0058115-9784-42db-9a6f-ab0573c14610	dhabicoin	dbc	Dhabicoin	f	\N	2023-05-24	2023-05-24
50b420a0-d2b9-438c-8ac0-9a7d1eaac5b9	dhealth	dhp	dHealth	f	\N	2023-05-24	2023-05-24
25574110-ddb3-423f-902d-4545e432ebcf	dhedge-dao	dht	dHEDGE DAO	f	\N	2023-05-24	2023-05-24
3cd34032-6292-411e-9197-ed669ae17e4f	dia-data	dia	DIA	f	\N	2023-05-24	2023-05-24
b4c05356-55e0-4a72-89a2-bd057439f9e0	diamond	dmd	Diamond	f	\N	2023-05-24	2023-05-24
02216cbe-1464-42a9-9175-9672179f20e2	diamond-boyz-coin	dbz	Diamond Boyz Coin	f	\N	2023-05-24	2023-05-24
5f75d69d-30b2-48ba-a8ff-d0bc0fecfccc	diamond-coin	diamond	Diamond Coin	f	\N	2023-05-24	2023-05-24
436bc732-c09c-4f33-be97-ddd54855776b	diamond-launch	dlc	Diamond Launch	f	\N	2023-05-24	2023-05-24
b135df95-cc7d-4f00-9feb-aad8c93a1638	diamond-love	love	Diamond Love	f	\N	2023-05-24	2023-05-24
74e83799-13ea-48cd-b645-fdb5ea6d8889	diamond-xrpl	diamond	Diamond XRPL	f	\N	2023-05-24	2023-05-24
b12b7c51-a287-4882-b5dc-3eb2a3c3843a	dibs-share	dshare	Dibs Share	f	\N	2023-05-24	2023-05-24
6a1817e0-5aa2-430a-a8cc-68d8398a45b4	dice-kingdom	dk	Dice Kingdom	f	\N	2023-05-24	2023-05-24
9b2a169a-e817-4c6a-9fbc-415215e1f1ec	die-protocol	die	Die Protocol	f	\N	2023-05-24	2023-05-24
e5ae860b-a65e-412c-bc23-f4c52267daf2	diffusion	diff	Diffusion	f	\N	2023-05-24	2023-05-24
32f67358-0dfd-436e-8f7c-5ebc9440be56	dig-chain	dig	Dig Chain	f	\N	2023-05-24	2023-05-24
5983a28d-2df1-42b9-ac3d-fae88dbbf6e1	digg	digg	DIGG	f	\N	2023-05-24	2023-05-24
ca91f63c-e18a-4bc7-94e4-c05a0c445aa1	digible	digi	Digible	f	\N	2023-05-24	2023-05-24
2164f26a-f18f-4e6d-8ff7-122081103c77	digibyte	dgb	DigiByte	f	\N	2023-05-24	2023-05-24
79af4c13-c3a4-4615-9d99-8a40ba2f270c	digichain	digichain	Digichain Coin	f	\N	2023-05-24	2023-05-24
82e21801-d81b-47bf-b9a7-bd6f1937a0fd	digidinar-token	ddrt	DigiDinar Token	f	\N	2023-05-24	2023-05-24
6dc3807c-52e5-48a6-b0d7-d418680d91fa	digifinextoken	dft	DigiFinex	f	\N	2023-05-24	2023-05-24
6657157d-98ac-4f8a-ae65-1885be187b95	digihealth	dgh	Digihealth	f	\N	2023-05-24	2023-05-24
641af287-ea2b-4dad-9053-7ffb33a930f9	digimetaverse	dgmv	DigiMetaverse	f	\N	2023-05-24	2023-05-24
6c685b9e-f715-4a73-9e57-931f97e7c53a	digimon-rabbit	drb	Digimon Rabbit	f	\N	2023-05-24	2023-05-24
dfe67bc5-b049-46c6-89f9-55d5aac7cf43	digital-bank-of-africa	dba	Digital Bank of Africa	f	\N	2023-05-24	2023-05-24
f3753762-6423-4348-9b4d-d8c8e2dd8af1	digitalbits	xdb	DigitalBits	f	\N	2023-05-24	2023-05-24
e61d914e-477c-4dc0-9e49-d110ec5d1d40	digitalcoin	dgc	Digitalcoin	f	\N	2023-05-24	2023-05-24
0a4ce9de-fb53-4354-9e52-940d61867658	digitaldollar	dusd	DigitalDollar	f	\N	2023-05-24	2023-05-24
1b4c7157-13f4-4759-9c97-cddff396cc17	digital-files	difi	Digital Files	f	\N	2023-05-24	2023-05-24
d53cf94f-1f02-4834-83ac-686fd29fffd7	digital-financial-exchange	difx	Digital Financial Exchange	f	\N	2023-05-24	2023-05-24
b0db64a7-e732-4685-9889-18566bd8f5f9	digitalnote	xdn	DigitalNote	f	\N	2023-05-24	2023-05-24
085568fd-f3bc-41b8-969f-efe3e0a8728e	digital-rand	dzar	Digital Rand	f	\N	2023-05-24	2023-05-24
1141f5bc-d449-4a86-92e2-8cf5cd41abb5	digital-reserve-currency	drc	Digital Reserve Currency	f	\N	2023-05-24	2023-05-24
9254562d-4fa9-45fb-b680-750600d5b5bf	digital-standard-unit	dsu	Digital Standard Unit	f	\N	2023-05-24	2023-05-24
519b01dc-3964-4041-985e-36bcda7b49e1	digital-swis-franc	dsfr	Digital Swiss Franc	f	\N	2023-05-24	2023-05-24
01a06822-c03b-4089-bdcd-683d53b7e12c	digital-ticks	dtx	Digital Ticks	f	\N	2023-05-24	2023-05-24
1711b05c-606e-47af-8140-5fd83a0bed27	digital-trip-advisor	dta	Digital Trip Advisor	f	\N	2023-05-24	2023-05-24
a500c783-c4f7-45f6-9c14-9869ad0cc76a	digitex-futures-exchange	dgtx	Digitex	f	\N	2023-05-24	2023-05-24
3f59eae8-f909-4c58-9586-2e357113ac54	digits-dao	digits	Digits DAO	f	\N	2023-05-24	2023-05-24
ee8e4270-23e1-4765-85c0-74e457195fa0	digixdao	dgd	DigixDAO	f	\N	2023-05-24	2023-05-24
66eb8b50-4d1c-4bef-ba7f-1d4126391e6b	digix-gold	dgx	Digix Gold	f	\N	2023-05-24	2023-05-24
c3583cd9-1d3c-4d18-ba49-aba938a70b7b	dignity-gold	digau	Dignity Gold	f	\N	2023-05-24	2023-05-24
09cc8b4b-7f42-453d-b132-e1145faad343	dike	dike	Dike	f	\N	2023-05-24	2023-05-24
25966c7d-6347-4ec8-9c97-8f2e8a36b4d0	diminutive-coin	dimi	Diminutive Coin	f	\N	2023-05-24	2023-05-24
5d7ae70c-99c5-412b-a490-84d7e0bee92c	dimitra	dmtr	Dimitra	f	\N	2023-05-24	2023-05-24
8c65f12c-1391-41be-8895-1c783a701d4b	dimo	dimo	DIMO	f	\N	2023-05-24	2023-05-24
4cab0aea-f87d-4b47-be70-37be3e9546a9	dinamo-zagreb-fan-token	dzg	Dinamo Zagreb Fan Token	f	\N	2023-05-24	2023-05-24
597082d7-2e76-4a7c-aab5-2db6297f0ab5	dinastycoin	dcy	Dinastycoin	f	\N	2023-05-24	2023-05-24
37736f21-ca91-43d3-98a6-bf5977173116	dinero	din	Dinero	f	\N	2023-05-24	2023-05-24
e4a09000-45bf-49dc-885b-2ca6749954c4	dinerobet	dinero	Dinerobet	f	\N	2023-05-24	2023-05-24
b25464e1-317a-4086-a6e0-81837312a190	dinger-token	dinger	Dinger	f	\N	2023-05-24	2023-05-24
5b0ff982-fadc-4641-875b-0f4f9160bf18	dingocoin	dingo	Dingocoin	f	\N	2023-05-24	2023-05-24
1f610b94-809c-4d2e-8d4a-89c4c2ef01e7	dingo-token	dingo	Dingo	f	\N	2023-05-24	2023-05-24
a9058f1c-d00f-4530-bf83-5da7c92e777c	dino	dino	Dino	f	\N	2023-05-24	2023-05-24
7fb902a5-1238-4491-bf8e-14064955e53d	dinoegg	dinoegg	DINOEGG	f	\N	2023-05-24	2023-05-24
80fecaa1-b41a-4228-aeca-e8cb37f03dc3	dinolfg	dino	DinoLFG	f	\N	2023-05-24	2023-05-24
71030029-441f-43e5-9f08-3c1caca53b8c	dinoswap	dino	DinoSwap	f	\N	2023-05-24	2023-05-24
7696b6ea-7cbe-44f2-b0a0-4bfc9e79d1f5	dinox	dnxc	DinoX	f	\N	2023-05-24	2023-05-24
5dcda6b9-2edf-450d-b300-e5c55a0cc39c	dionpay	dion	Dionpay	f	\N	2023-05-24	2023-05-24
37c26269-7219-4477-9ebf-51394e8f2d00	disbalancer	ddos	disBalancer	f	\N	2023-05-24	2023-05-24
0395874c-eba2-403f-99ae-cfbff4b79e02	district0x	dnt	district0x	f	\N	2023-05-24	2023-05-24
7b6af4e3-2b3a-4d68-9c9f-e32f86e64f15	ditto-staked-aptos	stapt	Ditto Staked Aptos	f	\N	2023-05-24	2023-05-24
636e9f6c-c881-42d0-9477-1948dd5f434e	divergence-protocol	diver	Divergence Protocol	f	\N	2023-05-24	2023-05-24
d873dad3-c17a-4a2a-92d9-c3854a7d0613	diversified-staked-eth	dseth	Diversified Staked ETH	f	\N	2023-05-24	2023-05-24
8089068e-eed9-410d-a974-2bb46007ba3b	divi	divi	Divi	f	\N	2023-05-24	2023-05-24
72879c54-d7b2-477c-89d6-90ada82a589e	diviner-protocol	dpt	Diviner Protocol	f	\N	2023-05-24	2023-05-24
217ddcbe-1f79-430e-ae1a-a4b5653a4279	djed	djed	Djed	f	\N	2023-05-24	2023-05-24
576916d6-28c2-4d0a-9230-a6618609e68d	dkargo	dka	dKargo	f	\N	2023-05-24	2023-05-24
7a24bc3c-d6f3-4704-9ab5-ed069fb3d4c1	dkey-bank	dkey	DKEY Bank	f	\N	2023-05-24	2023-05-24
881bbb34-ba9c-4d32-b833-2226dfac3747	dlp-duck-token	duck	DLP Duck	f	\N	2023-05-24	2023-05-24
3f9e6b76-cae8-42c9-8bd0-6127d3fcbfd6	dmarket	dmt	DMarket	f	\N	2023-05-24	2023-05-24
13e0f2de-f75c-45ca-b15f-b3e8a6489357	dmd	dmd	DMD	f	\N	2023-05-24	2023-05-24
bbfd7379-ea9f-4303-8a62-03746663b9fa	dmm-governance	dmg	DMM: Governance	f	\N	2023-05-24	2023-05-24
b9d0c3f6-1f96-4edf-8c2f-e7583cf9d154	dmt-token	dmt	DMT	f	\N	2023-05-24	2023-05-24
2cf8fcde-5d5e-4333-8e26-d56a84d62579	dmz-token	dmz	DMZ	f	\N	2023-05-24	2023-05-24
14b3c0f6-91cd-43fb-9d21-8cfd234a00b1	dnaxcat	dxct	DNAxCAT	f	\N	2023-05-24	2023-05-24
8b9efe52-dbac-496e-b75a-d7f7f18bc85e	dobermann	dobe	Dobermann	f	\N	2023-05-24	2023-05-24
dd5ac8f3-d798-4a00-ad47-68d2e28dc868	dock	dock	Dock	f	\N	2023-05-24	2023-05-24
827dd785-7039-41c1-8951-28df6474989a	docuchain	dcct	DocuChain	f	\N	2023-05-24	2023-05-24
4e7757c3-26bd-4ef6-86f6-e17ab65b3b36	documentchain	dms	Documentchain	f	\N	2023-05-24	2023-05-24
4b769010-0dcb-4ad1-b0d7-7718a4d7fca7	dodo	dodo	DODO	f	\N	2023-05-24	2023-05-24
1e6e3419-b9da-44b5-ac1b-1bb128ba4b66	dodreamchain	drm	DoDreamChain	f	\N	2023-05-24	2023-05-24
f4f15c5c-edd0-4359-b285-0b0153371e4b	doex	doex	DOEX	f	\N	2023-05-24	2023-05-24
f4f66e5e-ae7e-486b-a0b3-56863b39a2eb	dogami	doga	Dogami	f	\N	2023-05-24	2023-05-24
62829986-6b2b-4bc5-a267-9d41070ec975	dog-boss	dogboss	Dog Boss	f	\N	2023-05-24	2023-05-24
c4d924ee-94c1-4611-9778-89bd52ffb976	dogcoin	dogs	Dogcoin	f	\N	2023-05-24	2023-05-24
011bfeaf-2c5a-4871-82dc-6f55985d5a20	dog-collar	collar	Dog Collar	f	\N	2023-05-24	2023-05-24
04505a89-49f2-4296-9ca1-32ef1ed8aeca	dogearmy	dogrmy	DogeArmy	f	\N	2023-05-24	2023-05-24
860de775-bddd-40bb-bc3c-d18931fdd9b4	doge-blue	dogeblue	Doge Blue	f	\N	2023-05-24	2023-05-24
8b77fb38-d729-4ab7-b7ff-657186dd7b29	dogebonk	dobo	DogeBonk	f	\N	2023-05-24	2023-05-24
6a61ca81-189a-449f-969b-06541f10551c	dogecash	dogec	DogeCash	f	\N	2023-05-24	2023-05-24
2a177ec7-9ccd-47cd-92b0-c33641dceb99	doge-ceo	dogeceo	Doge CEO	f	\N	2023-05-24	2023-05-24
de5081b7-0990-4dac-a818-424d291456fe	dogeceomeme	dogeceo	DOGE CEO AI	f	\N	2023-05-24	2023-05-24
f683da1c-61f0-45ff-bae2-651f22328a2f	dogechain	dc	Dogechain	f	\N	2023-05-24	2023-05-24
6bb46357-bea6-4c84-9e0d-e71925ff1ef8	dogecoin	doge	Dogecoin	f	\N	2023-05-24	2023-05-24
8fdd5bfe-cd01-43df-a381-566b7d011e54	dogecoin-2	doge2	Dogecoin 2.0	f	\N	2023-05-24	2023-05-24
a3f7512f-9bdb-4949-9620-e7a44e0508ee	dogecola	dogecola	DOGECOLA	f	\N	2023-05-24	2023-05-24
80986018-480d-47de-b05e-21ad0562e253	dogecube	dogecube	DogeCube	f	\N	2023-05-24	2023-05-24
b48cf679-25e8-4e91-acad-ae18e30330dc	dogedi	dogedi	DOGEDI	f	\N	2023-05-24	2023-05-24
e187329a-0454-4f2b-829c-658eced4e3f9	doge-digger	dogedigger	Doge Digger	f	\N	2023-05-24	2023-05-24
ece64d79-5799-4459-a889-9b5f9dee6c3e	dogedragon	dd	DogeDragon	f	\N	2023-05-24	2023-05-24
4f83be59-b276-4b8f-9f04-e7d82a58b4ff	doge-eat-doge	omnom	Doge Eat Doge	f	\N	2023-05-24	2023-05-24
d9c58bb1-fe7f-43bf-8c70-00bf4234e6b3	doge-farm	dof	Doge Farm	f	\N	2023-05-24	2023-05-24
cd46163b-55e6-4610-9970-9098043e0412	doge-floki-coin	dofi	Doge Floki Coin	f	\N	2023-05-24	2023-05-24
4ff30cfd-5e46-41d6-bbb2-cbad63262f20	dogefood	dogefood	DogeFood	f	\N	2023-05-24	2023-05-24
5dcf5d4e-b6c1-46f8-8831-28af8be09e94	dogegayson	goge	Goge DAO	f	\N	2023-05-24	2023-05-24
9aab81db-79df-4e88-a188-a07f9b986040	dogegf	dogegf	DogeGF	f	\N	2023-05-24	2023-05-24
bb27c92a-ce4c-47d5-a2cf-c100f4c41d0f	dogegrow	dgr	DogeGrow	f	\N	2023-05-24	2023-05-24
29daf790-17ce-472d-973a-014eff8f2399	doge-inu	dinu	Doge Inu	f	\N	2023-05-24	2023-05-24
bea9b9d6-70e6-45ce-822e-9ade929bb776	doge-kaki	kaki	Doge KaKi	f	\N	2023-05-24	2023-05-24
84881d2a-b179-4774-afda-b43fa4f18c9d	dogeking	dogeking	DogeKing	f	\N	2023-05-24	2023-05-24
d9a4a421-58e7-4087-ae44-e1ba2cb983a7	dogelana	dgln	Dogelana	f	\N	2023-05-24	2023-05-24
cc8182f2-382f-45e0-8b53-64d67b41dcb5	dogelon-classic	elonc	Dogelon Classic	f	\N	2023-05-24	2023-05-24
b1227b32-96c8-48ee-888e-9fed9d1e0bab	dogelon-mars	elon	Dogelon Mars	f	\N	2023-05-24	2023-05-24
2f077638-039d-494d-97df-c9096afcc682	dogelon-mars-wormhole	elon	Dogelon Mars (Wormhole)	f	\N	2023-05-24	2023-05-24
f8ca9ea9-c4a0-4ef7-b17d-141c492a0719	doge-lumens	dxlm	DogeLumens	f	\N	2023-05-24	2023-05-24
14fcaa0d-6a89-402d-9862-d85c6522da9f	dogemon-go	dogo	DogemonGo	f	\N	2023-05-24	2023-05-24
5c38e950-e099-4262-9903-adc0beacd04d	dogemoon	dogemoon	Dogemoon	f	\N	2023-05-24	2023-05-24
dbf966a0-7b1d-40d3-a7e3-9ee47817fddd	dogens	dogens	Dogens	f	\N	2023-05-24	2023-05-24
80db4bd2-4bb8-4417-9561-1a30aa9ec7d6	dogeon	don	Dogeon	f	\N	2023-05-24	2023-05-24
ba7bc553-cead-4890-a3ce-6cb4224c5c90	dogepad-finance	dpf	Dogepad Finance	f	\N	2023-05-24	2023-05-24
8761e73d-ff26-425f-b60c-b25964c47f0b	doge-protocol	dogep	Doge Protocol	f	\N	2023-05-24	2023-05-24
218e6c15-6a56-4f31-b9b3-52655c52ddb9	doge-pup-token	dogepup	Doge Pup	f	\N	2023-05-24	2023-05-24
83c5d3f5-7532-40f6-a94d-8a130ec75295	dogeshiba	doshib	DogeShiba	f	\N	2023-05-24	2023-05-24
d8c592d2-21ee-4b72-a54c-70f72b5f68ed	dogeshrek	dogeshrek	DogeShrek	f	\N	2023-05-24	2023-05-24
fddd8c91-6b38-4b15-8657-167c657c0b54	dogeswap	doges	Dogeswap	f	\N	2023-05-24	2023-05-24
8bd94157-9bbd-463a-b00b-ef24a319c071	doge-token	doget	Doge Token	f	\N	2023-05-24	2023-05-24
d3ba26ea-bc21-458c-9c89-e1bd209cf84a	dogetrend	dogetrend	DogeTrend	f	\N	2023-05-24	2023-05-24
39bbf7e3-2b72-4cd7-a451-0ede29551a4d	doge-tv	$dgtv	Doge-TV	f	\N	2023-05-24	2023-05-24
1fd6d125-4219-4c41-9fbd-a2f265b5908c	dogewhale	dogewhale	Dogewhale	f	\N	2023-05-24	2023-05-24
eb5cd3e9-9557-4ff8-885e-871d02d7e2b6	dogeyield	dogy	DogeYield	f	\N	2023-05-24	2023-05-24
018758c4-024d-4557-946b-6782d4350676	dogey-inu	dinu	Dogey-Inu	f	\N	2023-05-24	2023-05-24
ef429b86-71f0-4f28-84f0-f5353328445d	doge-zilla	dogez	DogeZilla Token	f	\N	2023-05-24	2023-05-24
7a76e7e0-a67d-494d-8272-56289d73c642	dogezilla-ai	dai	DogeZilla Ai	f	\N	2023-05-24	2023-05-24
88c065de-e165-407e-82ac-429603e4617e	doggo	doggo	DOGGO	f	\N	2023-05-24	2023-05-24
87cb7262-9bda-40ac-8184-7b7efa8fc426	doggy	doggy	Doggy	f	\N	2023-05-24	2023-05-24
002cd202-39a7-4252-b427-88591a555ed6	doggystyle-coin	dsc	DoggyStyle Coin	f	\N	2023-05-24	2023-05-24
a2aaccb2-3aac-443f-91d7-631f419bed4b	dogira	dogira	Dogira	f	\N	2023-05-24	2023-05-24
acc6d074-7972-4c05-9051-1199bb06e1b6	doglaikacoin	dlc	Doglaikacoin	f	\N	2023-05-24	2023-05-24
66ca1103-5169-4013-81e4-a4fce7fb8875	dog-landing-on-the-moon	dogmoon	Dog Landing On The Moon	f	\N	2023-05-24	2023-05-24
88b7959e-979d-4b32-9bcf-23c9affca8b8	dog-ordinals	$dog	$DOG (Ordinals)	f	\N	2023-05-24	2023-05-24
5620ea79-4056-42ef-b9cf-e80e454a7cf1	dogpad-finance	dogpad	DogPad Finance	f	\N	2023-05-24	2023-05-24
afcc2b85-be68-4d0e-b516-532929457df5	dogs-kombat	dk	Dogs Kombat	f	\N	2023-05-24	2023-05-24
44988000-bdd1-420f-912f-a85cf3443747	dogsofelon	doe	Dogs Of Elon	f	\N	2023-05-24	2023-05-24
244a5a22-2444-45d7-88d9-09b03a3e81ee	dogswap-token	dog	Dogeswap (HECO)	f	\N	2023-05-24	2023-05-24
ee950961-334a-4676-aeaf-00b1dfd0fb3f	dog-tag	tag	Dog Tag	f	\N	2023-05-24	2023-05-24
8d4f2326-f2f6-4b6c-ab17-21758f0856ce	dogtick	dogtic	DogTick	f	\N	2023-05-24	2023-05-24
2149f070-41cd-44df-a2cf-c8fb78081fb3	dogu-inu	dogu	Dogu Inu	f	\N	2023-05-24	2023-05-24
528f82d3-d5f0-45f0-b5cc-f2de552da78e	dogyrace	dor	DogyRace	f	\N	2023-05-24	2023-05-24
5806b4af-973a-4067-8b56-f457096d5f96	dohrnii	dhn	Dohrnii	f	\N	2023-05-24	2023-05-24
beb88e0a-c3e4-44c3-abff-bca9b194c7fe	doichain	doi	Doichain	f	\N	2023-05-24	2023-05-24
8bbf98ed-4179-4689-8f4e-bd8f9792c62d	dojo	dojo	DOJO	f	\N	2023-05-24	2023-05-24
8154be46-e8a8-4d53-b418-85b2ac876f2f	dojo-supercomputer	$dojo	Dojo Supercomputer	f	\N	2023-05-24	2023-05-24
1fe4fe32-f664-4eb3-8f93-318759612cff	doke-inu	doke	Doke Inu	f	\N	2023-05-24	2023-05-24
57d6f281-b39c-4914-a0f4-57173d33de76	doki-doki-finance	doki	Doki Doki	f	\N	2023-05-24	2023-05-24
4008e829-dc4c-4059-94e9-a2471746963c	dola-borrowing-right	dbr	DOLA Borrowing Right	f	\N	2023-05-24	2023-05-24
356c3bf7-ceb1-4737-925b-a4ac5b9476db	dola-usd	dola	DOLA	f	\N	2023-05-24	2023-05-24
3425fc6f-3de4-46d0-95f0-96c36c887451	dollarmoon	dmoon	DollarMoon	f	\N	2023-05-24	2023-05-24
5ae334b6-fa98-4984-b6e8-dab71ebf8093	domi	domi	Domi	f	\N	2023-05-24	2023-05-24
b0385a8e-3f94-47ad-a4db-981123ac3b83	dominator-domains	domdom	Dominator Domains	f	\N	2023-05-24	2023-05-24
42eef7fa-2b4b-44d7-a420-3fd1920b8322	dominica-coin	dmc	Dominica Coin	f	\N	2023-05-24	2023-05-24
994ba864-453a-4646-b6c3-2a73dc5edb73	dominium-2	dom	Dominium	f	\N	2023-05-24	2023-05-24
499195e2-db93-45c0-a30c-671991b6484a	domo	domo	DOMO	f	\N	2023-05-24	2023-05-24
a4974562-bec6-46c4-96cf-2f0c969ca852	domraider	drt	DomRaider	f	\N	2023-05-24	2023-05-24
6bb50f57-6d12-4631-a893-7b8e3f9b9515	don-key	don	Don-key	f	\N	2023-05-24	2023-05-24
ca8bd216-8f51-442f-a9a7-955ecef9c2d6	dons	dons	The Dons	f	\N	2023-05-24	2023-05-24
be34f992-7f92-445a-8417-e8c90e29066d	don-t-buy-inu	dbi	Don't Buy Inu	f	\N	2023-05-24	2023-05-24
6cd7e9bc-2f57-4fb4-86b5-0ed72733006d	donut	donut	Donut	f	\N	2023-05-24	2023-05-24
00522fe0-1d89-40a3-b2f9-9a4a1de67f09	doomer-ai	doomer	Doomer.AI	f	\N	2023-05-24	2023-05-24
bb643709-683d-46e2-b965-f40d5dcc6397	doom-hero-dao	dhd	Doom Hero Dao	f	\N	2023-05-24	2023-05-24
57fe1d26-c39d-4a5a-a925-64fb076d1373	doom-hero-game	dhg	Doom Hero Game	f	\N	2023-05-24	2023-05-24
04f56096-15f3-4914-a594-ffaad8b90996	doont-buy	dbuy	Doont Buy	f	\N	2023-05-24	2023-05-24
e78ca793-f385-487b-8b4a-5c7ddd762234	dope-wars-paper	paper	Dope Wars Paper	f	\N	2023-05-24	2023-05-24
50e23ee8-691c-41c8-90d8-54f504d77196	dopewarz	dwz	DopeWarz	f	\N	2023-05-24	2023-05-24
1659cd8c-0060-4811-ad1b-e2cdaa3f3bc5	dopex	dpx	Dopex	f	\N	2023-05-24	2023-05-24
ac782845-e18b-43fe-850f-618a80087aab	dopex-rebate-token	rdpx	Dopex Rebate	f	\N	2023-05-24	2023-05-24
5f4d4857-3664-4f31-98b8-fa5bbc090547	dora-factory	dora	Dora Factory	f	\N	2023-05-24	2023-05-24
66eed13b-75a3-4e22-a040-f031415711b1	doragonland	dor	DoragonLand	f	\N	2023-05-24	2023-05-24
382caeb2-cc11-4a3f-b55b-62397484cb6a	doren	dre	DoRen	f	\N	2023-05-24	2023-05-24
9012372d-00d1-4ef9-af1e-d401e40ade32	dos-chain	dos	DOS Chain	f	\N	2023-05-24	2023-05-24
c5af1281-5426-4e7b-88bd-fda7e8b0dfd4	dose-token	dose	DOSE	f	\N	2023-05-24	2023-05-24
e39754b5-6c94-4163-809e-efab084432ef	dos-network	dos	DOS Network	f	\N	2023-05-24	2023-05-24
5e8109b9-4550-41aa-aae6-e7d1a2ef917a	dot-dot-finance	ddd	Dot Dot Finance	f	\N	2023-05-24	2023-05-24
05ab9eea-4e63-4d82-8bf2-ec976d567d56	dot-finance	pink	Dot Finance	f	\N	2023-05-24	2023-05-24
d8b41af7-a35a-48d0-8152-5ed089c2aada	dotlab	dtl	Dotlab	f	\N	2023-05-24	2023-05-24
dea06463-baf8-4719-990f-ac6c3372f77f	dotmoovs	moov	dotmoovs	f	\N	2023-05-24	2023-05-24
d268f940-5fd5-4f62-b6fc-d32bc98dc1e3	dot-names	dns	Dot Names	f	\N	2023-05-24	2023-05-24
89c2abb0-116b-470c-9f68-63f298f9dd6b	dotoracle	dto	DotOracle	f	\N	2023-05-24	2023-05-24
5894af91-6a90-4afd-8816-fcf1c863319d	dotori	dtr	Dotori	f	\N	2023-05-24	2023-05-24
93bf1de8-4186-47b2-840c-a510c761dea0	doubledice-token	dodi	DoubleDice	f	\N	2023-05-24	2023-05-24
65aaccaf-c9c9-4f93-9480-ff52125b3ea8	double-swap-token	dst	Double Swap Token	f	\N	2023-05-24	2023-05-24
c4fd3afe-8ad9-4ce5-9523-55d46eaf93ae	doubloon	dbl	Doubloon	f	\N	2023-05-24	2023-05-24
d4952533-b690-4886-ab45-43b2a14c0e50	dough	dough	Dough	f	\N	2023-05-24	2023-05-24
363742dc-b2dd-44cc-b692-497657fe0be5	dovu	dov	Dovu	f	\N	2023-05-24	2023-05-24
6152edda-ba9d-4637-a970-3697d10edabd	dpad-finance	dpad	Dpad Finance	f	\N	2023-05-24	2023-05-24
f9686ab5-1102-4c78-b29f-663a36a678f2	dprating	rating	DPRating	f	\N	2023-05-24	2023-05-24
58d19884-39ba-4ffc-a251-ed4b0afc86dc	dps-doubloon	dbl	DPS Doubloon [OLD]	f	\N	2023-05-24	2023-05-24
eed3d6d1-24c3-4bcf-ad83-db0ee2525898	dps-doubloon-2	dbl	DPS Doubloon	f	\N	2023-05-24	2023-05-24
a6bd0b51-478e-4438-b6d0-4a38423943ca	dps-rum-2	rum	DPS Rum	f	\N	2023-05-24	2023-05-24
b043e98d-887e-4175-a996-2aa406178981	dps-treasuremaps-2	tmap	DPS TreasureMaps	f	\N	2023-05-24	2023-05-24
ef60394b-125c-4700-a0b4-039fd3c940ec	drac-network	drac	DRAC Network	f	\N	2023-05-24	2023-05-24
39764633-dd9c-46d6-b640-19909a35f2df	dracoomaster	bas	DracooMaster	f	\N	2023-05-24	2023-05-24
1c0ee49e-cda8-4d5c-a65d-f5e3f22d7c78	drac-ordinals	drac	DRAC (Ordinals)	f	\N	2023-05-24	2023-05-24
24fa54d7-55c3-4a86-a99b-996cf041be5c	dracula	drc	Dracula	f	\N	2023-05-24	2023-05-24
ae2cf8cd-96d6-4519-8c97-2a8fee18f5aa	draggable-aktionariat-ag	daks	Draggable Aktionariat AG	f	\N	2023-05-24	2023-05-24
7cbf84c0-0764-48c8-a9f2-56b5d156a521	dragoma	dma	Dragoma	f	\N	2023-05-24	2023-05-24
8a9c1e56-9b48-4d16-8a76-f93673572371	dragon-arena	dra	Dragon Arena	f	\N	2023-05-24	2023-05-24
f3344d73-3b24-4b54-9f1c-1d335a71a06f	dragonbite	bite	DragonBite	f	\N	2023-05-24	2023-05-24
351e8e7b-9827-44d0-ac98-6063d5781532	dragonchain	drgn	Dragonchain	f	\N	2023-05-24	2023-05-24
ca3754d3-8c40-4e67-a11e-e5f33f967a3f	dragon-crypto-argenti	dcar	Dragon Crypto Argenti	f	\N	2023-05-24	2023-05-24
49efefe2-9c7e-492a-bf50-f65a12f65fb3	dragon-crypto-aurum	dcau	Dragon Crypto Aurum	f	\N	2023-05-24	2023-05-24
2c7e1e0c-c464-4967-ba38-9304a62dbc77	dragon-fly	drfly	Dragon Fly	f	\N	2023-05-24	2023-05-24
b63640c8-523a-480a-89be-c01a49b0e2b8	dragonking	dragonking	DragonKing	f	\N	2023-05-24	2023-05-24
c6078112-2926-4e80-b915-2c17eb6246aa	dragon-mainland-shards	dms	Dragon Mainland Shards	f	\N	2023-05-24	2023-05-24
72bf3216-4712-450d-b059-f1abb2262cee	dragonmaster-token	dmt	DragonMaster	f	\N	2023-05-24	2023-05-24
60d765b7-3b32-4f0a-9826-0060f4786a4f	dragonmaster-totem	totem	DragonMaster Totem	f	\N	2023-05-24	2023-05-24
3268894e-3afe-4693-bd31-b1a5974ff6f3	dragonmoon	dmoon	DragonMoon	f	\N	2023-05-24	2023-05-24
f7bb97c3-3375-4007-9989-777b9660d2a5	dragon-soul-token	dst	Dragon Soul Token	f	\N	2023-05-24	2023-05-24
301edb06-b3ec-4d53-aa6e-48d513cf6393	dragons-quick	dquick	Dragon's Quick	f	\N	2023-05-24	2023-05-24
edbe7057-81ad-438e-9b8e-97be85095200	dragonvein	dvc	DragonVein	f	\N	2023-05-24	2023-05-24
480fed0a-0e7d-4f09-bf0d-aa5369f56594	dragon-war	draw	Dragon War	f	\N	2023-05-24	2023-05-24
5aa36dfc-bcf0-45ad-8208-1b85d29ff6dc	draken	drk	Draken	f	\N	2023-05-24	2023-05-24
d18a1de5-e745-413d-8411-d2a3ad2e0d32	drawshop-kingdom-reverse-joystick	joy	Drawshop Kingdom Reverse Joystick	f	\N	2023-05-24	2023-05-24
067748cc-5861-4b4d-b441-2e9bd4e181ea	drc-mobility	drc	DRC Mobility	f	\N	2023-05-24	2023-05-24
718382dc-38e3-479b-a867-3601c19b3ace	dream-machine-token	dmt	Dream Machine Token	f	\N	2023-05-24	2023-05-24
98878d27-9dd5-4bcc-80f6-10dae96e1819	dreampad-capital	dreampad	DreamPad Capital	f	\N	2023-05-24	2023-05-24
c8c3848e-0a8e-4a4a-9c60-a2aae7d4e0e2	dreamr-platform-token	dmr	Dreamr Platform	f	\N	2023-05-24	2023-05-24
40bc8fb4-6b45-4c3a-9aa8-435e3b32d840	dreamscoin	dream	DreamsCoin	f	\N	2023-05-24	2023-05-24
5e4913f0-a0dc-48bb-97b7-07123a1d4cfd	dreams-quest	dreams	Dreams Quest	f	\N	2023-05-24	2023-05-24
08721c37-562f-4fb7-9fd2-8925738cd0f1	dream-token	dream	Dream	f	\N	2023-05-24	2023-05-24
4129e07a-fd84-4e86-9ff5-eb9c62009064	dreamverse	dv	Dreamverse	f	\N	2023-05-24	2023-05-24
ee27e41b-04a8-4e8f-a970-9bbc06672cbb	drep-new	drep	Drep	f	\N	2023-05-24	2023-05-24
95e3ba29-4839-4fd9-801a-746f5114d959	drife	drf	Drife	f	\N	2023-05-24	2023-05-24
8c9f8523-cd51-4597-b472-05fe9d19778a	dripdropz	drip	DripDropz	f	\N	2023-05-24	2023-05-24
3f4dd273-54e6-4431-9e3e-7e7119d900d1	drip-network	drip	Drip Network	f	\N	2023-05-24	2023-05-24
3cbd817d-0102-4beb-b715-09cc50f71559	drive-crypto	drivecrypto	Drive Crypto	f	\N	2023-05-24	2023-05-24
1d828685-e1fa-4b62-bcc8-d95d048bfde8	drivenx	dvx	DRIVENx	f	\N	2023-05-24	2023-05-24
84065043-2e6b-4fe7-bfe6-7e1b6836f2ee	droparb	drop	DropArb	f	\N	2023-05-24	2023-05-24
22718b2d-37b5-4ddc-9b48-c4fed6a3e234	drops-ownership-power	dop	Drops Ownership Power	f	\N	2023-05-24	2023-05-24
80684d2a-af60-4880-bf42-a09dfa6472a1	drunk-robots	metal	Drunk Robots	f	\N	2023-05-24	2023-05-24
f62bd524-bc29-48b3-9e14-f26f195cb168	drunk-skunks-drinking-club	stink	Drunk Skunks Drinking Club	f	\N	2023-05-24	2023-05-24
213e386f-5eee-46c6-bb67-de405e928d78	dsc-mix	mix	DSC Mix	f	\N	2023-05-24	2023-05-24
e72833f8-cadb-4da7-b187-448b9fb3d035	dshares	dshare	DShares	f	\N	2023-05-24	2023-05-24
94fe936b-9004-4a26-ae3f-c42efb1b20a1	d-shop	dp	D-SHOP	f	\N	2023-05-24	2023-05-24
8a9add42-b98e-41c0-b245-bf75d575df2d	dsquared-finance	dsq	Dsquared.finance	f	\N	2023-05-24	2023-05-24
0fa39350-e8e1-40b7-a315-d7b1b2a20121	dsun-token	dsun	Dsun Token	f	\N	2023-05-24	2023-05-24
d32df268-8092-4d61-8452-693686e89df3	dtng	dtng	DTNG	f	\N	2023-05-24	2023-05-24
86238122-84cb-42e1-b47a-a3c9e27dcc8b	dtools	dtools	DogeTools	f	\N	2023-05-24	2023-05-24
e9a27ac3-d123-4ac6-8ff1-046845795983	dtravel	trvl	TRVL	f	\N	2023-05-24	2023-05-24
2c3d1ee3-44a1-4607-b8fa-83b27dd65525	dtsla	dtsla	Tesla Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
c79bf778-c542-4f2c-9bb9-af32aeaf3105	dtube-coin	dtube	Dtube Coin	f	\N	2023-05-24	2023-05-24
ad8143af-86e5-4673-824d-846ad3abc753	dual-finance	dual	Dual Finance	f	\N	2023-05-24	2023-05-24
8622ab50-55d5-4767-b845-43a14d54c940	dua-token	dua	DUA Token	f	\N	2023-05-24	2023-05-24
29bf09c3-1eb2-49de-b1bc-82a013e7ba82	dubbz	dubbz	Dubbz	f	\N	2023-05-24	2023-05-24
d803e3bc-39b8-4c74-a1db-66e9ccefd8de	ducatus	ducx	DucatusX	f	\N	2023-05-24	2023-05-24
adac25f2-d71a-4c78-8d00-7bce73f08e24	duckdaodime	ddim	DuckDaoDime	f	\N	2023-05-24	2023-05-24
96722986-19c2-4197-8bc5-0a1b1e86cc0c	duckduck-token	duck	DuckDuck	f	\N	2023-05-24	2023-05-24
cc770c94-69f7-4be7-813c-1d4c2d941d99	duckereum	ducker	Duckereum	f	\N	2023-05-24	2023-05-24
0afa9fce-3ee5-4b98-866c-a4ccb307bbfa	duckie-land-multi-metaverse	mmeta	Duckie Land Multi Metaverse	f	\N	2023-05-24	2023-05-24
c88b8a50-ef92-4675-957a-b9b305a28177	duckies	duckies	Yellow Duckies	f	\N	2023-05-24	2023-05-24
e971461d-1e4f-414c-9005-3c36e2237934	duck-punkz-universe-floor-index	dpunkz	Duck Punkz Universe Floor Index	f	\N	2023-05-24	2023-05-24
44711138-d401-4b0e-b9e4-37b144083f24	ducks	ducks	Ducks	f	\N	2023-05-24	2023-05-24
f17873af-87c3-4620-b0f0-e8e8d3117aad	duckycoinai	duckyai	DuckyCoinAI	f	\N	2023-05-24	2023-05-24
585ae847-7acc-46bf-9c82-9463c661cd85	duckydefi	degg	DuckyDefi	f	\N	2023-05-24	2023-05-24
7b2e692d-f83d-489f-913a-fc812aea9783	dude	dude	DuDe	f	\N	2023-05-24	2023-05-24
abea8dd4-8ca7-4c8a-80bc-1104cac42065	duel-network-2	duel	Duel Network	f	\N	2023-05-24	2023-05-24
c689879e-bcf3-4bed-8714-08087fe2026f	duet-protocol	duet	Duet Protocol	f	\N	2023-05-24	2023-05-24
49cfb04a-c733-4aab-8636-ca46e9f6213b	duke-inu-token	duke	Duke Inu	f	\N	2023-05-24	2023-05-24
878f4904-d442-4244-b452-fc2a2f89b8b3	dungeonswap	dnd	DungeonSwap	f	\N	2023-05-24	2023-05-24
363cfa51-a5e5-4051-baa4-14ed955f8fa1	dungeon-token	geon	Triathon	f	\N	2023-05-24	2023-05-24
99285553-9745-4428-9035-72b947f3e150	dusd	dusd	DUSD	f	\N	2023-05-24	2023-05-24
78d5ff67-743f-49f3-8125-333c2d2faa4e	dusk-network	dusk	DUSK Network	f	\N	2023-05-24	2023-05-24
1062fcf2-0ec1-4a2f-86cd-f063bcfd3890	dust-protocol	dust	DUST Protocol	f	\N	2023-05-24	2023-05-24
401e0fdb-b3c8-4b2f-a10a-5e9bb7e5b611	dux	dux	DUX	f	\N	2023-05-24	2023-05-24
396fa4ae-7722-4613-b9b9-f05c870370c0	dvision-network	dvi	Dvision Network	f	\N	2023-05-24	2023-05-24
0319d9dd-ce3b-4a45-aa1d-f647329bd45c	dxcad	dxcad	dXCAD	f	\N	2023-05-24	2023-05-24
5ae9c212-e473-4d68-80e5-224f7fbb9898	dxchain	dx	DxChain	f	\N	2023-05-24	2023-05-24
bacab066-3902-443d-bc28-b8dc19c6ab8c	dxdao	dxd	DXdao	f	\N	2023-05-24	2023-05-24
1481e7a8-41cd-4013-959f-4f8890bfd3cd	dxsale-network	sale	DxSale Network	f	\N	2023-05-24	2023-05-24
f055c4e1-2b32-4910-9fea-12955078ba9e	dx-spot	dxs	Dx Spot	f	\N	2023-05-24	2023-05-24
6e1b0af0-f15c-4933-84de-aa6c4d46ac54	dxy-finance	dxy	DXY Finance	f	\N	2023-05-24	2023-05-24
20a62334-a342-4975-bb42-33e7d39cb777	dydx	dydx	dYdX	f	\N	2023-05-24	2023-05-24
7f2d5f4a-edaf-4e02-8b3f-b28d4ffd04e1	dydx-wormhole	dydx	dYdX (Wormhole)	f	\N	2023-05-24	2023-05-24
4066ab77-8ba9-48c2-b737-55b1d0a799be	dymmax	dmx	Dymmax	f	\N	2023-05-24	2023-05-24
de6a142a-ddf4-4a58-ba04-2cc476655376	dynamic-finance	dyna	Dynamic Finance	f	\N	2023-05-24	2023-05-24
94ae74e1-c83d-46b0-9d4a-278b946d013a	dynamic-set-dollar	dsd	Dynamic Set Dollar	f	\N	2023-05-24	2023-05-24
9f5a1348-22bb-49af-b10d-d7f076249e2b	dynamite-token	dynmt	Dynamite	f	\N	2023-05-24	2023-05-24
3bd7fb70-8915-4d13-83ca-fe243580bcb8	dynamix	dyna	Dynamix	f	\N	2023-05-24	2023-05-24
b1993836-e4f2-42e8-b4ca-2114c5624719	dynamo-coin	dynamo	Dynamo Coin	f	\N	2023-05-24	2023-05-24
90911620-c675-4dbb-b179-3cd104c621e8	dynex	dnx	Dynex	f	\N	2023-05-24	2023-05-24
96b176a1-fbe4-4d61-9d9d-cf7a4a61fd4c	dyor	dyor	DYOR	f	\N	2023-05-24	2023-05-24
1fa43696-7a51-47ba-b0ae-62c17e0fb3da	dyor-token-2	dyor	DYOR Token	f	\N	2023-05-24	2023-05-24
cbd8030b-6865-422f-ac36-39ce3d1f3282	dystopia	dyst	Dystopia	f	\N	2023-05-24	2023-05-24
34cde5ab-c4cb-42a8-a989-d2e2cf74ce79	dyzilla	dyzilla	DYZilla	f	\N	2023-05-24	2023-05-24
ee70244d-1289-4add-bc5b-8a5f8821083b	eaglecoin-2	elc	EagleCoin	f	\N	2023-05-24	2023-05-24
c97547ac-96e0-46bf-8cdb-0b41b7c0ac6f	eagle-mining-network	egon	EAGLE MINING NETWORK	f	\N	2023-05-24	2023-05-24
ea6d2bcc-1c4c-4862-9503-e21d9212727b	eagonswap-token	eagon	EagonSwap	f	\N	2023-05-24	2023-05-24
f3ec738c-1c5a-449a-84aa-6e74a78f251c	earndefi	edc	EarnDeFi	f	\N	2023-05-24	2023-05-24
3db1fcd8-afc4-4ef9-ab9c-560ab56cb0b0	earnguild	earn	EarnGuild	f	\N	2023-05-24	2023-05-24
252953ba-583e-42d9-aed4-ea7d9c2f120a	earnx-v2	earnx	EarnX V2	f	\N	2023-05-24	2023-05-24
72308017-9b55-48cd-859d-d8d0a7267216	earnzcoin	erz	EarnzCoin	f	\N	2023-05-24	2023-05-24
e6901563-918e-4f0b-965e-049b92f87827	earthbyt	ebyt	EarthByt	f	\N	2023-05-24	2023-05-24
a6149452-e192-4e17-9c48-a849182bffe0	earthfund	1earth	EarthFund	f	\N	2023-05-24	2023-05-24
91e2f1ae-e6e1-4a85-b159-26ba480ca8f7	ease	ease	EASE	f	\N	2023-05-24	2023-05-24
158dd232-0c8d-4a8a-a6c0-984b217cab21	easyfi	ez	EasyFi V2	f	\N	2023-05-24	2023-05-24
24c6ad0d-c92a-4e18-b4ae-ad50d52b01c6	easymine	emt	easyMine	f	\N	2023-05-24	2023-05-24
1438a0dd-0be2-4254-99fa-daad5a03a59d	eblockstock	ebso	eBlockStock	f	\N	2023-05-24	2023-05-24
aee9b87d-c26c-4bd1-b6d1-967f20e5851f	ebox	ebox	Ebox	f	\N	2023-05-24	2023-05-24
661f8a43-ce2a-42b9-aa88-515d24b321e2	ecash	xec	eCash	f	\N	2023-05-24	2023-05-24
8b583322-3fcc-4825-8924-dbfe91f0cb15	echain-network	ect	Echain Network	f	\N	2023-05-24	2023-05-24
ddc51bdb-829a-434c-a55c-626a2966cf25	echelon-prime	prime	Echelon Prime	f	\N	2023-05-24	2023-05-24
134416d7-cfb2-4eed-822c-7026119af1dc	echidna	ecd	Echidna	f	\N	2023-05-24	2023-05-24
ffc87ddb-ca99-4f51-a8ba-95352fc1e840	echoin	ec	Echoin	f	\N	2023-05-24	2023-05-24
cd8e5543-d703-474e-8f9b-f2c8f23f0571	echolink	eko	EchoLink	f	\N	2023-05-24	2023-05-24
07383802-c8d1-4783-b178-ea9c354a239a	echosoracoin	esrc	EchoSoraCoin	f	\N	2023-05-24	2023-05-24
d2523079-0447-4dd3-9070-7ea36a4c0cac	eclat	elt	ECLAT	f	\N	2023-05-24	2023-05-24
5e027b8e-866b-42bb-a4cd-63b1deb4448b	eco	eco	ECO	f	\N	2023-05-24	2023-05-24
97bceb37-d97e-4cc3-ac83-db0f61b28ad6	ecochain-token	ect	Ecochain Finance	f	\N	2023-05-24	2023-05-24
2a0f37ec-3382-4cba-8c47-82acc67d13dc	ecocredit	eco	EcoCREDIT	f	\N	2023-05-24	2023-05-24
349631df-4c9c-4548-ab4e-a41e75d82cdf	eco-defi	ecop	Eco DeFi	f	\N	2023-05-24	2023-05-24
4e23a1f3-4974-49d1-8b54-e9b0c3b5828e	ecog9coin	egc	EcoG9coin	f	\N	2023-05-24	2023-05-24
65cb8ce0-e2fb-4b23-bd94-dbb2c0924425	ecoin-2	ecoin	Ecoin	f	\N	2023-05-24	2023-05-24
8828c511-2037-4b49-bb6d-aa346b92180c	ecomi	omi	ECOMI	f	\N	2023-05-24	2023-05-24
350511e6-1555-4303-84fc-c92282498d59	ecoreal-estate	ecoreal	Ecoreal Estate	f	\N	2023-05-24	2023-05-24
14532552-66d2-431a-a108-4cecde53409e	ecoscu	ecu	ECOSC	f	\N	2023-05-24	2023-05-24
b9e14069-b870-4427-ab76-5f9399f08a99	eco-value-coin	evc	Eco Value Coin	f	\N	2023-05-24	2023-05-24
3306448c-42bd-4eec-9293-c528bffeb6a9	ecowatt	ewt	Ecowatt	f	\N	2023-05-24	2023-05-24
26c7fa5d-d487-4ecc-a8b1-aab2a74c9f90	ecox	ecox	ECOx	f	\N	2023-05-24	2023-05-24
7b32fdc0-b394-457e-8e57-651aa6d2fd7a	ecs-gold	ecg	ECS Gold	f	\N	2023-05-24	2023-05-24
d60827b6-2426-4b97-9d15-e8745379ae3e	e-c-vitoria-fan-token	vtra	E.C. Vitoria Fan Token	f	\N	2023-05-24	2023-05-24
0d28f8cd-4b51-4cdd-8394-cfbd2fbebb69	edain	eai	Edain	f	\N	2023-05-24	2023-05-24
11805ffe-03e8-48d7-8200-c2ab1025fa60	eddaswap	edda	EDDASwap	f	\N	2023-05-24	2023-05-24
d9487e93-ca16-4245-949f-f77e2c44fab1	eden	eden	EDEN	f	\N	2023-05-24	2023-05-24
8d1e17dc-0b98-46a6-8206-bc3680821b21	edenloop	elt	EdenLoop	f	\N	2023-05-24	2023-05-24
1fb57b63-1c45-41ee-8a9e-d76b88eed513	edexa-service-token	edx	edeXa Service Token	f	\N	2023-05-24	2023-05-24
fcdbed22-ff3c-4b09-9e0b-12456cc3909f	edfi	edfi	EdFi	f	\N	2023-05-24	2023-05-24
a5ca0802-6314-45fc-b919-572ae2331744	edge	edge	Edge	f	\N	2023-05-24	2023-05-24
0d850713-7910-4433-9fbd-c135ca8af6a7	edge-activity	eat	EDGE Activity	f	\N	2023-05-24	2023-05-24
45ee4428-3bce-4cd1-9102-6a809cfeefa4	edgecoin-2	edgt	Edgecoin	f	\N	2023-05-24	2023-05-24
f40d1527-eafc-4a3d-ba83-76b3236267a2	edgeless	edg	Edgeless	f	\N	2023-05-24	2023-05-24
a0fdd97d-caf7-4803-93a2-ef7256c49b2b	edgeswap	egs	EdgeSwap	f	\N	2023-05-24	2023-05-24
123271d9-8136-493e-a36b-a8bee567ad62	edgeware	edg	Edgeware	f	\N	2023-05-24	2023-05-24
7b39287b-33f7-439d-abd5-996ff4f26349	edoverse-zeni	zeni	Edoverse Zeni	f	\N	2023-05-24	2023-05-24
26dfd777-1967-4d27-a611-4ebe0b3a1cbb	education-assessment-cult	eac	Education Assessment Cult	f	\N	2023-05-24	2023-05-24
51cb2805-4214-4235-8883-5337abc4e701	edu-coin	edu	Open Campus	f	\N	2023-05-24	2023-05-24
ded308b1-c497-4ef8-8262-97f5beffa98b	edufex	edux	Edufex	f	\N	2023-05-24	2023-05-24
2e68126e-c4d0-4575-bddc-d02728f59343	effect-network	efx	Effect Network	f	\N	2023-05-24	2023-05-24
0efd93a0-f048-466c-85a3-599570df4d45	efin-decentralized	wefin	eFin Decentralized	f	\N	2023-05-24	2023-05-24
fd2170d0-6332-420b-8a94-62247c1f91e5	efinity	efi	Efinity	f	\N	2023-05-24	2023-05-24
34472dbe-c67f-4bb3-a940-f9f6f2cd1808	efk-token	efk	EFK Token	f	\N	2023-05-24	2023-05-24
ac361755-6c79-4ab2-bfd8-0f81b557f0a4	efun	efun	EFUN	f	\N	2023-05-24	2023-05-24
575c0f55-c5d4-4c62-87db-9cb10efaf5b5	egg-n-partners	eggt	Egg N Partners	f	\N	2023-05-24	2023-05-24
1df78389-e2a7-482e-b3ef-88f68056119a	eggplant-finance	eggp	Eggplant Finance	f	\N	2023-05-24	2023-05-24
5b7e1f68-cb4d-4bde-a786-35290c22c664	eggs	eggs	Eggs	f	\N	2023-05-24	2023-05-24
a66c8b63-3fa9-4046-aa6d-ca9cc700cb23	egod-the-savior	$savior	Egod The Savior	f	\N	2023-05-24	2023-05-24
9e891e9f-0347-4147-9f46-509dbe25eef0	egoplatform	ego	EGO	f	\N	2023-05-24	2023-05-24
26540148-7010-48bc-95f8-7fde7897af5f	egoras-credit	egc	Egoras Credit	f	\N	2023-05-24	2023-05-24
6bfeb7ab-b637-41b0-a7e7-9d0dc2332b8e	egretia	egt	Egretia	f	\N	2023-05-24	2023-05-24
fa285758-98bf-4941-8171-54b069ac054f	eg-token	eg	EG Token	f	\N	2023-05-24	2023-05-24
b052418e-4f52-4250-85d7-35646cc1b6dc	ehash	ehash	EHash	f	\N	2023-05-24	2023-05-24
c1756304-51b4-416c-8b7b-0899921b7aab	ehive	ehive	eHive	f	\N	2023-05-24	2023-05-24
7e3fccae-934e-470e-b3ec-af67b48461c0	eifi-finance	eifi	EIFI Finance	f	\N	2023-05-24	2023-05-24
08450541-1344-45ae-bb23-7bc3de9de464	eiichiro-oda	oda	Odasea	f	\N	2023-05-24	2023-05-24
f9848c89-58d1-4783-ab4d-494148e67de8	eiichiro-oda-inu	oda	Eiichiro Oda Inu	f	\N	2023-05-24	2023-05-24
33fbc51b-9a86-4fe2-bcee-22898a6e5495	einsteinium	emc2	Einsteinium	f	\N	2023-05-24	2023-05-24
536837ba-322a-4758-b662-5013713bc30e	ekta-2	ekta	Ekta	f	\N	2023-05-24	2023-05-24
99f3dce3-7f64-4d86-972f-a9193f58da90	elan	elan	Elan	f	\N	2023-05-24	2023-05-24
e870b374-f247-44d2-b7e9-ea03dddd5abe	elastos	ela	Elastos	f	\N	2023-05-24	2023-05-24
e4bc3641-5618-4f3b-8efe-a12d89d1b4d4	eldarune	elda	Eldarune	f	\N	2023-05-24	2023-05-24
fb8e9049-aa3a-4f8c-9029-f9cdb2cb69e6	el-dorado-exchange	ede	El Dorado Exchange	f	\N	2023-05-24	2023-05-24
27ca922a-0819-4528-ad38-38004e8c71a7	el-dorado-exchange-arb	ede	El Dorado Exchange (Arb)	f	\N	2023-05-24	2023-05-24
f3507d04-5bf1-4562-9dcb-7d473208595a	electra	eca	Electra	f	\N	2023-05-24	2023-05-24
13e47233-1f5a-4347-a59f-d515d26d7013	electra-protocol	xep	Electra Protocol	f	\N	2023-05-24	2023-05-24
027a60ab-a0b9-49ce-a27b-f4a5db674d4a	electric-cash	elcash	Electric Cash	f	\N	2023-05-24	2023-05-24
5bb04a7f-c7ef-4c91-aa10-c0b4f0e85c7c	electric-vehicle-direct-currency	evdc	Electric Vehicle Direct Currency	f	\N	2023-05-24	2023-05-24
cec75692-4228-4a6d-87dd-85c0dba6eb74	electric-vehicle-zone	evz	Electric Vehicle Zone	f	\N	2023-05-24	2023-05-24
bdd1414f-f5e8-41d9-be47-852c7f79b852	electrify-asia	elec	Electrify.Asia	f	\N	2023-05-24	2023-05-24
2c2b5654-a341-494f-9338-faeb1ff44800	electroneum	etn	Electroneum	f	\N	2023-05-24	2023-05-24
f8fd824b-841d-4daa-acdf-a93ac0a2b120	electronicgulden	efl	Electronic Gulden	f	\N	2023-05-24	2023-05-24
a582e9e4-a4cb-4e7b-aef9-39bd24417b2a	electronic-usd	eusd	Electronic USD	f	\N	2023-05-24	2023-05-24
ff52c409-e8fd-4329-9484-c0504f3bb13a	element-black	elt	Element Black	f	\N	2023-05-24	2023-05-24
6ca73ab2-e13c-43d0-996d-2fdc11c71703	elementrem	ele	Elementrem	f	\N	2023-05-24	2023-05-24
f185e00f-d186-4d30-b9ab-83cf92d00823	elements-2	elm	Elements	f	\N	2023-05-24	2023-05-24
a0344df5-140d-4b73-8130-1052b8b70c6f	elemon	elmon	Elemon	f	\N	2023-05-24	2023-05-24
61e832a0-c1ac-4d15-a25c-1c53d98cf7be	elephant-money	elephant	Elephant Money	f	\N	2023-05-24	2023-05-24
8264d116-a19e-4207-ab5e-b36d7fbca33f	elevate-token	$elev	Elevate Token	f	\N	2023-05-24	2023-05-24
6f1bb636-9e4b-4ef9-86ff-83ed054fcefb	eligma	goc	GoCrypto	f	\N	2023-05-24	2023-05-24
4a3768c3-34ff-4b84-82db-cc8c861df635	elis	xls	ELIS	f	\N	2023-05-24	2023-05-24
61723c9b-df20-4e90-a079-dc485dff7695	elitium	eum	Elitium	f	\N	2023-05-24	2023-05-24
7f689df4-7da8-4464-8f24-922c3a0470b5	elk-finance	elk	Elk Finance	f	\N	2023-05-24	2023-05-24
c5c82368-fd6b-40e8-a503-87ff48723980	ellipsis	eps	Ellipsis [OLD]	f	\N	2023-05-24	2023-05-24
0c854aee-c473-44af-aa43-07857e2b3d10	ellipsis-x	epx	Ellipsis X	f	\N	2023-05-24	2023-05-24
6a0d56bb-9cbb-428a-9913-20ab5ba978bb	elmoerc	elmo	ElmoERC	f	\N	2023-05-24	2023-05-24
2aca9191-f33f-4087-8bf1-aeda7d3466d6	eloin	eloin	Eloin	f	\N	2023-05-24	2023-05-24
41926d13-7507-494f-afbb-dbed2c479a9c	elo-inu	elo inu	Elo Inu	f	\N	2023-05-24	2023-05-24
9415b5e6-c906-4afb-a87b-8b9594599419	elondoge-dao	edao	ElonDoge DAO	f	\N	2023-05-24	2023-05-24
3bf1731f-1281-4a7a-bf47-8e1b86d2a383	elon-doge-token	edoge	ElonDoge.io	f	\N	2023-05-24	2023-05-24
d52ba13b-2eb3-467a-8e10-e1aedf6982f8	elon-goat	egt	Elon GOAT	f	\N	2023-05-24	2023-05-24
4730b84f-2692-48ee-99d1-9e6961ec0a00	elon-musk-ceo	elonmuskce	Elon Musk CEO	f	\N	2023-05-24	2023-05-24
67f464a6-fcab-4c3c-8d93-e638f249b000	elons-marvin	marvin	Elon's Marvin	f	\N	2023-05-24	2023-05-24
35182fa9-d614-4212-a0f6-f1aa1ef17c51	elpis-battle	eba	Elpis Battle	f	\N	2023-05-24	2023-05-24
3dc93781-5cbe-4df9-90b2-3f838ea5574a	elrond-erd-2	egld	MultiversX	f	\N	2023-05-24	2023-05-24
b8f45ea6-eb6b-4a78-90d7-0bc49f668abe	elseverse-world	ells	ElseVerse World	f	\N	2023-05-24	2023-05-24
ae34e1a6-d093-4144-8db9-d88fb5f4d55e	eltcoin	eltcoin	Eltcoin	f	\N	2023-05-24	2023-05-24
5039add5-27b6-4999-8aa5-782e506d0f4f	elumia	elu	Elumia	f	\N	2023-05-24	2023-05-24
cfe76e04-9c8d-4532-81b3-f85d51d385fe	elvishmagic	emp	ElvishMagic	f	\N	2023-05-24	2023-05-24
4fd99a63-1975-4b96-9be9-27dffddabcb4	elya	elya	Elya	f	\N	2023-05-24	2023-05-24
00e05ed9-d751-4e3a-99d9-01618b413483	elyfi	elfi	ELYFI	f	\N	2023-05-24	2023-05-24
82783634-412d-4f22-b92f-315c51eacfa4	elysia	el	ELYSIA	f	\N	2023-05-24	2023-05-24
28d31a01-e4ff-4955-b8a4-44d6b5a175a2	elysiant-token	els	Elysian ELS	f	\N	2023-05-24	2023-05-24
1306e2f3-e6b5-45fa-9062-246004796dbc	elysiumg	lcmg	ElysiumG	f	\N	2023-05-24	2023-05-24
f5cb72d1-c90f-453f-90e3-f61e7a267dd9	elysium-token	elys	Elysium Token	f	\N	2023-05-24	2023-05-24
eda125fb-ddda-4699-a675-2ff36bd23c7e	ember	ember	Ember	f	\N	2023-05-24	2023-05-24
4d3dd536-1149-48dc-97a6-5105bcc278ce	embr	embr	Embr	f	\N	2023-05-24	2023-05-24
f5dc66c2-ae78-4a36-a5d2-b54c380e39f1	emcis-network	emc1	EMCIS NETWORK	f	\N	2023-05-24	2023-05-24
87b3ab5a-c2bf-45e7-a3e6-95530ec8bcb7	emerald-crypto	emd	Emerald Crypto	f	\N	2023-05-24	2023-05-24
03e84401-bdca-4930-aba0-331f0a517907	emercoin	emc	EmerCoin	f	\N	2023-05-24	2023-05-24
a5dcc4bf-4b08-4268-bee6-40c1219255ea	emg-coin	emg	EMG Coin	f	\N	2023-05-24	2023-05-24
6b1df571-2169-4eb7-bfdc-462a41bcc069	eminer	em	Eminer	f	\N	2023-05-24	2023-05-24
4599c199-2492-4030-a1be-184d1ef6d29d	e-money	ngm	e-Money	f	\N	2023-05-24	2023-05-24
d5f5d83a-89a7-4792-97f8-2457b903368b	e-money-eur	eeur	e-Money EUR	f	\N	2023-05-24	2023-05-24
9ebffd5f-f51b-4ab2-b444-6defb031bc4d	empire-capital-token	ecc	Empire Capital	f	\N	2023-05-24	2023-05-24
00169fd9-0fe9-405c-8d79-4bfe10f0c9fb	empire-network	empire	Empire Network	f	\N	2023-05-24	2023-05-24
ce52484f-2859-448e-a1a4-f35afa8f35f1	empire-token	empire	Empire	f	\N	2023-05-24	2023-05-24
38fe483a-91d8-476b-9407-ef1aada32b26	empowa	emp	Empowa	f	\N	2023-05-24	2023-05-24
2da4c2e1-7b2f-4b4c-a454-9741316e9f85	emp-shares	eshare	EMP Shares	f	\N	2023-05-24	2023-05-24
05aff3ef-c528-4c89-8704-c61719e53814	empty-set-share	ess	Empty Set Share	f	\N	2023-05-24	2023-05-24
670977a8-742a-4d7a-a11d-a1974f0c4e8e	encrypgen	dna	EncrypGen	f	\N	2023-05-24	2023-05-24
1dddd590-a475-494b-8aca-761dc7b4e75e	encryption-ai	0xencrypt	Encryption AI	f	\N	2023-05-24	2023-05-24
dd1e0140-d226-4397-96e6-c30881d6a0e0	endless-battlefield	eng	Endless Board Game	f	\N	2023-05-24	2023-05-24
1d599575-7db2-4dd9-9a37-5a0199673abc	endlesswebworlds	eww	EndlessWebWorlds	f	\N	2023-05-24	2023-05-24
88ce59a4-ff19-4709-ae11-7c8fb3b4e54c	endor	edr	Endor Protocol	f	\N	2023-05-24	2023-05-24
4bce044f-47d9-4988-b7cf-e576c3727ec9	endpoint-cex-fan-token	endcex	Endpoint Cex Fan Token	f	\N	2023-05-24	2023-05-24
a9ba209e-f8e4-47b0-8ee4-122e74a0ecd3	eneftiverse	evr	ENEFTIVERSE	f	\N	2023-05-24	2023-05-24
5a213f09-4942-42f8-8767-de089eb9f24c	eneftor	eftr	Eneftor	f	\N	2023-05-24	2023-05-24
0b67ffd2-6802-4f27-9e5a-0e6e75ae6e83	enegra	egx	Enegra	f	\N	2023-05-24	2023-05-24
6b3b3842-e603-4c9c-91ea-bff00b5214d0	energi	nrg	Energi	f	\N	2023-05-24	2023-05-24
ea8b1b9a-8158-4837-9504-ac6466102ea6	energi-dollar	usde	Energi Dollar	f	\N	2023-05-24	2023-05-24
5558dec5-8e1e-4b3b-b046-0924f5500f07	energo	tsl	Tesla TSL	f	\N	2023-05-24	2023-05-24
102700a3-48d8-4d67-b793-1070883beca4	energy8	e8	Energy8	f	\N	2023-05-24	2023-05-24
a7a6792b-e70e-4b30-8d24-abf1bc04442f	energy-efficient-mortgage-tokenized-stock-defichain	deem	iShares MSCI Emerging Markets ETF Defichain	f	\N	2023-05-24	2023-05-24
b6dd87c5-db34-4dc4-8b19-672a6f0d1df6	energyfi	eft	Energyfi	f	\N	2023-05-24	2023-05-24
e016a49c-062a-4463-90d9-97ca478fb525	energytrade-token	ett	EnergyTrade Token	f	\N	2023-05-24	2023-05-24
a464fe27-e902-49c1-9011-eb4c43659b1f	energy-web-token	ewt	Energy Web	f	\N	2023-05-24	2023-05-24
aa111b52-835e-44e2-b918-7dc326991a2f	eng-crypto	eng	Eng Crypto	f	\N	2023-05-24	2023-05-24
0c4512e1-8286-4339-af17-ee0236c53e1f	enigma	eng	Enigma	f	\N	2023-05-24	2023-05-24
355fb9d5-e901-44c8-bb7e-2fa86475c7a8	enigma-gaming	eng	Enigma Gaming	f	\N	2023-05-24	2023-05-24
1ac18e27-9e00-4ac2-b9f6-79a48776284c	enjincoin	enj	Enjin Coin	f	\N	2023-05-24	2023-05-24
fbeaf755-c003-4699-b7a6-f6e1d152f0a2	enjinstarter	ejs	Enjinstarter	f	\N	2023-05-24	2023-05-24
083fbebf-7fff-4c98-8d5a-c7e5128236b8	enno-cash	enno	ENNO Cash	f	\N	2023-05-24	2023-05-24
9121b479-d95a-403c-8ec4-bcc2a106f76d	enq-enecuum	enq	Enecuum	f	\N	2023-05-24	2023-05-24
24fc0c15-1485-47b9-8c28-0d6c2a28562b	enreachdao	nrch	Enreach	f	\N	2023-05-24	2023-05-24
e021d262-27d0-48a9-a280-f177a8307522	enrex	enrx	Enrex	f	\N	2023-05-24	2023-05-24
321dae07-7d32-44a8-af94-753f06511541	enterbutton	entc	EnterButton	f	\N	2023-05-24	2023-05-24
bc91d699-c70d-41fa-9ad8-5289e71639fc	enterdao	entr	EnterDAO	f	\N	2023-05-24	2023-05-24
319fa7a4-67fd-4be8-a760-178bec7fdbf3	entice-v2	ntic	Entice	f	\N	2023-05-24	2023-05-24
c6ea0c19-3e21-4b4b-95db-f761a816e509	entropy	ent	Entropy	f	\N	2023-05-24	2023-05-24
83574913-dfab-43aa-aa96-22aa48a58d4b	envida	edat	EnviDa	f	\N	2023-05-24	2023-05-24
ab92a79a-4af4-43bf-b9f4-c9d8aeb7984f	envion	evn	Envion	f	\N	2023-05-24	2023-05-24
d8c47b42-a11f-4938-b580-3b068bce686c	envision	vis	Envision	f	\N	2023-05-24	2023-05-24
ca694ce3-ef56-46e5-b857-c3d3a21ebe3d	envoy-network	env	Envoy	f	\N	2023-05-24	2023-05-24
2401b006-1f09-4827-b517-af76641401aa	eos	eos	EOS	f	\N	2023-05-24	2023-05-24
4b4a2985-7b44-48a4-9795-5aa3443c2e64	eosdac	eosdac	eosDAC	f	\N	2023-05-24	2023-05-24
c4628c68-ea91-4cc9-83af-051aa62f802d	eosforce	eosc	EOSForce	f	\N	2023-05-24	2023-05-24
ee4f0a1d-0d26-47a6-b06a-ac5f7fbb7416	eos-pow-coin	pow	EOS PoW Coin	f	\N	2023-05-24	2023-05-24
ae46f498-70a1-4295-afa3-49d5fab91a8f	ephiat	ephiat	ePhiat	f	\N	2023-05-24	2023-05-24
6d82d008-51bc-4ffb-abc3-dc2f83b94b5c	epic-cash	epic	Epic Cash	f	\N	2023-05-24	2023-05-24
8db67e5f-9cc7-4cf0-bb8d-82a492f23a4a	epics-token	epct	Epics Token	f	\N	2023-05-24	2023-05-24
a6778ce1-77f2-4720-836e-95cca173e8fe	epik-prime	epik	Epik Prime	f	\N	2023-05-24	2023-05-24
3626bc29-bee4-4992-98b6-11aba575bea5	epik-protocol	epk	EpiK Protocol	f	\N	2023-05-24	2023-05-24
b058defe-f170-420e-b2cc-7f753850edab	epillo	epillo	Epillo	f	\N	2023-05-24	2023-05-24
e2f88030-36c5-40f8-97da-9ab99d437776	eq9	eq9	Equals9	f	\N	2023-05-24	2023-05-24
dc5533d3-16ca-4516-8f68-f205393a0abc	eqifi	eqx	EQIFi	f	\N	2023-05-24	2023-05-24
7f003ed3-a8bc-4f79-98a6-6a28300eefce	equalizer	eqz	Equalizer	f	\N	2023-05-24	2023-05-24
e7f634a6-bf7e-4d86-b8c0-8b58a79e5b96	equalizer-dex	equal	Equalizer DEX	f	\N	2023-05-24	2023-05-24
e97ca0cf-977a-4b7c-be0b-4fd26154c0ac	equilibre	vara	Équilibre	f	\N	2023-05-24	2023-05-24
4985b116-6353-4bd4-830a-22ed650de6bb	equilibrium	eq	Equilibrium Games	f	\N	2023-05-24	2023-05-24
94b2b443-3725-4b44-9547-987232d55b1e	equilibrium-eosdt	eosdt	Equilibrium EOSDT	f	\N	2023-05-24	2023-05-24
cdd2cdb5-3b5c-4c72-826c-fe9d27876470	equilibrium-exchange	edx	Equilibrium Exchange	f	\N	2023-05-24	2023-05-24
d080a0c5-c590-4e7b-ab23-248390a77f55	equilibrium-token	eq	Equilibrium	f	\N	2023-05-24	2023-05-24
e2a84bf4-0924-41a4-9ff3-7445fbfdc37f	equinox	enx	Equinox	f	\N	2023-05-24	2023-05-24
33553c6a-65c2-4036-aaad-bc4d5dec8bf3	era7	era	Era7	f	\N	2023-05-24	2023-05-24
d8608934-8952-4009-ac0d-33ec97a52781	era7-game-of-truth	got	Era7: Game of Truth	f	\N	2023-05-24	2023-05-24
7b424482-a0f2-46ef-9ac6-f8e355ee028d	e-radix	exrd	e-Radix	f	\N	2023-05-24	2023-05-24
91177255-9a1a-4bba-812b-31702b9e5181	era-name-service	era	Era Name Service	f	\N	2023-05-24	2023-05-24
c5ba80a8-87db-4b6d-92cd-7cf9c0f983b7	era-swap-token	es	Era Swap	f	\N	2023-05-24	2023-05-24
e9db712d-9c11-4359-a5c4-e8db7f79b1a8	ergo	erg	Ergo	f	\N	2023-05-24	2023-05-24
070c2ddc-786e-4fc4-a030-4a63053d34de	erica-social-token	est	Erica Social Token	f	\N	2023-05-24	2023-05-24
b893e036-723d-48c1-8fa8-08242fc05088	eris-amplified-luna	ampluna	Eris Amplified Luna	f	\N	2023-05-24	2023-05-24
1a9c76ca-ae07-406c-b00d-7e38030a0854	ertha	ertha	Ertha	f	\N	2023-05-24	2023-05-24
f005ac50-4939-48da-a4d8-c8c8d448de4b	erth-point	erth	Erth Point	f	\N	2023-05-24	2023-05-24
16c24260-d11b-4918-a8ca-1e5c6dcdfde0	erugo-world-coin	ewc	Erugo World Coin	f	\N	2023-05-24	2023-05-24
e8850ac8-433d-4e32-9217-94287fd2c99b	esco-coin	esco	Esco Coin	f	\N	2023-05-24	2023-05-24
a38644e4-a70c-45bf-8024-329cb97dce89	escoin-token	elg	Escoin	f	\N	2023-05-24	2023-05-24
d51d2493-ccfb-4721-823b-9b4aec1330e7	escrowed-illuvium-2	silv2	Escrowed Illuvium 2	f	\N	2023-05-24	2023-05-24
e8804722-7a64-4504-9b94-8fcc64f0259b	esg	esg	ESG	f	\N	2023-05-24	2023-05-24
95894ab1-1064-4ea9-a96b-6c428e0f3d50	esg-chain	esgc	ESG Chain	f	\N	2023-05-24	2023-05-24
c91d7de5-9dab-40ca-86d6-44a3a6000c63	eska	esk	Eska	f	\N	2023-05-24	2023-05-24
ef4e4811-539a-4ab6-a8d1-d67e3c8257f0	eskisehir-fan-token	eses	Eskişehir Fan Token	f	\N	2023-05-24	2023-05-24
a8d19690-4519-4390-b29a-95990670b8ec	espento	spent	Espento	f	\N	2023-05-24	2023-05-24
54d52a5a-8a82-4be4-8adb-49e3f40010f1	espers	esp	Espers	f	\N	2023-05-24	2023-05-24
63641521-bdfd-486c-b6c1-e8b1c2a270fe	espl-arena	arena	ESPL Arena	f	\N	2023-05-24	2023-05-24
5f30d00c-c591-4d74-8b3c-0b3b45c6ca08	esporte-clube-bahia-fan-token	bahia	Esporte Clube Bahia Fan Token	f	\N	2023-05-24	2023-05-24
85aa1af5-65cf-4057-9b64-106c9b7746f2	esportspro	espro	EsportsPro	f	\N	2023-05-24	2023-05-24
da5248bc-49f5-4056-bb29-79d9b7aaaee6	esportsref	esr	EsportsRef	f	\N	2023-05-24	2023-05-24
1b39dbb0-5630-4729-bdfb-8c7f09c03227	essentia	ess	Essentia	f	\N	2023-05-24	2023-05-24
d9f099a9-ed79-4b70-be84-b4e744676926	estar-games	estar	ESTAR.GAMES	f	\N	2023-05-24	2023-05-24
03fa67f8-9a0d-4f8c-885e-255732a7b26e	eswapping-v2	eswapv2	eSwapping v2	f	\N	2023-05-24	2023-05-24
49aa8855-cbcf-4ab6-84c0-c355b001f4a3	eterland	eter	Eterland	f	\N	2023-05-24	2023-05-24
5db07b7d-5831-48e2-bdb4-13a3143515f7	etermon	etm	Etermon	f	\N	2023-05-24	2023-05-24
fb746733-0053-481e-b095-7619d876f08d	eternal-finance	etern	Eternal Finance	f	\N	2023-05-24	2023-05-24
570202a5-8848-477f-8899-ab079551560f	eternalflow	eft	EternalFlow	f	\N	2023-05-24	2023-05-24
26c29ce8-fcd7-4caf-a5bb-330c80434c8c	eth2-staking-by-poolx	eth2	Eth 2.0 Staking by Pool-X	f	\N	2023-05-24	2023-05-24
a12a66d2-8ac9-48a2-a548-b2ef44513552	eth-2x-flexible-leverage-index	eth2x-fli	Index Coop - ETH 2x Flexible Leverage Index	f	\N	2023-05-24	2023-05-24
2945ff4b-8944-42aa-815e-6038759e592c	eth3s	eth3s	ETH3S	f	\N	2023-05-24	2023-05-24
741bed3b-7b2a-474a-be80-be73526be4fc	etha-lend	etha	ETHA Lend	f	\N	2023-05-24	2023-05-24
bc1a5e18-8e60-4e14-b098-67ce0d50b3ad	ethart	arte	Items	f	\N	2023-05-24	2023-05-24
7136c785-63c7-45f8-ac82-fadeaa833d59	ethax	ethax	ETHAX	f	\N	2023-05-24	2023-05-24
5c4700b9-b6e9-4c87-8e20-d7805ef76a4c	ethdown	ethdown	ETHDOWN	f	\N	2023-05-24	2023-05-24
f38d31f5-53c0-40c7-9e68-4dbd4099194c	etheal	heal	Etheal	f	\N	2023-05-24	2023-05-24
77a81b83-41e5-4063-ba5d-e2e0f2b7eb46	ether-1	etho	Etho Protocol	f	\N	2023-05-24	2023-05-24
b896d2a7-1b76-41bb-9420-416c468f7865	etherconnect	ecc	Etherconnect	f	\N	2023-05-24	2023-05-24
72ddc718-622c-4839-987e-1341c9c6cad8	ethereans	soon	NONbeta	f	\N	2023-05-24	2023-05-24
95df32c1-4b31-408e-88d9-168f3c4d8fee	ethereum	eth	Ethereum	f	\N	2023-05-24	2023-05-24
8845c452-8c73-4d43-98dd-f47fb905fadc	ethereum-cash	ecash	Ethereum Cash	f	\N	2023-05-24	2023-05-24
a1a54f88-71c8-47ec-8254-19af688a0ff7	ethereum-classic	etc	Ethereum Classic	f	\N	2023-05-24	2023-05-24
431d3937-e2d6-4e32-9e42-1869a3278f53	ethereumfair	ethf	EthereumFair	f	\N	2023-05-24	2023-05-24
b4f7442b-7de7-4787-bc2f-0d281c96a29c	ethereummax	emax	EthereumMax	f	\N	2023-05-24	2023-05-24
240933c4-233c-476c-b0a2-e219b7dabd1d	ethereum-message-service	ems	Ethereum Message Service	f	\N	2023-05-24	2023-05-24
34c5b210-d8e0-4c2b-8f6c-5095cbe9e11a	ethereum-meta	ethm	Ethereum Meta	f	\N	2023-05-24	2023-05-24
e4d55a88-6790-41c4-a54c-d785b967140e	ethereum-name-service	ens	Ethereum Name Service	f	\N	2023-05-24	2023-05-24
997149d1-4ea2-459a-8759-38ff7959dfc2	ethereum-pow-iou	ethw	EthereumPoW	f	\N	2023-05-24	2023-05-24
3a33cdb7-03fa-4263-a91d-40cd426a0e01	ethereum-push-notification-service	push	Push Protocol	f	\N	2023-05-24	2023-05-24
7c81ed0e-7652-4ab1-8495-ecc88785dcc6	ethereum-volatility-index-token	ethv	Ethereum Volatility Index Token	f	\N	2023-05-24	2023-05-24
bc1b3e31-b9ac-453a-b0a1-8f9232748751	ethereum-wormhole	eth	Ethereum (Wormhole)	f	\N	2023-05-24	2023-05-24
5901a374-3e0e-48e8-a228-b3ce84685670	ethereumx	etx	EthereumX	f	\N	2023-05-24	2023-05-24
7ad991a5-7140-49b7-acc7-50859b51d9e5	ethergem	egem	EtherGem	f	\N	2023-05-24	2023-05-24
9e4be034-8f92-4658-b7c9-ef196df781c8	etherisc	dip	Etherisc DIP	f	\N	2023-05-24	2023-05-24
9048c8f2-852c-4d85-bc1e-33bde6b08fc1	etherland	eland	Etherland	f	\N	2023-05-24	2023-05-24
f4cc6dfb-7970-4aa1-973f-c97805348bf4	etherlite-2	etl	EtherLite	f	\N	2023-05-24	2023-05-24
e4c3c4fb-5412-478f-bd19-727078ee2ce8	ethermon	emon	Ethermon	f	\N	2023-05-24	2023-05-24
62ecb777-05b5-4fcc-a010-68c25e765545	ethernal	ethernal	Ethernal	f	\N	2023-05-24	2023-05-24
1c65efec-0c8d-46b7-beba-ef0cd6a25af3	ethernal-finance	ethfin	Ethernal Finance	f	\N	2023-05-24	2023-05-24
b373e57f-01bf-4820-b2d7-aff911cfa43f	ethernexus	enxs	EtherNexus	f	\N	2023-05-24	2023-05-24
787a27a7-85e4-4f0d-bc91-d46f9e00dff4	ethernity-chain	ern	Ethernity Chain	f	\N	2023-05-24	2023-05-24
df3067cf-9d72-4050-bade-98c8b8b055c4	etherparty	fuel	Etherparty	f	\N	2023-05-24	2023-05-24
d4f539a2-959e-41b1-8e2c-8cf00ce3664f	etherrock-72	pebble	Etherrock #72	f	\N	2023-05-24	2023-05-24
31090e12-1b65-41f0-b2ad-32ff676ff31d	ether-tech	ether	Ether Tech	f	\N	2023-05-24	2023-05-24
56c57090-a976-496b-ac43-10063833a946	ethfan-burn	$efb	ETHFan Burn	f	\N	2023-05-24	2023-05-24
735baf6e-9f93-4dfa-8b8b-5db504e91339	eth-fan-token	eft	ETH Fan Token Ecosystem	f	\N	2023-05-24	2023-05-24
2fbd012d-e031-4cdc-aa4c-bb812f533def	ethforestai	ethfai	ETHforestAI	f	\N	2023-05-24	2023-05-24
66a268fc-4a56-41e4-a907-bb59a75ec47c	ethichub	ethix	Ethix	f	\N	2023-05-24	2023-05-24
a51eb6df-8ca1-42e1-b9c2-18d80278fa7d	ethlas	els	Ethlas	f	\N	2023-05-24	2023-05-24
72c76ab9-440f-46fd-8498-12bb6d1f1044	ethlend	lend	Aave [OLD]	f	\N	2023-05-24	2023-05-24
ccb3ac46-4e12-4564-8146-fe7fbe9b62c1	ethos	vgx	Voyager VGX	f	\N	2023-05-24	2023-05-24
4b97d5b0-772f-48d8-86eb-55693814ff03	ethos-reserve-note	ern	Ethos Reserve Note	f	\N	2023-05-24	2023-05-24
2ef75920-184a-4804-bf82-b0a7395c059a	ethpad	ethpad	ETHPad	f	\N	2023-05-24	2023-05-24
f872ca28-ca71-4c27-b3ca-730f063b71b1	eth-shiba	ethshib	Eth Shiba	f	\N	2023-05-24	2023-05-24
48d47c2f-421a-47a2-a014-e03459b0efc8	ethst-governance-token	et	ETHST Governance	f	\N	2023-05-24	2023-05-24
a18f139b-dd1b-4204-81a9-6c4bbe8c0f11	ethtez	ethtz	ETHtez	f	\N	2023-05-24	2023-05-24
ea657407-b14b-4d17-92cd-feef80f723b7	ethup	ethup	ETHUP	f	\N	2023-05-24	2023-05-24
0e739a35-28f6-417c-b26e-64f05e052a3a	ethw-id	eid	ETHW ID	f	\N	2023-05-24	2023-05-24
c6aaadd7-5778-406e-9c4f-d9ac4f503fed	etica	eti	Etica	f	\N	2023-05-24	2023-05-24
2500263e-70bf-4fd3-b901-2a0f7f6a95f1	etwinfinity	etw	ETWInfinity	f	\N	2023-05-24	2023-05-24
fa1e9748-6e1f-4f81-9b62-28df02668ef3	etxinfinity	etx	ETXInfinity	f	\N	2023-05-24	2023-05-24
69b58f3c-bc0c-46bb-b3ce-d54a1a34c982	eub-chain	eubc	EUB Chain	f	\N	2023-05-24	2023-05-24
bd9b2307-8f30-45b2-85bc-ef261e866e51	euler	eul	Euler	f	\N	2023-05-24	2023-05-24
47dd8c87-4418-418d-881e-507ddbd9a1b2	euno	euno	EUNO	f	\N	2023-05-24	2023-05-24
f9ef0019-b3db-4c14-a972-24323c8a86a6	euphoria-2	wagmi	Euphoria	f	\N	2023-05-24	2023-05-24
aea8412b-0680-48b8-9d04-e803e40c071f	euro-coin	euroc	Euro Coin	f	\N	2023-05-24	2023-05-24
8869f36a-f832-4264-9db4-0b1581f04b95	eurocoinpay	ecte	EurocoinToken	f	\N	2023-05-24	2023-05-24
a60cbec6-7bee-4ae8-b45c-6f6bd11ce476	euro-coinvertible	eur-c	Euro Coinvertible	f	\N	2023-05-24	2023-05-24
c74787a2-944a-42b8-840a-991468cfb03c	euroe-stablecoin	euroe	EUROe Stablecoin	f	\N	2023-05-24	2023-05-24
13f76078-ab1f-408e-beb7-c16f52f502f0	euro-shiba-inu	eshib	Euro Shiba Inu	f	\N	2023-05-24	2023-05-24
06a0eb40-9907-4bb7-9aa6-1e94bb0b356b	eusd-27a558b0-8b5b-4225-a614-63539da936f4	eusd	eUSD	f	\N	2023-05-24	2023-05-24
23329795-a17b-4e0d-8d62-b9bf3c5e68dd	evai-2	ev	Evai	f	\N	2023-05-24	2023-05-24
c346e759-a68d-4030-9ac9-32d61589b16d	evanesco-network	eva	Evanesco Network	f	\N	2023-05-24	2023-05-24
6b4b3441-d8da-47ea-bc46-a0dff0b57a65	evany	evy	EVANY	f	\N	2023-05-24	2023-05-24
2d25a877-5c8d-46e2-88c6-81039f94d9a9	eve-ai	eveai	Eve AI	f	\N	2023-05-24	2023-05-24
9f6d9e7f-0ec3-4700-a7a4-176f9f2cceb3	evedo	eved	Evedo	f	\N	2023-05-24	2023-05-24
a9811980-a91d-4ccd-857c-d99d4f6ba282	eve-exchange	eve	EVE	f	\N	2023-05-24	2023-05-24
7d0f514f-906b-4492-b02c-b33a3d171ee3	evencoin	evn	EvenCoin	f	\N	2023-05-24	2023-05-24
d046ad3e-ec54-45d9-bd51-29bfa2630c84	everdome	dome	Everdome	f	\N	2023-05-24	2023-05-24
89ca0511-7fb6-4ad0-a912-62cd53984a46	everearn	earn	EverEarn	f	\N	2023-05-24	2023-05-24
edb31bce-1bb2-4b0a-94e1-95e3368fbe81	everearn-eth	$earn	EverEarn ETH	f	\N	2023-05-24	2023-05-24
3cf299c3-11c4-431e-84d4-f37c89976391	everestcoin	evcoin	EverestCoin	f	\N	2023-05-24	2023-05-24
0ca528fd-e1b6-4371-b995-3848008d9b4e	evereth	evereth	EverETH	f	\N	2023-05-24	2023-05-24
77325daf-5287-414f-a599-e3a905b5da87	everex	evx	Everex	f	\N	2023-05-24	2023-05-24
29f24b37-add6-4b30-ae61-3a95bdb3581a	evergrowcoin	egc	EverGrow Coin	f	\N	2023-05-24	2023-05-24
24915af5-ff15-4332-b7d0-ae98e7c17b81	everid	id	Everest	f	\N	2023-05-24	2023-05-24
594bb17f-4d58-42e0-9391-74fc00b30754	everipedia	iq	IQ	f	\N	2023-05-24	2023-05-24
7e9e440b-2d9f-4f29-b757-0c06d6167ac3	everreflect	evrf	EverReflect	f	\N	2023-05-24	2023-05-24
6d9543a2-7561-4361-95ea-418ac20240b0	everrise	rise	EverRise	f	\N	2023-05-24	2023-05-24
d5b0c834-7248-4405-80dc-f00995c13b90	eversafu	eversafu	EverSAFU	f	\N	2023-05-24	2023-05-24
64d3a007-1157-44d8-a2f1-a089f3521db9	eversafuv2	es2	EverSAFUv2	f	\N	2023-05-24	2023-05-24
becd8c2b-8089-41a6-b7e4-3282bb12783e	everscale	ever	Everscale	f	\N	2023-05-24	2023-05-24
c06282c1-6a6e-48a5-b899-1f62fdb11a05	everstart	start	EverStart	f	\N	2023-05-24	2023-05-24
15c4d409-20ff-4029-a715-2e2014acb94a	everton-fan-token	efc	Everton Fan Token	f	\N	2023-05-24	2023-05-24
3e1c01ff-b0f6-45cf-b7c5-200eaeeda0c2	everycoin	evy	EveryCoin	f	\N	2023-05-24	2023-05-24
69e24ec2-5af9-4a7e-a55b-847434280343	every-game	egame	Every Game	f	\N	2023-05-24	2023-05-24
aff7a546-cb69-4f4d-ad97-980525c9ce03	evil-coin	evil	Evil Coin	f	\N	2023-05-24	2023-05-24
d1f84ec8-1482-41da-95bc-88c3ca288a5f	evilsquidgame	evilsquid	EvilSquidGame	f	\N	2023-05-24	2023-05-24
a85c98e0-fbdc-4b2f-bb4a-d4b09f14dd8e	evmos	evmos	Evmos	f	\N	2023-05-24	2023-05-24
4cfe4fae-2b64-4b66-ae04-66eda8a88062	evmos-domains	evd	Evmos Domains	f	\N	2023-05-24	2023-05-24
857c3ec1-c749-47f0-a387-30d9702c5499	evo-finance	evo	Evo Finance	f	\N	2023-05-24	2023-05-24
90a0bd25-a579-48b1-8445-70d6f4501862	evolution-finance	evn	Evolution Finance	f	\N	2023-05-24	2023-05-24
680089f0-06c3-4247-aa57-60051189cfb4	evolveai	evoai	EvolveAI	f	\N	2023-05-24	2023-05-24
340ca5f5-958b-4028-b3d4-85e2aef4da97	evoverses	evo	EvoVerses	f	\N	2023-05-24	2023-05-24
3af10e9c-f998-466f-b9f8-1c0c894dd1fe	evrice	evc	Evrice	f	\N	2023-05-24	2023-05-24
8e540fa5-023e-431c-b4d7-05553e3b9084	evrynet	evry	Evrynet	f	\N	2023-05-24	2023-05-24
c1024760-610e-475d-92b1-e867e11875ea	evulus	evu	Evulus	f	\N	2023-05-24	2023-05-24
3619cedb-3b39-43c0-b0b0-5e61eb20e45a	excalibur	exc	Excalibur	f	\N	2023-05-24	2023-05-24
523c267a-4884-4e03-b5db-3b4e1d0d093d	excelon	xlon	Excelon	f	\N	2023-05-24	2023-05-24
11c35f9d-a58c-4590-95d9-c07c2972e48d	exchangecoin	excc	ExchangeCoin	f	\N	2023-05-24	2023-05-24
44415fda-c34b-4c77-85da-5f478e1c38ec	exchange-genesis-ethlas-medium	xgem	Exchange Genesis Ethlas Medium	f	\N	2023-05-24	2023-05-24
ab594277-a7c1-4093-bd13-f60d2e6627c3	exchange-union	xuc	Exchange Union	f	\N	2023-05-24	2023-05-24
d333228d-647d-4ad9-8c79-16691dfc9e89	exciting-japan-coin	xjp	eXciting Japan Coin	f	\N	2023-05-24	2023-05-24
4162bf34-f956-42ef-8ad1-075a44f8dfa4	exeedme	xed	Exeedme	f	\N	2023-05-24	2023-05-24
27e14689-648c-4fda-be67-e8d4daee880a	exeno	exn	Exeno	f	\N	2023-05-24	2023-05-24
e439e7f9-1557-44cd-9047-cc5a61da4ae4	exmo-coin	exm	EXMO Coin	f	\N	2023-05-24	2023-05-24
e72bc444-b9e4-47f2-81ce-0d856f270ab3	exobots	exos	Exobots	f	\N	2023-05-24	2023-05-24
bb1600ff-ee99-42a0-8f64-3f1f94adbe2e	exodusext	ext	ExodusExt	f	\N	2023-05-24	2023-05-24
8c56ef80-7e85-4ef9-8cce-201eae7422e7	exohood	exo	Exohood	f	\N	2023-05-24	2023-05-24
18d00a44-cff4-4c8c-bbcf-0560043f1aa8	exorde	exd	Exorde	f	\N	2023-05-24	2023-05-24
cbe6b495-b1cb-4339-a965-3a3f9acbe644	exosama-network	sama	Moonsama	f	\N	2023-05-24	2023-05-24
c3e8a28b-26e7-4eac-82d9-eebb90a1023b	expanse	exp	Expanse	f	\N	2023-05-24	2023-05-24
267c08a4-4fd6-46bb-8be1-600b62bb3f2c	experience-chain	xpc	eXPerience Chain	f	\N	2023-05-24	2023-05-24
fcd4dd12-b611-4fa7-a185-bc67f02124f9	experiencecoin	epc	ExperienceCoin	f	\N	2023-05-24	2023-05-24
27031cae-053f-47fd-9a8f-dfda6ba2faac	experty-wisdom-token	wis	Experty Wisdom	f	\N	2023-05-24	2023-05-24
ca60ac21-91fd-4cb3-99ee-0a4790443a35	exponential-capital-2	expo	Exponential Capital	f	\N	2023-05-24	2023-05-24
f539e7e2-cbfe-4656-adee-bdce0a813fae	export-mortos-platform	emp	Export Motors Platform	f	\N	2023-05-24	2023-05-24
bba84346-385e-4001-8441-5c6b5d52cb36	extractodao-bull	xbll	ExtractoDAO Bull	f	\N	2023-05-24	2023-05-24
96648d51-d5a6-4583-a15b-28b23e28a93f	extradna	xdna	extraDNA	f	\N	2023-05-24	2023-05-24
87122acf-61f6-4c07-908f-fd075170cce1	eyes-protocol	eyes	EYES Protocol	f	\N	2023-05-24	2023-05-24
dd5b5cf1-9182-4939-a1f4-79a51b2972fb	eyeverse	eye	Eyeverse	f	\N	2023-05-24	2023-05-24
ce02b15c-fc6a-4193-af0e-0b84676e2729	ezillion	ezi	Ezillion	f	\N	2023-05-24	2023-05-24
6df7c1e8-df1a-4a1e-b446-65f48543b6f5	ezystayz	ezy	Ezystayz	f	\N	2023-05-24	2023-05-24
c0a42b62-3814-4be7-bd73-0e2552eaa982	ezzy-game	ezy	EZZY Game	f	\N	2023-05-24	2023-05-24
73075ea7-1284-451c-a4e7-94e951102f31	fable-of-the-dragon	tyrant	Fable Of The Dragon	f	\N	2023-05-24	2023-05-24
0cd37d64-445e-4409-a0ee-226bb69ceb57	fable-of-the-shiba	syrant	Fable Of The Shiba	f	\N	2023-05-24	2023-05-24
c77279b8-0497-4505-833e-b04684699ca8	fabric	fab	Fabric	f	\N	2023-05-24	2023-05-24
8dc2610a-90a4-44d8-83de-80dee6adc591	fabwelt	welt	Fabwelt	f	\N	2023-05-24	2023-05-24
ca524dd6-6c78-446f-a25f-f330a102061a	facebook-tokenized-stock-defichain	dfb	Facebook Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
7ea61a47-c3c1-4d6f-96db-dfbbeee5caad	facedao	face	FaceDAO	f	\N	2023-05-24	2023-05-24
82a6c50d-ad5c-4552-a235-cd286737ee1e	factor	fctr	FactorDAO	f	\N	2023-05-24	2023-05-24
41aa517a-18ab-4ee2-855e-647ca00513d5	facts	bkc	FACTS	f	\N	2023-05-24	2023-05-24
e508d6c7-0dc5-44e2-924d-d90b21e6af06	fado-go	fado	FADO Go	f	\N	2023-05-24	2023-05-24
04ed5238-1c7d-46d2-b621-90c05e2d0a85	fairum	fai	Fairum	f	\N	2023-05-24	2023-05-24
925935a2-4807-49b3-97cc-182c7691a907	faith-tribe	ftrb	Faith Tribe	f	\N	2023-05-24	2023-05-24
e4a1b646-1a6e-4671-8f14-ff33055e7345	fake-market-cap	cap	Fake Market Cap	f	\N	2023-05-24	2023-05-24
db3d435c-9d0c-45a2-ae6d-6e8bd80272fc	falcon	fln	Falcon	f	\N	2023-05-24	2023-05-24
39082339-a93c-4fc9-b1b7-cefd7dc51a04	falcon-nine	f9	Falcon Nine	f	\N	2023-05-24	2023-05-24
45190a08-e3bd-4be4-a364-79019c2cedb5	falcon-swaps	falcons	FALCONS	f	\N	2023-05-24	2023-05-24
1788d2ee-287d-4fdc-9647-d44702c7ca72	falcon-token	fnt	Falcon Project	f	\N	2023-05-24	2023-05-24
15d25984-a922-4610-8d35-2e3989c56fc1	falconx	falcx	FalconX	f	\N	2023-05-24	2023-05-24
d6fb1a8b-32ac-49c7-a503-03056171eac8	fame-mma	fame	Fame MMA	f	\N	2023-05-24	2023-05-24
66d0b6f8-7364-43aa-b6bd-e39831120b43	fame-reward-plus	frp	Fame Reward Plus	f	\N	2023-05-24	2023-05-24
6c5a56c0-725f-4a47-b46f-16a1ca69374b	family-guy	guy	Family Guy	f	\N	2023-05-24	2023-05-24
cd97eb16-74af-44d2-875b-04cf3f77726c	famous-fox-federation	foxy	Famous Fox Federation	f	\N	2023-05-24	2023-05-24
d32645af-4e89-4d32-8c25-cdf42447ca54	fanadise	fan	Fanadise	f	\N	2023-05-24	2023-05-24
805b25b7-4d0e-4fb6-b0ab-6748ac10dfa8	fanc	fanc	fanC	f	\N	2023-05-24	2023-05-24
114b9e7e-3416-4d86-87ea-1e4e0ad789da	fancy-games	fnc	Fancy Games	f	\N	2023-05-24	2023-05-24
f5748e4c-40cf-4705-ad72-981697b7fb11	fandom	fdm	Fautor	f	\N	2023-05-24	2023-05-24
a2e2e3c3-d4fa-4866-bade-6801e78f7ac8	fanfury	fury	Fanfury	f	\N	2023-05-24	2023-05-24
3f8bc988-5eb5-40e9-a3a1-e5bf7eaf2b75	fang-token	fang	FANG	f	\N	2023-05-24	2023-05-24
c86f9cf6-5c19-4bf5-9d7b-b9429a9f41a9	fanitrade	fani	FaniTrade	f	\N	2023-05-24	2023-05-24
25126cc2-7aaa-4c25-aecd-9f8c6c255be6	fanstime	fti	FansTime	f	\N	2023-05-24	2023-05-24
7d8e33f9-bf74-47e6-a1c4-1e21dc47bd85	fantasy-gold	fgc	Fantasy Gold	f	\N	2023-05-24	2023-05-24
ac7f654d-f032-4fa7-914f-f5e35288c84d	fantaverse	ut	Fantaverse	f	\N	2023-05-24	2023-05-24
75073236-6fc3-43bc-98e2-8dc53a2b30fa	fantohm	fhm	Fantohm	f	\N	2023-05-24	2023-05-24
9dcae52d-b452-42c8-bf4d-f5064ee49bcd	fantom	ftm	Fantom	f	\N	2023-05-24	2023-05-24
9453e976-79ab-4694-9a30-f653e5876fe1	fantom-doge	rip	Fantom Doge	f	\N	2023-05-24	2023-05-24
74c94bce-52d8-483e-99bf-81e7b6fc5478	fantomgo	ftg	OnGo	f	\N	2023-05-24	2023-05-24
5bfe97af-e29f-4d41-b290-a3cb8b0638b7	fantom-libero-financial	flibero	Fantom Libero Financial	f	\N	2023-05-24	2023-05-24
54c56469-3b03-4f16-9238-f10c33aa7074	fantom-maker	fame	Fantom Maker	f	\N	2023-05-24	2023-05-24
b72add48-f44d-466e-a951-67797f827484	fantom-oasis	ftmo	Fantom Oasis	f	\N	2023-05-24	2023-05-24
6bc4a046-cb08-446b-ae45-6964b7cd4794	fantomstarter	fs	FantomStarter	f	\N	2023-05-24	2023-05-24
6ab7ffa5-bbe7-4744-9406-f569469aec1c	fantom-usd	fusd	Fantom USD	f	\N	2023-05-24	2023-05-24
1f442d28-88e1-447b-932b-2595ea3097c5	fanverse-token	ft	Fanverse Token	f	\N	2023-05-24	2023-05-24
3ba5022e-44d2-4ce1-860a-3bf6f6a74227	fanzee-token	fnz	Fanzee Token	f	\N	2023-05-24	2023-05-24
d2d0aeba-1d69-4f88-87a2-27c58d806022	fanzy	fx1	FANZY	f	\N	2023-05-24	2023-05-24
03a2077e-7c19-4234-8787-a7ba7cd74636	faraland	fara	FaraLand	f	\N	2023-05-24	2023-05-24
02edc4a0-db37-4a45-8f3e-14a39af07123	farmerdoge	crop	FarmerDoge	f	\N	2023-05-24	2023-05-24
512165d1-1adb-46cb-b48f-2ee52ae6cd7c	farmers-only	fox	FoxSwap	f	\N	2023-05-24	2023-05-24
8db73f5f-1385-4c33-b52f-cbdfd55170f1	farmers-world-wood	fww	Farmers World Wood	f	\N	2023-05-24	2023-05-24
ba102a0e-7f6d-4085-8d08-a2dcf1ea8724	farmland-protocol	far	Farmland Protocol	f	\N	2023-05-24	2023-05-24
1781aea5-067f-453a-abf5-68b7028f8c18	farms-of-ryoshi	noni	Farms of Ryoshi	f	\N	2023-05-24	2023-05-24
20d72437-c47b-4274-aeec-9dbca146d51e	fashion-coin	fshn	Fashion Coin	f	\N	2023-05-24	2023-05-24
e5ac82ed-0b8f-47e4-bf9f-042d9fa62109	fast-finance	fast	Fast Finance	f	\N	2023-05-24	2023-05-24
68a12532-3e0d-4b68-9423-e77ee77ad34e	fastswap-bsc-2	fast	Fastswap (BSC)	f	\N	2023-05-24	2023-05-24
e7bb5540-647f-4837-b7e4-a6dc570c22e9	fasttoken	ftn	Fasttoken	f	\N	2023-05-24	2023-05-24
f820a100-4e14-4195-bfe0-78553abf3e02	fat-cat	fatcat	FAT CAT	f	\N	2023-05-24	2023-05-24
b3ea2d06-3397-4348-a7ad-00b77312c3c0	fathom	$fathom	Fathom	f	\N	2023-05-24	2023-05-24
5e7c6f61-5d3d-406a-8118-8b31d48c9aec	fatih-karagumruk-sk-fan-token	fksk	Fatih Karagümrük SK Fan Token	f	\N	2023-05-24	2023-05-24
17945d2e-0a24-4eb0-9e64-188f8a3a663c	favor	favor	Favor	f	\N	2023-05-24	2023-05-24
3562c304-6931-4ca5-bc1e-ffeb2b034943	fayre	fayre	Fayre	f	\N	2023-05-24	2023-05-24
4a770002-8e0a-4299-9a21-db366a667025	fbomb	bomb	Fantom Bomb	f	\N	2023-05-24	2023-05-24
16a2633a-e948-4aec-9959-5ec161896d06	fc-barcelona-fan-token	bar	FC Barcelona Fan Token	f	\N	2023-05-24	2023-05-24
e2e197b4-d137-442a-9418-6d7a7d755064	fc-porto	porto	FC Porto	f	\N	2023-05-24	2023-05-24
b647b706-6efb-47b2-b260-370b14e13beb	fcr-coin	fcr	FCR Coin	f	\N	2023-05-24	2023-05-24
63d95c2d-3f10-4396-b38c-14de94787d9d	fc-sion-fan-token	sion	FC Sion Fan Token	f	\N	2023-05-24	2023-05-24
6d9c0007-dd06-4995-9aaa-cb1437294a29	fear	fear	FEAR	f	\N	2023-05-24	2023-05-24
1abef7d7-9ecb-4188-8d3a-def43d278173	hord	hord	Hord	f	\N	2023-05-24	2023-05-24
bd0b9b66-718a-42f9-b73a-68df90319c9b	feathercoin	ftc	Feathercoin	f	\N	2023-05-24	2023-05-24
5f139a7c-bd78-4553-80ff-effaebf9c564	fedoracoin	tips	Fedoracoin	f	\N	2023-05-24	2023-05-24
477893bc-e61d-41cf-bad5-5b906d579f89	feeder-finance	feed	Feeder Finance	f	\N	2023-05-24	2023-05-24
c46e9bcb-a122-4d3e-b55a-976b4a7fe904	feg-bsc	feg	FEG BSC	f	\N	2023-05-24	2023-05-24
73c8775e-e1fd-4f37-9e1c-8b64ba583291	feg-token	feg	FEG (OLD)	f	\N	2023-05-24	2023-05-24
d3ea4b3a-a0d7-4b8a-98f0-2aebfff7cb5a	feg-token-2	feg	FEG ETH	f	\N	2023-05-24	2023-05-24
070e4330-da98-4005-a81d-fe19f6f3db28	feg-token-bsc	feg	FEG BSC (OLD)	f	\N	2023-05-24	2023-05-24
f59bd814-1029-42ae-81a6-8dc775cbfe7b	feichang-niu	fcn	Feichang Niu	f	\N	2023-05-24	2023-05-24
a6f79397-d32e-4b89-946c-013ca8be94d0	feisty-doge-nft	nfd	Feisty Doge NFT	f	\N	2023-05-24	2023-05-24
286e2932-0281-48ee-949f-0120e711ce8e	fei-usd	fei	Fei USD	f	\N	2023-05-24	2023-05-24
8e054607-7f34-438d-8561-dd53d1be94c3	felix	flx	Felix	f	\N	2023-05-24	2023-05-24
6b318903-e61e-4e69-8a38-589842b23556	fellaz	flz	Fellaz	f	\N	2023-05-24	2023-05-24
b62d6091-aebe-4e06-ba78-11b9afe6d9f2	fenerbahce-token	fb	Fenerbahçe	f	\N	2023-05-24	2023-05-24
3ed6c045-ebe8-418d-9e0a-0bff3687c0e1	fenglvziv2	fenglvziv2	FengLvZiV2	f	\N	2023-05-24	2023-05-24
1076852e-a04e-4b1b-ba53-45a32c543736	ferma	ferma	Ferma	f	\N	2023-05-24	2023-05-24
40768014-96ae-400c-8c8b-179a34e814c1	ferro	fer	Ferro	f	\N	2023-05-24	2023-05-24
fce0e258-3c00-49a7-85b1-66605280e6d4	ferrum-network	frm	Ferrum Network	f	\N	2023-05-24	2023-05-24
9e2c518d-b971-4906-9571-249dd17c4c32	festa-finance	ffa	Festa Finance	f	\N	2023-05-24	2023-05-24
425a9839-63c3-4776-ba12-76d97cc01e83	fetch-1dbdbfe5-2eb9-46c9-81dc-ecca4fa884a7	fetch	Fetch	f	\N	2023-05-24	2023-05-24
5dec7acd-40d6-4e5b-a285-476f8c524732	fetch-ai	fet	Fetch.ai	f	\N	2023-05-24	2023-05-24
7fb2aa5a-d08d-4f33-b30e-07a25eac4922	feyorra	fey	Feyorra	f	\N	2023-05-24	2023-05-24
f3978c36-fe15-49b2-9534-00f0e987e64a	fgdswap	fgds	FGDSwap	f	\N	2023-05-24	2023-05-24
8ebcc5d5-8ff7-4e48-98cd-976a95a31d47	fibodex	fibo	FiboDex	f	\N	2023-05-24	2023-05-24
958c7914-b3b6-4a06-a866-30de7d46d7e1	fibos	fo	FIBOS	f	\N	2023-05-24	2023-05-24
6b1c3834-ba45-47a2-8b4a-926b02f782b7	fibo-token	fibo	FibSwap DEX	f	\N	2023-05-24	2023-05-24
b53c2d74-2e78-4188-bcc9-da2eac618cd7	fidance	fdc	Fidance	f	\N	2023-05-24	2023-05-24
9775e8d0-7480-46a6-9fa5-66c68bb94ecc	fidelis	fdls	FIDELIS	f	\N	2023-05-24	2023-05-24
82961c70-9430-44c8-bd7d-184379b9130c	fidira	fid	Fidira	f	\N	2023-05-24	2023-05-24
d9cb1787-7bef-470b-bf6e-dc736eacf78d	fidu	fidu	Fidu	f	\N	2023-05-24	2023-05-24
0c0e8b5b-d1da-4163-b9d0-934990d6a6ec	fief	fief	Fief	f	\N	2023-05-24	2023-05-24
3735040d-2420-4991-9f64-134613324f4b	fiero	fiero	Fiero	f	\N	2023-05-24	2023-05-24
e6f9dcff-a433-4b1b-a567-010412108371	fiftyonefifty	fifty	FIFTYONEFIFTY	f	\N	2023-05-24	2023-05-24
caabeece-9b7e-4e2e-9e4b-f922383389ee	fight-of-the-ages	fota	Fight Of The Ages	f	\N	2023-05-24	2023-05-24
8710c441-6749-427e-9e87-f2c06b043e4a	fight-out	fght	Fight Out	f	\N	2023-05-24	2023-05-24
1360e507-cac2-44ba-9fe8-795bab60226b	fight-win-ai	fwin-ai	Fight Win AI	f	\N	2023-05-24	2023-05-24
7ee757b3-3cf7-44ad-8938-9212568c2c4d	figments-club	figma	Figments Club	f	\N	2023-05-24	2023-05-24
181fd328-de5b-4cf0-8c1b-1a85190f108e	figure-dao	fdao	Figure DAO	f	\N	2023-05-24	2023-05-24
0a90486b-9cf6-49bc-b530-01d77273dbbd	filda	filda	Filda	f	\N	2023-05-24	2023-05-24
c63f399e-017e-484c-9cb2-698bd199ff47	filecash	fic	Filecash	f	\N	2023-05-24	2023-05-24
298a7edc-1bba-4e04-900e-d7708696ce34	filecoin	fil	Filecoin	f	\N	2023-05-24	2023-05-24
d47dc918-cf8a-4450-ba85-5b323ebddebd	filecoin-standard-full-hashrate	sfil	Filecoin Standard Full Hashrate	f	\N	2023-05-24	2023-05-24
11694ada-f98d-405b-b671-461064158e8f	fileshare-platform	fsc	Fileshare Platform	f	\N	2023-05-24	2023-05-24
c0b9ef6d-7c8c-4602-9374-36561484fcac	filestar	star	FileStar	f	\N	2023-05-24	2023-05-24
f0d1cb1e-55f1-4781-8c6c-84e8f0839173	filipcoin	fcp	Filipcoin	f	\N	2023-05-24	2023-05-24
06ad9804-c1d1-4bca-991a-6e4fdb284247	filmcredits	film	FILMCredits	f	\N	2023-05-24	2023-05-24
976bdb12-f512-4a79-8e99-4a5679e4bdcd	final-frontier	frnt	Final Frontier	f	\N	2023-05-24	2023-05-24
314d28a6-442c-4c2e-a863-7e2cf30e3b8a	finance-ai	financeai	Finance AI	f	\N	2023-05-24	2023-05-24
78a3b144-1051-43fa-b726-5e4654ef2ba9	finance-blocks	fbx	Finance Blocks	f	\N	2023-05-24	2023-05-24
3c0b8f9c-9e22-4d9f-9b99-740b66b9cb27	finance-vote	fvt	Finance Vote	f	\N	2023-05-24	2023-05-24
2fb3272c-4b3d-4ec4-b094-23164a6d16b6	financie-token	fnct	Financie Token	f	\N	2023-05-24	2023-05-24
2efee9b3-8586-4fbf-ba6f-6fe4a7e42b2f	finblox	fbx	Finblox	f	\N	2023-05-24	2023-05-24
9ba142b7-8db9-4e73-9dce-45b4f11fa638	findora	fra	Findora	f	\N	2023-05-24	2023-05-24
30ba8bc3-2196-491d-a989-97c66e405307	finexbox-token	fnb	Finexbox	f	\N	2023-05-24	2023-05-24
7f08b269-f75d-40aa-b1a4-7b8891c92ce8	fingerprints	prints	FingerprintsDAO	f	\N	2023-05-24	2023-05-24
859fabf1-8679-4c47-8566-7155cdcadf15	finminity	fmt	Finminity	f	\N	2023-05-24	2023-05-24
f61b2d0d-0918-4b32-a088-c15226591f55	fins-token	fins	Fins	f	\N	2023-05-24	2023-05-24
b102774d-25e2-4770-a49f-da4288739ead	fintoken	ftc	FinToken	f	\N	2023-05-24	2023-05-24
26430bda-1ec6-4d5c-a518-24d06353b737	fintropy	fint	Fintropy	f	\N	2023-05-24	2023-05-24
f08913a3-39cd-4e83-917f-42b32f211c75	fintrux	ftx	FintruX	f	\N	2023-05-24	2023-05-24
869e00b0-3f8a-426f-93ec-55f48f4fe13f	finx	finx	FINX	f	\N	2023-05-24	2023-05-24
53c1bcfb-6161-4796-bf49-067521d9a979	finxflo	fxf	FINXFLO	f	\N	2023-05-24	2023-05-24
c100285d-1287-4aa5-98a8-c9c862a441e5	fio-protocol	fio	FIO Protocol	f	\N	2023-05-24	2023-05-24
80ada824-c0ce-4d3d-9b74-6fc288504353	fira	fira	FIRA	f	\N	2023-05-24	2023-05-24
f66de161-2f73-4f67-8624-9c886e62452b	fira-cronos	fira	Defira (Cronos)	f	\N	2023-05-24	2023-05-24
4a76fe88-50a7-4b3a-b942-d25f95650bf3	fireal	frl	Fireal	f	\N	2023-05-24	2023-05-24
42ef5d59-d163-4e1f-9ef3-711dbb6b6ddd	fireants	ants	FireAnts	f	\N	2023-05-24	2023-05-24
ebda8857-6c36-424d-93d7-a94163355e01	fireball-2	fire	FireBall	f	\N	2023-05-24	2023-05-24
a72c001f-84b2-4922-92fd-1de8580f2f92	firebird-aggregator	fba	Firebird Aggregator	f	\N	2023-05-24	2023-05-24
226be968-3526-4e40-a701-55f27e3a84f2	firebot	fbx	FireBot	f	\N	2023-05-24	2023-05-24
24d787e3-2788-46a0-a04e-4b3b16a6764d	fire-lotto	flot	Fire Lotto	f	\N	2023-05-24	2023-05-24
ba2e9347-3097-4079-bc40-1ef7fec2b1b7	fire-protocol	fire	Fire Protocol	f	\N	2023-05-24	2023-05-24
7052822c-79ac-4a81-bd3d-6044d28633e2	firestarter	flame	FireStarter	f	\N	2023-05-24	2023-05-24
ec9626d6-5451-46a9-a89b-928c029c92e6	firmachain	fct	Firmachain	f	\N	2023-05-24	2023-05-24
b4e0cc01-0eb7-4ba6-bb54-7e6e2f3719ef	first-ever-nft	fen	First Ever NFT	f	\N	2023-05-24	2023-05-24
7b8ba221-c5ed-4043-a611-2361fb344d4c	firsthare	firsthare	FirstHare	f	\N	2023-05-24	2023-05-24
ff92365e-1c03-4506-99d9-c48706b58392	firulais-wallet-token	fiwt	Firulais Wallet	f	\N	2023-05-24	2023-05-24
e9e678ea-90e1-4959-8da2-9b9f3580550e	fisco	fscc	FISCO Coin	f	\N	2023-05-24	2023-05-24
13e4636a-20f2-4f30-ac7d-48c3af420d5b	fish-crypto	fico	Fish Crypto	f	\N	2023-05-24	2023-05-24
b7dd3339-4617-4a39-a99f-6c30421a70ba	fistbump	fist	Fistbump	f	\N	2023-05-24	2023-05-24
d70475bb-35d2-4df6-a6e7-98ef73046fab	fitmax	fitm	FitMax	f	\N	2023-05-24	2023-05-24
cd002047-b98e-479b-8347-feb14fbf4405	fitmint	fitt	Fitmint	f	\N	2023-05-24	2023-05-24
3f67f541-45c8-4156-b394-89bab865a9ed	fitr-metaverse-token	fmt	FitR Metaverse Token	f	\N	2023-05-24	2023-05-24
fd6c1e15-005c-474f-bce1-42a686645e43	fix00	fix00	Fix00	f	\N	2023-05-24	2023-05-24
7e73981a-e2ce-4bca-b4e4-b426caddf269	flag-media	flag	Flag Media	f	\N	2023-05-24	2023-05-24
6bfec3bc-f51d-4baf-937c-2d1c423032ad	flag-network	flag	Flag Network	f	\N	2023-05-24	2023-05-24
48e389f3-a761-4e0a-a392-9565655cc79d	flair-dex	fldx	Flair Dex	f	\N	2023-05-24	2023-05-24
7eaa3fef-af83-4fea-b18d-c3f50231c94f	flamengo-fan-token	mengo	Flamengo Fan Token	f	\N	2023-05-24	2023-05-24
2baeb737-9815-4aaf-bdc8-18a8d69df076	flame-protocol	flame	Flame Protocol	f	\N	2023-05-24	2023-05-24
833716e0-d37c-4ac0-89d5-5e94dcdc8a77	flamingghost	fghst	FlamingGhost	f	\N	2023-05-24	2023-05-24
b671a497-cd86-408b-802a-99324bd8ef38	flamingo-finance	flm	Flamingo Finance	f	\N	2023-05-24	2023-05-24
86b73918-1a43-47c4-8f43-d8f205286df9	flare-finance	exfi	Flare Finance	f	\N	2023-05-24	2023-05-24
1e925478-1714-4f2e-9306-defc5728a7ff	flare-networks	flr	Flare	f	\N	2023-05-24	2023-05-24
a055c5f6-99af-4b47-932b-cb314bd8a76c	flare-token	1flr	Flare Token	f	\N	2023-05-24	2023-05-24
1a4893fe-2b5e-475e-b05a-a60a1144644c	flash-stake	flash	Flashstake	f	\N	2023-05-24	2023-05-24
20a3ea44-7644-4b0f-9792-b0946783f87f	flash-token	flash	Flash Loans	f	\N	2023-05-24	2023-05-24
d32731d2-6250-4d6d-b01b-8713384e34ce	flash-token-2	flash	Flash	f	\N	2023-05-24	2023-05-24
26a8eaf2-3c43-4bb6-a647-9720da6963b1	flatqube	qube	FlatQube	f	\N	2023-05-24	2023-05-24
05d64a07-e092-4818-a037-c2a1714224c7	flex-coin	flex	FLEX Coin	f	\N	2023-05-24	2023-05-24
c9172d98-c137-4e71-9d47-efb19f8c79c7	flexmeme	flex	FlexMeme	f	\N	2023-05-24	2023-05-24
362f9fdf-6220-44ae-b805-4f47202e230b	flexq	flq	FlexQ	f	\N	2023-05-24	2023-05-24
f131a76e-137e-47be-bab1-5c42dfb7a653	flex-usd	flexusd	flexUSD	f	\N	2023-05-24	2023-05-24
fc32a637-7f14-4c4f-8ca3-4953083226aa	flightclupcoin	flight	FlightClupcoin	f	\N	2023-05-24	2023-05-24
985f57e2-c83b-42f8-ac12-8cee5d6c196f	flits	fls	Flits	f	\N	2023-05-24	2023-05-24
a6beff81-93c3-43b0-ac47-33a12c4311b4	float-protocol	bank	Float Protocol	f	\N	2023-05-24	2023-05-24
1a28e7ee-2b7d-4770-8b81-cf312b31c597	floki	floki	FLOKI	f	\N	2023-05-24	2023-05-24
bca7ba95-de32-4ac2-90b7-aaccab8f7c10	flokibonk	flobo	FlokiBonk	f	\N	2023-05-24	2023-05-24
fcfb7fda-43b3-4f11-b500-20244476386e	floki-cash	flokicash	Floki Cash	f	\N	2023-05-24	2023-05-24
147da752-76b4-493f-9aa0-47aa47a0b2d1	floki-ceo	flokiceo	FLOKI CEO	f	\N	2023-05-24	2023-05-24
da48e7fe-4e33-48d9-84ff-62ee3307ee80	floki-ceo-coin	fcc	Floki CEO Coin	f	\N	2023-05-24	2023-05-24
20a0bd40-8ce2-4751-b646-688818b22c7b	flokidash	flokidash	FlokiDash	f	\N	2023-05-24	2023-05-24
41ec9cd9-aacb-4167-a9a2-23cd75114560	floki-gpt	fgpt	Floki GPT	f	\N	2023-05-24	2023-05-24
365cef0f-d183-4958-8ab8-2106a2e8e7ed	flokimooni	flokim	Flokimooni	f	\N	2023-05-24	2023-05-24
dba78aea-19d2-43da-acf9-9c65523902d3	floki-musk	floki	Floki Musk	f	\N	2023-05-24	2023-05-24
63534aee-90f4-4b85-9394-a70bffa8f238	floki-rocket	rloki	Floki Rocket	f	\N	2023-05-24	2023-05-24
154f8df9-a90c-4116-8ee4-3be8b14a4119	floki-santa	flokisanta	Floki Santa	f	\N	2023-05-24	2023-05-24
b6659304-a9ed-49eb-a039-5ba0a4fc3560	floki-shiba-pepe-ceo	3ceo	FLOKI SHIBA PEPE CEO	f	\N	2023-05-24	2023-05-24
592c5554-fa8c-4b01-9f04-46402741e6c9	flokiter-ai	fai	FlokiTer	f	\N	2023-05-24	2023-05-24
f071c1d5-4845-4655-ac8d-fbb10d9f8b38	flona	flona	Flona	f	\N	2023-05-24	2023-05-24
dc3dcc19-da48-43b8-88c7-dd573a0d5db0	floof	floof	FLOOF	f	\N	2023-05-24	2023-05-24
92db57a9-2202-4eb1-91eb-b7b33649961b	floordao	floor	FloorDAO	f	\N	2023-05-24	2023-05-24
4fce80b9-91d7-4e66-9676-412d62882b5c	florachain-yield-token	fyt	FloraChain	f	\N	2023-05-24	2023-05-24
b1af127e-0ddd-4a94-a7ff-87c68c6fac3a	florin	xfl	Florin	f	\N	2023-05-24	2023-05-24
ffe948fd-f642-4c01-bea3-e9cf457aefb9	floshido-inu	floshido	FLOSHIDO INU	f	\N	2023-05-24	2023-05-24
8267bfe6-bad3-4aa8-93ca-c6b7e4d226cf	flourishing-ai-token	ai	Flourishing AI	f	\N	2023-05-24	2023-05-24
d6c34653-0e29-4c7b-b868-884005b93067	flow	flow	Flow	f	\N	2023-05-24	2023-05-24
3a365d17-23df-47c3-a9d5-29870cc0624a	flowchaincoin	flc	Flowchain	f	\N	2023-05-24	2023-05-24
8ae57023-2283-4f04-9786-eb0fcf371c67	floyx-new	floyx	Floyx	f	\N	2023-05-24	2023-05-24
c01cb78f-212a-492b-911c-fb05d7a89087	fluffy-coin	fluf	Fluffy Coin	f	\N	2023-05-24	2023-05-24
eb93ffa9-4663-4568-85b4-7f07a891e9b5	fluffy-token	$fluffy	Fluffy Token	f	\N	2023-05-24	2023-05-24
6b8cbb95-a217-40ce-9ea8-7b8931ec155d	fluid-dai	fdai	Fluid DAI	f	\N	2023-05-24	2023-05-24
5daeba4b-6a2a-4c20-88dc-a9fd0a561be2	fluidfi	fluid	FluidFi	f	\N	2023-05-24	2023-05-24
a0766bcf-72cc-4da4-9fe1-f5069b3ea157	fluid-frax	ffrax	Fluid FRAX	f	\N	2023-05-24	2023-05-24
dde7284a-9c33-44a7-9471-e8170a2f0a47	fluid-tusd	ftusd	Fluid TUSD	f	\N	2023-05-24	2023-05-24
d3846b55-6d61-4659-944c-d78ba3cde1d1	fluid-usdc	fusdc	Fluid USDC	f	\N	2023-05-24	2023-05-24
cf32f03f-3c73-4d88-99b3-b36832348446	fluid-usdt	fusdt	Fluid USDT	f	\N	2023-05-24	2023-05-24
7220d075-ff16-4c34-99f9-abe83422d016	fluminense-fc-fan-token	flu	Fluminense FC Fan Token	f	\N	2023-05-24	2023-05-24
2ad906dc-baaa-4eea-af3b-577d9a5a26b1	flurry	flurry	Flurry Finance	f	\N	2023-05-24	2023-05-24
bd8e1dbc-e33d-4279-a0fc-618a250a2cac	flute	flut	Flute	f	\N	2023-05-24	2023-05-24
99dc8d93-e936-4025-8e10-c69f14e9ddb7	fluus	fluus	FLUUS	f	\N	2023-05-24	2023-05-24
7c8182a4-7829-4d34-849c-b893a34a642b	flux	flux	Datamine FLUX	f	\N	2023-05-24	2023-05-24
ebb91841-16e2-498e-b914-54b9a26d545b	flux-dai	fdai	Flux DAI	f	\N	2023-05-24	2023-05-24
baa6d9ba-9b10-424a-9c6b-f9bae360ccff	flux-frax	ffrax	Flux FRAX	f	\N	2023-05-24	2023-05-24
3492722e-77ad-4b55-8ab6-e68bffd3d57e	flux-protocol	flux	Flux Protocol	f	\N	2023-05-24	2023-05-24
6629b6a4-be84-40d3-82d7-ff7ac457d3d6	flux-token	flx	SEDA Protocol	f	\N	2023-05-24	2023-05-24
80b30e07-8439-448e-825c-1c5445dcbc85	flux-usdc	fusdc	Flux USDC	f	\N	2023-05-24	2023-05-24
c3dcb8bb-3c73-4a05-9e8f-18a4331f621d	flux-usdt	fusdt	Flux USDT	f	\N	2023-05-24	2023-05-24
3ab4fc3a-1f38-4b50-80b4-0b0de8cd57af	flypme	fyp	FlypMe	f	\N	2023-05-24	2023-05-24
1482febd-e812-4de7-ad19-8525310ec269	fncy	fncy	FNCY	f	\N	2023-05-24	2023-05-24
0bd37f70-4590-4a61-85af-ae96b8164823	fnkcom	fnk	Fnk.com	f	\N	2023-05-24	2023-05-24
af252808-a474-4038-b9b7-0608507264bd	foam-protocol	foam	FOAM	f	\N	2023-05-24	2023-05-24
1c591738-b687-4ba1-8ee1-c95901145234	fodl-finance	fodl	Fodl Finance	f	\N	2023-05-24	2023-05-24
ae016eb6-6b4e-463b-a9ab-de66d30f728f	fofo-token	fofo	FOFO Token	f	\N	2023-05-24	2023-05-24
f70651ac-11c0-4d7d-9056-0fbd68c4cabb	foho-coin	foho	Foho Coin	f	\N	2023-05-24	2023-05-24
2a8b2318-fc99-44f3-aad5-37a70d787603	foincoin	foin	Foin	f	\N	2023-05-24	2023-05-24
6b427dc3-062d-4d46-b679-a6ed137e1212	folder-protocol	fol	Folder Protocol	f	\N	2023-05-24	2023-05-24
b94a2a8c-471f-492a-8f53-6366b5dd1005	follow-token	folo	Alpha Impact	f	\N	2023-05-24	2023-05-24
608ca1ed-dd61-401d-b19a-2277be35f0fa	fomobsc	fomo	FomoBSC	f	\N	2023-05-24	2023-05-24
39344399-c896-4c1d-862a-6187a716d930	fomo-eth	fomo	Fomo Eth	f	\N	2023-05-24	2023-05-24
7b55230f-15d4-4951-9beb-1752ff2e2146	fone	fone	Fone	f	\N	2023-05-24	2023-05-24
29b2c420-33ce-4389-ab9b-3fcae91d901f	fonsmartchain	fon	FONSmartChain	f	\N	2023-05-24	2023-05-24
6c20b7a0-4dd4-4193-9376-16f962efdf32	font	font	Font	f	\N	2023-05-24	2023-05-24
d5591086-9573-4202-ae25-53e946d08e34	fonzy	fonzy	Fonzy	f	\N	2023-05-24	2023-05-24
4a8bc28b-375d-4e75-b7ae-e29d8e096d85	food-bank	food	Food Bank	f	\N	2023-05-24	2023-05-24
c65a3813-bebd-44f9-a5c1-6ca64e729588	foodchain-global	food	FoodChain Global	f	\N	2023-05-24	2023-05-24
052384fd-88c4-4cfb-992a-928a1b2aedde	football-coin	xfc	Football Coin	f	\N	2023-05-24	2023-05-24
b23ac878-e240-4106-9df1-ae93536bc174	football-decentralized	fbd	Football Decentralized	f	\N	2023-05-24	2023-05-24
0beb14d3-da34-4e85-9865-62f102232b98	footballfanapp	fnc	FanCoin®	f	\N	2023-05-24	2023-05-24
fced2cfd-7e32-4631-8886-46a2d2586c24	footballstars	fts	FootballStars	f	\N	2023-05-24	2023-05-24
b5598290-a9a8-4e37-89a2-65ac9e7cfa00	football-world-community	fwc	Football World Community	f	\N	2023-05-24	2023-05-24
59815db7-9c59-43e6-9b73-b759fb8e26b6	forbidden-fruit-energy	ffe	Forbidden Fruit Energy	f	\N	2023-05-24	2023-05-24
b38c5e9c-2407-4e65-952d-1f7825e38cb5	force-bridge-usdc	usdc	Force Bridge USDC	f	\N	2023-05-24	2023-05-24
c8fdd0a0-5a33-4b0a-a773-095242627711	force-of-nature	fon	Force of Nature	f	\N	2023-05-24	2023-05-24
6689ae69-b0ee-4531-bf19-27bd95ed4371	force-protocol	for	ForTube	f	\N	2023-05-24	2023-05-24
d70f90d9-36a0-4ac7-85d8-05ef48c4fe05	forefront	ff	Forefront	f	\N	2023-05-24	2023-05-24
498337dc-c408-4261-8360-5d58fd1277dc	forest-knight	knight	Forest Knight	f	\N	2023-05-24	2023-05-24
e2014e39-c5ac-4560-bdfe-3e1f4a9ad826	forestry	fry	Forestry	f	\N	2023-05-24	2023-05-24
e8d893c5-07c7-4504-bfd3-f973aea4b3d3	foreverblast	feb	ForeverBlast	f	\N	2023-05-24	2023-05-24
42f61e85-261e-4bc0-9866-6302195ab8a0	forever-burn	fburn	Forever Burn	f	\N	2023-05-24	2023-05-24
098481fc-3500-4381-8f2b-8d11287be09c	forever-shiba	4shiba	FOREVER SHIBA	f	\N	2023-05-24	2023-05-24
1c184f99-6e73-48f4-b2bc-4c331e77508e	forexcoin	forex	FOREXCOIN	f	\N	2023-05-24	2023-05-24
c46a1c31-cd7f-4ad8-9a5b-1e8fa3445404	forge	forge	Forge	f	\N	2023-05-24	2023-05-24
b85e4692-cdc7-4e78-a9b5-33b52f267294	forge-finance	forge	Forge Finance	f	\N	2023-05-24	2023-05-24
5d8a3d5d-ad09-4bd6-bc20-a2949291f7e3	for-loot-and-glory	flag	For Loot And Glory	f	\N	2023-05-24	2023-05-24
ecf34e92-87db-40b0-bc7d-08f262d8a707	formation-fi	form	Formation FI	f	\N	2023-05-24	2023-05-24
7d1d7f63-31aa-468d-b6c4-44df7968d6af	formula-inu	finu	Formula Inu	f	\N	2023-05-24	2023-05-24
1bf87158-f49f-4648-910d-647523f36d5d	forta	fort	Forta	f	\N	2023-05-24	2023-05-24
f17f3924-6320-47b2-b591-cbd367a3303a	forthbox	fbx	ForthBox	f	\N	2023-05-24	2023-05-24
62229356-c78e-46a8-b127-270fc34d4b2f	fortis	fort	Fortis Coin	f	\N	2023-05-24	2023-05-24
0ad2f4ed-645e-4898-afd8-5216d34fed95	fortknoxter	fkx	FortKnoxster	f	\N	2023-05-24	2023-05-24
95fc4a08-5f69-4871-b28a-6969bafd6fa2	fortress	fts	Fortress Loans	f	\N	2023-05-24	2023-05-24
9a780f20-a99d-494b-8c2e-6065e479d0da	fortuna-sittard-fan-token	for	Fortuna Sittard Fan Token	f	\N	2023-05-24	2023-05-24
e2aff4e8-a09e-4b38-b2b1-1c7e802b526e	fortune	fortune	Fortune	f	\N	2023-05-24	2023-05-24
6a47eb86-73d2-4e1a-9c4f-3b852b3cb3b0	fortune-cookie	fct	Fortune Cookie	f	\N	2023-05-24	2023-05-24
f1b843fd-9f46-4c43-818f-9f16d20a1545	forus	fors	Forus	f	\N	2023-05-24	2023-05-24
105f10cd-9782-4fe3-aff4-f852364f57d6	foundation	fnd	Foundation Token	f	\N	2023-05-24	2023-05-24
7298c5bc-ec1f-4b04-bc38-4097fb950b82	fountain-protocol	ftp	Fountain Protocol	f	\N	2023-05-24	2023-05-24
b34e3dd9-1285-4912-bcb0-21b4ebc1339a	fourcoin	four	FourCoin	f	\N	2023-05-24	2023-05-24
23ea96d1-0550-44a7-8100-502dfc4ceb0a	foxe	foxe	FOXE	f	\N	2023-05-24	2023-05-24
6cabb458-f35a-488f-9a95-7aa583f412f9	fox-financev2	fox	Fox Finance V2	f	\N	2023-05-24	2023-05-24
6f9da6af-c766-42bf-856e-d6634fd02810	foxgirl	foxgirl	FoxGirl	f	\N	2023-05-24	2023-05-24
75f03294-2cce-4a74-a8ca-0d2db43cd881	fox-trading-token	foxt	Fox Trading	f	\N	2023-05-24	2023-05-24
3386d5d2-d95e-4a0c-90f9-4db9f5685bb1	fractal	fcl	Fractal	f	\N	2023-05-24	2023-05-24
07cee5a6-258c-42c5-8616-4888a56a186b	fraction	fraction	Fraction	f	\N	2023-05-24	2023-05-24
8d1e07d4-9426-433d-8e9e-be75e6bba4c1	fractionalized-smb-2367	daojones	Fractionalized SMB-2367	f	\N	2023-05-24	2023-05-24
c1d4652d-3681-4e6e-8d0d-a5ab4f036670	fracton-protocol	ft	Fracton Protocol	f	\N	2023-05-24	2023-05-24
f62d3df2-0a06-4f64-81e3-98e6959c9a5c	fragments-of-arker	foa	Fragments of Arker	f	\N	2023-05-24	2023-05-24
74f4cb5f-8e5d-4515-978b-e577079bc6f0	frakt-token	frkt	FRAKT	f	\N	2023-05-24	2023-05-24
a3381ad4-0ae3-43f1-8c26-7fc2216b7c8f	france-rev-finance	frf	FRANCE REV FINANCE	f	\N	2023-05-24	2023-05-24
5bcc3a68-332e-4ee9-8399-2cb12b32d783	frank-inu	frank	Frank Inu	f	\N	2023-05-24	2023-05-24
bc0a9f9f-f99c-4c82-b499-72ab067d8faf	franklin	fly	Franklin	f	\N	2023-05-24	2023-05-24
77f1c24e-9481-490c-b083-7e71e555d641	frax	frax	Frax	f	\N	2023-05-24	2023-05-24
45213e2a-0127-46d2-a961-629c71727f0f	frax-ether	frxeth	Frax Ether	f	\N	2023-05-24	2023-05-24
54e612c4-cc33-4069-857b-6d2ad5504ecb	frax-price-index	fpi	Frax Price Index	f	\N	2023-05-24	2023-05-24
a4d122b4-ff7d-4cd3-9211-c61907b07160	frax-price-index-share	fpis	Frax Price Index Share	f	\N	2023-05-24	2023-05-24
156334d4-1653-4663-9986-67a7f6083d43	frax-share	fxs	Frax Share	f	\N	2023-05-24	2023-05-24
d7e42419-7090-495c-aa97-9bbaf79ea67b	fredenergy	fred	FRED Energy	f	\N	2023-05-24	2023-05-24
aad108e9-d8a3-440f-b612-0454f09aa193	freebie-life-finance	frb	Freebie Life Finance	f	\N	2023-05-24	2023-05-24
72709b2c-72c8-46c3-9463-80480fe21dd7	freecash	fch	Freecash	f	\N	2023-05-24	2023-05-24
68569c56-fb15-43a0-a42c-da90277f24fa	freechat	fcc	Freechat	f	\N	2023-05-24	2023-05-24
bf337bf5-92ba-4f82-b253-3be3bfb96985	freedomcoin	freed	Freedomcoin	f	\N	2023-05-24	2023-05-24
66faa29e-8b3d-4fb7-9bce-7903d5640ff6	freedom-coin	free	FREEdom coin	f	\N	2023-05-24	2023-05-24
8f240744-ce32-4058-8bbc-d72e417e76b7	freedom-god-dao	fgd	Freedom God DAO	f	\N	2023-05-24	2023-05-24
9099bf5f-b434-4a73-be79-31cf85da24c7	freedom-jobs-business	$fjb	Freedom. Jobs. Business	f	\N	2023-05-24	2023-05-24
04aac0fd-eed3-4452-9ff6-1806c3a66607	freedom-reserve	fr	Freedom Reserve	f	\N	2023-05-24	2023-05-24
9edd1dda-ddd9-4fc7-ad28-1b654162d7b2	freela	frel	Freela	f	\N	2023-05-24	2023-05-24
b60b7784-6bb6-45dd-b8eb-3de27392cddc	freemoon-binance	fmb	FREEMOON BINANCE	f	\N	2023-05-24	2023-05-24
482073a6-c270-47c7-a60f-b21305fed77d	freerossdao	free	FreeRossDAO	f	\N	2023-05-24	2023-05-24
a38c1dae-a48a-430f-b0d1-f88118f9bec2	freeway	fwt	Freeway	f	\N	2023-05-24	2023-05-24
4cec84ce-8fc5-49ef-9c39-ace442a61861	freicoin	frc	Freicoin	f	\N	2023-05-24	2023-05-24
134ed9d6-c2d3-47ae-8ebb-bde0d3ab5fce	french-connection-finance	fcf	French Connection Finance	f	\N	2023-05-24	2023-05-24
490a7744-59d7-4d0a-b726-2aa004d987a7	french-digital-reserve	fdr	French Digital Reserve	f	\N	2023-05-24	2023-05-24
9e5674af-220a-41b9-ab3f-0f76cbaeaaaf	frens-coin	frens	Frens Coin	f	\N	2023-05-24	2023-05-24
c78c9829-9761-4fdc-833f-71675e8de459	freqai	freqai	FREQAI	f	\N	2023-05-24	2023-05-24
ab36bf62-ac80-4165-bb7a-d1a683794020	freth	freth	frETH	f	\N	2023-05-24	2023-05-24
fafa0afe-036b-4a09-8c37-0da0da09e4ca	freyala	xya	GameFi Crossing	f	\N	2023-05-24	2023-05-24
2348e9aa-7d22-42de-86f7-b28f093eda5e	friends-with-benefits-pro	fwb	Friends With Benefits Pro	f	\N	2023-05-24	2023-05-24
594626d2-c6fe-40a2-ba33-1a8aeb01d6bd	friendz	fdz	Friendz	f	\N	2023-05-24	2023-05-24
31576320-0309-4f38-b6b4-4c608024cb11	fringe-finance	frin	Fringe Finance	f	\N	2023-05-24	2023-05-24
f741a5a4-872e-4597-b268-e4cbc2842052	frog-ceo	frog ceo	FROG CEO	f	\N	2023-05-24	2023-05-24
bd413435-ab0c-4088-a219-b26054e04f48	froge-finance	frogex	FrogeX	f	\N	2023-05-24	2023-05-24
56a8d16f-773a-4a8b-b6c2-eb3b9946b00d	frog-inu	fgi	Frog Inu	f	\N	2023-05-24	2023-05-24
bdd6e90c-c613-4d17-9230-a6514c84358c	frogswap	frog	FrogSwap	f	\N	2023-05-24	2023-05-24
13933894-8af5-4ce9-8dcb-f7140b39971c	froki	froki	Froki	f	\N	2023-05-24	2023-05-24
ddb4a663-43c4-4948-b19f-7ee455b8a778	fronk	fronk	Fronk	f	\N	2023-05-24	2023-05-24
775bb974-2467-45b2-82a0-4436775c47f2	frontier-token	front	Frontier	f	\N	2023-05-24	2023-05-24
7fe1171a-157c-4c4b-a953-59a234b2fffd	front-row	frr	Frontrow	f	\N	2023-05-24	2023-05-24
fc71b6da-9db2-4343-872d-ab6925ba90f0	froyo-games	froyo	Froyo Games	f	\N	2023-05-24	2023-05-24
fe5d1db2-1700-4a29-a677-7e8c5d099791	frozen-walrus-share	wshare	Frozen Walrus Share	f	\N	2023-05-24	2023-05-24
8e447520-9ca6-446a-9b07-75afd2f6e2e5	fruits	frts	Fruits	f	\N	2023-05-24	2023-05-24
6b7756a5-014b-46f0-8bcc-2e6900e4a526	fruits-of-ryoshi	yuzu	Fruits of Ryoshi	f	\N	2023-05-24	2023-05-24
7dd29724-68a5-4c2e-81f2-8eb99f022757	frutti-dino	fdt	Frutti Dino	f	\N	2023-05-24	2023-05-24
237db2c6-44b3-4e22-bfc6-1a7ae480dd8c	fryscrypto	fry	FrysCrypto	f	\N	2023-05-24	2023-05-24
6379751a-c574-4d04-abb3-0ddf5801443c	frz-solar-system	frzss	Frz Solar System	f	\N	2023-05-24	2023-05-24
bff7f1f1-466b-4932-af02-924776541c61	fsn	fsn	FUSION	f	\N	2023-05-24	2023-05-24
280b67c9-4143-4c74-9dec-8dedf6185df1	fsw-token	fsw	Falconswap	f	\N	2023-05-24	2023-05-24
9c7cbc27-446e-4bb3-989e-4da2527def3c	ftdex	ftd	FTDex	f	\N	2023-05-24	2023-05-24
717a4625-4761-442a-a4a7-d065e0f97081	ftm-guru	elite	ftm.guru	f	\N	2023-05-24	2023-05-24
f277554d-b091-4663-b1e0-abbd4a5fff74	ftribe-fighters	f2c	Ftribe Fighters	f	\N	2023-05-24	2023-05-24
2ed7e974-d8ae-44d1-b865-8e301052b802	ftx-token	ftt	FTX	f	\N	2023-05-24	2023-05-24
e1ea5c58-ff0f-40a6-9e46-1f28ce4807b9	ftx-users-debt	fud	FTX Users' Debt	f	\N	2023-05-24	2023-05-24
8e0fd0a0-6985-4f03-be2c-765dedfac7df	ftx-wormhole	ftt	FTX (Wormhole)	f	\N	2023-05-24	2023-05-24
eb026721-15b6-4da6-b7f7-cd12e54bb4c0	fuc	fuc	FUBT Token	f	\N	2023-05-24	2023-05-24
71d09cb7-a3b4-46a7-a6d2-0e15598f9b47	fuck-pepe	fkpepe	Fuck Pepe	f	\N	2023-05-24	2023-05-24
7a744e08-c911-4079-bce7-1dd3ad10acb0	fuel-network	fuel	Fuel Network	f	\N	2023-05-24	2023-05-24
0a9c56c8-6399-4ab5-b75e-edd33538b803	fufu	fufu	Fufu	f	\N	2023-05-24	2023-05-24
d4c5072e-473a-4fc3-a793-196e2844b0e4	fuji	fuji	Fuji	f	\N	2023-05-24	2023-05-24
d00212d3-015f-47ef-abf0-c351d5933814	fujitoken	fjt	Fuji FJT	f	\N	2023-05-24	2023-05-24
2ec33516-7141-4c29-9592-8fa87648d4ca	fulcrom	ful	Fulcrom	f	\N	2023-05-24	2023-05-24
e9bf9130-4f1a-4ba0-9efe-1f08a0a1e947	fumoney	fum	FUMoney	f	\N	2023-05-24	2023-05-24
17b07e7e-4bde-4719-8c7c-28f7145952e1	fund-of-yours	foy	Fund Of Yours	f	\N	2023-05-24	2023-05-24
3941ad52-4f3e-402f-b9a1-c2881485d045	funex	funex	Funex	f	\N	2023-05-24	2023-05-24
450e7619-b0bf-4f6f-af67-9df7ceb8164b	funfair	fun	FUNToken	f	\N	2023-05-24	2023-05-24
83bc36cb-1908-4efb-816d-405b32d969ca	funfi	fnf	FunFi	f	\N	2023-05-24	2023-05-24
366397d9-3ae8-4fe9-86e8-6225a8a07c3b	funny-coin	fuc	Funny Coin	f	\N	2023-05-24	2023-05-24
b98d62fa-9b66-47cb-9117-9bb724267f5b	furio	$fur	Furio	f	\N	2023-05-24	2023-05-24
33265589-d7fe-4412-82ff-bc284b2dd849	furucombo	combo	Furucombo	f	\N	2023-05-24	2023-05-24
6cbd2a5e-b98f-4977-b2e8-6b3b96d46ed1	fuse-dollar	fusd	Fuse Dollar	f	\N	2023-05-24	2023-05-24
2d1636c3-3a72-4ab2-8d3e-eceb436b0437	fusefi	volt	Voltage Finance	f	\N	2023-05-24	2023-05-24
cf522bb5-86f5-4de2-a906-8d467f899be0	fuse-network-token	fuse	Fuse	f	\N	2023-05-24	2023-05-24
acaa554d-09b2-47a8-8edc-dab75f6c650b	fusotao	tao	Fusotao	f	\N	2023-05-24	2023-05-24
e2fd54cd-ea7c-4bb6-833d-23f9091ca2e9	future	ftr	Future	f	\N	2023-05-24	2023-05-24
bedb5393-406a-44da-823e-33acd9eb1461	future-ai	future-ai	Future AI	f	\N	2023-05-24	2023-05-24
ed1d6d73-20df-4be9-a5b5-e5a8e48a34fc	futurecoin	future	FutureCoin	f	\N	2023-05-24	2023-05-24
8ff321d6-32e7-4c88-a200-9ade123c1662	future-of-fintech	fof	Future Of Fintech	f	\N	2023-05-24	2023-05-24
93c92c26-191a-4b0a-a0c1-c5ab97986e19	futureswap	fst	Futureswap	f	\N	2023-05-24	2023-05-24
a157cf17-e66e-4d9b-8e20-83a8b40d2fac	futureswap-finance	fs	FutureSwap Finance	f	\N	2023-05-24	2023-05-24
889153cd-baf1-49cf-a1e5-8dca5c75f3f1	futurocoin	fto	FuturoCoin	f	\N	2023-05-24	2023-05-24
559ce0f9-4743-475a-aba6-c8942400471d	fuze-token	fuze	FUZE	f	\N	2023-05-24	2023-05-24
ed6f51e6-ecc7-4b41-aa2b-cc1df52a87a0	fuzz-finance	fuzz	Fuzz Finance	f	\N	2023-05-24	2023-05-24
b620b567-f4d2-4f2c-971a-9b18ec510649	fx1sports	fx1	FX1Sports	f	\N	2023-05-24	2023-05-24
5b50e8ac-c3eb-4922-aaf7-c75b6ed6c9c3	fx-coin	fx	Function X	f	\N	2023-05-24	2023-05-24
60874d18-3a1b-419b-8d93-7cf992e24035	fydcoin	fyd	FYDcoin	f	\N	2023-05-24	2023-05-24
0dbbcdf4-678b-4437-9d01-b36690dd2528	fyooz	fyz	Fyooz	f	\N	2023-05-24	2023-05-24
343118f1-a0c9-4c9c-8e5a-0b8ffb8dcabf	g	g*	G*	f	\N	2023-05-24	2023-05-24
254fef28-4b38-404c-b9ba-43cdf83f223d	g999	g999	G999	f	\N	2023-05-24	2023-05-24
65465be5-6e91-4ee8-9303-d5e85f469f86	gafa	gafa	Gafa	f	\N	2023-05-24	2023-05-24
eb3348c8-4e11-44f5-9597-45fa7b7e887c	gagarin	ggr	GAGARIN	f	\N	2023-05-24	2023-05-24
108a2814-76be-4f0f-8e37-9e712c1bf76f	gaia-everworld	gaia	Gaia Everworld	f	\N	2023-05-24	2023-05-24
0a734112-4bfa-4aa8-85e9-8070fc2bd32c	gains	gains	Gains	f	\N	2023-05-24	2023-05-24
28db1c76-1e99-4647-8301-4acf5206ecfd	gains-farm	gfarm2	Gains Farm	f	\N	2023-05-24	2023-05-24
999d1b06-4db1-4603-b9df-96571e187a8b	gains-network	gns	Gains Network	f	\N	2023-05-24	2023-05-24
df01d3c2-6907-4663-99f7-7a67d1df477c	gaj	gaj	Gaj Finance	f	\N	2023-05-24	2023-05-24
7384c986-931b-40c3-b215-233742513faa	gala	gala	GALA	f	\N	2023-05-24	2023-05-24
0334c4f1-f668-4cf3-a180-41746ee54e87	galactic-arena-the-nftverse	gan	Galactic Arena: The NFTverse	f	\N	2023-05-24	2023-05-24
0c77ff6b-06d5-4b28-99bd-7798cbcaf2fa	galatasaray-fan-token	gal	Galatasaray Fan Token	f	\N	2023-05-24	2023-05-24
e506813c-d67c-4e87-a180-0c5504d6c37a	galaxia	gxa	Galaxia	f	\N	2023-05-24	2023-05-24
28129fc9-ec80-4136-8bcc-2da5da9f5dc8	galaxiaverse	glxia	GalaxiaVerse	f	\N	2023-05-24	2023-05-24
cbeacb75-9bc0-43a3-843f-2a4033aa758c	galaxy-arena	esnc	Galaxy Arena Metaverse	f	\N	2023-05-24	2023-05-24
44fdbffb-e937-40d7-8d1b-8e61edd3f387	galaxy-blitz	mit	Galaxy Blitz	f	\N	2023-05-24	2023-05-24
3a2446e7-269f-4cee-b46b-56ed5ad504f5	galaxycoin	galaxy	GalaxyCoin	f	\N	2023-05-24	2023-05-24
27c530b9-38fc-457a-86be-978d399d30ce	galaxy-essential	gxe	Galaxy Essential	f	\N	2023-05-24	2023-05-24
9bd4113d-7d8b-4a3b-a39b-4adca5c6a3fc	galaxy-fight-club	gcoin	Galaxy Fight Club	f	\N	2023-05-24	2023-05-24
227fadb6-3061-43e7-b9da-808d0a15562e	galaxy-finance-glf	glf	Galaxy Finance GLF	f	\N	2023-05-24	2023-05-24
23314d04-5674-4a79-83d0-ae7afcd62c77	galaxy-heroes-coin	ghc	Galaxy Heroes Coin [OLD]	f	\N	2023-05-24	2023-05-24
6e84219f-e87b-4988-a03c-668bd93d7bf6	galaxy-survivor	glxy	Galaxy Survivor	f	\N	2023-05-24	2023-05-24
ecc82272-1503-4da1-b9db-d32b7391fd2a	galaxy-villains	gvc	Galaxy Villains	f	\N	2023-05-24	2023-05-24
8c360f0c-559d-4c13-9325-0087f6a9c2ea	galaxy-war	gwt	Galaxy War	f	\N	2023-05-24	2023-05-24
215e8292-7f40-4e36-b579-027de3d2cf03	galeon	galeon	Galeon	f	\N	2023-05-24	2023-05-24
6aa6cd13-0144-4bc9-8620-7c23ce5d5696	galvan	ize	Galvan	f	\N	2023-05-24	2023-05-24
2296fee5-c565-4893-8072-3dd296ad871d	gamb	gmb	GAMB	f	\N	2023-05-24	2023-05-24
58161e82-bc29-4940-9d3f-010aadefb620	gambler-shiba	gshiba	Gambler Shiba	f	\N	2023-05-24	2023-05-24
8c0a05a9-0b30-4beb-ac85-0b946c2b6a85	game	gtc	Game	f	\N	2023-05-24	2023-05-24
36439beb-5cb4-4f8b-a0ed-155d1b1c12b4	game-ace-token	gat	Game Ace	f	\N	2023-05-24	2023-05-24
57326d62-f1af-40b1-8d6f-6b392a61ce47	game-coin	gmex	Game Coin	f	\N	2023-05-24	2023-05-24
26f5e925-06a6-4147-bab6-3728ff2b4680	gamecredits	game	GameCredits	f	\N	2023-05-24	2023-05-24
6e0be5d7-2904-405f-a3f1-2f73b5deece2	gamee	gmee	GAMEE	f	\N	2023-05-24	2023-05-24
5537a15b-4208-467a-aa14-1de6d6ba39e7	gamefantasystar	gfs	GameFantasyStar	f	\N	2023-05-24	2023-05-24
9fa5e89d-b4b9-4824-a63a-552bbee8fd3c	game-fantasy-token	gft	Game Fantasy	f	\N	2023-05-24	2023-05-24
44002a82-3a8f-43d2-8e17-020d5bfe1019	gamefi	gafi	GameFi	f	\N	2023-05-24	2023-05-24
ba99a6dc-d88b-427e-9a40-988577eacbb7	gamefi-token	gfi	GameFi Protocol	f	\N	2023-05-24	2023-05-24
0ea6b1f0-65d1-4537-b820-2f05d6fe3f43	gameflip	flp	Gameflip	f	\N	2023-05-24	2023-05-24
54cd4481-34dc-4973-af55-b5a0c3e1bda8	gameguru	ggt	GameGuru	f	\N	2023-05-24	2023-05-24
c01f8ee2-ed37-4c16-993b-dd8ce306c12a	gameology	gmy	Gameology	f	\N	2023-05-24	2023-05-24
50f7bfae-6f4c-4848-a6dc-c28694075e3b	gamer	gmr	GAMER	f	\N	2023-05-24	2023-05-24
62091786-72a1-4d91-b2ac-cc63ea429e04	gamer-arena	gau	Gamer Arena	f	\N	2023-05-24	2023-05-24
9a197c3e-673e-4432-9a31-625f89ff9acf	gamercoin	ghx	GamerCoin	f	\N	2023-05-24	2023-05-24
48e79569-db9e-4747-ae97-ab981f0c9694	gamerse	lfg	Gamerse	f	\N	2023-05-24	2023-05-24
e1ce39ec-6d79-45c1-b28d-649c7a12a027	games-for-a-living	gfal	Games for a Living	f	\N	2023-05-24	2023-05-24
d36921fd-486b-40ca-8162-7a2b79123373	gamespad	gmpd	GamesPad	f	\N	2023-05-24	2023-05-24
91695d65-09ec-4122-b6c5-9d6705155571	gamestarter	game	Gamestarter	f	\N	2023-05-24	2023-05-24
214875f1-049e-4b6c-9701-9cfd94d077f3	gamestation	gamer	GameStation	f	\N	2023-05-24	2023-05-24
97282c74-fe79-465e-9541-82e3b349e1d2	gamestop-tokenized-stock-defichain	dgme	GameStop Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
4250b0ec-bf1c-4e46-99e9-d5c34ca9d989	gameswap-org	gswap	Gameswap	f	\N	2023-05-24	2023-05-24
85a277d3-a937-43ea-bc40-3938ced59bd6	game-tree	gtcoin	Game Tree	f	\N	2023-05-24	2023-05-24
6a7b595f-e71a-4bac-bd6c-30088566063d	game-x-change-potion	gxp	Game X Change Potion	f	\N	2023-05-24	2023-05-24
5b503c3e-58ba-4c21-b693-f743c879c10f	gameyoo	gyc	GameYoo	f	\N	2023-05-24	2023-05-24
fc7f52d5-2d40-48bd-b8c7-5d641c42e44c	gamezone	gzone	GameZone	f	\N	2023-05-24	2023-05-24
93f99d51-d1ac-4499-bc5d-1e578d433a79	gami	gami	Gami	f	\N	2023-05-24	2023-05-24
ab461b07-1786-491c-bec0-acbea26032a1	gamifi	gmi	GamiFi	f	\N	2023-05-24	2023-05-24
715a663e-11de-4e37-9c24-e67dea7fc5b8	gaming-doge	gamingdoge	Gaming Doge	f	\N	2023-05-24	2023-05-24
a348e63d-9e6a-4624-97f3-9a98baa5cd82	gamingshiba	gamingshiba	GamingShiba	f	\N	2023-05-24	2023-05-24
b7a7be81-2835-4e80-8242-6cf44f015ba0	gaming-stars	games	Gaming Stars	f	\N	2023-05-24	2023-05-24
4c150e91-97d3-49d0-891e-97aae9e79cbc	gamium	gmm	Gamium	f	\N	2023-05-24	2023-05-24
5fcdcd20-47c9-483e-8c12-55db98302462	gami-world	gami	GAMI World	f	\N	2023-05-24	2023-05-24
50eaf9da-1ac8-402e-adf1-2fe98936c59c	gamma-strategies	gamma	Gamma Strategies	f	\N	2023-05-24	2023-05-24
4d480b9f-649e-44b3-bdb6-0e73197723d5	gammaswap		GammaSwap	f	\N	2023-05-24	2023-05-24
32034a7f-09cc-4d5d-b876-60b5ccbe3ad7	gamyfi-token	gfx	GamyFi	f	\N	2023-05-24	2023-05-24
4ed7ee3e-906c-4511-99ea-88d48eb4bbd9	gangs-rabbit	rabbit	Gangs Rabbit	f	\N	2023-05-24	2023-05-24
e24fed32-224d-4080-9f48-8be735fb2405	gapcoin	gap	Gapcoin	f	\N	2023-05-24	2023-05-24
33a864d3-3a00-412a-b766-4908301fb470	garbi-protocol	grb	Garbi Protocol	f	\N	2023-05-24	2023-05-24
d96810ca-713a-4261-b19f-b9bff69069c0	gard	gard	GARD	f	\N	2023-05-24	2023-05-24
145d1080-250f-41eb-9715-e3689db11e73	garfield-bsc	$garfield	Garfield (BSC)	f	\N	2023-05-24	2023-05-24
969ca5e1-3685-4bb7-8b0a-07fcec5ccb23	gari-network	gari	Gari Network	f	\N	2023-05-24	2023-05-24
c054a213-519b-47f9-81c3-46de144607c7	garlicoin	grlc	Garlicoin	f	\N	2023-05-24	2023-05-24
1a363d0c-28bc-49b0-958e-418823426a8a	gary	gary	Gary	f	\N	2023-05-24	2023-05-24
196dbf1b-87cb-4998-b66d-33ac1ba44ca8	gas	gas	Gas	f	\N	2023-05-24	2023-05-24
ea2f703f-5d81-415e-aa4c-71ec4bc58a89	gas-dao	gas	Gas DAO	f	\N	2023-05-24	2023-05-24
68df82bb-26dd-4d24-a150-3a3361f71ddd	gasp	gasp	gAsp	f	\N	2023-05-24	2023-05-24
740216fa-c933-4008-af6e-45a377be8e1b	gatechain-token	gt	Gate	f	\N	2023-05-24	2023-05-24
244d470f-f47c-4a20-990d-9f5e14b0438b	gatenet	gate	GATENet	f	\N	2023-05-24	2023-05-24
c4bb3b11-3eef-4559-8298-c44e37f86b48	gateway-protocol	gwp	Gateway Protocol	f	\N	2023-05-24	2023-05-24
46f85f4d-9d7d-4c5d-998d-28857430806c	gather	gth	Gather	f	\N	2023-05-24	2023-05-24
bdd2d3fc-70f3-43c2-a4c0-c5522e44f83e	gatsby-inu-2	gatsby	Gatsby Inu	f	\N	2023-05-24	2023-05-24
a9e5ce33-997b-4623-8fb9-d1e2efc47379	gax-liquidity-token-reward	gltr	GAX Liquidity Token Reward	f	\N	2023-05-24	2023-05-24
67b21ed4-5a89-4538-b5f1-704ad8d39566	gazetv	gaze	GazeTV	f	\N	2023-05-24	2023-05-24
c725fe51-84c1-457b-90e3-a3bcf58ea8d5	gaziantep-fk-fan-token	gfk	Gaziantep FK Fan Token	f	\N	2023-05-24	2023-05-24
4b1bedc1-53fc-467f-a5c2-a5f54d38ef8e	gbank-apy	gbk	GBANK APY	f	\N	2023-05-24	2023-05-24
464841c7-0138-4f4c-98c8-24cc2c257593	gcn-coin	gcn	GCN Coin	f	\N	2023-05-24	2023-05-24
8eec423d-6312-4bac-8ed5-f2c154947ec9	gdrt	gdrt	GDRT	f	\N	2023-05-24	2023-05-24
73fdc598-fbf6-49e5-9849-776b6f2bbc9c	gdx-token	gdx	Gridex	f	\N	2023-05-24	2023-05-24
73044510-5ccc-4376-b6b6-a7e8f46bd9ed	gear	gear	Gear	f	\N	2023-05-24	2023-05-24
80fa3a6d-fa8f-42c3-a236-117c83990168	gearbox	gear	Gearbox	f	\N	2023-05-24	2023-05-24
16f98ec8-0a34-4123-b77c-9b534bc94a99	gecoin	gec	Gecoin	f	\N	2023-05-24	2023-05-24
5c1a3908-542e-4b39-ba19-0bd2f4db4626	geegoopuzzle	ggp	Geegoopuzzle	f	\N	2023-05-24	2023-05-24
069ee01c-c1e7-41ab-96af-a1028f476593	geek-protocol	geek	Geek Protocol	f	\N	2023-05-24	2023-05-24
818394da-584d-4cf7-b73b-cbb64c967d8c	geeq	geeq	GEEQ	f	\N	2023-05-24	2023-05-24
8b745e60-c348-41cb-9abe-6575b763c628	geist-dai	gdai	Geist Dai	f	\N	2023-05-24	2023-05-24
9b3168fd-708b-48db-8fb2-d6a7c7d4eb97	geist-eth	geth	Geist ETH	f	\N	2023-05-24	2023-05-24
98dbde7b-c77f-4527-a2c0-10b03fed2776	geist-finance	geist	Geist Finance	f	\N	2023-05-24	2023-05-24
11a680a5-4855-48d6-9615-217882158f80	geist-ftm	gftm	Geist FTM	f	\N	2023-05-24	2023-05-24
311f59c2-b6fb-4eec-87d8-174937f26b94	geist-fusdt	gfusdt	Geist fUSDT	f	\N	2023-05-24	2023-05-24
d5040d4a-2248-495c-810e-db78d61bfc5f	geist-usdc	gusdc	Geist USDC	f	\N	2023-05-24	2023-05-24
9f82968a-99d3-4355-90d0-b4155a342801	geist-wbtc	gwbtc	Geist WBTC	f	\N	2023-05-24	2023-05-24
87cc8d0b-f61a-444a-87f4-9026a075cbe3	geke	geke	Geke	f	\N	2023-05-24	2023-05-24
218a7218-ff7f-4529-9b28-3ccf9b9597cc	gelato	gel	Gelato	f	\N	2023-05-24	2023-05-24
89019f0f-1cb1-4318-ab95-e985579cc5c7	gem-exchange-and-trading	gxt	Gem Exchange and Trading	f	\N	2023-05-24	2023-05-24
02dcd575-2e7f-4333-9a12-055c26926798	gemguardian	gemg	GemGuardian	f	\N	2023-05-24	2023-05-24
7d89813f-7c86-4451-b61e-7f7c453a6e47	gemholic	gems	Gemholic	f	\N	2023-05-24	2023-05-24
27e7b993-4ac3-40ea-8198-c03d0cc60a55	gemhub	ghub	GemHUB	f	\N	2023-05-24	2023-05-24
76624b0d-dd70-4ee7-a7ad-8765156e327b	gemie	gem	Gemie	f	\N	2023-05-24	2023-05-24
d4eb9aab-c90d-4be1-83b6-f1a35b9c118d	gemini-dollar	gusd	Gemini Dollar	f	\N	2023-05-24	2023-05-24
ede35b8f-f12f-4e59-980b-6d9f2a7b06c5	gemlink	glink	GemLink	f	\N	2023-05-24	2023-05-24
fde0def1-4995-4bee-8689-19c420d1326d	gempad	gems	GemPad	f	\N	2023-05-24	2023-05-24
b347b171-48e5-4f41-8dd2-c72af674f38f	gems-2	gem	Gems	f	\N	2023-05-24	2023-05-24
e53ac77f-eafa-4458-b9ad-96265467e864	gemswap-2	zgem	GemSwap	f	\N	2023-05-24	2023-05-24
f15a6a18-aa67-4eaf-9b93-3cc2af3bca56	gemx	gemx	GEMX	f	\N	2023-05-24	2023-05-24
d34225ef-41e0-409a-b7c5-7e2936ed729c	genaro-network	gnx	Genaro Network	f	\N	2023-05-24	2023-05-24
84db5327-2682-47e0-a4cb-ad9ec4c69bc1	genclerbirligi-fan-token	gbsk	Gençlerbirliği Fan Token	f	\N	2023-05-24	2023-05-24
00dbe196-1807-4d8e-8da0-c94dc6604662	gene	gene	Gene	f	\N	2023-05-24	2023-05-24
8fec2f2a-0141-4cc9-b107-af4ee1603065	generaitiv	gai	Generaitiv	f	\N	2023-05-24	2023-05-24
0957331c-0986-4bfa-a606-db5e33d182e8	generational-wealth	gen	Generational Wealth	f	\N	2023-05-24	2023-05-24
ac1737d3-06af-48c1-934d-39c82231dd53	genesis-particle	gp	Genesis Particle	f	\N	2023-05-24	2023-05-24
c1cb23e5-90d9-4c3e-a48f-9e3757e7f374	genesis-shards	gs	Genesis Shards	f	\N	2023-05-24	2023-05-24
134eb8dd-14c0-4d1c-a93c-688663612b7c	genesis-vision	gvt	Genesis Vision	f	\N	2023-05-24	2023-05-24
84c940d7-afec-46b2-b46b-510e6147f18d	genesis-wink	gwink	Genesis Wink	f	\N	2023-05-24	2023-05-24
a466235f-16d2-417b-9895-60623b2ab62c	genesis-worlds	genesis	Genesis Worlds	f	\N	2023-05-24	2023-05-24
0e9e2a20-ec89-490f-ba68-3881c4fdfc18	genesysgo-shadow	shdw	Shadow Token	f	\N	2023-05-24	2023-05-24
2b9d20e3-d8fc-471c-a38b-d0beef56bc03	genie-protocol	gnp	Genie Protocol	f	\N	2023-05-24	2023-05-24
e693ce86-6d33-4acb-9ac0-c36f01c631b1	genius	geni	Genius	f	\N	2023-05-24	2023-05-24
cd23bfe7-f66d-4837-8448-62f49de041ff	genius-yield	gens	Genius Yield	f	\N	2023-05-24	2023-05-24
d7525947-dcdf-4d3d-8f9e-c8c552c5690f	geniux	iux	GeniuX	f	\N	2023-05-24	2023-05-24
25c4d10a-d4dd-4da6-bcc9-178778164cb1	genix	genix	Genix	f	\N	2023-05-24	2023-05-24
e883406d-a493-4781-af94-e4b41ad86f75	genomesdao	$gene	GenomesDAO	f	\N	2023-05-24	2023-05-24
50776aa5-e604-4df4-a214-83171597be0b	genopet-ki	ki	Genopets KI	f	\N	2023-05-24	2023-05-24
63df7821-cc1f-4b49-9aa8-44ff07b6447f	genopets	gene	Genopets	f	\N	2023-05-24	2023-05-24
a05799dc-1d11-47f0-aea0-3a7a5bce4dfe	genshinflokiinu	gfloki	GenshinFlokiInu	f	\N	2023-05-24	2023-05-24
6c485e7e-8a5a-412a-8636-43db86698618	genshiro	gens	Genshiro	f	\N	2023-05-24	2023-05-24
e2f5d51e-da51-4e88-a891-5f6b795c16ae	gensokishis-metaverse	mv	GensoKishi Metaverse	f	\N	2023-05-24	2023-05-24
e7957e05-d44c-4872-8716-2f26a77b94d5	gen-wealth	genw	Gen Wealth	f	\N	2023-05-24	2023-05-24
a1ea9798-5247-4b1f-9100-58fb56a1d550	genz-token	genz	GENZ Token	f	\N	2023-05-24	2023-05-24
ff5e3181-2239-46dc-8118-194d97f06b5d	geocoin	geo	Geocoin	f	\N	2023-05-24	2023-05-24
b15b01ae-f4d9-4cea-8cfa-0e3933d9fc65	geodb	geo	GeoDB	f	\N	2023-05-24	2023-05-24
a54413e7-3823-4f6c-b284-bc261422787d	geojam	jam	Geojam	f	\N	2023-05-24	2023-05-24
153460c6-5546-4bb0-a105-31f55333723d	geopoly	geo$	Geopoly	f	\N	2023-05-24	2023-05-24
46d061b1-85cd-40fa-af0d-36d05c5f4c7d	gera-coin	gera	Gera Coin	f	\N	2023-05-24	2023-05-24
fd0d08fe-8710-4e97-9583-7bf8e7295eb1	germany-rabbit-token	germany	Germany Rabbit Token	f	\N	2023-05-24	2023-05-24
517c5beb-13ee-492b-b5a3-c1b251c7af4d	gerowallet	gero	GeroWallet	f	\N	2023-05-24	2023-05-24
cf1e04d8-e5e0-479c-a5cb-719fb5a9a9c8	get	get	GET	f	\N	2023-05-24	2023-05-24
3a89ac6c-c871-4ae4-afd0-09232560906a	getkicks	kicks	GetKicks	f	\N	2023-05-24	2023-05-24
9e28a502-73bd-45a8-89bc-46a319189f75	get-token	get	GET Protocol	f	\N	2023-05-24	2023-05-24
a040feac-bc70-4778-9383-4a21bb42a015	geuro	geuro	GEURO	f	\N	2023-05-24	2023-05-24
a0057101-9200-46f8-938d-48ca0077bc67	geyser	gysr	Geyser	f	\N	2023-05-24	2023-05-24
d7ff9e83-dec2-416a-8775-99fef0c4bb51	geysercoin	gsr	GeyserCoin	f	\N	2023-05-24	2023-05-24
4121ee56-d087-4b1b-ba47-745d628fe3a7	ggtkn	ggtkn	GGTKN	f	\N	2023-05-24	2023-05-24
aebb0a5a-4ad1-4429-8106-2501541a72c1	gg-token	ggtk	GG	f	\N	2023-05-24	2023-05-24
68f0c9b6-413b-4637-8bbc-553208cff13f	ghast	gha	Ghast	f	\N	2023-05-24	2023-05-24
835a92a8-727d-4508-a0f8-e5509f201a77	ghost-by-mcafee	ghost	Ghost	f	\N	2023-05-24	2023-05-24
ce6e3efa-9720-43ca-9af8-f73abad30feb	ghostkids	boo	GhostKids	f	\N	2023-05-24	2023-05-24
3bb06e0d-cf1f-429e-8549-ed00caa86792	ghostmarket	gm	GhostMarket	f	\N	2023-05-24	2023-05-24
3fae3f3c-fb63-4b62-8746-2b1924a5e741	ghost-trader-5867bf90-0523-4432-80b3-2c19f84ebf8d	gtr	Ghost Trader 	f	\N	2023-05-24	2023-05-24
f21f384e-40d2-4972-b141-8144fefa70f6	ghoul-token	ghoul	Ghoul	f	\N	2023-05-24	2023-05-24
3fe8943d-dbbc-4694-a12b-e43a29e29f3b	giannidoge-esport	gde	GianniDoge Esport	f	\N	2023-05-24	2023-05-24
5729ff67-2c8c-4a15-9a76-6b4e8cb2b494	giant-mammoth	gmmt	Giant Mammoth	f	\N	2023-05-24	2023-05-24
5a62f175-2d6d-4e80-8622-057165ff80b5	gibx-swap	x	GIBX Swap	f	\N	2023-05-24	2023-05-24
456e3df6-aff4-4e2e-9d07-3151ae15e898	gictrade	gict	GICTrade	f	\N	2023-05-24	2023-05-24
e0ce8110-f500-4813-b0c8-54378dff8545	giddy	gddy	Giddy	f	\N	2023-05-24	2023-05-24
4952c711-1c45-40b1-9bd7-5fae07562a8b	gif-dao	gif	GIF DAO	f	\N	2023-05-24	2023-05-24
585ede6c-8aa9-4bcc-8222-9f83c828a705	giftedhands	ghd	Giftedhands	f	\N	2023-05-24	2023-05-24
983d3781-2008-407c-b03d-f76be1acaa30	gifto	gft	Gifto	f	\N	2023-05-24	2023-05-24
e18e5e4d-86a4-4b2c-bf6d-2aae09d7f045	gigaswap	giga	GigaSwap	f	\N	2023-05-24	2023-05-24
47b7667a-045f-4c9e-b819-0aa2a90c04b2	gilgeous	glg	Gilgeous	f	\N	2023-05-24	2023-05-24
795e19cd-dd30-441c-87cd-5a20456c8855	gimmer	gmr	Gimmer	f	\N	2023-05-24	2023-05-24
7fbe53e7-671b-4354-ac81-be70907c3d03	ginoa	ginoa	Ginoa	f	\N	2023-05-24	2023-05-24
bad0994b-4321-42ed-a50a-2d355dabb95c	ginspirit	ginspirit	GinSpirit	f	\N	2023-05-24	2023-05-24
2635a8f7-449d-4bea-be56-8b67ee311f6f	ginza-network	ginza	Ginza Network	f	\N	2023-05-24	2023-05-24
25376e20-963a-4d96-b299-27eff77261e3	gitcoin	gtc	Gitcoin	f	\N	2023-05-24	2023-05-24
7ef37f6f-bc88-4cd2-bfcc-78d40360ce0c	gitcoin-staked-eth-index	gtceth	Gitcoin Staked ETH Index	f	\N	2023-05-24	2023-05-24
3f8a6c33-e5b6-4b00-8f08-268af6f1db63	gitopia	lore	Gitopia	f	\N	2023-05-24	2023-05-24
59118f06-5ed3-4b73-b537-b6a7b4f95a12	giveth	giv	Giveth	f	\N	2023-05-24	2023-05-24
b4dcd4ca-a836-4824-82a4-ea8e12dbeda0	givewell-inu	ginu	Givewell Inu	f	\N	2023-05-24	2023-05-24
2db4b02a-b9ea-4c2f-9380-0de6a4a96e59	givingtoservices-svs	svs	GivingToServices SVS	f	\N	2023-05-24	2023-05-24
4cbf62df-e739-4694-a6ee-59ffc418ff4a	glacier	glcr	Glacier	f	\N	2023-05-24	2023-05-24
ee398649-2553-438f-a0ff-bf6f57fbb612	gld-tokenized-stock-defichain	dgld	SPDR Gold Shares Defichain	f	\N	2023-05-24	2023-05-24
16962099-ffb8-41c4-93bb-ba23cae855e8	gleec-coin	gleec	Gleec Coin	f	\N	2023-05-24	2023-05-24
0e1f4c9f-afb5-40cd-98df-752017ddc3c9	glide-finance	glide	Glide Finance	f	\N	2023-05-24	2023-05-24
ca36c20e-4b96-4893-b234-6f5773dd7be5	glitch-protocol	glch	Glitch Protocol	f	\N	2023-05-24	2023-05-24
d8bcbacc-3e37-4d62-8f53-4c56ed4c9419	glitter-finance	xgli	XGLI DAO Protocol	f	\N	2023-05-24	2023-05-24
fd13ef78-cf32-43a9-8ac3-cb2eaed5adb3	glitzkoin	gtn	GlitzKoin	f	\N	2023-05-24	2023-05-24
8507071c-a828-4476-8431-5c737e3c8d75	globalboost	bsty	GlobalBoost-Y	f	\N	2023-05-24	2023-05-24
fe88d416-9030-4f81-909f-ff6bac417909	globalchainz	gcz	GlobalChainZ	f	\N	2023-05-24	2023-05-24
fa44471b-4269-4de0-9873-d3a34a2ec943	globalcoin	glc	GlobalCoin	f	\N	2023-05-24	2023-05-24
42ca591f-7164-49a6-8af7-be6421ddcbf4	global-coin-research	gcr	Global Coin Research	f	\N	2023-05-24	2023-05-24
841cdcaf-33eb-4ccd-960d-e68b4dbfbdd8	global-digital-cluster-co	gdcc	Global Digital Cluster Coin	f	\N	2023-05-24	2023-05-24
6c0f80d2-e40f-4ccb-8221-93a9fffcee20	global-digital-content	gdc	Global Digital Content	f	\N	2023-05-24	2023-05-24
a640a22d-87af-4b47-af03-e46af52fc66b	global-fan-token	glft	Global Fan Token	f	\N	2023-05-24	2023-05-24
db6d7667-01b5-41fa-8ea3-7d60fad26fc5	global-human-trust	ght	Global Human Trust	f	\N	2023-05-24	2023-05-24
7be6a726-cf56-415e-a739-2f4dbec49f49	global-smart-asset	gsa	Global Smart Asset	f	\N	2023-05-24	2023-05-24
60ffc190-594a-4dc5-a352-d847a6d5f67e	global-social-chain	gsc	Global Social Chain	f	\N	2023-05-24	2023-05-24
4b0bff75-eb42-4c77-8bc1-2a23bf850958	global-trading-xenocurren	gtx	Global Trading Xenocurrency	f	\N	2023-05-24	2023-05-24
1ebbffc1-21d6-471a-87c6-d9e359557b86	globe-derivative-exchange	gdt	Globe Derivative Exchange	f	\N	2023-05-24	2023-05-24
d10d169a-91bf-466e-b8c8-61f25af9869b	globiance-exchange	gbex	Globiance Exchange	f	\N	2023-05-24	2023-05-24
a3b0f5a3-b5b6-4e09-82e7-05c89646ab8e	glo-dollar	usdglo	Glo Dollar	f	\N	2023-05-24	2023-05-24
935473e0-9f30-49c5-a91b-3751d1af54c1	glory-token	glr	Glory Token	f	\N	2023-05-24	2023-05-24
df707537-f355-4146-9568-88399d9e557e	glosfer-token	glo	Glosfer	f	\N	2023-05-24	2023-05-24
d01d3570-2ebe-4505-9441-df572c50faa1	glouki	glk	Glouki	f	\N	2023-05-24	2023-05-24
b0146922-fcd2-4ab4-99dc-bf21bd7d1ef9	glove	glo	Glove	f	\N	2023-05-24	2023-05-24
35ea22b6-6a20-49da-9609-ad3188509d26	glow-token-8fba1e9e-5643-47b4-8fef-d0eef67af854	glow	Glow Token	f	\N	2023-05-24	2023-05-24
1c683beb-d7e6-46e7-bfb8-32078f1fec35	gm	gm	GM	f	\N	2023-05-24	2023-05-24
0bfceee1-0ae5-4279-817b-32e5a82b1785	gmcash	gmc	GMCash	f	\N	2023-05-24	2023-05-24
829986bb-914d-4260-8356-9454491d0354	gmcash-share	gshare	GMCash Share	f	\N	2023-05-24	2023-05-24
d1913390-c722-49a2-a6d0-7770abfcb655	gmcoin-2	gmcoin	GMCoin	f	\N	2023-05-24	2023-05-24
30b5fd92-c3b6-4754-be52-695ee04393f6	gmd-protocol	gmd	GMD	f	\N	2023-05-24	2023-05-24
48cc94ad-f430-4f7e-98ae-667b98dcfcfb	gmsol	gmsol	GMSOL	f	\N	2023-05-24	2023-05-24
5209adf2-8654-4d1c-a9ee-5582528c713f	gmt-token	gmt	Gomining Token	f	\N	2023-05-24	2023-05-24
a5f64dd6-9c04-4a67-8722-0405c73a2d72	gmusd	gmusd	gmUSD	f	\N	2023-05-24	2023-05-24
5df17ee0-8795-4c8a-a885-57148edd35ca	gmx	gmx	GMX	f	\N	2023-05-24	2023-05-24
eb82d653-6bfc-4e72-9a82-012ccb38bb3a	gnd-protocol	gnd	GND Protocol	f	\N	2023-05-24	2023-05-24
38a3bd88-df07-4c74-82a9-0e8cd4f1d037	gnft	gnft	GNFT	f	\N	2023-05-24	2023-05-24
aca37718-f1fd-4bed-8c12-a3438aad278c	gnome	$gnome	GNOME	f	\N	2023-05-24	2023-05-24
5d3f24f1-3f81-4398-8824-2680bbb8b52d	gnosis	gno	Gnosis	f	\N	2023-05-24	2023-05-24
e1ef1d88-0cec-4d9c-95d9-f02cfd0c7e0a	gny	gny	GNY	f	\N	2023-05-24	2023-05-24
8ea17f75-9ba0-4d31-9907-4b80cae02e48	go2e-token	gte	GO2E GTE	f	\N	2023-05-24	2023-05-24
77e49988-6606-4378-b495-922f42cd4723	goal-token	goal	GOAL Token	f	\N	2023-05-24	2023-05-24
bb81e786-455f-4c1a-9fb0-6d30aef5026d	goat-coin	goat	Goat Coin	f	\N	2023-05-24	2023-05-24
9c850373-c1a6-4988-be5e-6c86245edc52	gobi-labs	gobi	Gobi Labs	f	\N	2023-05-24	2023-05-24
cf8ca6fa-4ae3-4e97-ae42-edcaf081f7d5	goblin	goblin	Goblin	f	\N	2023-05-24	2023-05-24
8d7f74bf-cb21-4f2d-a0b8-02777f7b8f04	gobtc	gobtc	goBTC	f	\N	2023-05-24	2023-05-24
291e77a1-1809-406a-b9d1-bdbaff024f1a	gobyte	gbx	GoByte	f	\N	2023-05-24	2023-05-24
e54efdaf-5c82-4130-996f-f38c346c2a8f	gochain	go	GoChain	f	\N	2023-05-24	2023-05-24
c9994171-1f2a-47c2-b84c-609dbfafc03b	gocryptome	gcme	GoCryptoMe	f	\N	2023-05-24	2023-05-24
8b01510d-513b-444d-8a3c-08f68e9bb279	gode-chain	gode	Gode Chain	f	\N	2023-05-24	2023-05-24
35e8d909-3cfa-4605-a0bd-e78e1aea919f	gods-unchained	gods	Gods Unchained	f	\N	2023-05-24	2023-05-24
7c0c7592-44cf-454c-a2d8-1236919ec204	godzilla	godz	Godzilla	f	\N	2023-05-24	2023-05-24
0652796f-2a50-411d-a2d1-8ec7bf3e75da	goerli-eth	geth	Goerli ETH	f	\N	2023-05-24	2023-05-24
dbebe369-c6f3-40c8-b1ba-627415cb51da	goeth	goeth	goETH	f	\N	2023-05-24	2023-05-24
bac0464a-8519-4e1d-af23-ce2f9969e7b1	gofitterai	fitai	GoFitterAI	f	\N	2023-05-24	2023-05-24
d823f85e-5cbd-4d4c-836c-3b54699456b7	gogocoin	gogo	GOGOcoin	f	\N	2023-05-24	2023-05-24
c61d489d-5d97-406e-b1de-2a796885ab94	gogo-finance	gogo	GOGO Finance	f	\N	2023-05-24	2023-05-24
250ba91b-2df9-4ba4-92b5-7677eeaec139	gogolcoin	gol	GogolCoin	f	\N	2023-05-24	2023-05-24
294dedef-6f6d-45cf-8ca2-b98a17637895	gogopool	ggp	GoGoPool	f	\N	2023-05-24	2023-05-24
ded46091-0011-4bb1-9157-be5563628fbf	goku	goku	Goku	f	\N	2023-05-24	2023-05-24
b18408ee-6ca4-4907-bdb9-48b2acde54df	golcoin	golc	GOLCOIN	f	\N	2023-05-24	2023-05-24
b664039d-91b2-47e0-9bcd-d45da9e81f34	gold8	gold8	GOLD8	f	\N	2023-05-24	2023-05-24
c2635c14-fd9a-4303-82e9-8149aadb8f1f	gold-ai-network-token	$gain	Gold AI Network Token	f	\N	2023-05-24	2023-05-24
a79bd7b9-2eec-4bf7-b960-6adfe9feb2e1	goldario	gld	Goldario	f	\N	2023-05-24	2023-05-24
07765652-9fd9-4c66-81fa-5a12bb2b7e00	goldcoin	glc	Goldcoin	f	\N	2023-05-24	2023-05-24
3b1ff82f-0cb2-4547-862b-f0c91a9a75bd	goldefy	god	GoldeFy	f	\N	2023-05-24	2023-05-24
e23aee44-0c91-4691-b226-cfbec52ae7d4	golden-ball	glb	Golden Ball	f	\N	2023-05-24	2023-05-24
214ddb98-5c3c-429b-b46b-732ec6b464d3	golden-doge	gdoge	Golden Doge	f	\N	2023-05-24	2023-05-24
f972cf29-0f53-4945-b4c1-7c2fe9db3ac6	golden-goal	gdg	Golden Goal	f	\N	2023-05-24	2023-05-24
05a0ea8d-7d62-4e4b-bea3-f58789c40d7a	golden-goose	gold	Golden Goose	f	\N	2023-05-24	2023-05-24
26965f0a-a2c6-473c-b739-43f5fae134e7	golden-inu	golden	Golden Inu	f	\N	2023-05-24	2023-05-24
5a71f070-d99e-4cb8-96d6-7c6efad3c37e	golden-token	gold	Golden	f	\N	2023-05-24	2023-05-24
c1694729-6aa2-452e-9061-992610b04ff9	goldenugget	gnto	GoldeNugget	f	\N	2023-05-24	2023-05-24
1f883c98-5007-49af-91c4-29d7ce59c028	goldex-token	gldx	Goldex	f	\N	2023-05-24	2023-05-24
dfd9659a-9b2f-4352-ad9d-dcaf831f58cd	gold-fever-native-gold	ngl	Gold Fever Native Gold	f	\N	2023-05-24	2023-05-24
8cd6e5a4-ceeb-4232-89f6-541ec6093c9d	goldfinch	gfi	Goldfinch	f	\N	2023-05-24	2023-05-24
5fdb2d21-94bd-4051-8418-444ebefdd42a	goldfinx	gix	GoldFinX	f	\N	2023-05-24	2023-05-24
ce23ec55-f8a8-4beb-a16e-e753e739e748	gold-guaranteed-coin	ggcm	Gold Guaranteed Coin	f	\N	2023-05-24	2023-05-24
cc978460-03bd-4546-9d51-349e2a3a132e	goldkash	xgk	GoldKash	f	\N	2023-05-24	2023-05-24
453969cd-9605-454f-bcab-86b0b9bf6dec	goldminer	gm	GoldMiner	f	\N	2023-05-24	2023-05-24
0eedda84-7029-4d5f-886f-b0dc0c53e997	gold-mining-members	gmm	Gold Mining Members	f	\N	2023-05-24	2023-05-24
67fbcd94-0a61-4e6a-9a46-ea8920d1922b	goldmint	mntp	Goldmint	f	\N	2023-05-24	2023-05-24
0be89a6a-e9bd-4d98-a296-d28b1c3526e6	gold-pieces	gp	gold pieces	f	\N	2023-05-24	2023-05-24
d6c988a4-65ce-4f75-aef9-0b31a1297c1b	gold-retriever	gldn	Gold Retriever	f	\N	2023-05-24	2023-05-24
68ffad36-b9a1-49ed-8a92-0ca875b31f42	gold-secured-currency	gsx	Gold Secured Currency	f	\N	2023-05-24	2023-05-24
0f05e37d-3a44-4fbb-9dbd-12d0f3910722	goledo	gol	Goledo	f	\N	2023-05-24	2023-05-24
4a88d6ed-8d30-443d-9b5d-e0c56d1f67f0	golem	glm	Golem	f	\N	2023-05-24	2023-05-24
ebe5dda7-231c-4119-a6b6-a960ee821254	golff	gof	Golff	f	\N	2023-05-24	2023-05-24
9baeec5d-dd36-449a-84d3-4d949b5ef62a	golteum	gltm	Golteum	f	\N	2023-05-24	2023-05-24
24cc7138-9200-4c83-9f27-b8526f156372	gomeat	gomt	GoMeat	f	\N	2023-05-24	2023-05-24
42bc0f8e-881f-470d-b7d3-00edd2fdba16	gomoney2	gom2	GoMoney2	f	\N	2023-05-24	2023-05-24
3389e894-35a4-4f31-b20b-f233cf739d2e	gooch	gooch	Gooch	f	\N	2023-05-24	2023-05-24
5a716f83-1765-4a4f-a581-0ec0aa03bac7	good-bridging	gb	Good Bridging	f	\N	2023-05-24	2023-05-24
a1a76c1e-986a-42e9-b5e6-7cef05ac62a3	good-dog	heel	Good Dog	f	\N	2023-05-24	2023-05-24
f9f3f261-52df-4e06-acb0-168a50b923b9	good-games-guild	ggg	Good Games Guild	f	\N	2023-05-24	2023-05-24
f51aeb01-3001-4d4d-a557-2b19956ada60	good-gensler	genslr	Good Gensler	f	\N	2023-05-24	2023-05-24
c5611752-0a8a-4b87-9d6b-3f22296c2532	goodmeme	gmeme	GoodMeme	f	\N	2023-05-24	2023-05-24
4ebdcce4-22fb-4a9f-8bde-072528544359	good-morning	gm	Good Morning	f	\N	2023-05-24	2023-05-24
3c88ebe9-b9e7-4bed-939e-51918840fec6	good-person-coin	gpcx	Good Person Coin	f	\N	2023-05-24	2023-05-24
1fa192b7-429f-43ca-b058-10a50feffbd8	gooeys	goo	Gooeys	f	\N	2023-05-24	2023-05-24
482beb4f-9189-4037-aa95-80aa3027e0ed	google-tokenized-stock-defichain	dgoogl	Google Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
c3bdb85f-a346-4d69-aab9-3d8d5ba7842b	goons-of-balatroon	gob	Goons of Balatroon	f	\N	2023-05-24	2023-05-24
31ecb500-a2a2-46b1-8365-e9c8192903e7	goose-finance	egg	Goose Finance	f	\N	2023-05-24	2023-05-24
f8aad9d2-3d4d-46bb-9f7e-fe20ab2841dd	goosefx	gofx	GooseFX	f	\N	2023-05-24	2023-05-24
4555f53f-cb22-4c88-8f77-e9439efcb8f3	gorilla-finance	gorilla	Gorilla Finance	f	\N	2023-05-24	2023-05-24
429de00a-c58c-44e5-8da0-529bbc7de28a	gotem	gotem	gotEM	f	\N	2023-05-24	2023-05-24
e52ea431-b165-421d-a6e4-a5b384534503	got-guaranteed	gotg	Got Guaranteed	f	\N	2023-05-24	2023-05-24
842c5e9b-9065-49e4-9b66-c5afc03d81b4	gourmetgalaxy	gum	Gourmet Galaxy	f	\N	2023-05-24	2023-05-24
f005ad56-6a86-4be3-8bfb-9e7adf995d1b	governance-algo	galgo	Governance Algo	f	\N	2023-05-24	2023-05-24
2a15ec6e-020c-489e-9c70-b566eb1413d0	governance-ohm	gohm	Governance OHM	f	\N	2023-05-24	2023-05-24
efdf61db-0a83-4d82-b078-8f37dd736db9	governance-zil	gzil	governance ZIL	f	\N	2023-05-24	2023-05-24
59abde81-19ff-4ba2-9682-1ebb25529e19	governor-dao	gdao	Governor DAO	f	\N	2023-05-24	2023-05-24
353fc71b-04e1-4df8-b2a3-90b303a9634e	govi	govi	CVI	f	\N	2023-05-24	2023-05-24
a1e2f1dd-4ed9-4c1b-bee6-00887e00b340	govworld	gov	GovWorld	f	\N	2023-05-24	2023-05-24
21d15742-40a3-4924-906f-2a9b63c1bd3d	gowithmi	gmat	GoWithMi	f	\N	2023-05-24	2023-05-24
250fca12-0da1-4d55-9b85-95b69152343e	goztepe-s-k-fan-token	goz	Göztepe S.K. Fan Token	f	\N	2023-05-24	2023-05-24
11a2d226-bc55-48e7-8ea7-d5af51be5699	gp-coin	xgp	GP Coin	f	\N	2023-05-24	2023-05-24
061801dd-b155-4e69-9f33-2a6a65e5d82a	gpex	gpx	GPEX	f	\N	2023-05-24	2023-05-24
be8dfb39-5fdf-4290-9683-e9c2bee8e36f	gpt-ai	ai	GPT AI	f	\N	2023-05-24	2023-05-24
bf461615-f69b-478d-ab73-18caf9d5ed8c	grai	grai	Grai	f	\N	2023-05-24	2023-05-24
27d660e6-ad02-4ce4-b535-0c673e42dc6f	granary	grain	Granary	f	\N	2023-05-24	2023-05-24
90aca78b-f075-4626-b6e7-4e6ca96192ac	grape-2	grape	Grape Protocol	f	\N	2023-05-24	2023-05-24
2246567e-3fdc-4153-9482-ff8b3afacd02	grape-finance	grape	Grape Finance	f	\N	2023-05-24	2023-05-24
baa96bde-72b5-4f97-b375-a4c889609198	grape-token	grape	Grape	f	\N	2023-05-24	2023-05-24
978df5ae-1001-43bd-a089-a671aeb9e303	grapevine	xgrape	GrapeVine	f	\N	2023-05-24	2023-05-24
a0bbccaa-d10b-42fd-ad33-1b2d7e363219	graphen	eltg	Graphen	f	\N	2023-05-24	2023-05-24
9d2f2c92-21f1-4678-98c6-cc1f6b9aa7f0	graphene	gfn	Graphene	f	\N	2023-05-24	2023-05-24
5bde6cd5-4b1b-4d06-abc4-cb357d1eeb7d	graphite-protocol	gp	Graphite Protocol	f	\N	2023-05-24	2023-05-24
b19ee06e-ef99-4a81-a9a3-607d0d3821e4	graphlinq-protocol	glq	GraphLinq Protocol	f	\N	2023-05-24	2023-05-24
b563f9ef-cc1d-4fed-a0a7-94eb17f1764e	grave	grve	Grave	f	\N	2023-05-24	2023-05-24
c93b107e-b948-4e62-8a4c-b102c41d8670	graviocoin	gio	Graviocoin	f	\N	2023-05-24	2023-05-24
0bb3e4d6-1c53-4bbe-8257-8c30422e949a	graviton	grav	Graviton	f	\N	2023-05-24	2023-05-24
e78ccf68-912f-4ce7-a1c6-3fcdcdaf33a4	gravity-bridge-dai	g-dai	Gravity Bridge DAI	f	\N	2023-05-24	2023-05-24
b3d1d14b-8c10-4a3d-9b4c-bb8b9931e1e9	gravity-bridge-usdc	g-usdc	Gravity Bridge USDC	f	\N	2023-05-24	2023-05-24
e8929e71-c376-442c-99b4-930e0a3bc95c	gravity-bridge-weth	g-weth	Gravity Bridge WETH	f	\N	2023-05-24	2023-05-24
e07b35ce-c056-4f81-b4ce-9cc4b776216b	gravity-finance	gfi	Gravity Finance	f	\N	2023-05-24	2023-05-24
8147eb57-a9c1-4ce1-b189-4ae72e45e928	gravity-token	grv	Gravity	f	\N	2023-05-24	2023-05-24
6c41df35-e252-4525-80cf-303fc660595d	grearn	gst	GrEarn	f	\N	2023-05-24	2023-05-24
66cbff5a-2acd-4311-b55e-2f5f9e5b419a	great-bounty-dealer	gbd	Great Bounty Dealer	f	\N	2023-05-24	2023-05-24
b81243d1-e572-4e3f-aac8-68ad0f5cc555	greenair	green	GreenAir	f	\N	2023-05-24	2023-05-24
f57ca559-b078-49bb-bed1-f569d0802f78	green-beli	grbe	Green Beli	f	\N	2023-05-24	2023-05-24
9799ffee-1734-4d3e-ab66-2114f8e59c8b	green-ben	eben	Green Ben	f	\N	2023-05-24	2023-05-24
2557abd6-2cb6-49aa-9e01-9e161c34fde2	green-block	gbt	Green Block	f	\N	2023-05-24	2023-05-24
f038a828-ece6-41e7-81ae-7fb106b0984c	green-climate-world	wgc	Green Climate World	f	\N	2023-05-24	2023-05-24
1865177e-eace-4016-ad03-10708b837be4	greencoin	gre	Greencoin	f	\N	2023-05-24	2023-05-24
6fbb86f4-f042-4795-a796-34fd352fff2d	greendex	ged	GreenDex	f	\N	2023-05-24	2023-05-24
55b1f54f-0a57-4426-acbf-35651d87d36e	green-energy-coin	gec	Green Energy Coin	f	\N	2023-05-24	2023-05-24
de709aa4-e02f-4c85-8c08-15c35bf77701	greenfuel	greenfuel	Greenfuel	f	\N	2023-05-24	2023-05-24
8386a09d-d6b7-45f3-9f11-08e7d9070886	greenheart-cbd	cbd	Greenheart CBD	f	\N	2023-05-24	2023-05-24
5140cd33-5317-4941-91c1-88539651c713	greenhouse	green	Greenhouse	f	\N	2023-05-24	2023-05-24
bf383eb6-7343-4287-a99d-914f0bcb4ec9	green-life-energy	gle	Green Life Energy	f	\N	2023-05-24	2023-05-24
7f0a10b7-3d7f-4a3e-b796-912ad8413c8d	green-meta	gmeta	Green Meta	f	\N	2023-05-24	2023-05-24
c07115df-edad-4cce-aa19-af9a8743ac0b	green-pet-egg	dfkgreenegg	Green Pet Egg	f	\N	2023-05-24	2023-05-24
e1cf7cb5-ef75-421b-ace9-f54f6c3be174	green-planet	gamma	Green Planet	f	\N	2023-05-24	2023-05-24
02a48fb0-2abc-4f6d-b633-554166bd66c4	greens	greens	Greens	f	\N	2023-05-24	2023-05-24
5917f34d-ae26-4efb-868d-bb9f17f2e233	green-satoshi-token	gst-sol	STEPN Green Satoshi Token on Solana	f	\N	2023-05-24	2023-05-24
205a3ce9-a9da-4a81-88ec-487979271aa9	green-satoshi-token-bsc	gst-bsc	STEPN Green Satoshi Token on BSC	f	\N	2023-05-24	2023-05-24
9191d480-afae-4c98-a77b-ae9d24f21e23	green-satoshi-token-on-eth	gst-eth	STEPN Green Satoshi Token on ETH	f	\N	2023-05-24	2023-05-24
3ad3bc1a-9f49-4c20-86ba-530f2f910ff0	green-shiba-inu	ginux	Green Shiba Inu	f	\N	2023-05-24	2023-05-24
402a9a7a-fe8b-4e17-b625-b6035a2943b5	greentrust	gnt	GreenTrust	f	\N	2023-05-24	2023-05-24
81ade851-eb18-4a09-8e2d-968b97e93704	greenworld	gwd	GreenWorld	f	\N	2023-05-24	2023-05-24
dce14b0f-078f-41d9-8244-0dd4a715446b	greenzonex	gzx	GreenZoneX	f	\N	2023-05-24	2023-05-24
dea8c4c3-e762-450e-9c58-f26c99d5f9bf	greg	greg	greg	f	\N	2023-05-24	2023-05-24
c035ccb3-eabc-42ed-b402-be3c9365ebc9	grelf	grelf	GRELF	f	\N	2023-05-24	2023-05-24
db43be46-6375-43aa-b5a7-5c268cd0f4f5	greyhound	greyhound	Greyhound	f	\N	2023-05-24	2023-05-24
98436f29-2dcb-4b52-ba68-43b040f4b368	gridcoin-research	grc	Gridcoin	f	\N	2023-05-24	2023-05-24
64c95ead-9111-4f07-8253-7ef66c233eb0	griffin-art	gart	Griffin Art	f	\N	2023-05-24	2023-05-24
83dfe65d-4986-4e85-a25e-94f07060b37a	griffin-art-ecosystem	gart	Griffin Art Ecosystem	f	\N	2023-05-24	2023-05-24
dd45bc70-c4ec-4e1e-b665-84dc7da6f093	grimace-coin	grimace	Grimace Coin	f	\N	2023-05-24	2023-05-24
252d8c55-f5cf-4f2f-804f-bfd30cc3d6a0	grim-evo	grim evo	Grim EVO	f	\N	2023-05-24	2023-05-24
c83e5eb1-da17-4b8c-9800-0c00ee0c5d8b	grimm	grimm	Grimm	f	\N	2023-05-24	2023-05-24
18d297f9-c216-4ed9-b346-bfe1b2b9e98e	grimoire-finance-token	grim	Grimoire Finance Token	f	\N	2023-05-24	2023-05-24
100ab038-9fd3-4c7c-8962-3756e4e8735e	grin	grin	Grin	f	\N	2023-05-24	2023-05-24
a94ad348-d8df-48d4-8960-8e39f353cebd	grinbit	grbt	Grinbit	f	\N	2023-05-24	2023-05-24
0f88860d-456b-49f0-853d-f94a7e1aefcb	grizzly-honey	ghny	Grizzly Honey	f	\N	2023-05-24	2023-05-24
c39aa61b-b932-4c7f-9348-1e113d6d3bfe	grn-grid	g	GRN Grid	f	\N	2023-05-24	2023-05-24
34fbb654-68c4-4d1f-95e7-b22111c0e435	gro-dao-token	gro	Gro DAO	f	\N	2023-05-24	2023-05-24
41838331-1717-4801-8ccc-77cc7a39e844	groestlcoin	grs	Groestlcoin	f	\N	2023-05-24	2023-05-24
1376f145-570c-4378-b1ff-ac71e355132e	grom	gr	GROM	f	\N	2023-05-24	2023-05-24
f1f8e648-02b6-46e1-9079-c8bff2429168	groupdao	gdo	GroupDao	f	\N	2023-05-24	2023-05-24
6bcc3da0-3d9a-45e1-b48f-91a0df7a8b2e	grove	grv	GroveCoin	f	\N	2023-05-24	2023-05-24
b03b8554-8d79-4863-ba29-b361c07d3017	grumpy	grum	Grumpy	f	\N	2023-05-24	2023-05-24
163895e3-49e3-4cad-8ee6-28f739b5cdef	grumpy-cat-2c33af8d-87a8-4154-b004-0686166bdc45	grumpycat	Grumpy Cat	f	\N	2023-05-24	2023-05-24
1aa8bd1d-19cd-4e77-810b-684619e04335	gscarab	gscarab	GScarab	f	\N	2023-05-24	2023-05-24
9f5256a6-58ae-4656-8c6a-8c2c9c74f626	gsenetwork	gse	GSENetwork	f	\N	2023-05-24	2023-05-24
f271f19e-d9c9-4909-87f4-6ab54326c9da	gsmcoin	gsm	GSMcoin	f	\N	2023-05-24	2023-05-24
823937a6-ce05-4b11-830a-d81f3c782ec4	gstcoin	gst	GSTCOIN	f	\N	2023-05-24	2023-05-24
2fbffbc4-b4c8-4e1a-968a-027802a8ecc8	gu	gu	Kugle GU	f	\N	2023-05-24	2023-05-24
b72ac0cf-d09c-448d-9ecd-d4e4d8cb8bd5	guacamole	guac	Guacamole	f	\N	2023-05-24	2023-05-24
39202597-6507-4523-9a31-a328902ae3f0	guapcoin	guap	Guapcoin	f	\N	2023-05-24	2023-05-24
a7c1ce7e-9f38-4e1e-aceb-de6bd5d827d1	guarded-ether	geth	Guarded Ether	f	\N	2023-05-24	2023-05-24
326cbc37-c964-4bd5-afe6-28cc18284e9e	guardian-token	guard	Guardian GUARD	f	\N	2023-05-24	2023-05-24
a28242e6-7d99-4e45-bed4-90ed47b211f2	guccipepe	guccipepe	GucciPepe	f	\N	2023-05-24	2023-05-24
666599cc-e083-441b-8688-c260148dd0e1	gudguess	gg	Gud Guess	f	\N	2023-05-24	2023-05-24
02c35927-670d-4168-bb5e-c7937aca69b5	guider	gdr	Guider	f	\N	2023-05-24	2023-05-24
8b39d57d-0aaa-405f-b91b-eef3bcf658ec	guildfi	gf	GuildFi	f	\N	2023-05-24	2023-05-24
865eecc3-7f15-4728-b8da-eb211d95d07f	guild-of-guardians	gog	Guild of Guardians	f	\N	2023-05-24	2023-05-24
0b43a4f2-793f-457e-aaeb-3a16fc109dd3	gulden	munt	Munt	f	\N	2023-05-24	2023-05-24
ff58b9d2-f2bf-4bc6-a488-95e1350f4b99	gulfcoin-2	gulf	GulfCoin	f	\N	2023-05-24	2023-05-24
2cf482d1-6c34-42a3-abd8-949d3f3ddea5	guncoin	gun	Guncoin	f	\N	2023-05-24	2023-05-24
fcbdbeac-9186-442c-b7f5-fbd119c936ed	gunstar-metaverse	gsts	Gunstar Metaverse	f	\N	2023-05-24	2023-05-24
f5f2a206-20e8-49a3-a86f-c413b3e594e4	gunstar-metaverse-currency	gsc	Gunstar Metaverse Currency	f	\N	2023-05-24	2023-05-24
fc7e77ea-7466-4da7-8ef2-86dafe006f45	gusd-token-49eca0d2-b7ae-4a58-bef7-2310688658f2	gusd	GUSD Token (Gaura)	f	\N	2023-05-24	2023-05-24
ad19eb03-2446-4fc6-b46b-f3edb6bdfc4b	guzzler	gzlr	Guzzler	f	\N	2023-05-24	2023-05-24
37f60505-47ec-42e8-ac3a-7dc7b5942beb	gxchain	gxc	GXChain	f	\N	2023-05-24	2023-05-24
495bf094-f0d8-4bdc-8f30-341a25df19d1	gyen	gyen	GYEN	f	\N	2023-05-24	2023-05-24
91816ff7-1259-46f9-8645-29fcaf229817	gym-ai	gym ai	Gym AI	f	\N	2023-05-24	2023-05-24
cbc71691-dba8-4a72-9903-c6ca402334cf	gym-network	gymnet	Gym Network	f	\N	2023-05-24	2023-05-24
ebd15eb3-22a6-4e96-83c0-674cfd0189f0	gyoshi	gyoshi	GYOSHI	f	\N	2023-05-24	2023-05-24
f61b01fd-bcdc-4383-8925-fd076201ab9b	gyro	gyro	Gyro	f	\N	2023-05-24	2023-05-24
882aa36f-eaf5-4199-b7df-2186db3e9146	h2finance	yfih2	H2Finance	f	\N	2023-05-24	2023-05-24
805a533c-f587-4db5-87b3-6b9419a16b4d	h2o	h2o	H2O	f	\N	2023-05-24	2023-05-24
640c4188-471f-443d-9f43-1bc11993d93e	h2o-dao	h2o	H2O Dao	f	\N	2023-05-24	2023-05-24
1c223044-d45a-4f7e-b105-af781f532d28	h2o-securities	h2on	H2O Securities	f	\N	2023-05-24	2023-05-24
10f1ea19-e036-499a-b9cd-5ce2c89d74c0	h3ro3s	h3ro3s	H3RO3S	f	\N	2023-05-24	2023-05-24
7bf930d4-e093-46eb-b35d-0d00389806d1	hachi	hachi	Hachi	f	\N	2023-05-24	2023-05-24
e4696bc3-1525-4e67-8f2c-0ebaeb3d1893	hachikoinu	inu	HachikoInu	f	\N	2023-05-24	2023-05-24
9d484147-2111-4793-8266-8bc76b33a2eb	hackenai	hai	Hacken	f	\N	2023-05-24	2023-05-24
95d377ca-ea19-4ff3-b0c0-f49cdaf9b998	hackerlabs-dao	hld	Hackerlabs DAO	f	\N	2023-05-24	2023-05-24
98fdc358-9d37-42bf-ab82-20b307f30ece	hades	hades	Hades	f	\N	2023-05-24	2023-05-24
04c5e835-3e06-4a03-90d7-3538a20db17a	haha	haha	HAHA	f	\N	2023-05-24	2023-05-24
bb396557-d2d0-4df2-9a10-0ae1571c1767	hairdao	hair	HairDAO	f	\N	2023-05-24	2023-05-24
27b8e83d-d9f2-4543-b10e-bc6b859578a9	haki-token	haki	HAKI Token	f	\N	2023-05-24	2023-05-24
3f4e7008-f25f-441c-a9a7-ccc39a7aabc1	hakka-finance	hakka	Hakka Finance	f	\N	2023-05-24	2023-05-24
4e47487a-5dfb-4600-a98d-df2b5335f1ed	hakuswap	haku	HakuSwap	f	\N	2023-05-24	2023-05-24
726ee41c-ac9f-4670-8fa4-3ee2788ad990	halcyon	hal	Halcyon	f	\N	2023-05-24	2023-05-24
08db2360-d5fe-41ba-a067-f3ac825e8eb7	halfpizza	piza	Half Pizza	f	\N	2023-05-24	2023-05-24
71534388-e203-4ee8-9cac-b5ffedbf08dd	half-shiba-inu	shib0.5	Half Shiba Inu	f	\N	2023-05-24	2023-05-24
0647eef6-d7e0-4104-9f4d-67b14c5c2a30	halisworld	hls	HalisWorld	f	\N	2023-05-24	2023-05-24
25c4952d-599d-4bca-af5e-b260d1fc336e	halloween-floki	floh	Halloween Floki	f	\N	2023-05-24	2023-05-24
f55249ca-f6fd-4017-a36e-287b503fabac	halo-coin	halo	Halo Coin	f	\N	2023-05-24	2023-05-24
c6f108a2-10ff-4ad7-ac0f-c422774872ac	halo-network	ho	HALO Network	f	\N	2023-05-24	2023-05-24
e5ed675b-e2f2-4931-a909-aafbf39db51a	halonft-art	halo	HALOnft.art	f	\N	2023-05-24	2023-05-24
ae0470aa-bc5d-4f42-b60a-f931cc2759a2	hamachi-finance	hami	Hamachi Finance	f	\N	2023-05-24	2023-05-24
ec37186d-90a9-4848-a0ef-b5a9a1ecc16c	hamster	ham	Hamster	f	\N	2023-05-24	2023-05-24
79a7affa-b105-48e4-82f4-f53dfacb8138	hamster-groomers	groomer	Hamster Groomers	f	\N	2023-05-24	2023-05-24
dd774ebf-b6f3-4b32-8355-0aa598b30fa4	hanchain	han	HanChain	f	\N	2023-05-24	2023-05-24
4039deb9-6614-4e74-888d-db20a224c9fb	handle-fi	forex	handle.fi	f	\N	2023-05-24	2023-05-24
30d0ecc6-1424-4cad-9735-531f984db34d	handleusd	fxusd	handleUSD	f	\N	2023-05-24	2023-05-24
191fd16e-49b1-41d1-8020-ac2a30b8df9c	handshake	hns	Handshake	f	\N	2023-05-24	2023-05-24
4f5090fb-c0ac-41a8-9c03-327d36f129b5	handy	handy	Handy	f	\N	2023-05-24	2023-05-24
8000a477-ddc9-474c-b8f0-d5ce3dbab41e	hanu-yokia	hanu	Hanu Yokia	f	\N	2023-05-24	2023-05-24
199657d2-fd03-45f7-a462-7362a8c9c081	hanzo-inu	hanzo	Hanzo	f	\N	2023-05-24	2023-05-24
6a9a258e-772f-4e84-a98f-1db758fe028d	hapi	hapi	HAPI	f	\N	2023-05-24	2023-05-24
556a9684-db94-41b8-be64-a00980a0eec1	happybear	happy	HappyBear	f	\N	2023-05-24	2023-05-24
7727a797-d157-4983-8925-a895b4590613	happy-birthday-coin	hbdc	Happy Birthday Coin	f	\N	2023-05-24	2023-05-24
1642830a-acaf-48f5-b4a1-7180b7470633	happyfans	happy	HappyFans	f	\N	2023-05-24	2023-05-24
35257f65-c291-4552-89a8-9d3dbf67f2b5	happyland	hpl	HappyLand	f	\N	2023-05-24	2023-05-24
0257678b-56ca-4de9-ae40-b0350dabc997	haram	$haram	Haram	f	\N	2023-05-24	2023-05-24
6b3f2250-24d7-47e2-a865-9220d613048c	harambe	harambe	Harambe	f	\N	2023-05-24	2023-05-24
50b3aa0e-c955-40dc-bf51-17764eff1411	harambe-protocol	riph	Harambe Protocol	f	\N	2023-05-24	2023-05-24
a767f258-71fa-41c8-af3a-f10fd54474d3	hara-token	hart	Hara	f	\N	2023-05-24	2023-05-24
eca2b291-3243-4e7d-af1c-e0e92af0e835	hare-token	hare	Hare [OLD]	f	\N	2023-05-24	2023-05-24
d29c243c-5036-454d-acc4-a75748e1ce72	harlequins-fan-token	quins	Harlequins Fan Token	f	\N	2023-05-24	2023-05-24
a1e5dc60-458d-45a3-9ff4-b31a580d98a5	harmony	one	Harmony	f	\N	2023-05-24	2023-05-24
79622e9c-7e34-4b09-8685-f0a2125c03b0	harmonylauncher	harl	HarmonyLauncher	f	\N	2023-05-24	2023-05-24
b23629e4-16ce-498b-827b-fb6515d3608b	harmonyville	hville	Harmonyville	f	\N	2023-05-24	2023-05-24
68ae04b6-c2a6-425a-8036-5379b20dfe05	haroldcoin	hrld	Haroldcoin	f	\N	2023-05-24	2023-05-24
60efd4ec-2e9a-47cc-9211-d0e775646d71	harpoon	hrp	Harpoon	f	\N	2023-05-24	2023-05-24
7915d57b-53ba-4a34-ac7a-46527bd3e0e2	harrypotterobamasonic10in	bitcoin	HarryPotterObamaSonic10Inu (ETH)	f	\N	2023-05-24	2023-05-24
fde3be70-e170-45f6-bacf-615478c7d2c7	harrypotterobamasonic10inu	bitcoin	HarryPotterObamaSonic10Inu	f	\N	2023-05-24	2023-05-24
2ba1feac-10b1-460e-8e55-a3e91d0100fa	harvest-finance	farm	Harvest Finance	f	\N	2023-05-24	2023-05-24
2fdbe9fd-3f9c-4435-8870-92eb85fe0385	hashbit	hbit	HashBit	f	\N	2023-05-24	2023-05-24
b7d63490-3a4b-4c7a-9674-6891d30cb042	hash-bridge-oracle	hbo	Hash Bridge Oracle	f	\N	2023-05-24	2023-05-24
ce3350ba-6504-4bee-9014-81df8d2fae2f	hashcoin	hsc	HashCoin	f	\N	2023-05-24	2023-05-24
0b7fdb3f-cb03-421f-b877-2564fa2db479	hashdao-token	hash	HashDAO Token	f	\N	2023-05-24	2023-05-24
715586f1-aa07-46a0-b848-abba1c5243c8	hashflow	hft	Hashflow	f	\N	2023-05-24	2023-05-24
9590c647-7eeb-4392-819c-2a97285237d9	hashgard	gard	Hashgard	f	\N	2023-05-24	2023-05-24
8b667058-ce51-43d2-8548-8709e254283e	hashkey-ecopoints	hsk	Hashkey EcoPoints	f	\N	2023-05-24	2023-05-24
bcc49f46-22a2-4b6b-bbc9-7a28db40fa28	hashnet-biteco	hnb	HashNet BitEco	f	\N	2023-05-24	2023-05-24
cce39648-d5cd-4a07-b66a-b3d0f4e5118d	hashpanda	panda	HashPanda	f	\N	2023-05-24	2023-05-24
c61a084f-fbc3-4f8b-b581-f40c0356dfb7	hashtagger	mooo	Hashtagger	f	\N	2023-05-24	2023-05-24
bac13e70-ffa1-4f6a-8770-5f8c609fc120	hashtag-united-fan-token	hashtag	Hashtag United Fan Token	f	\N	2023-05-24	2023-05-24
d0d006ce-1cce-46d5-8eb1-f72f3c7a3462	hatchypocket	hatchy	HatchyPocket	f	\N	2023-05-24	2023-05-24
082011f5-2662-45d7-915f-6598d20af1b2	hathor	htr	Hathor	f	\N	2023-05-24	2023-05-24
891da291-b15a-4a63-98f1-0ca89d727be2	hati	hati	Hati	f	\N	2023-05-24	2023-05-24
d15b81f2-f8da-4275-8b96-cb476da61e89	havah	hvh	HAVAH	f	\N	2023-05-24	2023-05-24
cbfe54a6-9314-4384-b525-17fc4872a157	have-fun-598a6209-8136-4282-a14c-1f2b2b5d0c26	hf	Have Fun Token	f	\N	2023-05-24	2023-05-24
01d54588-6a02-40d6-b3f0-1d222c1929b5	haven	xhv	Haven	f	\N	2023-05-24	2023-05-24
81ab49af-94dc-4634-b0a4-8ad013acd344	haven1	h1	Haven1	f	\N	2023-05-24	2023-05-24
7e88a001-c6f6-4814-9b94-2fb3d94df455	haven-token	haven	Safehaven DeFi	f	\N	2023-05-24	2023-05-24
7406c516-08c4-4455-91c5-ac7ec3509ddf	havven	snx	Synthetix Network	f	\N	2023-05-24	2023-05-24
a5f44f40-124a-4e0d-8fce-f5248cdd6d72	hawksight	hawk	Hawksight	f	\N	2023-05-24	2023-05-24
f9028620-2fa1-43aa-be9f-52a3c9ec3e43	hbarx	hbarx	HBARX	f	\N	2023-05-24	2023-05-24
20d73bb7-d737-45ac-89da-5b9b2d042702	h-df0f364f-76a6-47fd-9c38-f8a239a4faad	h	H	f	\N	2023-05-24	2023-05-24
8801a89d-d04b-4658-b104-910cc9b14feb	headline	hdl	Headline	f	\N	2023-05-24	2023-05-24
0cad5a2e-beaf-4691-953b-d90e48bab0da	headstarter	hst	HeadStarter	f	\N	2023-05-24	2023-05-24
d33d19cb-b57e-48be-a013-7b36d4b762a5	heal-the-world	heal	Heal The World	f	\N	2023-05-24	2023-05-24
54914fad-0e2f-4f7c-b666-6845af7cfd1f	health-potion	hep	Health Potion	f	\N	2023-05-24	2023-05-24
8dcfbc83-e62a-467e-bb4e-f48e4d729e5a	heartx-utility-token	hnx	HeartX Utility Token	f	\N	2023-05-24	2023-05-24
8d4038de-8a8f-4fc2-b477-720d097c6825	heavenland-hto	hto	Heavenland HTO	f	\N	2023-05-24	2023-05-24
76646740-5d48-4cf1-bdb8-83b00ec66f35	hebeblock	hebe	HebeBlock	f	\N	2023-05-24	2023-05-24
d1a08681-d3be-498b-aad4-02f20ef2d62a	hecofi	hfi	HecoFi	f	\N	2023-05-24	2023-05-24
316d9ea0-073b-4739-9a09-c495424fea7e	heco-origin-token	hogt	Heco Origin	f	\N	2023-05-24	2023-05-24
b0e272a8-840f-4303-a88e-93c1ce6cfee6	heco-peg-bnb	bnb	Heco-Peg Binance Coin	f	\N	2023-05-24	2023-05-24
2791b0b9-3a83-49a4-bba0-7b41b8520a58	heco-peg-xrp	xrp	Heco-Peg XRP	f	\N	2023-05-24	2023-05-24
3175918e-6da8-4776-973f-7e4b0315271f	hectagon	hecta	Hectagon	f	\N	2023-05-24	2023-05-24
7db03f34-1465-40a0-99ab-74f731a065c9	hector-dao	hec	Hector Network	f	\N	2023-05-24	2023-05-24
5df76b83-3543-43fd-a9c7-46838d61434b	hedera-hashgraph	hbar	Hedera	f	\N	2023-05-24	2023-05-24
0fc10012-e477-482b-aae1-3f9469b2439e	hedgehog	hedgehog	Hedgehog	f	\N	2023-05-24	2023-05-24
ee659b6a-6de4-4bfa-90ba-3b52fe55a63e	hedgepay	hpay	HedgePay	f	\N	2023-05-24	2023-05-24
ee89fbee-dd0e-489c-bb11-e6cc21926c36	hedge-protocol	hdg	Hedge Protocol	f	\N	2023-05-24	2023-05-24
abf852a0-63de-4852-820f-bb1d1054a1f1	hedget	hget	Hedget	f	\N	2023-05-24	2023-05-24
8d8ebca5-d146-4726-bd56-673c9faf6139	hedgetrade	hedg	HedgeTrade	f	\N	2023-05-24	2023-05-24
7267e627-828f-4402-b52a-7c35d459effb	hedge-usd	ush	Hedge USD	f	\N	2023-05-24	2023-05-24
37a5124c-54b2-474f-98a7-c4ba3df89d35	hedpay	hdp.ф	HEdpAY	f	\N	2023-05-24	2023-05-24
4288a5c2-41fc-44f9-bcdf-635f23d4e74c	hedron	hdrn	Hedron	f	\N	2023-05-24	2023-05-24
0e823fd1-4666-4a31-a078-d4a2aef0cb5a	hegic	hegic	Hegic	f	\N	2023-05-24	2023-05-24
73de2f40-669f-48de-886b-fd5cd8b4658a	hegic-yvault	yvhegic	HEGIC yVault	f	\N	2023-05-24	2023-05-24
5c952e7d-3c61-4629-9bc7-fc399b915297	helena	helena	Helena Financial	f	\N	2023-05-24	2023-05-24
e56172ff-b32e-4af8-bf1c-3f18aedf3bb0	helicopter-finance	copter	Helicopter Finance	f	\N	2023-05-24	2023-05-24
8dd3fbdc-2d0f-4831-9aed-93c4a0b42fb4	helio-protocol-hay	hay	Destablecoin HAY	f	\N	2023-05-24	2023-05-24
33a314b4-48bb-4ede-a329-5483f84e85f2	heliswap	heli	HeliSwap	f	\N	2023-05-24	2023-05-24
6825e0ab-9a59-4181-9326-384ee1be4c0d	helium	hnt	Helium	f	\N	2023-05-24	2023-05-24
abceb554-7068-466f-a354-c0c11f48b33d	helium-iot	iot	Helium IOT	f	\N	2023-05-24	2023-05-24
f0216905-eaba-404a-b118-aaecebd72ba9	helium-mobile	mobile	Helium Mobile	f	\N	2023-05-24	2023-05-24
aa3efd2c-ebf0-46c1-9a9c-f1a2b2754727	hydra	hydra	Hydra	f	\N	2023-05-24	2023-05-24
0b18b170-ff1c-4b10-a118-3e76924844d4	helleniccoin	hnc	HNC Coin	f	\N	2023-05-24	2023-05-24
1b5499e0-f0f1-4c70-ae0b-b3ca46519e60	hello-art	htt	Hello Art	f	\N	2023-05-24	2023-05-24
e7c96952-9cb7-4c24-85b1-d1ae94b97f36	hello-labs	hello	HELLO	f	\N	2023-05-24	2023-05-24
a9349241-bbf1-4800-b69f-7fdce8b39f5c	hellsing-inu	hellsing	Hellsing Inu	f	\N	2023-05-24	2023-05-24
b8a321bb-5ec8-4f76-b29d-bfd667a17bb5	helmet-insure	helmet	Helmet Insure	f	\N	2023-05-24	2023-05-24
ad2e1cb2-1c99-49ca-bbe0-565cff3c2ef1	help-coin	hlp	HLP	f	\N	2023-05-24	2023-05-24
0772d255-e667-499b-b8e2-fc79103dbec2	helper-coin	hlpr	Helper Coin	f	\N	2023-05-24	2023-05-24
911979e7-3386-4d0b-a9f1-4c87326c9ead	helpico	help	Helpico	f	\N	2023-05-24	2023-05-24
89fa2ecc-0cfe-4213-b201-1367b2a325c3	helpkidz-coin	hkc	HelpKidz Coin	f	\N	2023-05-24	2023-05-24
55ad72ca-948e-414a-b6cc-313423ceef83	helpseed	helps	HelpSeed	f	\N	2023-05-24	2023-05-24
0f85f026-a214-40d2-b29f-16758831319b	help-the-homeless-coin	hth	Help The Homeless Coin	f	\N	2023-05-24	2023-05-24
30bfb4ce-7541-4247-a973-ea87edc73352	hempcoin-thc	thc	Hempcoin	f	\N	2023-05-24	2023-05-24
2bbee96b-3338-43a5-9019-771ab85b0bc7	heptafranc	hptf	HEPTAFRANC	f	\N	2023-05-24	2023-05-24
c95cae0d-dcef-4000-bcda-11e93ed00acb	hepton	hte	Hepton	f	\N	2023-05-24	2023-05-24
2eac088a-7339-4f2e-898d-ae5696885a28	hera-finance	hera	Hera Finance	f	\N	2023-05-24	2023-05-24
41768fdd-f730-4187-b395-4d315c1408ba	herbalist-token	herb	Herbalist	f	\N	2023-05-24	2023-05-24
4fd9acca-2097-4108-9f46-dd2eaad7b799	herbee	bee	Herbee	f	\N	2023-05-24	2023-05-24
2570ceb2-fe27-4ab3-b7fe-233681c1a0fc	herity-network	her	Herity Network	f	\N	2023-05-24	2023-05-24
e7223f19-ef45-43e5-8178-9907cc95e6ca	hermes-dao	hmx	Hermes DAO	f	\N	2023-05-24	2023-05-24
d6884d23-1e67-4c98-9734-0ae48b7834c5	hermes-protocol	hermes	Hermes Protocol	f	\N	2023-05-24	2023-05-24
42a954d1-626b-4d6a-81f0-3c0f90fae4b8	hermez-network-token	hez	Hermez Network	f	\N	2023-05-24	2023-05-24
292a2b28-99cd-41ab-af90-95930ed50d59	hero	hero	HERO	f	\N	2023-05-24	2023-05-24
f1ec2ffd-4134-4364-b150-e59bf23150f9	hero-arena	hera	Hero Arena	f	\N	2023-05-24	2023-05-24
76e69788-c83b-48c5-a524-b4f919f55f7c	hero-blaze-three-kingdoms	mudol2	Hero Blaze: Three Kingdoms	f	\N	2023-05-24	2023-05-24
dee944d9-011b-4686-8d49-c5776bf843a4	hero-cat-token	hct	Hero Cat	f	\N	2023-05-24	2023-05-24
df421f1e-bc20-4f5e-b302-bb3437d9f604	herocoin	play	HEROcoin	f	\N	2023-05-24	2023-05-24
c9931839-3501-4751-a95a-7c023a5822bb	heroeschained	hec	HeroesChained	f	\N	2023-05-24	2023-05-24
e2686f4f-f2d0-48dd-a988-d7558c104e2b	heroes-empires	he	Heroes & Empires	f	\N	2023-05-24	2023-05-24
b68be1b4-f66e-421c-bcc2-f039c03644e7	heroes-of-nft	hon	Heroes of NFT	f	\N	2023-05-24	2023-05-24
47b70d18-4ad7-48cc-8353-68cee57aabf3	heroes-td	htd	Heroes TD	f	\N	2023-05-24	2023-05-24
55d405f4-e9e3-4d6c-ad40-c43fdac68eb8	heroestd-cgc	cgc	HeroesTD CGC	f	\N	2023-05-24	2023-05-24
52c558f5-b14a-4a56-9dc9-597966054535	herofi	heroegg	HeroFi	f	\N	2023-05-24	2023-05-24
f31f8333-80ca-45fd-a8ff-b4b30148ce71	herofi-token-2	rofi	HeroFi ROFI	f	\N	2023-05-24	2023-05-24
ed360449-6b36-4ee1-b86e-6347719bca76	heropark	hp	HeroPark	f	\N	2023-05-24	2023-05-24
6b4fcbdc-ef06-4494-a4ff-b5e6690f7f4e	hertz-network	htz	Hertz Network	f	\N	2023-05-24	2023-05-24
43712c43-4d3a-4917-a916-ea91f91a3308	heruka-tsangnyon	tsangnyon	HERUKA TSANGNYON	f	\N	2023-05-24	2023-05-24
568ce5f9-2e1a-4451-a43f-b594ce66c8e0	herum	ram	Herum	f	\N	2023-05-24	2023-05-24
36ee9275-a55d-48db-ac03-aa3b67742c23	hest-stake	hse	Hest stake	f	\N	2023-05-24	2023-05-24
c7e7b5c5-e697-4288-b43f-7ff670e1f874	hex	hex	HEX	f	\N	2023-05-24	2023-05-24
0259fc9c-10d7-41e7-9f06-f6d41a6ad93e	hex-ethw	hex	HEX ETHW	f	\N	2023-05-24	2023-05-24
39d729b9-cd20-4707-b75b-843fc512f88b	hey	hey	Hey	f	\N	2023-05-24	2023-05-24
11f76386-0cad-4991-95c8-1bed8221b7a0	heyflokiai	a2e	Hey Floki Ai	f	\N	2023-05-24	2023-05-24
bc45d287-827f-47b0-8a6f-cb734d81d37e	hey-reborn-new	rb	Hey Reborn [NEW]	f	\N	2023-05-24	2023-05-24
664dec66-07ba-4515-845e-47db1048be74	hiazuki	hiazuki	hiAZUKI	f	\N	2023-05-24	2023-05-24
fbef8b60-2fd7-4e3d-967c-97a088599df3	hibayc	hibayc	hiBAYC	f	\N	2023-05-24	2023-05-24
fed1d98c-5b33-4c0a-b323-e5d46efa2a3d	hibeanz	hibeanz	hiBEANZ	f	\N	2023-05-24	2023-05-24
ad8cbeb8-4f7e-41e1-912a-713e667efd0e	hibiki-finance	hibiki	Hibiki Finance	f	\N	2023-05-24	2023-05-24
18643c50-2052-4f7f-a761-2fd5e6dba5ca	hiblocks	hibs	Hiblocks	f	\N	2023-05-24	2023-05-24
6dcab4f8-f3ae-4ae5-9b2a-ab482d40c0a5	hic-et-nunc-dao	hdao	Hic et nunc DAO	f	\N	2023-05-24	2023-05-24
143992ce-3904-44ff-a339-cd5e219b9d1a	hiclonex	hiclonex	hiCLONEX	f	\N	2023-05-24	2023-05-24
c80908d5-76da-42de-af55-5f95e2a14f3b	hicoolcats	hicoolcats	hiCOOLCATS	f	\N	2023-05-24	2023-05-24
f088c4e8-1513-4d7e-ad9d-401806ab50a6	hi-dollar	hi	hi Dollar	f	\N	2023-05-24	2023-05-24
47e5dca0-06f5-49bd-99ee-5ef0936dab31	hidoodles	hidoodles	hiDOODLES	f	\N	2023-05-24	2023-05-24
35685f94-2570-4e32-8bb5-37dc5161813a	hiens3	hiens3	hiENS3	f	\N	2023-05-24	2023-05-24
0c8e0c17-178f-4f19-83cf-8abad6cbc63d	hiens4	hiens4	hiENS4	f	\N	2023-05-24	2023-05-24
29b936a4-4ec5-4006-bda2-046008a43edc	hifidenza	hifidenza	hiFIDENZA	f	\N	2023-05-24	2023-05-24
4a6e225c-c211-4241-a851-82c728768d90	hifi-finance	hifi	Hifi Finance	f	\N	2023-05-24	2023-05-24
0b3ca4e8-afe6-4717-a2a4-94fb4d29df11	hifluf	hifluf	hiFLUF	f	\N	2023-05-24	2023-05-24
8529d601-6e1b-4b5d-81e7-0fb7af238a49	hifriends	hifriends	hiFRIENDS	f	\N	2023-05-24	2023-05-24
a1a4025a-b949-4b99-8c1e-f3ad93537e6e	higazers	higazers	hiGAZERS	f	\N	2023-05-24	2023-05-24
bcf35a0d-da44-4469-ab83-34924447d549	high-performance-blockchain	hpb	High Performance Blockchain	f	\N	2023-05-24	2023-05-24
885ba5cd-c708-4831-892e-b243ebd7d80d	high-roller-hippo-clique	roll	High Roller Hippo Clique	f	\N	2023-05-24	2023-05-24
941e514f-8a45-4561-b7e4-e57fe61e8194	highstreet	high	Highstreet	f	\N	2023-05-24	2023-05-24
4e7ba0e5-6831-4fd7-86a0-14eb9540703a	hikari-protocol	hikari	Hikari Protocol	f	\N	2023-05-24	2023-05-24
e3377a88-b90e-4c76-92be-dc4e83d637f4	hillstone	hsf	Hillstone Finance	f	\N	2023-05-24	2023-05-24
d3dfc771-31c8-466c-b8ff-a040420b7d36	hilo	hilo	HILO	f	\N	2023-05-24	2023-05-24
9eb3f3dc-8030-4457-a9dc-24e1ac29b63d	himalayan-cat-coin	hima	Himalayan Cat Coin	f	\N	2023-05-24	2023-05-24
1f21a8c2-c16f-432e-81d2-e8a701d6b3f4	himayc	himayc	hiMAYC	f	\N	2023-05-24	2023-05-24
47c93b4a-febc-4dae-a352-fa6b94d48a49	himeebits	himeebits	hiMEEBITS	f	\N	2023-05-24	2023-05-24
9a1547a8-3d67-430c-b6b4-1fa4ee4ef789	himfers	himfers	hiMFERS	f	\N	2023-05-24	2023-05-24
a9fb7ced-d1da-41e0-a677-846f092f0150	himoonbirds	himoonbirds	hiMOONBIRDS	f	\N	2023-05-24	2023-05-24
528d44b6-cd98-4bf4-996e-28df6a0008ae	himo-world	himo	Himo World	f	\N	2023-05-24	2023-05-24
087b6519-b367-4aa3-a438-24bc184c2505	hina-inu	hina	Hina Inu	f	\N	2023-05-24	2023-05-24
4061e442-2bbe-48f5-9bc3-bde169d67952	hiod	hiod	hiOD	f	\N	2023-05-24	2023-05-24
1fa7cef5-a61c-42d9-804d-5fcf1ba10ab1	hiodbs	hiodbs	hiODBS	f	\N	2023-05-24	2023-05-24
678b6282-2c09-4070-84ef-4610a1f959c3	hipenguins	hipenguins	hiPENGUINS	f	\N	2023-05-24	2023-05-24
c0a8f20a-c41c-46c0-b1e4-468ac9110384	hippopotamus	hpo	Hippo Wallet	f	\N	2023-05-24	2023-05-24
2b051b9f-2fab-4a99-956c-0719d43f444d	hippo-token	hip	Hippo	f	\N	2023-05-24	2023-05-24
f4320d6d-8d1d-46d3-bf1b-aa563e8cf6da	hipunks	hipunks	hiPunks	f	\N	2023-05-24	2023-05-24
966645f3-9db9-4765-b674-65f7e12ef94d	hiram	hiram	Hiram	f	\N	2023-05-24	2023-05-24
3e2dad48-ce88-4487-94ff-d030f76a5716	hirenga	hirenga	hiRENGA	f	\N	2023-05-24	2023-05-24
3888bec9-4d24-4047-923e-a6de35ccf2e7	hisand33	hisand33	hiSAND33	f	\N	2023-05-24	2023-05-24
febf46d7-6a5e-4c0f-9f9f-15f8687125e0	hiseals	hiseals	hiSEALS	f	\N	2023-05-24	2023-05-24
80e8adbd-713b-4c83-bce1-c78e8e5c239c	hisquiggle	hisquiggle	hiSQUIGGLE	f	\N	2023-05-24	2023-05-24
87625fc2-8b5f-496c-ae8f-380b89277f20	historia	hta	Historia	f	\N	2023-05-24	2023-05-24
1d699f32-ba6e-454b-9a8e-3f14ce0abc78	historydao	hao	HistoryDAO	f	\N	2023-05-24	2023-05-24
031da50c-1ee7-49db-aa4a-6d67b49acbc0	hitbtc-token	hit	HitBTC	f	\N	2023-05-24	2023-05-24
b0a5301b-0584-4d46-a18c-854de6d46f80	hitchain	hit	HitChain	f	\N	2023-05-24	2023-05-24
697fd8bc-54ba-4abb-9662-26615cbb557c	hitop	hitop	Hitop	f	\N	2023-05-24	2023-05-24
63a8107a-30e2-4b7b-b4be-81af4f587970	hiundead	hiundead	hiUNDEAD	f	\N	2023-05-24	2023-05-24
3930fe8c-391e-4599-939c-ce5182ad6095	hivalhalla	hivalhalla	hiVALHALLA	f	\N	2023-05-24	2023-05-24
5f9bfbd4-1d24-472c-a345-dd3dbb5223b0	hive	hive	Hive	f	\N	2023-05-24	2023-05-24
04ac0ae2-fa7f-4936-8f89-ebffd0e9019b	hive_dollar	hbd	Hive Dollar	f	\N	2023-05-24	2023-05-24
fe65b5b2-ef24-40de-bab3-020e1d4b7f9d	hive-investments-honey	hny	Hive.Investments HONEY	f	\N	2023-05-24	2023-05-24
6545c777-5b39-402c-8c90-f44262c5b24b	hivemapper	honey	Hivemapper	f	\N	2023-05-24	2023-05-24
ca12bf4f-d6ea-41e0-88a2-cf487faecc26	hiveterminal	hvn	Hiveterminal	f	\N	2023-05-24	2023-05-24
2875a818-936e-4939-b156-b16cd7078936	hivewater	hivewater	hiveWater	f	\N	2023-05-24	2023-05-24
ce389428-7623-498e-bff8-3d1b0c3b87ab	hnb-protocol	hnb	HNB Protocol	f	\N	2023-05-24	2023-05-24
b76acaf2-9bb5-4b38-ba38-47f2f657f906	hobbes	hobbes	Hobbes	f	\N	2023-05-24	2023-05-24
1731bee1-03be-41e1-af48-b3c854eebbdb	hobonickels	hbn	Hobonickels	f	\N	2023-05-24	2023-05-24
878c3b48-cf27-4a8b-be9e-7b5c0fd8c2cd	hodlassets	hodl	HodlAssets	f	\N	2023-05-24	2023-05-24
b3c93946-1785-42e4-9942-c2a0acb3a529	hodl-finance	hft	Hodl Finance	f	\N	2023-05-24	2023-05-24
221218c0-b820-461d-ad1f-f4cf84917a1b	hodl-token	hodl	HODL	f	\N	2023-05-24	2023-05-24
92c3bdd3-e825-4201-b97c-41d6c1346de9	hodooi-com	hod	HoDooi.com	f	\N	2023-05-24	2023-05-24
5430db5f-53cd-459f-9b0f-1d44e430e454	hoge-finance	hoge	Hoge Finance	f	\N	2023-05-24	2023-05-24
d62eefbc-f1b2-4763-9b85-e60526de0197	hoichi	hoichi	Hoichi	f	\N	2023-05-24	2023-05-24
f58f173b-4707-4d99-9f1a-65b1e01746df	hokkaido-inu-30bdfab6-dfb9-4fc0-b3c3-02bffe162ee4	hoka	Hokkaido Inu	f	\N	2023-05-24	2023-05-24
363957ec-6996-4e9e-bcc0-1e8e6fbb6e11	hokkaidu-inu	hokk	HOKK Finance	f	\N	2023-05-24	2023-05-24
f1ee0822-cef0-42f8-95c9-193b54bd76b0	holdr	hldr	Holdr	f	\N	2023-05-24	2023-05-24
83ebfc8b-b0aa-4c4d-a368-ad0eb03dbddd	hold-vip	hold	Hold VIP	f	\N	2023-05-24	2023-05-24
8a230de6-cbc4-43c0-9b51-7c9296ef96c6	hollaex-token	xht	HollaEx	f	\N	2023-05-24	2023-05-24
6416429b-feae-4117-9693-aa79f7199369	hollygold	hgold	HollyGold	f	\N	2023-05-24	2023-05-24
9b3cc857-890a-4a01-892a-38da7a05d485	hollywood-capital-group-warrior	wor	Hollywood Capital Group WARRIOR	f	\N	2023-05-24	2023-05-24
55250a4f-9780-4848-ba84-b559b5d52d45	hololoot	hol	Hololoot	f	\N	2023-05-24	2023-05-24
f369da3e-287c-490e-acec-d81cccd7881d	holonus	hln	Holonus	f	\N	2023-05-24	2023-05-24
ec73bfcb-48e5-4c7f-9145-f28108d233d5	holoride	ride	holoride	f	\N	2023-05-24	2023-05-24
6c33f221-c588-40ff-8b71-99ab8aab7505	holotoken	hot	Holo	f	\N	2023-05-24	2023-05-24
96240c2e-b16c-44ea-8975-152163fd4455	holygrail	hly	HolyGrail	f	\N	2023-05-24	2023-05-24
4c930bf5-e0d4-4f2a-a30a-800e2d0a7308	holygrails-io	holy	HolyGrails.io	f	\N	2023-05-24	2023-05-24
9a307ffe-75b4-4ae4-8f62-1d13fe45393a	holyheld-2	move	Mover	f	\N	2023-05-24	2023-05-24
589f1ed9-d9aa-449e-bd47-adacc406fcf5	homer	simpson	Homer	f	\N	2023-05-24	2023-05-24
9e3c25f9-571e-4cd1-a315-a74ac3e619fe	homeros	hmr	Homeros	f	\N	2023-05-24	2023-05-24
83235388-6de5-4dcb-b1d3-ef95b24ae9ce	homie-wars	homiecoin	Homie Wars	f	\N	2023-05-24	2023-05-24
705682f3-3f29-4e44-a1dd-2ba610047d18	hondaiscoin	hndc	HondaisCoin	f	\N	2023-05-24	2023-05-24
326d82c2-027e-47d7-83b8-1f5ade387149	honest-mining	hnst	Honest	f	\N	2023-05-24	2023-05-24
1cfaaad8-fe21-42a2-a7e7-47b608938c79	honey	hny	Honey	f	\N	2023-05-24	2023-05-24
dd448ec5-09a3-49cb-99fb-c4dde0cf6234	honey-finance	honey	Honey Finance	f	\N	2023-05-24	2023-05-24
0fe96ec1-2b96-4f39-bcfa-72adde8f7ca3	honeyland-honey	hxd	Honeyland	f	\N	2023-05-24	2023-05-24
17c09c26-fa52-4025-82fc-2eba55fa240e	honeymoon-token	moon	HoneyMOON	f	\N	2023-05-24	2023-05-24
d720a1c3-2d0d-442b-8f95-26ef3f9e10e5	honey-pot-beekeepers	honey	Honey Pot BeeKeepers	f	\N	2023-05-24	2023-05-24
76ab7d1a-49db-4984-b63e-a34cd0ee9266	honeywood	cone	HoneyWood	f	\N	2023-05-24	2023-05-24
46aac571-48d8-4762-9bd9-426bc8ff5f7d	hongkongdao	hkd	HongKongDAO	f	\N	2023-05-24	2023-05-24
e473cfde-5e89-4939-a577-4b934599bb98	honor-token	honor	Honor	f	\N	2023-05-24	2023-05-24
b0ccba6c-5965-4e76-a193-5af167d11531	honor-world-token	hwt	Honor World Token	f	\N	2023-05-24	2023-05-24
a1623fb0-f782-4cb1-a874-bc431cc0b92d	hooked-protocol	hook	Hooked Protocol	f	\N	2023-05-24	2023-05-24
bf5e6e92-ae55-4418-ae19-26646eba3aa9	hoop	hoop	Primal Hoop	f	\N	2023-05-24	2023-05-24
e79067c6-94dc-46bd-916f-01e083c5d681	hoot	hoot	Hoot	f	\N	2023-05-24	2023-05-24
47e47575-a9d7-4c7a-b92f-9666e140240c	hopers-io	hopers	HOPERS	f	\N	2023-05-24	2023-05-24
5960bcc0-d364-43f3-a295-db78c86013c6	hoppers-game	fly	Hoppers Game	f	\N	2023-05-24	2023-05-24
3d8ad17a-1096-4b87-aadb-cee6a8e91b09	hop-protocol	hop	Hop Protocol	f	\N	2023-05-24	2023-05-24
37aae511-b7eb-4b87-9237-9ee17c55e6ad	hoppy	hop	HOPPY	f	\N	2023-05-24	2023-05-24
3dedf2a6-fe5f-4e8b-8e5e-761f4203b0fa	hoppyinu	hoppyinu	HoppyInu	f	\N	2023-05-24	2023-05-24
1a9c10df-ef67-4a81-8303-3427b3aed03e	hopr	hopr	HOPR	f	\N	2023-05-24	2023-05-24
6b323440-49cc-4529-96bb-fc58b823b1c5	hord-heth	heth	Hord hETH	f	\N	2023-05-24	2023-05-24
199f6e2d-6b0c-4085-9f7b-2e381b6e5fe8	horizon-protocol	hzn	Horizon Protocol	f	\N	2023-05-24	2023-05-24
ffe1b670-6966-4d8a-a6c9-a8d3aa327816	horny-hyenas	horny	Horny Hyenas	f	\N	2023-05-24	2023-05-24
70d73c51-7108-49c3-9b8e-c70f2d5b1649	horseafi	horsea	HorseaFi	f	\N	2023-05-24	2023-05-24
808e6d8a-470f-4186-9846-66077660ad47	horuspay	horus	HorusPay	f	\N	2023-05-24	2023-05-24
21ea6b18-0ffa-48fb-9040-4b99888ab459	hosky	hosky	Hosky	f	\N	2023-05-24	2023-05-24
43f42968-7af9-4cff-927d-ae4c6f90885c	hotbit-token	htb	Hotbit	f	\N	2023-05-24	2023-05-24
638845a5-9cf2-4899-8e6c-b53e81b45a5b	hot-cross	hotcross	Hot Cross	f	\N	2023-05-24	2023-05-24
e1cf918c-c2ed-4bc1-8f98-abc89b00a551	hot-doge	hotdoge	HotDoge [OLD]	f	\N	2023-05-24	2023-05-24
25fb3d20-d434-4d0c-9877-3b08b7a188b4	hotelium	htl	Hotelium	f	\N	2023-05-24	2023-05-24
4141d429-7168-49e4-97fb-d90e20cffafb	hotmoon	hotmoon	HotMoon	f	\N	2023-05-24	2023-05-24
e6941a8b-b5b2-46f6-b815-9e1b951b3bb6	hot-n-cold-finance	hnc	Hot'n Cold Finance	f	\N	2023-05-24	2023-05-24
97aaa57d-1eb6-4b84-b9ec-10ac6c16db7d	hourglass	wait	Hourglass	f	\N	2023-05-24	2023-05-24
9f40099a-14b2-4743-a03b-11fad0522e4e	houston-token	hou	Houston Token	f	\N	2023-05-24	2023-05-24
72ba6b31-9d2e-4586-92c3-926889ead7e5	howdoo	udoo	Hyprr	f	\N	2023-05-24	2023-05-24
1111730f-2454-45ff-a71c-addf6fe85e86	howl-city	hwl	Howl City	f	\N	2023-05-24	2023-05-24
a39915e0-4fc1-4d39-8814-42883049e783	hrdgcoin	hrdg	HRDGCOIN	f	\N	2023-05-24	2023-05-24
763b7500-0617-4b6b-b368-07e111abbd9a	hshare	hc	HyperCash	f	\N	2023-05-24	2023-05-24
bbe08026-706c-460f-9d92-45d244c7748c	hsuite	hsuite	HbarSuite	f	\N	2023-05-24	2023-05-24
95e45e81-f5d2-4765-b053-0b0023b5e5c7	htm	htm	HTM	f	\N	2023-05-24	2023-05-24
8613acc4-d187-4823-9010-d0011be4ca2e	htmlcoin	html	HTMLCOIN	f	\N	2023-05-24	2023-05-24
648ee3ea-32fd-400b-a28d-78292a5089c8	hubble	hbb	Hubble	f	\N	2023-05-24	2023-05-24
a6d49c75-4cad-443a-a662-4ee77bcba54b	hubin-network	hbn	Hubin Network	f	\N	2023-05-24	2023-05-24
f37f3720-8948-47f4-afaf-8fe273afa692	hubswirl	swirlx	SwirlTokenX	f	\N	2023-05-24	2023-05-24
05ac6af0-d3d6-47d3-99cf-6ad26a4292fa	huckleberry	finn	Huckleberry	f	\N	2023-05-24	2023-05-24
ae2c1e1b-5831-43f2-abb9-4ede59c4ae99	huckleberry-inu	hkby	Huckleberry Inu	f	\N	2023-05-24	2023-05-24
04db56b4-7da2-4131-ab80-f0681570895a	hudex	hu	Hudex	f	\N	2023-05-24	2023-05-24
3f028d2d-eaad-48a6-97da-eacffa174285	hudi	hudi	Hudi	f	\N	2023-05-24	2023-05-24
3e87e702-ad2a-45bc-8762-4cc2ea4f0b8f	hughug-coin	hghg	HUGHUG	f	\N	2023-05-24	2023-05-24
4d1df2ed-b765-4de1-bc58-2e87e05096fd	huh	huh	HUH	f	\N	2023-05-24	2023-05-24
a53beaaf-9bcb-4f66-88bf-35a6060a6900	hulk-inu	hulk	Hulk Inu	f	\N	2023-05-24	2023-05-24
a4745f60-f4f8-4c46-92e9-786385362706	huma-finance	huma	Huma Finance	f	\N	2023-05-24	2023-05-24
aee7e98d-235b-494e-b40b-d83378261ed9	humandao	hdao	humanDAO	f	\N	2023-05-24	2023-05-24
00f3b75a-0a0d-44bc-9178-a25c73fe72f0	humaniq	hmq	Humaniq	f	\N	2023-05-24	2023-05-24
332d8890-e263-4792-be93-a5864014d508	humanize	$hmt	Humanize	f	\N	2023-05-24	2023-05-24
16ab9757-eb41-43a2-9601-01a85055d9f3	humanode	hmnd	Humanode	f	\N	2023-05-24	2023-05-24
ba9129b5-b15c-4893-b56f-27a415bc222e	humanoid-ai	humai	Humanoid AI	f	\N	2023-05-24	2023-05-24
e888ad62-9dd5-459f-9b39-b35c08fe7648	human-protocol	hmt	HUMAN Protocol	f	\N	2023-05-24	2023-05-24
f91c9d45-d52c-4855-b61f-3df7bcf2d563	humans-ai	heart	Humans.ai	f	\N	2023-05-24	2023-05-24
5c3854bb-c52e-4b0d-9b5a-89c101a3a83b	humanscape	hum	Humanscape	f	\N	2023-05-24	2023-05-24
748360aa-b940-4d91-b236-eee553af5e71	hummingbird-egg-token	hegg	Hummingbird Egg	f	\N	2023-05-24	2023-05-24
948a23b4-8738-4a61-93fd-6e278ae863f6	hummingbird-finance	hmng	Hummingbird Finance	f	\N	2023-05-24	2023-05-24
487059d2-3373-4be5-8284-6ff865522807	hummingbot	hbot	Hummingbot	f	\N	2023-05-24	2023-05-24
65591686-8a23-4dae-b701-9b1d3dcdb886	hummus	hum	Hummus	f	\N	2023-05-24	2023-05-24
7fc7a2df-fd4a-4765-9ea8-633915c2e122	hundred-finance	hnd	Hundred Finance	f	\N	2023-05-24	2023-05-24
e9d274e1-35c0-4684-95e9-b34a8c2fbe8e	hungarian-vizsla-inu	hvi	Hungarian Vizsla Inu	f	\N	2023-05-24	2023-05-24
657c4e59-4c5c-4465-b067-4ec5af250aaa	hunger-token	hunger	Hunger	f	\N	2023-05-24	2023-05-24
9e4875b1-728f-45ef-a5dd-4aff6708d51a	hungrybear	hungry	HungryBear	f	\N	2023-05-24	2023-05-24
89a527db-de3b-479f-9c7c-41c5e16b2fbe	hunny-love-token	love	HunnyDAO	f	\N	2023-05-24	2023-05-24
f98e6ca9-434b-400f-8050-339a73561888	hunter	hntr	Hunter Token	f	\N	2023-05-24	2023-05-24
aaf4bd24-b54d-42bc-b572-a1729efa002d	hunter-diamond	hunt	Hunter Diamond	f	\N	2023-05-24	2023-05-24
729e79eb-bf5e-4c0f-b23a-bc03e5e8c2e0	hunt-token	hunt	Hunt	f	\N	2023-05-24	2023-05-24
54a6785c-fb1c-4c15-a0ef-9c124d955329	huny	huny	Huny	f	\N	2023-05-24	2023-05-24
b52269d1-c123-4b8e-915e-22327e51a840	huobi-bitcoin-cash	hbch	Huobi Bitcoin Cash	f	\N	2023-05-24	2023-05-24
7b1b39e2-68b7-4dd9-8bf8-4ddeed7a1b33	huobi-btc	hbtc	Huobi BTC	f	\N	2023-05-24	2023-05-24
e0804a0d-65da-4a72-9be7-5a14a9661763	huobi-ethereum	heth	Huobi Ethereum	f	\N	2023-05-24	2023-05-24
e84437e6-3fc5-4bf2-a2e2-fc5a92e26fa0	huobi-fil	hfil	Huobi Fil	f	\N	2023-05-24	2023-05-24
b78bb326-1626-489b-b766-2f069f221dad	huobi-litecoin	hltc	Huobi Litecoin	f	\N	2023-05-24	2023-05-24
0523d62b-3c01-4081-a91c-47d1b6c555b4	huobi-polkadot	hdot	Huobi Polkadot	f	\N	2023-05-24	2023-05-24
f0b8d21f-07c4-4235-ac32-279db1a430b4	huobi-pool-token	hpt	Huobi Pool	f	\N	2023-05-24	2023-05-24
c2404803-2982-4e7d-ac3a-aab744d381e2	huobi-token	ht	Huobi	f	\N	2023-05-24	2023-05-24
c964d34d-9d74-4af7-80fc-19292c2c1ebb	hupayx	hpx	HUPAYX	f	\N	2023-05-24	2023-05-24
05311322-3708-4a97-ab40-3698f2ede620	hurrian-network	mld	Hurrian Network	f	\N	2023-05-24	2023-05-24
337cfae7-1f53-41bd-b55e-610092863d5e	hurricane-nft	nhct	Hurricane NFT	f	\N	2023-05-24	2023-05-24
9da71543-e34a-4c91-bea4-2813283c0b4f	hurricaneswap-token	hct	HurricaneSwap	f	\N	2023-05-24	2023-05-24
153555c4-99b3-4037-b312-b4ef137e0b1d	husd	husd	HUSD	f	\N	2023-05-24	2023-05-24
8db29d41-815a-48ee-bd1e-2806de829984	hush	hush	Hush	f	\N	2023-05-24	2023-05-24
0775c222-7b96-4d3c-96e0-52b1ab5d3535	hush-cash	hush	Hush.cash	f	\N	2023-05-24	2023-05-24
8464e670-a600-4d09-b1ab-14886f942510	husky	husky	Husky	f	\N	2023-05-24	2023-05-24
e3421d3e-b693-42c7-b535-e333f45b792a	husky-avax	husky	Husky AVAX	f	\N	2023-05-24	2023-05-24
01db2f44-94b5-4a9c-9e0d-00b04b7265c8	hxro	hxro	Hxro	f	\N	2023-05-24	2023-05-24
1e66fd12-a170-4e90-b7a0-3812480bbac0	hybrid-token-2f302f60-395f-4dd0-8c18-9c5418a61a31	hbd	HYBRID TOKEN	f	\N	2023-05-24	2023-05-24
c704e26b-c608-4dc4-a79a-b6254f4e6b6f	hydradx	hdx	HydraDX	f	\N	2023-05-24	2023-05-24
355d05dc-e8f3-4de0-8e35-bd0a5c8822a5	hydranet	hdx	Hydranet	f	\N	2023-05-24	2023-05-24
91d6319f-37a5-4b95-9518-46f81cffbb31	hydraverse	hdv	Hydraverse	f	\N	2023-05-24	2023-05-24
9066419e-276b-4a4e-9788-e865e01ab1f6	hydro	hydro	Hydro	f	\N	2023-05-24	2023-05-24
e7e84722-8792-4b61-8da6-be15492913f1	hymnode	hnt	Hymnode	f	\N	2023-05-24	2023-05-24
a199badf-0ff8-45da-b154-99fd641d7266	hyper-2	hyper	Hyper	f	\N	2023-05-24	2023-05-24
9c37514b-6eb3-42d1-8419-27623592a7cc	hyperalloy	alloy	HyperAlloy	f	\N	2023-05-24	2023-05-24
9a2f43b4-d29f-4add-ae16-894cba47e9b0	hypercent	hype	Hypercent	f	\N	2023-05-24	2023-05-24
05f5195b-5677-4e99-ab66-f029a00dcb98	hyperchainx	hyper	HyperChainX	f	\N	2023-05-24	2023-05-24
359f8dd6-a673-4152-bbe0-f90df570d3f0	hypercomic	hyco	HYPERCOMIC	f	\N	2023-05-24	2023-05-24
fb394a99-ff7d-44ba-968c-f52d2aa720db	hypercycle	hypc	HyperCycle	f	\N	2023-05-24	2023-05-24
2d0ddf02-34fe-479b-a671-0c7426ae5659	hyperdao	hdao	HyperDAO	f	\N	2023-05-24	2023-05-24
465addf4-beb6-4fd5-94fa-ff3f5606c614	hypergpt	hgpt	HyperGPT	f	\N	2023-05-24	2023-05-24
783de445-7800-4030-aa57-cc6ce4571906	hyperonchain	hpn	HyperonChain	f	\N	2023-05-24	2023-05-24
5ee32d98-4cd3-4831-8727-26bd56627e33	hypersign-identity-token	hid	Hypersign Identity	f	\N	2023-05-24	2023-05-24
01c8a298-289a-493f-b439-296fd6854211	hyperstake	hyp	Element	f	\N	2023-05-24	2023-05-24
2a462a6b-b036-4586-ae73-078d3521af5f	hyperverse	hvt	HyperVerse	f	\N	2023-05-24	2023-05-24
9cb28679-3aff-4ac9-97a2-ed316720c32b	hyruleswap	rupee	HyruleSwap	f	\N	2023-05-24	2023-05-24
acf39c13-707b-49a2-adfe-e8ca0129b35c	hyve	hyve	Hyve	f	\N	2023-05-24	2023-05-24
92645a25-60cc-4c13-a87a-e770b84500df	hzm-coin	hzm	HZM Coin	f	\N	2023-05-24	2023-05-24
31a3f7ef-44db-4fb1-b17a-8e4759a17e16	iagon	iag	Iagon	f	\N	2023-05-24	2023-05-24
67b5f173-5175-434b-810d-c49d02191315	iamx	iamx	IAMX	f	\N	2023-05-24	2023-05-24
22d1ad6a-06ff-4322-a84a-51a8e66289be	iassets	asset	iAssets	f	\N	2023-05-24	2023-05-24
cb8dfd0a-c756-4a6e-80dc-b7c72c6bdfc5	iazuki	iazuki	IAzuki	f	\N	2023-05-24	2023-05-24
4c17c329-0858-44ac-bba8-82db3a54dad5	ibetyou	iby	iBetYou	f	\N	2023-05-24	2023-05-24
3d277ffd-2b7f-4ca4-8dcd-f75b4b6197f1	ibg-token	ibg	iBG Finance (BSC)	f	\N	2023-05-24	2023-05-24
c5ca0d75-5152-4899-aacc-764b14a5cf02	ibithub	ibh	iBitHub	f	\N	2023-05-24	2023-05-24
43f80640-6c5a-479c-abbe-d56c56111a99	ibiza-token	ibz	Ibiza Token	f	\N	2023-05-24	2023-05-24
a9cac91f-afb9-4e4f-a5e5-bd9bce8fc61e	ibs	ibs	IBS	f	\N	2023-05-24	2023-05-24
eee15a3a-b34b-4f91-a4e9-85f2dcb869e9	ibtc-2	ibtc	iBTC	f	\N	2023-05-24	2023-05-24
7620799e-3128-4cbd-ad0c-3d16bd1cfeb5	ibuffer	ibfr	iBuffer	f	\N	2023-05-24	2023-05-24
61706f2b-2a1c-4ff1-9923-32d80eee0390	ibuffer-token	bfr	Buffer Token	f	\N	2023-05-24	2023-05-24
a593e94b-6200-48d2-bfb7-041d7aa37d29	icecream	ice	IceCreamSwap	f	\N	2023-05-24	2023-05-24
056c8e88-c965-44b2-b49a-15c6988658fc	ice-token	ice	Popsicle Finance	f	\N	2023-05-24	2023-05-24
58a5ce8b-4d90-4681-b0bd-bdbbcde71cfe	ichi-farm	ichi	ICHI	f	\N	2023-05-24	2023-05-24
6e016263-bef9-4d9d-abdb-9d6874f496c3	ichigo-inu	ichigo	Ichigo Inu	f	\N	2023-05-24	2023-05-24
f719c960-40a3-4a1b-9946-5c44d62c4f89	i-coin	icn	I-Coin V2	f	\N	2023-05-24	2023-05-24
47e096b0-3556-4074-b1f3-041e743215d7	icomex	icmx	iCOMEX	f	\N	2023-05-24	2023-05-24
9f702627-f372-4ed7-8ebc-acc4b51c6cf7	icommunity	icom	iCommunity	f	\N	2023-05-24	2023-05-24
9e8390ba-47e0-490c-b9b3-54d095ee75b5	icon	icx	ICON	f	\N	2023-05-24	2023-05-24
06fa80ca-02a6-4e26-9d6d-483ff6fe4f39	iconiq-lab-token	icnq	Deutsche Digital Assets	f	\N	2023-05-24	2023-05-24
03ffd663-9f62-4a74-a823-3ebdba63cd30	icosa	icsa	Icosa	f	\N	2023-05-24	2023-05-24
814211af-96fc-40d2-b120-194e50f510ea	icy	ic	Icy	f	\N	2023-05-24	2023-05-24
343a8648-bfdc-408e-8e99-dddbdf272e9b	idavoll-network	idv	Idavoll DAO	f	\N	2023-05-24	2023-05-24
95a8a290-0e7d-4623-9c70-b8c1fa1d13f8	ideachain	ich	IdeaChain	f	\N	2023-05-24	2023-05-24
d0fcc28e-1ef8-4b81-9f01-611651108020	ideamarket	imo	Ideamarket	f	\N	2023-05-24	2023-05-24
4d734749-bcc3-4cd1-825a-4c3b8c969ca2	ideaology	idea	Ideaology	f	\N	2023-05-24	2023-05-24
0ebb3feb-1946-4512-a741-a803a45a5f85	ideas	ideas	IDEAS	f	\N	2023-05-24	2023-05-24
a3710b89-091d-4b09-aacd-e9b69a2a8c4f	idefiyieldprotocol	idyp	iDypius	f	\N	2023-05-24	2023-05-24
cf7cd56f-6fef-4704-b40a-d808ba5e8a3a	idena	idna	Idena	f	\N	2023-05-24	2023-05-24
d4c3774b-2dd2-4d35-920e-2596f770c64a	identity	idtt	Identity	f	\N	2023-05-24	2023-05-24
66be8466-d482-41e3-adb9-d03a619f7bb0	idexo-token	ido	Idexo	f	\N	2023-05-24	2023-05-24
e0755605-6c33-45a2-8779-1cc1c4541153	idia	idia	Impossible Finance Launchpad	f	\N	2023-05-24	2023-05-24
d4693dcc-fb00-40c4-95b1-0921ad731d8f	idk	idk	IDK	f	\N	2023-05-24	2023-05-24
7fb22692-a1d7-4392-a089-c2d80e563cbc	idle	idle	IDLE	f	\N	2023-05-24	2023-05-24
1fcd9bcd-1fd5-418a-9b67-c2572d6c6ba4	idle-dai-risk-adjusted	idledaisafe	IdleDAI (Risk Adjusted)	f	\N	2023-05-24	2023-05-24
752a5eba-b77f-441c-bea5-775e88541629	idle-dai-yield	idledaiyield	IdleDAI (Best Yield)	f	\N	2023-05-24	2023-05-24
6209facc-6ed3-47c9-a0b3-60082b2ea85d	idle-susd-yield	idlesusdyield	IdleSUSD (Yield)	f	\N	2023-05-24	2023-05-24
32ea7860-f208-43a0-a0b7-b022750382b1	idle-tusd-yield	idletusdyield	IdleTUSD (Best Yield)	f	\N	2023-05-24	2023-05-24
dd7b4a7b-1ada-4ae9-ae48-5a362ae3481d	idle-usdc-risk-adjusted	idleusdcsafe	IdleUSDC (Risk Adjusted)	f	\N	2023-05-24	2023-05-24
fd7c3caa-694a-44e0-b6b5-13883be04b0c	idle-usdc-yield	idleusdcyield	IdleUSDC (Yield)	f	\N	2023-05-24	2023-05-24
ab0cba67-4e61-45c0-b5c6-46d585b6cc72	idle-usdt-risk-adjusted	idleusdtsafe	IdleUSDT (Risk Adjusted)	f	\N	2023-05-24	2023-05-24
f2f68adc-df24-4297-b8fb-5edf19fcdd5c	idle-usdt-yield	idleusdtyield	IdleUSDT (Yield)	f	\N	2023-05-24	2023-05-24
e633fa1d-8b85-4c28-89b7-c33ba94b477b	idle-wbtc-yield	idlewbtcyield	IdleWBTC (Best Yield)	f	\N	2023-05-24	2023-05-24
f050944a-1599-488a-8062-3bfaeff79d7d	idm-token	idm	IDM Coop	f	\N	2023-05-24	2023-05-24
f9f8b3c3-0153-4998-a50b-5c39bb23fc04	idoodles	idoodles	IDOODLES	f	\N	2023-05-24	2023-05-24
11844587-3ef2-49f4-be77-adc1f21dc72c	iethereum	ieth	iEthereum	f	\N	2023-05-24	2023-05-24
318acb5c-82c3-4d62-b4a1-6b1bcb255ce5	iexec-rlc	rlc	iExec RLC	f	\N	2023-05-24	2023-05-24
c2045c61-afe3-45ca-bffd-ee13e1068205	ifarm	ifarm	iFARM	f	\N	2023-05-24	2023-05-24
580b6087-a3e6-4260-8855-79c17d46ba3c	ifortune	ifc	iFortune	f	\N	2023-05-24	2023-05-24
aabf8dfc-f15c-4690-abea-1a3dbce81524	iftoken	ift	IFT	f	\N	2023-05-24	2023-05-24
7bbad73e-4f12-440b-bc66-e89e12ade6f7	ig-gold	igg	IG Gold	f	\N	2023-05-24	2023-05-24
db444594-28f0-4329-a895-ce6a04453be1	ignis	ignis	Ignis	f	\N	2023-05-24	2023-05-24
100743a0-7c97-4745-a368-a323c567ee38	ignore-fud	4token	Ignore Fud	f	\N	2023-05-24	2023-05-24
5c01357a-1107-408b-818f-09d54bb79324	iguverse	igup	IguVerse IGUP	f	\N	2023-05-24	2023-05-24
681ba4ba-8107-43f8-a0dc-0a125391c4ff	iguverse-igu	igu	IguVerse IGU	f	\N	2023-05-24	2023-05-24
8851436d-5cc3-4719-bb31-a80a410487c4	iht-real-estate-protocol	iht	IHT Real Estate Protocol	f	\N	2023-05-24	2023-05-24
94acaee9-d9a2-4c1a-a042-5dbdc311b27a	iinjaz	ijz	iinjaz	f	\N	2023-05-24	2023-05-24
309cf54b-1d38-4066-8d24-3fff158bdcf1	ijascoin	ijc	IjasCoin	f	\N	2023-05-24	2023-05-24
5039fb6b-5e73-42c5-978d-5648933c3a65	ikolf	ikolf	IKOLF	f	\N	2023-05-24	2023-05-24
68c5e2c6-da21-47c4-89fc-e1feea63868c	ilcapo	capo	ILCAPO	f	\N	2023-05-24	2023-05-24
808e4715-a77d-42a8-8831-ebf61105063d	ilcoin	ilc	ILCOIN	f	\N	2023-05-24	2023-05-24
fa89839b-de14-4de5-9a12-9ab086945c12	illuvium	ilv	Illuvium	f	\N	2023-05-24	2023-05-24
076ecbd4-a633-4a00-8ac6-cbc1754bcffa	i-love-snoopy	lovesnoopy	I LOVE SNOOPY	f	\N	2023-05-24	2023-05-24
45c3db18-6a34-437b-8f0c-88635a43a954	ilus-coin	ilus	ILUS Coin	f	\N	2023-05-24	2023-05-24
b8f87282-7bca-4b2a-8eed-2e7dd6a8c7d0	imagecoin	img	ImageCoin	f	\N	2023-05-24	2023-05-24
d8b60a45-8a0f-4c50-acfe-d34cf35a775d	imayc	imayc	IMAYC	f	\N	2023-05-24	2023-05-24
76bd4ca1-190b-4322-a55b-185f0fbcb640	ime-lab	lime	iMe Lab	f	\N	2023-05-24	2023-05-24
a40a01d3-f8e1-415c-bc3f-adf6c697348f	imgnai	imgnai	Image Generation AI	f	\N	2023-05-24	2023-05-24
22035958-77f5-4ca4-a0aa-a8d9ff8c3bae	immortaldao	immo	ImmortalDAO	f	\N	2023-05-24	2023-05-24
b10c92b6-d42c-4a48-b925-f5d2d66b1747	immortl	imrtl	Immortl (OLD)	f	\N	2023-05-24	2023-05-24
e80b03cf-4fca-485c-8bea-d128d27f6188	immortl-2	imrtl	Immortl	f	\N	2023-05-24	2023-05-24
23f65f0b-48c8-4d85-ada2-97a49f7c798e	immutable	dara	Immutable	f	\N	2023-05-24	2023-05-24
8f884695-7cca-4f9e-b2c8-174b72c83b3f	immutable-x	imx	ImmutableX	f	\N	2023-05-24	2023-05-24
d6d598a2-9abd-4659-b12f-02a2afc86875	imo	imo	IMO	f	\N	2023-05-24	2023-05-24
2d8c2111-8635-4a1f-ab06-162d1f72ea75	i-money-crypto	imc	i Money Crypto	f	\N	2023-05-24	2023-05-24
65f55e38-7f50-4771-a5e5-3f5216c32764	imov	imt	IMOV	f	\N	2023-05-24	2023-05-24
7da14acd-6acb-499c-ba27-21f2ee30011a	impactmarket	pact	impactMarket	f	\N	2023-05-24	2023-05-24
204e9795-2fee-4535-b07f-7dad82f1a0bc	impactxp	impactxp	ImpactXP	f	\N	2023-05-24	2023-05-24
9a1ac480-2dbb-416d-83b2-771fddece632	impactxprime	ixp	IMPACTXPRIME	f	\N	2023-05-24	2023-05-24
b3bb92db-53f5-4dcd-ab64-d70d767eb44d	imperial-obelisk-2	imp	Imperial Obelisk	f	\N	2023-05-24	2023-05-24
ff4c919d-5b59-4a47-9735-26180ccfb7ce	imperium-empires	ime	Imperium Empires	f	\N	2023-05-24	2023-05-24
96bfd934-29e4-4342-971c-95ef1f0ed8ca	impermax-2	ibex	Impermax	f	\N	2023-05-24	2023-05-24
80071443-a408-4bb7-aa19-dbf1675babbc	impossible-finance	if	Impossible Finance	f	\N	2023-05-24	2023-05-24
909f4b36-47e4-4ab7-8784-62859a3b7d0c	impostors-blood	blood	Impostors Blood	f	\N	2023-05-24	2023-05-24
e05b1d46-9398-413a-bce7-e21e0efc4c26	impt	impt	IMPT	f	\N	2023-05-24	2023-05-24
4280d5eb-0f6e-41a2-b766-a7c2c620a143	incakoin	nka	IncaKoin	f	\N	2023-05-24	2023-05-24
c4d2a43f-61a3-4a1b-afc4-ca1f0e8da826	inci-token	inci	Inci	f	\N	2023-05-24	2023-05-24
911a7c4c-14f0-4737-acb5-6fc2c0307cb1	incognito-2	prv	Incognito	f	\N	2023-05-24	2023-05-24
5c63d434-0077-4020-a0d6-4d55cf990951	income-island	income	Income Island	f	\N	2023-05-24	2023-05-24
0219ff37-e646-49ac-baf5-e293bb3205db	incube-chain	icb	Incube Chain	f	\N	2023-05-24	2023-05-24
576e6e06-04e3-40c3-b95c-f9d494c08fa2	indahash	idh	indaHash	f	\N	2023-05-24	2023-05-24
07da04dd-72e8-4f62-a6da-ff04cd953717	index-avalanche-defi	ixad	Index Avalanche DeFi	f	\N	2023-05-24	2023-05-24
3a821e9d-3941-43cb-aeca-725c8e6886ea	index-cooperative	index	Index Cooperative	f	\N	2023-05-24	2023-05-24
796ce91c-3f10-436e-bc5a-86f5b426c414	index-coop-eth-2x-flexible-leverage-index	eth2x-fli-p	Index Coop - ETH 2x Flexible Leverage Index (Polygon)	f	\N	2023-05-24	2023-05-24
d367c06a-dcb3-4add-a6d2-0d9e930dd767	index-coop-matic-2x-flexible-leverage-index	matic2x-fli-p	Index Coop - MATIC 2x Flexible Leverage Index	f	\N	2023-05-24	2023-05-24
3f8fb2a7-858e-454a-93c5-57bb38d2bbc1	indexed-finance	ndx	Indexed Finance	f	\N	2023-05-24	2023-05-24
c27e96ce-0341-45f6-b56e-cd42c9a3c2d2	indian-shiba-inu	indshib	Indian Shiba Inu	f	\N	2023-05-24	2023-05-24
22520ec8-c2ec-46c7-a617-adc8ff4e367c	indigg	indi	IndiGG	f	\N	2023-05-24	2023-05-24
97603de3-d9f1-4598-a71a-706d46ec0a99	indigo-dao-governance-token	indy	Indigo Protocol	f	\N	2023-05-24	2023-05-24
7bf5f59b-2195-4f43-92d7-981aee7a49cc	indigo-protocol-ieth	ieth	Indigo Protocol iETH	f	\N	2023-05-24	2023-05-24
1eeb18f1-7184-48e8-aeba-de80b7c54002	indorse	ind	Indorse	f	\N	2023-05-24	2023-05-24
8f8d6cdb-99b5-4938-9094-ad36b536f446	inery	$inr	Inery	f	\N	2023-05-24	2023-05-24
86764065-2b90-4dc1-a83a-b0ed6e739cc6	infam	inf	Infam	f	\N	2023-05-24	2023-05-24
c0be9fe6-8ad3-426c-80b0-ec3c842139e5	infiblue-world	monie	Infiblue World	f	\N	2023-05-24	2023-05-24
aa1780fb-908d-43d6-b688-9d5903e8f6a5	infinite-arcade-tic	tic	Infinite Arcade TIC	f	\N	2023-05-24	2023-05-24
b7b4abd9-4571-46a1-9990-a63fe3290eda	infinitee	inftee	Infinitee	f	\N	2023-05-24	2023-05-24
e2882392-def3-45ed-8f24-2851c1d1b5ac	infinite-launch	ila	Infinite Launch	f	\N	2023-05-24	2023-05-24
de314595-05ff-4f2d-a90b-313b7391ae4f	infinitorr	torr	InfiniTORR	f	\N	2023-05-24	2023-05-24
8ae73930-186f-4b57-a62e-84ae3a95b3e4	infinity-angel	ing	Infinity Games	f	\N	2023-05-24	2023-05-24
d7be84cc-f725-4d7e-977a-021af9772459	infinity-arena	inaz	Infinity Arena	f	\N	2023-05-24	2023-05-24
ae87980a-7149-4c70-a1dc-2df3cd556f4c	infinity-box	ibox	Infinity Box	f	\N	2023-05-24	2023-05-24
70e09b67-6603-4ac7-b4c2-2be2513625b6	infinity-esaham	infs	Infinity Esaham	f	\N	2023-05-24	2023-05-24
90cfd591-bde8-46fc-a4a4-7316965a3239	infinity-pad-2	ipad	Infinity PAD	f	\N	2023-05-24	2023-05-24
f34cba0e-bf9f-4a66-8a1c-d8c503e7560f	infinity-protocol	infinity	Infinity Protocol	f	\N	2023-05-24	2023-05-24
1d299d72-daa8-4136-aa50-e0c8764c3c72	infinity-rocket-token	irt	Infinity Rocket	f	\N	2023-05-24	2023-05-24
65141f0d-3f84-4f7a-8327-890d7387bab4	infinity-skies	isky	Infinity Skies	f	\N	2023-05-24	2023-05-24
ce238add-0158-4065-b17e-ffebfcecf84e	infinium	inf	Infinium	f	\N	2023-05-24	2023-05-24
35d5bce3-4a6a-4cc7-9069-158280b50933	inflationcoin	iflt	InflationCoin	f	\N	2023-05-24	2023-05-24
ea59d22f-e349-4d7a-84f1-5b9cbf05b78f	inflation-hedging-coin	ihc	Inflation Hedging Coin	f	\N	2023-05-24	2023-05-24
9e196d88-59d2-4ffe-9ef9-52a573eea868	infliv	ifv	INFLIV	f	\N	2023-05-24	2023-05-24
52dac3f5-dce3-4897-ad2f-70085cc9a7f9	influxcoin	infx	Influxcoin	f	\N	2023-05-24	2023-05-24
5aedda2e-a64a-4a7f-9c03-440b8125e5bf	info-token	info	Kardia Info	f	\N	2023-05-24	2023-05-24
bdb35970-b636-4cb6-b6aa-b74a96c7e523	inftspace	ins	iNFTspace	f	\N	2023-05-24	2023-05-24
f9f99739-3f52-4efc-b09b-d33872c3404f	inheritance-art	iai	inheritance Art	f	\N	2023-05-24	2023-05-24
2ef9c51f-5ac3-4d0e-8aad-b327649b46ee	init	init	Inite	f	\N	2023-05-24	2023-05-24
6c2df708-69a6-4e51-bacc-71c518099cad	injective-protocol	inj	Injective	f	\N	2023-05-24	2023-05-24
3914f50a-1215-43dd-a8ba-9eed1361dec2	ink	ink	Ink	f	\N	2023-05-24	2023-05-24
35c23093-d81f-4e96-a780-e245e587792f	ink-fantom	ink	Ink Fantom	f	\N	2023-05-24	2023-05-24
012d483f-a067-4b6e-8fff-24b923847c12	ink-finance	quill	Ink Finance	f	\N	2023-05-24	2023-05-24
2ef09565-36fc-43ff-92f9-728cb6bbd8a5	innitforthetech	innit	InnitForTheTECH	f	\N	2023-05-24	2023-05-24
7c02f72b-9819-4a2c-ac70-af69b5ab1e24	innova	inn	Innova	f	\N	2023-05-24	2023-05-24
44b625e9-cf96-45c1-bdb3-5da83a31e997	innovative-bioresearch	innbc	Innovative Bioresearch Coin	f	\N	2023-05-24	2023-05-24
794e6822-f156-40f8-8074-25172502807e	inoovi	ivi	Inoovi	f	\N	2023-05-24	2023-05-24
ed70633a-a970-4f07-8913-36a8cf1f8b56	inpulse-x-2	ipx	InpulseX	f	\N	2023-05-24	2023-05-24
7ab070ef-2875-46b7-9f7a-0066f06f743a	ins3-finance-coin	itf	Ins3.Finance Coin	f	\N	2023-05-24	2023-05-24
8fb41367-68a8-4f15-a94f-13479f2bfc3e	insc	insc	INSC	f	\N	2023-05-24	2023-05-24
4d721a2c-0a73-45f6-811b-28192ff381a4	insf	insf	INSF	f	\N	2023-05-24	2023-05-24
ddffbd69-b11b-4f78-a75b-3b717ba0dba0	insight-ai	insai	Insight AI	f	\N	2023-05-24	2023-05-24
310cd601-fc15-4be6-87c1-650924f3b23a	insight-protocol	inx	Insight Protocol	f	\N	2023-05-24	2023-05-24
269f57dc-5ee4-4050-836e-2fcac52445e3	insights-network	instar	INSTAR	f	\N	2023-05-24	2023-05-24
0cf99977-9211-45ff-a53c-20160e741a7f	insrt-finance	$insrt	Insrt Finance	f	\N	2023-05-24	2023-05-24
15c31279-f1b7-4085-bfd4-5d05502a99b2	instadapp	inst	Instadapp	f	\N	2023-05-24	2023-05-24
8d9ca256-873b-45ce-accb-4ced3c14ed78	instadapp-dai	idai	Instadapp DAI	f	\N	2023-05-24	2023-05-24
4e163ac1-cec1-4807-9ef5-835e83b47aba	instadapp-eth	ieth	iETH v1	f	\N	2023-05-24	2023-05-24
383fce2e-4656-4d84-9835-a8fe31ab8c74	instadapp-eth-v2	ieth v2	Instadapp ETH v2	f	\N	2023-05-24	2023-05-24
13a085b6-fd37-4c06-801a-dac743f45437	instadapp-usdc	iusdc	Instadapp USDC	f	\N	2023-05-24	2023-05-24
b3e7bceb-98a2-4184-b40d-3fcd1101f657	instadapp-wbtc	iwbtc	Instadapp WBTC	f	\N	2023-05-24	2023-05-24
d3ea837d-d2d9-4a74-bd70-55c16ee16f41	instrumental-finance	strm	Instrumental Finance	f	\N	2023-05-24	2023-05-24
f06cc7f4-dce9-41b6-93f1-1212e785844d	insula	isla	Insula	f	\N	2023-05-24	2023-05-24
4feafbd0-23d5-49d5-80ec-9c0d26cc4146	insurace	insur	InsurAce	f	\N	2023-05-24	2023-05-24
f9e9d4d5-c415-4f0a-87a2-9ee59fc97c01	insure	sure	inSure DeFi	f	\N	2023-05-24	2023-05-24
fdb472e1-a352-48a3-b5b0-cf4e276ca6d8	insuredao	insure	InsureDAO	f	\N	2023-05-24	2023-05-24
2575705a-c5fd-4d63-b591-370ab505c2ba	insured-finance	infi	Insured Finance	f	\N	2023-05-24	2023-05-24
4be3e18a-a847-456a-9fe6-c2774fb6bb3a	insureum	isr	Insureum	f	\N	2023-05-24	2023-05-24
c5856114-124b-43bd-a444-27d1df0c75ef	insurex	ixt	iXledger	f	\N	2023-05-24	2023-05-24
92781f66-1c70-4ea2-95af-6fe8bdd4593b	integral	itgr	Integral	f	\N	2023-05-24	2023-05-24
9f0adb89-f802-454b-99f3-bf25ed2bf668	integritee	teer	Integritee	f	\N	2023-05-24	2023-05-24
eabd9773-4725-457a-9b8f-f031971cb799	intelly	intl	Intelly	f	\N	2023-05-24	2023-05-24
9d572659-0f09-4d74-8ff1-06eecd460db6	interactwith-token	inter	InteractWith	f	\N	2023-05-24	2023-05-24
b18962fd-c4a8-4510-9e6f-875552b4f288	interbtc	ibtc	interBTC	f	\N	2023-05-24	2023-05-24
6c183237-253f-4292-92a8-1567973b94a7	interest-bearing-eth	ibeth	Interest Bearing ETH	f	\N	2023-05-24	2023-05-24
af4ff996-314a-4ccb-aca5-f92e93f0786d	interest-compounding-eth-index	iceth	Interest Compounding ETH Index	f	\N	2023-05-24	2023-05-24
92694347-c5a0-4732-b47a-bccf1da620c5	interest-protocol	usdi	Interest Protocol USDi	f	\N	2023-05-24	2023-05-24
16f4d1af-68ac-49ed-9dd7-8600cb6a8b68	interest-protocol-token	ipt	Interest Protocol Token	f	\N	2023-05-24	2023-05-24
7a032f3a-a7d2-4a6e-a04e-2ecd22c66904	interfinex-bills	ifex	Interfinex Bills	f	\N	2023-05-24	2023-05-24
84b42215-e89d-4582-b3c1-8c2f2675a691	interlay	intr	Interlay	f	\N	2023-05-24	2023-05-24
34d51321-2f0e-4078-8f4b-aadf21f152bd	inter-milan-fan-token	inter	Inter Milan Fan Token	f	\N	2023-05-24	2023-05-24
119e9e3a-9429-4358-b33c-c2051d4e53c2	internet-computer	icp	Internet Computer	f	\N	2023-05-24	2023-05-24
9f79db6f-0b80-4460-a461-9c159ca1ddd4	internet-money	im	Internet Money (ETH)	f	\N	2023-05-24	2023-05-24
b3fe2cc5-8da5-4eb0-b792-e208d9d05d49	internet-money-bsc	im	Internet Money (BSC)	f	\N	2023-05-24	2023-05-24
2decf845-80b2-438e-bc6b-9b4c5471dfc8	internet-node-token	int	INTchain	f	\N	2023-05-24	2023-05-24
1af51408-f683-4054-8a80-c5d83dad9dba	internet-of-energy-network	ioen	Internet of Energy Network	f	\N	2023-05-24	2023-05-24
114e5527-85aa-457f-a1b4-7267ba26cb9f	internxt	inxt	Internxt	f	\N	2023-05-24	2023-05-24
5448e3d8-f330-4251-9d58-6a2402d4dbbf	interport-token	itp	Interport Token	f	\N	2023-05-24	2023-05-24
32ace012-1361-407a-b288-10975a2091aa	intersola	isola	Intersola	f	\N	2023-05-24	2023-05-24
32c56f5b-043d-455b-aa17-fa2e3f5dcb8d	inter-stable-token	ist	Inter Stable Token	f	\N	2023-05-24	2023-05-24
2381974e-ade2-43ef-ba78-31d9309bf1b1	interstellar-domain-order	ido	Interstellar Domain Order	f	\N	2023-05-24	2023-05-24
dde32762-b755-4f31-86f7-244b1cdc70d2	intexcoin	intx	INTEXCOIN	f	\N	2023-05-24	2023-05-24
92cd816f-29db-4e97-8592-0ea80b28efed	intucoin	intu	INTUCoin	f	\N	2023-05-24	2023-05-24
4244122f-5159-4dcd-9857-5f292fd6f699	inu	inu	Inu.	f	\N	2023-05-24	2023-05-24
1797b2cc-615e-4f7c-b402-53f978f63193	inu-inu	inuinu	Inu Inu	f	\N	2023-05-24	2023-05-24
e9bab165-1ee4-453b-a8cf-8d2e94c1b8ab	inuko-finance	inuko	Inuko Finance	f	\N	2023-05-24	2023-05-24
cb0a8664-f068-4b53-8091-8ddf5fa73c9a	inu-token	inu	INU	f	\N	2023-05-24	2023-05-24
2e2a200c-967a-4523-8671-7283b37f78ae	inu-wars	iwr	Inu Wars	f	\N	2023-05-24	2023-05-24
e8063a44-38ee-4174-9866-42aecf5a1feb	invectai	invectai	InvectAI	f	\N	2023-05-24	2023-05-24
17dc6a76-bf37-404c-b4b4-780f33559c08	inverse-ethereum-volatility-index-token	iethv	Inverse Ethereum Volatility Index Token	f	\N	2023-05-24	2023-05-24
fb567f41-dc36-4336-ab91-bfa37e4bc440	inverse-finance	inv	Inverse Finance	f	\N	2023-05-24	2023-05-24
931c70b9-81a5-4056-9bcb-d0f7d046799e	investdex	invest	InvestDex	f	\N	2023-05-24	2023-05-24
42c30b4f-662b-4fc1-a2ee-4dbe6e13f293	investin	ivn	Investin	f	\N	2023-05-24	2023-05-24
9591e1e5-edda-447e-8703-bdf765536399	invictus	in	Invictus	f	\N	2023-05-24	2023-05-24
997ece88-9a92-4592-b61f-9e8ffc63b219	invictus-hyprion-fund	ihf	Invictus Hyperion Fund	f	\N	2023-05-24	2023-05-24
875fca20-f8fe-4650-a8d6-68549a3116fa	invi-token	invi	INVI	f	\N	2023-05-24	2023-05-24
94e4a9fe-3d75-489b-b03b-a6210337fa6d	invoke	iv	Invoker	f	\N	2023-05-24	2023-05-24
308cb627-5640-4fdb-b7f3-b7479df5cb63	invox-finance	invox	Invox Finance	f	\N	2023-05-24	2023-05-24
3a740d7f-a396-4db3-ad71-5982a059a43a	inx-token-2	inx	INX Token	f	\N	2023-05-24	2023-05-24
7a1c7bff-6351-472e-bb73-4a2b4703518e	iobusd	iobusd	ioBUSD	f	\N	2023-05-24	2023-05-24
1e2c1507-f3c4-467f-8fb9-5e5d7c48d708	iocoin	ioc	I/O Coin	f	\N	2023-05-24	2023-05-24
e481b791-35b7-4e2b-ba7d-721ec06e3eb2	ioeth	ioeth	ioETH	f	\N	2023-05-24	2023-05-24
2523c270-be99-49e8-b08b-f35c67ed122b	ioex	ioex	ioeX	f	\N	2023-05-24	2023-05-24
e7901f7c-e927-4787-ab84-981e8b5f47bd	ioi-token	ioi	IOI	f	\N	2023-05-24	2023-05-24
8ca46546-f493-43e6-935d-562a2ffac6ce	ion	ion	Ion	f	\N	2023-05-24	2023-05-24
337da03c-1c8c-4eb3-a474-730657b47c6a	iostoken	iost	IOST	f	\N	2023-05-24	2023-05-24
b196ba2f-5415-41eb-9e81-d89afd1d7629	iota	miota	IOTA	f	\N	2023-05-24	2023-05-24
7522f813-3ed3-4f20-8fff-189e57e59f48	iotex	iotx	IoTeX	f	\N	2023-05-24	2023-05-24
f54f49fa-533c-442d-a6f1-d50ac53c38f5	iotex-monster-go	mtgo	Iotex Monster Go	f	\N	2023-05-24	2023-05-24
5570e3f7-0c0c-4503-8b64-c58b8da56238	iotexpad	tex	IoTeXPad	f	\N	2023-05-24	2023-05-24
3e590205-7142-47aa-9199-cdd9f6556346	iotexshiba	ioshib	IoTexShiba	f	\N	2023-05-24	2023-05-24
bbcbe80d-7e10-4fc1-8812-da4632fc653d	iouni	iouni	ioUNI	f	\N	2023-05-24	2023-05-24
55efe5eb-4165-4ab5-97dd-70d83542d07c	iousdc	iousdc	ioUSDC	f	\N	2023-05-24	2023-05-24
9c6f7c81-26ee-4ebf-97d7-31b7eababae4	iousdt	iousdt	ioUSDT	f	\N	2023-05-24	2023-05-24
7d02aaa3-f06f-432d-8470-5e0220e6fbf2	iowbtc	iowbtc	ioWBTC	f	\N	2023-05-24	2023-05-24
9e005f3f-bba9-4c6b-83ac-d0baa986c67d	iown	iown	iOWN	f	\N	2023-05-24	2023-05-24
6a622c35-0300-4765-9fdd-49c31c334871	ipor	ipor	IPOR	f	\N	2023-05-24	2023-05-24
bd2a2b1a-6b5c-4606-929e-f558fe3a7316	ipulse	pls	iPulse	f	\N	2023-05-24	2023-05-24
bd48c126-9e8c-4dc3-b53f-5efaf10fb173	ipverse	ipv	IPVERSE	f	\N	2023-05-24	2023-05-24
7c0549d7-14f1-4c88-8ec8-7e25e848dc04	ipx-token	ipx	Tachyon Protocol	f	\N	2023-05-24	2023-05-24
df4a7851-95f2-48f6-b58a-cc38913d3854	iq-cash	iq	IQ.cash	f	\N	2023-05-24	2023-05-24
978329eb-d90e-49c9-9a9d-bee53048cb89	iqeon	iqn	IQeon	f	\N	2023-05-24	2023-05-24
80847e6b-56a3-408b-8ca7-107cb6cf960c	iqoniq	iqq	Iqoniq	f	\N	2023-05-24	2023-05-24
10cbf2d4-e0cb-4074-887a-3761c68cc6d2	irena-green-energy	irena	Irena Coin Apps	f	\N	2023-05-24	2023-05-24
74ba4a97-51a8-45ea-9b93-414de15fe6db	iridium	ird	Iridium	f	\N	2023-05-24	2023-05-24
1c1154ab-f363-40bc-ab96-1d7df0f8cb07	iris-ecosystem	iristoken	Iris Ecosystem	f	\N	2023-05-24	2023-05-24
2fb79a31-51cb-47dc-8732-c38596fd1a8e	iris-network	iris	IRISnet	f	\N	2023-05-24	2023-05-24
23d811c4-566f-4067-b7c6-150dbff54be3	iris-token-2	iris	Iris	f	\N	2023-05-24	2023-05-24
93be3e47-84d3-46c3-bf6a-74e89f7bd3fb	iron-bank	ib	Iron Bank	f	\N	2023-05-24	2023-05-24
c594e2e7-5bd5-4913-ac54-7a2e9388d013	iron-bank-euro	ibeur	Iron Bank EUR	f	\N	2023-05-24	2023-05-24
0503fd77-f772-4d28-b7fc-30d0951d38ad	iron-bank-gbp	ibgbp	Iron Bank GBP	f	\N	2023-05-24	2023-05-24
47b07eb3-2e40-48e9-b1c8-f9aa3f5a3fc2	iron-bsc	iron	Iron BSC	f	\N	2023-05-24	2023-05-24
491eedcf-2d86-4226-b98c-7da9f7faa729	iron-finance	ice	Iron Finance	f	\N	2023-05-24	2023-05-24
de486d7e-8bca-4731-95d2-88c34c70ef19	iron-fish	iron	Iron Fish	f	\N	2023-05-24	2023-05-24
f30227b2-d003-4eb5-84f6-7348f5a7b80a	iron-stablecoin	iron	Iron	f	\N	2023-05-24	2023-05-24
2f484877-1125-47ef-9498-f8f3cbd53172	iron-titanium-token	titan	IRON Titanium	f	\N	2023-05-24	2023-05-24
8714c84b-8221-4e97-83cb-93b87c2917fc	isengard-nft-marketplace	iset-84e55e	Isengard NFT Marketplace	f	\N	2023-05-24	2023-05-24
b8f1a2fe-87ce-4589-9d14-dd56ef514b84	ishares-msci-world-etf-tokenized-stock-defichain	durth	iShares MSCI World ETF Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
b5d7369f-81fa-422e-b1e2-9f5f41da1479	isiklar-coin	isikc	Isiklar Coin	f	\N	2023-05-24	2023-05-24
2d79db7f-996f-4366-b4a7-fe7034ec6e9f	iskra-token	isk	ISKRA Token	f	\N	2023-05-24	2023-05-24
3e3a3530-8bbd-4c5e-8c06-d224db03c1e6	islamicoin	islami	ISLAMICOIN	f	\N	2023-05-24	2023-05-24
675df29b-1c38-49bc-bfe5-44a49fc4720e	islander	isa	Islander	f	\N	2023-05-24	2023-05-24
98d8902f-e4d0-4c72-8142-b546109c90a3	ispolink	isp	Ispolink	f	\N	2023-05-24	2023-05-24
34c299a3-65ea-4327-88cc-5f3f308aa9fa	istable	i-stable	iStable	f	\N	2023-05-24	2023-05-24
f6b5af59-011b-4cf9-ab75-6889df951216	istanbul-basaksehir-fan-token	ibfk	İstanbul Başakşehir Fan Token	f	\N	2023-05-24	2023-05-24
708c40cb-eb83-4de5-a518-136748b3ce9e	istanbul-wild-cats-fan-token	iwft	İstanbul Wild Cats Fan Token	f	\N	2023-05-24	2023-05-24
daf2385d-8b8d-44be-abdf-8c7c48dfa478	istardust	isdt	Istardust	f	\N	2023-05-24	2023-05-24
65101f2b-a12b-4b77-9546-b7358d85fd8f	istep	istep	iSTEP	f	\N	2023-05-24	2023-05-24
89990761-e9ea-4447-9c1b-ea925df43d28	italian-national-football-team-fan-token	ita	Italian National Football Team Fan Token	f	\N	2023-05-24	2023-05-24
006f845b-e955-4d73-ae03-77b9c67bfab6	itam-games	itam	ITAM Games	f	\N	2023-05-24	2023-05-24
255b1743-ee2a-4c7e-90f5-b1c9873835af	itc	itc	ITC	f	\N	2023-05-24	2023-05-24
9abafea0-365e-4671-93df-bb06444934e2	iteller	itlr	iTeller	f	\N	2023-05-24	2023-05-24
e44c590c-dd07-472f-b368-9a1ae620bfcd	itemverse	item	ITEMVERSE	f	\N	2023-05-24	2023-05-24
adee2a41-891c-4ad9-a445-2b5f3e837fb1	iteration-syndicate	its	Iteration Syndicate	f	\N	2023-05-24	2023-05-24
afc77586-593d-432a-83fe-608adb7b4bca	itheum	itheum	Itheum	f	\N	2023-05-24	2023-05-24
bc7262a0-565d-4edf-97ad-e4581e30463c	itsbloc	itsb	ITSBLOC	f	\N	2023-05-24	2023-05-24
c1a6233a-b0d6-49ff-a2db-1467a8f03100	iusd	iusd	iUSD	f	\N	2023-05-24	2023-05-24
8e192e88-d508-4cdd-9a3c-3d384a601a56	iustitia-coin	ius	Iustitia Coin	f	\N	2023-05-24	2023-05-24
e054289e-cc92-4d2d-bec2-8053cfda9214	ivar-coin	ivar	Ivar Coin	f	\N	2023-05-24	2023-05-24
3d9a2d4a-a33f-42e0-8ba6-44a79b20eb56	ivogel	ivg	IVOGEL	f	\N	2023-05-24	2023-05-24
fb4eb334-0a02-447e-9e15-9ec8f373210c	i-will-poop-it-nft	shit	I will poop it NFT	f	\N	2023-05-24	2023-05-24
1409879b-24c3-44c8-9d83-cfc7cf3a1c00	ixcoin	ixc	Ixcoin	f	\N	2023-05-24	2023-05-24
332ee4e4-fd36-4147-aa48-af875364f6f7	ixicash	ixi	IxiCash	f	\N	2023-05-24	2023-05-24
63f36a70-a258-493c-bae9-2cdea7b6bc36	ixirswap	ixir	Ixirswap	f	\N	2023-05-24	2023-05-24
ee5f0e1f-5c26-4a82-b13e-b2253d8b2318	ixo	ixo	IXO	f	\N	2023-05-24	2023-05-24
5be20aa8-b5d9-4f6f-8225-9ad586558792	ix-swap	ixs	IX Swap	f	\N	2023-05-24	2023-05-24
a63a5039-f176-42dd-9597-8a998809eaa1	ix-token	ixt	IX	f	\N	2023-05-24	2023-05-24
d950f34e-64fc-4fb0-99b8-4d3cebbaadef	iykyk	iykyk	IYKYK	f	\N	2023-05-24	2023-05-24
c6a92fd2-8ee1-40cc-85f1-f0710b9c3a0b	ize	ize	IZE	f	\N	2023-05-24	2023-05-24
ea8f84f2-6291-451a-b097-3825fddb97f7	izumi-bond-usd	iusd	iZUMi Bond USD	f	\N	2023-05-24	2023-05-24
5363767a-ef9b-4cd5-a672-b0541cb8f830	izumi-finance	izi	iZUMi Finance	f	\N	2023-05-24	2023-05-24
ec38a0c5-fee0-440f-b210-2e9372875a4d	jackal-protocol	jkl	Jackal Protocol	f	\N	2023-05-24	2023-05-24
92bb8bba-912a-4ff4-b0ed-6f9a5f3f731c	jackpool-finance	jfi	JackPool.finance	f	\N	2023-05-24	2023-05-24
cae47835-e816-4ec1-809d-c08e6ba45d5c	jackpot	777	Jackpot	f	\N	2023-05-24	2023-05-24
6a6eb290-150d-4891-a171-9a3ceb394f15	jackpotdoge	jpd	JackpotDoge	f	\N	2023-05-24	2023-05-24
73fa9fd4-4cd0-43db-8f59-7d5ab700c7d0	jack-token	jack	Jack Token	f	\N	2023-05-24	2023-05-24
e88e2451-8ec2-4ce1-81a1-5efa8b470093	jacy	jacy	JACY	f	\N	2023-05-24	2023-05-24
00c3c01b-a713-4428-b25c-7dbf88388fa3	jade	jade	DeFi Kingdoms Jade	f	\N	2023-05-24	2023-05-24
1a6a223d-3ec6-4272-854e-74f49c8db777	jade-currency	jade	Jade Currency	f	\N	2023-05-24	2023-05-24
616488b0-6106-4f53-acd9-7fccf3b410ac	jade-protocol	jade	Jade Protocol	f	\N	2023-05-24	2023-05-24
50346abb-aa1b-4f83-a12f-b05fd9ce981d	jaiho-crypto	jaiho	Jaiho Crypto	f	\N	2023-05-24	2023-05-24
8c05c6e5-61cf-4cd7-b3b4-c83fcec44203	janus-network	jns	Janus Network	f	\N	2023-05-24	2023-05-24
b07af84d-4bb6-4705-8506-6d3f7abf7d5b	jarvis	jar	Jarvis+	f	\N	2023-05-24	2023-05-24
b25af834-4d67-43f8-a573-779b53470ebf	jarvis-ai	jai	Jarvis AI	f	\N	2023-05-24	2023-05-24
bd6d3349-ea95-4dd5-837c-926151c22584	jarvis-reward-token	jrt	Jarvis Reward	f	\N	2023-05-24	2023-05-24
8f26ffac-0338-4384-ad66-a5a7f7924371	jarvis-synthetic-british-pound	jgbp	Jarvis Synthetic British Pound	f	\N	2023-05-24	2023-05-24
dc8b050a-ff36-425c-8b78-f74c723c07bd	jarvis-synthetic-euro	jeur	Jarvis Synthetic Euro	f	\N	2023-05-24	2023-05-24
d5a2b0b0-2abb-4e2a-ab3a-8e484ce92c0a	jarvis-synthetic-japanese-yen	jjpy	Jarvis Synthetic Japanese Yen	f	\N	2023-05-24	2023-05-24
38bf0f48-ec7b-4c3d-a85c-636c3b6e8b28	jarvis-synthetic-swiss-franc	jchf	Jarvis Synthetic Swiss Franc	f	\N	2023-05-24	2023-05-24
2a26a5df-c8d5-4447-817e-5acd728e45a7	jasan-wellness	jw	Jasan Wellness	f	\N	2023-05-24	2023-05-24
10769956-2e4e-4b12-a733-42ef1b17bd76	jaseonmun	jsm	Joseon-Mun	f	\N	2023-05-24	2023-05-24
29546c84-40b9-4db4-9c1f-891b718fd837	jasmycoin	jasmy	JasmyCoin	f	\N	2023-05-24	2023-05-24
4dc753de-9773-4c51-ad41-5baa9446c928	javascript-token	js	JavaScript	f	\N	2023-05-24	2023-05-24
900e6815-6347-478e-a9b4-231f57ef4951	jax-network	wjxn	Jax.Network	f	\N	2023-05-24	2023-05-24
c54c9986-2ca8-4157-a11f-2640aba729fa	jaypegggers	jay	Jaypeggers	f	\N	2023-05-24	2023-05-24
095cd962-647e-4f68-8996-112fcd175b3c	jd-coin	jdc	JD Coin	f	\N	2023-05-24	2023-05-24
b58f8918-7c19-4e33-8f23-25f667470d62	jedstar	$jed	JEDSTAR	f	\N	2023-05-24	2023-05-24
c00a7ad5-dc33-4eeb-836a-4d8c315fcf53	jeet-detector-bot	jdb	JDB	f	\N	2023-05-24	2023-05-24
25d7fd4f-3073-448c-aef4-0b2f4880e16c	jefe	jefe	Jefe	f	\N	2023-05-24	2023-05-24
956ea8f1-52a8-4af3-8ee7-801c33a3a873	jeff	jeff	Jeff	f	\N	2023-05-24	2023-05-24
e07a1b57-36ea-4603-b800-d1289da9ea45	jejudoge	jejudoge	Jejudoge	f	\N	2023-05-24	2023-05-24
f8074033-fbe5-4364-b1df-564cb9b359df	jelly-esports	jelly	Jelly eSports	f	\N	2023-05-24	2023-05-24
2a06925d-4f11-4710-8204-a5fc347db409	jem	jem	Jem	f	\N	2023-05-24	2023-05-24
12367d6c-1c91-4474-a254-6f591621cd47	jen-coin	jen	JEN COIN	f	\N	2023-05-24	2023-05-24
c44e353e-0b4e-4de9-8d51-30e070db71b6	jenny-metaverse-dao-token	ujenny	Jenny DAO V1	f	\N	2023-05-24	2023-05-24
9e513ee1-45c8-49aa-af18-2b0beca7dfd8	jerry-inu	jerry	Jerry Inu	f	\N	2023-05-24	2023-05-24
d74494c7-6183-463d-9e77-9af683062643	jesus-coin	jesus	Jesus Coin	f	\N	2023-05-24	2023-05-24
3fe8a31c-e841-4080-bb9f-987b6c9f93eb	jet	jet	JET	f	\N	2023-05-24	2023-05-24
5e1603cc-286c-4f91-a1ca-c04b21a9d3f8	jetcoin	jet	Jetcoin	f	\N	2023-05-24	2023-05-24
2833a3d8-9126-4ff1-a249-141508a005b0	jetoken	jets	JeToken	f	\N	2023-05-24	2023-05-24
11523189-6b40-490c-b281-31de43f8f637	jfin-coin	jfin	JFIN Coin	f	\N	2023-05-24	2023-05-24
9b1d6540-b27c-441f-a32f-a2be40708010	jigen	jig	Jigen	f	\N	2023-05-24	2023-05-24
5f1daa89-1474-428f-9a74-d557367ddaad	jigstack	stak	Jigstack	f	\N	2023-05-24	2023-05-24
699e134f-826e-4b2b-be0c-bcc4534b6f42	jindo-inu	jind	Jindo Inu	f	\N	2023-05-24	2023-05-24
8afb09ca-78bd-4f1f-a484-100510b80859	jito-staked-sol	jitosol	Jito Staked SOL	f	\N	2023-05-24	2023-05-24
1e63cbea-abbe-4015-8166-699d65f8e2b6	jiyuu	jiyuu	Jiyuu	f	\N	2023-05-24	2023-05-24
93d8c6fe-be77-4597-95f7-831384ae2266	jizzrocket	jizz	JizzRocket	f	\N	2023-05-24	2023-05-24
40afc81b-540b-4598-b98f-04af928bbdba	jk-coin	jk	JK Coin	f	\N	2023-05-24	2023-05-24
5bc5fda2-e45d-472c-975e-4fb71ab7cd08	jobchain	job	Jobchain	f	\N	2023-05-24	2023-05-24
6fd79ac1-e2f2-4061-b87f-77ea0cf52b03	joe	joe	JOE	f	\N	2023-05-24	2023-05-24
0c5f1964-bafd-400b-91a9-41a10cafd78a	joe-hat-token	hat	Joe Hat	f	\N	2023-05-24	2023-05-24
bad4996e-b79c-4913-b6a1-da458ad5b46a	joe-yo-coin	jyc	Joe-Yo Coin	f	\N	2023-05-24	2023-05-24
bc48ea24-a93d-4ffe-bc27-5602643f9656	jojo	jojo	JOJO	f	\N	2023-05-24	2023-05-24
2c24db29-57ae-46ce-adb4-b3c4ae962e49	jokes-meme	joke	Jokes Meme	f	\N	2023-05-24	2023-05-24
10982bb0-1b91-43e1-91ca-f772c639df60	joltify	jolt	Joltify	f	\N	2023-05-24	2023-05-24
455cbec0-37c8-4945-a5fd-2911c2a86437	jomon-shiba	jshiba	Jomon Shiba	f	\N	2023-05-24	2023-05-24
8269de8f-1ce0-4335-a778-36c1a4796929	jones-dao	jones	Jones DAO	f	\N	2023-05-24	2023-05-24
c04ee059-fe15-4e20-8a75-5ecf1d6672a1	jones-glp	jglp	Jones GLP	f	\N	2023-05-24	2023-05-24
7dd17a74-7aed-4833-83cc-a154fcc91612	jones-usdc	jusdc	Jones USDC	f	\N	2023-05-24	2023-05-24
638ecc6a-cbbd-476c-a838-f5526504e6da	jot-art	jot	Jot Art	f	\N	2023-05-24	2023-05-24
ca63a8e0-5161-4f67-b894-f958c43feb64	joulecoin	xjo	Joulecoin	f	\N	2023-05-24	2023-05-24
93e2d458-73ce-4b00-9671-394593232c36	journart	jart	JournArt	f	\N	2023-05-24	2023-05-24
c3731b58-2a33-49bc-931f-a4e62222c47f	joystick1	joy	Joystick	f	\N	2023-05-24	2023-05-24
5093686e-bc2f-4336-8698-329573acf309	joystick-club	joy	Joystick.club	f	\N	2023-05-24	2023-05-24
c1a4a2ab-4e90-45b5-8276-f12362a329af	jp	jp	JP	f	\N	2023-05-24	2023-05-24
9fb900c4-79a2-48d8-994e-58445e283d24	jpeg-d	jpeg	JPEG'd	f	\N	2023-05-24	2023-05-24
4f414599-550d-4fd1-92e2-2c563d3075c4	jpeg-ordinals	jpeg	JPEG (Ordinals)	f	\N	2023-05-24	2023-05-24
905e4ac6-7e5d-428a-8f23-890ec7ce3c13	jpegvaultdao-2	jp3g	JP3Gvault	f	\N	2023-05-24	2023-05-24
81f80305-1e63-4eb8-b437-405921ee8c91	jpg-nft-index	jpg	JPG NFT Index	f	\N	2023-05-24	2023-05-24
b2624d64-0a52-4d71-8312-eed04bf6aa0b	jpgoldcoin	jpgc	JPGoldCoin	f	\N	2023-05-24	2023-05-24
446bd470-dc88-4cd3-a0e9-5c8540bea124	jpool	jsol	JPool	f	\N	2023-05-24	2023-05-24
9d0cf8e3-0f19-450d-858a-bfe7a26ed85d	jpyc	jpyc	JPY Coin v1	f	\N	2023-05-24	2023-05-24
37b7f7bb-07c6-45b6-97c0-2b0d259457eb	jpy-coin	jpyc	JPY Coin	f	\N	2023-05-24	2023-05-24
e78df3bc-0e3b-40e4-bd4d-9f7be25680de	jswap-finance	jf	Jswap.Finance	f	\N	2023-05-24	2023-05-24
20db21b4-2b52-43ec-92a0-33e63d71f631	jubi-token	jt	Jubi Token	f	\N	2023-05-24	2023-05-24
0a18f79b-310d-468a-afac-3ef19e723367	juggernaut	jgn	Juggernaut	f	\N	2023-05-24	2023-05-24
db48fdaf-b4c6-4b2e-8ee3-d671f288114d	juicebox	jbx	Juicebox	f	\N	2023-05-24	2023-05-24
18030da8-f5d0-46db-adec-836993d13703	jujube	jujube	Jujube	f	\N	2023-05-24	2023-05-24
3d92d034-57cb-47e1-b8f9-7577613cec3c	julswap	juld	JulSwap	f	\N	2023-05-24	2023-05-24
d14a55fb-3fe1-4bb8-975d-2959047e94ae	jumbo-exchange	jumbo	Jumbo Exchange	f	\N	2023-05-24	2023-05-24
134bd9e6-3315-4090-bba4-377027567a9f	jumptoken	jmpt	JumpToken	f	\N	2023-05-24	2023-05-24
dd4c2f8c-666c-4d87-8105-ad3c99443d34	junca-cash	jcc	Junca cash	f	\N	2023-05-24	2023-05-24
5c6828a1-b1f5-4f5b-8c3f-42d81cd0115e	jungle	jungle	Jungle	f	\N	2023-05-24	2023-05-24
a3d1aa19-1700-4cc5-956f-43ab8385add2	jungle-defi	jfi	Jungle DeFi	f	\N	2023-05-24	2023-05-24
137f4691-75f6-426b-a6ad-efa0ac485b61	jungleking-tigercoin	tiger	JungleKing TigerCoin	f	\N	2023-05-24	2023-05-24
f508f711-900a-4d0e-a04e-4c3404924f71	juno-network	juno	JUNO	f	\N	2023-05-24	2023-05-24
a7c779b6-802c-4c90-a5d8-0b64ba369d34	jupiter	jup	Jupiter	f	\N	2023-05-24	2023-05-24
e0f3cd10-3da2-40c2-ad12-bb455c8ef914	jur	jur	Jur	f	\N	2023-05-24	2023-05-24
13ca42ee-cbae-44a7-8131-0c235b2e5e49	just	jst	JUST	f	\N	2023-05-24	2023-05-24
e9e4e640-4987-4af7-990f-da4c4e3528dd	justanegg	egg	JUSTANEGG	f	\N	2023-05-24	2023-05-24
81cf87c9-f779-4db8-990b-10e7400029dd	justmoney-2	jm	JustMoney	f	\N	2023-05-24	2023-05-24
f2028eb7-1501-4d01-822c-f7155537c1a0	just-stablecoin	usdj	JUST Stablecoin	f	\N	2023-05-24	2023-05-24
a5e44c35-7260-46b1-8acf-45e6f9dd517e	juventus-fan-token	juv	Juventus Fan Token	f	\N	2023-05-24	2023-05-24
42165a05-4bcb-47fe-9c9c-706cfdc0a2ce	k21	k21	K21	f	\N	2023-05-24	2023-05-24
22f25dc2-215a-4cfc-9ad9-4d557b0c06fb	k9	k9	K9	f	\N	2023-05-24	2023-05-24
08d081b0-ffcc-4c57-bd71-35f3f34cd2c0	kabosu	kabosu	Kabosu	f	\N	2023-05-24	2023-05-24
ce09341e-542a-4fd1-a6a6-a3a91be0c767	kabosu-arbitrum	kabosu	Kabosu (Arbitrum)	f	\N	2023-05-24	2023-05-24
0aa5a798-eafb-4bfd-af6d-8fb12f441bdb	kabosuceo	kceo	KabosuCEO	f	\N	2023-05-24	2023-05-24
c9e438fa-6eb1-40ac-bc06-a7243e12d9b2	kabosu-inu	kabosu inu	Kabosu Inu	f	\N	2023-05-24	2023-05-24
b7cb213f-7f91-4ac1-8f66-c3e68a5bf121	kaby-arena	kaby	Kaby Arena	f	\N	2023-05-24	2023-05-24
df702c84-b500-4c0e-b701-6192c12d8c23	kaby-gaming-token	kgt	Kaby Gaming	f	\N	2023-05-24	2023-05-24
d4dd1e31-82f9-4420-95ac-f7f0b3e10e3f	kaddex	kdx	eckoDAO	f	\N	2023-05-24	2023-05-24
b9e3055d-7d3b-4251-a377-7854c38ed67c	kadena	kda	Kadena	f	\N	2023-05-24	2023-05-24
153698c7-cb61-4a73-9c8f-ad5266644fca	kaeri	kaeri	Kaeri	f	\N	2023-05-24	2023-05-24
5e0969e6-10e3-4b42-97d4-e6d5dbedabae	kagla-finance	kgl	Kagla Finance	f	\N	2023-05-24	2023-05-24
bdd608e2-e785-488f-9df0-9ad9f7e1e3bb	kaidex	kdx	Kaidex	f	\N	2023-05-24	2023-05-24
09afc86d-2021-4679-991c-c545f48543c7	kaif	kaf	KAIF	f	\N	2023-05-24	2023-05-24
7815d56f-2226-4e8b-89ce-45c5632a18af	kai-inu	kaiinu	Kai Inu	f	\N	2023-05-24	2023-05-24
2dbab3f1-045e-4b64-bf8d-87b3fda313e3	kainet	kainet	KAINET	f	\N	2023-05-24	2023-05-24
9a69692a-9ab9-4fb2-97ea-18516e623937	kairos-a612bf05-b9c8-4e6b-aeb6-1f5b788ddd40	$kairos	Kairos	f	\N	2023-05-24	2023-05-24
61ebc21f-dbdf-4722-a22b-3dfeb7f70bb2	kaizen	kzen	Kaizen	f	\N	2023-05-24	2023-05-24
588e68df-49f7-4aef-8cb3-519119b8515d	kaka-nft-world	kaka	KAKA NFT World	f	\N	2023-05-24	2023-05-24
43d2aa24-5f6a-42a3-be37-41767b67a503	kala	kala	Kala	f	\N	2023-05-24	2023-05-24
d5bb0976-60b2-487b-a4d6-781af3c5ebdf	kalamint	kalam	Kalamint	f	\N	2023-05-24	2023-05-24
197b428c-0ac9-483a-9d68-b6ee38394aeb	kalao	klo	Kalao	f	\N	2023-05-24	2023-05-24
81a87a28-afc9-424f-9742-82de9f1fe1e2	kalima-blockchain	klx	Kalima Blockchain	f	\N	2023-05-24	2023-05-24
f438a98a-5af1-4d5e-9194-4353d2defeae	kalissa	kali	Kalissa	f	\N	2023-05-24	2023-05-24
3ccbfb94-1101-4bc7-bdfc-af9b5977abe1	kalisten	ks	Kalisten	f	\N	2023-05-24	2023-05-24
309cac56-ac47-4447-bffd-8a84b5548d4f	kalkulus	klks	Kalkulus	f	\N	2023-05-24	2023-05-24
c4707570-8bad-4143-86b9-9be8638500ad	kalmar	kalm	KALM	f	\N	2023-05-24	2023-05-24
b3f52584-ebfa-4427-9ba2-632a49cb097f	kamaleont	klt	Kamaleont	f	\N	2023-05-24	2023-05-24
f7840e48-d766-42fd-b728-6dd46a9cbc76	kambria	kat	Kambria	f	\N	2023-05-24	2023-05-24
f44a4667-53d7-402d-98d4-999c0a81e75c	kampay	kampay	Kampay	f	\N	2023-05-24	2023-05-24
28688159-ea68-4cd6-9ea1-3a111a04d03f	kan	kan	BitKan	f	\N	2023-05-24	2023-05-24
6163677b-3a4e-4b91-a3db-a1445389a4a7	kanagawa-nami	okinami	Kanagawa Nami	f	\N	2023-05-24	2023-05-24
9b717afa-7d34-495e-91af-645d4aa30bb1	kanaloa-network	kana	Kanaloa Network	f	\N	2023-05-24	2023-05-24
d4e81191-cf3e-4c88-9e3a-2c78d09ec065	kang3n	kang3n	kang3n	f	\N	2023-05-24	2023-05-24
28430f9b-f929-4439-a057-4903d08ab40d	kanga-exchange	kng	Kanga Exchange	f	\N	2023-05-24	2023-05-24
2d9b7650-c793-47fb-badf-473314380454	kangal	kangal	Kangal	f	\N	2023-05-24	2023-05-24
8f643d83-74ea-45ae-98da-8235c93e88ac	kanpeki	kae	Kanpeki	f	\N	2023-05-24	2023-05-24
fc7c1be4-b5b0-4add-9b8b-5adb3e28093b	kapital-dao	kap	Kapital DAO	f	\N	2023-05-24	2023-05-24
0551b413-5e09-42e3-bf9b-8351814aedfe	karastar-umy	umy	KaraStar UMY	f	\N	2023-05-24	2023-05-24
77b751b0-c295-4d82-91c7-42dbc4adb030	karate-combat	karate	Karate Combat	f	\N	2023-05-24	2023-05-24
864b1f3a-313b-4682-9b7d-dcb6cafb8516	karbo	krb	Karbo	f	\N	2023-05-24	2023-05-24
96db8080-d76e-4f6d-b918-475d6394f83b	kardiachain	kai	KardiaChain	f	\N	2023-05-24	2023-05-24
42b56f9c-e8c2-4fb2-bcf8-66a970976b9e	karencoin	karen	KarenCoin	f	\N	2023-05-24	2023-05-24
ee599276-7ce8-434d-9458-763b19317127	karma-dao	karma	Karma DAO	f	\N	2023-05-24	2023-05-24
27188c54-c9fc-4f4d-9cae-2c869384c84a	karmaverse	knot	Karmaverse	f	\N	2023-05-24	2023-05-24
6ade623d-8bc4-4ec0-941c-e181be6fc7fa	karmaverse-zombie-serum	serum	Karmaverse Zombie Serum	f	\N	2023-05-24	2023-05-24
be5b2d38-0b46-4e73-ae89-3fe9ee40cd67	karsiyaka-taraftar-token	ksk	Karşıyaka Taraftar Fan Token	f	\N	2023-05-24	2023-05-24
e30aaa9a-19b9-4287-bfab-d737a2e3fb05	karura	kar	Karura	f	\N	2023-05-24	2023-05-24
278348bf-172c-4d3a-8369-0bc3e1cc1d3c	kasa-central	kasa	Kasa Central	f	\N	2023-05-24	2023-05-24
47485d83-7d40-4ac2-990e-99c4b6226d11	kaspa	kas	Kaspa	f	\N	2023-05-24	2023-05-24
8778119a-82db-41ca-91a3-0de9d9f34113	kassandra	kacy	Kassandra	f	\N	2023-05-24	2023-05-24
fe5691a6-957e-4d2c-bcad-195373eda535	kasta	kasta	Kasta	f	\N	2023-05-24	2023-05-24
151faa4e-39df-438b-9eb4-0cc87fa660c9	katalyo	ktlyo	Katalyo	f	\N	2023-05-24	2023-05-24
3cb9181a-afa5-4799-ae52-97336687906a	katana-inu	kata	Katana Inu	f	\N	2023-05-24	2023-05-24
249c5d51-c9fe-4f43-af4e-39b60eb49a06	kattana	ktn	Kattana	f	\N	2023-05-24	2023-05-24
39336ce1-b753-4a86-a91a-53121243a3b7	kava	kava	Kava	f	\N	2023-05-24	2023-05-24
a7f5e9a4-8a19-4908-a6fb-36c9c04b3aac	kava-lend	hard	Kava Lend	f	\N	2023-05-24	2023-05-24
3520713e-7643-4b44-85dc-143560762ee7	kava-swap	swp	Kava Swap	f	\N	2023-05-24	2023-05-24
13c2d021-d65b-4e4a-93c5-4d982bf8e719	kawaii-islands	kwt	Kawaii Islands	f	\N	2023-05-24	2023-05-24
16b5c190-d769-4969-bfc8-a2a9a0671570	kawakami	kawa	Kawakami	f	\N	2023-05-24	2023-05-24
67a399ec-06b5-49eb-b54d-d1f955346160	kay-pacha	pacha	Kay Pacha	f	\N	2023-05-24	2023-05-24
4bd31ede-43fc-436e-ae3b-12f28c6110cc	kcal	kcal	KCAL	f	\N	2023-05-24	2023-05-24
91d651ac-1883-4976-bd30-fcdf096ad75f	kcash	kcash	Kcash	f	\N	2023-05-24	2023-05-24
a0361f48-4293-4339-bd2f-e3b66e6814a4	kccpad	kccpad	KCCPad	f	\N	2023-05-24	2023-05-24
b42975ef-6053-4aaf-91dc-0e9a3c446e94	kdag	kdag	King DAG	f	\N	2023-05-24	2023-05-24
24e255df-5dc5-4faf-9d3d-65a75bb5298d	kdlaunch	kdl	KDLaunch	f	\N	2023-05-24	2023-05-24
fd3c8efb-28ed-4a1d-a242-28880464c06b	kdswap	kds	KDSwap	f	\N	2023-05-24	2023-05-24
cd5dcb75-6f9b-4a87-8001-ce72943970d1	keep3rv1	kp3r	Keep3rV1	f	\N	2023-05-24	2023-05-24
c599fb6d-c120-4d1f-8438-f3404a780178	keep4r	kp4r	Keep4r	f	\N	2023-05-24	2023-05-24
eb9c3f3e-6e08-4db8-9d61-f24d8187afa5	keep-network	keep	Keep Network	f	\N	2023-05-24	2023-05-24
de3650f3-957c-4bc0-a2f3-d53f27aa37a1	keeps-coin	kverse	KEEPs Coin	f	\N	2023-05-24	2023-05-24
7f166242-c508-474b-bced-3002b1a5e0de	keeshond	$ksh	Keeshond	f	\N	2023-05-24	2023-05-24
335e9a5d-da5c-4530-95e8-44196c44661d	kei-finance	kei	Kei Finance	f	\N	2023-05-24	2023-05-24
66da7867-a48c-4631-885f-f42466e2eb29	keisuke-inu	$kei	Keisuke Inu	f	\N	2023-05-24	2023-05-24
62d53d44-5410-4d46-bf13-5305e9b08926	kek	keke	KEK	f	\N	2023-05-24	2023-05-24
6ad5345b-2639-4e14-8abd-ec6472577c7d	kekchain	kek	KeKChain	f	\N	2023-05-24	2023-05-24
42c506ff-202f-4644-b43e-5370ad70ffb9	kek-guru	kek	Kek Guru	f	\N	2023-05-24	2023-05-24
f555d494-f54d-4d75-b8c7-5532ae34884c	keko	keko	Keko	f	\N	2023-05-24	2023-05-24
96084f6d-ab35-4298-8629-a56ca996e0d0	kekwcoin	kekw	Kekwcoin	f	\N	2023-05-24	2023-05-24
0f67fbe8-7721-4376-bd1a-8cbb65ee9e4f	kekya	kekya	Kekya	f	\N	2023-05-24	2023-05-24
8c52ac87-3146-427a-93df-fb5757566091	kelvpn	kel	KelVPN	f	\N	2023-05-24	2023-05-24
415390b9-a8c2-4775-b505-cb5d2f10efa7	kemacoin	kema	KemaCoin	f	\N	2023-05-24	2023-05-24
2db78ceb-f6ba-4591-a829-79199fc0baef	kennel-locker	kennel	Kennel	f	\N	2023-05-24	2023-05-24
98d55c6c-0f19-4293-af52-65e6fddfc320	kephi-gallery	kphi	Kephi Gallery	f	\N	2023-05-24	2023-05-24
1ea80cc8-3616-4e64-9bc4-1360f3b6693d	kepple	kpl	Kepple	f	\N	2023-05-24	2023-05-24
496f0ed0-562e-479f-9211-6ae5d3669eaa	kermit	kermit	Kermit Finance	f	\N	2023-05-24	2023-05-24
54c89c20-4c30-4c57-9ddd-4d7145dc92ff	kermit-cc0e2d66-4b46-4eaf-9f4e-5caa883d1c09	kermit	Kermit	f	\N	2023-05-24	2023-05-24
c5b814c8-f36d-4fec-b946-8e36617a39a2	kewl	kewl	Kewl	f	\N	2023-05-24	2023-05-24
bb9d51dc-f667-459a-9f2b-9386b5c87687	keyfi	keyfi	KeyFi	f	\N	2023-05-24	2023-05-24
065193b5-6db7-4d3d-a771-693b7de6f9b8	keysatin	keysatin	KeySATIN	f	\N	2023-05-24	2023-05-24
32a3d81e-f55d-4bcd-825c-5e98255dfa78	keys-token	keys	Keys	f	\N	2023-05-24	2023-05-24
7a3b1066-5597-4472-a3f1-ea0a7b585d16	ki	xki	KI	f	\N	2023-05-24	2023-05-24
58f59cbe-1dfd-4e40-82b4-93686dc6ac6a	kiba-inu	kiba	Kiba Inu	f	\N	2023-05-24	2023-05-24
5d625bbc-8215-445a-84b4-d117f0df2eb3	kibbleswap	kib	KibbleSwap	f	\N	2023-05-24	2023-05-24
0b71aab6-0fbf-400d-8c54-7287dda6129c	kiboshib	kibshi	KiboShib	f	\N	2023-05-24	2023-05-24
975a7757-d3b4-4de5-97c1-d0b6f5271470	kick	kick	Kick	f	\N	2023-05-24	2023-05-24
05e1e316-6daa-4005-b4c1-dd5ec4621e3b	kick-io	kick	KICK.IO	f	\N	2023-05-24	2023-05-24
aaf6b36f-2e2d-4542-b842-aa72fe66cbcd	kickpad	kpad	KickPad	f	\N	2023-05-24	2023-05-24
8ef090cb-b133-4e84-8b5c-8eda2c5694dc	killthezero	ktz	KILLTHEZERO	f	\N	2023-05-24	2023-05-24
9bc54f11-5695-406c-9ea8-2f59d180b0b0	kilopi-8ee65670-efa5-4414-b9b4-1a1240415d74	lop	Kilopi	f	\N	2023-05-24	2023-05-24
82367288-77a0-4ddc-b4a2-09d7b585e210	kilt-protocol	kilt	KILT Protocol	f	\N	2023-05-24	2023-05-24
8a90cf3c-315e-4cea-8cec-21a004fec308	kimchi-finance	kimchi	KIMCHI.finance	f	\N	2023-05-24	2023-05-24
13f8dec5-aa62-4567-8e97-d17e7ece1b51	kin	kin	Kin	f	\N	2023-05-24	2023-05-24
f846ba90-3525-4137-ac9c-a0374ba92a14	kindness-for-soul	kfs g	Kindness For Soul	f	\N	2023-05-24	2023-05-24
f85782d5-5264-48b0-96ec-7b98e25edb66	kinect-finance	knt	Kinect Finance	f	\N	2023-05-24	2023-05-24
2e6b7744-6965-4301-9978-1b03b44e33b4	kineko	kko	KKO Protocol	f	\N	2023-05-24	2023-05-24
95e5b1cd-bf7b-4bd1-aee5-81ac51683be2	kineko-knk	knk	Kineko	f	\N	2023-05-24	2023-05-24
2b877c4d-b8fc-4f29-bf14-e0959908f59d	kine-protocol	kine	Kine Protocol	f	\N	2023-05-24	2023-05-24
cbb0f994-8da9-4b3a-8e07-ded357e29b0e	kinesis-gold	kau	Kinesis Gold	f	\N	2023-05-24	2023-05-24
13ae8bf9-ae05-45b1-a7a1-fcde0ed8154b	kinesis-silver	kag	Kinesis Silver	f	\N	2023-05-24	2023-05-24
4c44e825-2440-4626-b742-414dd21b9615	king	king	King Finance	f	\N	2023-05-24	2023-05-24
530d0609-8f0f-4784-a538-1040349b546a	king-2	king	KING	f	\N	2023-05-24	2023-05-24
c38a495e-0a36-4d83-88f8-eee4bb20d271	king-arthur	bking	King Arthur	f	\N	2023-05-24	2023-05-24
4d088edc-b640-42af-ae64-9a3af0b317fa	kingaru	kru	Kingaru	f	\N	2023-05-24	2023-05-24
52d359a6-5066-4706-a292-b623e2bd3e24	king-dog-inu	kingdog	King Dog Inu	f	\N	2023-05-24	2023-05-24
f868323f-4b47-4160-9bfc-721650c58bbb	kingdom-game-4-0	kdg	Kingdom Game 4.0	f	\N	2023-05-24	2023-05-24
6945a7de-a3a7-4af6-96db-141f892e5d2d	kingdom-karnage	kkt	Kingdom Karnage	f	\N	2023-05-24	2023-05-24
8f137311-68b6-4123-ae39-d30a0694a9bf	kingdom-quest	kgc	Kingdom Quest	f	\N	2023-05-24	2023-05-24
10032944-4c60-434c-bf69-f0a41520d300	kingdom-raids	krs	Kingdom Raids	f	\N	2023-05-24	2023-05-24
2a05aff3-e735-4cfb-a902-64ccd8d4d5e4	kingdomverse	king	Kingdomverse	f	\N	2023-05-24	2023-05-24
5c9db409-7e60-43b1-b141-b9f1255b151a	kingdomx	kt	KingdomX	f	\N	2023-05-24	2023-05-24
16c697f6-5d3a-4920-a166-be28e7eeb69e	king-forever	kfr	KING FOREVER	f	\N	2023-05-24	2023-05-24
6d8dcf84-b6fa-407c-956d-25ce6b0bfa55	kingmaker	power	Kingmaker	f	\N	2023-05-24	2023-05-24
25a2f731-dfed-46a7-b43d-390ec2b0a16f	kingpad	crown	KingPad	f	\N	2023-05-24	2023-05-24
b1a39af3-5103-4650-aabf-7a77953e5ddf	king-shiba	kingshib	King Shiba	f	\N	2023-05-24	2023-05-24
fc841f52-1846-47b6-a7a3-3ae6db80b3ef	kingspeed	ksc	KingSpeed	f	\N	2023-05-24	2023-05-24
3143b005-9fe7-42d9-8d27-c1842d16ef9e	kintsugi	kint	Kintsugi	f	\N	2023-05-24	2023-05-24
5d6beea6-c6ed-453d-81e0-da3e8452d9e5	kintsugi-btc	kbtc	Kintsugi BTC	f	\N	2023-05-24	2023-05-24
56917487-2fea-4728-94da-5f9561e301d2	kira	kira	KIRA	f	\N	2023-05-24	2023-05-24
ac093ba9-8306-4e51-82d5-1bf75b8781b0	kira-network	kex	KIRA Network	f	\N	2023-05-24	2023-05-24
6d961e30-d720-4476-bb1b-934545f3e51d	kirobo	kiro	KIRO	f	\N	2023-05-24	2023-05-24
90680ddd-05e3-476a-b952-8cae801c1a43	kishimoto	kishimoto	Kishimoto	f	\N	2023-05-24	2023-05-24
74f2a27b-ed4a-4b93-8563-deb702b40229	kishimoto-inu	kishimoto	Kishimoto (old)	f	\N	2023-05-24	2023-05-24
df338b3a-c36e-47bb-8a84-981049f1934c	kishu-inu	kishu	Kishu Inu	f	\N	2023-05-24	2023-05-24
b7255630-a265-4d6e-ae0f-38d47624f2da	kishu-ken	kishk	Kishu Ken	f	\N	2023-05-24	2023-05-24
fe234854-acb0-47f5-8c2a-7295c6ce150f	kissan	ksn	Kissan	f	\N	2023-05-24	2023-05-24
5d3aeb98-1a90-49df-9eba-61544d0ac6a1	kitsumon	$kmc	Kitsumon	f	\N	2023-05-24	2023-05-24
c1aed407-74a3-495a-8855-458ae6bd3b44	kittee	kte	KITTEE	f	\N	2023-05-24	2023-05-24
c09b8709-5adb-4def-9393-4a79b6a6331a	kittenfinance	kif	KittenFinance	f	\N	2023-05-24	2023-05-24
46458707-0780-4419-9065-4db4dd3268f0	kitti	kitti	KITTI	f	\N	2023-05-24	2023-05-24
1aa4031d-0451-49de-a295-076113d16671	kitty	kit	Kitty	f	\N	2023-05-24	2023-05-24
c413336c-90cf-4034-8a02-4b3407dee265	kittycake	kcake	KittyCake	f	\N	2023-05-24	2023-05-24
a42abac7-b6c0-444c-b8dd-f2be9458abe1	kitty-coin-solana	kitty	Kitty Coin Solana	f	\N	2023-05-24	2023-05-24
3cf3fe99-5dfe-48a1-9c0c-1a89d7836522	kitty-inu	kitty	Kitty Inu	f	\N	2023-05-24	2023-05-24
f73d2ec0-118c-40f5-8ab7-985088f7d28c	kitty-solana	kitty	Kitty Solana	f	\N	2023-05-24	2023-05-24
ede1e7c9-afb6-4e00-b6bd-1f29bdfbed05	kiwi	kiwi	kiwi	f	\N	2023-05-24	2023-05-24
b01f90e2-200f-444d-8047-79a17881acda	klap-finance	klap	Klap Finance	f	\N	2023-05-24	2023-05-24
e965e304-b2c9-4c3a-8a54-deb5d76255c2	klaycity-orb	orb	Orbcity	f	\N	2023-05-24	2023-05-24
aa8ab8d5-efdf-4ded-a473-85ab41fdaa4d	klaydice	dice	Klaydice	f	\N	2023-05-24	2023-05-24
43f6c331-9152-494c-851c-6e4eb9843dee	klayfi-finance	kfi	KlayFi Finance	f	\N	2023-05-24	2023-05-24
dd5a769b-b3b2-4362-bd19-63bcf366c3c5	klayswap-protocol	ksp	KlaySwap Protocol	f	\N	2023-05-24	2023-05-24
9fe400f1-bbea-4384-8a35-b9fa0727cdbd	klaytn-dai	kdai	Klaytn Dai	f	\N	2023-05-24	2023-05-24
3dca33be-9653-40f7-969d-00fa70dc7b80	klay-token	klay	Klaytn	f	\N	2023-05-24	2023-05-24
f607966d-b110-4586-91c5-ba976da6d5c2	klayuniverse	kut	KlayUniverse	f	\N	2023-05-24	2023-05-24
6a89ae26-bf8e-469c-b9bd-cf564ed06004	kleekai	klee	KleeKai	f	\N	2023-05-24	2023-05-24
7d6763a0-e2af-4439-ac87-4f227f145f73	klend	klt	KLend	f	\N	2023-05-24	2023-05-24
6ab07262-9a18-4c53-bab4-5190f0484b49	kleomedes	kleo	Kleomedes	f	\N	2023-05-24	2023-05-24
c90e945b-7b37-4d5e-ac71-8ece8b24acf6	kleros	pnk	Kleros	f	\N	2023-05-24	2023-05-24
71c5ce20-9830-4db3-bb12-9765b100312b	kleva	kleva	KLEVA	f	\N	2023-05-24	2023-05-24
8af9a9a9-5fe6-4b6b-8324-88dbd7e6734d	klever	klv	Klever	f	\N	2023-05-24	2023-05-24
564c3df7-8073-499e-8838-bb2df3093feb	klever-finance	kfi	Klever Finance	f	\N	2023-05-24	2023-05-24
d55ea1e9-93dd-4b39-b30f-58790627b86c	klima-dao	klima	KlimaDAO	f	\N	2023-05-24	2023-05-24
a5968c0d-29e9-40b7-a3c1-d69630fb888e	knights-peasants	knight	Knights & Peasants	f	\N	2023-05-24	2023-05-24
e3eec220-28af-4a60-983a-52707a7367b3	knightswap	knight	KnightSwap	f	\N	2023-05-24	2023-05-24
3717ce3f-ce03-4e1f-b09f-26c2e27d24c9	knight-war-spirits	kws	Knight War Spirits	f	\N	2023-05-24	2023-05-24
9a084d69-c103-416d-bc98-431509709795	knit-finance	kft	Knit Finance	f	\N	2023-05-24	2023-05-24
73994643-dbcc-406a-8521-4b49879daa29	knoxfs	kfx	KnoxFS	f	\N	2023-05-24	2023-05-24
fd6d341c-7c43-4720-a71e-4b0fa3cea48c	koacombat	koacombat	KoaCombat	f	\N	2023-05-24	2023-05-24
d286f5d2-8569-488b-bad3-a634aab093f0	koakuma	kkma	Koakuma	f	\N	2023-05-24	2023-05-24
2890deb5-aa18-4f69-9bb7-0802b2b235f4	kobocoin	kobo	Kobocoin	f	\N	2023-05-24	2023-05-24
7228c858-43da-4c20-b021-707db9f1d74e	kocaelispor-fan-token	kstt	Kocaelispor Fan Token	f	\N	2023-05-24	2023-05-24
609a35ee-dc0f-4fe8-bca1-5120bbe6c050	kochi-ken	kochi	Kochi Ken	f	\N	2023-05-24	2023-05-24
959c939e-206a-47ce-b4d8-e8e1de9e76da	kodachi-token	kodachi	Kodachi Token	f	\N	2023-05-24	2023-05-24
3d538c89-990e-47e3-ab50-e1d82a39bce7	koda-finance	koda	Koda Cryptocurrency	f	\N	2023-05-24	2023-05-24
bf96f7cd-b0c7-4391-bd2f-23cd8bebc3e7	kodi	kodi	KODI	f	\N	2023-05-24	2023-05-24
b28ce25d-7fbd-4290-a99b-1d5643bb46bd	kogecoin	kogecoin	KogeCoin	f	\N	2023-05-24	2023-05-24
e41b6a2d-554e-4855-83ec-c617ce413441	koi-network	koi	Koi Network	f	\N	2023-05-24	2023-05-24
39ddd3cf-92fd-40d3-b4f2-385e5dc7bac5	koinos	koin	Koinos	f	\N	2023-05-24	2023-05-24
b054ccbf-03e7-4f16-ae2f-091f81247706	koisan	kic	Koisan	f	\N	2023-05-24	2023-05-24
0adfbe0c-ee4e-4b18-9676-805690a97864	koji	koji	Koji	f	\N	2023-05-24	2023-05-24
fd8867f9-f593-4811-b7ae-2acfecdb0d5a	kok	kok	KOK	f	\N	2023-05-24	2023-05-24
5adc0a97-f1e7-46ad-bac9-67edcb022e24	kokoa-finance	kokoa	Kokoa Finance	f	\N	2023-05-24	2023-05-24
4628e119-1e49-4c56-9700-4fb004046c6d	kokoa-stable-dollar	ksd	Kokoa Stable Dollar	f	\N	2023-05-24	2023-05-24
b0d35896-f1ff-4add-baa8-55e30a3b05df	kokomo-finance	koko	Kokomo Finance	f	\N	2023-05-24	2023-05-24
afc760b3-bf4c-4834-a6ab-3bee27e971e2	kolibri-dao	kdao	Kolibri DAO	f	\N	2023-05-24	2023-05-24
ec868475-afa6-4898-b7ad-9b5ef57cd4e5	kolibri-usd	kusd	Kolibri USD	f	\N	2023-05-24	2023-05-24
49172bc1-e6cc-4a21-9733-e8e0865d184f	kollect	kol	Kollect	f	\N	2023-05-24	2023-05-24
6ec920c8-d70e-473d-8722-d55b7f185271	kollector	kltr	Kollector	f	\N	2023-05-24	2023-05-24
8e18c1e6-764f-46b2-a053-be3cac4e671e	kolnet	kolnet	KOLNET	f	\N	2023-05-24	2023-05-24
c0e96b3a-1e7c-4f12-b74a-aa6356843234	kommunitas	kom	Kommunitas	f	\N	2023-05-24	2023-05-24
78a856f5-c2e1-4946-bd19-fef11dd45953	komodo	kmd	Komodo	f	\N	2023-05-24	2023-05-24
2db2d5ee-0fdd-483b-9eb9-f1cf5026f623	kompete	kompete	KOMPETE Token	f	\N	2023-05-24	2023-05-24
66d5a059-0f89-438f-b2ea-7249ac3efdc4	kondux-v2	kndx	KONDUX	f	\N	2023-05-24	2023-05-24
a51e5826-2af6-400a-93ee-0e6762e77bfb	konjungate	konj	KONJUNGATE	f	\N	2023-05-24	2023-05-24
b18fc73d-43d1-4b11-b475-fc7ac11491ff	konnect	kct	Konnect	f	\N	2023-05-24	2023-05-24
a88bac52-bdb9-4f4a-920f-4efe7ad5e57f	konomi-network	kono	Konomi Network	f	\N	2023-05-24	2023-05-24
5153147a-5934-4b7c-aa92-3381b3cf31c5	konpay	kon	KonPay	f	\N	2023-05-24	2023-05-24
e678fca2-e4af-449f-aebb-1033db41f180	korea-entertainment-education-shopping	kees	Korea Entertainment Education & Shopping	f	\N	2023-05-24	2023-05-24
b82ad59c-991c-42f8-a9ac-d8fc0dd4e440	kori-inu	kori	Kori Inu	f	\N	2023-05-24	2023-05-24
0772345f-29a2-475d-92ac-fa8d3ed86402	koromaru	koromaru	KOROMARU	f	\N	2023-05-24	2023-05-24
7dba7f5b-f3d7-4dfb-911f-2ef242003ae8	kounotori	kto	Kounotori	f	\N	2023-05-24	2023-05-24
f3396a00-244e-43ac-af2d-052a74edc2eb	koyo-6e93c7c7-03a3-4475-86a1-f0bc80ee09d6	koy	Koyo	f	\N	2023-05-24	2023-05-24
29f08d43-5d16-47f1-a6f3-9ba69f2b34b3	kpop-coin	kpop	KPOP Coin	f	\N	2023-05-24	2023-05-24
85a2375d-4112-49d2-a936-df2f1d2d7658	kragger-inu	kinu	Kragger Inu	f	\N	2023-05-24	2023-05-24
5466ca55-c0a5-4b25-bdc6-2fbe625bd3fd	kred	kred	KRED	f	\N	2023-05-24	2023-05-24
bd769cf0-5a22-455a-9cd3-16950774dab5	krida-fans	krida	Krida Fans	f	\N	2023-05-24	2023-05-24
5c9c1939-724c-4ba0-aa1b-5309824f1599	krill	krill	Krill	f	\N	2023-05-24	2023-05-24
30e85110-1322-41b2-bf9f-1ab12b37693b	kripto	kripto	Kripto	f	\N	2023-05-24	2023-05-24
9a7007cb-0566-4bef-9dc2-e50c7ee87d1f	kripto-galaxy-battle	kaba	Kripto Galaxy Battle	f	\N	2023-05-24	2023-05-24
df4cc31d-370f-4bd1-bdfd-91f9df11cfa5	krogan	kro	Krogan	f	\N	2023-05-24	2023-05-24
a2b05b6b-a5f7-40a9-a9a9-d1e3311efc8c	kromatika	krom	Kromatika	f	\N	2023-05-24	2023-05-24
5e0b635c-3d28-42fc-984c-b4b8119fdc7d	krown	krw	KROWN	f	\N	2023-05-24	2023-05-24
f4ae4c1d-0622-49b9-bf44-52d7ee6d9d14	kryll	krl	KRYLL	f	\N	2023-05-24	2023-05-24
3a76c19e-d370-4223-a0f9-30b35aefe502	kryptokrona	xkr	Kryptokrona	f	\N	2023-05-24	2023-05-24
975745c9-ee1c-4f78-b1f0-ee4ef98895c2	kryptomon	kmon	Kryptomon	f	\N	2023-05-24	2023-05-24
ba477fc9-7f44-45e4-82ab-fd5f17e0bf25	krypton-dao	krd	Krypton DAO	f	\N	2023-05-24	2023-05-24
723c5a03-df72-4c2f-8ae3-afc440520d47	krypton-token	kgc	Krypton Galaxy Coin	f	\N	2023-05-24	2023-05-24
98724212-1853-43eb-80a9-5f4bee45eaaa	kryxivia-game	kxa	Kryxivia Game	f	\N	2023-05-24	2023-05-24
aa4f71a0-650c-4a5c-894c-e232c6b26731	kryza-exchange	krx	KRYZA Exchange	f	\N	2023-05-24	2023-05-24
eebfe969-5210-40ac-a895-54dbfb7f41d9	kryza-network	krn	KRYZA Network	f	\N	2023-05-24	2023-05-24
626de693-e1ad-48b0-bc6b-db20d057b400	ksm-starter	kst	Karus Starter	f	\N	2023-05-24	2023-05-24
bbc6aefd-f11c-46fa-88cf-cdcfbab09978	kstarcoin	ksc	KStarCoin	f	\N	2023-05-24	2023-05-24
7af76827-4dc0-4d81-9a1c-7446a3889e77	k-tune	ktt	K-Tune	f	\N	2023-05-24	2023-05-24
4e68ea7c-0e41-4042-9d42-b3ad4397e7b9	ktx-finance	ktc	KTX.Finance	f	\N	2023-05-24	2023-05-24
7d23e7f5-239c-4683-a0a5-7842620acb99	kubecoin	kube	KubeCoin	f	\N	2023-05-24	2023-05-24
2443d696-efb4-42b0-8f1e-ee59c52c11a8	kubic	kubic	Kubic	f	\N	2023-05-24	2023-05-24
6c68bf9c-4187-431f-be2f-3beac2485cfb	kucoin-shares	kcs	KuCoin	f	\N	2023-05-24	2023-05-24
07efec14-918e-4068-848c-7a8e525e379f	kudoe	kdoe	Kudoe	f	\N	2023-05-24	2023-05-24
194f4724-d026-4d14-947e-a69d84735c6b	kudoge	kudo	KuDoge	f	\N	2023-05-24	2023-05-24
49e928ab-c36e-4ae3-b158-6a507db35737	kujira	kuji	Kujira	f	\N	2023-05-24	2023-05-24
246a8716-bf25-493c-92bd-d2adaea81c5e	kuky-star	kuky	Kuky Star	f	\N	2023-05-24	2023-05-24
601b97e1-8e9a-44d3-b94e-91f2f02b8510	kumadex-token	dkuma	KumaDex Token	f	\N	2023-05-24	2023-05-24
2d8aa4c8-ab61-4ad1-bb09-00eb780e631f	kuma-inu	kuma	Kuma Inu	f	\N	2023-05-24	2023-05-24
bbd75102-f20c-4798-9d97-84e358dadb3c	kumamon-finance	kumamon	Kumamon Finance	f	\N	2023-05-24	2023-05-24
8dde402d-9d8e-4ad4-ba52-e7da3d9d0a82	kunci-coin	kunci	Kunci Coin	f	\N	2023-05-24	2023-05-24
fd7692af-e017-45ba-bbf9-978d6d97b6cd	kurobi	kuro	Kurobi	f	\N	2023-05-24	2023-05-24
31cfd4e5-e26b-460a-a21d-347ff2a2276e	kusama	ksm	Kusama	f	\N	2023-05-24	2023-05-24
5f83ff36-d317-4db5-8457-f1c801777834	kusd-t	kusd-t	KUSD-T	f	\N	2023-05-24	2023-05-24
8861f4dd-fdee-4a8f-8d55-199f161b20ca	kusunoki-samurai	kusunoki	Kusunoki Samurai	f	\N	2023-05-24	2023-05-24
708bb195-923c-4dfd-8709-6f3878703ec6	kuswap	kus	KuSwap	f	\N	2023-05-24	2023-05-24
20f145ea-a36c-45ce-8e82-1871cd663110	kvants-ai	kvnt	Kvants AI	f	\N	2023-05-24	2023-05-24
10cda2b5-e092-40f4-be43-78c861cf2373	kwai	kwai	KWAI	f	\N	2023-05-24	2023-05-24
2e0303e8-e1fa-45b8-9b84-eff44c26fa5e	kwenta	kwenta	Kwenta	f	\N	2023-05-24	2023-05-24
673dfa4e-67fa-4d11-8456-2ee9a1446d36	kyanite	kyan	Kyanite	f	\N	2023-05-24	2023-05-24
a38344b4-8136-4223-af81-9bd50a543f64	kyberdyne	kbd	Kyberdyne	f	\N	2023-05-24	2023-05-24
81713e6a-b780-409d-89c6-134d8c2978e9	kyber-network	kncl	Kyber Network Crystal Legacy	f	\N	2023-05-24	2023-05-24
2a80293b-7809-4ba6-a215-5c9f4f53fb27	kyber-network-crystal	knc	Kyber Network Crystal	f	\N	2023-05-24	2023-05-24
3a54c7d9-c0fa-473f-94fe-00d1f0388645	kyccoin	kycc	KYCCOIN	f	\N	2023-05-24	2023-05-24
ee53da27-ca0f-4c36-8c05-588cf3ff65d1	kylin-network	kyl	Kylin Network	f	\N	2023-05-24	2023-05-24
dc1f4940-d118-4f86-890c-1b8dcce571d3	kyoko	kyoko	Kyoko	f	\N	2023-05-24	2023-05-24
99a08009-a0ce-4b63-a28e-16d99cd28dea	kyotoswap	kswap	KyotoSwap	f	\N	2023-05-24	2023-05-24
fdd32192-9741-4aa9-853a-c329be98ee46	kyrrex	krrx	Kyrrex	f	\N	2023-05-24	2023-05-24
79585313-5dc9-4ac3-a66b-b464192de62b	kyte-one	kte	Kyte.One	f	\N	2023-05-24	2023-05-24
fe1da390-c94d-4fcf-8763-67ebff253dee	kzcash	kzc	Kzcash	f	\N	2023-05-24	2023-05-24
be76a2b4-98d2-4ede-9a87-4ae39519f94c	l3usd	l3usd	L3USD	f	\N	2023-05-24	2023-05-24
1d1d9a72-a934-4123-ac0d-0927b97c4b40	label-foundation	lbl	LABEL Foundation	f	\N	2023-05-24	2023-05-24
edc1a815-bcec-438e-ae6d-9e2153000e3d	labs-group	labsv2	LABSV2	f	\N	2023-05-24	2023-05-24
46d175ae-9ba5-4064-a491-2d2767da0290	labs-protocol	labs	LABS Protocol	f	\N	2023-05-24	2023-05-24
2d9a0719-8e77-4f17-a999-56648350c54c	laddercaster	lada	LadderCaster	f	\N	2023-05-24	2023-05-24
6bfe4f3b-ec61-4c5a-9f85-37cd80321acd	laika	laika	Laika	f	\N	2023-05-24	2023-05-24
8cddde3b-eb67-40aa-ab6a-bd028e654b20	laine-stake	lainesol	Laine Stake	f	\N	2023-05-24	2023-05-24
5ac754b7-8d4c-425a-ab62-2bb2db33586a	lakeviewmeta	lvm	LakeViewMeta	f	\N	2023-05-24	2023-05-24
81e6c73b-1e84-4924-9f8d-28c6478758cb	lambda	lamb	Lambda	f	\N	2023-05-24	2023-05-24
05f07a60-34c3-4461-bfec-0de8ad7b4add	lambda-markets	lmda	Lambda Markets	f	\N	2023-05-24	2023-05-24
b4567515-aff3-4f0f-a208-e6962463a9fd	lambo-0fcbf0f7-1a8f-470d-ba09-797d5e95d836	lambo	$LAMBO	f	\N	2023-05-24	2023-05-24
a0248836-7bda-4d0c-8335-2047b3052839	lanacoin	lana	LanaCoin	f	\N	2023-05-24	2023-05-24
03082a82-da6c-4a0b-86c3-15e81f0ab46a	lance-coin	lce	Lance Coin	f	\N	2023-05-24	2023-05-24
3675c9ea-0819-4d37-9318-2fbe34865af8	lanceria	lanc	Lanceria	f	\N	2023-05-24	2023-05-24
a305a5ba-c62a-4e4f-828e-c85b6675b32a	landboard	land	Landboard	f	\N	2023-05-24	2023-05-24
84fb15d9-35d1-4299-a614-f6e69664472c	land-of-conquest-slg	slg	Shattered Legion	f	\N	2023-05-24	2023-05-24
b8af51e2-1851-4d60-a682-59772164d521	land-of-fantasy	lof	Land of Fantasy	f	\N	2023-05-24	2023-05-24
a140c30c-aafb-40db-95b0-146a65bbe822	landshare	land	Landshare	f	\N	2023-05-24	2023-05-24
18a21e78-34e4-48a1-b376-93a208de5e48	landworld	lwd	Landworld	f	\N	2023-05-24	2023-05-24
b0e81759-8c6a-4e76-bba7-ddd25c046dc8	lapislazuli	lilli	Lapislazuli	f	\N	2023-05-24	2023-05-24
79a7926a-c19c-4e2e-8056-dd4988858652	laqira-protocol	lqr	Laqira Protocol	f	\N	2023-05-24	2023-05-24
4002ce0d-985e-4047-9671-b3e299945ba2	larix	larix	Larix	f	\N	2023-05-24	2023-05-24
5ff6f87b-958d-40d1-b297-778d761648b4	larry	larry	Larry	f	\N	2023-05-24	2023-05-24
2bbd6ccc-1ebf-4ed2-a19f-92fef85f718b	lasrever	lsvr	Lasrever	f	\N	2023-05-24	2023-05-24
8785dc3a-5e10-411e-9e1c-b28ad9043ec9	last-survivor	lsc	Last Survivor	f	\N	2023-05-24	2023-05-24
3a1dd9db-17a9-4a24-aaf3-dfd2e364628b	latoken	la	LA	f	\N	2023-05-24	2023-05-24
21b635e2-5f9b-448e-88c1-8f2e20d87f05	lattice-token	ltx	Lattice	f	\N	2023-05-24	2023-05-24
fc98bc2f-a3b4-40ff-8d0b-33a8f8447c2a	launchblock	lbp	LaunchBlock	f	\N	2023-05-24	2023-05-24
fa72c825-29ec-4855-a191-70364b8414be	launchpool	lpool	Launchpool	f	\N	2023-05-24	2023-05-24
5c763d6c-6f95-402f-9510-840b2292f069	launchverse	xlv	LaunchVerse	f	\N	2023-05-24	2023-05-24
6278cb5d-8604-40ed-8842-e12d440b08be	lavaswap	lava	Lavaswap	f	\N	2023-05-24	2023-05-24
dc7e76f0-41a4-48b4-b200-6350f6e0c6ff	lavax-labs	lavax	LavaX Labs	f	\N	2023-05-24	2023-05-24
49b4d3e4-5030-46cc-bc80-17dbf0b18dce	law	law	LAW	f	\N	2023-05-24	2023-05-24
f6069114-4f52-4fe9-9b31-c58df5d0f171	law-blocks	lbt	Law Blocks	f	\N	2023-05-24	2023-05-24
2691cfd1-17ee-4ab9-af52-71f1969d95bf	layer2dao	l2dao	Layer2DAO	f	\N	2023-05-24	2023-05-24
495c0d05-272b-46ff-88be-840f10d91688	layer-network	layer	Layer Network	f	\N	2023-05-24	2023-05-24
d33d952d-d55b-44ac-ba9b-49bbc70ce08d	lazio-fan-token	lazio	Lazio Fan Token	f	\N	2023-05-24	2023-05-24
213d0efc-f9d2-4716-9a6b-768ccccf8fa8	lbk	lbk	LBK	f	\N	2023-05-24	2023-05-24
6364b3f9-3bcb-40a4-873d-1228d81095f0	lbry-credits	lbc	LBRY Credits	f	\N	2023-05-24	2023-05-24
bfc76e1e-3555-43ae-9581-db509902bfbf	lcx	lcx	LCX	f	\N	2023-05-24	2023-05-24
55be79c1-7cd0-4952-a445-d41b3b7d9f2c	lead-token	lead	Lead	f	\N	2023-05-24	2023-05-24
65bcbcbe-a406-4295-aede-bfdae74be358	league-of-ancients	loa	League of Ancients	f	\N	2023-05-24	2023-05-24
10101c16-ecbc-4939-9d8b-c4eb0e2f2a5d	league-of-kingdoms	loka	League of Kingdoms	f	\N	2023-05-24	2023-05-24
9331a731-923b-498a-9aa7-1ece59436bcc	leancoin	lean	Leancoin	f	\N	2023-05-24	2023-05-24
0b63ebe0-760a-405b-8386-546186cebc02	leandro-lopes	lopes	Leandro Lopes	f	\N	2023-05-24	2023-05-24
56318589-374a-4529-8fad-75ec2225a58d	lean-management-token	lean	Leancoin [OLD]	f	\N	2023-05-24	2023-05-24
56e4811d-6b28-41fa-a751-8f2b9ae8c5d4	leap-token	leap	LEAP Token	f	\N	2023-05-24	2023-05-24
d57ec733-2f3d-4d61-89dc-594f35f7d9e4	learning-cash-2	ead	Learning Cash	f	\N	2023-05-24	2023-05-24
10f69cb3-d85f-4072-a36c-e4a8395735d7	learning-star	lstar	Learning Star	f	\N	2023-05-24	2023-05-24
8f002a7c-c905-49c3-acb4-dbcf61fee055	leash	leash	Doge Killer	f	\N	2023-05-24	2023-05-24
d8f1691c-a689-4526-a8ab-1e55b29aeac5	ledgerscore	led	LedgerScore	f	\N	2023-05-24	2023-05-24
62f00ab5-9d7c-4716-b383-dce2b623a42f	ledgis	led	Ledgis	f	\N	2023-05-24	2023-05-24
ddb126f3-cea3-4e2a-872d-95646c198e0b	ledgity	lty	Ledgity	f	\N	2023-05-24	2023-05-24
50ef5f85-de56-48dd-a7c2-ee8a9eed129f	lee	lee	Lee	f	\N	2023-05-24	2023-05-24
e1b14005-148a-4f22-a3c3-308229abf38b	leeds-united-fan-token	lufc	Leeds United Fan Token	f	\N	2023-05-24	2023-05-24
7e8fcc18-adbe-46fd-9772-e5140b5cbaca	legacy-ichi	ichi	Legacy ICHI	f	\N	2023-05-24	2023-05-24
d36536c5-603b-4d6e-82f2-ba5495d52a35	legend-of-fantasy-war	lfw	Linked Finance World	f	\N	2023-05-24	2023-05-24
56951f80-2066-4725-956a-6f914026c618	legends	fwcl	Legends	f	\N	2023-05-24	2023-05-24
16283301-3d44-4664-be1c-1acf28fb0c98	legends-of-aria	aria	Legends Of Aria	f	\N	2023-05-24	2023-05-24
41a6e1cf-8900-4fea-a9ed-9073f292ee89	legends-room	more	More	f	\N	2023-05-24	2023-05-24
79bf3754-fae2-435a-ac42-af6731fa861c	legends-token	lg	Legends Token	f	\N	2023-05-24	2023-05-24
770250d1-3943-4413-bdf5-1640e766838e	legia-warsaw-fan-token	leg	Legia Warsaw Fan Token	f	\N	2023-05-24	2023-05-24
a88b4a35-c177-435b-9a27-c5ca0c10a91e	legion-network	lgx	Legion Network	f	\N	2023-05-24	2023-05-24
19236718-e021-441c-85d9-726fa8339d07	lego-coin-v2	lego	Lego Coin V2	f	\N	2023-05-24	2023-05-24
eaaf6e27-7e6c-4502-b836-e97b655b8a63	leicester-tigers-fan-token	tigers	Leicester Tigers Fan Token	f	\N	2023-05-24	2023-05-24
10f76e32-e5fb-4950-ab40-de0e39629383	leisuremeta	lm	LeisureMeta	f	\N	2023-05-24	2023-05-24
9e3cbf72-0763-43a1-bfd8-133a29f9e88a	leisurepay	lpy	LeisurePay	f	\N	2023-05-24	2023-05-24
e5830312-a085-46e0-8f6a-9c0f48a4fd9b	lemochain	lemo	LemoChain	f	\N	2023-05-24	2023-05-24
a91ac78f-5192-4d5c-b100-39b2bda3271e	lemonchain	lemc	LemonChain	f	\N	2023-05-24	2023-05-24
34103c55-5449-4321-9ca3-0033e9e03e2a	lemond	lemd	Lemond	f	\N	2023-05-24	2023-05-24
596e95e2-2b03-4827-9690-66b47f4a3ce3	lemon-token	lemn	Crypto Lemon	f	\N	2023-05-24	2023-05-24
2c934bbd-6541-4529-98f7-e9695d81f1f6	lenda	lenda	Lenda	f	\N	2023-05-24	2023-05-24
cda65c5c-631e-479f-b08e-bc76e7206aa9	lendexe	lexe	LendeXe Finance	f	\N	2023-05-24	2023-05-24
bfa02b2a-f18f-42ea-8b21-3bafa4574378	lend-flare-dao-token	lft	Lend Flare Dao	f	\N	2023-05-24	2023-05-24
5298b84b-6f28-4b54-b25a-0c56c1ebe804	lendhub	lhb	Lendhub	f	\N	2023-05-24	2023-05-24
5e4035b5-536f-48f0-85ce-fce421ab6abe	lenny-face	( ͡° ͜ʖ ͡°)	Lenny Face	f	\N	2023-05-24	2023-05-24
1f944193-e394-4d52-876b-8954b6583a1c	leonicorn-swap-leons	leons	Leonicorn Swap LEONS	f	\N	2023-05-24	2023-05-24
ff0076b5-766e-45bd-9d56-efd40896c91f	leonidasbilic	lio	Leonidasbilic	f	\N	2023-05-24	2023-05-24
8bb2cbb0-6514-4cbb-a076-83140521845d	leonidas-token	leonidas	Leonidas Token	f	\N	2023-05-24	2023-05-24
c9b27bbc-9066-4b3f-8aa0-75f779834a5d	leopard	leopard	Leopard	f	\N	2023-05-24	2023-05-24
0ed49043-3452-41fa-8ae8-fe892d2a8e70	leo-token	leo	LEO Token	f	\N	2023-05-24	2023-05-24
9afab1f4-419b-489a-a088-2219701cdd49	leox	leox	LEOX	f	\N	2023-05-24	2023-05-24
5020c2c1-eac5-4b57-b75c-69cfae48f06d	lepasa	lepa	Lepasa	f	\N	2023-05-24	2023-05-24
147e2d14-ad41-46e4-aa33-dc2cc33d2dae	letcoinshop	lcs	LetCoinShop	f	\N	2023-05-24	2023-05-24
df6bcf02-93e4-456c-a702-0384f16ab061	lethean	lthn	Lethean	f	\N	2023-05-24	2023-05-24
8b95ce74-ff32-4430-a9b7-7dc68c00aaa2	lets-go-brandon	letsgo	Lets Go Brandon	f	\N	2023-05-24	2023-05-24
b71fbb47-cc11-419e-9625-b35f0e75347c	levante-ud-fan-token	lev	Levante U.D. Fan Token	f	\N	2023-05-24	2023-05-24
a5e2dd81-2d9c-4095-a9fe-f1c732a68eb8	leve-invest	leve	Leve Invest	f	\N	2023-05-24	2023-05-24
de91c02c-77b0-4eeb-9e1a-b04491c84017	level	lvl	Level	f	\N	2023-05-24	2023-05-24
f3801d0a-8e88-4718-991b-f4b20fbd98af	levelapp	lvl	LevelApp	f	\N	2023-05-24	2023-05-24
bcfca66d-138f-4656-8a49-b0b3e9df28bc	levelg	levelg	LEVELG	f	\N	2023-05-24	2023-05-24
ffc049d7-560f-4da4-8be2-feb9c21969b0	level-governance	lgo	Level Governance	f	\N	2023-05-24	2023-05-24
288a3c77-86ce-4512-8ea9-35c180a5d130	lever	lever	LeverFi	f	\N	2023-05-24	2023-05-24
86b2e058-0f9a-412c-87bc-3d3b65007f93	leverageinu	levi	LeverageInu	f	\N	2023-05-24	2023-05-24
5de65e2f-3c0b-4603-a0d8-fb2ed486fa07	leverage-protocol	levx	Leverage Protocol	f	\N	2023-05-24	2023-05-24
6d5a9dbd-4066-49bc-83f9-6917598f0531	leverj-gluon	l2	Leverj Gluon	f	\N	2023-05-24	2023-05-24
11876c63-0277-42f5-9b13-308032feb920	lever-network	lev	Lever Network	f	\N	2023-05-24	2023-05-24
6017f7c9-cfb6-4fe5-9fb4-14cd740b76e3	levolution	levl	Levolution	f	\N	2023-05-24	2023-05-24
2b94162a-a1a5-40ca-8ad9-2f54007ffc19	lexer-markets	lex	LEXER Markets	f	\N	2023-05-24	2023-05-24
7e3372d8-8726-4144-8146-08a7f2736343	lfg-coin	lfg	LFG coin	f	\N	2023-05-24	2023-05-24
985e3914-de4e-462b-a92c-94145dbdedf1	lfgswap-finance	lfg	LFGSwap Finance	f	\N	2023-05-24	2023-05-24
da1d2404-5bab-4b7c-949b-5dc7ccb0feab	lfgswap-finance-core	lfg	LFGSwap Finance(CORE)	f	\N	2023-05-24	2023-05-24
071b5251-9b52-4c5d-9c33-6844574cd5b0	lgcy-network	lgcy	LGCY Network	f	\N	2023-05-24	2023-05-24
424e1a22-125d-401f-909f-53572db2f332	libera-financial	libera	Libera Financial	f	\N	2023-05-24	2023-05-24
b1cc96e4-a288-42a3-ac10-47ee13f6f193	liber-coin	lbr	LIBER COIN	f	\N	2023-05-24	2023-05-24
5d8d6b1f-8db4-4758-887b-8d42371c6b7d	libero-financial	libero	Libero Financial	f	\N	2023-05-24	2023-05-24
91d70c87-3095-405f-8c63-c5ca18f13468	liberty-square-filth	flth	Liberty Square Filth	f	\N	2023-05-24	2023-05-24
03b9463e-9a46-48f0-872e-4f439630716c	libfi	libx	Libfi	f	\N	2023-05-24	2023-05-24
b533aa38-1347-4dc0-9c6e-5b791189ff2d	libfx	libfx	Libfx	f	\N	2023-05-24	2023-05-24
d1885e7e-f5bc-4019-bf46-8578f2f6169e	libonomy	lby	Libonomy	f	\N	2023-05-24	2023-05-24
c8553692-4184-4be4-8acc-49fb77fa4956	libra-credit	lba	Libra Credit	f	\N	2023-05-24	2023-05-24
ec0ce690-e86b-4f67-afbf-3a4842891b2a	libra-protocol	lbr	Libra Protocol	f	\N	2023-05-24	2023-05-24
6bf17c91-633f-4b83-bf53-9d45dc61010b	libre	libre	Libre	f	\N	2023-05-24	2023-05-24
7718b629-45a2-4191-96f1-278e72e2c312	lichang	lc	Lichang	f	\N	2023-05-24	2023-05-24
df1a53d1-a056-4e35-ba42-4fc3574b7f8f	lido-dao	ldo	Lido DAO	f	\N	2023-05-24	2023-05-24
3e14b27a-5056-4bc6-9e97-3f8ed46bd943	lido-dao-wormhole	ldo	Lido DAO (Wormhole)	f	\N	2023-05-24	2023-05-24
c1340884-4c96-45b3-be06-e708ae6a3610	lido-on-kusama	wstksm	Lido on Kusama	f	\N	2023-05-24	2023-05-24
302ff772-2ae7-4dae-9bfe-351a398306f2	lido-staked-matic	stmatic	Lido Staked Matic	f	\N	2023-05-24	2023-05-24
deacb85f-b32a-421c-afc6-d198717abd24	lido-staked-polkadot	stdot	Lido Staked Polkadot	f	\N	2023-05-24	2023-05-24
c7232cb7-e8f7-474e-b2f2-2f3dec84b0ed	lido-staked-sol	stsol	Lido Staked SOL	f	\N	2023-05-24	2023-05-24
ed7d8ca7-745e-453c-b5e8-bc1b7594467b	lien	lien	Lien	f	\N	2023-05-24	2023-05-24
26d5ab41-78fd-418e-8608-505b5f560704	lif3	lif3	LIF3	f	\N	2023-05-24	2023-05-24
a4d49fd2-753b-44b7-bc04-f6cd1bd8dd5b	lif3-lshare	lshare	LIF3 LSHARE	f	\N	2023-05-24	2023-05-24
2efe6d93-4199-4ef1-ae12-b72b6244e046	life-crypto	life	Life Crypto	f	\N	2023-05-24	2023-05-24
70e856cf-8716-47a0-b7f3-8465d218e272	life-token-v2	ltnv2	Life v2	f	\N	2023-05-24	2023-05-24
45f307bf-945e-4b85-8465-0c2608e162b3	lifinity	lfnty	Lifinity	f	\N	2023-05-24	2023-05-24
bc70aa12-999e-4dac-b527-01a2ade75095	lightcoin	lhc	Lightcoin	f	\N	2023-05-24	2023-05-24
bfbf3da9-3d0b-46db-aba2-d6ef857d4907	light-defi	light	Light Defi	f	\N	2023-05-24	2023-05-24
7341c7f6-833a-41cc-b5af-7cea387fde55	lightening-cash	lic	Lightening Cash	f	\N	2023-05-24	2023-05-24
e6c47f3e-a6a7-4f5d-a646-ac2c23e5593f	lightning-bitcoin	lbtc	Lightning Bitcoin	f	\N	2023-05-24	2023-05-24
e8138663-0121-47d6-9faf-8dfdf1c98734	lightningcash-gold	lnc	LightningCash	f	\N	2023-05-24	2023-05-24
1ae26cbe-a78a-4178-bc90-a528e10ca70b	lightning-protocol	light	Lightning Protocol	f	\N	2023-05-24	2023-05-24
921cf766-0c19-4ae3-a7da-db96a691cb6d	lightyears	year	Lightyears	f	\N	2023-05-24	2023-05-24
778f5e61-053d-43dd-bad9-c1d80d1c6a98	likecoin	like	LikeCoin	f	\N	2023-05-24	2023-05-24
6deb5ff3-ca99-4da3-9117-84192ff8adde	lil-floki	lilfloki	Lil Floki	f	\N	2023-05-24	2023-05-24
89160362-b72f-471f-af26-a52a0da497a6	lilly-finance	ly	Lilly Token	f	\N	2023-05-24	2023-05-24
97b1f028-952a-444c-8596-6f3d34df95e6	limestone-network	limex	Limestone Network	f	\N	2023-05-24	2023-05-24
d69ae7f5-e5a4-4989-b313-da47c6ea088e	limewire-token	lmwr	LimeWire Token	f	\N	2023-05-24	2023-05-24
661444f3-cdd8-49a6-8ebc-17c740a37d45	limitswap	limit	LimitSwap	f	\N	2023-05-24	2023-05-24
153c65c4-92da-4590-a0a1-165861b93bad	limocoin-swap	lmcswap	Limocoin Swap	f	\N	2023-05-24	2023-05-24
855015f5-4f5c-45c0-b489-9ce1180f78bc	limoverse	limo	Limoverse	f	\N	2023-05-24	2023-05-24
97ee4684-1b89-48a5-a4a6-fd032cb301da	lina	lina	LINA	f	\N	2023-05-24	2023-05-24
35c3addb-9842-45de-8147-1b56a562c23f	linda	mrx	Metrix Coin	f	\N	2023-05-24	2023-05-24
7b143ba2-a988-4a9e-af6a-ff353218b986	lindayacc-ceo	lindaceo	LindaYacc Ceo	f	\N	2023-05-24	2023-05-24
33460bd2-ca6c-4575-a8dc-fdaa0fda5f97	linear	lina	Linear	f	\N	2023-05-24	2023-05-24
e640fa8a-b42b-4f07-8fe1-a58d6f21f3e3	linear-protocol	linear	LiNEAR Protocol	f	\N	2023-05-24	2023-05-24
7cff3e70-9dac-4e0e-ad3e-f96a0eaa82fe	linework-coin	lwc	Linework Coin	f	\N	2023-05-24	2023-05-24
5d79d124-9f7c-4ad3-94ed-4514f1148944	lingose	ling	Lingose	f	\N	2023-05-24	2023-05-24
651b5b15-5708-41c6-be67-3b0445b0b136	link	ln	LINK	f	\N	2023-05-24	2023-05-24
b6a9ca3e-4a83-4fa5-abf9-a9ff68c9b633	linkcoin-token	lkn	LinkCoin	f	\N	2023-05-24	2023-05-24
498d08af-7dc0-455a-8270-a2844876e985	linkdao	lkd	LinkDao	f	\N	2023-05-24	2023-05-24
69f5dda2-e3e5-4d0d-9d20-23eb3a8be76f	linkeye	let	Linkeye	f	\N	2023-05-24	2023-05-24
8379d424-59c4-40cc-b028-d188f646c2f7	link-machine-learning	lml	Link Machine Learning	f	\N	2023-05-24	2023-05-24
ac32cb76-b97f-4b89-9abf-99f5a6829c71	linkpool	lpl	LinkPool	f	\N	2023-05-24	2023-05-24
87a465c4-7d62-49b3-ae1b-023b36c08d59	links	links	Links	f	\N	2023-05-24	2023-05-24
a90773bc-7bb0-4548-a4f9-057189e09faf	link-yvault	yvlink	LINK yVault	f	\N	2023-05-24	2023-05-24
f98f98df-d0e5-4cde-b114-fbedc53f7195	linspirit	linspirit	linSpirit	f	\N	2023-05-24	2023-05-24
60786a9a-452d-4b89-a896-774a82839a01	lint	lint	Lint	f	\N	2023-05-24	2023-05-24
7272877b-a827-46d5-8820-53ef839858be	lionceo	lceo	LionCEO	f	\N	2023-05-24	2023-05-24
248d1581-9630-4fda-b1cb-fa841b9234a5	lion-dao	roar	Lion DAO	f	\N	2023-05-24	2023-05-24
e70008b9-49de-4d09-b09c-72d2b66d13a9	liondex	lion	LionDEX	f	\N	2023-05-24	2023-05-24
5e0a17dc-f571-483c-9a47-02d429bdfaca	lion-token	lion	Lion	f	\N	2023-05-24	2023-05-24
bc8a1010-fb0d-4983-862d-07c92dc72ae5	liq-protocol	liq	LIQ Protocol	f	\N	2023-05-24	2023-05-24
f626e209-5baa-46d9-bd84-6a67c2a0fc5b	liquicats	meow	LiquiCats	f	\N	2023-05-24	2023-05-24
af3e27ef-f552-4445-813f-259f7a64f806	liquid-astr	nastr	Liquid ASTR	f	\N	2023-05-24	2023-05-24
76a6a7cf-5a6a-43b3-9e1c-58553250b548	liquid-atom	latom	Liquid ATOM	f	\N	2023-05-24	2023-05-24
b135988f-46c5-4535-935e-e85b1390f5c8	liquid-collectibles	lico	Liquid Collectibles	f	\N	2023-05-24	2023-05-24
b1af4fc5-af96-497c-beab-e5d8391c3c79	liquid-cro	lcro	Liquid CRO	f	\N	2023-05-24	2023-05-24
c883428a-d251-4e4a-9c84-5ebf9f935e6b	liquiddriver	lqdr	LiquidDriver	f	\N	2023-05-24	2023-05-24
8a077b59-ac66-4276-a432-88b05cd51ef2	liquid-finance	liqd	Liquid Finance	f	\N	2023-05-24	2023-05-24
4a235ea0-f312-4446-a06e-cbb8be116b9c	liquid-icp	licp	Liquid ICP	f	\N	2023-05-24	2023-05-24
7c0190e7-a587-4553-b121-1bb00f15d6a2	liquidifty	lqt	Lifty	f	\N	2023-05-24	2023-05-24
6e76d367-7daf-4a8a-be6b-5a0c5401c720	liquidify-077fd783-dead-4809-b5a9-0d9876f6ea5c	liquid	Liquidify	f	\N	2023-05-24	2023-05-24
5bbac8b5-a5b3-4bc6-8d54-0db602ecf5e7	liquid-ksm	lksm	Liquid KSM	f	\N	2023-05-24	2023-05-24
e34cb9b9-90e4-4d1c-a8e2-73b1002d655b	liquidlock	lock	LiquidLock	f	\N	2023-05-24	2023-05-24
4899248d-a713-4136-a4ae-ef7a211ef8c5	liquid-mercury	merc	Liquid Mercury	f	\N	2023-05-24	2023-05-24
50520746-5f9a-4d20-b891-fba69b75c62a	liquid-staked-canto	scanto	Liquid Staked Canto	f	\N	2023-05-24	2023-05-24
f66bd389-5c14-42b5-9f06-c88c9d8d3284	liquid-staked-ethereum	lseth	Liquid Staked ETH	f	\N	2023-05-24	2023-05-24
39006eb4-f2d4-4a7a-bdb6-125dd7590c7a	liquid-staked-eth-index	lseth	Liquid Staked ETH Index	f	\N	2023-05-24	2023-05-24
613a6f27-5179-42eb-8c12-f2f8f29ac0fb	liquid-staking-crescent	bcre	Liquid Staking Crescent	f	\N	2023-05-24	2023-05-24
cc465df6-50a4-4c67-94fa-8f4df0c07785	liquid-staking-derivative	lsd	Liquid Staking Derivative	f	\N	2023-05-24	2023-05-24
67ba4aa8-fbd3-493e-928e-c17cbe9c68a6	liquid-staking-dot	ldot	Liquid Staking Dot	f	\N	2023-05-24	2023-05-24
a75ef7c7-38ab-4050-80e0-66009f3fac34	liquidus	liq	Liquidus	f	\N	2023-05-24	2023-05-24
275b6ecb-dcd9-419c-822e-f8efc685d5f0	liquify-network	liquify	Liquify Network	f	\N	2023-05-24	2023-05-24
e1b5deac-8631-40e2-8405-71848cf48f2b	liquity	lqty	Liquity	f	\N	2023-05-24	2023-05-24
4d18550e-b34f-4fbf-b567-53a341fe786d	liquity-usd	lusd	Liquity USD	f	\N	2023-05-24	2023-05-24
5d69f36b-0a4e-43e4-be89-0067688c2d50	liqwid-finance	lq	Liqwid Finance	f	\N	2023-05-24	2023-05-24
637e96a8-164a-4ae7-b69a-dec1e913e0e7	lisk	lsk	Lisk	f	\N	2023-05-24	2023-05-24
26e7c375-baa4-42e8-8867-13bd11717fcb	lit	lit	LIT	f	\N	2023-05-24	2023-05-24
c07dd49e-01f6-4cf9-b344-d8f7918df9a6	litebitcoin	lbtc	LiteBitcoin	f	\N	2023-05-24	2023-05-24
15dc052b-77a5-4424-b378-1f66da3be2c6	litecash	cash	Litecash	f	\N	2023-05-24	2023-05-24
30e9be3f-c492-432d-8298-4c1d710b3f6a	litecoin	ltc	Litecoin	f	\N	2023-05-24	2023-05-24
7e36bebe-a079-4596-a3d0-d4439fc720fb	litecoin-cash	lcc	Litecoin Cash	f	\N	2023-05-24	2023-05-24
fe1937bf-0644-4ed8-9bf8-fab5dc2f7e4a	litecoin-plus	spb	SpiderByte	f	\N	2023-05-24	2023-05-24
14d01a0e-9e8f-41bd-b21c-06ba89d04810	litecoin-ultra	ltcu	LiteCoin Ultra	f	\N	2023-05-24	2023-05-24
b4695b54-a4e5-4f30-b72f-af17a5550e7d	litecoinz	ltz	LitecoinZ	f	\N	2023-05-24	2023-05-24
a2776b87-f586-4797-8587-0c71d9d38e5b	litedoge	ldoge	LiteDoge	f	\N	2023-05-24	2023-05-24
950175ab-3706-4f17-81df-80f1e0e930b2	litentry	lit	Litentry	f	\N	2023-05-24	2023-05-24
81a8743d-3a88-4ba7-bf62-9128be51a0bd	litherium	lith	Litherium	f	\N	2023-05-24	2023-05-24
79bb9083-a88a-468e-8e67-bb07e622b52e	lithium-finance	lith	Lithium Finance	f	\N	2023-05-24	2023-05-24
f4a7071d-b407-4689-90ca-16ea208d102e	lithium-ventures	ions	Lithium Ventures	f	\N	2023-05-24	2023-05-24
28d19fd0-b19c-4850-8213-a5a5db438189	lithosphere	litho	Lithosphere	f	\N	2023-05-24	2023-05-24
5d5d792e-05d4-4e79-8012-0989fb486c37	litlab-games	litt	LitLab Games	f	\N	2023-05-24	2023-05-24
4834ed1f-b9ad-4438-82bd-0aff02fe2767	little-angry-bunny-v2	lab-v2	Little Angry Bunny v2	f	\N	2023-05-24	2023-05-24
7f46bed6-7d0d-4836-b26c-9af5e11dac0c	little-bunny-rocket	lbr	Little Bunny Rocket	f	\N	2023-05-24	2023-05-24
243cfc73-cfd0-4d17-8e44-3f82ca9ebf76	littleghosts-ectoplasm	ecto	LittleGhosts Ectoplasm	f	\N	2023-05-24	2023-05-24
f425d01b-b614-4931-b174-bcba3312550c	littleinu	linu	LittleInu	f	\N	2023-05-24	2023-05-24
f3c55716-8986-4cc4-ad58-07e7cdcbd331	little-rabbit-v2	ltrbt	Little Rabbit V2	f	\N	2023-05-24	2023-05-24
11550ead-0b10-4c51-85c9-0b481ffd94b2	little-ugly-duck	lud	Little Ugly Duck	f	\N	2023-05-24	2023-05-24
71847260-19d0-4749-a4de-fa8d4f2caa5d	litx	litx	Lith Token	f	\N	2023-05-24	2023-05-24
a3d0a63e-0ed7-4fca-b723-3dae5477a79c	liux	liux	LIUX	f	\N	2023-05-24	2023-05-24
f2047c25-f83c-4b4c-b361-0b6a18db3340	livegreen-coin	lgc	LiveGreen Coin	f	\N	2023-05-24	2023-05-24
d6d93c14-d134-4781-838e-541189aceb1d	livepeer	lpt	Livepeer	f	\N	2023-05-24	2023-05-24
ea5f938c-7b04-4ace-b776-95bbf9525680	lizardtoken-finance	liz	LizardToken.Finance	f	\N	2023-05-24	2023-05-24
9806d50e-9190-40a8-a8d8-9e80ad95054b	lnko-token	lnko	LNKO	f	\N	2023-05-24	2023-05-24
b9efaa6c-e2cf-42f1-af25-475195bd1088	loa-protocol	loa	LOA Protocol	f	\N	2023-05-24	2023-05-24
4c376c48-56d0-4caa-8c60-c5641c6b4834	lobster	$lobster	LOBSTER	f	\N	2023-05-24	2023-05-24
05b4a1c9-d519-43db-b0d8-b115d5915757	localcoinswap	lcs	LocalCoinSwap	f	\N	2023-05-24	2023-05-24
6dc6df23-285b-41c8-b2f4-1b52cf00d4ed	local-money	local	Local Money	f	\N	2023-05-24	2023-05-24
728221f5-e0a2-4abc-8be6-97c89a244949	localtrade	ltt	LocalTrade	f	\N	2023-05-24	2023-05-24
12de5d54-d566-4ad8-b56f-2a48284fccf1	local-traders	lct	Local Traders	f	\N	2023-05-24	2023-05-24
fcc38ed5-cf8e-42a5-88dc-e572cb863b9d	locgame	locg	LOCG	f	\N	2023-05-24	2023-05-24
1193a08f-3717-4a20-a6be-0329f4e5b3e7	lockchain	loc	LockTrip	f	\N	2023-05-24	2023-05-24
ee6d2bde-7e69-428a-9d52-2773ef53b461	locker-token	lkt	Locker Token	f	\N	2023-05-24	2023-05-24
46445313-2aff-42b8-8c7a-4b0612a24030	lockness	lkn	Lockness	f	\N	2023-05-24	2023-05-24
99b0f8cb-6937-4853-abfc-0c3ca23f2013	locus-chain	locus	Locus Chain	f	\N	2023-05-24	2023-05-24
794ed38a-d376-457d-b885-e7c34e6f968e	lodestar	lode	Lodestar	f	\N	2023-05-24	2023-05-24
b7bbbe14-1e27-4cd2-9e6f-d235efbdfd7d	lode-token	lode	LODE Token	f	\N	2023-05-24	2023-05-24
2d18f9ac-37c8-4072-a1e6-861cdff62f69	lofi	lofi	LOFI	f	\N	2023-05-24	2023-05-24
af1d8e1d-bbad-4138-91d0-c7ab9fa021da	logos	log	LOGOS	f	\N	2023-05-24	2023-05-24
93c911a5-4e50-4bca-ac7b-7af0980840eb	loki-network	oxen	Oxen	f	\N	2023-05-24	2023-05-24
f4e14e38-3630-448f-8374-dca252a89615	lokr	lkr	Lokr	f	\N	2023-05-24	2023-05-24
2d52c9bd-26d8-4c58-8038-463ef5d89988	lol	lol	LOL	f	\N	2023-05-24	2023-05-24
da9dc841-45ea-456e-b8e8-10dd335508d0	loltoken	lol	LOLTOKEN	f	\N	2023-05-24	2023-05-24
bf86dd26-fb89-4f2c-bab9-a1fc05cc3293	lonelyfans	lof	LonelyFans	f	\N	2023-05-24	2023-05-24
e7b600bf-c5a8-487f-bf7a-00e62c3373c6	lookscoin	look	LooksCoin	f	\N	2023-05-24	2023-05-24
c282db94-ace5-4759-b9da-7fc260a8d03f	looksrare	looks	LooksRare	f	\N	2023-05-24	2023-05-24
e1e1c940-650b-437d-bb2d-eab0beafd931	loom-network	loomold	Loom Network (OLD)	f	\N	2023-05-24	2023-05-24
3f6eb200-f893-4e5e-ac17-e2e1e1e2bb62	loom-network-new	loom	Loom Network (NEW)	f	\N	2023-05-24	2023-05-24
e23d1b0c-27ff-41de-bb5f-d424de715769	loon-network	loon	Loon Network	f	\N	2023-05-24	2023-05-24
c3e90825-54fa-4726-b658-928cd10406c6	loop	loop	LOOP	f	\N	2023-05-24	2023-05-24
84f9915f-3d3f-4100-b695-3f99b9a7d660	loopnetwork	loop	LoopNetwork	f	\N	2023-05-24	2023-05-24
0af3da93-4ab3-4301-ba9b-9e15dbd11b23	loopring	lrc	Loopring	f	\N	2023-05-24	2023-05-24
3cc2f664-8193-4df4-a348-fc451cf5b133	loopswap	lswap	LoopSwap	f	\N	2023-05-24	2023-05-24
0b5d1be9-7b66-4a25-8576-4a628cf05ada	loot	loot	Lootex	f	\N	2023-05-24	2023-05-24
d70a4dfc-7627-4442-9581-e8fbab18c5c7	loot-token	loot	Loot	f	\N	2023-05-24	2023-05-24
1bfd1ed1-c112-4d77-920e-e71d89db7384	lopo	lopo	LOPO	f	\N	2023-05-24	2023-05-24
76517ca0-21ec-48aa-a752-4530bf9e0fdc	lord-of-dragons	logt	Lord of Dragons	f	\N	2023-05-24	2023-05-24
101d9a63-ce24-4ed7-bf08-0c395c3b7e29	lord-of-power-golden-eagle	gde	Lord of Power Golden Eagle	f	\N	2023-05-24	2023-05-24
35c2b84c-645d-4bb3-9d87-8a6da9560949	lords	lords	LORDS	f	\N	2023-05-24	2023-05-24
a15f4496-6700-4cf3-87ca-5af9829d39fa	lordtoken	ltt	LordToken	f	\N	2023-05-24	2023-05-24
aa60f4a7-2545-4978-b9f9-3b1843a1cc1e	loserchick-egg	egg	LoserChick EGG	f	\N	2023-05-24	2023-05-24
b954975a-19ee-4b53-b191-aacc2ed83304	loser-coin	lowb	Loser Coin	f	\N	2023-05-24	2023-05-24
5269291d-fc85-48ab-badc-1e8eb3352df3	lossless	lss	Lossless	f	\N	2023-05-24	2023-05-24
b0c1b978-4d96-48ea-b4c8-5d3d29f2a33f	lost-world	lost	Lost World	f	\N	2023-05-24	2023-05-24
dbb90aec-4582-4681-8926-9e6b0ef840dd	lotto-arbitrum	lotto	Lotto Arbitrum	f	\N	2023-05-24	2023-05-24
a49358cc-56e5-4ab2-9f56-18eb0a1228f5	lot-trade	lott	LOT.TRADE	f	\N	2023-05-24	2023-05-24
f6654765-dceb-421a-afcf-10783a3e2d13	loud-market	loud	Loud Market	f	\N	2023-05-24	2023-05-24
5772cc73-a062-4a09-837f-ab5bc7cc8c92	loungem	lzm	LoungeM	f	\N	2023-05-24	2023-05-24
15a9a587-839f-4d2a-aa3f-9f28dd069c8e	lovechain	lov	LoveChain	f	\N	2023-05-24	2023-05-24
a2cdddf3-138f-4c38-ad82-411c909deb6f	love-hate-inu	lhinu	Love Hate Inu	f	\N	2023-05-24	2023-05-24
be08cbe8-e715-4cfd-a57c-3ac7f20eda8b	lovelace-world	lace	Lovelace World	f	\N	2023-05-24	2023-05-24
8cd06b20-c1d6-4b40-b2e6-f504da1d0952	lovely-inu-finance	lovely	Lovely Inu finance	f	\N	2023-05-24	2023-05-24
387a1522-99a4-4a7a-af17-62df901e5566	lovely-swap-token	lst	Lovely Swap	f	\N	2023-05-24	2023-05-24
d8cc7cbb-0396-42d1-ae6b-0b50d076a828	lovepot-token	love	LovePot	f	\N	2023-05-24	2023-05-24
0b80643d-3a53-4465-91ab-209c09893cea	lox-network	lox	Lox Network	f	\N	2023-05-24	2023-05-24
d8cac991-246f-4339-91d7-f5134194156d	lp-3pool-curve	3crv	LP 3pool Curve	f	\N	2023-05-24	2023-05-24
26dd97b9-7eeb-43b3-882f-2c943452f86e	lp-finance	lpfi	LP Finance DAO	f	\N	2023-05-24	2023-05-24
5f421cc8-abfa-4f59-be1a-e953a168b4f0	lp-renbtc-curve	renbtccurve	LP renBTC Curve	f	\N	2023-05-24	2023-05-24
bb9ac9ff-0f7e-45c3-bab3-dc97423e239b	lp-scurve	scurve	LP-sCurve	f	\N	2023-05-24	2023-05-24
69d12665-bec5-4d69-ad90-72c3e7efce21	ls-coin	lsc	LS Coin	f	\N	2023-05-24	2023-05-24
57c88b74-7ae1-4eb1-93e2-fbe1ca403f8d	lsdoge	lsdoge	LSDoge	f	\N	2023-05-24	2023-05-24
376efecc-f055-4eaf-8faf-d2f1800ff002	lsdx-finance	lsd	LSDx Finance	f	\N	2023-05-24	2023-05-24
827d641f-0e93-40c1-ab7d-9d87395f40fb	lsdx-pool	ethx	LSDx Pool	f	\N	2023-05-24	2023-05-24
57e5e97e-ae3f-44db-85dd-a8d756bf4b75	lto-network	lto	LTO Network	f	\N	2023-05-24	2023-05-24
91209023-3a3b-4200-b738-35a5d7ff5e23	ltradex	ltex	Ltradex	f	\N	2023-05-24	2023-05-24
bebc30ee-940f-4e54-8674-37db8a022f5f	lua-token	lua	LuaSwap	f	\N	2023-05-24	2023-05-24
6e513f4d-c125-4d34-9124-865907cc14e7	luca	luca	LUCA	f	\N	2023-05-24	2023-05-24
961aa642-6b83-4915-972f-32cdaf3b8a7d	lucha	lucha	Lucha	f	\N	2023-05-24	2023-05-24
c99a2483-6e3e-4c6f-b6af-dfba56d37335	lucidao	lcd	Lucidao	f	\N	2023-05-24	2023-05-24
818eab96-fb3f-4dd8-b5d0-2a61699f0748	luck2earn	luck	Luck2Earn	f	\N	2023-05-24	2023-05-24
7f0fed0a-7b83-49fd-9452-8ffd1db10d67	lucky-block	lblock	Lucky Block	f	\N	2023-05-24	2023-05-24
59099be7-610d-4876-8f8f-c5821b55d202	lucky-cats	katz	Lucky Cats	f	\N	2023-05-24	2023-05-24
ba92e7da-e210-48c8-8a96-a1cd00062a8b	lucky-lion	lucky	Lucky Lion	f	\N	2023-05-24	2023-05-24
3aa7e60b-52b0-4ce2-a0d3-78971b0749e4	lucky-property-development-invest	lpdi	Lucky Property Development Invest	f	\N	2023-05-24	2023-05-24
ba99a893-ab7a-4f1f-a1fa-289e1a57b68a	lucky-roo	roo	Lucky Roo	f	\N	2023-05-24	2023-05-24
55975be2-2cf2-4c1e-ade2-40ec74f8b8c2	luckytoad	toad	LuckyToad	f	\N	2023-05-24	2023-05-24
a78a1d88-ac5d-41ce-9a9b-056c443c1c0f	lucretius	luc	Lucretius	f	\N	2023-05-24	2023-05-24
35df19fa-bbbe-43d8-b628-3b5a7177994e	lucro	lcr	Lucro	f	\N	2023-05-24	2023-05-24
5803d625-4c86-4f55-8b12-808ed8ecd7df	lucrosus-capital	$luca	Lucrosus Capital	f	\N	2023-05-24	2023-05-24
26881589-c591-451a-b2c4-9eb151b88931	ludena-protocol	ldn	Ludena Protocol	f	\N	2023-05-24	2023-05-24
4a073e7b-3371-42ef-9f35-d88e635b27e7	ludos	lud	Ludos Protocol	f	\N	2023-05-24	2023-05-24
d723365d-7ed5-4575-b4f9-20a5e53e08d0	luffy-inu	luffy	Luffy	f	\N	2023-05-24	2023-05-24
0b14f155-8466-4e8a-b6ca-8be2ec374d5c	lukso-token	lyxe	LUKSO	f	\N	2023-05-24	2023-05-24
8b1d06e4-fd00-4149-aac8-3be187b41d0b	lulu-market-luck	luck	LULU Market Luck	f	\N	2023-05-24	2023-05-24
897a46c9-3de4-4c7c-bf6e-e4f56335ef89	lumenswap	lsp	Lumenswap	f	\N	2023-05-24	2023-05-24
6a1353be-5bac-472a-b01b-47da261787be	lumerin	lmr	Lumerin	f	\N	2023-05-24	2023-05-24
825625ed-26ce-4022-8245-539cc58a905c	lumi	lumi	LUMI	f	\N	2023-05-24	2023-05-24
8e526e9a-5e43-468c-932f-5e803a1d2537	lumi-credits	lumi	LUMI Credits	f	\N	2023-05-24	2023-05-24
47f0e404-0c11-4857-bb25-c45ed4042265	lumiiitoken	lumiii	Lumiii	f	\N	2023-05-24	2023-05-24
7d8e0ef7-373a-427d-a553-98387c41eace	lum-network	lum	Lum Network	f	\N	2023-05-24	2023-05-24
7abd66be-8966-4bc2-a815-622890de1455	lunachow	luchow	LunaChow	f	\N	2023-05-24	2023-05-24
31f22a9a-6eb3-40c4-bc3b-ab103aeffff2	lunadoge	loge	LunaDoge	f	\N	2023-05-24	2023-05-24
110c4c6e-5768-43ae-a31d-0a420114159a	lunafi	lfi	Lunafi	f	\N	2023-05-24	2023-05-24
66afe2dd-d269-4110-bd33-21bb91a473c9	lunagens	lung	LunaGens	f	\N	2023-05-24	2023-05-24
ebc96a42-f14b-485b-ae95-e4711b1c8aaf	luna-inu	linu	Luna Inu	f	\N	2023-05-24	2023-05-24
1db994dd-a196-4c6c-ba38-10507c5d624b	lunaone	xln	LunaOne	f	\N	2023-05-24	2023-05-24
6d853bb1-3131-44e3-aaaa-4fad95e4e684	lunar	lnr	Lunar [OLD]	f	\N	2023-05-24	2023-05-24
083a9dff-ccf7-406f-80e6-2b3fff677573	lunar-2	lnr	Lunar	f	\N	2023-05-24	2023-05-24
48ede76c-152d-43b1-8c54-df689d79687e	luna-rush	lus	Luna Rush	f	\N	2023-05-24	2023-05-24
db17ab1d-ef73-4678-82a6-0b95f55674a0	lunatics	lunat	Lunatics	f	\N	2023-05-24	2023-05-24
4f89cbb7-8adc-44fe-a6a3-09b133deb4bb	lunatics-eth	lunat	Lunatics [ETH]	f	\N	2023-05-24	2023-05-24
4c58a418-4a49-49ff-a07f-7c295bafe6b5	luna-wormhole	lunc	Terra Classic (Wormhole)	f	\N	2023-05-24	2023-05-24
ba79e568-1162-4344-8d80-7125206bc838	lunax	lunax	Stader LunaX	f	\N	2023-05-24	2023-05-24
14d401a5-af50-4bd9-a4d3-507da9ac3272	lunchdao	lunch	LunchDAO	f	\N	2023-05-24	2023-05-24
0b83cc09-6a32-4a33-bbc5-bcd7be93bd17	lunch-money	lmy	Lunch Money	f	\N	2023-05-24	2023-05-24
5eabe444-ac2e-470c-a201-b1979af91c3d	lunes	lunes	Lunes	f	\N	2023-05-24	2023-05-24
d753c9c8-d261-4aaa-941d-6dca24f6d1ca	lunr-token	lunr	Lunr	f	\N	2023-05-24	2023-05-24
58fb59fd-7ccf-43c7-934e-87d683e2f4f7	lunyr	lun	Lunyr	f	\N	2023-05-24	2023-05-24
7f838bfc-5b43-49fa-bcaf-c89f6ae13bdb	lusd	lusd	LUSD	f	\N	2023-05-24	2023-05-24
cc2d5e0b-bed5-4940-b39d-54f469a5a453	lusd3crv-f	lusd3crv	LUSD3CRV-f	f	\N	2023-05-24	2023-05-24
565c46c9-ff0a-4f9e-815e-b890652d1b22	lusd-yvault	yvlusd	LUSD yVault	f	\N	2023-05-24	2023-05-24
d6d6c2b9-a88d-4908-bc25-b811932187ae	lux-bio-exchange-coin	lbxc	LUX BIO EXCHANGE COIN	f	\N	2023-05-24	2023-05-24
689a9094-8953-4f2a-abe7-a9a5f9efb196	luxcoin	lux	LUXCoin	f	\N	2023-05-24	2023-05-24
1308e12b-df93-4196-95f1-8db0adb3ecdf	luxo	luxo	Luxo	f	\N	2023-05-24	2023-05-24
a9ed7c62-a607-4622-a9ba-0783de0aaff7	luxor	lux	Luxor	f	\N	2023-05-24	2023-05-24
e77da290-e170-4d77-982f-6227eee98b09	luxurious-pro-network-token	lpnt	Luxurious Pro Network	f	\N	2023-05-24	2023-05-24
2dfeb3c6-6c69-42b5-8837-07adc97f30c8	luxy	luxy	Luxy	f	\N	2023-05-24	2023-05-24
7e166ca5-5362-45fa-b26e-a69de6ac7a78	lvusd	lvusd	lvUSD	f	\N	2023-05-24	2023-05-24
a2e24c3d-7ea9-4a1b-a738-22abe00e4017	lybra-finance	lbr	Lybra Finance	f	\N	2023-05-24	2023-05-24
30aee40f-30d4-4eef-913f-cdd85339a123	lydia-finance	lyd	Lydia Finance	f	\N	2023-05-24	2023-05-24
7e6be8fd-c17d-4c4d-aff7-646dba681ce5	lyfe-2	lyfe	Lyfe	f	\N	2023-05-24	2023-05-24
de541a45-f2a3-4ba5-9b7d-14c5c05f3a32	lyfebloc	lbt	Lyfebloc	f	\N	2023-05-24	2023-05-24
b8fd451e-7984-4011-9161-31c8f81fa467	lyfe-gold	lgold	Lyfe Gold	f	\N	2023-05-24	2023-05-24
99517737-da9d-40e0-b123-bfca7f82271e	lyfe-silver	lsilver	Lyfe Silver	f	\N	2023-05-24	2023-05-24
62873fb5-a50c-422f-a1d4-055e02d83ddc	lympo	lym	Lympo	f	\N	2023-05-24	2023-05-24
6a1d702c-4fef-413c-925d-d5775452b328	lympo-market-token	lmt	Lympo Market	f	\N	2023-05-24	2023-05-24
7ad935b5-8220-433a-bca4-34071acb7b07	lynkey	lynk	LynKey	f	\N	2023-05-24	2023-05-24
2575d1e6-1fb2-4960-acb6-160c0c133184	lynx	lynx	Lynx	f	\N	2023-05-24	2023-05-24
e35da69b-558b-4e4d-a234-f8683e5534da	lyocredit	lyo	LYO Credit	f	\N	2023-05-24	2023-05-24
2170bf47-dd0d-4b37-b621-2d3fcff71bc8	lyptus-token	lyptus	Lyptus	f	\N	2023-05-24	2023-05-24
0f3b40ad-2883-46a7-ac39-fa6c2c1b3665	lyra	lyr	Lyra	f	\N	2023-05-24	2023-05-24
a8002c0c-f0df-41dd-a094-659bf98ca101	lyra-finance	lyra	Lyra Finance	f	\N	2023-05-24	2023-05-24
80750258-83d8-4797-8885-26df242e106e	m	m	M	f	\N	2023-05-24	2023-05-24
32dd92d3-e37a-45cb-97a1-1da9ba88d0d7	m2	m2	M2	f	\N	2023-05-24	2023-05-24
6e12c757-e3b1-4fdb-9fed-83d2eb45dcde	macaronswap	mcrn	MacaronSwap	f	\N	2023-05-24	2023-05-24
26966a3e-55e2-4e04-88b1-b7c7635d9eee	machinecoin	mac	Machinecoin	f	\N	2023-05-24	2023-05-24
0c41dd47-dd7c-4a1b-8a9c-64a0c6d67dfd	madagascar-token	$time	Madagascar	f	\N	2023-05-24	2023-05-24
6c60bd5b-f437-4624-932d-0378aa349c34	madai	madai	Morpho-Aave Dai Stablecoin	f	\N	2023-05-24	2023-05-24
3772ad94-07f4-4701-b112-3ccf85258972	mad-bucks	mad	MAD Bucks	f	\N	2023-05-24	2023-05-24
08af5015-b9f0-4e7d-a8b2-3f81fb086ac5	made-in-real-life	mirl	Made In Real Life	f	\N	2023-05-24	2023-05-24
8c89b661-43b1-4016-bdfc-78fe515f6710	mad-hatter-society	madhat	Mad Hatter Society	f	\N	2023-05-24	2023-05-24
d9398206-7bde-4b6c-9d73-4f8e05c14e71	mad-meerkat-etf	metf	Mad Meerkat ETF	f	\N	2023-05-24	2023-05-24
0d54c8b7-f0ab-49a0-a001-03d3da1838d3	mad-meerkat-optimizer	mmo	Mad Meerkat Optimizer	f	\N	2023-05-24	2023-05-24
e9f1bf92-2f44-4ad6-a714-e4fc72c4c1b2	mad-meerkat-optimizer-polygon	mmo	Mad Meerkat Optimizer (Polygon)	f	\N	2023-05-24	2023-05-24
3e41821d-3812-4009-9619-f84dc31da647	mad-network	mad	MADNetwork	f	\N	2023-05-24	2023-05-24
318cecf0-5647-4e73-8401-6ef4ce15e70d	mad-usd	musd	Mad USD	f	\N	2023-05-24	2023-05-24
eaf0c679-436d-4591-9860-0623ae1dd320	mad-viking-games-token	mvg	Mad Viking Games Token	f	\N	2023-05-24	2023-05-24
588b47b0-d726-48c5-bba3-a31eab0a6e7b	madworld	umad	MADworld	f	\N	2023-05-24	2023-05-24
c64376f0-1a93-4de8-b6c0-e360c360e15c	magic	magic	Magic	f	\N	2023-05-24	2023-05-24
bbea24b8-a713-4c31-a7fe-b3c8b6618a87	magic-bag	felix	Magic Bag	f	\N	2023-05-24	2023-05-24
862c9e01-6816-4e0f-ae21-8285c7b28818	magic-beasties	bsts	Magic Beasties	f	\N	2023-05-24	2023-05-24
a0c344ea-3103-4403-ac42-c5dc97528929	magiccraft	mcrt	MagicCraft	f	\N	2023-05-24	2023-05-24
87ad9f00-ebd9-4abb-a2d4-49dcd3f99b19	magic-cube	mcc	Magic Cube Coin	f	\N	2023-05-24	2023-05-24
c6d31ad4-89c3-44a9-8a46-65eb6a29b0a3	magicdoge	magicdoge	MagicDOGE	f	\N	2023-05-24	2023-05-24
5e02457f-54ac-4563-93df-20060caee0aa	magicglp	magicglp	MagicGLP	f	\N	2023-05-24	2023-05-24
7ddfc5a9-f041-45ec-a0aa-6ce8f395dea4	magic-internet-money	mim	Magic Internet Money	f	\N	2023-05-24	2023-05-24
5e6a3c73-6a46-4b8a-8a32-854e9a1be38a	magic-oi-money	mom	Magic Oi! Money	f	\N	2023-05-24	2023-05-24
9f99dda9-ae0e-4685-9e47-3a368d6ed285	magic-power	mgp	Magic Power	f	\N	2023-05-24	2023-05-24
3fad7439-0fca-4d06-86ca-86a26855c9a1	magic-token	magic	MagicLand	f	\N	2023-05-24	2023-05-24
7dce4c57-ef81-491b-8fc7-2f0180c5acf3	magic-yearn-share	mys	Magic Yearn Share	f	\N	2023-05-24	2023-05-24
4593fa89-fc7d-4ed4-8dc3-5218b2545500	magik	magik	Magik	f	\N	2023-05-24	2023-05-24
961518bf-a20b-4db9-af1c-f75460a2769b	magikal-ai	mgkl	MAGIKAL.ai	f	\N	2023-05-24	2023-05-24
b8bd8906-c42a-4904-8790-a9f1d5881b56	magnetgold	mtg	MagnetGold	f	\N	2023-05-24	2023-05-24
b10da849-9bb9-4fd6-8208-41c1f63934e8	magpie	mgp	Magpie	f	\N	2023-05-24	2023-05-24
41fc0f2b-256d-4064-a0da-c9eba93a6d53	magpie-wom	mwom	Magpie WOM	f	\N	2023-05-24	2023-05-24
e0150283-8ae9-478d-97de-64072f5517a0	mahadao	maha	MahaDAO	f	\N	2023-05-24	2023-05-24
3e3e54c6-40e8-4b6c-944d-bd95a406d84d	maia	maia	Maia	f	\N	2023-05-24	2023-05-24
a3b6187c-a8e5-4dea-8fbd-8db0c0842ecc	maiar-dex	mex	xExchange	f	\N	2023-05-24	2023-05-24
135ac205-24a8-43d1-a3a0-24336f4ea2f2	maidcoin	$maid	MaidCoin	f	\N	2023-05-24	2023-05-24
eb0e8ef3-9d4c-4817-a36b-6a32c2366ece	maidsafecoin	emaid	MaidSafeCoin	f	\N	2023-05-24	2023-05-24
7f1b3ddd-868e-4b44-aaa4-abca54561707	maidsafecoin-token	maid	Maidsafecoin Token	f	\N	2023-05-24	2023-05-24
bf6a814b-e773-4456-86ce-6ac96ecc0f06	main	main	Main	f	\N	2023-05-24	2023-05-24
4eae8861-f06d-4bfb-8237-578532a1e114	mainframe	mft	Hifi Finance [OLD]	f	\N	2023-05-24	2023-05-24
f3e4c6cb-37ca-427f-a6ea-ac1277adc2dd	mainstream-for-the-underground	mftu	Mainstream For The Underground	f	\N	2023-05-24	2023-05-24
4d60b78f-671f-444b-8abe-0005d40571e6	maker	mkr	Maker	f	\N	2023-05-24	2023-05-24
dc06034a-719d-462d-aa29-cf23cd558d0a	makiswap	maki	MakiSwap	f	\N	2023-05-24	2023-05-24
aa085a05-7ee0-4a49-9664-3e1ab97c712d	malgo-finance	mgxg	Malgo Finance	f	\N	2023-05-24	2023-05-24
2b086883-755f-46f2-abf7-162b13d90200	malinka	mlnk	Malinka	f	\N	2023-05-24	2023-05-24
195009fa-4466-4dea-ba20-9df7fd172558	mammoth-mmt	mmt	Mammoth MMT	f	\N	2023-05-24	2023-05-24
fa38430c-6149-465b-a28a-9ca4c9a016fb	manateecoin	mtc	ManateeCoin	f	\N	2023-05-24	2023-05-24
b0e92f12-ae81-451c-9bec-73c0211f2011	manchester-city-fan-token	city	Manchester City Fan Token	f	\N	2023-05-24	2023-05-24
825778f0-3766-4662-80b7-4f28e128db00	mancium	manc	Mancium	f	\N	2023-05-24	2023-05-24
e241b813-2ac2-4429-bb59-0ac17b2790ed	mandala-exchange-token	mdx	Mandala Exchange	f	\N	2023-05-24	2023-05-24
554ed405-8607-4e6c-9caa-6f4ed782164d	mandox-2	mandox	MandoX	f	\N	2023-05-24	2023-05-24
7b8fb1e0-d9da-46e1-9916-66ee873f5d34	maneki-neko	neki	Maneki-neko	f	\N	2023-05-24	2023-05-24
cdd0c605-eff7-4829-b629-9e95d3461086	manga-token	$manga	Manga	f	\N	2023-05-24	2023-05-24
ba59ae53-1aef-43a5-8b3f-2fcb7c92a28f	mangoman-intelligent	mmit	MangoMan Intelligent	f	\N	2023-05-24	2023-05-24
096fd8e8-383b-4d90-8a89-85d3c885bd26	mango-markets	mngo	Mango	f	\N	2023-05-24	2023-05-24
3bb4a97f-39df-40b2-9698-5646cfc2cc05	manifold-finance	fold	Manifold Finance	f	\N	2023-05-24	2023-05-24
165bc977-55ab-4c26-ab7f-4e7182b299da	manna	manna	Manna	f	\N	2023-05-24	2023-05-24
6625855d-de24-4ade-804f-db0806dccb9e	mantadao	mnta	MantaDAO	f	\N	2023-05-24	2023-05-24
26cca19d-271c-47e2-98e8-b53b02085b9c	mantis-network	mntis	Mantis Network	f	\N	2023-05-24	2023-05-24
dea32948-5177-4f8e-8d16-4e0eefd3c899	mantra-dao	om	MANTRA	f	\N	2023-05-24	2023-05-24
7b5b26d3-65a3-4ae2-a205-9ea115fc043f	manufactory-2	mnft	ManuFactory	f	\N	2023-05-24	2023-05-24
dee730c2-10bf-428a-9414-bdba0fcd5157	maorabbit	maorabbit	MaoRabbit	f	\N	2023-05-24	2023-05-24
74bc80e4-faab-4010-9d03-1b008903ee18	maple	mpl	Maple	f	\N	2023-05-24	2023-05-24
51e0a31d-bb1f-459a-bbd7-a9ab7acf91a7	mapmetrics	mmaps	MapMetrics	f	\N	2023-05-24	2023-05-24
2649ad92-e46d-46c0-b8de-5f5cb188a14f	maps	maps	MAPS	f	\N	2023-05-24	2023-05-24
750cfd3a-0fcb-4c9c-8e4c-43f2d2ceb6f5	maranbet	maran	MaranBet	f	\N	2023-05-24	2023-05-24
a3409658-ff77-42be-9e98-dc60aa68ad34	marble	$marble	Marble Dao	f	\N	2023-05-24	2023-05-24
0c0db9a8-5340-4b5b-b762-491fdffd19b2	marbledao-artex	artex	MarbleDAO ARTEX	f	\N	2023-05-24	2023-05-24
a7aa7895-ee93-4918-8a10-51467e2976ba	marbleprix	marblex7	MarblePrix	f	\N	2023-05-24	2023-05-24
84ad3c92-e8b7-4777-962b-4c5acab8365a	marblex	mbx	Marblex	f	\N	2023-05-24	2023-05-24
f302a6ed-28df-4d91-b1ec-600b5bb0deeb	marcopolo	map	MAP Protocol	f	\N	2023-05-24	2023-05-24
45867116-fc94-4278-bd64-adbd48fe6eeb	mare-finance	mare	Mare Finance	f	\N	2023-05-24	2023-05-24
97662177-5451-423c-afe6-e0475436c311	marginswap	mfi	Marginswap	f	\N	2023-05-24	2023-05-24
7beca962-ebd1-4224-8598-894d962c41bc	marhabadefi	mrhb	MarhabaDeFi	f	\N	2023-05-24	2023-05-24
1aed5ec3-6d9f-4dac-8cec-38fe73009dd7	maria	maria	Maria	f	\N	2023-05-24	2023-05-24
76b71cdc-1a45-4ccb-807c-400d261aa5ac	maricoin	mcoin	MariCoin	f	\N	2023-05-24	2023-05-24
8b83aff7-47e3-4522-b016-2fca07d71f31	marinade	mnde	Marinade	f	\N	2023-05-24	2023-05-24
3f88b002-634d-4da3-a8d9-05cefbc413de	market-making-pro	mmpro	Market Making Pro	f	\N	2023-05-24	2023-05-24
c5b25a69-ba6f-439f-8013-af399444a25f	marketmove	move	MarketMove	f	\N	2023-05-24	2023-05-24
5200becd-0607-4cd2-a81a-76b52cb91c18	marketpeak	peak	PEAKDEFI	f	\N	2023-05-24	2023-05-24
43a3fe6b-08c9-4f62-9683-e681faf938ae	marketviz	viz	MARKETVIZ	f	\N	2023-05-24	2023-05-24
40bf659b-c1cc-4502-a3a7-557abd7b2e5e	marlin	pond	Marlin	f	\N	2023-05-24	2023-05-24
4c081916-b12c-4256-a229-1ad26ae74c89	marmalade-token	mard	Marmalade Token	f	\N	2023-05-24	2023-05-24
009f6d4b-48ce-4758-a93d-7fe73d1dd12b	marnotaur	taur	Marnotaur	f	\N	2023-05-24	2023-05-24
59c4975e-c6bb-47be-a51b-141603f7a4e1	marquee	marq	Marquee	f	\N	2023-05-24	2023-05-24
663faec9-66d9-44a3-b824-b07e73248f56	mars	mars	Mars	f	\N	2023-05-24	2023-05-24
ec599b1d-2f8e-481a-a098-ddbe04b1420f	mars4	mars4	MARS4	f	\N	2023-05-24	2023-05-24
24bfc81f-f931-401d-8386-edba921581e2	marscoin	mars	Marscoin	f	\N	2023-05-24	2023-05-24
c4c47cbb-128a-401f-8230-068e5256c64b	marscolony	clny	MarsColony	f	\N	2023-05-24	2023-05-24
f20f3123-4b77-4f7a-b8c6-11a9fc785ccc	marsdao	mdao	MarsDAO	f	\N	2023-05-24	2023-05-24
fcfd7656-0b2f-40d8-9435-e192307e2f64	mars-ecosystem-token	xms	Mars Ecosystem	f	\N	2023-05-24	2023-05-24
4896728a-7afc-41b8-b712-fe6086b697a1	marshall-fighting-champio	mfc	Marshall Fighting Championship	f	\N	2023-05-24	2023-05-24
2e823fba-5c6e-4076-98f6-4455e49fb99d	marshall-rogan-inu	mri	Marshall Inu	f	\N	2023-05-24	2023-05-24
697f2670-e1e3-45ce-8bb3-bf62d46c2f77	mars-inu	marsinu	Mars Inu	f	\N	2023-05-24	2023-05-24
66c27f55-36d4-4995-86b4-69a8804d3d0b	mute	mute	Mute	f	\N	2023-05-24	2023-05-24
1b75e725-442d-4dd1-becb-3b935076dacf	mars-protocol-a7fcbcfb-fd61-4017-92f0-7ee9f9cc6da3	mars	Mars Protocol	f	\N	2023-05-24	2023-05-24
fd9c4d84-5cd9-4739-a9eb-5b5b5d95f14a	marsrise	marsrise	MarsRise	f	\N	2023-05-24	2023-05-24
b913ea26-016d-4b95-888a-73a30ff1cd3c	martexcoin	mxt	MarteXcoin	f	\N	2023-05-24	2023-05-24
f9f0c960-e2b0-4871-94db-1207d3f1c2e0	martik	mtk	Martik	f	\N	2023-05-24	2023-05-24
84905a5f-66b8-4e27-bb53-6b766557cbcf	martin-shkreli-inu	msi	Martin Shkreli Inu	f	\N	2023-05-24	2023-05-24
26f21b06-a839-45eb-8997-c5bce31993bd	martkist	martk	Martkist	f	\N	2023-05-24	2023-05-24
affbbde8-c20f-417a-874f-d2cea8630179	marumarunft	maru	marumaruNFT	f	\N	2023-05-24	2023-05-24
2ff224f9-278a-43e2-b1fb-5d09fb47b8b3	marutaro	maru	MaruTaro	f	\N	2023-05-24	2023-05-24
2c37a0d3-a447-45ee-94d0-b9de41f34e9b	marvellex-classic	mlxc	Marvellex Classic	f	\N	2023-05-24	2023-05-24
786984e9-2d7e-452d-9836-2d8a7dd9591a	marvelous-nfts	mnft	Marvelous NFTs	f	\N	2023-05-24	2023-05-24
88e4d23e-e772-454f-8d6c-0d13a3fee187	marvin-inu	marvin	Marvin Inu	f	\N	2023-05-24	2023-05-24
24706241-2bf8-4ba5-9ea4-cd1e216733ee	marx	marx	MarX	f	\N	2023-05-24	2023-05-24
a973ee3d-3fed-4ac0-914c-90f98f108994	masari	msr	Masari	f	\N	2023-05-24	2023-05-24
b7d98c37-f617-4c25-aacd-f2d4c67078b0	mask-network	mask	Mask Network	f	\N	2023-05-24	2023-05-24
71adf546-4045-46ab-9563-6038446bb492	masq	masq	MASQ	f	\N	2023-05-24	2023-05-24
e53822f4-f4c8-4442-8b91-169709f210fa	mass	mass	MASS	f	\N	2023-05-24	2023-05-24
f08cfe19-27bf-42cd-a65d-b483f9d61f40	massa	massa	Massa	f	\N	2023-05-24	2023-05-24
71821f5c-cdab-48a2-82f4-64d556048ac8	massive-protocol	mav	Massive Protocol	f	\N	2023-05-24	2023-05-24
8c1e7d41-57d7-4882-a2b7-b3f9e9315cbc	mass-vehicle-ledger	mvl	MVL	f	\N	2023-05-24	2023-05-24
edbabeca-434e-482f-8605-b287b1158200	master-ceo	mceo	Master CEO	f	\N	2023-05-24	2023-05-24
4e5f43a7-e195-4251-8db0-c810eb7ac268	mastermind	mastermind	Mastermind	f	\N	2023-05-24	2023-05-24
94d4680f-7576-4016-bbbc-800ee0473e35	masterwin	mw	MasterWin	f	\N	2023-05-24	2023-05-24
deec649c-c179-46f3-8623-c7e28875fe5d	mata	mata	Mata	f	\N	2023-05-24	2023-05-24
130fff6b-2e19-4187-aa1e-ee49b8304ceb	matchcup	match	Matchcup	f	\N	2023-05-24	2023-05-24
54a34acd-2ab2-491e-a013-f1e5f5b68109	matchnova-champion-coin	mcc	MatchNova Champion Coin	f	\N	2023-05-24	2023-05-24
6254bd3e-237f-40dc-a4f2-6305779a98e9	matchpool	gup	Guppy	f	\N	2023-05-24	2023-05-24
1f48b7d9-6c23-4287-aa4b-8fa83f29f75b	material	mtrl	Material	f	\N	2023-05-24	2023-05-24
dd372827-f496-4711-9406-9d064a776ab5	materium	mtrm	Materium	f	\N	2023-05-24	2023-05-24
65861410-ce73-4e66-91ab-9476c21ceca4	math	math	MATH	f	\N	2023-05-24	2023-05-24
230fc120-0620-4c63-ab34-b3ea17b11c40	matic-aave-aave	maaave	Matic Aave Interest Bearing AAVE	f	\N	2023-05-24	2023-05-24
36f19b7c-d826-4446-bf64-ddae99815e72	matic-aave-dai	madai	Matic Aave Interest Bearing DAI	f	\N	2023-05-24	2023-05-24
ff140af6-aca0-4403-b595-0d8b7dbc55d7	matic-aave-link	malink	Matic Aave Interest Bearing LINK	f	\N	2023-05-24	2023-05-24
95790849-78fc-4f01-b6f5-daf4e5ead35e	matic-aave-usdc	mausdc	Matic Aave Interest Bearing USDC	f	\N	2023-05-24	2023-05-24
33331edb-e82a-4fab-9742-72876bd5ec60	matic-aave-weth	maweth	Matic Aave Interest Bearing WETH	f	\N	2023-05-24	2023-05-24
42f8f6db-5d53-403f-898d-9450a6fe47fb	matic-dai-stablecoin	dai-matic	Matic DAI Stablecoin	f	\N	2023-05-24	2023-05-24
ea5467a9-b33c-440e-8214-a972bebf4e41	matic-launchpad	maticpad	Matic Launchpad	f	\N	2023-05-24	2023-05-24
d412e49b-21c9-4f5d-84ba-9bb68aa8e9ae	matic-network	matic	Polygon	f	\N	2023-05-24	2023-05-24
b45aeed1-dbee-40e3-9a98-8d19a8297405	matic-plenty-bridge	matic.e	MATIC (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
bbe9b432-1f40-429f-b08e-ec6e680a28fb	maticverse	mverse	MaticVerse	f	\N	2023-05-24	2023-05-24
f6ea8a40-9863-43cb-918d-cf9fd698d5eb	matic-wormhole	maticpo	MATIC (Wormhole)	f	\N	2023-05-24	2023-05-24
8dc68b30-42e3-4844-a2f9-fa4bc08cecf5	matrak-fan-token	mtrk	Matrak Fan Token	f	\N	2023-05-24	2023-05-24
e7fc94e1-01be-4977-b333-ad21efb7c9e6	matrix-533ba916-8d8a-4979-b5d5-34483cdee5b1	matrix	Matrix	f	\N	2023-05-24	2023-05-24
c97d31f1-c062-49e1-8735-85952f6b9683	matrix-ai-network	man	Matrix AI Network	f	\N	2023-05-24	2023-05-24
37746c1b-1390-4b99-a6ef-47dd89e95039	matrixetf	mdf	MatrixETF	f	\N	2023-05-24	2023-05-24
fc3a4c03-b3b1-4b48-b118-3d94313018bf	matrixgpt	mai	MatrixGPT	f	\N	2023-05-24	2023-05-24
3f734dc1-e65f-4131-8068-baa6be05bf58	matrix-protocol	mtx	Matrix Protocol	f	\N	2023-05-24	2023-05-24
aede245e-24b9-40fd-9f21-30bb8de23fca	matrixswap	matrix	Matrix Labs	f	\N	2023-05-24	2023-05-24
55c38113-22d2-4e11-bee4-039a782ce627	matsuswap	matsuswap	MatsuSwap	f	\N	2023-05-24	2023-05-24
976fc84b-abe7-4597-9f44-34b0a8cd1cef	mau	mau	MAU	f	\N	2023-05-24	2023-05-24
16a78e40-1dfe-42b7-b58c-1ee155ca4f3c	mausdc	mausdc	Morpho-Aave USD Coin	f	\N	2023-05-24	2023-05-24
b1c5e5dc-2d9f-4dab-8df0-4d543873ebad	mausdt	mausdt	Morpho-Aave Tether USD	f	\N	2023-05-24	2023-05-24
4a0414eb-4dc3-4cda-a3bd-b4e9e59d761c	mavaverse-token	mvx	Mavaverse	f	\N	2023-05-24	2023-05-24
e2ae9514-200d-4a4e-92a7-fba588e3f53f	maxcoin	max	Maxcoin	f	\N	2023-05-24	2023-05-24
f303a984-1f7a-48a5-915f-c92ffb2feb30	maximus	maxi	Maximus	f	\N	2023-05-24	2023-05-24
902a5239-4c86-41d1-a8b9-18252e1222f9	maximus-base	base	Maximus BASE	f	\N	2023-05-24	2023-05-24
efd19356-87d0-4a7b-8071-281350d08751	maximus-coin	mxz	Maximus Coin	f	\N	2023-05-24	2023-05-24
4f016dd6-a1e8-408a-b369-6709243d107b	maximus-dao	maxi	Maximus DAO	f	\N	2023-05-24	2023-05-24
e3ea6513-6a30-44fe-8eb3-7a007b09dd0d	maximus-deci	deci	Maximus DECI	f	\N	2023-05-24	2023-05-24
5ff8cb6d-074a-4f16-943d-32289e440e92	maximus-lucky	lucky	Maximus LUCKY	f	\N	2023-05-24	2023-05-24
8e5fd27e-bc5e-4322-9334-26a9cdcf2b76	maximus-team	team	Maximus TEAM	f	\N	2023-05-24	2023-05-24
77920f1a-d1d0-4252-b4da-f17f20927d86	maximus-trio	trio	Maximus TRIO	f	\N	2023-05-24	2023-05-24
c660e2c6-ad2b-4faa-8ad4-8470df587011	maxi-ordinals	maxi	MAXI (Ordinals)	f	\N	2023-05-24	2023-05-24
f9f1fb36-e8ef-4297-811d-1246d44db2dd	maxity	max	Maxity	f	\N	2023-05-24	2023-05-24
168ce1f3-b4c6-488d-ae2c-6e2cffb4b84e	max-property-group	mcf	Max Crowdfund	f	\N	2023-05-24	2023-05-24
b8b95a83-7f7a-4630-a82a-0eea8652b58a	max-revive	maxr	Max Revive	f	\N	2023-05-24	2023-05-24
34653454-a68a-4c75-8881-47dfe3eab2a4	max-token	max	MAX	f	\N	2023-05-24	2023-05-24
d7a37cc8-dff6-4993-8a09-2f13026ecab6	maxx	$maxx	Maxx	f	\N	2023-05-24	2023-05-24
105fba7a-68fb-4ae2-8ad3-60ba82102516	maxx-finance	maxx	MAXX Finance	f	\N	2023-05-24	2023-05-24
ea51025b-389a-45df-b3cd-f63c298c8298	maya-preferred-223	mayp	Maya Preferred	f	\N	2023-05-24	2023-05-24
3b39d82f-58d9-4445-89a4-d9059cf12ed1	mayc-vault-nftx	mayc	MAYC Vault (NFTX)	f	\N	2023-05-24	2023-05-24
411cdd5b-c8eb-4010-b0ad-0e42adaf3eb7	maza	mzc	Maza	f	\N	2023-05-24	2023-05-24
1789721b-b78d-4c44-b7f1-1a8093ddef20	mazimatic	mazi	MaziMatic	f	\N	2023-05-24	2023-05-24
653fd701-5d50-4192-b355-52f20fc24b57	mbd-financials	mbd	MBD Financials	f	\N	2023-05-24	2023-05-24
f1b5986d-f512-43a5-b04f-43417ba7370c	mbitbooks	mbit	MBitBooks	f	\N	2023-05-24	2023-05-24
99cdfddc-7c55-4f46-8fbf-ba3e5882a138	mcdex	mcb	MUX Protocol	f	\N	2023-05-24	2023-05-24
c1aa078a-9b89-4ac5-a08f-12ad2ffd3081	mcelo	mcelo	mCELO	f	\N	2023-05-24	2023-05-24
e53bb7f9-a5b9-4bbb-92a5-b9eee9cca156	mceur	mceur	mcEUR	f	\N	2023-05-24	2023-05-24
54c648ae-c69d-495f-994b-220a970c4b80	mcfinance	mcf	MCFinance	f	\N	2023-05-24	2023-05-24
86566fe3-6329-4970-baac-dbe3c55bc444	mch-coin	mchc	MCH Coin	f	\N	2023-05-24	2023-05-24
4f2b23af-d619-4557-9880-7ee319bfd359	mci-coin	cyclub	Cyclub	f	\N	2023-05-24	2023-05-24
60ca98cc-91b9-4de1-838a-8b935c730f7a	mclaren-f1-fan-token	mcl	McLaren F1 Fan Token	f	\N	2023-05-24	2023-05-24
97a50848-2e8e-4c84-86fd-7b0c9bc148e8	mcobit	mct	Mcobit	f	\N	2023-05-24	2023-05-24
8c90bb63-5f3d-426e-8492-161aa7632f91	mcoin1	mcoin	mCoin	f	\N	2023-05-24	2023-05-24
131011d0-d3d0-48b5-92d9-deae84bc9d77	mcontent	mcontent	MContent	f	\N	2023-05-24	2023-05-24
55658977-a1ce-44e9-87d1-bf404f0f164d	mcpepe-s	pepes	McPepe's	f	\N	2023-05-24	2023-05-24
f70e10ed-6189-48b0-bfa5-b93b152f0b52	mcverse	mcv	MCVERSE	f	\N	2023-05-24	2023-05-24
885d7697-cd74-4885-8fe1-06a3f0a96842	mdcx	mdcx	MDCx	f	\N	2023-05-24	2023-05-24
b4cff6f2-ea2c-4102-a0bf-0eb872bad064	mdex	mdx	Mdex (HECO)	f	\N	2023-05-24	2023-05-24
1ce2af2d-0340-4cd6-bfd5-b2f1d0e91a11	mdex-bsc	mdx	Mdex (BSC)	f	\N	2023-05-24	2023-05-24
722faed2-d5d5-4810-9b22-2a1678a7ae88	mdsquare	tmed	MDsquare	f	\N	2023-05-24	2023-05-24
865c5ee5-4f90-4f37-9e0c-aa56cd35feb7	meanfi	mean	Mean DAO	f	\N	2023-05-24	2023-05-24
31bc1bbc-25af-48c7-9a9b-300db7abc796	measurable-data-token	mdt	Measurable Data	f	\N	2023-05-24	2023-05-24
27719fd5-b425-4c66-86f4-569d9b0f4443	meblox-protocol	meb	Meblox Protocol	f	\N	2023-05-24	2023-05-24
5d09860a-4993-43f2-bf16-f2350c604702	mechachain	$mecha	Mechanium	f	\N	2023-05-24	2023-05-24
1aa55152-b6ab-42ca-8568-a344a2fd9e8b	mecha-morphing	mape	Mecha Morphing	f	\N	2023-05-24	2023-05-24
599f776c-dddd-42d7-89ee-46e566768c92	mechaverse	mc	Mechaverse	f	\N	2023-05-24	2023-05-24
e5cea189-f08e-4f52-aa99-3ca6665ac9b8	mech-master	mech	Mech Master	f	\N	2023-05-24	2023-05-24
6a339d70-354e-4cd3-9725-17e15534f570	meconcash	mch	Meconcash	f	\N	2023-05-24	2023-05-24
3fdc27ee-ab15-46c1-8bb5-f2f7db8ecdee	medal-of-honour	moh	Medal of Honour	f	\N	2023-05-24	2023-05-24
d864b2c5-60e8-4dad-abc2-0fb575de7c56	medamon	mon	Medamon	f	\N	2023-05-24	2023-05-24
cfbaedfb-1680-41e1-b9a1-d848845c6305	medcarecoin	mdcy	MedCareCoin	f	\N	2023-05-24	2023-05-24
82f90314-b441-47b6-a16d-e18aa498cbdc	media-eye	eye	MEDIA EYE	f	\N	2023-05-24	2023-05-24
a6b5a3cc-98d8-4b82-9a8b-2cf2ff99e1a3	media-licensing-token	mlt	Media Licensing Token	f	\N	2023-05-24	2023-05-24
11e5416b-6ead-4c78-ae6a-47450acbb817	media-network	media	Media Network	f	\N	2023-05-24	2023-05-24
fbbb721b-4867-46f4-93b7-3d9a3e4851f5	medibloc	med	Medibloc	f	\N	2023-05-24	2023-05-24
3748d537-d78e-4091-8bc1-8d23c2b51737	medicalchain	mtn	Medicalchain	f	\N	2023-05-24	2023-05-24
dd400548-8c9b-40a5-a435-f48d2f6763a8	medical-token-currency	mtc	Doc.com	f	\N	2023-05-24	2023-05-24
627521d6-371f-4e0e-8dad-59a85bf3fd73	medicalveda	mveda	MedicalVeda	f	\N	2023-05-24	2023-05-24
4f25b0d0-9123-48dc-978f-d23201b6c1f6	medieval-empires	mee	Medieval Empires	f	\N	2023-05-24	2023-05-24
deb10869-a2fb-48a0-baca-ec81a55a5c6b	medifakt	fakt	Medifakt	f	\N	2023-05-24	2023-05-24
20e1d502-ffc2-460b-9b6c-99e7e20eca70	medishares	mds	MediShares	f	\N	2023-05-24	2023-05-24
9b24a95a-f6cd-4206-819d-0eb2fe90b8eb	medping	mpg	Medping	f	\N	2023-05-24	2023-05-24
b71cc485-6437-4d34-bf85-3a5b130c3453	meeb-master	meeb	Meeb Master	f	\N	2023-05-24	2023-05-24
09264a35-8ba0-472f-8839-a3be4ef89524	meeb-vault-nftx	meeb	MEEB Vault (NFTX)	f	\N	2023-05-24	2023-05-24
6cb4733c-4321-43c0-b7a6-e78b4f20718f	meeds-dao	meed	Meeds DAO	f	\N	2023-05-24	2023-05-24
2e05dcf5-0116-466b-9b68-17d4f8ce23da	meer-coin	meer	Meer Coin	f	\N	2023-05-24	2023-05-24
0b448422-139e-4d84-ab4d-ccaa5e4154ae	meerkat-shares	mshare	Meerkat Shares	f	\N	2023-05-24	2023-05-24
55354f21-454f-4cc1-bfe4-cc1cdc367d18	meetin-token	meti	Meetin Token	f	\N	2023-05-24	2023-05-24
1d380c8e-0266-4a6f-aa07-4340a7e9d1f8	meetple	mpt	Meetple	f	\N	2023-05-24	2023-05-24
cf4357fa-040d-4df0-9205-a6284b10ddee	meflex	mef	MEFLEX	f	\N	2023-05-24	2023-05-24
bdea57fe-0085-423e-839b-5076d5ef6c1a	mega-protocol	mega	Mega Protocol	f	\N	2023-05-24	2023-05-24
682f998f-9a62-460a-8e5d-09dacdc948f9	megashibazilla	msz	MegaShibaZilla	f	\N	2023-05-24	2023-05-24
004188a6-3473-4e73-9c11-d31152d6b90b	megatech	mgt	Megatech	f	\N	2023-05-24	2023-05-24
e8981d65-4baf-4801-b41d-13a5a1cc3714	megatoken	mega	MegaToken	f	\N	2023-05-24	2023-05-24
0f144959-5c56-41d6-acc3-d0efc30abc21	megaton-finance	mega	Megaton Finance	f	\N	2023-05-24	2023-05-24
4b9bdf51-fd1a-40b5-a5a8-d37aa42ffb8e	megaweapon	$weapon	Megaweapon	f	\N	2023-05-24	2023-05-24
ca03a56b-645c-461e-9869-fabf3178c56b	megaworld	mega	MegaWorld	f	\N	2023-05-24	2023-05-24
8562fa60-2cb3-4a93-bd29-727e384a02bb	me-gusta	gusta	Me Gusta	f	\N	2023-05-24	2023-05-24
d54dbf9e-f7af-4aa9-a0c1-3f71b4a8ca3a	mei-flex	mf	Mei Flex	f	\N	2023-05-24	2023-05-24
e09056a1-18d2-495e-baf0-75078e5f52fb	me-in	mein	Me-in	f	\N	2023-05-24	2023-05-24
32e47681-1fc6-430e-bae2-d4c929011b2b	meishu	meishu	meishu	f	\N	2023-05-24	2023-05-24
a12ed247-3d30-430d-9bb0-47f8acddef8c	melalie	mel	MELX	f	\N	2023-05-24	2023-05-24
bbf463c4-3144-424a-bcad-ddf59746aff8	meld	meld	MELD [OLD]	f	\N	2023-05-24	2023-05-24
1379411d-348c-4e02-aa53-7dd49ec67415	meld-2	meld	MELD	f	\N	2023-05-24	2023-05-24
50e22fc1-d985-4385-8c95-1961a4ade2a1	meld-gold	mcau	Meld Gold	f	\N	2023-05-24	2023-05-24
ea52b27d-73e3-4bc4-89d9-3bde88bd03c8	melecoin	mlc	Melecoin	f	\N	2023-05-24	2023-05-24
96baac67-9693-4566-b90c-7c471f48b31d	melega	marco	Melega	f	\N	2023-05-24	2023-05-24
27a11dba-4846-4c9a-8380-8f23e169c6cf	meli-games	meli	Meli Games	f	\N	2023-05-24	2023-05-24
709eec1d-dc34-48c1-bf11-e4d87221d9d1	melody-sgs	sgs	Melody SGS	f	\N	2023-05-24	2023-05-24
2fa3a54d-8085-4a64-b6bf-be9d584c0886	melody-sns	sns	Melody SNS	f	\N	2023-05-24	2023-05-24
99dd28fc-e510-4c6e-961a-10943f03367d	melon	mln	Enzyme	f	\N	2023-05-24	2023-05-24
4021eb2e-fd8c-4e71-a7b2-905b08ba6fc8	melos-studio	melos	Melos Studio	f	\N	2023-05-24	2023-05-24
d70aa378-df95-4ee1-9d08-2e7e7d012b79	melo-token	melo	Melo	f	\N	2023-05-24	2023-05-24
c62b8dcd-1e7f-432c-a435-0cfbfb8e154a	meme-ai	memeai	Meme AI	f	\N	2023-05-24	2023-05-24
cee8db38-8b03-48cb-b720-259e15cc6b9c	meme-brc-20	meme	MEME (Ordinals)	f	\N	2023-05-24	2023-05-24
8904d2e0-c1f0-436e-b292-3e96647f8e01	memecoin	mem	Memecoin	f	\N	2023-05-24	2023-05-24
5dde3f7c-36a4-402c-a064-8fcdcacc8edf	memedao	memd	MemeDAO	f	\N	2023-05-24	2023-05-24
4dba7c5e-8285-4252-ab49-d4428fa74958	memedao-ai	mdai	MemeDao.Ai	f	\N	2023-05-24	2023-05-24
ec0bf21d-4cb1-44da-b6f9-c66d7ff7f339	meme-dollar	pina	Meme Dollar	f	\N	2023-05-24	2023-05-24
67cc79e4-404b-496c-9c56-917c5f22b20b	memeflate	mflate	Memeflate	f	\N	2023-05-24	2023-05-24
8655037e-14c8-4394-842d-b7bf39cba74e	meme-inu	meme	Meme Inu	f	\N	2023-05-24	2023-05-24
06c3a1e1-f908-453f-a98c-bdb2ed4daab1	meme-lordz	$lordz	Meme Lordz	f	\N	2023-05-24	2023-05-24
48631514-f5b7-4f74-8584-771452e58e7a	mememe	$mememe	MEMEME	f	\N	2023-05-24	2023-05-24
a69c66d3-96b6-48bc-8360-7e253f688077	meme-network	meme	Meme Network	f	\N	2023-05-24	2023-05-24
7c8f8c5d-90b2-4711-9563-56142b9b5bf2	memepad	mepad	MemePad	f	\N	2023-05-24	2023-05-24
879c34b1-f4d5-44bc-b47a-e4966933217d	meme-shib	ms	Meme Shib	f	\N	2023-05-24	2023-05-24
5721c97e-bbd7-41f6-a1b4-5e39e7357b04	meme-street-gang	msg	Meme Street Gang	f	\N	2023-05-24	2023-05-24
99872282-1b7d-420b-89dc-4aaec0b4c6e8	meme-tao	mtao	MEME TAO	f	\N	2023-05-24	2023-05-24
38b44c9f-7af7-4e6b-acd5-1e23b8d6fc2f	memetic	meme	Memetic	f	\N	2023-05-24	2023-05-24
4429a5ea-5d68-4533-bef0-f60a2a07af94	meme-token	meme	MEME Token	f	\N	2023-05-24	2023-05-24
98427d41-74f0-4399-b47b-e4e38d7d490d	memeverse	meme	Memeverse	f	\N	2023-05-24	2023-05-24
72e8c3fe-6433-465b-accb-9e578cc897c0	memex	memex	MEMEX	f	\N	2023-05-24	2023-05-24
d59ed586-ba14-4765-a7b7-e2a6b1decd51	menapay	mpay	Menapay	f	\N	2023-05-24	2023-05-24
1ebc92e2-3074-4a7f-9122-001d92f8e8ca	menzy	mnz	Menzy	f	\N	2023-05-24	2023-05-24
c5a168a8-d76b-4409-a939-127f90f4ed3d	meowcoin	mewc	MeowCoin	f	\N	2023-05-24	2023-05-24
74319be8-f81b-40cb-8f2a-857b3b6d5ce9	merchant-token	mto	Merchant	f	\N	2023-05-24	2023-05-24
c083cced-1219-4702-b45b-f028ce229b18	merchdao	mrch	MerchDAO	f	\N	2023-05-24	2023-05-24
67a22c66-8e5d-4d6e-9a72-510f6b6181c3	mercor-finance	mrcr	Mercor Finance	f	\N	2023-05-24	2023-05-24
a93179a4-0de7-41a9-8f4d-3fdb2636bec2	mercurial	mer	Mercurial	f	\N	2023-05-24	2023-05-24
88a97d50-cbf8-47b5-9cdb-5577a9a641b3	merebel	meri	Merebel	f	\N	2023-05-24	2023-05-24
e85e4376-a832-485c-9b43-d5c0b6bee98e	merge	merge	Merge	f	\N	2023-05-24	2023-05-24
2d616be0-c51a-4580-898e-b8ee4d94b4a5	merit-circle	mc	Merit Circle	f	\N	2023-05-24	2023-05-24
3ef2a596-6b23-43de-bafe-7572727d9b7b	merkle-network	merkle	Merkle Network	f	\N	2023-05-24	2023-05-24
00a21873-3e28-4398-9b9d-15635c15ef92	merrychristmas	hohoho	MerryChristmas [OLD]	f	\N	2023-05-24	2023-05-24
a4fff18c-54ad-4a1e-b9c2-ac83dd3af98f	merrychristmas-2	hohoho	MerryChristmas	f	\N	2023-05-24	2023-05-24
88befe6c-a30b-4ef9-b5e9-498438967b3a	merry-christmas-token	mct	Merry Christmas Token	f	\N	2023-05-24	2023-05-24
657b9696-517c-4fe0-8834-6d37786640c0	meshswap-protocol	mesh	Meshswap Protocol	f	\N	2023-05-24	2023-05-24
27dea8b0-3af0-4d87-97b9-d6debacf0d07	meso	meso	Meso	f	\N	2023-05-24	2023-05-24
8504ab20-0ed7-4e8c-bd85-f92d2a0605c0	messier	m87	MESSIER	f	\N	2023-05-24	2023-05-24
ad3f3e4d-ba74-4a0f-a701-d51586799211	meta	mta	mStable Governance: Meta	f	\N	2023-05-24	2023-05-24
05e4f1ea-d92a-4220-b1a2-82a6d126debe	meta-apes-peel	peel	Meta Apes PEEL	f	\N	2023-05-24	2023-05-24
750986be-de33-41d1-b1e9-3c244803ce11	metababy	baby	Metababy	f	\N	2023-05-24	2023-05-24
79db9401-6e9b-4c37-b417-a8feeac9b92b	metabeat	$beat	MetaBeat	f	\N	2023-05-24	2023-05-24
c047ca34-9a59-44e5-8ad7-88b6c2013c5a	metabet	mbet	MetaBET	f	\N	2023-05-24	2023-05-24
0217ca63-e638-4b93-9b0c-5da12fff3f73	metablackout	mbt	MetaBlackout	f	\N	2023-05-24	2023-05-24
07e9a11c-812a-4cc5-9785-1d31b31e807d	metabolic	mtbc	Metabolic	f	\N	2023-05-24	2023-05-24
ad66b413-f846-4f3e-a9d8-44e764e35f50	metabrands	mage	MetaBrands	f	\N	2023-05-24	2023-05-24
13bbaefa-c59e-4162-a5ad-7dce46b0f422	meta-bsc	meta	Meta BSC	f	\N	2023-05-24	2023-05-24
6db02a68-ec22-4fcf-8f18-f709b74cc452	metabusdcoin	mbc	MetaBUSDCoin	f	\N	2023-05-24	2023-05-24
46b6891e-91ad-46a3-85f0-20e95c4df6f1	metacade	mcade	Metacade	f	\N	2023-05-24	2023-05-24
a3d728a6-67ab-4925-88af-b5b003eb9129	metacash	meta	MetaCash	f	\N	2023-05-24	2023-05-24
4eef7d9e-a0e6-4d81-b24e-562924cb9715	metacity	mtc	MetaCity	f	\N	2023-05-24	2023-05-24
fddedfde-f4dc-4f5f-9c5e-beefb0d787c7	metacoin	mtc	Metacoin	f	\N	2023-05-24	2023-05-24
0b677b66-942a-43ec-93a7-5ec5b8e18546	metacraft	mct	Metacraft	f	\N	2023-05-24	2023-05-24
ed659505-3083-4611-a5cd-49e97169a31b	meta-dance	mdt	META DANCE	f	\N	2023-05-24	2023-05-24
e7085be7-128a-49a5-8679-749ed0049bf7	metaderby	dby	Metaderby	f	\N	2023-05-24	2023-05-24
5f8c847b-9164-4de2-ab26-53ea0ad2b0e9	metaderby-hoof	hoof	Metaderby Hoof	f	\N	2023-05-24	2023-05-24
ecf90ac7-c9f6-4aa5-87dd-6e639eb29ef5	metadium	meta	Metadium	f	\N	2023-05-24	2023-05-24
92e3301b-4e86-4665-b9ab-81ee13e104e5	metadoctor	medoc	MetaDoctor	f	\N	2023-05-24	2023-05-24
ac0309b3-f4ed-4cf0-b7f4-08375827998c	meta-doge	metadoge	Meta Doge	f	\N	2023-05-24	2023-05-24
0efa0c0c-432b-4a04-9f57-c9c16175d360	metadoge-bsc	metadoge	MetaDoge BSC	f	\N	2023-05-24	2023-05-24
c359ecf8-d8a1-4be6-bec7-99196149e74a	metadoge-v2	metadogev2	MetaDoge V2	f	\N	2023-05-24	2023-05-24
9b3432cc-d343-4034-b5fd-0df3c070da9b	metafabric	fabric	MetaFabric	f	\N	2023-05-24	2023-05-24
ebada66f-94f4-4b3b-a685-1bee8a75fd4b	metafastest	metaf	METAFASTEST	f	\N	2023-05-24	2023-05-24
96c98721-209b-4dba-96f4-d7c7e78a127c	metafighter	mf	MetaFighter	f	\N	2023-05-24	2023-05-24
b1696694-172c-49f0-b73f-81ec9ff8d096	metafinance	mfi	MetaFinance	f	\N	2023-05-24	2023-05-24
3d1bb7cf-7baf-439c-b690-0ab747dd4694	meta_finance	mf1	Meta Finance	f	\N	2023-05-24	2023-05-24
375d416a-c669-479f-b5a5-0ea249283538	metafishing-2	dgc	MetaFishing	f	\N	2023-05-24	2023-05-24
e5cf87e2-4770-4988-9242-c0fcf4e52fab	metaflip	metaflip	MetaFlip	f	\N	2023-05-24	2023-05-24
d7d1ebd2-f67c-42aa-844e-59b6477dc9b8	metafluence	meto	Metafluence	f	\N	2023-05-24	2023-05-24
d6f12148-3ed0-41dd-84c0-16ba7289102f	metafootball	mtf	MetaFootball	f	\N	2023-05-24	2023-05-24
857d9c3e-75c0-4e42-b95d-4d04878f3bde	meta-fps	mfps	Meta FPS	f	\N	2023-05-24	2023-05-24
0e33744a-dbc0-42d4-92b7-2e77204bc6fa	metagalaxy-land	megaland	Metagalaxy Land	f	\N	2023-05-24	2023-05-24
f761e0d5-94f1-41f8-9066-ece77dc2f831	metagame	seed	MetaGame	f	\N	2023-05-24	2023-05-24
64ef4503-fd91-474c-99bb-6f8c7b5ea422	metagame-arena	mga	Metagame Arena	f	\N	2023-05-24	2023-05-24
7551c8a6-09e5-42ec-b726-f4b005f7118d	metagamehub-dao	mgh	MetaGameHub DAO	f	\N	2023-05-24	2023-05-24
d20fcb64-0e54-4735-a760-182e6bd4399a	metagaming-guild	mgg	MetaGaming Guild	f	\N	2023-05-24	2023-05-24
72511bb6-6499-457e-89c2-2e9f141dcab8	metagamz	metag	MetagamZ	f	\N	2023-05-24	2023-05-24
0549157a-cae8-44bc-bcc6-9d9961b13fb0	metagear	gear	MetaGear	f	\N	2023-05-24	2023-05-24
81a77d7f-043a-423d-8344-6d4b0bfc1c2d	metagods	mgod	MetaGods	f	\N	2023-05-24	2023-05-24
771b31f4-6cbe-4a9e-95d2-51a0569e3b7a	metahamster	mham	Metahamster	f	\N	2023-05-24	2023-05-24
d63ddb15-0edd-49d4-9e66-36028d40638c	metahero	hero	Metahero	f	\N	2023-05-24	2023-05-24
0807aa33-21de-46cf-8520-f7913c8ea556	metajuice	vcoin	Metajuice	f	\N	2023-05-24	2023-05-24
3f1fd0fa-b7fb-454b-b0e0-f68dc0ef0af1	metakings	mtk	Metakings	f	\N	2023-05-24	2023-05-24
000c3483-4d47-4fc3-ab53-d38ea33f79f1	metal	mtl	Metal DAO	f	\N	2023-05-24	2023-05-24
939beb50-75b1-49f6-9798-7a4f1a283733	metaland-gameverse	mst	Monster	f	\N	2023-05-24	2023-05-24
62802ff4-e1ae-4f92-9868-32c98184b07a	meta-launcher	mtla	Meta Launcher	f	\N	2023-05-24	2023-05-24
596873fa-747c-4864-90af-a17fefefb569	metal-blockchain	metal	Metal Blockchain	f	\N	2023-05-24	2023-05-24
5a5680cd-8092-4c8f-a0ab-d7d9f4ff7413	metal-friends	mtls	Metal Friends	f	\N	2023-05-24	2023-05-24
daa7d386-d9d6-4cc4-8b8b-28a4718b3471	metaline-gold	mtg	MetaLine Gold	f	\N	2023-05-24	2023-05-24
dff2cc7e-0e11-4634-94c0-5d52dc6797b1	metalswap	xmt	MetalSwap	f	\N	2023-05-24	2023-05-24
6c47cc00-9416-48f9-8952-ec2f40136a7a	metamafia	maf	MetaMAFIA	f	\N	2023-05-24	2023-05-24
47240480-8785-41da-a026-9c81d51c0b90	metamall	mall	MetaMall	f	\N	2023-05-24	2023-05-24
689e9bc4-6ccc-4353-9152-864580b590a3	meta-masters-guild	memag	Meta Masters Guild	f	\N	2023-05-24	2023-05-24
3d8fa44f-1d96-4dce-b00c-67d6e734b59c	metamonkeyai	mmai	MetamonkeyAi	f	\N	2023-05-24	2023-05-24
4cb9c308-ce79-48df-9a29-4894a22db3f5	metamoon	metamoon	MetaMoon	f	\N	2023-05-24	2023-05-24
440c37c6-7462-4b14-bd1d-041dbc2a98ec	metamui	mmui	MetaMUI	f	\N	2023-05-24	2023-05-24
af235dfa-8ada-4d39-b123-1f60ea1fe75a	meta-mvrs	mvrs	Meta MVRS	f	\N	2023-05-24	2023-05-24
5d02ee9d-c5fd-4a8c-a382-5dc8fc7449c8	meta-nebulas-ionz	ionz	IONZ	f	\N	2023-05-24	2023-05-24
f733a9e4-7355-418d-afd1-133783e94939	metanept	nept	Metanept	f	\N	2023-05-24	2023-05-24
ff322aef-d1dc-41a3-b08c-a9a5e266e8a9	metan-evolutions	metan	Metan Evolutions	f	\N	2023-05-24	2023-05-24
621dee2a-dc30-4ce4-b556-6fb516941d14	metaniagames	metania	MetaniaGames	f	\N	2023-05-24	2023-05-24
e11c1d83-ffd8-44c1-bbce-0e75248d23ce	metano	metano	Metano	f	\N	2023-05-24	2023-05-24
70665612-d7d5-417b-9e50-514cad1e8545	metanyx	metx	Metanyx	f	\N	2023-05-24	2023-05-24
76566143-8df7-4884-a10f-b46a0b3d58b5	metaoctagon	motg	MetaOctagon	f	\N	2023-05-24	2023-05-24
93c5af55-3ac6-4613-95f8-e0de587bb626	metapioneers	mpi	MetaPioneers	f	\N	2023-05-24	2023-05-24
4a9fe109-0fe5-4c64-8382-e37d56bc22db	metaplanet-ai	mplai	MetaPlanet AI	f	\N	2023-05-24	2023-05-24
54a29539-3080-482b-99fc-cd8c4a1f9d6c	metaplayers-gg	fps	MetaPlayers.gg [OLD]	f	\N	2023-05-24	2023-05-24
8cc50641-9d10-4370-8e6a-65a12b6fc3dc	metaplex	mplx	Metaplex	f	\N	2023-05-24	2023-05-24
ca889f09-e9e3-4603-9142-0b5221c999c9	metapolitans	maps	Metapolitans	f	\N	2023-05-24	2023-05-24
cbc74568-58cb-411c-b926-865ef883b5cc	meta-pool	meta	Meta Pool	f	\N	2023-05-24	2023-05-24
e9ac2421-b071-44e1-b1bc-d9b95559b586	metapuss	mtp	MetaPuss	f	\N	2023-05-24	2023-05-24
71023b9d-3f58-476c-b4a0-2aaeb37a37fc	metaq	metaq	MetaQ	f	\N	2023-05-24	2023-05-24
e5e2a188-67d2-4d5d-b19c-86715ca09fc0	metaracers	mrs	MetaRacers	f	\N	2023-05-24	2023-05-24
d304aa3a-749d-405f-a033-fbc92ba8d03e	metarare	mtra	MetaRare	f	\N	2023-05-24	2023-05-24
293fb544-46ef-42d7-a7b6-a70b443fac81	metareset	reset	MetaReset	f	\N	2023-05-24	2023-05-24
bcae625f-702d-462a-8d3d-ace7e76750be	metarim	rim	MetaRim	f	\N	2023-05-24	2023-05-24
0d30e1e7-706f-4b29-b4a6-06be4f873106	metarix	mtrx	Metarix	f	\N	2023-05-24	2023-05-24
fad0c1c9-9a68-471b-9e54-78318a96e577	metars-genesis	mrs	Metars Genesis	f	\N	2023-05-24	2023-05-24
e11770f5-5ab1-4f61-b9df-c9fed75236a1	meta-ruffy	mr	MetaRuffy (MR)	f	\N	2023-05-24	2023-05-24
1a3b072b-b83c-4a5f-9c1d-48a9adf92b8d	meta-ruffy-old	mr	Meta Ruffy [OLD]	f	\N	2023-05-24	2023-05-24
708c787d-dbdc-4f44-ba27-14256c002cd6	metarun	mrun	Metarun	f	\N	2023-05-24	2023-05-24
b18d25f4-59de-4dbd-8d3c-bf0e7fc5fd81	metasafemoon	metasfm	MetaSafeMoon	f	\N	2023-05-24	2023-05-24
4c428e3b-6622-481e-b393-4044db2a37fa	meta-shiba	mshiba	Meta Shiba	f	\N	2023-05-24	2023-05-24
ccdc485c-7dcf-4efa-87c2-a8e09f8e7369	metashooter	mhunt	MetaShooter	f	\N	2023-05-24	2023-05-24
2b0ac8a9-195a-43f4-83f0-06cb460feb70	metasoccer	msu	MetaSoccer	f	\N	2023-05-24	2023-05-24
b9fba4c7-b5f9-4dfa-b461-9fc163051082	meta-space-2045	mtw	Meta Space 2045	f	\N	2023-05-24	2023-05-24
40af301f-27f6-4c24-be39-25089b2d6650	meta-spatial	spat	Meta Spatial	f	\N	2023-05-24	2023-05-24
9fa17176-2ac5-426f-aea2-6de418ba67f9	metastrike	mts	Metastrike	f	\N	2023-05-24	2023-05-24
18a511e9-24c0-4b24-aa82-b2a63775cb0a	metaswap	msc	MetaSwap	f	\N	2023-05-24	2023-05-24
32ecd94d-773d-4f88-ac8a-e438d47aa767	metathings	mett	Metathings	f	\N	2023-05-24	2023-05-24
aceef77c-8bb4-4273-9c5a-dd79ce589e43	metatoken	mtk	MetaToken	f	\N	2023-05-24	2023-05-24
c7fccda5-f0ed-4508-b4b1-7d46c9e213a9	metatrone	met	Metatrone	f	\N	2023-05-24	2023-05-24
72513f8b-71c0-434a-826f-37d1471c2745	metaus	mtu	Metaus	f	\N	2023-05-24	2023-05-24
cf6fdc21-4bb5-47b4-9ce5-80392621c813	metavault-dao	mvd	Metavault DAO	f	\N	2023-05-24	2023-05-24
d3ee7d47-4e19-4dc5-bc76-a8efe476b83e	metavault-trade	mvx	Metavault Trade	f	\N	2023-05-24	2023-05-24
df19cbb8-a5b8-4a93-a898-9d3dd3e8fd46	metaverse-etp	etp	Metaverse ETP	f	\N	2023-05-24	2023-05-24
60324ee1-0d45-4b7f-aeb6-db0f510660a4	metaverse-face	mefa	Metaverse Face	f	\N	2023-05-24	2023-05-24
9f555bca-0d39-4d9d-8989-d70cde0119f4	metaverse-hub	mhub	Metaverse Hub	f	\N	2023-05-24	2023-05-24
ad775ccb-fccf-4806-bb7e-c637caa1a800	metaverse-index	mvi	Metaverse Index	f	\N	2023-05-24	2023-05-24
10a874ef-c83a-413f-890b-8363c0328ffa	metaverse-kombat	mvk	Metaverse Kombat	f	\N	2023-05-24	2023-05-24
65e3ac3f-b915-4145-aaf5-7d69409fd498	metaverse-m	m	MetaVerse-M	f	\N	2023-05-24	2023-05-24
ab49fa17-086c-419b-9346-21c877a9c3d3	metaverse-miner	meta	Metaverse Miner	f	\N	2023-05-24	2023-05-24
3ff19434-b734-448a-bf67-aa39a11d2f53	metaverse-network-pioneer	neer	Metaverse.Network Pioneer	f	\N	2023-05-24	2023-05-24
2bc68b06-0a9c-4231-a8a6-f323f172d84f	metaverse-nft-index	play	Metaverse NFT Index	f	\N	2023-05-24	2023-05-24
7befa211-b5a2-4e05-9a14-df0e811b4069	metaverser	mtvt	Metaverser	f	\N	2023-05-24	2023-05-24
ecdad1cc-2d91-41f6-9464-37389d0f01e6	metaverse-vr	mevr	Metaverse VR	f	\N	2023-05-24	2023-05-24
7c6c2cc0-6278-463b-abe4-27ccbcbb881c	metaversex	metax	MetaverseX	f	\N	2023-05-24	2023-05-24
0c28e9d1-e383-4547-9175-e33cdacb23c6	metavisa	mesa	metavisa	f	\N	2023-05-24	2023-05-24
5701e0ec-0b62-4c8f-b851-2f8cbf7e21b4	metavpad	metav	MetaVPad	f	\N	2023-05-24	2023-05-24
68e113e1-381f-4f61-b156-5ce86145dfcb	metawars	wars	MetaWars	f	\N	2023-05-24	2023-05-24
15386540-6812-43ad-93c5-2ce207d8a073	metawear	wear	MetaWear	f	\N	2023-05-24	2023-05-24
a79b926c-75c8-4206-a130-24ed04abb9bf	metaworld	mw	MetaWorld	f	\N	2023-05-24	2023-05-24
f9f5ceda-5cfa-453b-a416-4958b43d90a7	meta-world-game	mtw	Meta World Game	f	\N	2023-05-24	2023-05-24
34aaac91-36b8-4422-8e5e-0852a374eb88	metax	x1	MetaX	f	\N	2023-05-24	2023-05-24
b176109d-35f6-41c8-95fd-bcdc318d01f1	metaxcosmos	metax	MetaXCosmos	f	\N	2023-05-24	2023-05-24
76511296-7d31-445e-9576-33f2a403ba11	metaxy	mxy	Metaxy	f	\N	2023-05-24	2023-05-24
944ee20a-4f5f-4df3-a4f0-16ba2dfa4f4b	metazilla	mz	MetaZilla	f	\N	2023-05-24	2023-05-24
6f44fc92-5b1e-47a8-b887-994880caef24	meter	mtrg	Meter Governance	f	\N	2023-05-24	2023-05-24
09fd8a4c-320c-47f7-bb0b-f719d6046ffb	meter-governance-mapped-by-meter-io	emtrg	Meter Governance mapped by Meter.io	f	\N	2023-05-24	2023-05-24
51e8b917-9a03-46e8-8528-65df602d13b6	meter-stable	mtr	Meter Stable	f	\N	2023-05-24	2023-05-24
1bd35391-f5b3-44c0-8540-02c9d6288ccc	metfi-2	metfi	MetFi	f	\N	2023-05-24	2023-05-24
75425360-977e-4543-bf71-442d06f36a33	method-fi	mthd	Method Finance	f	\N	2023-05-24	2023-05-24
c52e731b-ca81-4a54-b826-bc4323175c49	metis	mts	Metis MTS	f	\N	2023-05-24	2023-05-24
53036be7-5d84-46c4-bf75-e1db3ae55030	metis-token	metis	Metis	f	\N	2023-05-24	2023-05-24
e9aa0aab-aa27-42d9-be48-9e20add705d9	metoshi	meto	Metoshi	f	\N	2023-05-24	2023-05-24
d33c7b6d-3ef6-4fe1-abbe-38c54c9d7635	metria	metr	Metria Network	f	\N	2023-05-24	2023-05-24
300eb673-d214-451d-9af0-1b43b85646ce	metronome	met	Metronome	f	\N	2023-05-24	2023-05-24
3e9d1e0f-7f9f-41f5-8859-787df5eaf6a2	metropoly	metro	Metropoly	f	\N	2023-05-24	2023-05-24
dc0cf024-afb3-422f-a57a-cad3281962d8	mettalex	mtlx	Mettalex	f	\N	2023-05-24	2023-05-24
7b813cd8-b17e-4d1e-8ed4-dbd551e6b758	metti-inu	metti	Metti Inu	f	\N	2023-05-24	2023-05-24
56ecda48-897c-437c-ab47-b7e55ce6dcb9	meverse	mev	MEVerse	f	\N	2023-05-24	2023-05-24
10812e20-3b3a-4ad7-b98a-8273cff8af6f	mevfree	mevfree	MEVFree	f	\N	2023-05-24	2023-05-24
1238bf55-8d7b-497f-8470-abb797d19bca	mexican-peso-tether	mxnt	Mexican Peso Tether	f	\N	2023-05-24	2023-05-24
d8f128f2-c3c0-403c-b423-ea122a786233	mezz	mezz	MEZZ	f	\N	2023-05-24	2023-05-24
9edd0e8b-e1d4-4a43-a9a1-0dd9085fee6a	mfet	mfet	MFET	f	\N	2023-05-24	2023-05-24
61e91d09-5e58-4ad1-996e-a214a1c60ea5	miamicoin	mia	MiamiCoin	f	\N	2023-05-24	2023-05-24
88f14942-d208-4e1d-823a-e3ee48fabdad	miaswap	mia	MiaSwap	f	\N	2023-05-24	2023-05-24
e764d710-4de9-43ad-90a3-aeab460fc78f	mib-coin	mib	MIB Coin	f	\N	2023-05-24	2023-05-24
91a6bcca-b482-415c-9551-24cac65af943	mibr-fan-token	mibr	MIBR Fan Token	f	\N	2023-05-24	2023-05-24
47522b5c-dc4d-4333-b57a-df7bf098d03d	microbitcoin	mbc	MicroBitcoin	f	\N	2023-05-24	2023-05-24
201a7dc6-5bbb-4147-ab48-8d4c621d9519	micro-bitcoin-finance	mbtc	Micro Bitcoin Finance	f	\N	2023-05-24	2023-05-24
7d71222c-dc9a-4d7f-a5d0-c5fef6e6f898	microchains-gov-token	mcg	MicroChains Gov Token	f	\N	2023-05-24	2023-05-24
7d970c02-bc02-4ed1-978c-ba29b78d82b9	micromoney	amm	MicroMoney	f	\N	2023-05-24	2023-05-24
cef9bd0c-343c-4deb-ac79-3676ab692a3a	micropepe	mpepe	MicroPepe	f	\N	2023-05-24	2023-05-24
bd5f88aa-a719-4169-a91c-e30ddc407cd8	micropets	pets	MicroPets	f	\N	2023-05-24	2023-05-24
67a92672-05ac-4452-b4a6-7e0af11f0d20	microsoft-tokenized-stock-defichain	dmsft	Microsoft Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
91045e4c-83fe-44c3-88de-b2a9de25a0d0	microtick	tick	Microtick	f	\N	2023-05-24	2023-05-24
a1704a66-7efc-459e-a5f3-0fc2ea4cf865	microtuber	mct	MicroTuber	f	\N	2023-05-24	2023-05-24
ad9945ff-65a1-492c-ade6-3a8e5dfe7779	microvisionchain	space	MicrovisionChain	f	\N	2023-05-24	2023-05-24
6ff12727-a2fa-49ae-a8c5-1f06535f2833	midas	midas	Midas	f	\N	2023-05-24	2023-05-24
feea9722-422a-4cc4-8685-381228cee1e1	midas-token	mds	MIDAS Token	f	\N	2023-05-24	2023-05-24
43d367f3-5766-4131-8c4c-beafdb1e230e	miidas	miidas	Miidas	f	\N	2023-05-24	2023-05-24
675e38ca-ce4a-4ffc-afd9-5af2575dd667	mikawa-inu	mikawa	Mikawa Inu	f	\N	2023-05-24	2023-05-24
9fb573e8-4093-4043-ba0e-22fb712e113a	milady-meme-coin	ladys	Milady Meme Coin	f	\N	2023-05-24	2023-05-24
aa9450f3-7726-44ab-b77c-debb1726c2c5	milady-vault-nftx	milady	Milady Vault (NFTX)	f	\N	2023-05-24	2023-05-24
111ac62c-5ebe-422f-a451-cd76fedde61d	mileverse	mvc	MileVerse	f	\N	2023-05-24	2023-05-24
d1394cf8-9888-41d0-abbc-8414462c5308	milk	milk	Cool Cats Milk	f	\N	2023-05-24	2023-05-24
342369b2-4624-4f90-9c5d-c3cf67155e63	milkai	milkai	MilkAI	f	\N	2023-05-24	2023-05-24
48e5244c-d3b7-480a-920f-2d30325fcbdc	milk-alliance	mlk	MiL.k Alliance	f	\N	2023-05-24	2023-05-24
ee228e8d-725b-48d5-bf9e-610aba86bed9	milkshakeswap	milk	Milkshake Swap	f	\N	2023-05-24	2023-05-24
223a6c2c-641c-4346-9891-c284774c8f55	milkyswap	milky	MilkySwap	f	\N	2023-05-24	2023-05-24
81b27a58-44a9-4845-96c3-531ce827d615	milky-token	milky	Milky	f	\N	2023-05-24	2023-05-24
6da191ae-e512-4c6a-a498-afd190c435d2	millenniumclub	mclb	MillenniumClub Coin [OLD]	f	\N	2023-05-24	2023-05-24
0d96112e-c527-4efc-a965-6ea1bee0f8b1	millenniumclub-coin-new	mclb	MillenniumClub Coin [NEW]	f	\N	2023-05-24	2023-05-24
0f677ed4-a0c5-49ec-8206-010246108b8d	millennium-sapphire	msto	Millennium Sapphire	f	\N	2023-05-24	2023-05-24
f0646b83-c77b-40e6-945d-70c372698725	millimeter	mm	Millimeter	f	\N	2023-05-24	2023-05-24
94cffb52-c2ee-4f6a-98b8-8754bff64891	million	mm	Million	f	\N	2023-05-24	2023-05-24
22ba7abc-510a-4dcf-bd67-d3b7607db2dd	milliondollarbaby	mdb	Make DeFi Better	f	\N	2023-05-24	2023-05-24
7e066f30-76fc-4d41-a0a7-5ce4d833bfb3	million-monke	mimo	Million Monke	f	\N	2023-05-24	2023-05-24
ae7d67d4-cf03-4c17-a461-ffe779e3c6c4	millonarios-fc-fan-token	mfc	Millonarios FC Fan Token	f	\N	2023-05-24	2023-05-24
ef4cc457-00b2-4e40-aedd-d4f1966a634a	milo-inu	milo	Milo Inu	f	\N	2023-05-24	2023-05-24
d01ec40d-f864-46e6-ad48-fcae1fd6ed5c	mim	swarm	MIM	f	\N	2023-05-24	2023-05-24
0c12def2-2114-4991-95dc-c67a30f1a015	mimas-finance	mimas	Mimas Finance	f	\N	2023-05-24	2023-05-24
83e93b04-7778-4a43-a2d2-d6e29a90f2c7	mimatic	mimatic	MAI	f	\N	2023-05-24	2023-05-24
51564669-6bd0-41c3-b8f2-b5e62a6fd785	mimblewimblecoin	mwc	MimbleWimbleCoin	f	\N	2023-05-24	2023-05-24
6219fd6f-d466-4079-97f8-6f344d074c1e	mimir-token	mimir	Mimir	f	\N	2023-05-24	2023-05-24
c2362ec0-2599-4de0-8003-09e9213641b7	mimo-parallel-governance-token	mimo	Mimo Governance	f	\N	2023-05-24	2023-05-24
2d16957b-8fed-47ab-b7f5-d7e261b32a4f	mimosa	mimo	Mimosa	f	\N	2023-05-24	2023-05-24
55d4acba-67fb-4889-89c5-c41901d5f19f	mina-protocol	mina	Mina Protocol	f	\N	2023-05-24	2023-05-24
84d01f1c-2b81-4009-a9fc-0a5c700c8302	minato	mnto	Minato	f	\N	2023-05-24	2023-05-24
3cf6aac8-a74d-4d6d-a6a4-349375d587c2	mind-connect	mind	Mind Connect	f	\N	2023-05-24	2023-05-24
30b098d0-d6d0-4665-94e8-7ece3e79e97c	mindfolk-wood	$wood	Mindfolk Wood	f	\N	2023-05-24	2023-05-24
5fc1d1bd-b0c6-465e-b610-cf793b5b54d2	mind-games-cortex	crx	MIND Games CORTEX	f	\N	2023-05-24	2023-05-24
ba00717b-601c-471a-8fff-b0b309367dd2	mindol	min	MINDOL	f	\N	2023-05-24	2023-05-24
7f55233b-9da9-4619-bbb1-9361fb0bfa14	minds	minds	Minds	f	\N	2023-05-24	2023-05-24
49e01153-cefa-477e-9ede-f2b62ed6b082	mindsync	mai	Mindsync	f	\N	2023-05-24	2023-05-24
0f893ff0-03e6-4d59-9597-88e455705e7c	mineable	mnb	Mineable	f	\N	2023-05-24	2023-05-24
9d073d48-2647-4aac-9655-96e001ba0168	minebase	mbase	Minebase	f	\N	2023-05-24	2023-05-24
253fbbc5-a270-4e1c-91e9-d92c354aab3b	mine-network	mnet	MINE Network	f	\N	2023-05-24	2023-05-24
7f4076df-fd59-497d-a939-808e75f5d9cc	mineral	mnr	Mineral	f	\N	2023-05-24	2023-05-24
0b7d88db-5a89-4906-9d76-d2747d3d391c	minerjoe	gold	MinerJoe	f	\N	2023-05-24	2023-05-24
d1179202-f6da-4307-ad12-69b665af3b26	miners-of-kadenia	mok	Miners of Kadenia	f	\N	2023-05-24	2023-05-24
249d43e7-4727-4134-9198-b18acfa093e6	minerva-wallet	miva	Minerva Wallet	f	\N	2023-05-24	2023-05-24
410c8f5c-2079-4e02-a480-e5d616604292	mines-of-dalarnia	dar	Mines of Dalarnia	f	\N	2023-05-24	2023-05-24
09c99e2a-dd28-46ec-ba01-420b24f0f4db	mini	mini	Mini	f	\N	2023-05-24	2023-05-24
4f589b6f-039c-4287-b9e3-e31cec2a9e1f	minidoge	minidoge	MiniDOGE	f	\N	2023-05-24	2023-05-24
dba20a15-1503-4d6d-8dbc-3a04584cd656	minifootball	minifootball	Minifootball	f	\N	2023-05-24	2023-05-24
141a24f9-9303-4eba-9b55-8fd0b6d83c67	miningnft	mit	MiningNFT	f	\N	2023-05-24	2023-05-24
ac8b2ff1-da19-4ea1-aa82-10e684aa8ad1	minswap	min	Minswap	f	\N	2023-05-24	2023-05-24
d5b9e5ba-ec28-41c1-8ef8-87b76ae196e7	mint-club	mint	Mint Club	f	\N	2023-05-24	2023-05-24
a5fb4672-e61e-46c2-b92d-65d3b209dc6a	mintcoin	mint	Mintcoin	f	\N	2023-05-24	2023-05-24
b09b17dd-baac-4f49-9b26-5040b3b110c7	minted	mtd	Minted	f	\N	2023-05-24	2023-05-24
1d6e327b-c3b1-4b50-b47e-6c8b4465864a	mintera	mnte	Mintera	f	\N	2023-05-24	2023-05-24
cfbe150e-468d-4471-b5c9-b9e823fe550b	minterest	mnt	Minterest	f	\N	2023-05-24	2023-05-24
3ae9b162-b041-4965-a360-8edb82f03cf2	minter-hub	hub	Minter Hub	f	\N	2023-05-24	2023-05-24
2372bde6-def0-4d34-981b-c21f1e00ec77	minter-network	bip	Minter Network	f	\N	2023-05-24	2023-05-24
71d75071-5daa-4b74-983f-9f74a3d48530	mintlayer	ml	Mintlayer	f	\N	2023-05-24	2023-05-24
0b78479b-cbda-47e0-b431-94e1da125feb	mint-marble	mim	Mint Marble	f	\N	2023-05-24	2023-05-24
150164e4-72f3-412b-aafe-9970536be493	minto	btcmt	Minto	f	\N	2023-05-24	2023-05-24
2cd12856-6000-4c7f-bd7d-cb8d9617c915	mintpad	mint	Mintpad	f	\N	2023-05-24	2023-05-24
e3df54f8-a01c-4bd4-bebb-3acfb4afcd32	minu	minu	Minu	f	\N	2023-05-24	2023-05-24
e5347503-fc69-46e2-a846-85f54cf009cb	miraqle	mql	MiraQle	f	\N	2023-05-24	2023-05-24
08643a19-d057-4b1d-b6b1-f63ea804abe1	mirarc-chain	mat	MirArc Chain	f	\N	2023-05-24	2023-05-24
198d1871-8720-4aff-9830-94dbac087c9d	mirocana	miro	Mirocana	f	\N	2023-05-24	2023-05-24
f00ee671-d41c-4ad6-a78a-c816ccb2a269	mirrored-ether	meth	Mirrored Ether	f	\N	2023-05-24	2023-05-24
191ac0df-4f9e-4345-af08-92439a8202f5	mirror-protocol	mir	Mirror Protocol	f	\N	2023-05-24	2023-05-24
7085ed07-6a60-486b-875f-19edd4b5a039	misbloc	msb	Misbloc	f	\N	2023-05-24	2023-05-24
12bc50e5-98c6-408a-82d4-67016d58167a	mission-helios	helios	Mission Helios	f	\N	2023-05-24	2023-05-24
9e006bbd-950f-4c93-afd4-09a078388658	mist	mist	Mist	f	\N	2023-05-24	2023-05-24
1b11ca9b-c2fc-46f2-ba34-3b8c3f3d8df2	mithril	mith	Mithril	f	\N	2023-05-24	2023-05-24
bf826a8f-c8df-4a35-9a81-c42aa93aee89	mithril-share	mis	Mithril Share	f	\N	2023-05-24	2023-05-24
e90a14ed-9e7b-4509-aa1e-a1e940af7ebc	mixin	xin	Mixin	f	\N	2023-05-24	2023-05-24
97355394-70e7-42aa-85bc-20c479fc1171	mixmarvel	mix	MixMarvel	f	\N	2023-05-24	2023-05-24
b07d3aa4-3b4c-4cad-b7b2-6e2a055a595c	mixtrust	mxt	MixTrust	f	\N	2023-05-24	2023-05-24
862b1b6c-e526-4bab-ab0f-c20701440c4c	miyazaki-inu	miyazaki	Miyazaki Inu	f	\N	2023-05-24	2023-05-24
0bf5f0ee-b226-4826-baf9-3a96c75c987a	mizar	mzr	Mizar	f	\N	2023-05-24	2023-05-24
9b13368e-f694-43b6-8b43-8d7ffc72bf66	mktcash	mch	Mktcash	f	\N	2023-05-24	2023-05-24
c0d9dbab-9916-4a2b-bdc8-5d1c69b74dc6	mktcoin	mkt	MktCoin	f	\N	2023-05-24	2023-05-24
e573506f-d238-4673-8214-55f30976a7e7	mloky	mloky	MLOKY	f	\N	2023-05-24	2023-05-24
8cad88d4-b68a-4962-9574-b460f56340b4	mm72	mm72	MM72	f	\N	2023-05-24	2023-05-24
07ed5aad-e6f5-4a97-b0c1-8a3f3a94f39d	mmfinance	mmf	MMFinance (Cronos)	f	\N	2023-05-24	2023-05-24
1e63d2fc-85c2-4da2-b3c2-c711606f476b	mmfinance-arbitrum	mmf	MMFinance (Arbitrum)	f	\N	2023-05-24	2023-05-24
3db35579-4233-440e-b175-40225765ddd4	mmfinance-polygon	mmf	MMFinance (Polygon)	f	\N	2023-05-24	2023-05-24
187e3171-c619-4284-90c4-e725933b41d1	mmf-money	burrow	MMF Money	f	\N	2023-05-24	2023-05-24
fe07b94e-7223-4574-8fbc-cb762089deb7	mmg-token	mmg	Mad Monkey Guild	f	\N	2023-05-24	2023-05-24
e7bd0545-0e5b-4fe0-b4f3-cc1817105f22	mmocoin	mmo	MMOCoin	f	\N	2023-05-24	2023-05-24
48c7f64f-772a-4413-b7dc-bfb5bd59f76f	mms-cash	mcash	MMS Cash	f	\N	2023-05-24	2023-05-24
552a9e44-df3e-4369-a269-7621fda66ddf	mms-coin	mmsc	MMS Coin	f	\N	2023-05-24	2023-05-24
ea76a274-413c-46a5-be29-e695640a08e8	mnicorp	mni	MnICorp	f	\N	2023-05-24	2023-05-24
5b6b6ce0-0883-402f-a392-a6e1acb1cbca	mnmcoin	mnmc	MNMCoin	f	\N	2023-05-24	2023-05-24
02618eb3-84bd-4a4d-a182-30055bac27b3	mo	mo	MO	f	\N	2023-05-24	2023-05-24
160337f1-2666-4eb7-a133-bbd3e637b096	moar	moar	Moar Finance	f	\N	2023-05-24	2023-05-24
be6ed281-aa66-407c-9ab8-24a172c083e9	mobiecoin	mbx	MobieCoin	f	\N	2023-05-24	2023-05-24
3f50db6a-3756-4943-abcb-55210461248e	mobifi	mofi	MobiFi	f	\N	2023-05-24	2023-05-24
43f3e94c-9b64-40e4-b43f-fda83e44e447	mobilecoin	mob	MobileCoin	f	\N	2023-05-24	2023-05-24
d3bf7dd1-f72a-4aa0-ad3c-a1b07e979a6f	mobile-crypto-pay-coin	mcpc	Mobile Crypto Pay Coin	f	\N	2023-05-24	2023-05-24
79074872-94dd-4082-9528-2206f42ba17d	mobility-coin	mobic	Mobility Coin	f	\N	2023-05-24	2023-05-24
d1ba28d8-663e-4902-b378-0f3915c3b3b4	mobipad	mbp	Mobipad	f	\N	2023-05-24	2023-05-24
c77cafba-8829-4496-9de8-4c8a9b2c6009	mobist	mitx	Mobist	f	\N	2023-05-24	2023-05-24
b599b917-fb64-4b95-bc01-3e9a50233602	mobius	mobi	Mobius	f	\N	2023-05-24	2023-05-24
833f601f-88d1-4258-b3b3-dd5dca024221	mobius-finance	mot	Mobius Finance	f	\N	2023-05-24	2023-05-24
b6029b74-1744-471f-8048-2de212944384	mobius-money	mobi	Mobius Money	f	\N	2023-05-24	2023-05-24
77508d8d-6e72-4f10-8d7d-22ea4d399e2a	mobix	mobx	MOBIX	f	\N	2023-05-24	2023-05-24
404b60e2-7045-4944-a06e-e46abf0f606f	mobox	mbox	Mobox	f	\N	2023-05-24	2023-05-24
dd13c57f-03a5-427b-9bbf-17893b017a78	mochi	mochi	Mochi	f	\N	2023-05-24	2023-05-24
0a5b3eba-d7d4-49c6-9061-7f07c7bef59d	mochi-inu	mochi	Mochi Inu	f	\N	2023-05-24	2023-05-24
f9f246b4-ae38-4981-b878-8137fa9b2da6	mochi-market	moma	Mochi Market	f	\N	2023-05-24	2023-05-24
3405f289-f29d-42b4-9e4b-f5ce0d624f63	mocossi-planet	mcos	Mocossi Planet	f	\N	2023-05-24	2023-05-24
a603ae58-7fc8-487e-900c-257df5d2d469	moda-dao	moda	MODA DAO	f	\N	2023-05-24	2023-05-24
f0a73fbf-1c5c-441a-a002-4544a4387c7c	modden	mddn	Modden	f	\N	2023-05-24	2023-05-24
dbd92777-0e45-4123-bd1f-02ea857897a8	modefi	mod	Modefi	f	\N	2023-05-24	2023-05-24
69fb6067-4404-4db5-9f35-d67111b5279b	modex	modex	Modex	f	\N	2023-05-24	2023-05-24
43015d96-a5f8-4843-bd40-3b28aa61cc53	modular-wallet	mod	Modular Wallet	f	\N	2023-05-24	2023-05-24
869798aa-d66f-4aca-a8ec-ad416e4a2b60	modulus-domains-service	mods	Modulus Domain Service	f	\N	2023-05-24	2023-05-24
51293fc5-9331-4686-ba7a-8475605a92ee	moeda-loyalty-points	mda	Moeda Loyalty Points	f	\N	2023-05-24	2023-05-24
65263955-b692-42a2-ae71-0fcb3d2b53b8	moeta	moeta	Moeta	f	\N	2023-05-24	2023-05-24
90d15cf6-a2ed-4cf8-acf2-0c402ba069f7	mogul-productions	stars	Mogul Productions	f	\N	2023-05-24	2023-05-24
0ead9bc1-7eed-4e9b-b3d9-d6a594816c67	mojito	mojo	Mojito	f	\N	2023-05-24	2023-05-24
9a366edc-a101-4fd9-8a69-a818297a2273	mojitoswap	mjt	MojitoSwap	f	\N	2023-05-24	2023-05-24
c70a87c9-23e3-49f2-93b6-0ec795ad2f32	molecular-future	mof	Molecular Future	f	\N	2023-05-24	2023-05-24
b90bd855-a939-4c02-9400-9bbb6cf34409	moments	mmt	Moments Market	f	\N	2023-05-24	2023-05-24
76e2b1b0-22be-4320-9b24-9eb37e01b020	momentum-2	mass	Momentum	f	\N	2023-05-24	2023-05-24
268e76a1-db71-44de-ac8d-a7e45b417d5f	mommy-doge	mommydoge	Mommy Doge	f	\N	2023-05-24	2023-05-24
16e67d2a-e54f-40c9-aed0-6731528eb073	momo-key	key	MoMo Key	f	\N	2023-05-24	2023-05-24
bfe02847-71d7-49df-9cdc-88ec7e56d344	mona	mona	Monaco Planet	f	\N	2023-05-24	2023-05-24
54e4a9ed-e583-4174-b8e3-5301794c8015	monaco	mco	MCO	f	\N	2023-05-24	2023-05-24
86e635d0-e35d-4b6c-91fa-5ef7e087a01b	monacoin	mona	MonaCoin	f	\N	2023-05-24	2023-05-24
0e41083b-0136-4ede-84dc-173fce0be76d	monavale	mona	Monavale	f	\N	2023-05-24	2023-05-24
2510a6de-a3d3-4b9c-b1cd-8b7c3d4d60ec	mondo-community-coin	mndcc	Mondo Community Coin	f	\N	2023-05-24	2023-05-24
41faf6cf-7cb4-48b4-a58a-2fd751a34956	monerium-eur-money	eure	Monerium EUR emoney	f	\N	2023-05-24	2023-05-24
4db807a0-14c0-435d-b304-e69503b79cdb	monero	xmr	Monero	f	\N	2023-05-24	2023-05-24
5c224867-0aa9-45c5-86dc-6f6e2638a22f	monero-classic-xmc	xmc	Monero-Classic	f	\N	2023-05-24	2023-05-24
5cdd9815-b788-469d-8dd3-64cf6f233256	monerov	xmv	MoneroV	f	\N	2023-05-24	2023-05-24
5008c6eb-d858-42bb-a38b-33c3487908fe	moneta	moneta	Moneta	f	\N	2023-05-24	2023-05-24
eb6fb896-6159-4915-84e4-e1024d5e8bcd	monetas	mntg	Monetas [OLD]	f	\N	2023-05-24	2023-05-24
18db295d-2b62-4143-ac3a-64742da8bbb1	monetas-2	mntg	Monetas	f	\N	2023-05-24	2023-05-24
e75f1a7a-5d69-4c91-848b-e0304f952eb7	monetha	mth	Monetha	f	\N	2023-05-24	2023-05-24
7c11db67-591b-4ed1-9aee-2aedce48ef63	monet-society	monet	Monet Society	f	\N	2023-05-24	2023-05-24
e49bc090-0e03-425c-a2e1-d6abca123bfd	moneybrain-bips	bips	Moneybrain BiPS	f	\N	2023-05-24	2023-05-24
9cc8683d-170b-4395-9f21-a4d0e1647d32	moneybyte	mon	Moneybyte	f	\N	2023-05-24	2023-05-24
78d1cf25-7594-4694-a7d1-af9a2e4eba86	moneyhero	myh	Moneyhero	f	\N	2023-05-24	2023-05-24
c45acad8-aa13-46b8-91d7-eae940c07653	money-market-index	icsmmt	Money Market Index	f	\N	2023-05-24	2023-05-24
b0595a52-ad0d-415c-b6f3-1304f12f36af	moneyswap	mswap	MoneySwap	f	\N	2023-05-24	2023-05-24
90f383b1-c537-4244-9b22-ca2d97278cf7	mongbnb	mongbnb	MongBNB	f	\N	2023-05-24	2023-05-24
6f7a8935-e680-4b7c-aa5c-058715da66fb	mongcoin	mong	MongCoin	f	\N	2023-05-24	2023-05-24
93e270b8-0c77-4a2d-884f-57911c367ce4	mongol-nft	mnft	Mongol NFT	f	\N	2023-05-24	2023-05-24
a2acbec6-6521-4482-a9b1-f7447448664c	mongoose	mongoose	Mongoose	f	\N	2023-05-24	2023-05-24
85d297a4-aed9-4776-97dd-cf6eae3916cd	mongoosecoin	mongoose	MongooseCoin	f	\N	2023-05-24	2023-05-24
a525b4a9-13db-496c-971d-56707ac93672	moniwar	mowa	Moniwar	f	\N	2023-05-24	2023-05-24
54ec36db-a76d-46d4-b064-1029b0084fb6	monk	monk	Monk	f	\N	2023-05-24	2023-05-24
58e799d1-a86e-40c8-a518-9ddeadb653fe	monke	monke	Monke	f	\N	2023-05-24	2023-05-24
c9e7fee6-a36f-4ce1-9ae9-c0b60f60af16	monked	monked	MONKED	f	\N	2023-05-24	2023-05-24
67d91db2-1c06-4d98-a636-38da222df97a	monkex	monkex	Monkex	f	\N	2023-05-24	2023-05-24
f5ff8e1f-638f-4167-817b-fcd3dd0d5fb2	monkeyball	mbs	MonkeyLeague	f	\N	2023-05-24	2023-05-24
ffc00474-05dd-463b-a130-49185e81bb9c	monkeys	monkeys	Monkeys	f	\N	2023-05-24	2023-05-24
4b67a0bb-ba47-4a89-9de2-8e01d9fcaefb	monkeys-token	monkeys	Monkeys Token	f	\N	2023-05-24	2023-05-24
53b6f27c-2457-44fd-b43d-750319b5bbdb	monnfts	mon	MONNFTS	f	\N	2023-05-24	2023-05-24
34195ac9-3669-421a-8d4c-5e5bce383922	monnos	mns	Monnos	f	\N	2023-05-24	2023-05-24
d41c8d57-70ce-4937-945a-01b5df34a0ca	monolend	mld	MonoLend	f	\N	2023-05-24	2023-05-24
d6a4a9b4-cdb5-4baa-87f5-02d4b931aa2d	monomoney	mono	MonoMoney	f	\N	2023-05-24	2023-05-24
b7fe68c0-6dfd-49ca-bb98-aaa5254cb775	mononoke-inu	mononoke-inu	Mononoke Inu	f	\N	2023-05-24	2023-05-24
dc8c2f4e-25a4-4121-9b9e-6f553086499d	monopoly-layer2-duo	duo	Monopoly Layer2 DUO	f	\N	2023-05-24	2023-05-24
457a1846-a932-40a6-9a12-f57483e8c425	monopoly-meta	mpm	Monopoly Meta	f	\N	2023-05-24	2023-05-24
092d33c0-879e-4fd2-bd6e-e12b2c02ae5d	monopoly-millionaire-control	mmc	Monopoly Millionaire Control	f	\N	2023-05-24	2023-05-24
38b468dd-5bdb-4433-b2ba-36fd681e3466	monox	mono	MonoX	f	\N	2023-05-24	2023-05-24
404c07c4-fc12-46cd-8140-4f28ddffd570	monsoon-finance	mcash	Monsoon Finance	f	\N	2023-05-24	2023-05-24
9893b10e-c773-4c83-9b9b-25bcb4f87755	monsta-infinite	moni	Monsta Infinite	f	\N	2023-05-24	2023-05-24
71b477dd-34cc-44e0-a384-728af7ee0120	monster-ball	mfb	Monster Ball	f	\N	2023-05-24	2023-05-24
79f159a9-94e7-42b9-bc45-cdcdd17a3253	monster-galaxy	ggm	Monster Galaxy	f	\N	2023-05-24	2023-05-24
a2c2daf5-7ac5-489f-84c2-805293eb403f	monsterquest	mqst	MonsterQuest	f	\N	2023-05-24	2023-05-24
5c7d7005-54e3-4b64-a0db-c0fc7dbc3cff	monsterra	mstr	Monsterra	f	\N	2023-05-24	2023-05-24
199f70b1-8d78-4c6c-af0f-1145fd6cdb4c	monsterra-mag	mag	Monsterra MAG	f	\N	2023-05-24	2023-05-24
db47fe99-2379-42bd-9624-e0011bbb2b6d	monsters-clan	mons	Monsters Clan	f	\N	2023-05-24	2023-05-24
e81fb0b5-ecce-4fb2-8f3a-01fd4609194a	monstock	mon	Monstock	f	\N	2023-05-24	2023-05-24
09da54be-b15d-49b3-b5f0-2be31c130c29	monte	monte	Monte	f	\N	2023-05-24	2023-05-24
4422d94e-95fa-4fe1-9e0d-429cbc6d56f8	moochii	moochii	Moochii	f	\N	2023-05-24	2023-05-24
1b44d007-16c5-460c-84ef-ea4a12a0c217	mooi-network	mooi	MOOI Network	f	\N	2023-05-24	2023-05-24
f524af53-4263-483e-9eb4-9ca8d7b12750	moola-celo-atoken	mcelo	Moola CELO AToken	f	\N	2023-05-24	2023-05-24
7a837da7-8aff-41fa-adec-9cea20248478	moola-celo-dollars	mcusd	Moola Celo Dollars	f	\N	2023-05-24	2023-05-24
bbfac818-2ba8-4f3c-a663-4ca782ca444e	moola-interest-bearing-creal	mcreal	Moola interest bearing CREAL	f	\N	2023-05-24	2023-05-24
e4c4ee85-8a7c-4277-b7c5-50a1b335ec0d	moola-market	moo	Moola Market	f	\N	2023-05-24	2023-05-24
9d6d178d-153e-4bf8-9f4a-992d5f9a818c	moomonster	moo	MooMonster	f	\N	2023-05-24	2023-05-24
54d7e14d-d9ac-4ed0-9299-c125fd031d6b	moon	moon	r/CryptoCurrency Moons	f	\N	2023-05-24	2023-05-24
d56f4f15-0cf3-40e7-ae1b-49f3ef9cfbcb	moonai	mooi	Moonaï	f	\N	2023-05-24	2023-05-24
f7abf102-4c39-4299-b1d3-dbebd90cb0a8	moonarch	moonarch	Moonarch	f	\N	2023-05-24	2023-05-24
31ee6b63-3334-4595-a4c1-6d6a17f401cd	moon-bay	bay	Moon Bay	f	\N	2023-05-24	2023-05-24
1485c5a9-9d27-4e28-8046-03b9c1284f3f	moonbeam	glmr	Moonbeam	f	\N	2023-05-24	2023-05-24
92bd201b-a6d2-4dd8-8215-d028d9e99c1e	moonbeans	beans	MoonBeans	f	\N	2023-05-24	2023-05-24
8db34846-0947-4afd-8311-681947dc2820	mooncat-vault-nftx	mooncat	MOONCAT Vault (NFTX)	f	\N	2023-05-24	2023-05-24
ae794c65-9971-406a-ac8d-698c478701fb	mooncoin	moon	Mooncoin	f	\N	2023-05-24	2023-05-24
b982035f-2888-454d-840c-09cf05e6d0d7	moondogs	woof	Moondogs	f	\N	2023-05-24	2023-05-24
dce8cec6-3e91-40fd-b5e6-4965fcd3a174	moonedge	mooned	MoonEdge	f	\N	2023-05-24	2023-05-24
116375dc-677e-45d5-ab28-92bbbd85ec45	mooner	mnr	Mooner	f	\N	2023-05-24	2023-05-24
ee946339-895f-431c-b2e0-dc9831fedbb8	mooney	mooney	Moon DAO	f	\N	2023-05-24	2023-05-24
52f36321-1bce-4e07-9d4a-01bbcef76fa4	moonfarm-finance	mfo	MoonFarm Finance	f	\N	2023-05-24	2023-05-24
cc305fb4-d4bb-4d52-930b-33993ca4f77b	moongame	mgt	Moongame	f	\N	2023-05-24	2023-05-24
1343996b-b22e-4f83-b8ca-c864da8b0bdc	mooni	mooni	Mooni	f	\N	2023-05-24	2023-05-24
89a5bdb7-6aed-4ff8-805b-2376a04628c5	moonienft	mny	MoonieNFT	f	\N	2023-05-24	2023-05-24
46b20a3e-8565-48d5-9454-f3ee7300dd3c	moonions	moonion	Moonions	f	\N	2023-05-24	2023-05-24
e55b7f51-c337-481e-9f04-bcf645bbd40f	moonlana	mola	MoonLana	f	\N	2023-05-24	2023-05-24
620f57db-c3a1-49b7-b411-f8c2e79f2ea6	moonlift	mltpx	Moonlift Capital	f	\N	2023-05-24	2023-05-24
480ebe9c-5ff0-4b3d-b5ce-8c77f9a94907	moonlight-token	moonlight	Moonlight	f	\N	2023-05-24	2023-05-24
7e6343d2-9dbf-464a-9701-3229789085ed	moon-maker-protocol	mmp	Moon Maker Protocol	f	\N	2023-05-24	2023-05-24
9f8c1905-85da-41cb-a074-d365ccd96d58	moon-nation-game	mng	Moon Nation Game	f	\N	2023-05-24	2023-05-24
55048206-15db-4cd6-8ff8-82e314d1490e	moon-ordinals	moon	MOON (Ordinals)	f	\N	2023-05-24	2023-05-24
bd5da75c-4620-40f1-a04d-1d4f7d6fad79	moon-pepe	$mpepe	Moon Pepe	f	\N	2023-05-24	2023-05-24
36fb3c30-3a05-4ad1-a5fc-1c45b08535e1	moonpot	pots	Moonpot	f	\N	2023-05-24	2023-05-24
c08c1453-509a-4e9f-8506-745344b35113	moonpot-finance	moonpot	MoonPot Finance	f	\N	2023-05-24	2023-05-24
0aafc1ec-d2e8-4b38-a5dc-4088f2cf8bf7	moon-rabbit	aaa	Moon Rabbit	f	\N	2023-05-24	2023-05-24
d707d8ca-d2de-4be9-8fb6-6d97d1425e5d	moonrise	moonrise	MoonRise	f	\N	2023-05-24	2023-05-24
e721a408-82ec-481d-ab9e-3c60a7bf1d2e	moonriver	movr	Moonriver	f	\N	2023-05-24	2023-05-24
fdfe8758-b302-4cc2-a657-5a46abedff76	moonrock-v2	rock	MoonRock V2	f	\N	2023-05-24	2023-05-24
49d8d956-4f29-47ed-b2ae-b69d3412dc47	moonscape	mscp	Moonscape	f	\N	2023-05-24	2023-05-24
b6ffb741-e67a-4a70-8867-6becc0f5965f	moonsdust	moond	MoonsDust	f	\N	2023-05-24	2023-05-24
7fb873ce-c322-4b62-b51d-609790b93292	moonshot	moonshot	Moonshot [OLD]	f	\N	2023-05-24	2023-05-24
c9785748-8317-4197-adb6-fce2da28bc8c	moonshots-farm	bones	Moonshots Farm	f	\N	2023-05-24	2023-05-24
b9b11cdf-77a6-421f-a058-950874192778	moonstarter	mnst	MoonStarter	f	\N	2023-05-24	2023-05-24
5d2578b1-b00f-4185-868b-8c4161380f54	moonswap	moon	MoonSwap	f	\N	2023-05-24	2023-05-24
700dbf69-ea67-4e92-99a3-cbe2f17b6651	moon-token	dodb	DODbase	f	\N	2023-05-24	2023-05-24
f1f402b9-25e7-434e-8680-3e8246f6b31b	moon-tropica	cah	Moon Tropica	f	\N	2023-05-24	2023-05-24
56be7fb4-df9d-4574-9ed2-da3137db9192	moonwell	mfam	Moonwell Apollo	f	\N	2023-05-24	2023-05-24
8fc1875e-af84-4c69-9e77-cecfc0bfd19e	moonwell-artemis	well	Moonwell	f	\N	2023-05-24	2023-05-24
aaccfa3f-46ad-491f-94d1-6e4022f49317	moonwolf-io	wolf	moonwolf.io	f	\N	2023-05-24	2023-05-24
9993c6ed-087c-450b-8f6c-84618f01816b	moovy	moil	Moovy	f	\N	2023-05-24	2023-05-24
5c7f6172-0a2e-48bf-b66c-8561d975175a	mops	mops	Mops	f	\N	2023-05-24	2023-05-24
7a01a66c-90c4-4b5b-bd9c-0e0d54a7a8e9	moreal	mor	Moreal	f	\N	2023-05-24	2023-05-24
e8109993-1c8d-4a26-9731-7c0fd1fa5a03	moremoney-usd	money	Moremoney USD	f	\N	2023-05-24	2023-05-24
38ce049e-8f7c-48fd-a81a-0ca381656e0e	more-token	more	Moremoney Finance	f	\N	2023-05-24	2023-05-24
5cc81c42-a897-471c-80b5-202366f6a192	mork	mork	MORK	f	\N	2023-05-24	2023-05-24
f72ce7bd-d0c4-4f05-8e13-46ed2816f677	morpher	mph	Morpher	f	\N	2023-05-24	2023-05-24
7987601c-5fdb-47ce-b6a3-3803ccd0dad1	morpheus-labs	mitx	Morpheus Labs	f	\N	2023-05-24	2023-05-24
c058f3fa-e168-4fe4-aace-5264c48bcdb4	morpheus-network	mnw	Morpheus Network	f	\N	2023-05-24	2023-05-24
2f99462c-1b1b-42a4-83a9-0454f0e8a930	morpheus-token	pills	Morpheus Swap	f	\N	2023-05-24	2023-05-24
1e4c8a85-2c7c-4bea-83c5-c38d74c00841	morpho	morpho	Morpho	f	\N	2023-05-24	2023-05-24
848c2dac-ea86-4f99-97b1-f7b538922f31	morpho-aave-curve-dao-token	macrv	Morpho-Aave Curve DAO Token	f	\N	2023-05-24	2023-05-24
c45b776a-8b88-492f-a509-5b490dc686b7	morpho-aave-wrapped-btc	mawbtc	Morpho-Aave Wrapped BTC	f	\N	2023-05-24	2023-05-24
bd50a104-5c00-47cd-afee-1fd82f828d99	morpho-aave-wrapped-ether	maweth	Morpho-Aave Wrapped Ether	f	\N	2023-05-24	2023-05-24
026382f9-c076-4d69-a737-9b2ad94f0dd5	morpho-network	morpho	Morpho Network	f	\N	2023-05-24	2023-05-24
4b1dbdae-acb7-417d-8121-403da5fe5910	morphswap	ms	Morphswap	f	\N	2023-05-24	2023-05-24
9f456f16-e9dd-4ac1-a3c6-f23f04a97b31	mosolid	mosolid	moSOLID	f	\N	2023-05-24	2023-05-24
05ddf6e0-675e-4cce-93f3-44ece232c047	muu-inu	$muu	MUU	f	\N	2023-05-24	2023-05-24
91ef5c08-258d-427a-b57f-d57388dec2c8	mosquitos-finance	suckr	Mosquitos Finance	f	\N	2023-05-24	2023-05-24
cbd7c8ba-4a80-4dfb-813e-a514751e5f0b	moss-carbon-credit	mco2	Moss Carbon Credit	f	\N	2023-05-24	2023-05-24
8ccf96c7-c1bf-4783-a3fe-59da7f65d861	moss-governance	moss	Moss Governance	f	\N	2023-05-24	2023-05-24
25278b91-26db-471e-a900-a6272c743ff5	mossland	moc	Mossland	f	\N	2023-05-24	2023-05-24
51d1c5ba-419b-400c-88c1-b0e164057114	motacoin	mota	MotaCoin	f	\N	2023-05-24	2023-05-24
62af3e95-9bd2-464e-bb83-4d94b7e743f2	mother-earth	mot	Mother Earth	f	\N	2023-05-24	2023-05-24
1358b157-73fe-42f2-8e63-1d64a0ebe475	mother-of-memes	mom	Mother of Memes	f	\N	2023-05-24	2023-05-24
71bc186e-4f15-4d63-aa2d-b129c3dc98ae	motion-motn	motn	MOTION	f	\N	2023-05-24	2023-05-24
df2184fc-0276-40f5-9ca1-fa3cc20aa760	motiv-protocol	mov	MOTIV Protocol	f	\N	2023-05-24	2023-05-24
0a4a5ac7-efe4-4261-8ac1-f5f7422fb6af	motocoin	moto	Motocoin	f	\N	2023-05-24	2023-05-24
9c83db8c-737d-449f-967c-397c12a06cc0	motogp-fan-token	mgpt	MotoGP Fan Token	f	\N	2023-05-24	2023-05-24
1b24da3e-9448-4b84-b440-0078fd8a0276	mound-token	mnd	Mound	f	\N	2023-05-24	2023-05-24
ea7e7b8d-7ded-4a38-a394-4a1fc20c44e3	mouseworm	mouseworm	MouseWorm	f	\N	2023-05-24	2023-05-24
eb549c9c-4acf-4c83-b07c-4053e0611c05	movecash	mca	MoveCash	f	\N	2023-05-24	2023-05-24
1cd02c00-23c1-4cff-8868-ac88b77879ee	move-dollar	mod	Move Dollar	f	\N	2023-05-24	2023-05-24
6bb8abd1-10e6-4f72-b4f9-8bdec92525e0	move-network	movd	MOVE Network	f	\N	2023-05-24	2023-05-24
1fd15062-e4a9-4196-bf16-455be25814d3	mover-xyz	mover	Mover.xyz	f	\N	2023-05-24	2023-05-24
802d7d36-cfe4-4b2f-9aac-c5e683c13661	movex-token	movex	Movex Token	f	\N	2023-05-24	2023-05-24
dac82b96-60cf-44df-b98f-f7732c8045c6	movez	movez	MoveZ	f	\N	2023-05-24	2023-05-24
00741c55-2ec2-4161-a4dd-f8c5cbe55828	moviebloc	mbl	MovieBloc	f	\N	2023-05-24	2023-05-24
5a59ec47-433e-4730-abf7-9b8ecf4e0856	movn	mov	MOVN	f	\N	2023-05-24	2023-05-24
6271f68a-7dc1-4a4c-98bd-a66906863223	mozaic	moz	Mozaic	f	\N	2023-05-24	2023-05-24
1de6fd76-e351-4486-b8e3-2415f063b584	mp3	mp3	MP3	f	\N	2023-05-24	2023-05-24
c3c254a5-932d-48e1-b879-dfa19bbef314	mpx	mpx	Morphex	f	\N	2023-05-24	2023-05-24
07c8362b-4d0d-4e8a-bff3-3f82189457c8	mrspepe	mrspepe	MrsPepe	f	\N	2023-05-24	2023-05-24
f670030e-c54d-49c5-b6ff-ca545e867d94	mrweb-finance-2	ama	MrWeb Finance	f	\N	2023-05-24	2023-05-24
2a753c26-fbb1-4887-8ee3-d1be664ef595	mshare	mshare	MShare	f	\N	2023-05-24	2023-05-24
f9d2a3f0-9b99-45d9-b24f-fe429901d9d9	msol	msol	Marinade staked SOL	f	\N	2023-05-24	2023-05-24
a47d7d83-70e7-44cf-855a-b96558b85457	mtg-token	mtg	MTG Token	f	\N	2023-05-24	2023-05-24
10fab460-5090-48df-8741-225652d1b397	mtop	mtop	MTOP	f	\N	2023-05-24	2023-05-24
56358448-9399-4c4a-9611-c88b1fc3c8c7	mt-pelerin-shares	mps	Mt Pelerin Shares	f	\N	2023-05-24	2023-05-24
6718664f-81dd-45e1-8a6d-052257b8e1ad	mttcoin	mttcoin	MTTCoin	f	\N	2023-05-24	2023-05-24
767faddb-19df-453c-88b9-bfbf52615b46	mu-coin	mu	Mu Coin	f	\N	2023-05-24	2023-05-24
73f03231-4834-473d-9a3b-f132a6344081	mudra-exchange	mudra	Mudra	f	\N	2023-05-24	2023-05-24
a425be71-6b6a-465f-b832-cfdfbfded162	mudra-mdr	mdr	Mudra MDR	f	\N	2023-05-24	2023-05-24
c732266c-a84c-429e-aef6-1f9b691d00cd	muesliswap-milk	milk	MuesliSwap MILK	f	\N	2023-05-24	2023-05-24
192ded9a-5b6c-4f1d-9a2f-38ee52c1797d	muesliswap-yield-token	myield	MuesliSwap Yield	f	\N	2023-05-24	2023-05-24
2c6209ae-208a-4cd4-b5c3-554f0620ed70	mugen-finance	mgn	Mugen Finance	f	\N	2023-05-24	2023-05-24
6f637360-a7d9-44ba-ab88-c398fc204b02	mu-gold	mug	Mu Gold	f	\N	2023-05-24	2023-05-24
0c3eaaeb-cfe7-41ef-896b-2fadc9856c0f	mu-inu	muinu	Mu Inu	f	\N	2023-05-24	2023-05-24
63da311b-c8a3-44e8-a1ee-fde48b939db3	multibtc	multibtc	MultiBTC	f	\N	2023-05-24	2023-05-24
405549c1-d4d8-483b-9fea-199eea2c108c	multichain	multi	Multichain	f	\N	2023-05-24	2023-05-24
1d2e2c13-167c-4a0b-8302-438c5b151966	multi-chain-capital-2	mcc	Multi-Chain Capital	f	\N	2023-05-24	2023-05-24
292ca9d7-20a8-42c1-9d02-b8a1512f216b	multipad	mpad	MultiPad	f	\N	2023-05-24	2023-05-24
f90a6450-8108-42a0-980d-833a80ff0f26	multiplanetary-inus	inus	MultiPlanetary Inus	f	\N	2023-05-24	2023-05-24
099f1d6b-9e12-41bd-8676-b7867a9e93b8	multisys	myus	Multisys	f	\N	2023-05-24	2023-05-24
9d9ea121-8769-4156-a1a1-f691d6268796	multivac	mtv	MultiVAC	f	\N	2023-05-24	2023-05-24
6b5420ba-18f1-4d74-a92d-9832731c9c2d	multiverse	ai	Multiverse	f	\N	2023-05-24	2023-05-24
d480ccbf-f5fb-4eec-ad64-3a4d1e025076	multiverse-capital	mvc	Multiverse Capital	f	\N	2023-05-24	2023-05-24
752029b2-ab39-4fdd-8bf5-e11b38885e8d	mu-meme	mume	Mu Meme	f	\N	2023-05-24	2023-05-24
bc4f481f-f474-42f7-8082-4f49c4d04010	mummy-finance	mmy	Mummy Finance	f	\N	2023-05-24	2023-05-24
599ed38f-bc65-4e39-9b4a-960cae8d5d2b	mumon-ginsen	mg	Mumon-Ginsen	f	\N	2023-05-24	2023-05-24
c3ac535c-6fc8-4a2d-8f6f-81da03d511e1	mumu	mumu	Mumu	f	\N	2023-05-24	2023-05-24
054e5f27-037d-4bcf-9d1a-97f93c621825	mumu-the-bull	mumu	Mumu The Bull	f	\N	2023-05-24	2023-05-24
bd1377b2-2840-49f9-bc07-581bd3839aac	munch-token	munch	Munch	f	\N	2023-05-24	2023-05-24
fd07594e-5acd-4db1-8de4-31c7ff4e14bb	mundocrypto	mct	Mundocrypto	f	\N	2023-05-24	2023-05-24
83ff47c6-49b5-4107-8b9f-af5d0b3e9e00	murasaki	mura	Murasaki	f	\N	2023-05-24	2023-05-24
8a1356c2-e50d-4cbe-80a2-8e95ec4f67bb	muratiai	muratiai	MuratiAI	f	\N	2023-05-24	2023-05-24
8eae5cc3-552f-4f58-85f6-546d968838f8	mus	mus	Musashi Finance	f	\N	2023-05-24	2023-05-24
11ffb9f5-0af2-4289-aa25-1e3ccf56ba67	musd	musd	mStable USD	f	\N	2023-05-24	2023-05-24
ccfa68ff-93c3-4bfa-bf72-4264a7f26933	muse-2	muse	Muse DAO	f	\N	2023-05-24	2023-05-24
de957695-d5e8-4d95-9058-c0642a1f50f3	muse-ent-nft	msct	Muse ENT NFT	f	\N	2023-05-24	2023-05-24
7dfc1fc3-c474-4e5c-abf0-8ac95e5fb3f2	museum-of-crypto-art	moca	Museum of Crypto Art	f	\N	2023-05-24	2023-05-24
9f09e900-b28f-4ac2-8846-4257200193e9	mushe	xmu	Mushe	f	\N	2023-05-24	2023-05-24
f13fe151-f156-4408-8f11-4a6cb5ca9e2a	musicai	musicai	MusicAI	f	\N	2023-05-24	2023-05-24
440b396a-4468-48c6-867f-0e9b24cd19d9	musicn	mint	MusicN	f	\N	2023-05-24	2023-05-24
ab551406-2b9c-498e-8bd1-63c7083b71d0	musk-dao	musk	MUSK DAO	f	\N	2023-05-24	2023-05-24
edce77c7-4d4f-4150-88bb-85dfcc438c37	musk-doge	mkd	Musk Doge	f	\N	2023-05-24	2023-05-24
edce56b5-d32a-4373-992b-6898869b2668	musk-gold	musk	MUSK Gold	f	\N	2023-05-24	2023-05-24
7de446fc-11c7-4c75-b18f-658d363ad3d6	musk-melon	melon	Musk Melon	f	\N	2023-05-24	2023-05-24
cb0f22c3-593c-426e-803c-c3ae0bce5370	must	must	Must	f	\N	2023-05-24	2023-05-24
027ba647-0503-4902-923d-6bf61d6132c0	mutant-pepe	mutant	Mutant Pepe	f	\N	2023-05-24	2023-05-24
8677bf3e-b5be-4980-b5b5-1270eda2efd9	muuu	muuu	Muuu Finance	f	\N	2023-05-24	2023-05-24
2d42d698-e4c1-4b41-97bd-53c787add463	muverse	mu	Muverse	f	\N	2023-05-24	2023-05-24
9066066e-d176-4983-99e6-b43a99b75d5d	muverse-token	mct	Muverse Token	f	\N	2023-05-24	2023-05-24
7a1a9ca9-272d-428d-a07d-4c3d28620053	mvs-multiverse	mvs	MVS Multiverse	f	\N	2023-05-24	2023-05-24
ade73165-8c37-48ba-8605-8c3ae3ecfa3d	mxc	mxc	MXC	f	\N	2023-05-24	2023-05-24
b8ab3c66-5969-4beb-a230-8b4a39c4ae2b	mxgp-fan-token	mxgp	MXGP Fan Token	f	\N	2023-05-24	2023-05-24
f2508395-a084-428b-8e02-d1b3841297a0	mxmboxceus-token	mbe	MxmBoxcEus Token	f	\N	2023-05-24	2023-05-24
974d61fc-2fc7-4eee-bf59-cbae228a76d8	mx-token	mx	MX	f	\N	2023-05-24	2023-05-24
dee633f5-95d5-44b9-8126-064a30629091	mx-token-2	mxt	MX TOKEN	f	\N	2023-05-24	2023-05-24
6927d63e-1847-4bc2-8d5c-534f20fe9a22	mybit-token	myb	MyBit	f	\N	2023-05-24	2023-05-24
1314d90e-f205-477e-8e6b-8c46fabf0644	mybricks	bricks	MyBricks	f	\N	2023-05-24	2023-05-24
695a4648-52e3-446e-94be-378a53b2f98e	myce	yce	MYCE	f	\N	2023-05-24	2023-05-24
9479397a-5704-47e0-a152-5ef32d0ad3a2	mycelium	myc	Mycelium	f	\N	2023-05-24	2023-05-24
93454b46-3186-4ce2-9e1a-65425a90fa9e	my-ceremonial-event	myce	MY Ceremonial Event	f	\N	2023-05-24	2023-05-24
dc8fee7a-7cd8-44f6-8d01-2b11089b96ef	my-defi-legends	dlegends	My DeFi Legends	f	\N	2023-05-24	2023-05-24
4d46b680-5db7-4ce6-aa02-b6e3597c5036	my-defi-pet	dpet	My DeFi Pet	f	\N	2023-05-24	2023-05-24
0b184e31-76c3-40a9-b6b7-c07b80a12d54	my-liquidity-partner	mlp	My Liquidity Partner	f	\N	2023-05-24	2023-05-24
fdaa9165-c582-41e8-b7be-c4c0ceb20338	my-master-war	mat	My Master War	f	\N	2023-05-24	2023-05-24
24e2b10d-e722-4b7d-9eea-e8394f8a1fd7	mymessage	mesa	myMessage	f	\N	2023-05-24	2023-05-24
1522b838-e4d6-40ab-990b-aa80ebba5629	my-metatrader	mmt	My MetaTrader	f	\N	2023-05-24	2023-05-24
6a159812-bc86-4037-a3c4-b6f932705149	my-neighbor-alice	alice	My Neighbor Alice	f	\N	2023-05-24	2023-05-24
bdeac011-b86b-4dc0-99b0-6894bb04348d	myntpay	mynt	MyntPay	f	\N	2023-05-24	2023-05-24
580e6ee0-0a8f-49c0-b6f5-ae3d2e82cf84	myobu	myobu	Myōbu	f	\N	2023-05-24	2023-05-24
2b30386d-dafc-4265-af3a-38965b13e422	mypiggiesbank	piggie	MyPiggiesBank	f	\N	2023-05-24	2023-05-24
8f814c45-1ebe-462a-9383-7d2c2160829a	mypoints-e-commerce	mypo	MyPoints E-Commerce	f	\N	2023-05-24	2023-05-24
556f53c4-1bc5-4b96-894f-274b78282200	myria	myria	Myria	f	\N	2023-05-24	2023-05-24
34cd470e-fa77-4fa4-bf89-dbcbf50aecc0	myriadcoin	xmy	Myriad	f	\N	2023-05-24	2023-05-24
3fe0be3c-0f35-429b-a6f8-8b4151103c42	myriad-social	myria	Myriad Social	f	\N	2023-05-24	2023-05-24
58193ce7-ba26-4c4b-a499-daa89ea460c2	mysterium	myst	Mysterium	f	\N	2023-05-24	2023-05-24
406c0b05-0c96-4436-aa52-1b4a42411d23	mystic-treasure	myt	Mystic Treasure	f	\N	2023-05-24	2023-05-24
49b58a76-6238-4a25-9168-ca7e9fd3d357	myteamcoin	myc	Myteamcoin	f	\N	2023-05-24	2023-05-24
02de1718-fbb0-48a9-9a73-5d2e9f487142	mytheria	myra	Mytheria	f	\N	2023-05-24	2023-05-24
6412b278-05c8-4a82-9eec-738196514913	mythic-ore	more	Mythic Ore	f	\N	2023-05-24	2023-05-24
44e6016f-6741-472f-a693-5214035484a6	mythos	myth	Mythos	f	\N	2023-05-24	2023-05-24
2ed47c24-d2c5-459a-a284-2bc60b816a48	mytoken	mt	MyToken	f	\N	2023-05-24	2023-05-24
b8945111-6d5e-494a-b805-d62d8fd4c99b	n286	n286	N286	f	\N	2023-05-24	2023-05-24
166f983c-b68c-452a-aec5-a800cb4d3dfb	nabox	nabox	Nabox	f	\N	2023-05-24	2023-05-24
f2d961e8-2089-4186-aca2-a948c830e862	nacho-finance	nacho	Nacho Finance	f	\N	2023-05-24	2023-05-24
bf50eacc-0128-4e2e-874c-5627955e42b4	nada-protocol-token	nada	NADA Protocol Token	f	\N	2023-05-24	2023-05-24
42d26067-9f52-4792-94cc-2c4bbb748638	naetion	ntn	Naetion	f	\N	2023-05-24	2023-05-24
1228ead8-4542-493f-8e1f-7018fc4e87c9	nafter	naft	Nafter	f	\N	2023-05-24	2023-05-24
ea509b53-9c91-4d64-848b-92990103cc22	nafty	nafty	Nafty	f	\N	2023-05-24	2023-05-24
f665df4b-3e34-4483-b483-a992f5fd5de1	naga	ngc	NAGA	f	\N	2023-05-24	2023-05-24
2a264bd2-1a65-4c84-ac6b-18f6054cf2a1	nahmii	nii	Nahmii	f	\N	2023-05-24	2023-05-24
618f9a65-1a31-4199-a3a4-996d4b1c5db8	naka-bodhi-token	nbot	Naka Bodhi	f	\N	2023-05-24	2023-05-24
ff2f242d-d09c-480c-b0b0-fbaac463db5d	nakamoto-games	naka	Nakamoto Games	f	\N	2023-05-24	2023-05-24
ba062f4a-2aa5-48d9-8695-e003baa5719b	nals	nals	NALS	f	\N	2023-05-24	2023-05-24
fba1ad4c-77d9-477a-a102-c76f07fc55e7	name-changing-token	nct	Name Change	f	\N	2023-05-24	2023-05-24
f009053b-73cb-47eb-afc0-76a919adcc5d	namecoin	nmc	Namecoin	f	\N	2023-05-24	2023-05-24
3bf2a5d3-aa84-4732-aa2a-22900ed42f75	nana-token	nana	NANA Token	f	\N	2023-05-24	2023-05-24
bc0e5dc5-baa4-4d6a-bb97-2832b82b281b	nano	xno	Nano	f	\N	2023-05-24	2023-05-24
804b6b74-1c7f-4445-b79b-fadc7a4d2910	nanobyte	nbt	NanoByte	f	\N	2023-05-24	2023-05-24
d3de410b-6a6f-454d-8502-43d5c3279b54	nano-dogecoin	indc	Nano Dogecoin	f	\N	2023-05-24	2023-05-24
204c5106-a7c3-4ccf-a2be-1acc06eb1aa1	nanomatic	nano	Nanomatic	f	\N	2023-05-24	2023-05-24
c521c3cb-8d0d-41e5-aec5-5e0d58fecc56	nanometer-bitcoin	nmbtc	NanoMeter Bitcoin	f	\N	2023-05-24	2023-05-24
f410bf55-b3cf-4f33-a778-af778729bf96	naos-finance	naos	NAOS Finance	f	\N	2023-05-24	2023-05-24
9572a4f9-43e7-4a79-86e5-0bb85a69745e	napoleon-x	npx	Napoleon X	f	\N	2023-05-24	2023-05-24
9ac5a647-4fbf-4393-af95-75f16cb88f48	napoli-fan-token	nap	Napoli Fan Token	f	\N	2023-05-24	2023-05-24
aadad9c7-f90b-4f39-b2b5-593c074685e6	narfex-2	nrfx	Narfex	f	\N	2023-05-24	2023-05-24
f310ca1e-0f1c-4402-851b-1601f10681cc	naruto	naruto	Naruto	f	\N	2023-05-24	2023-05-24
0fbf0a95-27ad-4aca-9f59-4fe85c95efb8	nasdacoin	nsd	Nasdacoin	f	\N	2023-05-24	2023-05-24
5dc5f345-b014-4240-b403-248ee0c71e3d	nasdex-token	nsdx	NASDEX	f	\N	2023-05-24	2023-05-24
e25a3f10-3272-486c-abd6-cdc7707c51d6	natas-token	natas	NaTaS Token	f	\N	2023-05-24	2023-05-24
a4ad4fe9-ec8d-4453-a1f6-eea778cc5382	natiol	nai	Natiol	f	\N	2023-05-24	2023-05-24
1c463374-8038-4202-943b-ce1ccd6c48e9	nation3	nation	Nation3	f	\N	2023-05-24	2023-05-24
a975757f-c895-411e-9ff6-9671f1968d70	native-utility-token	nut	Native Utility	f	\N	2023-05-24	2023-05-24
fc3e6798-c04f-452e-91b5-8744aab473f5	natural-farm-union-protocol	nfup	Natural Farm Union Protocol	f	\N	2023-05-24	2023-05-24
7e61fc4e-2438-467a-a836-d91812c45d48	natus-vincere-fan-token	navi	Natus Vincere Fan Token	f	\N	2023-05-24	2023-05-24
c3a201a0-49b4-469e-8dec-3aa57f73d301	nav-coin	nav	Navcoin	f	\N	2023-05-24	2023-05-24
31a55979-9199-4c8b-8af1-fd18ba5995a8	navibration	navi	Navibration	f	\N	2023-05-24	2023-05-24
ab38c3c7-9886-4e65-9814-c44e5de69683	navis	nvs	Navis	f	\N	2023-05-24	2023-05-24
a9185d27-7c6c-4ded-935c-6fcac4e5076e	naxar	naxar	Naxar	f	\N	2023-05-24	2023-05-24
62841143-0897-4bff-8900-eea2e0e4b971	ndau	ndau	Ndau	f	\N	2023-05-24	2023-05-24
04661818-2582-48b5-aa6e-9ff3a27c12c2	ndb	ndb	NDB	f	\N	2023-05-24	2023-05-24
7fa3f879-537f-4934-b839-7ac2aa0cd59e	near	near	NEAR Protocol	f	\N	2023-05-24	2023-05-24
d1189079-23af-4d91-99f5-697c3cf258b0	nearpad	pad	Pad.Fi	f	\N	2023-05-24	2023-05-24
4d7c5780-6430-4344-a269-d11fb2731047	nearstarter	nstart	NEARStarter	f	\N	2023-05-24	2023-05-24
0bddfce2-aa82-4b44-a5a8-d61d937afce4	neblio	nebl	Neblio	f	\N	2023-05-24	2023-05-24
c145f225-bef8-4aea-8656-c7edb2bccb18	nebulas	nas	Nebulas	f	\N	2023-05-24	2023-05-24
db041194-26cd-42aa-b19a-2a6e4deca82a	neeo	neeo	NEEO	f	\N	2023-05-24	2023-05-24
75d491c8-a50b-454a-93e8-573de8ac9f71	neftipedia	nft	NEFTiPEDiA	f	\N	2023-05-24	2023-05-24
3bfc82ea-9ae2-49ba-8440-dce45072ec1b	nefty	nefty	NeftyBlocks	f	\N	2023-05-24	2023-05-24
912c949a-8783-4e45-ae60-77343875d3fc	neighbourhoods	nht	Neighbourhoods	f	\N	2023-05-24	2023-05-24
e0295160-5fe5-4e5c-82c8-77ada34c110e	neko	neko	NEKO	f	\N	2023-05-24	2023-05-24
51f6a32a-f6e9-4501-b1d9-96ff1eb7b22c	nekocoin	nekos	Nekocoin	f	\N	2023-05-24	2023-05-24
e3189656-5fbb-48f0-91c1-0e365a376b1b	nelore-coin	nlc	Nelore Coin	f	\N	2023-05-24	2023-05-24
54015fd1-71dc-46da-82a9-5bea4bcb0280	nem	xem	NEM	f	\N	2023-05-24	2023-05-24
3216b5c6-b97e-4f0d-9236-a6754a731f7b	nemesis	nms	Nemesis	f	\N	2023-05-24	2023-05-24
46b1bc6e-5005-42b9-8510-8bc89348d87a	nemesis-dao	nmsp	Nemesis PRO	f	\N	2023-05-24	2023-05-24
afb04071-9dae-4bde-beb4-b88f58f771e4	nemo	nemo	NEMO	f	\N	2023-05-24	2023-05-24
0a1685ec-ccee-4d25-aa04-b60e81277df5	neo	neo	NEO	f	\N	2023-05-24	2023-05-24
028fd741-598f-4fb3-9a89-faae53bba7df	neocortexai	corai	NeoCortexAI	f	\N	2023-05-24	2023-05-24
83a9bf18-024e-40ca-a24a-90795d7a2496	neofi	neofi	NeoFi	f	\N	2023-05-24	2023-05-24
6b456a99-65a0-4671-8edb-716ee2e9c442	neon	neon	Neon	f	\N	2023-05-24	2023-05-24
558b9ee2-d369-45e6-b624-3b44a18dc9ce	neon-exchange	nex	Nash	f	\N	2023-05-24	2023-05-24
ffbcce5c-0d20-4557-972a-c206b584c309	neonomad-finance	nni	Neonomad Finance	f	\N	2023-05-24	2023-05-24
d2c07ee7-a0ca-4758-8a6e-fb30d6d4048a	neopin	npt	Neopin	f	\N	2023-05-24	2023-05-24
14358f3f-3498-44cc-a4b5-1bb3b9401085	neorbit	safo	SAFEONE CHAIN	f	\N	2023-05-24	2023-05-24
9b3cca56-cdd8-4859-a9b8-11e8d34b9e3c	neos-credits	ncr	Neos Credits	f	\N	2023-05-24	2023-05-24
aa3fa189-7ae1-4ce4-a0a6-95518003d171	neo-tokyo	bytes	Neo Tokyo	f	\N	2023-05-24	2023-05-24
c11702b7-322c-439e-9f39-da2ec849e776	neoxa	neox	Neoxa	f	\N	2023-05-24	2023-05-24
5015cd81-ccba-4d28-b1a8-6dff13f13f91	nerian-network	nerian	Nerian Network	f	\N	2023-05-24	2023-05-24
fc193827-efb3-40c4-b0da-7a4e5b0153a2	nero	npt	Nero	f	\N	2023-05-24	2023-05-24
afa02aed-01a0-4c24-a222-74f0e0910c16	nerva	xnv	Nerva	f	\N	2023-05-24	2023-05-24
f8cadd31-6b25-465b-b0d4-62c4c3d5915e	nerve-finance	nrv	Nerve Finance	f	\N	2023-05-24	2023-05-24
344c265b-4158-4d05-add7-183358196eb2	nerveflux	nerve	NerveFlux	f	\N	2023-05-24	2023-05-24
c37d4470-1c47-433d-99d2-383614e8225d	nervenetwork	nvt	NerveNetwork	f	\N	2023-05-24	2023-05-24
bffb4be2-2922-4f6c-a3d7-33b76cc342e5	nervos-network	ckb	Nervos Network	f	\N	2023-05-24	2023-05-24
31cbf778-abfa-45b0-a917-9fb479a15a6f	nest	nest	Nest Protocol	f	\N	2023-05-24	2023-05-24
f894c7ea-056b-4905-9ffd-f0c7ee1faf57	nest-arcade	nesta	Nest Arcade	f	\N	2023-05-24	2023-05-24
f568e929-d0cc-497c-8ecd-fb24058f34af	nestegg-coin	egg	NestEgg Coin	f	\N	2023-05-24	2023-05-24
c7b074f9-afb4-4c14-8826-950ac635695d	nesten	nit	Nesten	f	\N	2023-05-24	2023-05-24
9d89fc49-8cd7-4383-abc2-f39ab5b0b971	nestree	egg	Nestree	f	\N	2023-05-24	2023-05-24
e9d6ef36-5261-4379-aa65-3932980444ae	neta	neta	NETA	f	\N	2023-05-24	2023-05-24
eaceaa36-3af9-47cc-885d-bd51d17337bb	netcoin	net	Netcoin	f	\N	2023-05-24	2023-05-24
5f13c30c-a79c-481c-b36d-bbd383d4eb48	netcoincapital	ncc	Netcoincapital	f	\N	2023-05-24	2023-05-24
3f49e8cf-e26c-4940-a5cf-6da5d571ab7f	netflix-tokenized-stock-defichain	dnflx	Netflix Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
15b66b7c-a4a3-4cc1-b95e-3233f234d7ab	nether	ntr	Nether	f	\N	2023-05-24	2023-05-24
528d723c-4d50-48ec-86c1-8ed338284b6c	netm	ntm	Netm	f	\N	2023-05-24	2023-05-24
845629c6-75c2-4e59-92fe-ae663d9c9217	neton	nto	Neton	f	\N	2023-05-24	2023-05-24
e91b7af8-5aed-4fe4-8ba8-dd1065b338d9	netswap	nett	Netswap	f	\N	2023-05-24	2023-05-24
3d8955de-97bf-45e4-8858-19a583a6ea3d	netvrk	ntvrk	Netvrk	f	\N	2023-05-24	2023-05-24
6d5fed5b-91a8-45d8-a796-c57e014a5891	network-capital-token	netc	Network Capital Token	f	\N	2023-05-24	2023-05-24
fb50f94c-a744-40a4-a590-a1c05059e7ba	netzero	nzero	NETZERO	f	\N	2023-05-24	2023-05-24
38fe0ca1-e0b9-4974-bdca-49c6eff0b53f	neumark	neu	Neumark	f	\N	2023-05-24	2023-05-24
47056130-d5d3-41d9-a030-c5ea0a95fc30	neural-ai	neuralai	Neural AI	f	\N	2023-05-24	2023-05-24
1e9360eb-69de-4e7b-aed3-9152fffbe407	neural-radiance-field	nerf	Neural Radiance Field	f	\N	2023-05-24	2023-05-24
d4a1493e-1b6c-4bb2-a72e-b7f39ed57571	neuroni-ai	neuroni	Neuroni AI	f	\N	2023-05-24	2023-05-24
568a01e4-f208-4296-8fd6-692bf52d34ff	neurotoken	ntk	Neuro NTK	f	\N	2023-05-24	2023-05-24
3d704923-84ac-4ff9-9947-1d37364ee5a4	neutra-finance	neu	Neutra Finance	f	\N	2023-05-24	2023-05-24
1f9c5e85-10e7-4eec-822e-8ff6f40089d2	neutrino	xtn	Neutrino Index Token	f	\N	2023-05-24	2023-05-24
5827de39-251f-43dd-b7e9-e9b1942bde63	neutrinos	neutr	Neutrinos	f	\N	2023-05-24	2023-05-24
0ce4b927-2d37-44fd-af8c-1cbdd920a5c6	neutrino-system-base-token	nsbt	Neutrino System Base	f	\N	2023-05-24	2023-05-24
178d98f4-ec92-4fc2-8b7e-6f2ad1b5c6f7	neutron-1	ntrn	Neutron Coin	f	\N	2023-05-24	2023-05-24
9b025a9d-0a9a-475b-9720-3464d8004967	neutroswap	neutro	Neutroswap	f	\N	2023-05-24	2023-05-24
f3915247-2884-49c9-aa08-544d55c7ba2c	neuy	neuy	NEUY	f	\N	2023-05-24	2023-05-24
26cfe507-5640-4bb5-be15-c7c8bb79b0e0	nevacoin	neva	NevaCoin	f	\N	2023-05-24	2023-05-24
5d835238-4635-4619-97c8-736367ff2684	newb-farm	newb	NewB.Farm	f	\N	2023-05-24	2023-05-24
42b75562-1a06-418c-b54b-4f8c1aec226e	new-bitshares	nbs	New BitShares	f	\N	2023-05-24	2023-05-24
bec10b24-f992-4a92-a3d1-fcd1da35503b	newdex-token	dex	Newdex	f	\N	2023-05-24	2023-05-24
130f5db4-d3e4-475e-b85f-0080ff2c4e7e	new-frontier-presents	nfp	New Frontier Presents	f	\N	2023-05-24	2023-05-24
313b439d-fb09-46bc-8177-110dbc144dd9	new-landbox	land	LandBox	f	\N	2023-05-24	2023-05-24
c5ebe555-a191-4c55-a222-f3b649ce38a9	newm	newm	NEWM	f	\N	2023-05-24	2023-05-24
0a52f311-55cd-4752-804f-df790e09265d	new-order	newo	New Order	f	\N	2023-05-24	2023-05-24
202fad3e-847f-4ef1-a770-e2ba0e0b123c	new-paradigm-assets-solution	npas	New Paradigm Assets Solution	f	\N	2023-05-24	2023-05-24
0de8f8c6-57f8-46f5-b797-08688f562258	newscrypto-coin	nwc	Newscrypto Coin	f	\N	2023-05-24	2023-05-24
be4cbfc5-aa94-4dc0-9fac-5952a566f109	newton	ntn	Newton	f	\N	2023-05-24	2023-05-24
fb28ec2a-d554-4838-9677-65f16e3e20ed	newton-project	new	Newton Project	f	\N	2023-05-24	2023-05-24
2669a93e-a2ee-45ca-a09a-03a589d5c00f	newtowngaming	ntg	NEWTOWNGAMING	f	\N	2023-05-24	2023-05-24
27cd3663-baf0-4ed7-b700-1cd5aff53e9e	new-world-order	state	New World Order	f	\N	2023-05-24	2023-05-24
58ac4101-7dd0-46c5-8860-b1e4a2230733	new-year-token	nyt	New Year	f	\N	2023-05-24	2023-05-24
9328479e-b6c6-4448-ba90-214e30da0383	newyorkcoin	nyc	NewYorkCoin	f	\N	2023-05-24	2023-05-24
ee72f08b-6339-4f36-8b63-cb42cf501ecc	newyork-exchange	nye	NewYork Exchange	f	\N	2023-05-24	2023-05-24
74a24de3-317b-4612-ad87-913820aba973	nexacoin	nexa	Nexa	f	\N	2023-05-24	2023-05-24
a00846a3-086d-4c09-8308-c89ebe01f9e0	nexalt	xlt	Nexalt	f	\N	2023-05-24	2023-05-24
0c30304a-71e8-4e28-9bc9-84f1b5c46521	nexdax	nt	NexDAX	f	\N	2023-05-24	2023-05-24
0451b0bd-5a3a-413d-ac97-bcb7a62cfaf8	nexo	nexo	NEXO	f	\N	2023-05-24	2023-05-24
5fbc6644-0a0c-477b-a057-762274e30d6e	nexon	nxn	Nexon	f	\N	2023-05-24	2023-05-24
1b47b84d-11fe-4ab5-9467-99d1ed54fa86	nextdao	nax	NextDAO	f	\N	2023-05-24	2023-05-24
f632f80d-a7bc-4b27-aac9-424baeeae0a0	next-earth	nxtt	Next Earth	f	\N	2023-05-24	2023-05-24
b68728b2-a0eb-4630-b967-7e427b9c671a	nextexchange	next	NEXT	f	\N	2023-05-24	2023-05-24
ad249b18-be45-4ac0-bc96-b2f98ba016fe	next-level	nxl	Next Level	f	\N	2023-05-24	2023-05-24
b9238693-bc3e-458d-8b03-8c86eedca28c	nextype-finance	nt	NEXTYPE Finance	f	\N	2023-05-24	2023-05-24
8872583a-4c91-4e11-a1b0-0e79a8e4cc9f	nexum	nexm	Nexum	f	\N	2023-05-24	2023-05-24
2e5fac32-b639-4f4b-b947-f79417fde536	nexus	nxs	Nexus	f	\N	2023-05-24	2023-05-24
99b4007b-8115-43c1-ad91-1ce132cd165b	nexus-asa	gp	Nexus ASA	f	\N	2023-05-24	2023-05-24
72d6d029-0b62-45da-806b-a31b2dca7dba	nexus-dubai	nxd	Nexus Dubai	f	\N	2023-05-24	2023-05-24
58f68ffa-3918-452e-a2ba-e8af5151a62e	nexuspad	nexus	Nexuspad	f	\N	2023-05-24	2023-05-24
92bd800e-19ba-4808-97d7-ddff8be5af34	nexus-token	nexus	Nexus Crypto Services	f	\N	2023-05-24	2023-05-24
f51f6ac1-d24c-46e0-b1f5-093a49c8c9fb	nezuko	nezuko	Nezuko	f	\N	2023-05-24	2023-05-24
b6f0c7c9-17eb-4ef6-8df9-e3d1f689c1ed	nezuko-inu	nezuko	Nezuko Inu	f	\N	2023-05-24	2023-05-24
c7379bab-75d9-49b8-b8b3-9049194b94a7	nft11	nft11	NFT11	f	\N	2023-05-24	2023-05-24
0015a106-1385-48f3-b81d-07c342043bcb	nft-art-finance	nftart	NFT Art Finance	f	\N	2023-05-24	2023-05-24
2af45f11-ed7f-4e19-ab59-675ea3e763f5	nftascii	nftascii	NFTASCII	f	\N	2023-05-24	2023-05-24
6e971346-27e1-4631-9a0d-c81e4fd04fb9	nftb	nftb	NFTb	f	\N	2023-05-24	2023-05-24
fe7ea30b-0c75-43ca-9e60-1a8cc0bbcb63	nftblackmarket	nbm	NFTBlackmarket	f	\N	2023-05-24	2023-05-24
dd9b5ac3-87d6-4f4d-80fc-223b8a584f33	nftbomb	nbp	NFTBomb	f	\N	2023-05-24	2023-05-24
4909b286-db68-4cd6-b958-d5e28b3d2381	nftbooks	nftbs	NFTBooks	f	\N	2023-05-24	2023-05-24
d7c42590-bd02-4332-9099-8bde5bbac456	nft-champions	champ	NFT Champions	f	\N	2023-05-24	2023-05-24
057f5aac-0313-419e-b93b-f4dbe0cab3e8	nftcloud	cloud	NFTCloud	f	\N	2023-05-24	2023-05-24
1de600c4-8848-4122-85c5-80b099ff3866	nftdao	nao	NFTDAO	f	\N	2023-05-24	2023-05-24
abd0667d-eb1c-424e-bdb5-8db811a16029	nftdeli	deli	NFTDeli	f	\N	2023-05-24	2023-05-24
5e94f59b-ddf9-4fc3-8b2d-33c9fd751912	nftearth	nfte	NFTEarth	f	\N	2023-05-24	2023-05-24
4dc1a4cf-0266-42fe-b232-53fc66389afc	nfteyez	eye	NftEyez	f	\N	2023-05-24	2023-05-24
7cf2236e-8c6f-467d-bb97-9a43b3746768	nftfundart	nfa	NFTFundArt	f	\N	2023-05-24	2023-05-24
37ea507a-d149-428a-b64d-d90cff121c8d	nft-global-platform	nftg	NFT Global Platform	f	\N	2023-05-24	2023-05-24
2dd8ed65-d111-46d6-8aad-b99b74243632	nftify	n1	NFTify	f	\N	2023-05-24	2023-05-24
414f92ab-5f7d-4ae8-8ead-77bdf716b346	nftlaunch	nftl	NFTLaunch	f	\N	2023-05-24	2023-05-24
1941920a-61e9-436b-ab83-25619e9cdefe	nftlootbox	loot	LootBox.io	f	\N	2023-05-24	2023-05-24
5c3b8a65-77a9-4d6d-ba10-9623bd0cf643	nft-maker	$nmkr	NMKR	f	\N	2023-05-24	2023-05-24
4ccaeef6-1efc-457f-9824-ac74d91815ea	nftmall	gem	NFTmall	f	\N	2023-05-24	2023-05-24
fabaf8f3-d945-4dab-b9c7-43ae503f668e	nftmart-token	nmt	NFTMart	f	\N	2023-05-24	2023-05-24
17ac6617-8863-4908-9ccc-9c24bafdb29b	nft-protocol	nft	NFT Protocol	f	\N	2023-05-24	2023-05-24
57edfa1e-7b48-4c20-ba98-b9a8dd15ee59	nftpunk-finance	nftpunk	NFTPunk.Finance	f	\N	2023-05-24	2023-05-24
e98eb467-6280-40e6-b16d-c540b3583032	nftrade	nftd	NFTrade	f	\N	2023-05-24	2023-05-24
32a980b4-a8ef-4a41-a17c-e3359b37183a	nft-soccer-games	nfsg	NFT Soccer Games	f	\N	2023-05-24	2023-05-24
1b6f0822-c311-42c9-b675-5a1466ca921f	nft-stars	nfts	NFT Stars	f	\N	2023-05-24	2023-05-24
892b3d89-a1ad-4e9e-834d-48938dc2c20f	nftstyle	nftstyle	NFTStyle	f	\N	2023-05-24	2023-05-24
058f9bea-3963-4e74-a85b-30c126db8c72	nft-tone	tone	NFT Tone	f	\N	2023-05-24	2023-05-24
0c781bab-c243-44ef-84c9-bc3079633d1f	nft-worlds	wrld	NFT Worlds	f	\N	2023-05-24	2023-05-24
daf6a5f8-d856-42d6-8d44-2045fb2083fa	nftx	nftx	NFTX	f	\N	2023-05-24	2023-05-24
ae2fb1e6-2cc9-4159-909b-8f6c80c332ad	nfty-token	nfty	NFTY	f	\N	2023-05-24	2023-05-24
aa703b79-a904-4d4c-8669-2c8945b524fa	ngatiger	nga	NGATiger	f	\N	2023-05-24	2023-05-24
298f8663-56d7-4756-a7e6-e8441f7e6336	ngt	ngt	GoSleep NGT	f	\N	2023-05-24	2023-05-24
aa4bae67-f652-4ab1-9f2c-c2f3d7009d0f	niftify	nift	Niftify	f	\N	2023-05-24	2023-05-24
1c8f1f80-0b66-4938-9c79-4e543217b898	nifty-league	nftl	Nifty League	f	\N	2023-05-24	2023-05-24
c69e9a15-8442-413d-852b-11020b5bc4ef	niftypays	nifty	NiftyPays	f	\N	2023-05-24	2023-05-24
57f1499c-76f0-4182-9b18-d16aebf5dbd5	nifty-token	nfty	NFTY DeFi Protocol	f	\N	2023-05-24	2023-05-24
078fcdb4-a7b3-4d81-bceb-840a0f975a92	nightingale-token	ngit	Nightingale Token	f	\N	2023-05-24	2023-05-24
f5019eda-96b7-449e-8137-3b31dfaaa100	nightverse-game	nvg	NightVerse Game	f	\N	2023-05-24	2023-05-24
7078197f-84b7-4dfe-a19e-8ca17bfe17df	niifi	niifi	NiiFi	f	\N	2023-05-24	2023-05-24
a4c21451-e290-4ff3-88e2-40e822be9a0a	nikplace	nik	Nikplace	f	\N	2023-05-24	2023-05-24
5ffba32e-c506-4a25-a123-608739e81f48	nimbus-utility	nimb	Nimbus Utility	f	\N	2023-05-24	2023-05-24
32e4978d-2fba-45bc-b7e5-7046be019881	nimiq-2	nim	Nimiq	f	\N	2023-05-24	2023-05-24
30c6230d-a6dd-4532-a2d5-a49342039838	ninja-protocol	ninja	Ninja Protocol	f	\N	2023-05-24	2023-05-24
ec2422c7-7c1b-4cb9-b5d7-c17a4abfe0fc	ninja-squad	nst	Ninja Squad	f	\N	2023-05-24	2023-05-24
baf20e9d-9012-4e73-ae63-2fd1aa2d312b	ninky	ninky	Idle Ninja Online	f	\N	2023-05-24	2023-05-24
1d675a1f-1122-496d-9aac-1e1cc809247b	ninneko	nino	Ninneko	f	\N	2023-05-24	2023-05-24
fe22ff38-e8d5-4eb0-8646-e5374b914c26	niob	niob	NIOB	f	\N	2023-05-24	2023-05-24
4b3a0d2d-f739-4d8e-a0b1-fcbc1c9898a9	niobio-cash	nbr	Niobio	f	\N	2023-05-24	2023-05-24
007e5270-f9ca-471a-a247-b4081eed6283	niobium-coin	nbc	Niobium Coin	f	\N	2023-05-24	2023-05-24
4547bd0d-b265-46db-8877-cbb8415afa77	nippon-lagoon	nlc	Nippon Lagoon	f	\N	2023-05-24	2023-05-24
75065e45-c920-4c74-a4f5-bd38008c92c3	nirvana-ana	ana	Nirvana ANA	f	\N	2023-05-24	2023-05-24
f420008d-97a2-41d3-a4db-191eae67d5ac	nirvana-meta-mnu-chain	mnu	Nirvana Meta MNU Chain	f	\N	2023-05-24	2023-05-24
252206ae-b29e-49ae-8b32-3d49d18e84af	nirvana-nirv	nirv	Nirvana NIRV	f	\N	2023-05-24	2023-05-24
99bdd637-9834-4b80-b242-106b76544bab	nirvana-prana	prana	Nirvana prANA	f	\N	2023-05-24	2023-05-24
3e719bfd-adc6-4d19-97fe-a108add22895	nitfee	ntf	NITFEE	f	\N	2023-05-24	2023-05-24
3880f16e-b9c3-4ec8-8692-a631fe511ebd	nitro	nitro	Nitro	f	\N	2023-05-24	2023-05-24
35d19638-298d-48c3-a341-02422638860c	nitro-cartel	trove	Arbitrove Governance Token	f	\N	2023-05-24	2023-05-24
441cf54e-afbd-47e1-9071-08beeb12242e	nitroex	ntx	NitroEX	f	\N	2023-05-24	2023-05-24
06c35893-f462-431d-b679-14d24375b352	nitrofloki	nifloki	NitroFloki	f	\N	2023-05-24	2023-05-24
8385decb-7b8c-4c35-8b78-a2d5423d9877	nitro-league	nitro	Nitro League	f	\N	2023-05-24	2023-05-24
d1e41e3a-72b0-4ff9-915c-b30f3f9b0063	nitro-network	ncash	Nitro Network	f	\N	2023-05-24	2023-05-24
98e4c18e-e061-4021-924a-33a49012211f	nitroshiba	nishib	NitroShiba	f	\N	2023-05-24	2023-05-24
feb5d555-1ece-4697-ad12-3cd828d0a82a	nix-bridge-token	voice	Voice	f	\N	2023-05-24	2023-05-24
a90595c3-6ba1-4a69-b07e-cb5089106efb	nkcl-classic	nkclc	NKCL Classic	f	\N	2023-05-24	2023-05-24
60f0e82a-ad09-4663-a337-c3cd32907038	nkn	nkn	NKN	f	\N	2023-05-24	2023-05-24
200228a6-7699-44ae-bf5c-f6298a0fa29a	nkyc-token	nkyc	NKYC Token	f	\N	2023-05-24	2023-05-24
feebcc14-1716-4785-9a3c-dd90db61fcb4	noah-s-ark-coin	nac	Noah's Ark Coin	f	\N	2023-05-24	2023-05-24
6f643467-9e3b-4692-8f5e-73991435744a	noa-play	noa	NOA PLAY	f	\N	2023-05-24	2023-05-24
b320439e-ebfc-4a92-b25a-1850d10e0a83	nobi	nobi	NOBI	f	\N	2023-05-24	2023-05-24
3e21b3c6-92ea-4da0-bf5e-de5b393aa86a	nodeseeds	nds	Nodeseeds	f	\N	2023-05-24	2023-05-24
6a9a0d8a-e67e-4a46-a9bf-12306722506d	nodestats	ns	Nodestats	f	\N	2023-05-24	2023-05-24
6fd3ec74-5768-46a5-96a5-6e6e9c052d98	nodetrade	mnx	Nodetrade	f	\N	2023-05-24	2023-05-24
6ff92cd6-b6e0-485b-aa85-9b17ec96d9d5	nodle-network	nodl	Nodle Network	f	\N	2023-05-24	2023-05-24
d3f468dc-562c-44ed-bddc-a40faf1ff81d	noia-network	noia	Syntropy	f	\N	2023-05-24	2023-05-24
ce24b136-e9b3-42b9-b87e-b6bb4cfdf821	noisegpt	noisegpt	noiseGPT	f	\N	2023-05-24	2023-05-24
74327f20-3c92-462a-8a74-8606f71fd34b	noku	noku	Noku	f	\N	2023-05-24	2023-05-24
78a60f43-1867-43c7-9eea-3140e6a7bfee	nole-inu	n0le	Nole Inu	f	\N	2023-05-24	2023-05-24
050af852-5890-47b8-95ee-940301bd5e03	nolimitcoin	nlc	NoLimitCoin	f	\N	2023-05-24	2023-05-24
c34af13f-075f-47f7-b931-d3ca4d8d1b03	nomad-exiles	pride	Nomad Exiles	f	\N	2023-05-24	2023-05-24
b95ebe12-00af-45db-ac62-54346d7cfc7a	nominex	nmx	Nominex	f	\N	2023-05-24	2023-05-24
75f6b47b-bd8a-428c-ab5b-7b718868a905	non-fungible-yearn	nfy	Non-Fungible Yearn	f	\N	2023-05-24	2023-05-24
72c2d1da-a071-4d1c-9733-5ab2ec1d2a73	no-one	noone	No One	f	\N	2023-05-24	2023-05-24
17c227a8-0e80-4e62-8075-579b6743dd85	noot	noot	NOOT	f	\N	2023-05-24	2023-05-24
c4892734-44c6-4c19-a335-ea6a267c9bfb	noot-ordinals	noot	NOOT (Ordinals)	f	\N	2023-05-24	2023-05-24
18d45381-956e-4a4a-afd5-1561c9fe4d8c	nora-token	nra	Nora	f	\N	2023-05-24	2023-05-24
b069a5f2-74fa-4994-8a39-1946db0f063a	nordek	nrk	Nordek	f	\N	2023-05-24	2023-05-24
9dacd0b5-c69f-4d57-b981-077b4c2fcd94	nord-finance	nord	Nord Finance	f	\N	2023-05-24	2023-05-24
d49f2373-d06e-4a42-97a9-809ff01d4694	norigo	go!	NoriGO!	f	\N	2023-05-24	2023-05-24
edbc13af-b7e5-48e1-a0c1-f72a20f6894f	normie	normie	Normie	f	\N	2023-05-24	2023-05-24
e29e4254-a86c-4bd6-b399-cd0660bd74ec	nosana	nos	Nosana	f	\N	2023-05-24	2023-05-24
6386b5df-12d1-4a72-9c6c-bcdfa2d1f85b	nosturis	ntrs	Nosturis	f	\N	2023-05-24	2023-05-24
b67a833b-7534-4aad-9c3c-275919bdc729	notable	nbl	Notable	f	\N	2023-05-24	2023-05-24
5616bf9c-bff0-4dc2-9bbe-07ba8c243883	note	note	Note	f	\N	2023-05-24	2023-05-24
5c03e52f-1cb1-4277-b666-c13e2db9a7a2	not-financial-advice	nfai	Not Financial Advice	f	\N	2023-05-24	2023-05-24
5fb03170-5fb6-4e6c-a7d9-3519b2f079a7	nothing	nada	Nothing	f	\N	2023-05-24	2023-05-24
9966016e-2c11-499c-b06f-ff34ae720a2c	nothing-token	thing	Nothing Token	f	\N	2023-05-24	2023-05-24
b5a8ca72-2ded-46fe-acc4-54ae74f3f984	notional-finance	note	Notional Finance	f	\N	2023-05-24	2023-05-24
3e3335fd-311d-4b70-a3c6-fda9b812e504	novacoin	nvc	Novacoin	f	\N	2023-05-24	2023-05-24
dd4a459b-9b12-4d9c-9598-50cdd1b63ca4	nova-finance	nova	Nova Finance	f	\N	2023-05-24	2023-05-24
0734295d-85fb-45ff-a4cb-722f838954a2	novara-calcio-fan-token	nov	Novara Calcio Fan Token	f	\N	2023-05-24	2023-05-24
437d6ef9-8d41-4d35-adba-ab6cf44fa6b1	novawchi	vachi	NOVAWCHI	f	\N	2023-05-24	2023-05-24
f869998f-3924-4b05-a63b-8d263b334bdb	novem-gold	nnn	Novem Gold	f	\N	2023-05-24	2023-05-24
83cc5030-773e-427a-8b5e-06852c12eed7	novem-pro	nvm	Novem Pro	f	\N	2023-05-24	2023-05-24
4e1c5697-ee4b-49e7-8bb2-00c67bf6ccc1	nowai	$nowai	NOWAI	f	\N	2023-05-24	2023-05-24
40ce2aef-357a-47b0-acf8-275fbc8cfc49	npick-block	npick	NPick Block	f	\N	2023-05-24	2023-05-24
c6f8696d-9732-4d42-9d80-04c2c0c5b954	n-protocol	n	N Protocol	f	\N	2023-05-24	2023-05-24
07657735-443e-4fb3-b829-b125bd4de67b	nshare	nshare	NSHARE	f	\N	2023-05-24	2023-05-24
4c8e7aed-d100-460a-91fa-c67b7f45c524	nsights	nsi	nSights	f	\N	2023-05-24	2023-05-24
a9b4e212-de0a-43af-bed1-a4556dd39b4d	nsur-coin	nsur	NSUR Coin	f	\N	2023-05-24	2023-05-24
b84669a0-1d63-4a1e-a468-321c051a0cab	nsure-network	nsure	Nsure Network	f	\N	2023-05-24	2023-05-24
4c216f5b-455d-4435-89d8-87bbd3b38e54	nucleon-space	nut	Nucleon	f	\N	2023-05-24	2023-05-24
3c7ca72f-328b-4528-87d9-46828ae6ee15	nucleon-xcfx	xcfx	Nucleon xCFX	f	\N	2023-05-24	2023-05-24
b4886c63-4f47-4de9-91ed-a17ed938322c	nucleus-vision	ncash	Nucleus Vision	f	\N	2023-05-24	2023-05-24
55879d35-5b93-418c-995c-ac7980ef5c0e	nuco-cloud	ncdt	Nuco.Cloud	f	\N	2023-05-24	2023-05-24
7076d8c9-66b5-47fe-976e-f20c42cc4b26	nucypher	nu	NuCypher	f	\N	2023-05-24	2023-05-24
df3e2cb2-93db-4f90-acfd-07cde6c27ad0	nudes	nudes	NUDES	f	\N	2023-05-24	2023-05-24
56f9fc25-f121-40cb-a302-d332508f581a	nugencoin	nugen	Nugencoin	f	\N	2023-05-24	2023-05-24
5a08db5a-a5b2-4c9f-960c-7443ab69a8e4	nuls	nuls	Nuls	f	\N	2023-05-24	2023-05-24
44c5d73a-4680-4750-9ee5-94ee5bf3b504	nulswap	nswap	Nulswap	f	\N	2023-05-24	2023-05-24
a15ef4b2-e8c1-4f00-9201-08bbf18ae738	number-1-token	nr1	Number 1	f	\N	2023-05-24	2023-05-24
74db4f0d-7ff1-462f-8610-c3f669ae8492	numbers-protocol	num	NUM Token	f	\N	2023-05-24	2023-05-24
3ec61b65-c60b-4aa9-bb3d-354e84919e2c	numeraire	nmr	Numeraire	f	\N	2023-05-24	2023-05-24
c7c0973f-debd-489d-930e-afbef982eff4	numi-shards	numi	Numi Shards	f	\N	2023-05-24	2023-05-24
008ba65a-0413-419d-bc5c-2cb0dfae667a	numitor	numi	Numitor	f	\N	2023-05-24	2023-05-24
8a9828ce-75d8-401b-81da-a830f2e9908d	nuna	nuna	Nuna	f	\N	2023-05-24	2023-05-24
c4bac470-8b54-4925-b8ba-66f32136821e	nunet	ntx	NuNet	f	\N	2023-05-24	2023-05-24
ae62495f-bb69-4820-90fe-b9da8194c48e	nunu-spirits	nnt	Nunu Spirits	f	\N	2023-05-24	2023-05-24
f9fe5d89-c8e1-428f-a6ef-71f261175f20	nuon	nuon	Nuon	f	\N	2023-05-24	2023-05-24
dfc903ae-de92-4c7a-9d85-f13c7845256c	nurifootball	nrfb	NuriFootBall	f	\N	2023-05-24	2023-05-24
b0edbdfe-c0b4-438b-988a-e57325b4bc99	nusa-finance	nusa	NUSA	f	\N	2023-05-24	2023-05-24
a54ed78f-13f2-487e-bc03-03c4a87604eb	nusd	susd	sUSD	f	\N	2023-05-24	2023-05-24
14fe755f-1319-4f32-bab0-0c9663697755	nusd-hotbit	nusd	nUSD (HotBit)	f	\N	2023-05-24	2023-05-24
93d7f096-8a7f-46c1-a9a3-50cda007163d	nutgain	nutgv2	NUTGAIN	f	\N	2023-05-24	2023-05-24
46007be6-44f2-427a-8f3b-fd7eb5d6a723	nvidia-tokenized-stock-defichain	dnvda	Nvidia Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
4e635dca-b94e-490e-af3a-2cd642b9320e	nvirworld	nvir	NvirWorld	f	\N	2023-05-24	2023-05-24
5a98bca9-cc90-44b4-9814-fd56de79366e	nxd-next	nxdt	NXD Next	f	\N	2023-05-24	2023-05-24
642a19b5-724c-4cec-a13c-49521d568dee	nxm	nxm	Nexus Mutual	f	\N	2023-05-24	2023-05-24
eb387898-5f1e-4501-b17f-7e7247c64a69	nxt	nxt	NXT	f	\N	2023-05-24	2023-05-24
57bd9329-34f3-49c0-a7d2-ad1fae3070ba	nxusd	nxusd	NXUSD	f	\N	2023-05-24	2023-05-24
a2e79c86-ec1f-40f9-92c6-e30033b0110e	nyancoin	kat	KatKoyn	f	\N	2023-05-24	2023-05-24
89592149-7044-4b2b-b5da-ad6c1739a2a3	nyan-meme-coin	nyan	Nyan Meme Coin	f	\N	2023-05-24	2023-05-24
5ddb7556-3409-4dca-9b0f-c91ef1f45faa	nycccoin	nyc	NewYorkCityCoin	f	\N	2023-05-24	2023-05-24
3cbb0f68-4d1c-4faf-a400-87837cd95ecc	nym	nym	Nym	f	\N	2023-05-24	2023-05-24
5d9876a7-cd22-4f44-a00c-fbbd671431b5	nyzo	nyzo	Nyzo	f	\N	2023-05-24	2023-05-24
718ba817-e5c9-42d9-975f-de583e33fbf4	o3-swap	o3	O3 Swap	f	\N	2023-05-24	2023-05-24
b69207fa-85bc-4f9d-9e29-ed37234cec94	oasis-network	rose	Oasis Network	f	\N	2023-05-24	2023-05-24
6e3735c0-0ad5-46ca-8707-9f77bf846dea	oasys	oas	Oasys	f	\N	2023-05-24	2023-05-24
e5894b44-808a-48d9-872a-c34cfd0c2cb6	oath	oath	OATH	f	\N	2023-05-24	2023-05-24
101d0f48-802f-41ba-8f9c-ab4b4656c466	obortech	obot	Obortech	f	\N	2023-05-24	2023-05-24
65057446-22ae-4be4-9ad9-e023bc92a37a	obrok	obrok	OBRok	f	\N	2023-05-24	2023-05-24
8db007c1-d457-432e-8e64-1c6aa338a07d	observer-coin	obsr	Observer	f	\N	2023-05-24	2023-05-24
f6dc5cf5-9c4e-4807-9586-33d12dc00acf	obsidium	obs	Obsidium	f	\N	2023-05-24	2023-05-24
33bbaaba-fdfa-4a06-98cb-5702668daf7a	obtoken	obt	OB	f	\N	2023-05-24	2023-05-24
9c5ef4a8-8a9b-4f29-a015-a9de0016930b	ocavu-network	ocavu	Ocavu Network	f	\N	2023-05-24	2023-05-24
2e4e4227-0833-4655-9adc-05e6f608dadc	occamfi	occ	OccamFi	f	\N	2023-05-24	2023-05-24
ca2e5855-2c58-48cf-92ed-dd01f03807aa	occamx	ocx	OccamX	f	\N	2023-05-24	2023-05-24
3350e77b-3785-4b75-8e2d-1f5b1e25e04b	oceanex	oce	OceanEX	f	\N	2023-05-24	2023-05-24
c0f5014a-b8f4-472d-b92f-3521578e4bf0	oceanland	oland	OceanLand	f	\N	2023-05-24	2023-05-24
6adaafd3-9bb8-4f86-9678-dd91abc63cfa	ocean-protocol	ocean	Ocean Protocol	f	\N	2023-05-24	2023-05-24
8fde3958-ba0f-4345-ae11-04ac381274ca	oc-protocol	ocp	OC Protocol	f	\N	2023-05-24	2023-05-24
c06d54ce-b617-4ec5-8da4-65914323d577	octaplex-network	plx	Octaplex Network	f	\N	2023-05-24	2023-05-24
50543caa-492e-41a3-886c-d5d95d92645a	octaspace	octa	OctaSpace	f	\N	2023-05-24	2023-05-24
481943b3-e544-47cc-bb33-5e046d16de4b	octavus-prime	octavus	Octavus Prime	f	\N	2023-05-24	2023-05-24
3b06b348-8f1b-43d1-9b1b-76443d084800	octo	octo	Octo	f	\N	2023-05-24	2023-05-24
e4215810-b533-41ab-841c-ea02d0cdb2ab	octofi	octo	OctoFi	f	\N	2023-05-24	2023-05-24
c1025d97-b2ae-435c-ac3a-ec17da51e05c	octo-gaming	otk	Octokn	f	\N	2023-05-24	2023-05-24
5cd03d5d-eb8f-4577-83a4-6d4404b16e18	octopus-network	oct	Octopus Network	f	\N	2023-05-24	2023-05-24
be94d611-e8f8-40f8-aa1c-49616ec4d93f	octopus-protocol	ops	Octopus Protocol	f	\N	2023-05-24	2023-05-24
14307f34-b56f-45fe-86a0-ac59196a80ae	octorand	octo	Octorand	f	\N	2023-05-24	2023-05-24
e9f190c9-a5dd-4ec0-9f16-1f1a79d59a5a	octus-bridge	bridge	Octus Bridge	f	\N	2023-05-24	2023-05-24
dad2ebfa-5a73-440e-953c-2d6f5a14123c	oddz	oddz	Oddz	f	\N	2023-05-24	2023-05-24
9277dd25-9d9d-4222-ad05-3acc126b20db	odem	ode	ODEM	f	\N	2023-05-24	2023-05-24
076e887b-9e0e-48fb-ae5b-e449648e111e	odin-protocol	odin	Odin Protocol	f	\N	2023-05-24	2023-05-24
dbbf1a63-19e3-4dfc-b7a0-5cfe9f574d61	odop	odop	oDOP	f	\N	2023-05-24	2023-05-24
8c633718-ed8f-44a4-9451-5d032f039a4c	oduwa-coin	owc	Oduwa Coin	f	\N	2023-05-24	2023-05-24
bba1bac9-2094-4ad2-84d5-c1578cef9600	odyssey	ocn	Odyssey	f	\N	2023-05-24	2023-05-24
b58c6f37-31e5-44bb-bd69-5d8ae1b0a4df	odysseywallet	odys	OdysseyWallet	f	\N	2023-05-24	2023-05-24
0d054a7c-aa46-485b-b3a5-0a0d65835d1c	oec-bch	bchk	OEC BCH	f	\N	2023-05-24	2023-05-24
d01c4554-6b1c-4bac-abb8-9f41e728f7ce	oec-binance-coin	bnb	OEC Binance Coin	f	\N	2023-05-24	2023-05-24
c559e576-f517-45b5-a143-30a6b4e5d594	oec-btc	btck	OEC BTC	f	\N	2023-05-24	2023-05-24
fce4bcda-981d-46eb-87da-7e1e65ae68f2	oec-chainlink	linkk	OEC Chainlink	f	\N	2023-05-24	2023-05-24
f6ee492c-5b4d-4ff8-983b-ff0cb65c4f6b	oec-dai	daik	OEC DAI	f	\N	2023-05-24	2023-05-24
43a9c999-52c3-42f2-b395-ce1a87abce0e	oec-dot	dotk	OEC DOT	f	\N	2023-05-24	2023-05-24
3570e6b0-0c6f-4b74-8348-87d528f192db	oec-etc	etck	OEC ETC	f	\N	2023-05-24	2023-05-24
af63a37a-98a1-4168-a791-6b5acc4bd520	oec-eth	ethk	OEC ETH	f	\N	2023-05-24	2023-05-24
2be479d1-05a5-438e-be5d-b3760acc3227	oec-fil	filk	OEC FIL	f	\N	2023-05-24	2023-05-24
dcb5074a-c941-4e21-8a25-dc6bea96ce6c	oec-ltc	ltck	OEC LTC	f	\N	2023-05-24	2023-05-24
a570051a-bf98-4a4b-98af-fd8a2f85408b	oec-shib	shibk	OEC SHIB	f	\N	2023-05-24	2023-05-24
87cec458-b315-49e6-a168-e2ba96af297a	oec-token	okt	OKT Chain	f	\N	2023-05-24	2023-05-24
e26f0d09-17d5-4000-88c8-2d6d685be0f1	oec-tron	trxk	OEC Tron	f	\N	2023-05-24	2023-05-24
484f8c31-a321-498a-b17e-c0cea67be122	oec-uni	unik	OEC UNI	f	\N	2023-05-24	2023-05-24
29018c56-b2d4-4771-a3a3-57f272793218	ofero	ofe	Ofero	f	\N	2023-05-24	2023-05-24
7522c338-e948-4836-abb4-496e3bf36269	official-crypto-cowboy-token	occt	Official Crypto Cowboy	f	\N	2023-05-24	2023-05-24
933a4f16-e5ad-4778-aeae-9c2040cb0f6e	offshift	xft	Offshift	f	\N	2023-05-24	2023-05-24
febe0883-4e08-4c16-9220-524e6605266b	offshift-anonusd	anonusd	Offshift anonUSD	f	\N	2023-05-24	2023-05-24
dcbb0c99-3279-47e9-8ece-19a72647de49	ofi-cash	ofi	OFI.cash	f	\N	2023-05-24	2023-05-24
f2e262f8-c7ac-488a-964a-fd4bb288a558	og-fan-token	og	OG Fan Token	f	\N	2023-05-24	2023-05-24
4d1eee1a-2f0f-4746-aa5e-79ffa1648271	oggy-inu	oggy	Oggy Inu	f	\N	2023-05-24	2023-05-24
69dbf8ae-32a3-4db5-926b-3287959eae2c	oh-finance	oh	Oh! Finance	f	\N	2023-05-24	2023-05-24
cff42a5e-ec67-4f24-9f4b-bdf8ffbe60c3	ohms	ohms	OHMS	f	\N	2023-05-24	2023-05-24
35c540cd-cd7f-475d-bcfe-5354ddc00ef9	oho-blockchain	oho	OHO Blockchain	f	\N	2023-05-24	2023-05-24
7c5e15f2-dd11-4477-9e81-91795b14259a	oikos	oks	Oikos	f	\N	2023-05-24	2023-05-24
1b0a9b6a-f332-41a4-95d3-644f5e6a66f2	oiler	oil	Oiler	f	\N	2023-05-24	2023-05-24
47320993-70e8-4805-87a4-c9c9280d4f2f	oil-token-162dc739-3b37-4da2-88a7-0d5b8e03ab14	oil	Oil Token	f	\N	2023-05-24	2023-05-24
0934dcf2-8e05-48b4-b230-611d38e4a83b	oin-finance	oin	OIN Finance	f	\N	2023-05-24	2023-05-24
2fd620b0-05fe-4c01-9553-c5405751d48d	oiocoin	oioc	OIOCoin	f	\N	2023-05-24	2023-05-24
6c7e000b-6fd6-4210-b850-24fc04e1c612	ojamu	oja	Ojamu	f	\N	2023-05-24	2023-05-24
6b4baac8-b321-4ab0-a0e4-df13151461d7	okage-inu	okage	Okage Inu	f	\N	2023-05-24	2023-05-24
43dd3a51-b4b0-4ad3-a7fb-ad558f65743f	okaleido	oka	Okaleido	f	\N	2023-05-24	2023-05-24
4f87efbb-3552-43ea-82cc-a244d13dd528	okami-lana	okana	Okami Lana	f	\N	2023-05-24	2023-05-24
fe8e6cf9-d714-418d-a8a2-22ec32c604ea	okb	okb	OKB	f	\N	2023-05-24	2023-05-24
cbbfdda2-9933-46d8-b498-24c8fc81de83	okcash	ok	Okcash	f	\N	2023-05-24	2023-05-24
9a8e1217-f1a6-4932-928a-8f10945a4f26	okex-fly	okfly	Okex Fly	f	\N	2023-05-24	2023-05-24
9536e4d4-bfca-43e2-bdd4-071ef3ecd1a8	okeycoin	okey	OKEYCOIN	f	\N	2023-05-24	2023-05-24
9792651e-c039-4ca4-bb21-88eb805efc04	okidoki-social	doki	Okidoki Social	f	\N	2023-05-24	2023-05-24
365a4ce3-3b37-406a-922f-fdad816fdd88	ok-lets-go	oklg	ok.lets.go.	f	\N	2023-05-24	2023-05-24
25ac820f-91dd-4717-9293-00057e8268b1	okletsplay	oklp	OkLetsPlay	f	\N	2023-05-24	2023-05-24
6a7af98c-1260-44b0-85f7-45c8d63e3ebe	okratech-token	ort	Okratech	f	\N	2023-05-24	2023-05-24
291c1327-f32d-4e2d-845d-04d1a41e1da4	okse	okse	Okse	f	\N	2023-05-24	2023-05-24
452e2e99-770c-467f-8a48-5a277ec5d4d6	okuru	xot	Okuru	f	\N	2023-05-24	2023-05-24
72c6cd44-3db9-4bcf-9ff0-29573bb2d050	okx-staked-dot1	okdot1	OKX Staked DOT1	f	\N	2023-05-24	2023-05-24
dc603fa5-def5-4572-95d4-02a0c0e8a63a	okx-staked-dot2	okdot2	OKX Staked DOT2	f	\N	2023-05-24	2023-05-24
c5795c7b-7c52-4027-9e72-46f153be3345	old-bitcoin	bc	Old Bitcoin	f	\N	2023-05-24	2023-05-24
6fb69dff-9430-4618-a8bb-7b1515288d64	olecoin	ole	OleCoin	f	\N	2023-05-24	2023-05-24
b2ba39a7-cd1e-4444-abb7-f6df76ff19db	olive	olv	OLIVE	f	\N	2023-05-24	2023-05-24
5a1a0674-d30b-499d-8280-85b1f39fd9fa	olivecash	olive	Olive Cash	f	\N	2023-05-24	2023-05-24
ba18fa84-a223-4564-acc0-2940e433eafe	oloid	oloid	OLOID	f	\N	2023-05-24	2023-05-24
546c97b9-ff21-4f98-94ef-cb856981a666	olympus	ohm	Olympus	f	\N	2023-05-24	2023-05-24
49e9f611-1e50-4baf-bb80-05d6a5485aa6	olympus-v1	ohm	Olympus v1	f	\N	2023-05-24	2023-05-24
d6c47d75-81fa-43d9-aa67-191f2364a5f8	olyverse	oly	Olyverse	f	\N	2023-05-24	2023-05-24
fc5d7352-980b-4bc5-b3ec-6ea60f17df67	omax-token	omax	Omax	f	\N	2023-05-24	2023-05-24
edf8d6b9-29b3-4fb7-a100-04aef2ea512f	ombre	omb	Ombre	f	\N	2023-05-24	2023-05-24
daa0d398-1816-4fc0-81b1-a57dfb7e01ab	omchain	omc	Omchain	f	\N	2023-05-24	2023-05-24
918fc71b-759a-4c30-9a07-08c6ba217280	omega	omega	OMEGA	f	\N	2023-05-24	2023-05-24
8ac0839a-bbf9-42ab-ac8a-da3cc8308ff4	omega-network	omn	Omega Network	f	\N	2023-05-24	2023-05-24
1044c51e-5ecf-4811-85a2-1102e3f08a50	omisego	omg	OMG Network	f	\N	2023-05-24	2023-05-24
35cee957-123d-4098-8ffc-9a4c9b61f135	ommniverse	ommi	Ommniverse	f	\N	2023-05-24	2023-05-24
5eb13bef-869b-47ae-b3f8-24eba2385f99	omni	omni	Omni	f	\N	2023-05-24	2023-05-24
330395aa-12cc-46de-81f7-219ff0977de2	omniaverse	omnia	OmniaVerse	f	\N	2023-05-24	2023-05-24
e55e72b8-0d3d-4b36-a98b-2765aef5dca6	omni-consumer-protocol	ocp	Omni Consumer Protocol	f	\N	2023-05-24	2023-05-24
22470d55-4b56-472b-bf71-41ba06a86447	omniflix-network	flix	OmniFlix Network	f	\N	2023-05-24	2023-05-24
4aede1d1-8f19-4ca6-be5f-904121cc88e1	omnisea	osea	Omnisea	f	\N	2023-05-24	2023-05-24
007ceb4f-4d5e-4e41-aa03-5fc9a7a377f5	omo-exchange	omo	OMO Exchange	f	\N	2023-05-24	2023-05-24
97b82342-80b4-403a-99dc-0957a05e3c11	omotenashicoin	mtns	OmotenashiCoin	f	\N	2023-05-24	2023-05-24
78dc8dd8-ca6a-4d6c-8b7b-753c51536819	onbuff	onit	ONBUFF	f	\N	2023-05-24	2023-05-24
961d4752-d8be-4a31-bbc0-374316564228	onchain-trade	ot	Onchain Trade	f	\N	2023-05-24	2023-05-24
651d5272-a52d-440c-855a-aede012d9702	onchain-trade-protocol	ot	Onchain Trade Protocol	f	\N	2023-05-24	2023-05-24
7297a7df-c253-4792-85b9-8be78663a49f	one	one	One	f	\N	2023-05-24	2023-05-24
a54a4522-cf42-43b7-b2b2-0e5d7164b472	one-basis-cash	obs	One Basis Cash	f	\N	2023-05-24	2023-05-24
69adad4f-5fea-417e-97e2-b59df4a92e26	onebtc	onebtc	Legacy oneBTC	f	\N	2023-05-24	2023-05-24
4ae6b983-b121-4c43-9fd5-6fefd73910c9	one-cash	onc	One Cash	f	\N	2023-05-24	2023-05-24
d501435f-265b-41a0-a2ce-fe340190f69d	onedex	one	OneDex	f	\N	2023-05-24	2023-05-24
0c63d51a-6c4f-42b3-8288-699b703efca1	one-hundred-million-inu	ohmi	One Hundred Million Inu	f	\N	2023-05-24	2023-05-24
a4258476-a353-4cb3-bbbf-67b7d4cc64bc	oneichi	oneichi	oneICHI	f	\N	2023-05-24	2023-05-24
26743c43-f4c6-416f-9c11-9ad638eea405	one-ledger	olt	OneLedger	f	\N	2023-05-24	2023-05-24
1c4fe260-21ef-47e7-9072-51024bfc6329	one-piece	onepiece	ONE PIECE	f	\N	2023-05-24	2023-05-24
6bcc8c98-d105-4efc-9d16-db2a82dbf045	onerare	orare	OneRare	f	\N	2023-05-24	2023-05-24
17a367c9-42b6-478a-985d-fdb46739ac9b	onering	ring	OneRing	f	\N	2023-05-24	2023-05-24
9ed8f2cb-6fe3-4017-a34b-aab13f771172	one-share	ons	One Share	f	\N	2023-05-24	2023-05-24
398340a7-e135-4790-8043-f81a5551d6f9	onespace	1sp	Onespace	f	\N	2023-05-24	2023-05-24
02b40801-c73a-49df-bc35-e3252c86daca	oneswap-dao-token	ones	OneSwap DAO	f	\N	2023-05-24	2023-05-24
9603c622-8fd1-48b6-8c98-d207368ad659	onetokenburn	one	onetokenburn	f	\N	2023-05-24	2023-05-24
93f10999-17f3-4689-ab5f-e3e96100af5b	one-world-coin	owo	One World Coin	f	\N	2023-05-24	2023-05-24
4e7d5d37-622d-4afd-9879-01ee375d8e5f	ong	ong	Ontology Gas	f	\N	2023-05-24	2023-05-24
2e544b19-6c69-42cb-87fb-7bdd15fc0671	onigiri-neko	onigi	Onigiri Neko	f	\N	2023-05-24	2023-05-24
cf82c8b9-f51d-4158-87af-963a7f4b0440	oni-token	oni	ONINO	f	\N	2023-05-24	2023-05-24
d31a4ea2-a56d-4ade-bafc-967e71ff87ac	only1	like	Only1	f	\N	2023-05-24	2023-05-24
3faae443-8c9b-41e6-a7f0-e3c08b6dd40e	onomy-protocol	nom	Onomy Protocol	f	\N	2023-05-24	2023-05-24
f6115e0f-2d75-40e4-97ba-c8e5b9f03957	onooks	ooks	Onooks	f	\N	2023-05-24	2023-05-24
33e1f427-e4b3-4332-9e92-d5c136ffa941	onpulse	opls	OnPulse	f	\N	2023-05-24	2023-05-24
b212935f-5822-4bcd-a5f0-06d318b533a7	onston	onston	Onston	f	\N	2023-05-24	2023-05-24
c0af990e-fd0f-42ce-be20-bece2252f3c3	ontology	ont	Ontology	f	\N	2023-05-24	2023-05-24
ced2d3db-279d-4ef7-b699-4a856aab771b	onus	onus	ONUS	f	\N	2023-05-24	2023-05-24
2f6f8269-4810-4e74-b92d-215886c5569c	onx-finance	onx	OnX Finance	f	\N	2023-05-24	2023-05-24
e48a3ca8-fbc4-4dd2-baee-5f6314fd0a27	onyxdao	onyx	OnyxDAO	f	\N	2023-05-24	2023-05-24
9e696ab7-14bc-4894-9c4a-eec206c97152	oobit	obt	Oobit	f	\N	2023-05-24	2023-05-24
eb7b481a-2041-42f7-bf13-d2763d26573b	oogi	oogi	OOGI	f	\N	2023-05-24	2023-05-24
f12d111b-d7c5-4990-978d-3d845295f3c1	ookeenga	okg	Ookeenga	f	\N	2023-05-24	2023-05-24
7f24fc78-966e-449b-b22f-3e95e86664c9	ooki	ooki	Ooki	f	\N	2023-05-24	2023-05-24
34215655-7704-407c-a947-cff318ed5608	oort-digital	oort	Oort Digital	f	\N	2023-05-24	2023-05-24
7b2505dc-07d2-40d0-bb3c-1fe0fa9dbe26	opacity	opct	Opacity	f	\N	2023-05-24	2023-05-24
de55c10f-9e14-4e52-ae31-be8a9193c784	opalcoin	auop	Opalcoin	f	\N	2023-05-24	2023-05-24
8a4a4e8b-8b32-426b-95b4-d274bad2f616	openai-erc	openai erc	OpenAI ERC	f	\N	2023-05-24	2023-05-24
32312643-05a0-4bf4-b146-045ed23b5bef	openalexa-protocol	oap	OpenAlexa Protocol	f	\N	2023-05-24	2023-05-24
df571637-de93-4029-baf2-281013ef54d8	openanx	oax	OAX	f	\N	2023-05-24	2023-05-24
8bf36dfe-4f3f-4eb3-8887-463931bc1d1a	openbetai	openbet	OpenbetAI	f	\N	2023-05-24	2023-05-24
98b28ea0-b667-4736-9d7a-3a1c221614e4	openblox	obx	OpenBlox	f	\N	2023-05-24	2023-05-24
54faf9d5-c6bb-4f9d-ab99-8199f648a5a1	opendao	sos	OpenDAO	f	\N	2023-05-24	2023-05-24
d4915bd9-36d5-4a31-9e44-0db900d77dd6	open-governance-token	open	OPEN Governance	f	\N	2023-05-24	2023-05-24
86dc5010-0be2-49b8-ab94-5ce158ba6929	openleverage	ole	OpenLeverage	f	\N	2023-05-24	2023-05-24
b3c0a8be-d4cc-43ec-9653-9fd7758fb358	openlive-nft	opv	OpenLive NFT	f	\N	2023-05-24	2023-05-24
ea96ae11-1023-4e0c-a2fa-e3489a12ae11	open-meta-trade	omt	Open Meta Trade	f	\N	2023-05-24	2023-05-24
a427cd29-471b-4c3a-83ee-1797296a191d	openocean	ooe	OpenOcean	f	\N	2023-05-24	2023-05-24
b9ffa88f-9d40-45d7-b1d6-6a2993c6de90	open-platform	open	Open Platform	f	\N	2023-05-24	2023-05-24
c0524c8a-0a99-4418-9a0e-76e2c9f2d134	open-proprietary-protocol	opp	Open Proprietary Protocol	f	\N	2023-05-24	2023-05-24
55816ee3-dbe5-46b9-bb33-87d9f2caacbe	openstream-world	osw	OpenStream World	f	\N	2023-05-24	2023-05-24
b7539041-296b-462d-92b0-c3ba64b6b12d	openswap	oswap	OpenSwap	f	\N	2023-05-24	2023-05-24
6ad828ea-d061-4955-be44-9377e5618949	openswap-token	openx	OpenSwap.One	f	\N	2023-05-24	2023-05-24
5ca77aef-03f8-4870-80e5-1aae3dbd24ca	openx-locked-velo	opxvevelo	OpenX Locked Velo	f	\N	2023-05-24	2023-05-24
cba02877-ecda-4359-9cb7-cc9db75a6da8	openxswap	openx	OpenXSwap	f	\N	2023-05-24	2023-05-24
13d1bea7-34c0-4ff3-96af-28d2314f4163	openxswap-gov-token	xopenx	OpenXSwap Gov. Token	f	\N	2023-05-24	2023-05-24
54191e97-7759-4d75-b96a-191cc5682d1b	operon-origins	oro	Operon Origins	f	\N	2023-05-24	2023-05-24
6e231d5b-f2b2-400d-951f-64dbab570636	opes-wrapped-pe	wpe	OPES (Wrapped PE)	f	\N	2023-05-24	2023-05-24
09c8812f-5ad5-43b1-9ae5-dbab4f531ca7	opipets	opip	OpiPets	f	\N	2023-05-24	2023-05-24
152296e0-c539-4fc8-89b1-1c5a1496a2c5	opium	opium	Opium	f	\N	2023-05-24	2023-05-24
9f6e1a0b-6e18-4073-8643-41d4417732d8	oppa	oppa	OPPA	f	\N	2023-05-24	2023-05-24
bfc49f56-529f-4861-b925-1bd3973ca449	optical-bitcoin	obtc	Optical Bitcoin	f	\N	2023-05-24	2023-05-24
e5285fe0-b4f3-459f-a3bc-4dfdce367f70	opticash	opch	Opticash	f	\N	2023-05-24	2023-05-24
94214e11-0dbd-4b52-98ab-b5cc52f2519e	optimism	op	Optimism	f	\N	2023-05-24	2023-05-24
c39a8036-d0ee-4a6d-a3a6-19e18822731a	optimism-doge	odoge	Optimism Doge	f	\N	2023-05-24	2023-05-24
9979f043-3a5e-4af1-8a3e-9aaf663721ff	optimism-pepe	opepe	Optimism PEPE	f	\N	2023-05-24	2023-05-24
a0a8112a-c4ba-4235-bf01-f1cbe6482908	optimus	optcm	Optimus	f	\N	2023-05-24	2023-05-24
a1199f63-256c-4e26-96b0-5d67ebb418ed	optimus-ai	opti	Optimus AI	f	\N	2023-05-24	2023-05-24
6d548ed6-b42c-4e41-bd8e-c3617c90e3fa	optimus-al-bsc	optimus al	Optimus Al (BSC)	f	\N	2023-05-24	2023-05-24
2a10c9a5-fd4a-4a84-aa3a-c234e82b5d21	optimus-inu	opinu	Optimus Inu	f	\N	2023-05-24	2023-05-24
522b0d9c-76a8-4e90-b3f0-d69dd19369f5	optimus-opt	opt	Optimus OPT	f	\N	2023-05-24	2023-05-24
554f4fb4-4343-424c-acae-80fa07739123	option-panda-platform	opa	Option Panda Platform	f	\N	2023-05-24	2023-05-24
1b71a7f1-149f-4649-84e6-c857b77bed01	option-room	room	OptionRoom	f	\N	2023-05-24	2023-05-24
a5d2e90a-7fd4-4ddd-9464-89972f1694c8	opulous	opul	Opulous	f	\N	2023-05-24	2023-05-24
29786aaf-5228-409f-bf5e-3a773c7757c7	opx-finance	opx	OPX Finance	f	\N	2023-05-24	2023-05-24
54f14990-4320-4c68-834f-be3a41408045	opxsliz	opxvesliz	opxSliz	f	\N	2023-05-24	2023-05-24
6a86303e-9a0e-4379-ae36-f7e19b60eefb	opyn-squeeth	osqth	Opyn Squeeth	f	\N	2023-05-24	2023-05-24
705fd527-a9c8-4e6a-add5-68f22705cd15	oraclechain	oct	OracleChain	f	\N	2023-05-24	2023-05-24
17e026b2-afe4-477c-b695-6c66f50b420b	oracleswap	oracle	OracleSwap	f	\N	2023-05-24	2023-05-24
e7842123-a2e3-418b-90c3-58f0a7bacd17	oragonx	orgn	OragonX	f	\N	2023-05-24	2023-05-24
ce0e0ae1-6e47-4085-9379-6db41c003ec4	oraichain-token	orai	Oraichain	f	\N	2023-05-24	2023-05-24
e59a7b5d-bbcb-4820-89b7-d00780b10445	oraidex	oraix	OraiDEX	f	\N	2023-05-24	2023-05-24
60b35aee-6d81-44ef-8c12-53da53af3545	orao-network	orao	ORAO Network	f	\N	2023-05-24	2023-05-24
9aa798f1-3a1f-4c2d-aec6-f5b161cc5b7a	orbeon-protocol	orbn	Orbeon Protocol	f	\N	2023-05-24	2023-05-24
cd92ff93-5f4e-47ef-a7c5-63434063a4bf	orbis	orbc	Orbis	f	\N	2023-05-24	2023-05-24
9a25fb72-2de1-43f5-a556-219fd9bbf6e5	orbitau-taureum	taum	Orbitau Taureum	f	\N	2023-05-24	2023-05-24
838ebb5a-74a6-4fba-9a2e-318533ed5112	orbit-bridge-klaytn-belt	obelt	Orbit Bridge Klaytn BELT	f	\N	2023-05-24	2023-05-24
65e0670a-9100-4040-b929-f441ab71be23	orbit-bridge-klaytn-binance-coin	obnb	Orbit Bridge Klaytn Binance Coin	f	\N	2023-05-24	2023-05-24
bb1133aa-fd51-40b5-b5a2-2755f42f58c9	orbit-bridge-klaytn-ethereum	oeth	Orbit Bridge Klaytn Ethereum	f	\N	2023-05-24	2023-05-24
32cd2233-b5a2-42fa-87a8-a138e758f101	orbit-bridge-klaytn-handy	ohandy	Orbit Bridge Klaytn Handy	f	\N	2023-05-24	2023-05-24
a815c4b4-1064-45a9-9f02-ace6e2757c35	orbit-bridge-klaytn-matic	omatic	Orbit Bridge Klaytn MATIC	f	\N	2023-05-24	2023-05-24
36456a7f-2fe7-4fb4-8809-fd69b9a29397	orbit-bridge-klaytn-orbit-chain	oorc	Orbit Bridge Klaytn Orbit Chain	f	\N	2023-05-24	2023-05-24
cab7bcd8-2330-487e-bbed-97f69504781d	orbit-bridge-klaytn-ripple	oxrp	Orbit Bridge Klaytn Ripple	f	\N	2023-05-24	2023-05-24
5ee42e21-9057-40d9-b2cc-9a61c473c082	orbit-bridge-klaytn-usdc	ousdc	Orbit Bridge Klaytn USDC	f	\N	2023-05-24	2023-05-24
223d5f13-2f8e-4558-875f-728aae1b7656	orbit-bridge-klaytn-usd-tether	ousdt	Orbit Bridge Klaytn USD Tether	f	\N	2023-05-24	2023-05-24
675727b9-bf20-4f92-aa7a-e67be17d2c02	orbit-bridge-klaytn-wrapped-btc	owbtc	Orbit Bridge Klaytn Wrapped BTC	f	\N	2023-05-24	2023-05-24
1b35c6d2-082b-454d-802d-56102d2978f4	orbit-chain	orc	Orbit Chain	f	\N	2023-05-24	2023-05-24
260746d6-ef01-479f-b46d-f69ef5f7d571	orbitcoin	orb	Orbitcoin	f	\N	2023-05-24	2023-05-24
0160991b-82f6-48db-b807-b72290d0e2da	orbit-token	orbit	First On The Moon ORBIT	f	\N	2023-05-24	2023-05-24
5ab7b3c1-e9ac-42c2-a86f-d438742955c9	orbler	orbr	Orbler	f	\N	2023-05-24	2023-05-24
1c8d8a0e-d852-406a-8cb9-6452bb4def22	orbofi-ai	obi	Orbofi AI	f	\N	2023-05-24	2023-05-24
676eb58a-958e-4f3e-b432-d3bef3976db6	orbs	orbs	Orbs	f	\N	2023-05-24	2023-05-24
7b00b0fe-5013-4191-a272-e4cf99fb019b	orca	orca	Orca	f	\N	2023-05-24	2023-05-24
4f4fbb89-5aa9-4be9-867b-b8e70392c284	orca-avai	avai	Orca AVAI	f	\N	2023-05-24	2023-05-24
6f595259-4f1a-4281-9303-dfb5a27f7966	orcadao	orca	Orca DAO	f	\N	2023-05-24	2023-05-24
b26db44e-9cbc-48fc-b83a-85f5ab6ade31	orchid-protocol	oxt	Orchid Protocol	f	\N	2023-05-24	2023-05-24
97884202-565a-40e4-8de8-4685109c2650	orclands-metaverse	orc	Orclands Metaverse	f	\N	2023-05-24	2023-05-24
153e4f9a-81af-490a-a412-9926b167cf9e	ordinal-btc	obtc	Ordinal BTC	f	\N	2023-05-24	2023-05-24
4caaabf8-658c-436f-a01e-a4d901ed8c44	ordinal-doge	odoge	Ordinal Doge	f	\N	2023-05-24	2023-05-24
9d9a5eae-6cab-4865-9a02-639dbd553f17	ordinals	ordi	ORDI	f	\N	2023-05-24	2023-05-24
309ed33a-b095-450e-9641-cd4448fa0cef	ordinals-deflation	odef	Ordinals Deflation	f	\N	2023-05-24	2023-05-24
c474fb90-ca11-4925-8c8d-c37f33384613	ordinals-finance	ofi	Ordinals Finance	f	\N	2023-05-24	2023-05-24
a92e1e6c-342a-4763-9e35-48d94ecbf279	ordinex	ord	ordinex	f	\N	2023-05-24	2023-05-24
d536b22a-f7a7-407e-9a6e-5821dc8fc3bc	oreofi	oreo	OreoFi	f	\N	2023-05-24	2023-05-24
166d0f12-8a1f-4ea1-b57e-94ce222328c6	oreoswap	oreo	OreoSwap	f	\N	2023-05-24	2023-05-24
77f62761-4d50-44b7-b7f6-721628c2c721	ore-token	ore	ORE	f	\N	2023-05-24	2023-05-24
7397aaef-2f91-4ed6-a0e5-448c8e4ad396	oreto-network	ort	Oreto Network	f	\N	2023-05-24	2023-05-24
3085d5a8-b42c-448c-be2c-ea5ba8cd67cf	origen-defi	origen	Origen DEFI	f	\N	2023-05-24	2023-05-24
45906903-a681-4933-b12c-d717cf150b62	original-crypto-coin	tusc	The Universal Settlement Coin	f	\N	2023-05-24	2023-05-24
f56bb550-9852-4bf6-a94b-d0ecb4a28cfa	origin-dollar	ousd	Origin Dollar	f	\N	2023-05-24	2023-05-24
d1014c2f-a53d-4a1d-85c9-a9a7546c0954	origin-dollar-governance	ogv	Origin Dollar Governance	f	\N	2023-05-24	2023-05-24
e716eb6e-dcbd-4fec-8e41-0a8f2f52cdd2	origin-ether	oeth	Origin Ether	f	\N	2023-05-24	2023-05-24
3430df4f-ef0f-4e0c-8b99-1858feb16c5e	origin-protocol	ogn	Origin Protocol	f	\N	2023-05-24	2023-05-24
4e6fa48b-7a7b-4d73-a226-86d83f3629db	origin-sport	ors	Origin Sport	f	\N	2023-05-24	2023-05-24
97cb5684-d256-4f3d-9e10-2dad224aa2d3	origintrail	trac	OriginTrail	f	\N	2023-05-24	2023-05-24
d060d7d4-5628-4e10-8e9c-d086ccb0c85c	origyn-foundation	ogy	ORIGYN Foundation	f	\N	2023-05-24	2023-05-24
83ee10df-4853-44a1-a5a1-53814ae6fb41	orion-money	orion	Orion Money	f	\N	2023-05-24	2023-05-24
83631bcd-ab63-496b-95b1-317cc480577a	orion-protocol	orn	Orion Protocol	f	\N	2023-05-24	2023-05-24
2f4835dd-0a09-44e5-a5c0-875a2d3f15e5	orkan	ork	Orkan	f	\N	2023-05-24	2023-05-24
a0675ecc-9847-484f-a978-f2ca40d46529	ormeus-cash	omc	Ormeus Cash	f	\N	2023-05-24	2023-05-24
a5c37da2-668a-4411-8381-2964dccdb28f	ormeuscoin	orme	Ormeus Coin	f	\N	2023-05-24	2023-05-24
61bd9dd4-b634-457e-a2e8-edd1437c9653	ormeus-ecosystem	eco	Ormeus Ecosystem	f	\N	2023-05-24	2023-05-24
6fb3a713-9cb1-477c-8514-97b25cb5360e	orne	orne	Orne	f	\N	2023-05-24	2023-05-24
4f22148d-6280-44d6-8a79-987d5834f092	oro	oro	ORO	f	\N	2023-05-24	2023-05-24
ed993006-dd8d-43d1-a726-4ea92be509a3	orpo	orpo	ORPO	f	\N	2023-05-24	2023-05-24
f27db198-ed31-4581-b649-ab75546ded0a	oshi	oshi	OSHI	f	\N	2023-05-24	2023-05-24
228a2c58-808f-40a6-8d2b-27e7e6f6f0c6	osis	osis	OSIS	f	\N	2023-05-24	2023-05-24
04f89b04-e743-493c-8ee3-ee50bc9abd85	osk	osk	OSK	f	\N	2023-05-24	2023-05-24
a722935b-7a09-4c36-948c-a063b2a45207	osmosis	osmo	Osmosis	f	\N	2023-05-24	2023-05-24
697b2e9c-9ff4-4209-9a4d-d45c03162404	ospy	ospy	OSPY	f	\N	2023-05-24	2023-05-24
233be9e5-b773-48ec-99f6-3ad04d3ee1c2	otcbtc-token	otb	OTCBTC	f	\N	2023-05-24	2023-05-24
bc4cb08c-e206-4eec-a8a0-ff0861472887	otherdao	othr	OtherDAO	f	\N	2023-05-24	2023-05-24
162a5631-a75b-4490-9c8c-d60831d66efa	otocash	oto	OTOCASH	f	\N	2023-05-24	2023-05-24
9a68c957-91bd-463e-a9c9-ae8e63e62a8f	otterclam	clam	OtterClam	f	\N	2023-05-24	2023-05-24
63c62409-3c0c-4cce-9be2-368cfe80a35c	ouro-governance-share	ogs	Ouro Governance Share	f	\N	2023-05-24	2023-05-24
0c045ffb-84f5-437d-aa03-52208dd32a0a	ousg	ousg	OUSG	f	\N	2023-05-24	2023-05-24
09df486c-c967-488d-a220-abef2f3d6579	outdefine	outdefine	Outdefine	f	\N	2023-05-24	2023-05-24
1c08820c-302d-42b6-9787-be86fc9be9f2	outer-ring	gq	Outer Ring MMO	f	\N	2023-05-24	2023-05-24
d962ec5c-da50-4251-911f-d006d8f63ed4	outrace	ore	Outrace	f	\N	2023-05-24	2023-05-24
e1137e0b-b6b7-47eb-8255-2ee9b392e5e7	ovato	ovo	Ovato	f	\N	2023-05-24	2023-05-24
316c11f8-c93e-4501-926a-dfc782731471	overlay-protocol	ovl	Overlay Protocol	f	\N	2023-05-24	2023-05-24
38e14a75-dae5-495e-9c96-97e5fe2f9a35	overnight-dai	dai+	Overnight.fi DAI+	f	\N	2023-05-24	2023-05-24
354b2e21-e223-4dba-945a-ba2523cf048f	ovols-floor-index	$ovol	Ovols Floor Index	f	\N	2023-05-24	2023-05-24
a31d2085-777d-4c3c-8401-d8a6837c4431	ovo-nft-platform	ovo	OVO	f	\N	2023-05-24	2023-05-24
99984dcb-9694-4fd7-b970-b4f9c33c67bd	ovr	ovr	Ovr	f	\N	2023-05-24	2023-05-24
18800b4c-b2a6-496a-a5cf-4afe12d406c8	owldao	owl	OwlDAO	f	\N	2023-05-24	2023-05-24
54dbca31-625a-4f56-b715-2fc2c07a9c39	owloper	owl	Owloper Owl	f	\N	2023-05-24	2023-05-24
6a0c85b3-8df4-45e4-bf5e-454bf0b77df4	ownly	own	Ownly	f	\N	2023-05-24	2023-05-24
1b64c11b-629b-4139-b926-96f5915daa55	own-token	own	OWN Token	f	\N	2023-05-24	2023-05-24
c732e08a-2e53-4ae9-9afc-6c440a62e4b1	oxai-com	oxai	OxAI.com	f	\N	2023-05-24	2023-05-24
7f721720-74c1-43fd-bf39-c0b3d34f1bbe	oxbitcoin	0xbtc	0xBitcoin	f	\N	2023-05-24	2023-05-24
850e0440-0a27-4bc4-abd0-26ce0bd208ae	oxbull-solana	oxs	Oxbull Solana	f	\N	2023-05-24	2023-05-24
f1054661-ab61-4a08-a43b-13d9592d6616	oxbull-tech-2	oxb	Oxbull Tech	f	\N	2023-05-24	2023-05-24
9639ad15-4f6e-4789-baf2-027e0bff8164	oxygen	oxy	Oxygen	f	\N	2023-05-24	2023-05-24
b393f41d-86d0-427e-89c3-12d9158b5930	oxymetatoken	omt	OxyMetaToken	f	\N	2023-05-24	2023-05-24
7deb66c9-5e7b-4335-aa1a-669ae24f47f4	oxyo2	ox2	OxyO2	f	\N	2023-05-24	2023-05-24
0d6bacc0-ceb0-46e2-ab4a-1f60ae72afc9	ozonechain	ozone	Ozonechain	f	\N	2023-05-24	2023-05-24
76e88758-0659-4e59-bedf-fb81bba9aed7	p2p-solutions-foundation	p2ps	P2P solutions foundation	f	\N	2023-05-24	2023-05-24
c1420ea0-3c18-4f1b-810d-9d288c3a1036	p2p-taxi	p2ptxt	p2p taxi	f	\N	2023-05-24	2023-05-24
c8f14d54-38e0-48b4-a14d-d96c0754aeac	paccoin	pac	PAC Protocol	f	\N	2023-05-24	2023-05-24
212610ad-eb89-422d-aff5-f6e9008da076	pacific	paf	Pacific	f	\N	2023-05-24	2023-05-24
b44d9110-49d5-49a7-bece-5e7bd5897cfa	pack	pack	Pack	f	\N	2023-05-24	2023-05-24
ff3fc3ac-56fa-41df-96ad-9e355c2afd8a	packageportal	port	PackagePortal	f	\N	2023-05-24	2023-05-24
be53b31b-0c7b-4119-8a52-5e35fef6e35d	packetchain	ptcl	Packetchain	f	\N	2023-05-24	2023-05-24
373382ef-9556-42c8-b2a7-00f7ed2fb7ca	pacman-native-token	pac	Pacman Native Token	f	\N	2023-05-24	2023-05-24
2754e2b0-ceac-436f-80fc-6ced6c5ef007	pacoca	pacoca	Pacoca	f	\N	2023-05-24	2023-05-24
f25343d9-a6dc-4abd-ba63-2baba3bb97db	paid-network	paid	PAID Network	f	\N	2023-05-24	2023-05-24
b854bb65-3586-450f-ba3e-5b6e9385e177	paint	paint	MurAll	f	\N	2023-05-24	2023-05-24
6f6cb887-18a4-4ea3-b011-08a8c3832548	paint-swap	brush	Paint Swap	f	\N	2023-05-24	2023-05-24
594b62f1-da59-4133-b2c9-c94348e4fed4	pakcoin	pak	Pakcoin	f	\N	2023-05-24	2023-05-24
ca550a74-acd6-463c-9479-b2aaf82685c1	palace	paa	Palace	f	\N	2023-05-24	2023-05-24
5918c4e6-4dc7-4228-a7b2-095ae13b4a00	paladin	pal	Paladin	f	\N	2023-05-24	2023-05-24
80aa90ac-9f47-46d0-b8e7-76a94bbf3383	palantir-tokenized-stock-defichain	dpltr	Palantir Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
9c6a13cd-34e8-4598-9a53-e539ef06d7dd	palette	plt	Palette	f	\N	2023-05-24	2023-05-24
3f8c01ac-b6e7-4b21-8395-11f512daa5ac	palgold	palg	PalGold	f	\N	2023-05-24	2023-05-24
78f2e321-145f-4110-bff3-4fa7890d31c1	pallapay	palla	Pallapay	f	\N	2023-05-24	2023-05-24
69e9a9c1-dd98-438a-8e0e-8d07a3a283bf	palmeiras-fan-token	verdao	Palmeiras Fan Token	f	\N	2023-05-24	2023-05-24
b9a09001-9ee6-498f-aafc-9be3be3dcde2	palmpay	palm	PalmPay	f	\N	2023-05-24	2023-05-24
00bd429c-3b59-49e1-9966-59f2656b4c65	palmswap	palm	PalmSwap	f	\N	2023-05-24	2023-05-24
a6f6e0bf-6fc8-4d78-b1dd-0bb9386df274	pancake-bunny	bunny	Pancake Bunny	f	\N	2023-05-24	2023-05-24
310f1633-a208-4c2f-9b8c-74d61e0eab97	pancake-games	gcake	Pancake Games	f	\N	2023-05-24	2023-05-24
e27ea9ae-d7e2-4ed6-9e52-8784422885b4	pancake-hunny	hunny	Hunny Finance	f	\N	2023-05-24	2023-05-24
b96e7e9b-1210-4fe7-bc8d-2a8bed64573f	pancakeswap-token	cake	PancakeSwap	f	\N	2023-05-24	2023-05-24
6bb8d369-5539-4e52-9a07-72ade5cd93bc	pancaketools	tcake	PancakeTools	f	\N	2023-05-24	2023-05-24
7db5f0b1-2e3a-4de3-9ba4-1cd4d3b47da4	pandacoin	pnd	Pandacoin	f	\N	2023-05-24	2023-05-24
7c38a258-e03c-4ae4-b05b-9e2ce1a5bed8	panda-coin	panda	Panda Coin	f	\N	2023-05-24	2023-05-24
f945fc35-efab-46db-aa02-3356a48ee236	pandadao	panda	PandaDAO	f	\N	2023-05-24	2023-05-24
4002096e-3721-4cc2-a7a3-96c8e6151c0b	pandai	pandai	PandAI	f	\N	2023-05-24	2023-05-24
fdbc7990-c4ea-4cc8-967d-5476afb91e48	pando	pando	Pando	f	\N	2023-05-24	2023-05-24
c1db0f44-8090-4dca-8be4-bb0fd2091c32	pandora-cash	pcash	Pandora Cash	f	\N	2023-05-24	2023-05-24
9d6c4185-d287-4545-b9ca-0e7356553c73	pandora-protocol	pndr	Pandora Finance	f	\N	2023-05-24	2023-05-24
6defa0a0-9880-4ade-a22c-d9ea9babec02	pandora-spirit	psr	Pandora Spirit	f	\N	2023-05-24	2023-05-24
7ca036da-b1c7-4d7f-a2bb-a6a842058c51	pando-token	ptx	PandoProject	f	\N	2023-05-24	2023-05-24
ada922fb-d7ca-470e-a1cc-e08421d8049e	pando-usd	pusd	Pando USD	f	\N	2023-05-24	2023-05-24
79857626-c550-478d-8bf6-072414a0224e	pangea-governance-token	stone	PANGEA GOVERNANCE TOKEN	f	\N	2023-05-24	2023-05-24
7689d692-2269-4833-a7fc-cac9315d716f	pangolin	png	Pangolin	f	\N	2023-05-24	2023-05-24
80e3f3b5-f7bb-4110-8fc3-d6ecdd595776	pangolin-flare	pfl	Pangolin Flare	f	\N	2023-05-24	2023-05-24
0cb75571-fc13-4021-846d-6bbb5506be2c	pangolin-hedera	pbar	Pangolin Hedera	f	\N	2023-05-24	2023-05-24
cc48435c-8c11-45e8-aa70-1e4db8e617ef	pangolin-songbird	psb	Pangolin Songbird	f	\N	2023-05-24	2023-05-24
21661176-3d61-46f5-818b-f4f2c49e1e6c	panicswap	panic	PanicSwap	f	\N	2023-05-24	2023-05-24
1d0427c1-e489-4785-9e6a-c0dc42024b55	panjea	panj	Panjea	f	\N	2023-05-24	2023-05-24
26c6e775-471c-4a4c-9e48-b866be2a620d	pankuku	kuku	panKUKU	f	\N	2023-05-24	2023-05-24
1aff5912-8d11-4335-9037-e5cd441a49b9	panorama-swap-token	panx	Panorama Swap Token	f	\N	2023-05-24	2023-05-24
6b1cc89b-c985-4a48-a182-982823bee581	pantheon-x	xpn	PANTHEON X	f	\N	2023-05-24	2023-05-24
0132b782-54a4-4991-9172-cc9fde8987ec	panther	zkp	Panther Protocol	f	\N	2023-05-24	2023-05-24
5082b897-40b9-4a1f-b30f-fdf558296d3f	pantomime	panto	Pantomime	f	\N	2023-05-24	2023-05-24
a2362490-f2ff-4c3d-a648-f06b211b23f3	pantos	pan	Pantos	f	\N	2023-05-24	2023-05-24
35ecaba4-37e7-453e-9447-3578b7346383	panvala-pan	pan	Panvala Pan	f	\N	2023-05-24	2023-05-24
35f1795a-f1f0-469f-b38a-0816e31b8278	papa	papa	Papa	f	\N	2023-05-24	2023-05-24
0f87f3fb-d182-484f-aff7-8abbcb6b0bf5	papa-doge	papadoge	Papa Doge	f	\N	2023-05-24	2023-05-24
9ef5db75-e07c-4ba6-8140-d1d194a12ced	paper-dab1cd41-029d-4207-b87f-fd98d6fe737c	$paper	$PAPER	f	\N	2023-05-24	2023-05-24
05168bc1-959d-4f64-aa17-d1f386122549	paper-dao	ppr	Paper DAO	f	\N	2023-05-24	2023-05-24
d55c2b73-31a2-42b8-a096-2bbbfbbd38d6	paper-fantom	paper	Paper	f	\N	2023-05-24	2023-05-24
17964ae0-b506-440f-9c94-b22d973633d5	pappay	pappay	Pappay	f	\N	2023-05-24	2023-05-24
31c713fe-e645-4793-a132-b2296fbb03cc	parachute	par	Parachute	f	\N	2023-05-24	2023-05-24
d03adaa8-313d-4883-90f5-f84a7530c0cf	paradigm-zero	pz	Paradigm Zero	f	\N	2023-05-24	2023-05-24
2c8e6473-e95b-4879-86aa-2934f83cea65	paradise-defi	pdf	Paradise Defi	f	\N	2023-05-24	2023-05-24
3e11327e-939a-40e4-b220-b2e0cb589a7d	paradisefi	eden	ParadiseFi	f	\N	2023-05-24	2023-05-24
1db39431-616a-4125-9922-3dd17ea70c52	paradox-metaverse	paradox	Paradox Metaverse	f	\N	2023-05-24	2023-05-24
3d874253-0595-4cb5-89a5-84ec5fcbe73e	paragen	rgen	Paragen	f	\N	2023-05-24	2023-05-24
13d206c0-5e39-4dd4-ad12-dbfbfdf19f88	paragonsdao	pdt	ParagonsDAO	f	\N	2023-05-24	2023-05-24
525050c1-d78d-443f-9ff2-ee00f9ae2c99	paralink-network	para	Paralink Network	f	\N	2023-05-24	2023-05-24
78cc9197-3188-4e89-880a-947bcaf82cbc	parallel-finance	para	Parallel Finance	f	\N	2023-05-24	2023-05-24
e9da8c20-0df3-4e42-9840-548e6658fa50	paras	paras	Paras	f	\N	2023-05-24	2023-05-24
2497d150-c01e-4d8c-868c-6e08ef81efc3	parasol-finance	psol	Parasol Finance	f	\N	2023-05-24	2023-05-24
12e871bc-8b99-47cf-893f-80786efe50bb	paraswap	psp	ParaSwap	f	\N	2023-05-24	2023-05-24
8501a313-b6f3-45c1-98d5-17274616dbf7	paratoken-2	para	Para	f	\N	2023-05-24	2023-05-24
b0b9acf5-69b8-4175-b2f7-994493ba57b4	parex	prx	Parex	f	\N	2023-05-24	2023-05-24
8a022a2e-0c95-497c-a03b-1bf6fb1aebfd	paribu-net	prb	Paribu Net	f	\N	2023-05-24	2023-05-24
0a886ae4-4d9c-4c2c-8762-85c40f1c0fdf	paribus	pbx	Paribus	f	\N	2023-05-24	2023-05-24
88c41869-dba1-4624-86b6-b56abc2f7602	paris-saint-germain-fan-token	psg	Paris Saint-Germain Fan Token	f	\N	2023-05-24	2023-05-24
1d8dec1b-be43-4ad9-a697-e1c0beb3f15e	parma-calcio-1913-fan-token	parma	Parma Calcio 1913 Fan Token	f	\N	2023-05-24	2023-05-24
01051932-ad6d-4d2d-913b-a28f42767a67	parrotly	pbirb	Parrotly	f	\N	2023-05-24	2023-05-24
5a230992-9b19-4fd5-975c-84b32c0d8d4a	parrot-protocol	prt	Parrot Protocol	f	\N	2023-05-24	2023-05-24
f968255f-534b-4e74-b241-b818b6bceb24	parrot-usd	pai	Parrot USD	f	\N	2023-05-24	2023-05-24
9d2e4694-29ad-417b-b978-00ec113bf4b2	parsiq	prq	PARSIQ	f	\N	2023-05-24	2023-05-24
9072dd18-685f-4b91-8b04-1ff79a5e48df	par-stablecoin	par	Parallel	f	\N	2023-05-24	2023-05-24
4c457160-15fa-4bd5-96f0-0c5f0507120f	particl	part	Particl	f	\N	2023-05-24	2023-05-24
e003a3eb-d14f-49f8-8a47-ac7a0db0ad96	particle-2	prtcle	Particle	f	\N	2023-05-24	2023-05-24
6d434009-de51-44cb-a62b-7fe501b0ba10	particle-technology	part	Particle Technology	f	\N	2023-05-24	2023-05-24
57d9aded-a228-4c6d-8864-12f2bd2f9518	party-dice	dice	Party Dice	f	\N	2023-05-24	2023-05-24
d54609c0-f639-4bd2-b2db-8504c7f1f9f6	partyfi	pfi	PartyFi	f	\N	2023-05-24	2023-05-24
c3134a21-3d1c-43ee-b25e-c33af11363e4	pascalcoin	pasc	Pascal	f	\N	2023-05-24	2023-05-24
4466a9f6-2aa3-48ec-8fd5-26843d350880	pastel	psl	Pastel	f	\N	2023-05-24	2023-05-24
6cf81731-4cfa-447c-8b6a-072b70d8639b	pathdao	path	PathDAO	f	\N	2023-05-24	2023-05-24
e98d9b9d-149f-4712-96cd-816864c96291	patientory	ptoy	Patientory	f	\N	2023-05-24	2023-05-24
6fd009f0-3b95-45e8-9de7-cb7e6f3ad1dd	patrick	pat	Patrick	f	\N	2023-05-24	2023-05-24
2cd7fb1a-a74a-4754-a50c-feb222f4ac43	patron	pat	Patron	f	\N	2023-05-24	2023-05-24
340ad25a-b8c1-4575-8d6f-73a1ceda9aba	paul-token	paul	PAUL	f	\N	2023-05-24	2023-05-24
95ff36e9-ce49-4fbb-85de-b98be24bed86	pavia	pavia	Pavia	f	\N	2023-05-24	2023-05-24
60ce54ba-b281-473c-a123-4658bb8ed56b	paw	paw	Paw	f	\N	2023-05-24	2023-05-24
0a4e454a-04fd-4884-8ee2-f2a4dbdd27f9	pawn-my-nft	pnft	Pawn My NFT	f	\N	2023-05-24	2023-05-24
d58c7c12-5119-49ac-8dfa-022d52c42b54	paws-funds	paws	Paws Funds	f	\N	2023-05-24	2023-05-24
6100be7b-339d-4bb3-b508-9210da8ec1d2	pawswap	paw	PAWSWAP	f	\N	2023-05-24	2023-05-24
80e4619c-ed75-4183-bcbb-cab95a4499c9	pawthereum	pawth	Pawthereum	f	\N	2023-05-24	2023-05-24
ed690ac3-f071-4501-a475-8146413c59e3	pawtocol	upi	Pawtocol	f	\N	2023-05-24	2023-05-24
1cb6eddb-9199-43e9-b63b-1b99409cff86	paw-v2	paw	Paw V2	f	\N	2023-05-24	2023-05-24
a6277284-dbe4-4832-a5b4-01498948f8fa	pawzone	paw	PAWZONE	f	\N	2023-05-24	2023-05-24
00e31885-3f43-42dc-b13f-907350577d2d	pax-gold	paxg	PAX Gold	f	\N	2023-05-24	2023-05-24
dccb2920-f568-4d97-a906-aa5798314d2b	paxos-standard	usdp	Pax Dollar	f	\N	2023-05-24	2023-05-24
e595a4ed-c0fe-4c94-aaf2-7884b3198ece	pax-world	paxw	pax.world	f	\N	2023-05-24	2023-05-24
e52ce2a6-3130-4f33-9f0b-1a7c0ce6df55	payaccept	payt	PayAccept	f	\N	2023-05-24	2023-05-24
e609cd5a-8078-4477-b3b0-db988c4f9653	payb	payb	PayB	f	\N	2023-05-24	2023-05-24
c3e1a795-c568-4d44-80bb-01e5c8a4c6e4	paybandcoin	pybc	PaybandCoin	f	\N	2023-05-24	2023-05-24
378638a3-48c6-4170-957d-9f35416aa1a2	paybit	paybit	PayBit	f	\N	2023-05-24	2023-05-24
c1f2e24c-3ffe-4931-a685-38c78d183ef1	paybolt	pay	PayBolt	f	\N	2023-05-24	2023-05-24
d5bebbdf-fab3-4e53-9275-b702e21fab87	paycer-protocol	pcr	Paycer Protocol	f	\N	2023-05-24	2023-05-24
411082c7-aa0b-4c1a-ad66-26e17d95e1c2	pay-coin	pci	Paycoin	f	\N	2023-05-24	2023-05-24
dd13fe82-c1d2-43db-8e7d-a5b4b4f4a3c7	pay-it-now	pin	Pay It Now	f	\N	2023-05-24	2023-05-24
3f793083-16d7-464a-923c-ac5c3ae4ba4c	paynet-coin	payn	PAYNET	f	\N	2023-05-24	2023-05-24
31c51619-062e-4da2-828d-981d8a7264df	paypolitan-token	epan	Paypolitan	f	\N	2023-05-24	2023-05-24
d8455e4e-bc54-41d8-bdc4-bc46351e6b74	payrue	propel	PayRue	f	\N	2023-05-24	2023-05-24
7c1e0f98-4331-422d-bdd3-4091dc2e4b25	paysenger-ego	ego	Paysenger EGO	f	\N	2023-05-24	2023-05-24
f8cd6575-0cbe-41f0-a6df-43dc71c57dac	paywong	pwg	Paywong	f	\N	2023-05-24	2023-05-24
a660a58d-9555-4407-8028-5004e6d3b05d	payz-payments	payz	Payz Payments	f	\N	2023-05-24	2023-05-24
f3574011-c22b-460a-b2cb-03163c5ff38d	pbtc35a	pbtc35a	pBTC35A	f	\N	2023-05-24	2023-05-24
8774f48c-2c87-49b6-a806-0e466f9757d4	pchain	pi	Plian	f	\N	2023-05-24	2023-05-24
bdceff2b-a86d-4558-a62b-e0df10f22216	pdbc-defichain	dpdbc	PDBC Defichain	f	\N	2023-05-24	2023-05-24
5537392e-a2e9-48aa-acfd-8ea7cf5d66b2	pdx-coin	pdx	PDX Coin	f	\N	2023-05-24	2023-05-24
a8de3312-a0a9-405a-aeb8-e8072a3e01f8	peace-token	pet	Peace	f	\N	2023-05-24	2023-05-24
d94b6347-aa2d-4cc1-ad81-f29d579963a0	peachfolio	pchf	Peachfolio	f	\N	2023-05-24	2023-05-24
b2a3994e-f293-4d6d-80c7-b78ab10a9388	peach-inu-bsc	peach	Peach Inu (BSC)	f	\N	2023-05-24	2023-05-24
8d3a38cd-c17f-481f-8779-7fa4f6b44f53	pea-farm	pea	Pea Farm	f	\N	2023-05-24	2023-05-24
ae808a17-6b91-4534-94b5-af23c1e9d7c2	peak-token	pktk	Peak Token	f	\N	2023-05-24	2023-05-24
e4d31a26-8217-4d89-a5cc-ac7bc8e395a0	peanut	nux	Peanut	f	\N	2023-05-24	2023-05-24
74a5ca80-8341-4e80-a91d-81200be75c91	peardao	pex	PearDAO	f	\N	2023-05-24	2023-05-24
5a359bf7-c0a9-468f-9e23-3d8c27a6d9f4	pearl-finance	pearl	Pearl Finance	f	\N	2023-05-24	2023-05-24
ef7246fe-4888-45fa-adee-139ec94ca53a	pear-swap	pear	Pear Swap	f	\N	2023-05-24	2023-05-24
36b634bb-0ec4-4768-b41b-80316ce0ba3b	pecora-network	pen	Pecora Network	f	\N	2023-05-24	2023-05-24
19db97e8-7d3a-4c15-9106-9ceed270ddb9	peepo	peepo	Peepo	f	\N	2023-05-24	2023-05-24
088eacea-be55-4964-9e48-a2a3b1af165d	peercoin	ppc	Peercoin	f	\N	2023-05-24	2023-05-24
ff2ef40c-2aa0-4ab9-a29c-55940e889ea1	peerex-network	perx	PeerEx Network	f	\N	2023-05-24	2023-05-24
582704a2-53d8-41e2-ab6c-188487319fdc	peerguess	guess	PeerGuess	f	\N	2023-05-24	2023-05-24
4c22db5f-a6ad-45f4-b59a-8465693dd46a	pegasus-dex	peg	Pegasus DEX	f	\N	2023-05-24	2023-05-24
4b1cd073-d511-444e-a8ea-2ac0f131613d	pegasys	psys	Pegasys	f	\N	2023-05-24	2023-05-24
ccf29789-82cb-4fcb-b271-df73b73b54b9	pegaxy-stone	pgx	Pegaxy Stone	f	\N	2023-05-24	2023-05-24
f14684d3-ea45-4f6d-a206-8100b3be51f8	pegazus-finance	peg	Pegazus Finance	f	\N	2023-05-24	2023-05-24
2d0ac812-95dd-4fc8-a11a-f0322df19878	pele-network	pele	PELE Network	f	\N	2023-05-24	2023-05-24
325f14f0-d051-4719-9e2e-197ca2def61e	pembrock	pem	Pembrock	f	\N	2023-05-24	2023-05-24
f08a6772-ad38-4b44-875e-00b0551505ea	pendle	pendle	Pendle	f	\N	2023-05-24	2023-05-24
add8aa2f-af66-4238-8302-f6314d0ef53e	pendulum-chain	pen	Pendulum	f	\N	2023-05-24	2023-05-24
23a1cbba-f972-4ab6-8760-ef175ac0ecd2	penguin-finance	pefi	Penguin Finance	f	\N	2023-05-24	2023-05-24
9cda8c4f-d26c-481d-ab86-5a51f4c1c539	penguin-karts	pgk	Penguin Karts	f	\N	2023-05-24	2023-05-24
80eae8fe-c155-4c1b-9fe7-48de400879e8	penrose-finance	pen	Penrose Finance	f	\N	2023-05-24	2023-05-24
b2da9c48-1233-42da-aca3-7710fc267349	peony-coin	pny	Peony Coin	f	\N	2023-05-24	2023-05-24
01c25fe6-c2fb-48cd-b6b8-6f529109a1b9	peoples-punk	dddd	People's Punk	f	\N	2023-05-24	2023-05-24
7850303b-9127-49eb-8605-8284e9c6f5fd	peoplez	lez	Peoplez	f	\N	2023-05-24	2023-05-24
7d022006-9456-49c2-9234-d77ab21578e7	peos	peos	pEOS	f	\N	2023-05-24	2023-05-24
5a2af8b7-f280-4b55-a87b-7aa6056afda1	pepa-erc	pepa	Pepa ERC	f	\N	2023-05-24	2023-05-24
c0b21a77-793c-4b5b-9207-768b86e1743f	pepa-inu	pepa	Pepa Inu	f	\N	2023-05-24	2023-05-24
4706a6ac-3068-4840-9022-66fe8356486c	pepe	pepe	Pepe	f	\N	2023-05-24	2023-05-24
99bf0d32-bdac-4e39-8ce0-39cc051e300a	pepeai	pepeai	PepeAI	f	\N	2023-05-24	2023-05-24
4d104050-adb9-48dc-bf0c-239a5ae80d65	pepe-ai	pepeai	Pepe AI	f	\N	2023-05-24	2023-05-24
75094f16-991c-4239-9483-208d84bddd1b	pepe-ai-token	pepeai	Pepe AI Token	f	\N	2023-05-24	2023-05-24
557c87c9-0b8f-416b-bf41-8d42ed3da3da	pepe-bet	pepebet	PEPE.bet	f	\N	2023-05-24	2023-05-24
320851e4-bb39-4833-b340-407f22002128	pepebrc	pepe	PEPE (Ordinals)	f	\N	2023-05-24	2023-05-24
967af025-6fce-4188-ae67-0687d9efc597	pepe-ceo	peo	Pepe CEO	f	\N	2023-05-24	2023-05-24
ee4fe5ae-4729-4044-844b-e2c4d111d735	pepechain	pc	Pepechain	f	\N	2023-05-24	2023-05-24
26189510-8996-4549-8725-b596495f8872	pepe-chain	pepechain	PEPE Chain	f	\N	2023-05-24	2023-05-24
d896f4c2-4861-46e1-af39-cd8ea938ea65	pepecoin-2	pepecoin	PepeCoin	f	\N	2023-05-24	2023-05-24
57e00751-ea57-4a7d-b3f0-a5e7ab60e4c6	pepe-coin-bsc	ppc	Pepe Coin BSC	f	\N	2023-05-24	2023-05-24
fdc39ee6-dc1f-473c-a960-bf1a2c87ceea	pepe-coin-bsc-c45e8b31-8ae1-43f4-bd34-e75551d97285	pepe	PepeCoin (BSC)	f	\N	2023-05-24	2023-05-24
1c935a08-fd69-4061-a9c8-03f49f48dc90	pepecola	pepecola	Pepecola	f	\N	2023-05-24	2023-05-24
eff2cfb6-d03a-4042-b49e-4c3e8867dc8d	pepe-dao	peped	PEPE DAO	f	\N	2023-05-24	2023-05-24
e8029ab1-0083-41ba-a943-b4cc45e65318	pepe-dash-ai	pepedashai	Pepe Dash AI	f	\N	2023-05-24	2023-05-24
f7aae76f-fab5-46a6-88bb-f13864c35a97	pepedex	ppdex	Pepedex	f	\N	2023-05-24	2023-05-24
65a5c888-7ed7-46eb-ac65-2411bb837433	pepe-doge	pepedoge	Pepe Doge	f	\N	2023-05-24	2023-05-24
8ee739da-b528-4d0a-9d3e-9516907fef29	pepe-floki	pepef	PEPE FLOKI	f	\N	2023-05-24	2023-05-24
add4cf7b-eb77-4153-abe7-417740ef1561	pepe-girl	pepeg	Pepe Girl	f	\N	2023-05-24	2023-05-24
bce6b558-6c9f-4adb-a4ab-a05eae9b224b	pepegoat	pepegoat	PepeGOAT	f	\N	2023-05-24	2023-05-24
ad1d8faa-7e46-4150-a8ab-837fb70ffef6	pepe-governance-token	peg	Pepe Governance Token	f	\N	2023-05-24	2023-05-24
1f080c74-1151-42d1-a4cb-7c2f92e1a7fc	pepegpt	pepegpt	pepeGPT	f	\N	2023-05-24	2023-05-24
b175bc96-96d3-47c6-b297-55caa6ddfffe	pepeki	pepeki	Pepeki	f	\N	2023-05-24	2023-05-24
ba014238-8da0-4526-954b-bc9429361659	pepelon	pepelon	Pepelon	f	\N	2023-05-24	2023-05-24
ffebfe73-895a-4fbe-983b-4f806c60cff5	pepemon-pepeballs	ppblz	Pepemon Pepeballs	f	\N	2023-05-24	2023-05-24
b99f77f9-df6c-4f02-ae41-05a7acc44b96	pepe-optimus	pepo	PEPE OPTIMUS	f	\N	2023-05-24	2023-05-24
934e0c47-400a-4284-92c0-3d97af39039e	pepe-original-version	pov	Pepe Original Version	f	\N	2023-05-24	2023-05-24
ba53495c-7f7f-475b-ba7c-f89300a47014	pepepad	pepe	PepePAD	f	\N	2023-05-24	2023-05-24
aa9db9f7-2fd0-4aa9-8930-5754d86efbb6	pepeplay	peplay	Pepeplay	f	\N	2023-05-24	2023-05-24
19e4ab1c-50a2-4999-b25c-84cdedc20b9d	pe-pe-pokemoon	pemon	PE PE POKEMOON	f	\N	2023-05-24	2023-05-24
44098b1f-0100-42da-ac20-74645d25c0e3	pepe-predator	snake	Pepe Predator	f	\N	2023-05-24	2023-05-24
f6ebd816-e574-4aaf-8203-bf73aeee8c82	pepera	pepera	Pepera	f	\N	2023-05-24	2023-05-24
8ec38362-7bad-4530-b49d-f6e35591660c	pepesol	pepe	PepeSol	f	\N	2023-05-24	2023-05-24
4840722b-803a-42a6-bcec-1002a0f174c2	pepe-the-frog	pepebnb	Pepe the Frog	f	\N	2023-05-24	2023-05-24
84ebc47f-d360-44cd-b380-051c5bd5226b	pepeusdt	ppusdt	PepeUSDT	f	\N	2023-05-24	2023-05-24
2b6a06ae-fcff-4ebe-8934-c3bf26cb3a20	pepex	pepex	PEPEX	f	\N	2023-05-24	2023-05-24
74646379-bbb6-4dc3-9773-c93b3a9a86fc	pepexl	pepexl	PepeXL	f	\N	2023-05-24	2023-05-24
551c558d-7648-4147-bbac-d0e9f6d46f2f	pepito	pepi	Pepito	f	\N	2023-05-24	2023-05-24
3f1a2969-53d9-45cf-a0f4-b886c2ac21dc	peppa	peppa	PEPPA	f	\N	2023-05-24	2023-05-24
7b90740b-6a7f-45c7-a57e-a2cd261ae121	pera-finance	pera	Pera Finance	f	\N	2023-05-24	2023-05-24
d787d1c1-4a84-4c81-b7cd-3b05afb4428a	peri-finance	peri	PERI Finance	f	\N	2023-05-24	2023-05-24
35d9268f-585a-4cfc-8b0f-e746f57a041e	perion	perc	Perion	f	\N	2023-05-24	2023-05-24
28c06772-7e29-48cf-bf0c-2a2e90e0b60b	perlin	perl	PERL.eco	f	\N	2023-05-24	2023-05-24
30cecbe7-4778-436c-b54f-08ae0ed39525	permission-coin	ask	Permission Coin	f	\N	2023-05-24	2023-05-24
07149bab-af2e-4b8f-bedc-7a8899713210	perpetual-protocol	perp	Perpetual Protocol	f	\N	2023-05-24	2023-05-24
185abdf7-d317-4cc0-9495-85b85f79f990	perpetual-wallet	pwt	Perpetual Wallet	f	\N	2023-05-24	2023-05-24
1949c8fb-cc44-4fad-9589-2fa6a390b652	perpetuum-coin	prp	Perpetuum Coin	f	\N	2023-05-24	2023-05-24
34a57e06-c1fa-44f5-bb8c-67fff2608f13	perpy-finance	pry	Perpy Finance	f	\N	2023-05-24	2023-05-24
d9149b76-914d-4f81-935a-00726c8b4abe	perry-the-bnb	perry	Perry The BNB	f	\N	2023-05-24	2023-05-24
b2c56791-4ecc-44bd-b0da-5e980a258d8a	perseus-fintech	prs	Perseus Fintech	f	\N	2023-05-24	2023-05-24
b01676c0-6def-4c3c-aeed-c008d9965a9a	persib-fan-token	persib	Persib Fan Token	f	\N	2023-05-24	2023-05-24
d89893a5-889b-4211-8d7e-7d83892c86da	persistence	xprt	Persistence	f	\N	2023-05-24	2023-05-24
23b4cde8-eb63-44c4-bb0e-258557508b16	perth-mint-gold-token	pmgt	Perth Mint Gold Token	f	\N	2023-05-24	2023-05-24
75712207-3e31-449e-b8f6-29f15e7f0265	peruvian-national-football-team-fan-token	fpft	Peruvian National Football Team Fan Token	f	\N	2023-05-24	2023-05-24
24805e09-6b7d-47ee-be64-67e27e6bb147	pesabase	pesa	Pesabase	f	\N	2023-05-24	2023-05-24
f43cdc2b-d2d6-4049-875d-e63a7bde5556	peseta-digital	ptd	Peseta Digital	f	\N	2023-05-24	2023-05-24
6b8a3de7-ac3b-46bc-8f4e-b8c3c638fd5b	petals	pts	Petals	f	\N	2023-05-24	2023-05-24
effcf6fd-a0ad-48cf-a4e6-b200f1f4a32c	peth	peth	pETH	f	\N	2023-05-24	2023-05-24
6d7db2d9-5b88-4c00-87c8-802fdb0c8dc4	petoverse	peto	Petoverse	f	\N	2023-05-24	2023-05-24
d22071db-cdb2-423b-bfc3-1edf53f7533f	petroleum-oil	oil	Petroleum OIL	f	\N	2023-05-24	2023-05-24
d51d0938-50e5-42ea-b721-03dbb3a15630	pexcoin	pex	Pexcoin	f	\N	2023-05-24	2023-05-24
487bccdd-2cf4-4651-918a-5477dff3ae42	pftm	pftm	pFTM	f	\N	2023-05-24	2023-05-24
7d07f623-cc20-47d7-966e-58e15f6491b8	pgala	pgala	pGALA	f	\N	2023-05-24	2023-05-24
a7d71ffd-c1d4-4a8d-9908-fd6e73d675d4	pha	pha	Phala	f	\N	2023-05-24	2023-05-24
e48024dc-490b-46c9-baa3-9cde414c94f9	phaeton	phae	Phaeton	f	\N	2023-05-24	2023-05-24
3c59b21b-5b78-44ec-9a47-d7d4f871161a	phala-moonbeam	$xcpha	Phala (Moonbeam)	f	\N	2023-05-24	2023-05-24
7d996c60-6fa3-4d23-a179-fcc542b851ac	phantasia	fant	Phantasia	f	\N	2023-05-24	2023-05-24
a40ccbf1-729a-46ff-93ad-1fb89b8f1c62	phantasma	soul	Phantasma	f	\N	2023-05-24	2023-05-24
6eb571c3-d0af-4e57-be30-c0d81ba403af	phantasma-energy	kcal	Phantasma Energy	f	\N	2023-05-24	2023-05-24
f8a8cd78-25b2-499d-924e-0d9a2eb0eef4	phantom-protocol	phm	Phantom Protocol	f	\N	2023-05-24	2023-05-24
ab157f42-2f5f-4062-8564-8f3c7c9c755d	phenix-finance-2	phnx	Phenix Finance (Cronos)	f	\N	2023-05-24	2023-05-24
f384060d-f476-43cc-b370-02f31f65481f	phenix-finance-polygon	phnx	Phenix Finance (Polygon)	f	\N	2023-05-24	2023-05-24
8cdc693d-e7a3-489e-8af6-f5c0f090aa73	philcoin	phl	Philcoin	f	\N	2023-05-24	2023-05-24
428c81cf-bc6a-44c6-bcfa-c56fe404b112	phobos-token	pbos	Phobos Token	f	\N	2023-05-24	2023-05-24
52a664dd-fd60-4dda-921f-f488101ffba9	phoenix-chain	phx	Phoenix Chain	f	\N	2023-05-24	2023-05-24
82fb564a-0695-4659-a080-bdcb7054414d	phoenixcoin	pxc	Phoenixcoin	f	\N	2023-05-24	2023-05-24
8a138b32-002b-4bd2-816f-0c3058fc9e9d	phoenixdao	phnx	PhoenixDAO	f	\N	2023-05-24	2023-05-24
e422bf02-1b4e-4599-be0e-c01177253944	phoenix-global	phb	Phoenix Global	f	\N	2023-05-24	2023-05-24
5593230a-bebf-4d02-a360-36aa1791747d	phoenix-protocol-b7a9513c-36e9-4a6b-b6ae-6a1a76bb913e	pp	Phoenix Protocol	f	\N	2023-05-24	2023-05-24
b16000a3-075b-4793-9cd0-6609a235068c	phoenix-token	phx	Phoenix Finance	f	\N	2023-05-24	2023-05-24
ca07a3e7-8024-423f-8eb1-5268b0489d8e	phoneum	pht	Phoneum	f	\N	2023-05-24	2023-05-24
86b618ba-2e1b-4803-b434-ec65cdea2f4a	phonon-dao	phonon	Phonon DAO	f	\N	2023-05-24	2023-05-24
234bdc59-6157-4eaf-8ef0-021ef78538ba	phore	phr	Phore	f	\N	2023-05-24	2023-05-24
faaee51a-47e4-449e-bcf4-edb975387cf6	photochromic	phcr	PhotoChromic	f	\N	2023-05-24	2023-05-24
ad2ba576-dc14-4160-869e-001362c9bcbc	photonswap	photon	PhotonSwap	f	\N	2023-05-24	2023-05-24
2836304b-deff-4ec7-885a-a0c3fd245370	phunk-vault-nftx	phunk	PHUNK Vault (NFTX)	f	\N	2023-05-24	2023-05-24
130c6da8-50ea-4ccd-8094-56175122a5b5	phuntoken	phtk	Phun Token	f	\N	2023-05-24	2023-05-24
8abb9f46-e519-4b9b-8125-814c644bd0a4	phuture	phtr	Phuture	f	\N	2023-05-24	2023-05-24
f1c8963a-61f8-4f93-a1ca-c2addc0d0e78	physis	phy	Physis	f	\N	2023-05-24	2023-05-24
4020bf09-0066-4fcc-bd2f-868aeebe35bd	pias	pias	PIAS	f	\N	2023-05-24	2023-05-24
847d01f0-fb77-4bc4-8945-cfce5283855b	pibble	pib	Pibble	f	\N	2023-05-24	2023-05-24
f3aa1ef6-8212-4280-8756-169e3ca2f403	piccolo-inu	pinu	Piccolo Inu	f	\N	2023-05-24	2023-05-24
62d2eaf6-04ff-41fe-b0b3-2642ce212620	pickle-finance	pickle	Pickle Finance	f	\N	2023-05-24	2023-05-24
1179bdcb-847b-48b2-9a4e-17ff0450934e	piedao-balanced-crypto-pie	bcp	PieDAO Balanced Crypto Pie	f	\N	2023-05-24	2023-05-24
25307e87-0eb5-436f-be0b-69b8b94354ad	piedao-dough-v2	dough	PieDAO DOUGH v2	f	\N	2023-05-24	2023-05-24
5e03d50e-0980-4362-b505-f218fbcf22a8	pige-inu	pige	Pige	f	\N	2023-05-24	2023-05-24
357888f8-81fc-4df8-b37b-a654ea317388	pigeoncoin	pgn	Pigeoncoin	f	\N	2023-05-24	2023-05-24
280280b0-5d91-4f60-ad5b-824e09317a6b	pig-finance	pig	Pig Finance	f	\N	2023-05-24	2023-05-24
2c000005-64f9-4a2b-a4ec-3c1f361f35da	piggy	piggy	Piggy	f	\N	2023-05-24	2023-05-24
c7404763-cc71-49d3-b3ae-d19a52b9052e	pig-inu	piginu	Pig Inu	f	\N	2023-05-24	2023-05-24
cb6d7aec-53d8-4679-913f-0ed4cdddd953	pigs-2	afp	PIGS	f	\N	2023-05-24	2023-05-24
8c1f7cfc-ec2c-407b-8553-dabfe98cffe9	pigscanfly	pork	PigsCanFly	f	\N	2023-05-24	2023-05-24
5ad8ebba-d862-402e-b717-a77dba6a9ff9	pikachu	pika	Pika	f	\N	2023-05-24	2023-05-24
becce414-9677-4562-b522-e1d2fb3ef684	pikaster	mls	Metaland Shares	f	\N	2023-05-24	2023-05-24
a3d40e3c-5162-4df6-8ef6-265fb1a29329	pillar	plr	Pillar	f	\N	2023-05-24	2023-05-24
0b479848-a55b-43a2-8099-4d36b679d403	pilot	ptd	Pilot	f	\N	2023-05-24	2023-05-24
b6b0934e-9d64-433d-a7c4-4aec59ee6788	pine	pine	Pine	f	\N	2023-05-24	2023-05-24
36b5e1b5-ed49-45da-b4b8-21b1916c111f	pi-network-iou	pi	Pi Network	f	\N	2023-05-24	2023-05-24
07b75de2-7452-4054-87d9-2f6ba077b499	pine-world	pwlc	Pine World	f	\N	2023-05-24	2023-05-24
c330f4b8-9f06-432d-ac3d-791a44ee5d2a	pink-bnb	pnb	Pink BNB	f	\N	2023-05-24	2023-05-24
4d75dd22-a100-4586-89d4-701ee66d75bd	pinkcoin	pink	Pinkcoin	f	\N	2023-05-24	2023-05-24
b307e2b7-3c10-489c-8611-1e0f8801acbe	pinkelon	pinke	PinkElon	f	\N	2023-05-24	2023-05-24
7cc73be2-7903-4187-84fa-17903d39de9b	pinkmoon	pinkm	PinkMoon	f	\N	2023-05-24	2023-05-24
1f3f016e-4a8d-4e16-8973-fdd9f9b3aaba	pinknode	pnode	Pinknode	f	\N	2023-05-24	2023-05-24
ea464d7f-e551-477f-9ef7-d69192738cf6	pinkpea-finance	pea	PinkPea.Finance	f	\N	2023-05-24	2023-05-24
7fd2d6bc-c04a-43c7-874b-ef0858afb707	pinksale	pinksale	PinkSale	f	\N	2023-05-24	2023-05-24
fd6e4496-2160-4b2f-b1e2-047c88d4efcb	pintu-token	ptu	Pintu	f	\N	2023-05-24	2023-05-24
7f97bc2e-68b0-4456-bd2c-e62006fa8bd6	pioneerpay	ppay	PioneerPay	f	\N	2023-05-24	2023-05-24
0704ab82-81e2-4693-9c9c-ecec42652564	pip	pip	PIP	f	\N	2023-05-24	2023-05-24
6bcb487a-d4c9-48e2-8ccf-5cb11757599c	pi-protocol	pip	Pi Protocol	f	\N	2023-05-24	2023-05-24
4dd238ce-bfad-44a0-85f7-1b5741b127b6	piratecash	pirate	PirateCash	f	\N	2023-05-24	2023-05-24
28b2bed2-722d-4c58-8349-d58fa886a40a	pirate-chain	arrr	Pirate Chain	f	\N	2023-05-24	2023-05-24
59437f53-1fd8-45bb-b430-91cc31531f63	piratecoin	piratecoin☠	PirateCoin	f	\N	2023-05-24	2023-05-24
f9c938ca-e775-4af9-870b-e376efa4115e	pirate-dice	booty	Pirate Dice	f	\N	2023-05-24	2023-05-24
0efacc04-ab7d-4747-a9c3-6bba948b952b	piratera	pira	Piratera	f	\N	2023-05-24	2023-05-24
1a6a59e7-1d30-4d46-8cdb-36cae0adbda4	pirate-x-pirate	pxp	Pirate x Pirate	f	\N	2023-05-24	2023-05-24
8a2bcf34-02c3-46f4-9538-192f9edc59c7	pisscoin	piss	Pisscoin	f	\N	2023-05-24	2023-05-24
97a87128-ec12-42b3-ba6d-4eb08c648c05	pitbull	pit	Pitbull	f	\N	2023-05-24	2023-05-24
e7b5b884-deeb-46d3-8fa1-d1ded100c909	pitch-fxs	pitchfxs	Pitch FXS	f	\N	2023-05-24	2023-05-24
fa5c310a-a534-44d5-8649-e8137c92ba5c	pivn	pivn	PIVN	f	\N	2023-05-24	2023-05-24
06cbfb10-6c61-496f-b494-1f5a7ac40efb	pivot-token	pvt	Pivot	f	\N	2023-05-24	2023-05-24
33ead077-60d1-4306-b5d5-3c8bc49eb67c	pivx	pivx	PIVX	f	\N	2023-05-24	2023-05-24
78aeaecb-7753-4380-ae72-c733793f82bc	pixel-battle	pwc	Pixel Battle	f	\N	2023-05-24	2023-05-24
d2a46a29-c584-4a1b-bef2-01755264e163	pixelpotus	pxl	PixelPotus	f	\N	2023-05-24	2023-05-24
fc931e1a-0345-4370-bad5-ff9aa3b0a7aa	pixelverse	pixel	PixelVerse	f	\N	2023-05-24	2023-05-24
72fcd0e4-be77-4da2-acfc-92f1c4992e6c	pixiaai	pixia	PixiaAI	f	\N	2023-05-24	2023-05-24
e671823b-c24c-47b0-a903-32dcdc0f238e	pixie	pix	Pixie	f	\N	2023-05-24	2023-05-24
e0dfb8e2-7a88-4b14-a0b4-00f3d9f9ecca	pixiu-finance	pixiu	Pixiu Finance	f	\N	2023-05-24	2023-05-24
ce7f94e4-a81a-4ee0-bd6e-1179bd82cf8c	pizabrc	piza	PIZA (Ordinals)	f	\N	2023-05-24	2023-05-24
d14a7f6a-2671-4473-9672-7722f0fabb48	pizon	pzt	Pizon	f	\N	2023-05-24	2023-05-24
3f095e31-58ff-4225-81ec-7fb7483bbb7b	pizza-game	pizza	Pizza Game	f	\N	2023-05-24	2023-05-24
9e8b7b84-c11f-4910-8974-ef80cf7de1ea	pizza-usde	pizza	PIZZA	f	\N	2023-05-24	2023-05-24
0c3bc3f9-e6e5-4855-9988-47455d6c04ba	pkt	pkt	PKT	f	\N	2023-05-24	2023-05-24
ff56d773-ace9-400b-9765-8a6be7f7a45c	place-war	place	PlaceWar Governance	f	\N	2023-05-24	2023-05-24
7735fcd3-cc91-4a90-a525-07fd5af9b83f	plan-b-dao	planb	Plan B DAO	f	\N	2023-05-24	2023-05-24
1cc1e417-85ac-4e2b-ae6d-458c7087af7a	planetcats	catcoin	PlanetCats	f	\N	2023-05-24	2023-05-24
5cc5bf6c-5194-4708-8913-b33d0bd1b043	planet-finance	aqua	Planet Finance	f	\N	2023-05-24	2023-05-24
75173757-c098-4eaf-a46c-4696510717f6	planet-sandbox	psb	Planet Sandbox	f	\N	2023-05-24	2023-05-24
bfb6c9f8-a7e7-4fc8-bca6-4b188b06268b	planetwatch	planets	PlanetWatch	f	\N	2023-05-24	2023-05-24
627250cf-0d89-4596-9673-22b9f82a7909	planq	plq	Planq	f	\N	2023-05-24	2023-05-24
628da33b-6855-482b-97c1-af5217afe2a1	plant-vs-undead-token	pvu	Plant vs Undead	f	\N	2023-05-24	2023-05-24
440cf78d-b416-481b-8f6e-e98a23466533	plasma-finance	ppay	Plasma Finance	f	\N	2023-05-24	2023-05-24
c30654cb-d00b-4c73-bc10-fc43c384473e	plastiks	plastik	Plastiks	f	\N	2023-05-24	2023-05-24
f636391d-3a44-4881-b3f8-2ab7b8756cef	plata-network	plata	Plata Network	f	\N	2023-05-24	2023-05-24
98ced017-fab1-4ebe-a60a-07285bc68bcd	platincoin	plc	PlatinCoin	f	\N	2023-05-24	2023-05-24
3b970e72-d337-46a1-b5ab-7817a775ce86	platinx	ptx	PlatinX	f	\N	2023-05-24	2023-05-24
d6dcde09-e2eb-46a2-8f07-e47b333b2b3f	plato-farm	mark	Plato Farm	f	\N	2023-05-24	2023-05-24
ee7a3a8e-0635-41b2-b430-29c56ce1ea94	platonic-quintessence	plaq	Platonic Quintessence	f	\N	2023-05-24	2023-05-24
d61e2778-cb67-4108-b734-5ceacae248a4	platon-network	lat	PlatON Network	f	\N	2023-05-24	2023-05-24
85451256-ab9c-4f65-a0d7-2082c5727a67	platypus-finance	ptp	Platypus Finance	f	\N	2023-05-24	2023-05-24
10754307-20de-49a7-b9eb-97e319bae284	platypus-usd	usp	Platypus USD	f	\N	2023-05-24	2023-05-24
2f152b37-7baf-413e-8fa0-125d2a5a5ad8	playa3ull-games	3ull	Playa3ull Games	f	\N	2023-05-24	2023-05-24
f39e9f1f-b74e-4bd9-9329-4e6228e9515e	playcent	pcnt	Playcent	f	\N	2023-05-24	2023-05-24
7edee8bb-b759-4009-8906-db87544e8cae	playchip	pla	PlayChip	f	\N	2023-05-24	2023-05-24
8053ec57-9836-4eb1-856a-ae3d35eddb00	playdapp	pla	PlayDapp	f	\N	2023-05-24	2023-05-24
bd14b1c9-4edb-4912-8475-9dc0776c5c04	player-2	deo	Player 2	f	\N	2023-05-24	2023-05-24
2683d069-6d6f-4bd7-be04-e7c8b3b2b107	playermon	pym	Playermon	f	\N	2023-05-24	2023-05-24
4ab38fbe-5eff-4025-8f31-0444aedda06f	playgame	pxg	PlayGame	f	\N	2023-05-24	2023-05-24
c710e9f9-79ba-45dc-97df-5671d084a35d	playground	playa	Playground	f	\N	2023-05-24	2023-05-24
c8dc0f12-e641-4926-a698-ca144b43810e	playground-waves-floor-index	waves	Playground Waves Floor Index	f	\N	2023-05-24	2023-05-24
ffa29ad8-58a4-40b6-ae6c-6d9f7f148134	play-it-forward-dao	pif	Play It Forward DAO	f	\N	2023-05-24	2023-05-24
c33e38df-c9da-4015-8349-0d42ccb182eb	playkey	pkt	PlayKey	f	\N	2023-05-24	2023-05-24
3df2d6d6-8ab3-46a0-b6b4-c59f87e98d09	play-kingdom	pkt	Play Kingdom	f	\N	2023-05-24	2023-05-24
e6010817-df3f-44c7-a7f7-24cc8eef88b8	playmarket	pmt	DAO PlayMarket 2.0	f	\N	2023-05-24	2023-05-24
d5061aa6-ddcb-4a0f-9e23-55648ed8eb18	playnity	ply	PlayNity	f	\N	2023-05-24	2023-05-24
e466f178-b3ec-4f49-a789-544b8f8ec716	playpad	ppad	PlayPad	f	\N	2023-05-24	2023-05-24
49b263c8-1626-4831-b486-4e29519cdb57	playzap	pzp	PlayZap	f	\N	2023-05-24	2023-05-24
2a15404f-1ca0-4059-ab04-924c3574d847	plc-ultima	plcu	PLC Ultima	f	\N	2023-05-24	2023-05-24
8364a004-a804-4654-95bd-45d6abed7c21	plearn	pln	PLEARN	f	\N	2023-05-24	2023-05-24
aed0b5ad-ccc6-4287-97cb-63ac78d9392b	pleasure-coin	nsfw	Pleasure Coin	f	\N	2023-05-24	2023-05-24
f69b785d-4c9c-412c-9df1-99ec9c34e555	pleb-token	pleb	PLEB Token	f	\N	2023-05-24	2023-05-24
c0d1e69a-4838-4283-a00f-4e93988143c0	pledge	plgr	Pledge	f	\N	2023-05-24	2023-05-24
01fae341-471d-4f17-9024-3802534ca69a	plenty-dao	plenty	Plenty DeFi	f	\N	2023-05-24	2023-05-24
a6360d02-75c4-43a0-859f-19848fe67677	plenty-ply	ply	Plenty PLY	f	\N	2023-05-24	2023-05-24
c46051d0-0f67-43cf-a7cc-52070bbe0a7b	plex	plex	PLEX	f	\N	2023-05-24	2023-05-24
05230d2b-b4b3-4c8e-bd60-a6d29683d5ad	plexus-app	plx	PLEXUS	f	\N	2023-05-24	2023-05-24
7ef7d82c-0220-4e6f-9196-41e0fcbff541	plgnet	plug	PL^Gnet	f	\N	2023-05-24	2023-05-24
c4f4a5da-bc12-46dc-81c0-0a739114a3bf	plotx	plot	PlotX	f	\N	2023-05-24	2023-05-24
73e3b9c3-c12c-4dcd-ab86-b6f8e6680a0b	plug-chain	pc	Plug Chain	f	\N	2023-05-24	2023-05-24
e082fa6e-59af-4f34-b7dc-97271fd86eab	plugin	pli	Plugin	f	\N	2023-05-24	2023-05-24
8403f983-de41-42d5-8ea7-02137f73e66e	plug-power-ai	ppai	Plug Power AI	f	\N	2023-05-24	2023-05-24
026f3c96-1a68-49b3-bff1-ef2f741da2ac	plums	plums	PLUMS	f	\N	2023-05-24	2023-05-24
3fcd3357-ff67-4c1d-ae61-562cb9f6338e	pluracoin	plura	PluraCoin	f	\N	2023-05-24	2023-05-24
763d1b87-d5e7-4647-8d4d-bb5a6fc611b3	plusonecoin	plus1	PlusOneCoin	f	\N	2023-05-24	2023-05-24
32f5ea6b-ff1d-4da5-b55e-3ee5169d3d5a	pluton	plu	Pluton	f	\N	2023-05-24	2023-05-24
06e213a0-652e-4d44-a100-30f3a2512bb0	plutonian-dao	pld	Plutonian DAO	f	\N	2023-05-24	2023-05-24
6c86b998-e885-4135-b2bf-f579994f892a	plutusdao	pls	PlutusDAO	f	\N	2023-05-24	2023-05-24
e0f00e78-28b2-4758-ac9c-5fca759a3199	plutus-dpx	plsdpx	Plutus DPX	f	\N	2023-05-24	2023-05-24
744a354f-bc82-4eaf-8a7c-ee03576e9485	plutusfi	plut	PlutusFi	f	\N	2023-05-24	2023-05-24
a3c39f8a-1f3c-472e-9127-67ec42445479	pmg-coin	pmg	PMG Coin	f	\N	2023-05-24	2023-05-24
4943ead3-2217-4023-85db-2a95424bf4b9	proxy	prxy	Proxy	f	\N	2023-05-24	2023-05-24
6a2caff3-a278-485c-94c0-66fd054d1070	pnetwork	pnt	pNetwork	f	\N	2023-05-24	2023-05-24
06612bcf-04ca-43a4-9d10-6123bae51261	poa-network	poa	POA Network	f	\N	2023-05-24	2023-05-24
4cfd39bb-b519-4670-ab71-a1bb50fe2dc9	poc-blockchain	poc	POC Blockchain	f	\N	2023-05-24	2023-05-24
9e3f0803-2c8b-42ac-b2e3-1f09781dfad7	pochi-inu	pochi	Pochi Inu	f	\N	2023-05-24	2023-05-24
59fcf984-1070-4970-98a7-793aecf9caf9	pocket-arena	poc	Pocket Arena	f	\N	2023-05-24	2023-05-24
d97bef53-6fd8-407d-9463-b27886f8e4c1	pocketcoin	pkoin	Pocketcoin	f	\N	2023-05-24	2023-05-24
e128f19d-d2d1-4c39-8974-1af81b53d8d4	pocket-network	pokt	Pocket Network	f	\N	2023-05-24	2023-05-24
d77aa1e1-cd8f-483c-aeef-b8d252e1a44d	pocket-project	ppt	Pocket ProjecT	f	\N	2023-05-24	2023-05-24
a6e921a0-c24a-4ada-91ac-322013d4c2e6	pocoland	poco	Pocoland	f	\N	2023-05-24	2023-05-24
7540ba98-5cd2-4b1d-9743-de37176c8679	podfast	$fast	PodFast	f	\N	2023-05-24	2023-05-24
e49b36cf-ccb3-4898-9691-7ee93aba3b6a	poet	poe	Po.et	f	\N	2023-05-24	2023-05-24
291de6b1-60fb-4582-be87-974c3eb6aa0b	pogai	pogai	POGAI	f	\N	2023-05-24	2023-05-24
684313f0-5d4b-4dbd-9fff-3399d1d09cc7	pog-coin	pog	PolygonumOnline	f	\N	2023-05-24	2023-05-24
ce92918c-fb86-4490-b3e8-17cf32a77ac4	poglana	pog	Poglana	f	\N	2023-05-24	2023-05-24
79f6c978-8183-4a48-9243-1cbc77852e9a	point-coin	point	Point Coin	f	\N	2023-05-24	2023-05-24
742def62-0450-4802-ae1f-77c4a0e1250f	point-network	point	Point Network	f	\N	2023-05-24	2023-05-24
d0f9aeaa-6bc1-4f54-8d2d-8ca9217345d7	pointpay	pxp	PointPay	f	\N	2023-05-24	2023-05-24
4a962c06-b5f4-41df-a0c9-80fd198d31fc	poison-finance	poi$on	Poison Finance	f	\N	2023-05-24	2023-05-24
72b26714-8ad7-48bf-a99e-a937d170675f	pokedx	pdx	PokeDX	f	\N	2023-05-24	2023-05-24
f9bd7717-1759-4093-89c1-7dc063d26575	poken	pkn	Poken	f	\N	2023-05-24	2023-05-24
7647e964-a4ff-4eb9-b804-20a182035813	pokeplay-token	ppc	PokePlay Token	f	\N	2023-05-24	2023-05-24
d0227e63-4a8b-4330-8b9d-638332f19832	pokerfi	pokerfi	PokerFi	f	\N	2023-05-24	2023-05-24
f08c3f73-bdad-489c-999a-8552153f5548	pokmon	pokmon	Pokmon	f	\N	2023-05-24	2023-05-24
2c48e972-9828-4240-9a8c-c52ae0f3d7de	polar	polar	POLAR	f	\N	2023-05-24	2023-05-24
14a493ec-2467-487c-9fc1-04291497cc61	polaris-share	pola	Polaris Share	f	\N	2023-05-24	2023-05-24
39aeb558-271c-4db9-933c-818554e11d12	polar-sync	polar	Polar Sync	f	\N	2023-05-24	2023-05-24
ff3a230c-dba0-429c-8bd6-ffbcfdd40b95	polar-token	polar	Polaris Finance Polar	f	\N	2023-05-24	2023-05-24
9a8f6faf-e6e0-4f36-bc23-e65b76b29329	polinate	poli	Polinate	f	\N	2023-05-24	2023-05-24
5138b1db-bc6d-49c0-899b-da697a4d15a3	polis	polis	Polis	f	\N	2023-05-24	2023-05-24
2910de6e-63ad-412e-a174-b05e2a384cc2	polkabridge	pbr	PolkaBridge	f	\N	2023-05-24	2023-05-24
931a551c-b456-470c-a243-0bca65ef79e7	polka-city	polc	Polkacity	f	\N	2023-05-24	2023-05-24
43622bce-2b0c-4718-990e-12de03979b7e	polka-classic	dotc	Polka Classic	f	\N	2023-05-24	2023-05-24
af4439a1-a052-4c60-bb73-a22f66c49ed7	polkadex	pdex	Polkadex	f	\N	2023-05-24	2023-05-24
f144cb2c-9ac5-4a57-ba72-711bd82bea80	polkadomain	name	PolkaDomain	f	\N	2023-05-24	2023-05-24
52696aae-1c3f-4d64-87d6-8358bb8ff679	polkadot	dot	Polkadot	f	\N	2023-05-24	2023-05-24
e7fb070d-9222-4fbc-a763-637f11197f02	polkaex	pkex	PolkaEx	f	\N	2023-05-24	2023-05-24
9df131d4-c8a0-4d80-895f-9866d9a13522	polkafantasy	xp	PolkaFantasy	f	\N	2023-05-24	2023-05-24
bd0a0b3a-92db-456f-90c7-610750601873	polkafoundry	pkf	Red Kite	f	\N	2023-05-24	2023-05-24
5be269af-4ed2-42b2-97d5-565bc6586ae2	polkally	kally	Kally	f	\N	2023-05-24	2023-05-24
5bf738d2-fca1-4f51-8a77-9d59f670216d	polkamarkets	polk	Polkamarkets	f	\N	2023-05-24	2023-05-24
0635ea4a-5987-44db-8fcd-cf1c87e1a3c9	polkapet-world	pets	PolkaPet World	f	\N	2023-05-24	2023-05-24
f54cb630-fcff-40f8-9b17-e323f0d5ae2b	polkaplay	polo	NftyPlay	f	\N	2023-05-24	2023-05-24
e244728f-446b-48ad-b548-4603a974f983	polkarare	prare	Polkarare	f	\N	2023-05-24	2023-05-24
7c616d07-75ae-4176-80f5-f9812cfab659	polkastarter	pols	Polkastarter	f	\N	2023-05-24	2023-05-24
f1336d8f-da9d-4035-aae6-c07fd7f00ac5	polkaswap	pswap	Polkaswap	f	\N	2023-05-24	2023-05-24
a79b2dcc-b490-412d-9c6e-41b83f91da2c	polkawar	pwar	PolkaWar	f	\N	2023-05-24	2023-05-24
d01eecc5-d63d-45d0-899e-0de3b32f6de9	polker	pkr	Polker	f	\N	2023-05-24	2023-05-24
07dea9a1-ae97-4345-9a85-5e9ceadbc631	pollchain	poll	Pollchain	f	\N	2023-05-24	2023-05-24
a6366656-6046-4db1-aa61-f8a5534769cd	pollen	pln	Pollen	f	\N	2023-05-24	2023-05-24
7f718b58-27e0-4dfc-9493-458f6bd3709b	pollux-coin	pox	Pollux Coin	f	\N	2023-05-24	2023-05-24
7e866b9f-fa6d-414f-a99d-d56e72c83535	polly	polly	Polly Finance	f	\N	2023-05-24	2023-05-24
bf4bd19e-eae6-4e5c-a684-3fb928723944	polly-defi-nest	ndefi	Polly DeFi Nest	f	\N	2023-05-24	2023-05-24
6eb70983-0f77-4de0-89f8-a47dd5cf9e1a	polyalpha-finance	alpha	PolyAlpha Finance	f	\N	2023-05-24	2023-05-24
b3ff0013-8e23-486d-98bd-110726f4f9f1	polybeta-finance	beta	PolyBeta Finance	f	\N	2023-05-24	2023-05-24
ea74d7a1-071b-497f-8325-1db7c4bc457e	polybius	plbt	Polybius	f	\N	2023-05-24	2023-05-24
986d9deb-5e72-49cb-acee-d275c6a0e5d1	polycat-finance	fish	Polycat Finance	f	\N	2023-05-24	2023-05-24
055d4bc5-3941-46b5-9a20-12be984b6d31	polychain-monsters	pmon	Polychain Monsters	f	\N	2023-05-24	2023-05-24
018dc9d5-b840-4f11-8379-07c2ea7045c2	polycub	polycub	PolyCub	f	\N	2023-05-24	2023-05-24
0c58319a-76ef-435d-85cc-3ee339becee7	polydoge	polydoge	PolyDoge	f	\N	2023-05-24	2023-05-24
54380fdf-ce07-4eb3-a1bd-7deeb2a859a7	polygamma	gamma	PolyGamma Finance	f	\N	2023-05-24	2023-05-24
0e60e907-b805-46b0-a163-d9e16472b71c	polygen	pgen	Polygen	f	\N	2023-05-24	2023-05-24
cac26ec3-976b-44cb-a9ed-09ae48a8724d	polygod	gull	PolyGod	f	\N	2023-05-24	2023-05-24
c0c93b3d-949e-4573-9bd0-80c46a465305	polygold	polygold	PolyGold	f	\N	2023-05-24	2023-05-24
885b110b-f0a6-4870-8183-7a7639e19474	polygon-babydoge	polybabydoge	Polygon BabyDoge	f	\N	2023-05-24	2023-05-24
8e530f97-50f0-45f8-b7f3-2496d5ab59ad	polygonfarm-finance	spade	PolygonFarm Finance	f	\N	2023-05-24	2023-05-24
cdc6c7dd-9a64-46e8-b9c5-daf3a61e8da3	polygon-hbd	phbd	Polygon HBD	f	\N	2023-05-24	2023-05-24
5f3698c3-5ec3-4cc7-bf58-c942cbd9fe47	polylastic	polx	Polylastic	f	\N	2023-05-24	2023-05-24
57e6770d-ccc0-456a-85eb-7c23ccbfa940	polylauncher	angel	Polylauncher	f	\N	2023-05-24	2023-05-24
dd862a21-6066-4208-b310-2e749ab3896a	polymath	poly	Polymath	f	\N	2023-05-24	2023-05-24
f176c166-5c04-42e4-9a16-a3d9db2a57ee	poly-maximus	poly	POLY Maximus	f	\N	2023-05-24	2023-05-24
956887d6-3bf1-4cf9-85ca-0f7779b65555	polymesh	polyx	Polymesh	f	\N	2023-05-24	2023-05-24
1ce11db2-5e92-4a88-a269-a2ac08396bce	polypad	polypad	PolyPad	f	\N	2023-05-24	2023-05-24
c5e75483-45b0-467d-83cb-5a9052901395	poly-peg-mdex	hmdx	Poly-Peg Mdex	f	\N	2023-05-24	2023-05-24
6aa57cbe-8da2-484a-b6ca-468e1a813eb5	polypup	pup	PolyPup	f	\N	2023-05-24	2023-05-24
c60870a4-5ff1-4099-9a97-7f1f88a2cddf	polyquity	pyq	PolyQuity	f	\N	2023-05-24	2023-05-24
b9d51ef6-826a-4262-bcf4-8bc6bbdf5fb1	polyroll	roll	Polyroll	f	\N	2023-05-24	2023-05-24
3c16a674-2e70-47c6-8e23-c40920d00d85	polyshark-finance	shark	PolyShark Finance	f	\N	2023-05-24	2023-05-24
e972401d-c5ac-4193-8521-d3a6d472ccc5	polyshield	shi3ld	PolyShield	f	\N	2023-05-24	2023-05-24
4a04f8bc-4ffc-41b2-b53b-fa33604c59d4	polysports	ps1	POLYSPORTS	f	\N	2023-05-24	2023-05-24
f3731743-ed86-443c-bc7f-d92289b11be6	polyswarm	nct	PolySwarm	f	\N	2023-05-24	2023-05-24
0a46575d-9f5a-4154-9d30-63197e0d0afd	polytrade	trade	Polytrade	f	\N	2023-05-24	2023-05-24
15fd5ccc-b4f2-4c3c-84cf-8f255b0ed8b5	polywhale	krill	Polywhale	f	\N	2023-05-24	2023-05-24
21e2c7df-b098-48d0-9d5a-05d6a0a79a0e	polywolf	moon	Polywolf	f	\N	2023-05-24	2023-05-24
b0a15dce-ba3a-41e7-908e-de769f7b0416	polyyeld-token	yeld	PolyYeld	f	\N	2023-05-24	2023-05-24
d3fd831d-eb4b-46c6-87c5-61cc9df583a3	polyyield-token	yield	PolyYield	f	\N	2023-05-24	2023-05-24
11f6c362-10f7-4f2b-91aa-b6cb0893e151	polyzap	pzap	PolyZap	f	\N	2023-05-24	2023-05-24
9a0e3b0f-d65c-48a5-b452-1d96f4159aac	pomeranian-eth	pom	Pomeranian ETH	f	\N	2023-05-24	2023-05-24
2448f5f3-bbf6-4836-b5a6-4afad53c5a29	pomerium-ecosystem	pmg	Pomerium Ecosystem Token	f	\N	2023-05-24	2023-05-24
cd6e18fd-edb5-407a-a2f5-cf090e4e2331	pom-governance	pomg	POM Governance	f	\N	2023-05-24	2023-05-24
3edb3882-cf54-49ab-861d-0165887e508b	pomi	pomi	Pomi	f	\N	2023-05-24	2023-05-24
07e93494-17cd-41e7-b0e4-9ef685001b33	pomo	pomo	Pomo	f	\N	2023-05-24	2023-05-24
ee727326-63f4-4617-b2a5-b466e0068bff	pong-heroes	pong	Pong Heroes	f	\N	2023-05-24	2023-05-24
d98d1e31-d61e-4d9e-8b2d-616091ebbaca	pontoon	toon	Pontoon	f	\N	2023-05-24	2023-05-24
684b1b6a-382c-4b59-b291-3e17820d2961	ponzicoin	ponzi	PonziCoin	f	\N	2023-05-24	2023-05-24
78a920b2-974a-4f81-81a5-a37eaa493ef2	pooch	pooch	Pooch	f	\N	2023-05-24	2023-05-24
8a082e1d-fffa-4498-b802-82ac11cbeebb	poochain	poop	Poochain	f	\N	2023-05-24	2023-05-24
30c64c76-0a3f-4725-a0ff-c0f6dceb35b7	poocoin	poocoin	PooCoin	f	\N	2023-05-24	2023-05-24
b49ecded-8374-48e4-8b20-88dce19e9b1d	poodle	poodl	Poodl	f	\N	2023-05-24	2023-05-24
1362f6d7-6af9-4adf-bb1d-23050c190465	poodl-exchange-token	pet	Poodl Exchange Token	f	\N	2023-05-24	2023-05-24
d9514296-166f-417f-a603-a35adace994c	poo-doge	poo doge	Poo Doge	f	\N	2023-05-24	2023-05-24
5e565029-271f-41ba-bbb9-dfb7d152716d	poofcash	poof	PoofCash	f	\N	2023-05-24	2023-05-24
2130a247-1dea-489b-ac89-3fb2cb622dad	poof-token	poof	Poof Token	f	\N	2023-05-24	2023-05-24
09cf6e3a-a39c-4a2a-8654-92e6f138ce0a	pooh	pooh	POOH	f	\N	2023-05-24	2023-05-24
af9b7a50-f319-4487-b868-e7c8c16fb7ed	poollotto-finance	plt	Poollotto.finance	f	\N	2023-05-24	2023-05-24
aaa23fb7-5046-4ee3-b43f-e065dec0502e	pool-party	pp	Pool Party	f	\N	2023-05-24	2023-05-24
0b595f7c-45d6-4b76-bce5-44b06c63719a	pool-partyyy	party	Pool Partyyy	f	\N	2023-05-24	2023-05-24
b875b38e-3611-49b4-8312-f3d9826fa337	pooltogether	pool	PoolTogether	f	\N	2023-05-24	2023-05-24
bb3748d3-e61b-4333-8c61-cd28db228022	poolz-finance	poolz	Poolz Finance [OLD]	f	\N	2023-05-24	2023-05-24
ad8d2c14-c4ca-4f27-9cc5-91bdd99a5773	poolz-finance-2	poolx	Poolz Finance	f	\N	2023-05-24	2023-05-24
814a9de4-3cec-4bc8-95c7-adc726ea4d4f	poopsicle	poop	Poopsicle	f	\N	2023-05-24	2023-05-24
418c5e6f-3521-4eac-9dd9-ebfaf65e0c7f	poorpleb	pp	PoorPleb	f	\N	2023-05-24	2023-05-24
7b7f0fc2-8b01-4aa7-8510-e693ba4c1c9d	pop-chest-token	pop	POP Network	f	\N	2023-05-24	2023-05-24
b40bc592-8106-4d76-8fc3-12237857c830	popcoin	pop	Popcoin	f	\N	2023-05-24	2023-05-24
994fc547-1102-48c4-b3e0-6ef9e4c32288	popcorn	pop	Popcorn	f	\N	2023-05-24	2023-05-24
9b53b7d2-1041-40f7-8626-a3e548a09050	popecoin	pope	PopeCoin	f	\N	2023-05-24	2023-05-24
66d865f9-9070-4350-81d9-1b15216ae3e7	popkon	popk	POPKON	f	\N	2023-05-24	2023-05-24
36440369-f405-4a65-8ea8-5d7a1d06c9f9	populous	ppt	Populous	f	\N	2023-05-24	2023-05-24
3b9fe8ad-f4b0-4485-9d3a-0ae803649126	poriverse	riken	Poriverse	f	\N	2023-05-24	2023-05-24
1bace731-da33-472e-886e-becc79df8b11	pornrocket	pornrocket	PornRocket	f	\N	2023-05-24	2023-05-24
7c0edeed-4473-496d-ab08-cdcf9254bb6f	porta	kian	Porta	f	\N	2023-05-24	2023-05-24
902415e4-409b-4756-8a70-3d89deefbb0c	port-finance	port	Port Finance	f	\N	2023-05-24	2023-05-24
0357cbef-0542-4b4d-80c5-193f9f03acd5	portion	prt	Portion	f	\N	2023-05-24	2023-05-24
bb3806c5-1d17-4c81-9bd7-20e0ede31a6b	portugal-national-team-fan-token	por	Portugal National Team Fan Token	f	\N	2023-05-24	2023-05-24
2e54a8b3-0f49-4713-8d5c-1cd33e77c6ab	portuma	por	Portuma	f	\N	2023-05-24	2023-05-24
aebfbcaf-90c4-4062-a707-d653d3a465a0	pos-32	pos32	PoS-32	f	\N	2023-05-24	2023-05-24
ca0d783c-0f6a-4ffb-b633-453a02ed76ac	poseidon-2	psdn	Poseidon	f	\N	2023-05-24	2023-05-24
4a072afd-111b-4fec-a507-e7aed2c634c2	poseidon-finance	psdn	Poseidon Finance	f	\N	2023-05-24	2023-05-24
6c49f1fd-3a30-4eee-9d99-9d5876a7e578	posh4d	p4d	PoSH4D	f	\N	2023-05-24	2023-05-24
a8760875-470f-4c41-b246-63d32a39248d	position-token	posi	Position	f	\N	2023-05-24	2023-05-24
ab12e300-3ef5-4eee-8d47-bbf3396eb97c	positron-token	pot	Positron	f	\N	2023-05-24	2023-05-24
d0afd3d6-db75-400c-a4f1-1fefbcd3d953	posschain	poss	Posschain	f	\N	2023-05-24	2023-05-24
87484f40-0b89-4e1b-b613-8decf2df9a53	posthuman	phmn	POSTHUMAN	f	\N	2023-05-24	2023-05-24
0b7b3a5e-8fad-48bf-b88a-444b2381ff48	potato	potato	Potato	f	\N	2023-05-24	2023-05-24
0efc7268-a0f2-478f-8f43-353e7269d9f9	potcoin	pot	Potcoin	f	\N	2023-05-24	2023-05-24
1a4a09c2-cb0e-4e18-b2c7-5deb5a672ace	potent-coin	ptt	Potent Coin	f	\N	2023-05-24	2023-05-24
895f2bfe-b808-4b66-b49d-14401e94155d	potentiam	ptm	Potentiam	f	\N	2023-05-24	2023-05-24
c0a68b47-386f-4dbb-aba3-a3618806ceab	potfolio	ptf	Potfolio	f	\N	2023-05-24	2023-05-24
ba189121-d244-4d06-99fe-efcf8f9535e9	poundtoken	gbpt	poundtoken	f	\N	2023-05-24	2023-05-24
8d7a6f12-d3c0-441d-aa1f-b4e9993c41b0	powerful	pwfl	Powerful	f	\N	2023-05-24	2023-05-24
cc5e767a-ae06-4df8-aeb3-7c74895d8af3	power-ledger	powr	Power Ledger	f	\N	2023-05-24	2023-05-24
e4e8586f-bb11-40fa-b0c9-e93eebbf05ba	power-nodes	power	Power Nodes	f	\N	2023-05-24	2023-05-24
96fd8f92-253a-4810-b3da-bd18533b959b	power-of-deep-ocean	podo	Power Of Deep Ocean	f	\N	2023-05-24	2023-05-24
4ce890ff-52c8-4657-b98f-a97fa2fd3459	powertrade-fuel	ptf	PowerTrade Fuel	f	\N	2023-05-24	2023-05-24
0d6a9c5a-78ec-4b4c-a9b1-ee02ab44f88f	power-vault	powv	Power Vault	f	\N	2023-05-24	2023-05-24
33fb46c6-a775-4378-857b-eb538edc9548	powswap	pow	Powswap	f	\N	2023-05-24	2023-05-24
d5d72369-a706-49bb-9149-63d3d8cc998e	ppizza	ppizza	PPizza	f	\N	2023-05-24	2023-05-24
8931c27b-446c-49a9-9410-d1e6a85ee581	prcy-coin	prcy	PRivaCY Coin	f	\N	2023-05-24	2023-05-24
e652f3bc-09c4-438b-b924-342452d7d1d8	predictcoin	pred	Predictcoin	f	\N	2023-05-24	2023-05-24
e104cdbd-6274-48cc-b008-07875a8cca74	prema	prmx	PREMA	f	\N	2023-05-24	2023-05-24
8991c12c-07e1-4230-86fe-2f2820d05a9c	premia	premia	Premia	f	\N	2023-05-24	2023-05-24
508fe0bd-0778-4181-9ad1-d0040dcfb192	premio	premio	Premio	f	\N	2023-05-24	2023-05-24
e729617b-684a-4a49-9432-d5b49351203e	pre-retogeum	prtg	Pre-Retogeum	f	\N	2023-05-24	2023-05-24
f6b67fcc-c15b-4bce-b8b0-fd630ae4e459	presearch	pre	Presearch	f	\N	2023-05-24	2023-05-24
8ac2fb11-f71b-47b2-aec3-ea01421d58ec	pricetools	ptools	Pricetools	f	\N	2023-05-24	2023-05-24
696677fd-b2fe-4d3a-92ee-586ffd06d992	primal-2	prm	Primal Network	f	\N	2023-05-24	2023-05-24
6cc73651-9ea5-4fe1-8e4a-f2b91e229cf4	primal-b3099cd0-995a-4311-80d5-9c133153b38e	primal	PRIMAL	f	\N	2023-05-24	2023-05-24
9a0f0c9f-8da5-4b8b-8ca8-b2f874a07286	primas	pst	Primas	f	\N	2023-05-24	2023-05-24
9400d054-7b53-4781-b27e-c5a6aead4751	primate	primate	Primate	f	\N	2023-05-24	2023-05-24
6f2ad13e-1bc7-4d80-84f0-349f6b3a3fe2	prime	d2d	Prime	f	\N	2023-05-24	2023-05-24
8707f25a-4698-4601-afb1-80924b8ccaa5	primecoin	xpm	Primecoin	f	\N	2023-05-24	2023-05-24
62d821e2-346a-41f8-851d-02408eb3e363	prime-numbers	prnt	Prime Numbers Ecosystem	f	\N	2023-05-24	2023-05-24
c7c5fc78-75e1-418e-a0dd-39c01ae49692	primex-finance	pmx	Primex Finance	f	\N	2023-05-24	2023-05-24
ac9fc0d4-9ee4-4063-98ad-7a87a6e2e541	primo-dao	primo	Primo DAO	f	\N	2023-05-24	2023-05-24
7773e39e-f5a0-4082-8064-47456cc65b9a	print-the-pepe	$pp	Print The Pepe	f	\N	2023-05-24	2023-05-24
6ffbbe29-7d12-4ce3-aabe-0d5d6f4d4f8c	prism	prism	Prism	f	\N	2023-05-24	2023-05-24
35962060-25fd-4899-9f94-a43b77e6f060	prism-protocol	prism	Prism Protocol	f	\N	2023-05-24	2023-05-24
378825ea-7deb-4ce9-a4b6-dca2af343984	privacoin	prvc	PrivaCoin	f	\N	2023-05-24	2023-05-24
6bd2243b-c157-4cbb-bdc3-c15610175ec0	privapp-network	bpriva	Privapp Network	f	\N	2023-05-24	2023-05-24
47da5cbb-2cb8-4bb6-a2fd-df3162e47c24	privateum	pri	Privateum Global	f	\N	2023-05-24	2023-05-24
b4d4de28-15f7-45ff-a443-21a9177310ab	privatix	prix	Privatix	f	\N	2023-05-24	2023-05-24
9d273cc5-0997-4765-a660-17c68060145b	privcy	priv	PRiVCY	f	\N	2023-05-24	2023-05-24
889510f9-bec1-4214-87b0-db1697d069ba	privilege	prvg	Privilege	f	\N	2023-05-24	2023-05-24
432ae837-8801-4df8-a8a9-7c303897e4ff	prizm	pzm	Prizm	f	\N	2023-05-24	2023-05-24
1218edb3-c535-47ff-a22b-ad2fcc58547d	probably-nothing	prbly	Probably Nothing	f	\N	2023-05-24	2023-05-24
859e7d95-ce71-4736-80be-1d61d02ea30d	probinex	pbx	Probinex	f	\N	2023-05-24	2023-05-24
0688dd86-c218-4153-90d4-e17d0b23a358	probit-exchange	prob	Probit	f	\N	2023-05-24	2023-05-24
e751b47b-e526-4038-b469-87e345d34a9a	professional-fighters-league-fan-token	pfl	Professional Fighters League Fan Token	f	\N	2023-05-24	2023-05-24
e8537c3b-a831-4f85-9c94-ef10b4d6ce7f	project202	p202	Project 202	f	\N	2023-05-24	2023-05-24
c0c075b4-ba47-4f52-a196-1d687444d5ca	project-galaxy	gal	Galxe	f	\N	2023-05-24	2023-05-24
39d91567-689a-420a-a5ca-dd4e8ff7f1f0	project-inverse	xiv	Planet Inverse	f	\N	2023-05-24	2023-05-24
571d6985-5105-4306-aae7-7a8d200e2f01	projectmars	mars	ProjectMars	f	\N	2023-05-24	2023-05-24
cce0132d-308c-42e3-8e6a-d1b473e1c4c5	project-oasis	oasis	ProjectOasis	f	\N	2023-05-24	2023-05-24
a5d8fccb-6a12-4acd-a549-919d98c6498c	project-quantum	qbit	Project Quantum	f	\N	2023-05-24	2023-05-24
c2a40032-5d00-4985-bcde-05f4e5929494	project-with	wiken	Project WITH	f	\N	2023-05-24	2023-05-24
acfe9c9c-77d5-43b5-86ca-825333839abe	projectx	xil	Xillion	f	\N	2023-05-24	2023-05-24
18da22c8-e6a1-4ff0-89db-5e0bd2b1dfbb	projectx-d78dc2ae-9c8a-45ed-bd6a-22291d9d0812	prox	ProjectX	f	\N	2023-05-24	2023-05-24
f4ddf6f0-4fc3-45ef-aebf-ca76c9f5ddde	project-xeno	gxe	PROJECT XENO	f	\N	2023-05-24	2023-05-24
34c591b1-013c-4a11-8094-520601ad021b	prometeus	prom	Prom	f	\N	2023-05-24	2023-05-24
31594cd9-1303-42d3-a4ee-be2c9f87161a	prometheus-token	pro	Peak Finance Prometheus	f	\N	2023-05-24	2023-05-24
f052261c-f949-4793-a2e2-752e66ac1e6f	promodio	pmd	Promodio	f	\N	2023-05-24	2023-05-24
230923d6-d193-40f9-a2cd-de4396d9d38c	proof-of-apes	poa	Proof Of Apes	f	\N	2023-05-24	2023-05-24
5826b7c0-47ca-4498-baff-7c56d520281c	proof-of-gorila	pog	Proof Of Gorila	f	\N	2023-05-24	2023-05-24
5487d652-3673-4746-bcd5-e3a48e0ceeee	proof-of-liquidity	pol	Proof Of Liquidity	f	\N	2023-05-24	2023-05-24
f4919439-df28-467b-a21b-8f1a3ac94144	proof-of-memes	eth2.0	Proof Of Memes - Ethereum	f	\N	2023-05-24	2023-05-24
b57b6e47-7170-42c4-95c2-38a02f1a008d	propchain	propc	Propchain	f	\N	2023-05-24	2023-05-24
a5b5c6e2-412c-4c94-821e-6cd50ca8c9b0	propel-token	pel	Propel	f	\N	2023-05-24	2023-05-24
f7902101-f629-4ea9-a15e-6fd8d0c509f1	property-blockchain-trade	pbt	PROPERTY BLOCKCHAIN TRADE	f	\N	2023-05-24	2023-05-24
0996dd97-66ac-4267-9fea-db281251705e	prophet	pro	Prophet	f	\N	2023-05-24	2023-05-24
906952e0-3c46-4dac-902f-1b1bb1dfbe12	propland	prop	Propland	f	\N	2023-05-24	2023-05-24
71e854f6-e825-4537-a1b1-24899b8eca0d	props	props	Props	f	\N	2023-05-24	2023-05-24
a7e2be6e-5947-4f0d-972a-dbaa4e6f97ff	propy	pro	Propy	f	\N	2023-05-24	2023-05-24
3b1b4d68-766d-4fa3-8349-ffa9ffb9f534	prosper	pros	Prosper	f	\N	2023-05-24	2023-05-24
34d1685a-2e67-4e24-b99a-8f2e7411a176	prospera-tax-credit	ptc	Prospera Tax Credit	f	\N	2023-05-24	2023-05-24
270546cc-3afa-42cb-abe0-e772bdeca782	prostarter-token	prot	ProStarter	f	\N	2023-05-24	2023-05-24
c1d55df9-e1bd-4fc9-8478-9b5eef7dbc3f	proteo-defi	proteo	Proteo DeFi	f	\N	2023-05-24	2023-05-24
f39e500b-7fb8-4aae-a392-90a79dcf99ec	protocol-zero	zro	Protocol Zero	f	\N	2023-05-24	2023-05-24
997af4ff-66c2-48db-91a2-7290481606bd	protocon	pen	Protocon	f	\N	2023-05-24	2023-05-24
1754d13d-8c77-4acf-8316-b7492059c698	protofi	proto	Protofi	f	\N	2023-05-24	2023-05-24
4b5b7461-cb31-4fe5-beb3-e86536aa8b98	proto-gyro-dollar	p-gyd	Proto Gyro Dollar	f	\N	2023-05-24	2023-05-24
ffe120d7-f8be-4a6a-bab6-2640ce235046	proton	xpr	Proton	f	\N	2023-05-24	2023-05-24
b2c63bd0-9f9d-4da6-9c48-e464e35d6514	proton-coin	pro	Proton Coin	f	\N	2023-05-24	2023-05-24
e5367295-0ab3-4446-8430-fa4ca150494d	proton-loan	loan	Proton Loan	f	\N	2023-05-24	2023-05-24
b9b66729-d767-42e7-858d-4329c234ea0d	proton-protocol	proton	Proton Protocol	f	\N	2023-05-24	2023-05-24
da620798-97d6-4fc1-a60d-63b71d976fde	proxima	prox	Proxima	f	\N	2023-05-24	2023-05-24
3ece89d6-7436-4d8a-a4b7-59c96e027c0c	proximax	xpx	ProximaX	f	\N	2023-05-24	2023-05-24
87cb6869-a38e-4a0d-8f79-d7acc384533f	proxy-swap	proxy	Proxy Swap	f	\N	2023-05-24	2023-05-24
05e4685e-232f-41ab-a958-1ce57c61ff7b	pruf-protocol	pruf	PRüF Protocol	f	\N	2023-05-24	2023-05-24
c813b856-621f-4c9c-b0ad-bafb0be203cc	pstake-finance	pstake	pSTAKE Finance	f	\N	2023-05-24	2023-05-24
3a3afe80-1599-4016-8c52-a203bfdde300	pstake-staked-bnb	stkbnb	pSTAKE Staked BNB	f	\N	2023-05-24	2023-05-24
db036819-709a-42fb-8e79-1bc4d3687c0a	psyche	usd1	Psyche	f	\N	2023-05-24	2023-05-24
12c89a92-5d32-44d0-84d2-814bcf0da583	psyop	psyop	PSYOP	f	\N	2023-05-24	2023-05-24
22386af3-ee91-42fb-8e2f-8769ae66a488	psyoptions	psy	PsyFi	f	\N	2023-05-24	2023-05-24
dfb74e9e-1efe-4746-b055-96033c492a94	pterosaur-finance	pter	Pterosaur Finance	f	\N	2023-05-24	2023-05-24
8e2b622d-8f7f-40b8-9a87-2846814f28c5	ptokens-btc	pbtc	pTokens BTC [OLD]	f	\N	2023-05-24	2023-05-24
8d07d015-93e8-4bc2-945d-d7972173af49	ptokens-btc-2	pbtc	pTokens BTC	f	\N	2023-05-24	2023-05-24
f18d2e0b-cb37-4d3c-bce2-270bdd6cae73	ptokens-ore	ore	ORE Network	f	\N	2023-05-24	2023-05-24
f6372389-e995-4f33-a334-f1b40528ddef	pube-finance	pube	Pube Finance	f	\N	2023-05-24	2023-05-24
3f9067c3-d0d5-4992-827f-83e76ceb6b7f	publc	publx	PUBLC	f	\N	2023-05-24	2023-05-24
6a605898-f7a9-4301-aadf-9008be1e743d	public-index-network	pin	Public Index Network	f	\N	2023-05-24	2023-05-24
eaf7153c-a7c1-4c8b-b189-5349f0b2e785	public-mint	mint	Public Mint	f	\N	2023-05-24	2023-05-24
492f2b66-6286-4481-8101-3a4c9a0facb3	publish	news	PUBLISH	f	\N	2023-05-24	2023-05-24
82524cff-5dc7-4037-a1a0-2f45aeefd962	pudgy-cat	$pudgy	Pudgy Cat	f	\N	2023-05-24	2023-05-24
1ecb40b9-2f6e-408c-b3c3-262bc7e92508	pudgy-vault-nftx	pudgy	PUDGY Vault (NFTX)	f	\N	2023-05-24	2023-05-24
d68b0c19-4682-40c5-895d-8861c409dd0b	pufdao	puf	PufDAO	f	\N	2023-05-24	2023-05-24
3110d334-7121-40d1-8907-72c801c39172	puff	puff	PUFF	f	\N	2023-05-24	2023-05-24
57d65a11-ec43-4d5f-b99d-d30b17e12b64	pug-ai	pugai	PUG AI	f	\N	2023-05-24	2023-05-24
7da52254-7c19-4637-888f-12f94abe2987	puglife	pugl	PugLife	f	\N	2023-05-24	2023-05-24
9ccc20a3-7ed7-4839-9454-8647b0c41beb	puli-inu	puli	Puli	f	\N	2023-05-24	2023-05-24
2f8529d2-aa43-4565-9de6-27a8ab7795c6	pulsar-coin	plsr	Pulsar Coin	f	\N	2023-05-24	2023-05-24
fb78795f-4600-4775-a64d-0f45b0651f5c	pulseai	pulse	PulseAI	f	\N	2023-05-24	2023-05-24
9f6b030d-1b09-42e4-a6de-6ffdf6307622	pulsebitcoin	plsb	PulseBitcoin	f	\N	2023-05-24	2023-05-24
39c9c213-b8e3-4742-9ca6-2910a5ff085d	pulsechain	pls	PulseChain	f	\N	2023-05-24	2023-05-24
12de141f-49f3-47fa-95a2-8ccdc59c68c7	pulsecrypt	plscx	PulseCrypt	f	\N	2023-05-24	2023-05-24
21d102ca-f866-4e6a-beb9-6fdadc5b0392	pulsedoge	pulsedoge	PulseDoge	f	\N	2023-05-24	2023-05-24
3a34e8b0-7588-4fb0-8830-471a400922f4	pulsedogecoin	plsd	PulseDogecoin	f	\N	2023-05-24	2023-05-24
77de104d-9e39-46bf-a372-874ad39bf629	pulsefolio	pulse	PulseFolio	f	\N	2023-05-24	2023-05-24
5a7877c0-252c-4b94-b401-4263ec7cd88a	pulse-inu	pinu	Pulse Inu	f	\N	2023-05-24	2023-05-24
910be938-aa5f-40c6-97fd-1ca1c3fc8350	pulsepad	plspad	PulsePad	f	\N	2023-05-24	2023-05-24
2a2c7079-b663-4072-9200-5da4e09d59f2	pulse-token	pulse	PulseMarkets	f	\N	2023-05-24	2023-05-24
e99fb6a8-3687-4b07-a685-d660b7dba7f1	pulsex	plsx	PulseX	f	\N	2023-05-24	2023-05-24
c369f033-8aae-4e2c-b508-8bedfc77bf27	pumapay	pma	PumaPay	f	\N	2023-05-24	2023-05-24
32888165-3029-459c-9e6c-3aa35abbb81d	puml-better-health	puml	PUML Better Health	f	\N	2023-05-24	2023-05-24
d12d1213-ed7e-40b7-8672-d19990d4450a	pumlx	pumlx	PUMLx	f	\N	2023-05-24	2023-05-24
b64f3ee0-9de9-41aa-a938-9d765ff2c93b	punchy-token	punch	Punchy Token	f	\N	2023-05-24	2023-05-24
fa376d4b-a9f1-42ca-adf1-158241f3dac4	pundi-x	npxs	Pundi X [OLD]	f	\N	2023-05-24	2023-05-24
02a89455-6712-4759-90b4-eaaa84e2b124	pundi-x-2	pundix	Pundi X	f	\N	2023-05-24	2023-05-24
f30b17af-74f2-4f1d-b1ba-7d6bb48be3a1	pundi-x-nem	npxsxem	Pundi X NEM	f	\N	2023-05-24	2023-05-24
b310dd5e-295f-46ef-b075-cad849e950c5	pundi-x-purse	purse	Pundi X PURSE	f	\N	2023-05-24	2023-05-24
464a7e88-91e8-400a-bbdf-ef8cb2c71717	punk-panda-messenger	ppm	Punk Panda Messenger	f	\N	2023-05-24	2023-05-24
75ff0fcb-1a26-40a0-972c-a3f0e1eae12e	punks-comic-pow	pow	POW	f	\N	2023-05-24	2023-05-24
a7d9239c-b727-4f95-aec8-5eedb2fdc38d	punk-shiba	punks	Punk Shiba	f	\N	2023-05-24	2023-05-24
d7fa321f-0645-4b6c-a7b1-459780b41da6	punk-vault-nftx	punk	Punk Vault (NFTX)	f	\N	2023-05-24	2023-05-24
7e69cb24-5594-49fc-b183-60ce3c73fd00	pupazzi-punk-brise-of-sun	pps	Pupazzi Punk Brise Of Sun	f	\N	2023-05-24	2023-05-24
7b062b6a-4ad0-40ee-a9da-d5d254cbb510	pup-doge	pupdoge	Pup Doge	f	\N	2023-05-24	2023-05-24
d1115393-c8fe-4712-92c1-577460df787d	puppets-arts-2	puppets	Puppets Coin	f	\N	2023-05-24	2023-05-24
3e80cc92-2421-413c-bc8f-d3181703146f	purchasa	pca	Purchasa	f	\N	2023-05-24	2023-05-24
b9120b56-e553-4f43-a0e7-ced9779b5643	purefi	ufi	PureFi	f	\N	2023-05-24	2023-05-24
9cb16189-16b1-4b37-81db-0ea32a15c5c2	puregold-token	pgpay	PGPay	f	\N	2023-05-24	2023-05-24
67bb311f-d542-40a2-828a-8c62e1a2ebca	puriever	pure	Puriever	f	\N	2023-05-24	2023-05-24
1f6d65b5-af74-4178-a251-065c1310a6f0	purpose	prps	Purpose	f	\N	2023-05-24	2023-05-24
85a2e662-0f10-46a6-abaa-44019cdbe389	pusd	pusd	PUSD_Polyquity	f	\N	2023-05-24	2023-05-24
bfa5d16d-d61a-4456-84b6-4bba0cbed137	pussy-financial	pussy	Pussy Financial	f	\N	2023-05-24	2023-05-24
e4cd1c3e-3f28-4b61-8706-ff7cb16bcf36	pusuke-inu	pusuke	Pusuke Inu	f	\N	2023-05-24	2023-05-24
eaa6737b-d8e1-4dae-b9c9-8579fbf5796b	putincoin	put	PUTinCoin	f	\N	2023-05-24	2023-05-24
29cff5d1-1367-4599-9413-d852955765e2	puzzle-swap	puzzle	Puzzle Swap	f	\N	2023-05-24	2023-05-24
f5184217-6eb1-4567-a905-d97135126b2d	pwrcash	pwrc	PWRCASH	f	\N	2023-05-24	2023-05-24
20e7652b-60f0-4f83-99ac-d1bdc750467b	pylon-eco-token	petn	Pylon Eco Token	f	\N	2023-05-24	2023-05-24
8b6712da-9d64-447f-9412-bddcbe3745a3	pyrexcoin	gpyx	GoldenPyrex	f	\N	2023-05-24	2023-05-24
3af120f2-3cfd-4c2b-8879-fabbd253b112	pyrk	pyrk	Pyrk	f	\N	2023-05-24	2023-05-24
8ba761b2-3676-430c-afab-74b42e7e8134	pyromatic	pyro	PYROmatic	f	\N	2023-05-24	2023-05-24
8d90fefd-d892-485c-808d-2ad5a174d8b3	pyrrho-defi	pyo	Pyrrho	f	\N	2023-05-24	2023-05-24
2b3842a3-7e3f-4d3d-b504-0931095db3ec	q2	q2	Pocketful of Quarters	f	\N	2023-05-24	2023-05-24
7220d685-b812-49de-8f6c-31d4f3abe1d0	qanplatform	qanx	QANplatform	f	\N	2023-05-24	2023-05-24
f6fd0e2e-624a-47f6-af2e-6e8c261e05a7	qash	qash	QASH	f	\N	2023-05-24	2023-05-24
56766ee3-e2e4-414f-9e6a-0ddbb5d0e7f7	qatargrow	qatargrow	QatarGrow	f	\N	2023-05-24	2023-05-24
8115c307-d8f6-453c-97e0-8763e982b27b	qawalla	qwla	Qawalla	f	\N	2023-05-24	2023-05-24
a90a86b8-08b6-44b6-b78a-8d3ab28168c2	qbao	qbt	Qbao	f	\N	2023-05-24	2023-05-24
acee1a2b-2381-4cf2-807e-8c9f7c5e8143	qchain-qdt	qdt	QChain QDT	f	\N	2023-05-24	2023-05-24
94c2fef0-e8f5-4702-b78b-9518c13c2b02	qi-dao	qi	Qi Dao	f	\N	2023-05-24	2023-05-24
fa17403d-dd57-4a9f-966e-699ee7638ab5	qie	qie	QI Blockchain	f	\N	2023-05-24	2023-05-24
c46f7f52-f1aa-4a6a-9673-5437b2cb9e21	qiswap	qi	QiSwap	f	\N	2023-05-24	2023-05-24
3ea7dfa2-824e-4c03-ab4e-9aa13a443317	qitchain-network	qtc	Qitcoin	f	\N	2023-05-24	2023-05-24
1b541832-b186-4d81-91c3-19d73673d692	qiusd	qiusd	QiUSD	f	\N	2023-05-24	2023-05-24
e2f74151-3435-4023-bae2-fe76d74e1d18	qlindo	qlindo	QLINDO	f	\N	2023-05-24	2023-05-24
b08e0fcf-87fc-44ac-91b2-15e08a754079	qlink	qlc	Kepple [OLD]	f	\N	2023-05-24	2023-05-24
6d07f1cf-1ae2-48a0-a2ff-0fb4237e1338	qmall	qmall	Qmall	f	\N	2023-05-24	2023-05-24
00e2b421-05e4-4423-8d98-369cf1076956	qmcoin	qmc	QMCoin	f	\N	2023-05-24	2023-05-24
55d5d44b-7a5b-452a-8b5a-6029c994faab	qoda-finance	qodex	Qoda Finance	f	\N	2023-05-24	2023-05-24
80ffb023-219a-4128-ad4c-cf308a3d8362	qowatt	qwt	QoWatt	f	\N	2023-05-24	2023-05-24
2b0c5613-a65e-4626-86c0-b85a3a000bbc	qqq-token	qqq	Poseidon Network	f	\N	2023-05-24	2023-05-24
788df154-95eb-40e6-b14d-d51f1a4a4d8c	qqq-tokenized-stock-defichain	dqqq	Invesco QQQ Trust Defichain	f	\N	2023-05-24	2023-05-24
d6f47b00-012e-4775-bea8-d04b900f41d4	qredit	xqr	Qredit	f	\N	2023-05-24	2023-05-24
8886a55e-2ea3-4c2d-922a-7d7899dddc95	qredo	qrdo	Qredo	f	\N	2023-05-24	2023-05-24
3b79cce4-58f5-4e63-85c5-3ef1ea288e60	qrkita-token	qrt	Qrkita	f	\N	2023-05-24	2023-05-24
f70ac9c4-76cd-4416-92e2-483888c76547	qrolli	qr	Qrolli	f	\N	2023-05-24	2023-05-24
251c027f-2794-4c11-bfea-cd2390602994	qtoken	qto	Qtoken	f	\N	2023-05-24	2023-05-24
baf57806-9c77-4d3e-80fa-9106ee0197fb	qtum	qtum	Qtum	f	\N	2023-05-24	2023-05-24
0724d229-7bef-49af-a3a0-c28972931416	quack	quack	QUACK	f	\N	2023-05-24	2023-05-24
078b15ad-8ce8-4148-b7d1-2cb2be51dc92	quadency	quad	Quadency	f	\N	2023-05-24	2023-05-24
db235ab7-139e-4746-a85d-7047c8962c23	quadrant-protocol	equad	Quadrant Protocol	f	\N	2023-05-24	2023-05-24
84f9d562-530b-4cca-8c25-b70546003476	quantfury	qtf	Quantfury	f	\N	2023-05-24	2023-05-24
21dc5870-e827-4c40-92bb-05b3c9113218	quantic	quantic	Quantic	f	\N	2023-05-24	2023-05-24
43ee7e46-ef61-44a8-b7df-cb5dffda2568	quantland	qlt	Quantland	f	\N	2023-05-24	2023-05-24
7cd17572-5ad5-4da5-ae4a-bb2d7f49427f	quant-network	qnt	Quant	f	\N	2023-05-24	2023-05-24
522c315e-f28b-4500-a7b9-6593369af6a5	quantstamp	qsp	Quantstamp	f	\N	2023-05-24	2023-05-24
e1f6b294-c3b7-443a-b09f-f02ebdf4219b	quantum-assets	qa	Quantum Assets	f	\N	2023-05-24	2023-05-24
ddd8f581-73a8-46ad-a372-16c533095637	quantum-resistant-ledger	qrl	Quantum Resistant Ledger	f	\N	2023-05-24	2023-05-24
efff387f-9955-43e8-a240-fe1a4e309255	quantum-tech	qua	Quantum Tech	f	\N	2023-05-24	2023-05-24
169619e9-726f-4297-ae97-1b0be84a58c6	quarashi	qua	Quarashi	f	\N	2023-05-24	2023-05-24
21b6d21e-3e92-4b70-a694-466f8f512bf8	quark	qrk	Quark	f	\N	2023-05-24	2023-05-24
3b24dde8-5a92-4a56-b18d-835a0bc8e8fd	quark-chain	qkc	QuarkChain	f	\N	2023-05-24	2023-05-24
1ffe86e9-b530-479a-8f71-294d7195e9d5	quartz	qtz	Quartz	f	\N	2023-05-24	2023-05-24
fb5bcd14-14d0-44d3-8a8c-7cc8cae83b90	quasacoin	qua	Quasacoin	f	\N	2023-05-24	2023-05-24
b561a268-48bc-47b3-8103-62ad6f39f975	quasar	qsr	Quasar	f	\N	2023-05-24	2023-05-24
64c44d38-82a4-465f-afbb-0b3aaabb6eeb	qube-2	qube	Qube	f	\N	2023-05-24	2023-05-24
df37cd53-bd6b-4488-b437-9592d92c7dd3	qubit	qbt	Qubit	f	\N	2023-05-24	2023-05-24
eb9c6955-f971-4814-aa06-6d0e93c52be5	quebecoin	qbc	Quebecoin	f	\N	2023-05-24	2023-05-24
60833695-3e00-4064-8150-633db6896aa7	queeneth	qeth	queenETH	f	\N	2023-05-24	2023-05-24
04ed8145-4cd6-4eab-9a3b-0a9701f290fb	quick	quick	Quickswap [OLD]	f	\N	2023-05-24	2023-05-24
e565bd17-b3f8-4f27-810f-66671bd53104	quick-intel	quicki	Quick Intel	f	\N	2023-05-24	2023-05-24
763c3034-bce5-4af5-839c-0c66781fceae	quicksilver	qck	Quicksilver	f	\N	2023-05-24	2023-05-24
2287960c-98a3-4713-adcc-311d81278a0f	quickswap	quick	Quickswap	f	\N	2023-05-24	2023-05-24
8fe31892-3c93-4fdc-8bd2-5558addf0167	quick-transfer-coin-plus	qtcc	Quick Transfer Coin Plus	f	\N	2023-05-24	2023-05-24
3f02fd07-4e54-424a-bf20-467137a90210	quickx-protocol	qcx	QuickX Protocol	f	\N	2023-05-24	2023-05-24
5c036e75-1d4d-4795-9ef2-21f3a1ea4e78	quidax	qdx	Quidax	f	\N	2023-05-24	2023-05-24
1ea31dba-723b-4b73-ac31-4ba576058455	quidd	quidd	Quidd	f	\N	2023-05-24	2023-05-24
f2061e68-fb87-4a1d-827a-b866073af9d8	quid-ika	quid	Quid Ika	f	\N	2023-05-24	2023-05-24
bce2f1db-f44a-4cfd-9daf-adf990b72058	quincoin	qin	QUINCOIN	f	\N	2023-05-24	2023-05-24
425130f2-bfce-4368-9fa0-263fdc9efc41	quint	quint	Quint	f	\N	2023-05-24	2023-05-24
5c2e2165-e0f0-41d0-9d92-34f8d2f43bea	quipuswap-governance-token	quipu	QuipuSwap Governance	f	\N	2023-05-24	2023-05-24
e61339b1-02cf-4455-aab8-76cfb08d208d	quiverx	qrx	QuiverX	f	\N	2023-05-24	2023-05-24
0d5f8758-d669-4423-a926-a2a5c63ef256	quiztok	qtcon	Quiztok	f	\N	2023-05-24	2023-05-24
01411cfb-1ed2-4f99-9d90-3f7620eef2d2	quo	quo	Quoll Finance	f	\N	2023-05-24	2023-05-24
9f2df6c0-0d65-4ccb-9d53-26363da55e3d	quontral	quon	Quontral	f	\N	2023-05-24	2023-05-24
3e8bd0d1-5a9b-4c53-a8d3-67f4377e0fd2	quorum	rum	Quorum	f	\N	2023-05-24	2023-05-24
e5cb8e65-a2ee-4a3a-a4cb-5eac0071bb4b	r	r	R	f	\N	2023-05-24	2023-05-24
dbdf7b87-dc02-4971-984f-8a0124bc41ca	r34p	r34p	R34P	f	\N	2023-05-24	2023-05-24
62fce536-61ae-4844-b823-3b5728e459a5	rabbit2023	rabbit	Rabbit2023	f	\N	2023-05-24	2023-05-24
0ecd2432-2ba7-42de-bcba-24a185a27155	rabbit-finance	rabbit	Rabbit Finance	f	\N	2023-05-24	2023-05-24
b9a0f2fb-ee71-4816-896b-ecf79062b92f	rabbitking	rb	RabbitKing	f	\N	2023-05-24	2023-05-24
de3dfa4c-30c4-4109-865d-0f2443468699	rabbitswap	rabbit	RabbitSwap	f	\N	2023-05-24	2023-05-24
a73a0289-9ea8-418b-8924-f3140ef4b862	rabbit-wallet	rab	Rabbit Wallet	f	\N	2023-05-24	2023-05-24
3e245ca9-3d18-4771-8890-36b03523c21b	rabbitx	rbx	RabbitX	f	\N	2023-05-24	2023-05-24
706ba9f6-200f-41c3-817b-13df653f58fb	rabity-finance	rbf	Rabity Finance	f	\N	2023-05-24	2023-05-24
ea5a7d09-d608-4ffb-970a-f3f762906084	racefi	racefi	RaceFi	f	\N	2023-05-24	2023-05-24
14141a40-f702-4d39-b239-641ba9c921ef	race-kingdom	atoz	Race Kingdom	f	\N	2023-05-24	2023-05-24
26734c6c-38ef-4f5b-a195-10ea1dfe69bd	racex	racex	RaceX	f	\N	2023-05-24	2023-05-24
dc3e77fc-db49-4863-b782-fe9a73f666f3	racing-club-fan-token	racing	Racing Club Fan Token	f	\N	2023-05-24	2023-05-24
7197c253-0228-4ce2-93f5-e87218b166e4	rad	rad	RAD	f	\N	2023-05-24	2023-05-24
16e3d66f-0d9f-41cd-93ea-763eb30fde22	radar	radar	Radar	f	\N	2023-05-24	2023-05-24
72c87220-6f81-4460-b8e9-d55e11b6990d	radial-finance	rdl	Radial Finance	f	\N	2023-05-24	2023-05-24
b65242fc-6ade-4977-9e6c-d0c10e95ffec	radiant	rxd	Radiant	f	\N	2023-05-24	2023-05-24
6dc1d34a-f477-4aff-86cc-fe3337ea55e1	radiant-capital	rdnt	Radiant Capital	f	\N	2023-05-24	2023-05-24
340a90d1-430d-4afd-ad80-a2c04b314ac4	radical-chess	chess	Radical Chess	f	\N	2023-05-24	2023-05-24
b33b8ee1-9876-4e73-9d5c-fa2412a5930b	radicle	rad	Radicle	f	\N	2023-05-24	2023-05-24
cdd4d3d4-f658-4ce9-95fe-fcf5946951e3	radio-caca	raca	Radio Caca	f	\N	2023-05-24	2023-05-24
a3ae4b25-48a5-4aae-b574-4f57148f583b	radioreum	theradio	Radioreum	f	\N	2023-05-24	2023-05-24
33e6c827-9f5d-442f-90bd-9bcc98b13d6d	radioshack	radio	RadioShack	f	\N	2023-05-24	2023-05-24
6a1fdef3-b498-4217-9ff1-f6e2433f40a7	radium	val	Validity	f	\N	2023-05-24	2023-05-24
58465b3a-1f85-4cea-b2a2-1e2ae8091404	radix	xrd	Radix	f	\N	2023-05-24	2023-05-24
a137e903-0626-40cf-8a58-4a9783697df7	rae-token	rae	Receive Access Ecosystem	f	\N	2023-05-24	2023-05-24
c139f0e1-8815-4cec-aad6-9c42a1a398d7	rage-fan	rage	Rage.Fan	f	\N	2023-05-24	2023-05-24
91f4099c-ab3b-44aa-8a5b-adab370494ef	rage-on-wheels	row	Rage On Wheels	f	\N	2023-05-24	2023-05-24
069c14fa-f5f8-4ec9-9e5f-b46350b0935a	raggiecoin	rag	RaggieCoin	f	\N	2023-05-24	2023-05-24
f4eece40-ccde-4a45-aa49-91c7c6b2fd74	rai	rai	Rai Reflex Index	f	\N	2023-05-24	2023-05-24
d6b3366c-5cbc-4ca2-88ec-7c3dde9c3074	raiden-network	rdn	Raiden Network	f	\N	2023-05-24	2023-05-24
f6d8ec04-3c1e-4931-8243-1c08e7a8ac78	raider-aurum	aurum	Raider Aurum	f	\N	2023-05-24	2023-05-24
4864ea9a-c297-4fc6-874e-39d6c1ffbd68	raider-inu	raid	Raider Inu	f	\N	2023-05-24	2023-05-24
9bfe1c36-9d60-48e7-920c-d1d5442b5059	raid-token	raid	Raid	f	\N	2023-05-24	2023-05-24
efb33d2d-b8e0-4a8c-93bf-37f86c64c643	rai-finance	sofi	RAI Finance	f	\N	2023-05-24	2023-05-24
80e24a54-b847-4e42-887a-1c7b8688b77a	railgun	rail	Railgun	f	\N	2023-05-24	2023-05-24
9b772566-a80e-49bc-b231-91618a2669e5	rainbowtoken	rainbowtoken	RainbowToken	f	\N	2023-05-24	2023-05-24
28fbd9a8-dbed-49e8-9439-1e95c6f9fa19	rainbow-token	rnbw	HaloDAO	f	\N	2023-05-24	2023-05-24
de350d2d-7064-4e42-aab9-cfd49497de26	rainbow-token-2	rbw	Rainbow Token	f	\N	2023-05-24	2023-05-24
2cb11747-b189-4e2a-ad2b-ca7e83ecdc2d	rainicorn	$raini	Raini	f	\N	2023-05-24	2023-05-24
ad099bb0-90d4-4afb-9bd3-ceb59226295d	rainmaker-games	rain	Rainmaker Games	f	\N	2023-05-24	2023-05-24
7dca408a-6abe-41e5-a8bd-5712fbd3062b	rai-yvault	yvrai	RAI yVault	f	\N	2023-05-24	2023-05-24
b44204bb-3787-4d84-abd1-c02bd063bc02	rake-finance	rak	Rake Finance	f	\N	2023-05-24	2023-05-24
cefebd37-d826-4369-bc96-69e574a4e98c	rake-in	rake	Rake.in	f	\N	2023-05-24	2023-05-24
7c90cc1a-0958-4878-837c-215fa8909451	rally-2	rly	Rally	f	\N	2023-05-24	2023-05-24
a4e11cdc-d9b1-47b4-9bf1-917db119e21e	rally-solana	srly	Rally (Solana)	f	\N	2023-05-24	2023-05-24
58ad3c55-c945-4539-abf5-3e7960ae9a11	ramestta	rama	Ramestta	f	\N	2023-05-24	2023-05-24
f4364311-3c57-4537-bf29-4692ae878825	ramifi	ram	Ramifi Protocol	f	\N	2023-05-24	2023-05-24
f033f8db-a314-4bca-9ac4-3d46653715fe	ramp	ramp	RAMP [OLD]	f	\N	2023-05-24	2023-05-24
29526ec9-cb1d-4bac-b1c2-c1b103a7bd6f	ramses-exchange	ram	Ramses Exchange	f	\N	2023-05-24	2023-05-24
1a388946-aacd-4485-881a-9a68f2f4eab2	ranbased	ranb	RANBASED	f	\N	2023-05-24	2023-05-24
ad2e970c-9ab3-46f0-9610-dc3ed4532aa8	random	rndm	Random	f	\N	2023-05-24	2023-05-24
c6e291dc-8e7e-406b-a574-ea6e28e018cc	rangers-fan-token	rft	Rangers Fan Token	f	\N	2023-05-24	2023-05-24
764ad7f5-0e9c-4b1b-8409-f59cf4b515c7	rangers-protocol-gas	rpg	Rangers Protocol	f	\N	2023-05-24	2023-05-24
07446761-39af-4ae1-b2e0-b469825d2d8b	rankerdao	ranker	RankerDao	f	\N	2023-05-24	2023-05-24
79b67d08-005c-46e2-9f07-ce46e3507b4f	rapids	rpd	Rapids	f	\N	2023-05-24	2023-05-24
0b64d879-9f32-4874-a2e1-9a96c0b68506	raptoreum	rtm	Raptoreum	f	\N	2023-05-24	2023-05-24
ae2eb479-3ded-4f79-90f8-0e95f05ea040	raptor-finance-2	rptr	Raptor Finance	f	\N	2023-05-24	2023-05-24
66bbe754-ddd6-451d-bac8-a9f4d6f21c5d	rare-ball-shares	rbp	Rare Ball Potion	f	\N	2023-05-24	2023-05-24
65827779-c004-494b-bf63-bde938c5502a	rare-fnd	fnd	Rare FND	f	\N	2023-05-24	2023-05-24
2cd93f67-f716-4cd5-a1b7-ac8f8f421cea	raresama	poop	Raresama	f	\N	2023-05-24	2023-05-24
6fa5dafc-a418-4b25-b5ce-8300fe9baba0	rarible	rari	Rarible	f	\N	2023-05-24	2023-05-24
605dd652-7fc5-4b77-a22c-b69fd851d4eb	rari-governance-token	rgt	Rari Governance	f	\N	2023-05-24	2023-05-24
bec95477-25cc-4b45-a6e3-1e012dd8447d	rasko	rasko	rASKO	f	\N	2023-05-24	2023-05-24
7a71e997-1210-4eb4-a21c-e361e00a8007	ratecoin	xra	Ratecoin	f	\N	2023-05-24	2023-05-24
bd52f865-05c9-441b-ab45-2e4a1dc519af	ratio-finance	ratio	Ratio Protocol	f	\N	2023-05-24	2023-05-24
aabce64d-62ee-44c9-a269-23424562a243	ratscoin	rats	Ratscoin	f	\N	2023-05-24	2023-05-24
7d304363-145d-40a6-ad30-11b5780354bb	ravelin-finance	rav	Ravelin Finance	f	\N	2023-05-24	2023-05-24
76b667e3-ce2a-4d76-9723-8114693fcdad	rave-names	rave	Rave Names	f	\N	2023-05-24	2023-05-24
64b30cb1-d7fc-4cd8-bf23-69df91438f96	ravencoin	rvn	Ravencoin	f	\N	2023-05-24	2023-05-24
37ea1d0e-c0b9-49a7-8927-73830feb987b	ravencoin-classic	rvc	Ravencoin Classic	f	\N	2023-05-24	2023-05-24
aecaf106-d4b8-40b0-b050-4bff96fbf210	raven-dark	xrd	Raven Dark	f	\N	2023-05-24	2023-05-24
4535f4cc-7a09-44ad-8641-d23dc2a04a08	ravendex	rave	Ravendex	f	\N	2023-05-24	2023-05-24
cafaa65f-1dbb-4f5c-9f25-ff5c59c9076d	raven-protocol	raven	Raven Protocol	f	\N	2023-05-24	2023-05-24
a17b7241-bffe-4269-86c9-43744ba6d2bb	raydium	ray	Raydium	f	\N	2023-05-24	2023-05-24
a5da0a83-1566-4525-b119-e0e27d063561	ray-network	xray	Ray Network	f	\N	2023-05-24	2023-05-24
de9da43c-c41f-4e34-b840-6721c2abb733	rays	rays	RAYS	f	\N	2023-05-24	2023-05-24
580e842e-e130-4b75-9319-657075cccc20	raze-network	raze	Raze Network	f	\N	2023-05-24	2023-05-24
6fabfabb-9e7f-4a95-a254-411d0666dfa3	razor-network	razor	Razor Network	f	\N	2023-05-24	2023-05-24
b136aec5-2a3b-4fd3-a35b-d988aa742522	rb-finance	rb	RB Finance	f	\N	2023-05-24	2023-05-24
fcbb8ecb-0339-407a-a5bb-65c30500bc3a	rb-share	rbx	RB Share	f	\N	2023-05-24	2023-05-24
8e7d78d7-57e0-4613-9ee4-f2c8989d47dc	rbx-token	rbx	RBX	f	\N	2023-05-24	2023-05-24
d6a0a1d2-ddda-4b01-b419-8b6865807fee	rc-celta-de-vigo-fan-token	cft	RC Celta de Vigo Fan Token	f	\N	2023-05-24	2023-05-24
0571c35c-8585-4c18-af2b-c1c63ea54408	rcd-espanyol-fan-token	enft	RCD Espanyol Fan Token	f	\N	2023-05-24	2023-05-24
6006150d-697a-4d48-9989-316f4a136ec0	reactorfusion	rf	ReactorFusion	f	\N	2023-05-24	2023-05-24
fae8db97-51d7-41fe-8325-1f048f571ea3	readfi	rdf	ReadFi	f	\N	2023-05-24	2023-05-24
a7be07f5-912d-4ecc-894b-b725464d2691	real-estate-token	r3t	Real Estate Token	f	\N	2023-05-24	2023-05-24
9bb0cff9-29af-4d13-86ba-0608ae2a6ee1	realfevr	fevr	RealFevr	f	\N	2023-05-24	2023-05-24
da7002ec-1468-4aad-91bd-05d66e33c115	realfinance-network	refi	Realfinance Network	f	\N	2023-05-24	2023-05-24
2c388e28-6df5-4a4c-9188-29c2decc8076	realio-network	rio	Realio	f	\N	2023-05-24	2023-05-24
35f02e56-0ce8-47bf-baa5-3aa4db896072	realis-network	lis	Realis Network	f	\N	2023-05-24	2023-05-24
e2b3f51b-4ad2-44ab-b8f6-165764c42a5d	realital-metaverse	reta	Realital Metaverse	f	\N	2023-05-24	2023-05-24
87d21606-c22a-47dc-992a-6f9a9567c0ae	reality-metaverse	rltm	Reality Metaverse	f	\N	2023-05-24	2023-05-24
6616b98c-beb4-4009-a81e-d54ca3e17f44	reality-vr	rvr	Reality VR	f	\N	2023-05-24	2023-05-24
3b8e7710-513b-4aa7-ade4-b48517a4ab61	reallink	real	RealLink	f	\N	2023-05-24	2023-05-24
b68e152a-89a9-49e1-9942-e5224654553c	realm	realm	Realm	f	\N	2023-05-24	2023-05-24
db3def2c-23b2-4067-beee-63745049a04d	realmoneyworld	rmw	RealMoneyWorld	f	\N	2023-05-24	2023-05-24
50bf244d-d5a6-48bb-83dd-4f8ca4a31f93	real-realm	real	Real Realm	f	\N	2023-05-24	2023-05-24
05474d21-e536-4bbb-9fa5-ba3cb516a61e	real-sociedad-fan-token	rso	Real Sociedad Fan Token	f	\N	2023-05-24	2023-05-24
475acfc8-640a-4b87-9369-7a323e7eb674	realtract	ret	RealTract	f	\N	2023-05-24	2023-05-24
6ff2b61b-fd1e-4001-8787-c27ecb74c9c7	real-usd	usdr	Real USD	f	\N	2023-05-24	2023-05-24
a21a8e62-0590-44bc-bc0e-f4e14bfd4440	realy-metaverse	real	Realy Metaverse	f	\N	2023-05-24	2023-05-24
427edd2c-b6a5-49fe-851d-5f7d9379a50e	reapchain	reap	ReapChain	f	\N	2023-05-24	2023-05-24
e7f90bbc-f4d8-48f8-923b-3c64bd6ae1c7	reaper-token	reaper	Reaper	f	\N	2023-05-24	2023-05-24
6fcc6181-6e37-4b98-a717-b2e688543805	rebasing-tbt	tbt	Rebasing TBT	f	\N	2023-05-24	2023-05-24
7dded609-8033-46dc-9a54-7278249745d1	rebel-bots	rbls	Rebel Bots	f	\N	2023-05-24	2023-05-24
38cf388d-9931-4f75-b1b7-07bf5a5f8abe	rebellion-dao	reb	Rebellion DAO	f	\N	2023-05-24	2023-05-24
77319400-f2fc-4c1f-beb8-3a5f1831fc99	rebellion-protocol	rebl	Rebellion Protocol	f	\N	2023-05-24	2023-05-24
160f93b5-47ab-4b11-a14c-125336f29257	rebeltradertoken	rtt	RebelTrader	f	\N	2023-05-24	2023-05-24
e4180b77-50b4-43a4-93d3-51b9a0f60df0	rebus	rebus	Rebus	f	\N	2023-05-24	2023-05-24
f727ba28-297c-4438-8449-5df524bb95a4	recast1	r1	Recast1	f	\N	2023-05-24	2023-05-24
222dc4ec-3bd5-423c-8e55-d00e7cc478c5	recharge	rcg	Recharge	f	\N	2023-05-24	2023-05-24
9d006e35-85ec-4bcb-925e-69f3184b35c8	recoverydao	rec	RecoveryDAO	f	\N	2023-05-24	2023-05-24
fb05dce2-a99f-4f07-a667-1b63d211d84f	recovery-right-token	rrt	Recovery Right	f	\N	2023-05-24	2023-05-24
eab716dc-0ab3-4883-a330-74183218e76e	recovery-value-usd	rvusd	Recovery Value USD	f	\N	2023-05-24	2023-05-24
5a268975-c6e2-4b4b-a267-6323e0512fa3	recycle-x	rcx	Recycle-X	f	\N	2023-05-24	2023-05-24
69228f5d-00a5-4b39-b077-b038b4212d9a	red	red	Red	f	\N	2023-05-24	2023-05-24
b099dc82-701b-4c17-a28e-7187c6378477	redacted	btrfly	Redacted	f	\N	2023-05-24	2023-05-24
0bc33905-7aa1-42ff-9320-4fc3f93b6c8f	redancoin	redan	REDANCOIN	f	\N	2023-05-24	2023-05-24
65d5b9e2-1bd7-4003-b17c-d258741a8be6	reddcoin	rdd	Reddcoin	f	\N	2023-05-24	2023-05-24
23d909f6-38e4-4439-b8d4-d66583b3a4a5	red-falcon	rfn	Red Falcon	f	\N	2023-05-24	2023-05-24
7315dd1c-d313-4474-872e-7b19278a2603	redfeg	redfeg	RedFeg	f	\N	2023-05-24	2023-05-24
f9e0a085-8ff0-482f-b3e7-a7b64cce794e	redfireants	rants	redFireAnts	f	\N	2023-05-24	2023-05-24
1f600be2-cadd-4ad5-99e5-dc6b7fc208d6	red-floki-ceo	redflokiceo	Red Floki CEO	f	\N	2023-05-24	2023-05-24
15de6d5a-d37f-44ff-bfaf-1adb6d05292a	redfox-labs-2	rfox	RFOX	f	\N	2023-05-24	2023-05-24
1643e467-3b77-44ff-bc3d-ad8ac90e5ffd	redi	redi	REDi	f	\N	2023-05-24	2023-05-24
742c42c0-a316-4fa0-a32d-0152a378f132	redlight-chain	redlc	Redlight Chain	f	\N	2023-05-24	2023-05-24
d463c61a-fe46-42f2-9432-eed908bce9f7	redmars	rmars	REDMARS	f	\N	2023-05-24	2023-05-24
ee58f128-6e83-49ed-9af6-e8d95b09e9ab	redpanda-earth-v2	redpanda	RedPanda Earth V2	f	\N	2023-05-24	2023-05-24
c8a7ec64-3915-43eb-ba9a-7513232bc7aa	red-pepe	redpepe	Red Pepe	f	\N	2023-05-24	2023-05-24
1d87d986-5f2e-40bd-8075-186dad8a7e66	red-pulse	phb	Phoenix Global [OLD]	f	\N	2023-05-24	2023-05-24
ded9b371-49ad-476a-a02b-3dfdc9bcb415	red-rabbit	rr	Red Rabbit	f	\N	2023-05-24	2023-05-24
922e01f3-2f2f-4212-90fd-1f5cb3e8e101	red-token	red	RED TOKEN	f	\N	2023-05-24	2023-05-24
c9d4fd92-110e-4940-8b45-799f4586f720	redux	redux	ReduX	f	\N	2023-05-24	2023-05-24
ba6a7929-524c-423b-aeeb-d5768185dca0	reef	reef	Reef	f	\N	2023-05-24	2023-05-24
d5117046-c08a-4b31-9c53-2d7ee1f33ed3	reelfi	reelfi	ReelFi	f	\N	2023-05-24	2023-05-24
6fcbb934-ccac-4a7c-ab6e-1ffbdd93ce67	reel-token	reelt	Reel Token	f	\N	2023-05-24	2023-05-24
7802b88c-1c8c-42f3-9675-3a5f2940231d	refereum	rfr	Refereum	f	\N	2023-05-24	2023-05-24
b884e80a-1ea9-4c08-8c75-4265170d7ceb	ref-finance	ref	Ref Finance	f	\N	2023-05-24	2023-05-24
0b63df54-c8c3-46d4-ba28-161412e2a954	refinable	fine	Refinable	f	\N	2023-05-24	2023-05-24
8723f07a-f42e-488b-b5c5-8aef42020817	reflect-finance	rfi	reflect.finance	f	\N	2023-05-24	2023-05-24
570ad51a-bfec-42ed-9585-da9acaa0648a	reflecto	rto	Reflecto	f	\N	2023-05-24	2023-05-24
a3f05751-59e2-4a71-8861-8df799778658	reflecto-usd	rusd	Reflecto USD	f	\N	2023-05-24	2023-05-24
f197d184-04a6-457c-bb56-4b5a104d4a7f	reflex	rfx	Reflex	f	\N	2023-05-24	2023-05-24
92ccf2ea-39aa-44d6-b512-9f483e62fb09	reflexer-ungovernance-token	flx	Reflexer Ungovernance	f	\N	2023-05-24	2023-05-24
b390bcd0-9f19-4a75-80f5-d0d8832bdf5a	reftoken	ref	Ref	f	\N	2023-05-24	2023-05-24
ed3a5d68-8f3a-4dfb-9934-41d6b51a5f21	refund	rfd	Refund	f	\N	2023-05-24	2023-05-24
c81ae9aa-551f-4e71-92ed-050d4dcf3ca6	regen	regen	Regen	f	\N	2023-05-24	2023-05-24
26929e57-1b37-4f7d-8b9b-2e3c1395d427	regularpresale	regu	RegularPresale	f	\N	2023-05-24	2023-05-24
89b2ab14-4442-4974-a922-28a8a17545db	reign-of-terror	reign	Reign of Terror	f	\N	2023-05-24	2023-05-24
20848678-d59c-41e3-ac3f-496f20df3fcd	rei-network	rei	REI Network	f	\N	2023-05-24	2023-05-24
94b479fa-3875-40c3-930e-bf1dc7670262	rejuve-ai	rjv	Rejuve.AI	f	\N	2023-05-24	2023-05-24
77cf703a-b933-476a-acf4-b3a6f8484a72	rekt-04bbe51a-e290-450a-afb5-b2b43b80b20e	rekt	REKT	f	\N	2023-05-24	2023-05-24
b467306c-010f-4fed-854a-ce27b4ebba98	rektskulls	rekt	RektSkulls	f	\N	2023-05-24	2023-05-24
cd0aa6bd-fca3-497f-b99a-4438aad96b01	relaxable	relax	Relaxable	f	\N	2023-05-24	2023-05-24
2ecf8448-f5ac-4814-b6b1-7f873054f181	relay-token	relay	Relay Chain	f	\N	2023-05-24	2023-05-24
9d9d6bcb-90b2-4cf0-8ac3-21052b1d7ed8	release-ico-project	rel	RELEASE	f	\N	2023-05-24	2023-05-24
661a6862-2136-4a9a-8165-39f13e122a32	relevant	rel	Relevant	f	\N	2023-05-24	2023-05-24
175c0b2a-86d0-44e1-9f7a-b5ac0027ab1c	relic	relic	Relic	f	\N	2023-05-24	2023-05-24
e7adc6af-8145-4696-8315-86755760f3e5	relictumpro-genesis-token	gtn	RelictumPro Genesis Token	f	\N	2023-05-24	2023-05-24
c70e8bc4-a3b9-4774-a35d-a1ef73f37a15	rematicegc	rmtx	RematicEGC	f	\N	2023-05-24	2023-05-24
05ecd57e-3b58-401c-b66c-5bc5b00e7e5f	remme	rem	Remme	f	\N	2023-05-24	2023-05-24
5ab2bab2-b31f-4620-be2d-11c676952aad	rena-finance	rena	RENA Finance	f	\N	2023-05-24	2023-05-24
8abf83c5-6649-446b-a26d-f3e90f079aef	renbtc	renbtc	renBTC	f	\N	2023-05-24	2023-05-24
0c418a57-4080-4192-91a9-17b89eb832a0	render-token	rndr	Render	f	\N	2023-05-24	2023-05-24
814365f0-dfd7-4847-a392-f6063909edd7	rendoge	rendoge	renDOGE	f	\N	2023-05-24	2023-05-24
ca9ed1c2-9123-43b1-b655-5e410ecd1da6	renec	renec	RENEC	f	\N	2023-05-24	2023-05-24
89b28c93-c746-456a-87ce-609da2567968	renewable-energy	ret	Renewable Energy	f	\N	2023-05-24	2023-05-24
8b3381ca-4bf2-47f4-a303-3f270bd52cd9	renq-finance	renq	Renq Finance	f	\N	2023-05-24	2023-05-24
9ce991b3-558d-4e7f-a4e2-7306d8d9a86a	rentberry	berry	Rentberry	f	\N	2023-05-24	2023-05-24
0c202285-8381-4afc-8c47-bc3902c2c56c	rentible	rnb	Rentible	f	\N	2023-05-24	2023-05-24
59f4202a-b31f-4200-97f2-c0b1b5ca50f2	republic-credits	rpc	Republic Credits	f	\N	2023-05-24	2023-05-24
18daf86d-5ba2-4ff7-836b-1e604f461e1c	republic-protocol	ren	REN	f	\N	2023-05-24	2023-05-24
dc62dcc3-e8a9-4bb2-911c-c385c89f1bca	request-network	req	Request	f	\N	2023-05-24	2023-05-24
c780a830-344c-40c1-86e3-105ae059e103	researchcoin	rsc	ResearchCoin	f	\N	2023-05-24	2023-05-24
e3739bdb-9476-491c-9c09-47cf63bc1f41	reserve	rsv	Reserve	f	\N	2023-05-24	2023-05-24
84de27b9-6097-4355-a372-384877a8cc25	reserveblock	rbx	ReserveBlock	f	\N	2023-05-24	2023-05-24
636023b1-3674-4610-86f3-79779c44ecc1	reserve-rights-token	rsr	Reserve Rights	f	\N	2023-05-24	2023-05-24
1b7d854c-32e0-4351-9a13-ff6aa2d20738	reset-news	news	Reset News	f	\N	2023-05-24	2023-05-24
73c4da05-f896-4384-a311-1ae10b8f8888	resource-protocol	source	ReSource Protocol	f	\N	2023-05-24	2023-05-24
c744fc48-fdb4-4e41-bd31-3156b215c5bd	restore-truth-token	rtt	Restore Truth	f	\N	2023-05-24	2023-05-24
042f16d6-6eb7-40a8-9fa9-4376aef60fc6	retawars-goldrose-token	grt	Retawars GoldRose Token	f	\N	2023-05-24	2023-05-24
97789e26-4981-419b-a4c2-d0b77dd7987f	reth	reth	StaFi Staked ETH	f	\N	2023-05-24	2023-05-24
367efcdd-0207-4963-b637-8a93828d2620	reth2	reth2	rETH2	f	\N	2023-05-24	2023-05-24
e0302748-5302-4ec1-9c11-9e31448e0f34	retsuko	suko	Retsuko	f	\N	2023-05-24	2023-05-24
3c1533f5-30cd-454e-b35d-f9aeddf1b360	reunit-wallet	reuni	Reunit Wallet	f	\N	2023-05-24	2023-05-24
eb1ff667-919d-4e85-bac6-c3afc7a59ae6	rev3al	rev3l	REV3AL	f	\N	2023-05-24	2023-05-24
34fbc51d-ed5a-4e3c-9705-b44a738f9036	revain	rev	Revain	f	\N	2023-05-24	2023-05-24
0ccdfdfc-3f42-410a-8215-1aaeb9fa239c	revault-network	reva	Revault Network	f	\N	2023-05-24	2023-05-24
be8a5f5f-b308-416f-bc0a-4469c892460a	revenant	gamefi	Revenant	f	\N	2023-05-24	2023-05-24
5399fdc1-c78d-47c0-9c69-8dfed16f2f2e	revenue-coin	rvc	Revenue Coin	f	\N	2023-05-24	2023-05-24
3d16c698-93b0-4ad2-bcec-aaaeb0dd5cf3	revest-finance	rvst	Revest Finance	f	\N	2023-05-24	2023-05-24
22b898a6-714c-479c-b244-c070c024015c	revivalx	rvlx	RevivalX	f	\N	2023-05-24	2023-05-24
6ea334c6-9e8d-41fc-9574-c732e3ae8b64	revoai	revoai	revoAI	f	\N	2023-05-24	2023-05-24
091c070e-5a38-4d0c-ae0e-fb24daebc4d8	revoland	revo	Revoland	f	\N	2023-05-24	2023-05-24
356f49e1-4cfd-4bd9-85d2-726100fa2ebe	revolotto	rvl	Revolotto	f	\N	2023-05-24	2023-05-24
44008420-2bb1-4d8e-b7b4-51f632a8f158	revolt-2-earn	rvlt	Revolt 2 Earn	f	\N	2023-05-24	2023-05-24
9f4fda33-685c-420f-8889-a7a9d9db0b66	revolutiongames	rvlng	RevolutionGames	f	\N	2023-05-24	2023-05-24
ae461113-b9b2-4c16-9001-d2128fdefae0	revolution-populi	rvp	Revolution Populi	f	\N	2023-05-24	2023-05-24
368e3c5e-c26e-4324-9076-069758c2830f	revolve-games	rpg	Revolve Games	f	\N	2023-05-24	2023-05-24
fbba658d-efbc-4674-a3b9-baadb95f0c84	revomon	revo	Revomon	f	\N	2023-05-24	2023-05-24
228e2e0c-dc91-4bc5-83cd-7f75f381b43a	revuto	revu	Revuto	f	\N	2023-05-24	2023-05-24
293ebbce-f3e2-4bb0-bb10-95f8ec2d079f	revv	revv	REVV	f	\N	2023-05-24	2023-05-24
11347d8f-a2d1-4ce2-b1b7-61abe7e5ee87	rewardz-network	rayn	Rewardz® Network	f	\N	2023-05-24	2023-05-24
fefd96d9-56da-42f5-85b8-0c7edf94d12e	rex-token	xrx	Rex	f	\N	2023-05-24	2023-05-24
1ebbf6ec-53cd-4d60-a73a-a9639693e3d2	rhinofi	dvf	Rhino.fi	f	\N	2023-05-24	2023-05-24
e28db34a-cd1c-421a-ac04-5d5a9fc5eaca	rhinos-finance	rho	Rhinos Finance	f	\N	2023-05-24	2023-05-24
0eb42ec0-2dc7-40d1-b4be-44cdb30537e6	rho-token	rho	Rho	f	\N	2023-05-24	2023-05-24
ada50f24-d56b-4472-9b01-4fe4c78d77c2	rhythm	rhythm	Rhythm	f	\N	2023-05-24	2023-05-24
ce8955e4-f208-450b-9093-4f45f1f33d03	ribbit-meme	ribbit	Ribbit Meme	f	\N	2023-05-24	2023-05-24
31b69826-0ca2-43e6-bf4a-082e6a9872e6	ribbon-finance	rbn	Ribbon Finance	f	\N	2023-05-24	2023-05-24
d7f875da-eeab-45f9-aa08-f9cf3102792f	rice	rice	Rice	f	\N	2023-05-24	2023-05-24
d8d1b43b-4c48-47f4-980f-78f37c3bb7c3	riceswap	rice	RiceSwap	f	\N	2023-05-24	2023-05-24
9141415b-c18d-4f72-a06e-f9510f616536	rice-wallet	rice	Rice Wallet	f	\N	2023-05-24	2023-05-24
dbed47c2-ab92-4bcb-a8f1-2ff221f636cf	rich	rch	Rich	f	\N	2023-05-24	2023-05-24
8a8ff643-39b7-486d-9378-1e0b79d298a3	richai	richai	RichAI	f	\N	2023-05-24	2023-05-24
3b6fc609-a70c-4e4a-956d-dc7d8900ef2c	richard	richard	Richard	f	\N	2023-05-24	2023-05-24
0a00e3f1-ad45-4126-a06a-4a6a9614e0ff	richcity	rich	RichCity	f	\N	2023-05-24	2023-05-24
39d1bb4a-cf92-4885-9093-2582373d9427	richochet	ric	Ricochet	f	\N	2023-05-24	2023-05-24
9713e734-40c5-42d2-8b5d-06aebde28ee6	richquack	quack	Rich Quack	f	\N	2023-05-24	2023-05-24
7fe67f50-9bb5-4b24-b8d1-47631eb82ee1	rich-santa	santa	Rich Santa	f	\N	2023-05-24	2023-05-24
382f24e1-08a9-4cdd-b4ca-fe5fbfacba03	ricnatum	rcnt	Ricnatum	f	\N	2023-05-24	2023-05-24
f3319fcc-a3dc-4367-b87a-d6f6f584ff9e	ride_finance	rides	Rides Finance	f	\N	2023-05-24	2023-05-24
da8356b4-54ea-422f-bca2-d76b0d35708b	ridotto	rdt	Ridotto	f	\N	2023-05-24	2023-05-24
6d8c8251-d1a5-4948-8a02-87999dede92e	riecoin	ric	Riecoin	f	\N	2023-05-24	2023-05-24
3dd6825a-66c3-42f6-a976-26e9a002632d	rifi-united	ru	RIFI United	f	\N	2023-05-24	2023-05-24
8744ab24-dd0a-422b-9358-e115dc19de0c	rif-token	rif	RSK Infrastructure Framework	f	\N	2023-05-24	2023-05-24
a2c64d89-cfef-4aed-859f-217bbf0c7b7f	rigel-protocol	rgp	Rigel Protocol	f	\N	2023-05-24	2023-05-24
0a7ca1e8-2b36-4ca8-9785-05ab406d058a	rigoblock	grg	RigoBlock	f	\N	2023-05-24	2023-05-24
4f8ee83c-4666-41c0-9555-f46fa5998055	rikkei-finance	rifi	Rikkei Finance	f	\N	2023-05-24	2023-05-24
9cb439ba-5705-4ce1-a9f1-57649097a35b	rillafi	rilla	RillaFi	f	\N	2023-05-24	2023-05-24
c00eb25a-7757-4a3c-b77a-63eb6fee5e9f	rimaunangis	rxt	RIMAUNANGIS	f	\N	2023-05-24	2023-05-24
ada7666a-bba3-4e8e-a628-f6fc24c1618d	rin-finance-coin	rifico	Rin Finance Coin	f	\N	2023-05-24	2023-05-24
2754f62f-0331-4c3a-9f46-dead0b49cda7	rinia-inu	rinia	Rinia Inu	f	\N	2023-05-24	2023-05-24
90dc2d85-bfdb-4914-8c10-3c10780762c1	rio-defi	rfuel	RioDeFi	f	\N	2023-05-24	2023-05-24
13350555-f929-4017-874a-fd965ac40186	riot-racers	riot	Riot Racers	f	\N	2023-05-24	2023-05-24
1b53ac1e-0833-4c20-a2eb-6d58dbbad8de	ripae	pae	Ripae	f	\N	2023-05-24	2023-05-24
51850e9b-67a1-438e-be72-553dab70fee2	ripae-avax	pavax	Ripae AVAX	f	\N	2023-05-24	2023-05-24
9c632d18-bf9d-4133-8a84-af5d196a9c34	ripae-pbnb	pbnb	Ripae pBNB	f	\N	2023-05-24	2023-05-24
62ab1d36-f49a-47bf-8f20-c2095f223838	ripae-peth	peth	Ripae pETH	f	\N	2023-05-24	2023-05-24
7b3a18ac-493a-4073-814a-d4fdb81efbac	ripae-pmatic	pmatic	Ripae pMATIC	f	\N	2023-05-24	2023-05-24
3366659d-fe4b-4d7f-b81b-4a69aa99b3e1	ripae-seth	seth	Ripae sETH	f	\N	2023-05-24	2023-05-24
cdeaf9d1-d54b-4d66-98ef-eb3a5ebc2c21	ripio-credit-network	rcn	Ripio Credit Network	f	\N	2023-05-24	2023-05-24
c20044f5-956e-41a5-a2d0-c1e24657d0e1	ripple	xrp	XRP	f	\N	2023-05-24	2023-05-24
ff1ce699-d515-49e6-8a0c-6457308abfc5	rise	rise	Rise	f	\N	2023-05-24	2023-05-24
d84bbcf1-3362-433e-81b9-d3dabdfd92ed	risecoin	rsc	Risecoin	f	\N	2023-05-24	2023-05-24
f86dfb62-4c53-441d-84d9-13bdd2077aa4	risitas	risita	Risitas	f	\N	2023-05-24	2023-05-24
49fd431a-d09e-4458-ab7d-ed61e2f54eb6	ritestream	rite	ritestream	f	\N	2023-05-24	2023-05-24
a1b0980b-f22d-4b4e-b8ff-d476e54626e0	rito	rito	Rito	f	\N	2023-05-24	2023-05-24
fbdf9793-28e5-408f-941c-6b2201ac590b	ri-token	ri	Xiotri RI	f	\N	2023-05-24	2023-05-24
c61dea9e-f544-4b2e-9894-0c921e10dc79	riverboat	rib	RiverBoat	f	\N	2023-05-24	2023-05-24
606d1a2a-6313-4be4-be15-1244eb39f8ae	rizon	atolo	RIZON	f	\N	2023-05-24	2023-05-24
123ae78e-3fe4-4f27-a059-d7114288a922	rmrk	rmrk	RMRK	f	\N	2023-05-24	2023-05-24
d64c1a9a-c2fc-4230-9ed7-5cb83f31d6c8	roaland-core	roa	ROA CORE	f	\N	2023-05-24	2023-05-24
34d9878e-66da-4eb0-8cc9-29c1f0e9423f	roar-token	roar	SOL Tigers Roar	f	\N	2023-05-24	2023-05-24
002904fa-aa36-4907-a821-b98736518516	roasthimjim	jim	Jim	f	\N	2023-05-24	2023-05-24
d4cabcf8-4a04-49d2-be79-937876da7105	robodoge-coin	robodoge	RoboDoge Coin	f	\N	2023-05-24	2023-05-24
85ca7754-ee10-43f2-a281-97ba245cbdf7	robofi-token	vics	RoboFi	f	\N	2023-05-24	2023-05-24
c149baa9-8803-4d3b-8a48-2f3b1d2e37dd	robo-inu-finance	rbif	Robo Inu Finance	f	\N	2023-05-24	2023-05-24
e75a8182-5b15-4d91-b1cc-7ca0888e444f	robonomics-network	xrt	Robonomics Network	f	\N	2023-05-24	2023-05-24
c9c95e65-194a-46f3-8100-77c44f0f96a1	robot	robot	Robot	f	\N	2023-05-24	2023-05-24
20162369-b8f0-4620-a5eb-a2e44762617f	robo-token	robo	Robo	f	\N	2023-05-24	2023-05-24
36cb66b7-6046-4801-a667-4ccb9521c9fd	robust-token	rbt	Robust	f	\N	2023-05-24	2023-05-24
af3ee209-677b-457d-a8af-ff22ea2f2a32	rock-dao	rock	ROCK DAO	f	\N	2023-05-24	2023-05-24
ecb7e559-2975-46bc-9a21-dc6866405927	rocketcoin-2	rocket	RocketCoin	f	\N	2023-05-24	2023-05-24
6c95e346-0738-4687-8038-ea9395d7d890	rocket-pool	rpl	Rocket Pool	f	\N	2023-05-24	2023-05-24
ea2b0357-4646-4ed9-a60d-c9c7c48f5fd8	rocket-pool-eth	reth	Rocket Pool ETH	f	\N	2023-05-24	2023-05-24
9a239f00-c391-4b9b-94a5-cdcc3e0abc13	rocket-raccoon	roc	Rocket Raccoon	f	\N	2023-05-24	2023-05-24
7c30fc6f-701b-4baf-8e7c-5015e2e51ac6	rocket-raccoon-token	rocket	Rocket Raccoon Token	f	\N	2023-05-24	2023-05-24
7d84f5da-41ba-4633-8adb-17d9f65a51d4	rocketverse	rkv	RocketVerse [OLD]	f	\N	2023-05-24	2023-05-24
774428ca-83bd-4104-8b8d-b7361b4b1e0e	rocketverse-2	rkv	RocketVerse	f	\N	2023-05-24	2023-05-24
ca896f23-af34-487c-96f5-8c2f24b454d9	rocketx	rvf	RocketX exchange	f	\N	2023-05-24	2023-05-24
90756cae-1879-430e-87ec-1d65a86f998a	rocki	rocki	Rocki	f	\N	2023-05-24	2023-05-24
e594af86-80bf-4b8b-a662-09427c82f85e	rock-n-rain-coin	rnrc	Rock N Rain Coin	f	\N	2023-05-24	2023-05-24
8d4943f7-c004-4581-bd5d-ab1bb1fe13a4	rocky-inu	rocky	Rocky Inu	f	\N	2023-05-24	2023-05-24
22d15f64-369b-4529-8943-ce54b3d1a2a2	roco-finance	roco	Roco Finance	f	\N	2023-05-24	2023-05-24
45026f82-f575-4cd6-8afc-c386525d39f8	roge	roge	Rogue Doge	f	\N	2023-05-24	2023-05-24
2acf1ebe-696f-4f78-aea0-fae2ae53b860	rogin-ai	rog	ROGin AI	f	\N	2023-05-24	2023-05-24
25e5d457-994d-4964-af3f-d34045d4d0c7	rogue-coin	rogue	Rogue Coin	f	\N	2023-05-24	2023-05-24
1290b9ca-2ce9-4c12-80d1-2947b76397c5	roko-network	roko	Roko Network	f	\N	2023-05-24	2023-05-24
29c9988d-8106-4166-93e2-e3b6585c74f5	rollbit-coin	rlb	Rollbit Coin	f	\N	2023-05-24	2023-05-24
24a326c1-cc95-4cca-8e45-8b69a9f5e46d	roller	roll	Roller	f	\N	2023-05-24	2023-05-24
be7fdad6-db5a-4bd3-9b15-04f604a29d16	rollium	rlm	MarbleVerse	f	\N	2023-05-24	2023-05-24
c43e6bc3-99d3-4625-87af-f11200a0afdb	rome	rome	Rome	f	\N	2023-05-24	2023-05-24
3da228e5-d859-4179-b527-82c79f3e8a4f	rond	rond	ROND	f	\N	2023-05-24	2023-05-24
037ff4a1-9876-4d5c-b10c-fc7c5e3241ca	ronin	ron	Ronin	f	\N	2023-05-24	2023-05-24
22aace21-6df9-4fa9-b0b7-457a07a40f72	ronpaulcoin	rpc	RonPaulCoin	f	\N	2023-05-24	2023-05-24
a7c3ca96-07d3-4872-8aef-57559c918a7a	roobee	roobee	Roobee	f	\N	2023-05-24	2023-05-24
91bdeed3-7d31-44e8-b107-653aac54958c	rook	rook	Rook	f	\N	2023-05-24	2023-05-24
5ea690fb-2784-4d6c-b83a-80466e768ecc	root	root	Root	f	\N	2023-05-24	2023-05-24
a68930bb-ecaf-4acc-9371-1d865c4b44ba	rootstock	rbtc	Rootstock RSK	f	\N	2023-05-24	2023-05-24
58e0b014-2801-4038-9600-a52739813861	rope-token	rope	Rope Token	f	\N	2023-05-24	2023-05-24
1b884ff7-e3ad-430b-94dc-c3fe454d1763	ror-universe	ror	ROR Universe	f	\N	2023-05-24	2023-05-24
d4a7227d-45ad-40fa-9ace-a7c5e96b2ea7	rose	rose	Rose	f	\N	2023-05-24	2023-05-24
7731f8d4-6f37-4512-bf74-b309c71b42ad	rose-finance	rose	Rose Finance	f	\N	2023-05-24	2023-05-24
09a92d9e-04af-42bb-a7e4-d5f991eaa60f	roseon	rosx	Roseon	f	\N	2023-05-24	2023-05-24
94ea9e88-a3f2-4232-96a7-be5403339587	rotharium	rth	Rotharium	f	\N	2023-05-24	2023-05-24
b3196964-cb56-41e0-897b-08c3d6f9d417	rottoken	rotto	Rottoken	f	\N	2023-05-24	2023-05-24
ddf00497-7b0a-44b7-8d58-fbf34745226b	round-x	rndx	Round X	f	\N	2023-05-24	2023-05-24
95d70cce-309b-4a4a-8360-6c2c05570f6d	roush-fenway-racing-fan-token	roush	Roush Fenway Racing Fan Token	f	\N	2023-05-24	2023-05-24
c73db10a-3ae6-4189-8d10-d33856ef4691	route	route	Router Protocol	f	\N	2023-05-24	2023-05-24
1f9d58e6-ed03-4a59-b7a6-0e699dcd204c	rovi-protocol	rovi	ROVI Protocol	f	\N	2023-05-24	2023-05-24
7c52a461-c612-4fe5-a849-4345d92b0f83	rowan-coin	rwn	Rowan Coin	f	\N	2023-05-24	2023-05-24
8b9067a8-8fe9-4c1e-8579-b4053c185105	roxe	roc	Roxe	f	\N	2023-05-24	2023-05-24
bb7a7783-d49b-43a4-bc31-805df276fa6f	royale	roya	Royale	f	\N	2023-05-24	2023-05-24
1f55f7f8-28f4-4b48-9cea-842fb941244b	royal-gold	rgold	Royal Gold	f	\N	2023-05-24	2023-05-24
57ad0024-fb8e-4b3f-b84a-514907bbfb5f	royal-smart-future-token	rsft	ROYAL SMART FUTURE TOKEN	f	\N	2023-05-24	2023-05-24
964ddd3a-056b-4fa1-ba6b-dfe51be69e28	rps-league	rps	Rps League	f	\N	2023-05-24	2023-05-24
2ca81460-a501-49f3-8d76-0eadfa8749ee	rss3	rss3	RSS3	f	\N	2023-05-24	2023-05-24
a1db8fcd-e490-4c38-a23d-4c3aaa773de4	rssc	rssc	RSSC	f	\N	2023-05-24	2023-05-24
57e69336-e6a1-4afa-aa6c-f258b1764a33	rubic	rbc	Rubic	f	\N	2023-05-24	2023-05-24
e1e823e0-20c7-4661-8a72-dfa91284cdbe	rubidium	rbd	Rubidium	f	\N	2023-05-24	2023-05-24
4623ae2e-de58-4253-a9f0-a47ef56f06de	rubix	rbt	Rubix	f	\N	2023-05-24	2023-05-24
56cc1402-fe09-4e3f-a737-8819a3a3d4c6	ruby	ruby	RUBY	f	\N	2023-05-24	2023-05-24
66bcdf60-0768-4ff4-bf86-da0f67cb5a57	ruby-currency	rbc	Ruby Currency	f	\N	2023-05-24	2023-05-24
ab523ee1-b5ed-4660-a788-ec3ffd394db5	ruby-play-network	ruby	Ruby Play Network	f	\N	2023-05-24	2023-05-24
1061df35-95e5-42de-99e6-d92ca7abc60d	ruff	ruff	Ruff	f	\N	2023-05-24	2023-05-24
22b69034-6ee6-470b-a752-fb5057f67520	rugame	rug	RUGAME	f	\N	2023-05-24	2023-05-24
d8517fff-8245-4ba3-a37a-8fee15df218d	rugzombie	zmbe	RugZombie	f	\N	2023-05-24	2023-05-24
72137d26-b037-434c-9a1d-2734bf09978d	rule-token	rule	Rule Token	f	\N	2023-05-24	2023-05-24
ed0ba6a0-a741-4dc1-997f-14086074df5f	rumi-finance	rumi	Rumi Finance	f	\N	2023-05-24	2023-05-24
4d473c16-15b8-45e1-ad44-a4e60b4a5bab	run	run	Run	f	\N	2023-05-24	2023-05-24
f0521dd7-6c40-4653-bc0d-4b9193213bb4	runblox	rux	RunBlox	f	\N	2023-05-24	2023-05-24
4e3228bf-afa7-4482-a531-6c6fce297088	runblox-arbitrum	rux	RunBlox (Arbitrum)	f	\N	2023-05-24	2023-05-24
2199bf86-4184-4daa-bf22-7115dc7acf99	run-together	run	Run Together	f	\N	2023-05-24	2023-05-24
3e1dd609-44f8-4031-bbd4-b804882b2970	runy	runy	Runy	f	\N	2023-05-24	2023-05-24
da6ac76e-11e0-4da9-9ae7-2210859a4ba1	rupee	rup	Rupee	f	\N	2023-05-24	2023-05-24
148d3294-9a88-414c-a1ad-56c8a3906d1a	rupiah-token	idrt	Rupiah Token	f	\N	2023-05-24	2023-05-24
34334c23-002d-47d3-9123-a7b09f9c1754	rusd	rusd	rUSD	f	\N	2023-05-24	2023-05-24
5a2eb6f3-4710-44a5-97c3-e3519054d732	rushcoin	rush	RushCoin	f	\N	2023-05-24	2023-05-24
f3ebc4ae-4688-462b-9dcb-46860d30dd50	rutheneum	rth	Rutheneum	f	\N	2023-05-24	2023-05-24
c33f1d51-ee30-4b79-9618-3ba7ce61162c	ruufcoin	ruuf	RuufCoin	f	\N	2023-05-24	2023-05-24
8a8d029a-08a5-4c75-9e16-846cd1321306	rxcdnatoken	dna	RxcDna	f	\N	2023-05-24	2023-05-24
676fb842-417b-4d1f-88f8-370341a93ba3	rxcgames	rxcg	RXCGames	f	\N	2023-05-24	2023-05-24
185a693d-a706-46ff-adc7-aca793a4c3aa	ryi-unity	ryiu	RYI Unity	f	\N	2023-05-24	2023-05-24
0f601d08-5870-486d-bc2d-2bdc6113bcac	ryo	ryo	Ryo Currency	f	\N	2023-05-24	2023-05-24
49ef68f8-52f0-41c8-8f2c-81be0f4d56db	ryoma	ryoma	Ryoma	f	\N	2023-05-24	2023-05-24
e973325c-1e57-4060-94ce-ad17dae5eddc	ryoshis-vision	ryoshi	Ryoshis Vision	f	\N	2023-05-24	2023-05-24
676ffb9a-ddb3-41e0-875a-88221461fddd	ryoshi-token	ryoshi	Ryoshi	f	\N	2023-05-24	2023-05-24
0af46322-5089-40dd-8120-04a47d07e5bc	s4fe	s4f	S4FE	f	\N	2023-05-24	2023-05-24
20b7ca3a-fd79-48b9-a030-9705ebc7b6fd	saba-finance	saba	Saba Finance	f	\N	2023-05-24	2023-05-24
fbcf54df-7328-49d9-8d15-a186b8e586d4	sabai-ecovers	sabai	Sabai Ecoverse	f	\N	2023-05-24	2023-05-24
cc2733fe-ead9-424c-afee-5e9e4ff3528f	sabaka-inu	sabaka inu	Sabaka Inu	f	\N	2023-05-24	2023-05-24
7d574eb1-bf17-44c3-9f70-af4115dabfe3	saber	sbr	Saber	f	\N	2023-05-24	2023-05-24
d0d9afac-5382-452d-9654-d72ecdaa9ceb	sacred-tails	st	Sacred Tails	f	\N	2023-05-24	2023-05-24
d21dbda5-8319-4c71-8fd5-582da30c3a85	saddle-finance	sdl	Saddle Finance	f	\N	2023-05-24	2023-05-24
eafdb072-1ebb-4028-acc3-22a394ce5e55	safcoin	saf	SafCoin	f	\N	2023-05-24	2023-05-24
be8254c1-23ae-4cd2-bdb7-e991d4d3505d	safe-anwang	safe	SAFE(AnWang)	f	\N	2023-05-24	2023-05-24
25a06b2e-58cb-48d8-bd06-1a3224cc1e01	safeblast	blast	SafeBlast	f	\N	2023-05-24	2023-05-24
2e578204-7e9a-40ca-8184-c0d65ae0aea9	safecapital	scap	SafeCapital	f	\N	2023-05-24	2023-05-24
cd6c38ea-c3e4-49a3-8ac6-475766e11dc1	safeclassic	safeclassic	SafeClassic	f	\N	2023-05-24	2023-05-24
66da613d-9af8-4ca1-9c4d-c8a46cc748c0	safe-coin-2	safe	SafeCoin	f	\N	2023-05-24	2023-05-24
80e2e4e6-c4c3-44fa-8693-86b0512e18d5	safecookie	safecookie	SafeCookie	f	\N	2023-05-24	2023-05-24
f5edd6c8-53bf-4376-a8bb-595e55c99461	safe-deal	sfd	SafeDeal	f	\N	2023-05-24	2023-05-24
f5f69a51-c4c3-4693-bc3e-9358d49937d0	safeearth	safeearth	SafeEarth	f	\N	2023-05-24	2023-05-24
d976203e-31d3-441f-aa20-267d6bd7b72f	safegem	gems	Safegem	f	\N	2023-05-24	2023-05-24
f303f106-8573-441d-beed-177c53922075	safegrow	sfg	SafeGrow	f	\N	2023-05-24	2023-05-24
11ce5b7c-faee-4f31-9505-d67113a3b827	safe-haven	sha	Safe Haven	f	\N	2023-05-24	2023-05-24
6cf53c5b-9a59-4f6c-ad29-2a9ea0f96ae4	safeinsure	sins	SafeInsure	f	\N	2023-05-24	2023-05-24
a81d8b2c-b737-4870-b53c-d8e41e705024	safelaunch	sfex	SafeLaunch	f	\N	2023-05-24	2023-05-24
47ca1fc2-dc6e-48e1-ae49-f63f49b37e36	safemars	safemars	Safemars	f	\N	2023-05-24	2023-05-24
aac58c08-226f-4d4a-8059-3d65f4f6fe97	safemars-protocol	smars	Safemars Protocol	f	\N	2023-05-24	2023-05-24
524adc9f-74c0-451a-b97c-0480779236ce	safememe	sme	SafeMeme	f	\N	2023-05-24	2023-05-24
0230e332-4bb6-44d1-94f2-585b2fb5535f	safemoon	safemoon	SafeMoon [OLD]	f	\N	2023-05-24	2023-05-24
7a2c78d1-fe83-425e-a5f1-3612bc5084c4	safemoon-1996	sm96	Safemoon 1996	f	\N	2023-05-24	2023-05-24
372e1869-659e-451d-ac9d-53520652add1	safemoon-2	sfm	SafeMoon	f	\N	2023-05-24	2023-05-24
295fe2db-c67b-4693-b9b2-c7d09848321a	safemoon-inu	smi	SafeMoon Inu	f	\N	2023-05-24	2023-05-24
cf2eea21-887c-4dfb-89df-ceffbd6dcd28	safemoon-swap	sfms	SafeMoon Swap	f	\N	2023-05-24	2023-05-24
cea7aefa-5a44-4b29-a10a-3457fbd558a5	safemoon-zilla	sfz	Safemoon Zilla	f	\N	2023-05-24	2023-05-24
6f21907d-d5dc-470a-b637-13d5fd91234c	safe-nebula	snb	Safe Nebula	f	\N	2023-05-24	2023-05-24
0985c7fe-644f-41a3-bd62-7a31e9d6bfa0	safepal	sfp	SafePal	f	\N	2023-05-24	2023-05-24
d7790ba8-3378-4176-9cc1-c0a4fb8a09ff	safermoon	safermoon	SAFERMOON	f	\N	2023-05-24	2023-05-24
83674a20-2b0e-46e5-8d05-dd28504b24c9	safe-seafood-coin	ssf	Safe SeaFood Coin	f	\N	2023-05-24	2023-05-24
c6362e81-dd3f-4143-a686-b176be5dca2d	safestake	dvt	SafeStake	f	\N	2023-05-24	2023-05-24
93390e32-257d-459d-8b07-a365ec9c4d5d	safeswap-online	swap	SafeSwap Online	f	\N	2023-05-24	2023-05-24
b7813ece-aef5-4c4a-aed8-33d5c0a043c8	safeswap-token	ssgtx	Safeswap SSGTX	f	\N	2023-05-24	2023-05-24
4e642d68-a51f-4b5b-a8a0-66024d9a4305	safe-token	safe	Safe	f	\N	2023-05-24	2023-05-24
5768b92d-ecf8-4830-a89b-cb4600adf85a	safetrees	trees	Safetrees	f	\N	2023-05-24	2023-05-24
ffe99bec-8b9c-48eb-8f5f-e450343c87d3	safewolf	sw	SafeWolf	f	\N	2023-05-24	2023-05-24
24d51374-a219-4b7d-a3e6-e2602e3ba9f8	safezone	safezone	SafeZone [OLD]	f	\N	2023-05-24	2023-05-24
995f9701-ae4e-4b62-8c37-f82473d0725c	safezone-2	safezone	SafeZone	f	\N	2023-05-24	2023-05-24
e63055f9-8b88-4ee3-89e7-d8438e3de856	saffron-finance	sfi	saffron.finance	f	\N	2023-05-24	2023-05-24
cb5c5ef2-16ac-4906-ad7c-d1454c8c7cf7	safle	safle	Safle	f	\N	2023-05-24	2023-05-24
1578c497-1ac4-421d-8f0d-1401f5e2eed5	safu-protocol	safu	SAFU Protocol	f	\N	2023-05-24	2023-05-24
2ad5763a-4d99-41f5-939c-57c8960ec9f7	safuu	safuu	SAFUU	f	\N	2023-05-24	2023-05-24
e86614aa-07e0-4d5d-aece-98605ff56b19	saharadao	mng	SaharaDAO	f	\N	2023-05-24	2023-05-24
e9c5babf-7b04-4364-b64c-f1fa09de4359	sai	sai	Sai	f	\N	2023-05-24	2023-05-24
6e37ae6d-715e-468e-b290-2e6ae60633e9	saiko-the-revival	saiko	Saiko - The Revival	f	\N	2023-05-24	2023-05-24
b13fd76c-e943-4d22-b463-dea88954ac83	sail	sail	SAIL	f	\N	2023-05-24	2023-05-24
2cb031f3-8e8e-4971-991e-db099fb1084e	saitama-inu	saitama	Saitama	f	\N	2023-05-24	2023-05-24
b1bec099-0fcd-47b2-bb7d-2533420a4247	saitamax	saitax	SaitamaX	f	\N	2023-05-24	2023-05-24
5f3cfd45-c277-4a82-833c-3ffc711d7734	saitanobi	saitanobi	Saitanobi	f	\N	2023-05-24	2023-05-24
adbc08c3-bb21-47ea-8bc5-a857d39d067e	saitarealty	srlty	SaitaRealty	f	\N	2023-05-24	2023-05-24
5cd95dce-a9c1-401b-a361-7578e361f65f	saito	saito	Saito	f	\N	2023-05-24	2023-05-24
536fa16f-bbe1-42cd-8399-cee99031b39c	saitoki-inu	saitoki	Saitoki Inu	f	\N	2023-05-24	2023-05-24
329d1d00-632e-4a7b-aacc-6f2655d8370d	saiyan-pepe	spepe	Saiyan PEPE	f	\N	2023-05-24	2023-05-24
07add64a-7981-4bb7-8006-25b96cddc597	sak3	sak3	SAKE	f	\N	2023-05-24	2023-05-24
29ea5aaa-4660-4387-aa50-06c907693314	sakai-vault	sakai	Sakai Vault	f	\N	2023-05-24	2023-05-24
2ec0a871-566c-40ff-92e9-6b77b326217c	sake-token	sake	SakeSwap	f	\N	2023-05-24	2023-05-24
a07b6345-dcf8-4017-8bf9-e84d102e8344	sakura	sku	Sakura	f	\N	2023-05-24	2023-05-24
fa3a7cdd-932f-485f-8159-3dae6fbea7cb	sakura-planet	sak	Sakura Planet	f	\N	2023-05-24	2023-05-24
004f7dde-26ce-4826-8d3b-52502bb36aa8	salad	sald	Salad	f	\N	2023-05-24	2023-05-24
09f54708-d769-4c0f-b1a2-1d98695feaba	salmon	slm	Salmon	f	\N	2023-05-24	2023-05-24
423a1094-143f-4675-bc71-248adc13b203	salmonation	sui	Salmonation	f	\N	2023-05-24	2023-05-24
750c77a2-d8c8-4000-bdad-09e4f046c494	salt	salt	SALT	f	\N	2023-05-24	2023-05-24
071a56ec-843c-4138-9029-69f4286e8305	saltmarble	sml	Saltmarble	f	\N	2023-05-24	2023-05-24
34371a37-5538-44df-bbba-13e6d8065e15	salty-coin	salty	Salty Coin	f	\N	2023-05-24	2023-05-24
6df4f250-eedc-40a6-8f92-bc1f32b9cbdc	salus	sls	SaluS	f	\N	2023-05-24	2023-05-24
6be906ee-f95c-47cf-b5b1-a7e8df783212	samo-inu	sinu	Samo INU	f	\N	2023-05-24	2023-05-24
0a0e0422-e687-4ce3-adbd-0281fc8bb26f	samoyedcoin	samo	Samoyedcoin	f	\N	2023-05-24	2023-05-24
6cf09b6d-7115-4cac-ae37-323dad6583d9	samsunspor-fan-token	sam	Samsunspor Fan Token	f	\N	2023-05-24	2023-05-24
1af4741e-1b01-4dda-918e-1cd6787b693c	samusky-token	samu	Samusky	f	\N	2023-05-24	2023-05-24
7426cf59-f483-4299-b7c0-fe808e8abda5	sanctum	sanctum	Sanctum	f	\N	2023-05-24	2023-05-24
60016f3f-39f5-4f52-b71f-7c2a85a4104f	sanctum-coin	sancta	Sanctum Coin	f	\N	2023-05-24	2023-05-24
d5ec714a-4795-4871-b6ea-9063eeb22ffa	sandclock	quartz	Sandclock	f	\N	2023-05-24	2023-05-24
9e76251f-600d-4b9e-b308-58af69f9c708	san-diego-coin	sand	San Diego Coin	f	\N	2023-05-24	2023-05-24
b7ba6553-08eb-4b67-bcbf-7724a363c0f7	sandwich-network	$sandwich	Sandwich Network	f	\N	2023-05-24	2023-05-24
de16a6b6-f60b-46f9-99db-66e2f6f82d3b	sangkara	misa	Sangkara	f	\N	2023-05-24	2023-05-24
0a1d6808-e6cc-4ffb-b43e-8ee682d761dc	sanin-inu	sani	Sanin Inu	f	\N	2023-05-24	2023-05-24
11d21f17-e2b1-4bf4-8541-9e5923d09917	sanji-inu	sanji	Sanji Inu	f	\N	2023-05-24	2023-05-24
596fcbc4-7273-435f-99c9-371a9a87d17f	sanshu-inu	sanshu	Sanshu Inu	f	\N	2023-05-24	2023-05-24
aa1a4f20-cefd-4aae-bca7-ddddf1fd16c9	santa-coin-2	santa	Santa Coin	f	\N	2023-05-24	2023-05-24
4a116e27-7405-4775-9eae-ae2099c04e7a	santa-inu	saninu	Santa Inu	f	\N	2023-05-24	2023-05-24
b131a610-431e-4636-89d0-d3a5e0ac364e	santiment-network-token	san	Santiment Network	f	\N	2023-05-24	2023-05-24
32893b78-56e0-4def-84fd-f0874cdf6a93	santos-fc-fan-token	santos	Santos FC Fan Token	f	\N	2023-05-24	2023-05-24
76b6fbf2-0f6c-4b1d-bfe0-d1a9151df028	sao-paulo-fc-fan-token	spfc	Sao Paulo FC Fan Token	f	\N	2023-05-24	2023-05-24
71684249-ce31-4ab5-9a36-a8fe7a34d1b1	sappchat	app	SappChat	f	\N	2023-05-24	2023-05-24
d00f87ee-d1bb-4fb4-a412-262860e1b5be	sapphire	sapp	Sapphire	f	\N	2023-05-24	2023-05-24
994709a1-a321-4150-9b83-67820e4b29ce	saracens-fan-token	sarries	Saracens Fan Token	f	\N	2023-05-24	2023-05-24
b742385e-1aec-45f8-9c96-37e9972807de	sarcophagus	sarco	Sarcophagus	f	\N	2023-05-24	2023-05-24
dde9b8ac-5130-45e2-a0a9-d3aa145950f2	sashimi	sashimi	Sashimi	f	\N	2023-05-24	2023-05-24
7b2b913d-c127-41de-a617-b11cafc71eb2	satin-exchange	satin	Satin Exchange	f	\N	2023-05-24	2023-05-24
f0f3d158-23c2-4162-8571-b76ba21e0315	sator	sao	Sator	f	\N	2023-05-24	2023-05-24
dca3b968-500e-4a84-bfeb-0861b9fd27e9	satoshi-island	stc	Satoshi Island	f	\N	2023-05-24	2023-05-24
24f2b1d7-53cc-4080-8c25-ae762f5c7943	satoshis-vision	sats	Satoshis Vision	f	\N	2023-05-24	2023-05-24
03ec3950-93aa-412d-9737-b3282d54f081	satoshiswap-2	swap	SatoshiSwap	f	\N	2023-05-24	2023-05-24
8cdf3c5a-9d7d-4b11-a56d-9c981141cbe4	satozhi	satoz	Satozhi	f	\N	2023-05-24	2023-05-24
cc0b290c-fd80-44e7-87b2-befd56796569	sats-hunters	shnt	Sats Hunters	f	\N	2023-05-24	2023-05-24
7280b299-c30b-454d-9503-e36d19a19a10	satt	satt	SaTT	f	\N	2023-05-24	2023-05-24
57c9e5c1-a6f6-4ab1-97af-6d3f3e552229	saturna	sat	Saturna	f	\N	2023-05-24	2023-05-24
5c76432a-2b33-427a-a5d4-0f91e930f05c	saucerswap	sauce	SaucerSwap	f	\N	2023-05-24	2023-05-24
03c744da-82e8-4ca3-9c6a-7cd3ad16a7f5	saudi-pepe	saudipepe	SAUDI PEPE	f	\N	2023-05-24	2023-05-24
8ae812e5-cdd9-4aea-9975-197d1a82d959	saudi-shiba-inu	saudishib	SAUDI SHIBA INU	f	\N	2023-05-24	2023-05-24
6f91e7c6-5fd5-4e9d-b2cb-8ecddb5d092a	savage	savg	SAVAGE	f	\N	2023-05-24	2023-05-24
a3704391-cb8d-44af-91eb-deffea898267	savanna	svn	Savanna	f	\N	2023-05-24	2023-05-24
f3c9741c-f762-4337-a927-cb693ae7817e	savant-ai	savantai	Savant AI	f	\N	2023-05-24	2023-05-24
7a223fef-68ea-428e-bc1b-1474fa1d1e7c	save-baby-doge	babydoge	Save Baby Doge	f	\N	2023-05-24	2023-05-24
9366f13e-e6ae-40a5-aca1-e2ebb6ff3b69	savedroid	svd	Savedroid	f	\N	2023-05-24	2023-05-24
60e719fa-b23d-4bd2-8a13-8cd5c298208b	saveplanetearth	spe	SavePlanetEarth	f	\N	2023-05-24	2023-05-24
975c50d5-f672-4007-8ee8-639a3e0899f0	sax-token	sax	IdleStoneage SAX	f	\N	2023-05-24	2023-05-24
96e4217b-d505-468d-b2cb-9769df9de0b1	saylor-moon	smoon	SaylorMoon	f	\N	2023-05-24	2023-05-24
83bc33a3-1557-4666-a15b-c9c9fde22dd2	sayve-protocol	sayve	SAYVE Protocol	f	\N	2023-05-24	2023-05-24
72812938-13ce-4436-8f08-d331dfde573f	sbet	sbet	SBET	f	\N	2023-05-24	2023-05-24
6b298234-63c0-444a-ac1d-686d38299a22	sb-group	sbg	SB Group	f	\N	2023-05-24	2023-05-24
476e69f4-4a72-486e-9bca-4a2f5a914053	sbtc	sbtc	sBTC	f	\N	2023-05-24	2023-05-24
421dc46e-25a6-46e3-b378-e3c2569d7cf4	sbu-honey	bhny	SBU Honey	f	\N	2023-05-24	2023-05-24
2de8cb1e-e6d1-40fd-a622-27b57bda44dd	scalara-nft-index	nfti	Scalara NFT Index	f	\N	2023-05-24	2023-05-24
b73d7f4c-4fc1-40b5-82b9-86072688adba	scaleswap-token	sca	Scaleswap	f	\N	2023-05-24	2023-05-24
1eca2489-3113-4af9-b214-afcf5f5374b4	scallop	sclp	Scallop	f	\N	2023-05-24	2023-05-24
84deda23-6c70-40a2-9e79-6236334760d1	scanto-blotr	blotr	sCANTO BLOTR	f	\N	2023-05-24	2023-05-24
13aa9541-0e91-450e-a9aa-2ab3abc427e4	scapesmania	$mania	ScapesMania	f	\N	2023-05-24	2023-05-24
e41449e6-361a-4b53-817b-92cee1abd70f	scarab-finance	scarab	Scarab Finance	f	\N	2023-05-24	2023-05-24
7ca5183a-e3b6-4e95-998a-0e5b733edd5f	scarcity	scx	Scarcity	f	\N	2023-05-24	2023-05-24
ab0091d6-b5f0-42dd-a20b-00e7084751db	scarecrow	scare	ScareCrow	f	\N	2023-05-24	2023-05-24
ed9b7861-ab98-4698-9163-6520e5002f4a	scary-bunny	sb	Scary Bunny	f	\N	2023-05-24	2023-05-24
79c0bf8e-d19b-4e14-b0aa-9262bf20190e	scat	cat	Scat	f	\N	2023-05-24	2023-05-24
7819f81f-a967-4d67-8dfc-8dce7f5a0179	s-c-corinthians-fan-token	sccp	S.C. Corinthians Fan Token	f	\N	2023-05-24	2023-05-24
3fd54de3-75b9-4e29-8692-28fcf7928b04	scholarship-coin	scho	Scholarship Coin	f	\N	2023-05-24	2023-05-24
aa7f8645-49e8-4a11-a0bc-01d5249bba2f	schrodinger	kitty dinger	Schrodinger	f	\N	2023-05-24	2023-05-24
0e718aa5-e80a-4f6b-bc69-7707dfb0ad6b	schwiftai	swai	SchwiftAI	f	\N	2023-05-24	2023-05-24
7d02cf50-ebeb-4429-8e75-db7aa18cf71f	sci-coin	sci	SCI Coin [OLD]	f	\N	2023-05-24	2023-05-24
23c11d1b-e4f5-4a38-9d6e-ea32b8e51de6	sci-coin-2	sci+	SCI Coin	f	\N	2023-05-24	2023-05-24
fa9fecbc-3667-4f4a-ad28-c81007aa3056	scientia	scie	Scientia	f	\N	2023-05-24	2023-05-24
e533ba44-d708-4564-8def-6006e4df9e92	scientix	scix	Scientix	f	\N	2023-05-24	2023-05-24
7682ba00-e367-486a-ac2d-68216014e922	sc-internacional-fan-token	saci	SC Internacional Fan Token	f	\N	2023-05-24	2023-05-24
f11cee6b-0441-4714-b712-6b385c968a80	sconex	sconex	SCOneX	f	\N	2023-05-24	2023-05-24
61ef939f-d7ba-4d83-902c-259d8c4704f7	scooby	scooby	SCOOBY	f	\N	2023-05-24	2023-05-24
92d74e94-4bc1-42b9-aeb3-d5b45f422313	scooby-doo	sodo	Scooby Doo	f	\N	2023-05-24	2023-05-24
1c495b91-d720-4acf-ac91-80a9949932f6	scopecoin	xscp	ScopeCoin	f	\N	2023-05-24	2023-05-24
f52470f0-0112-421f-a074-e7b4cf676ce3	scopuly-token	scop	Scopuly	f	\N	2023-05-24	2023-05-24
edf0f11d-ac67-47a6-b21e-8e293b7ea49b	scorai	scorai	Staking Compound ORAI	f	\N	2023-05-24	2023-05-24
0be32a16-b058-40c4-8a96-4d1ae7c12cd5	score-token	sco	Score	f	\N	2023-05-24	2023-05-24
3f4d0104-f983-4218-8d85-82aab260c1f7	scotty-beam	scotty	Scotty Beam	f	\N	2023-05-24	2023-05-24
c76333de-bd17-401b-8ebb-0b8bd7e78e69	scouthub	hub	Scouthub	f	\N	2023-05-24	2023-05-24
a230c121-96fa-46be-ade0-d503c9298064	scrap	scrap	Scrap	f	\N	2023-05-24	2023-05-24
68a9f1c0-c9cf-45c7-8b7b-0b1db77e930a	scratch	scratch	Scratch	f	\N	2023-05-24	2023-05-24
1ddad0b5-f70a-45c8-940b-8fb380d00e52	scream	scream	Scream	f	\N	2023-05-24	2023-05-24
217bced7-22d5-44e0-a41c-fc36ae1a3989	scriv	scriv	SCRIV	f	\N	2023-05-24	2023-05-24
842fb518-f97e-44c9-8251-ac802bde2d23	scrooge	scrooge	Scrooge	f	\N	2023-05-24	2023-05-24
db6bf681-93a3-4a59-858d-31e3c83bdd28	scry-info	ddd	Scry.info	f	\N	2023-05-24	2023-05-24
fadbf095-0621-45fd-95ef-54406730b7e5	scry-protocol	scry	Scry Protocol	f	\N	2023-05-24	2023-05-24
f0872122-ff46-4b66-80c4-5e81af8ef78e	seachain	seachain	SeaChain	f	\N	2023-05-24	2023-05-24
99a4cba7-70df-4007-b9d2-f00be2b332a2	seamlessswap-token	seamless	SeamlessSwap	f	\N	2023-05-24	2023-05-24
4b8ca1ab-3d64-4a94-b118-3665ef99128d	seancecircle	seance	SeanceCircle	f	\N	2023-05-24	2023-05-24
f8869bec-8e95-4b51-9b09-f893277ab7d5	seapad	spt	SeaPad	f	\N	2023-05-24	2023-05-24
7312c53b-5175-423f-8bcf-570933fca7d0	seatlabnft	seat	SeatlabNFT	f	\N	2023-05-24	2023-05-24
94c23e8a-6653-48a0-ac05-8f1280bd3158	seba	seba	Seba	f	\N	2023-05-24	2023-05-24
d1287d36-cfe3-4602-901d-991d9e3794e1	sechain	snn	SeChain	f	\N	2023-05-24	2023-05-24
a8537eda-101c-4bdf-b55e-cd955db927b5	secret	scrt	Secret	f	\N	2023-05-24	2023-05-24
2358d138-16e1-48ec-9482-0add3351ce5c	secret-erc20	wscrt	Secret (ERC20)	f	\N	2023-05-24	2023-05-24
cb6f2d0a-878d-48fc-a43e-36e3fe0d96f4	secret-finance	sefi	Secret Finance	f	\N	2023-05-24	2023-05-24
242e8eef-9690-4605-aa57-0388f031cc10	secret-skellies-society	$crypt	Secret Skellies Society	f	\N	2023-05-24	2023-05-24
72dbd309-fc0a-4b38-ad48-0044354022b5	secretum	ser	Secretum	f	\N	2023-05-24	2023-05-24
842bb093-4fca-4b66-b63a-6a1151c0de38	sector	sect	Sector	f	\N	2023-05-24	2023-05-24
b63a9d9e-a647-45ea-b680-8f6fa286feb4	secure-cash	scsx	Secure Cash	f	\N	2023-05-24	2023-05-24
a381693b-b5ae-4a1d-9b37-cf0c52a1884c	secured-moonrat-token	smrat	Secured MoonRat	f	\N	2023-05-24	2023-05-24
d5c182d2-e3b5-42e3-a997-7c0f2f493bff	sedo-pow-token	sedo	SEDO POW	f	\N	2023-05-24	2023-05-24
811f618c-3380-4880-8145-be2e64161456	seeded-network	seeded	Seeded Network	f	\N	2023-05-24	2023-05-24
fe6c321b-5842-4b73-89ff-bca4a44b5b29	seedify-fund	sfund	Seedify.fund	f	\N	2023-05-24	2023-05-24
ebbbb5bb-63e1-433c-bdf7-fa6edc5fdbd8	seedlaunch	slt	SeedLaunch	f	\N	2023-05-24	2023-05-24
4c97f7e7-1795-454e-85aa-c75ebc93ee6c	seedon	seon	Seedon	f	\N	2023-05-24	2023-05-24
fbee7ed5-93c5-43f5-a5bc-78a1c932f779	seeds	seeds	Seeds	f	\N	2023-05-24	2023-05-24
9b482b86-a77f-42b9-a0c3-a0c2e33c933c	seedswap	snft	SeedSwap	f	\N	2023-05-24	2023-05-24
3a01d5c9-733b-4d4f-b7e7-e2b52fe93f21	seedswap-token	seed	SeedSwap SEED	f	\N	2023-05-24	2023-05-24
f35ace06-e3b0-47dd-a3a5-2cd16f2a573f	seedx	seedx	SEEDx	f	\N	2023-05-24	2023-05-24
947cdb3e-c69b-410b-8cd2-3853cd406a1d	seek-tiger	sti	Seek Tiger	f	\N	2023-05-24	2023-05-24
21186730-4aa7-44dd-b4a2-8bfbc3458e60	seele	seele	Seele	f	\N	2023-05-24	2023-05-24
51f7abca-33f5-4670-a405-2ec75462c5e1	seigniorage-shares	share	Seigniorage Shares	f	\N	2023-05-24	2023-05-24
2de12310-16ff-4354-8a98-d1572c9e622d	seiren-games-network	serg	Seiren Games Network	f	\N	2023-05-24	2023-05-24
e256f5df-4bf2-488e-b1f4-1d5fdffd07bf	sekuritance	skrt	Sekuritance	f	\N	2023-05-24	2023-05-24
9bbc1df9-0bfe-4410-8d55-4b2549ec0b9f	selfbar	sbar	Selfbar	f	\N	2023-05-24	2023-05-24
de0bb65e-34e5-4426-ac3f-99fc8a1af64c	selfkey	key	SelfKey	f	\N	2023-05-24	2023-05-24
1d1f906b-67db-462a-aaa5-1ca4e493053b	self-token	self	Self Token	f	\N	2023-05-24	2023-05-24
e63e510b-d792-4a20-847f-fea4e29dc1d5	sell-token	sellc	Sell Token	f	\N	2023-05-24	2023-05-24
179314b1-11ec-48b9-b6c9-eb9924941d58	senate	senate	SENATE	f	\N	2023-05-24	2023-05-24
ad4a3fc9-744a-4c04-b529-56526e612d5b	sendcrypto	sendc	SendCrypto	f	\N	2023-05-24	2023-05-24
28eb3095-1c73-4b30-86ff-abbeb2bbddea	sense4fit	sfit	Sense4FIT	f	\N	2023-05-24	2023-05-24
01052d90-64ac-42ae-9930-928eadccd4f9	sensi	sensi	Sensi	f	\N	2023-05-24	2023-05-24
970da090-6537-4d67-af47-0f5db7eaf2c8	sensitrust	sets	Sensitrust	f	\N	2023-05-24	2023-05-24
c1d3a92d-634f-4e7e-a266-06ef5e7de9c0	senso	senso	SENSO	f	\N	2023-05-24	2023-05-24
ae1319df-a694-4ac5-bf3b-d9e693d08417	sentiment-token	sent	Sentiment	f	\N	2023-05-24	2023-05-24
22bd4011-760a-403e-b4b3-fb733043ff9f	sentinel	dvpn	Sentinel	f	\N	2023-05-24	2023-05-24
6afd7aa4-ad32-4d2c-a2ef-7ab80d3a10db	sentinel-chain	senc	Sentinel Chain	f	\N	2023-05-24	2023-05-24
1f9902a8-8d9b-44e7-8b00-ee29152386eb	sentinel-group	dvpn	Sentinel [OLD]	f	\N	2023-05-24	2023-05-24
faefbbd8-9c5a-4d3c-8258-c52fc6fe67b5	sentinel-protocol	upp	Sentinel Protocol	f	\N	2023-05-24	2023-05-24
4cf9622e-c3e0-43ec-81e3-abc1d3b90970	sentivate	sntvt	Sentivate	f	\N	2023-05-24	2023-05-24
8744a464-87bd-44b4-8098-5a54ced68bec	sentre	sntr	Sentre	f	\N	2023-05-24	2023-05-24
15947ef9-88f1-4889-8f5a-d11ab135d68b	seor-network	seor	SEOR Network	f	\N	2023-05-24	2023-05-24
11b3a2ce-9544-4f66-b255-d308f16f0362	serenity	seren	Serenity	f	\N	2023-05-24	2023-05-24
2e6e8447-c8bc-4238-beb8-19306c9cb0ed	serey-coin	sry	Serey Coin	f	\N	2023-05-24	2023-05-24
12587352-affe-456c-86c9-f17ba9f27796	serum	srm	Serum	f	\N	2023-05-24	2023-05-24
7c8730e0-1704-4a61-afbd-3e50d48cd46b	serum-ser	ser	Serum SER	f	\N	2023-05-24	2023-05-24
828cc058-728b-4009-a0ef-6754deebbe55	seth	seth	sETH	f	\N	2023-05-24	2023-05-24
42770c8f-b4bf-4ca9-9820-5a3599ad1a01	seth2	seth2	sETH2	f	\N	2023-05-24	2023-05-24
c57de2b9-b0de-453d-b6ac-d4b33fdd12e8	setter-protocol	set	Setter Protocol	f	\N	2023-05-24	2023-05-24
acf7dbae-cc01-44ef-926f-2ddbd8ada0ed	seur	seur	sEUR	f	\N	2023-05-24	2023-05-24
523b2933-f87c-407f-bb11-351c154b0d71	seven-q	svq	Seven-Q	f	\N	2023-05-24	2023-05-24
7c42ead6-a14f-4ed3-bcac-79761bd841b3	sevilla-fan-token	sevilla	Sevilla Fan Token	f	\N	2023-05-24	2023-05-24
37d9740a-33e5-4215-b5a4-45fe14c06414	sf-capital	sfcp	SF Capital	f	\N	2023-05-24	2023-05-24
77f1ae78-7c38-4656-8b6f-30e8e0b673b9	s-finance	sfg	S.Finance	f	\N	2023-05-24	2023-05-24
393edb49-7373-434d-832d-0f2ad95c046c	sgd-tracker	blusgd	SGD Tracker	f	\N	2023-05-24	2023-05-24
fe40620e-2e29-44d2-8782-0073225139c5	shack	shack	Shack	f	\N	2023-05-24	2023-05-24
6800b6e5-93bf-481a-b175-e7df3195280b	shade-cash	shade	Shade Cash	f	\N	2023-05-24	2023-05-24
6156bd3e-5ade-4415-b7e0-e1200c05cd60	shade-protocol	shd	Shade Protocol	f	\N	2023-05-24	2023-05-24
ae6650e8-7283-4050-8396-da45c1c81264	shadowcats	shadowcats	Shadowcats	f	\N	2023-05-24	2023-05-24
9f0ea5d0-c45c-4061-8ca9-475537062a9d	shadowfi-2	sdf	ShadowFi	f	\N	2023-05-24	2023-05-24
a14e69a2-beea-4055-9c6e-5412ce5ee393	shadows	dows	Shadows	f	\N	2023-05-24	2023-05-24
f04f0a73-e157-4ee0-b3ef-2cb883cf50ff	shadowswap-token	shdw	ShadowSwap Token	f	\N	2023-05-24	2023-05-24
61a70163-4d95-4de0-887f-1ee2a1e2566c	shakita-inu	shak	Shakita Inu	f	\N	2023-05-24	2023-05-24
fcf8c42e-2c04-4a3b-a995-6745d46723ea	shaman	shaman	Shaman	f	\N	2023-05-24	2023-05-24
36ee9dfb-fae6-4c26-8ac7-c55458234f76	shambala	bala	Shambala	f	\N	2023-05-24	2023-05-24
28073d7a-c5b2-4aa5-a1bf-b14be0bae2a2	shanghai-inu	shang	Shanghai Inu	f	\N	2023-05-24	2023-05-24
56e7aae3-b8ea-4414-9de7-55e753c8923c	shanum	shan	Shanum	f	\N	2023-05-24	2023-05-24
4ed5e4d9-8d54-4f09-be63-3561033355b8	shapeshift-fox-token	fox	ShapeShift FOX	f	\N	2023-05-24	2023-05-24
523d15b5-7d58-4b70-a7e8-c7a1d5facf3f	sharbi	$sharbi	Sharbi	f	\N	2023-05-24	2023-05-24
f33ea55f-dc37-4080-b4c6-2157a9c25585	shard-2	shard	Shard	f	\N	2023-05-24	2023-05-24
55b10bb4-587f-4e71-9369-2836bd5d3a4f	shardus	ult	Shardus	f	\N	2023-05-24	2023-05-24
7a5e43ee-7267-44ec-8675-c17252be5c33	sharedstake-governance-token	sgtv2	SharedStake Governance v2	f	\N	2023-05-24	2023-05-24
87075c55-d355-403c-9ead-1e2f4638a5cc	sharering	shr	Share	f	\N	2023-05-24	2023-05-24
5a09d5e5-7b2d-49d1-af23-ea32530fb33a	shark	shark	Shark	f	\N	2023-05-24	2023-05-24
e913bf25-da16-47a7-879a-f03aefea0b98	sharky-swap	sharky	Sharky Swap	f	\N	2023-05-24	2023-05-24
1620ca4a-0ef6-4ac1-8003-0af87421d2c8	shaun-inu	shaun	Shaun Inu	f	\N	2023-05-24	2023-05-24
cd577d87-3bab-4654-8d20-0b94c275f0a9	sheesh	sheesh	Sheesh	f	\N	2023-05-24	2023-05-24
334bc9c0-1458-4ef5-a67f-b948023981b5	sheesha-finance	sheesha	Sheesha Finance (BEP20)	f	\N	2023-05-24	2023-05-24
4bc51ff4-f3cc-4b43-bcb0-ad070567c255	sheesha-finance-erc20	sheesha	Sheesha Finance (ERC20)	f	\N	2023-05-24	2023-05-24
293ebbe7-0a98-49ff-9ee3-8670d4f24146	sheesha-finance-polygon	msheesha	Sheesha Finance Polygon	f	\N	2023-05-24	2023-05-24
6235647f-48d9-41e2-86d7-4f3bb545d696	sheikh-inu	shinu	Sheikh Inu	f	\N	2023-05-24	2023-05-24
e306cf90-e309-4f6e-a191-f1bbe6ed8041	shelling	shl	Shelling	f	\N	2023-05-24	2023-05-24
18bdd1fe-35a1-4d3f-9b75-77fc361a38c1	shelterz	terz	SHELTERZ	f	\N	2023-05-24	2023-05-24
f730b6d7-19ad-405b-8e35-7a135ea2a5c3	shen	shen	Shen	f	\N	2023-05-24	2023-05-24
463c78db-b33c-4182-9db8-78095bada7f8	shepherd-inu-2	sinu	Shepherd Inu	f	\N	2023-05-24	2023-05-24
bfcccc90-7e3b-4b07-8cff-b430cb1d8a80	shera-2	shr	Shera	f	\N	2023-05-24	2023-05-24
651186e0-27e9-49c2-8c51-0c3ca74c8fdc	sherlock-defi	slock	Sherlock Defi	f	\N	2023-05-24	2023-05-24
4fa8ca44-4e81-45b5-a0f8-687789514401	shiba-bsc	shibsc	SHIBA BSC	f	\N	2023-05-24	2023-05-24
fdde814b-fdef-450a-b66d-b63552c30c06	shiba-cartel	pesos	Shiba Cartel	f	\N	2023-05-24	2023-05-24
4d0cd06c-42b2-4290-96fb-918a0299910a	shibacash	shibacash	ShibaCash	f	\N	2023-05-24	2023-05-24
022c82f8-f01f-4f7a-8765-661dc314ea2c	shiba-ceo	shibceo	Shiba CEO	f	\N	2023-05-24	2023-05-24
5d8d2634-0739-4ce3-b303-62fc9c7468cc	shiba-classic	shibc	Shiba Classic	f	\N	2023-05-24	2023-05-24
495d3cbe-94ce-433d-8c6d-a21433cb4e75	shibacorgi	shico	ShibaCorgi	f	\N	2023-05-24	2023-05-24
7e9b6137-5e3b-4306-a58c-c759cba0fde9	shibadoge	shibdoge	ShibaDoge	f	\N	2023-05-24	2023-05-24
35a67b32-37ba-4eb7-8eee-dde69c885314	shibaelonverse	shibev	ShibaElonVerse	f	\N	2023-05-24	2023-05-24
539ef75f-914f-4a74-818f-a4186879025e	shiba-fantom	shiba	Shiba Fantom	f	\N	2023-05-24	2023-05-24
d1fd9945-d29c-4701-9975-33de5b41472e	shiba-floki	floki	Shiba Floki Inu	f	\N	2023-05-24	2023-05-24
139a383e-3ee3-4922-9916-e6adb8f5be28	shibagun	shibgun	Shibagun	f	\N	2023-05-24	2023-05-24
19b2d400-8ca5-4d70-9145-3ae2eaa3cd96	shibai-labs	slab	ShibAI Labs	f	\N	2023-05-24	2023-05-24
5756a1ad-c087-4bce-a044-6a992deb0b02	shiba-inu	shib	Shiba Inu	f	\N	2023-05-24	2023-05-24
35ee89c0-0f2a-4267-9f68-067a8d766632	shiba-inu-classic	shibic	SHIBIC	f	\N	2023-05-24	2023-05-24
70e60531-cd69-41e6-89b0-bc035de56861	shiba-inu-empire	shibemp	Shiba Inu Empire	f	\N	2023-05-24	2023-05-24
aa3bcf36-5cc6-4e4b-ac80-0b98468ebada	shiba-inu-mother	shibm	Shiba Inu Mother	f	\N	2023-05-24	2023-05-24
1ad007f5-5872-4a52-9df2-3b1762436a98	shiba-inu-wormhole	shib	Shiba Inu (Wormhole)	f	\N	2023-05-24	2023-05-24
8e83a63a-7a28-4afa-a6f7-cdd8e4a51aba	shibaken-finance	shibaken	Shibaken Finance	f	\N	2023-05-24	2023-05-24
b382e118-8263-4be2-8e34-8f1abc6ff4a4	shibalana	shiba	Shibalana	f	\N	2023-05-24	2023-05-24
09fcebae-4733-43ab-ac62-cccf22f844b5	shibalite	shiblite	ShibaLite	f	\N	2023-05-24	2023-05-24
9e70df42-f0b9-4c08-9cbf-dba18f03a3f7	shibamon	shibamon	Shibamon	f	\N	2023-05-24	2023-05-24
f5ea57d6-b561-48aa-8531-458627ce3715	shibana	bana	Shibana	f	\N	2023-05-24	2023-05-24
656cf767-0cc3-4006-8d0b-f49a77422e54	shibanft	shibanft	ShibaNFT	f	\N	2023-05-24	2023-05-24
ec638f7f-a839-4309-9499-9c0dec3c7eb6	shiba-nodes	shino	Shiba Nodes	f	\N	2023-05-24	2023-05-24
053b0f06-e35a-482b-8921-74e1137a01f0	shibapoconk	conk	ShibaPoconk	f	\N	2023-05-24	2023-05-24
1e4a5777-2509-4e2f-a747-1da21721daf0	shiba-predator	qom	Shiba Predator	f	\N	2023-05-24	2023-05-24
c2c6ba7f-8e21-4d1f-ad20-ce0ca00b1b27	shibarium-dao	shibdao	Shibarium DAO	f	\N	2023-05-24	2023-05-24
c5d8fac6-79c2-492d-aa19-9c8f0ba79029	shibarium-name-service	sns	Shibarium Name Service	f	\N	2023-05-24	2023-05-24
efab1f89-9259-4805-8ee0-8f1d3e73d297	shibarium-pad	$shibp	Shibarium Pad	f	\N	2023-05-24	2023-05-24
cd93088d-8786-4bb6-b2b8-c665fc6d801f	shibarium-perpetuals	serp	Shibarium Perpetuals	f	\N	2023-05-24	2023-05-24
f55a3d46-013c-45c6-9c48-b6c7d66e814d	shib-army	shibarmy	Shib Army	f	\N	2023-05-24	2023-05-24
63f54a6c-ad6b-4369-9551-027014e9e52e	shiba-universe	shibu	Shiba Universe	f	\N	2023-05-24	2023-05-24
297166ed-8832-4286-b9e2-fb05c23a5099	shibavax	shibx	Shibavax	f	\N	2023-05-24	2023-05-24
f020d46b-0f23-4e4c-94f8-f8b8227dfa90	shibaverse	verse	Shibaverse	f	\N	2023-05-24	2023-05-24
f506ad56-98bc-4c0c-8996-89d112957c91	shibaw-inu	shibaw	ShibaW Inu	f	\N	2023-05-24	2023-05-24
6ecd0cb0-4df4-4489-ac8c-72de25debb10	shibazilla	shibazilla	ShibaZilla	f	\N	2023-05-24	2023-05-24
4ada083d-1b06-4daf-aee7-bda8c76e7b9b	shibcat	shibcat	SHIBCAT	f	\N	2023-05-24	2023-05-24
f4060ebc-0586-4b86-a47e-6538fad15e92	shibceo	shibceo	ShibCEO	f	\N	2023-05-24	2023-05-24
1e23aa99-a0dc-44b6-b4a9-21a4d9448454	shibcraft	shft	Shibcraft	f	\N	2023-05-24	2023-05-24
3ab3f7b5-0b50-49ea-8e14-1f006b134671	shibelon	shibelon	ShibElon	f	\N	2023-05-24	2023-05-24
c46d2718-ee03-402f-8623-cab2471afcf9	shibfalcon	shflcn	ShibFalcon	f	\N	2023-05-24	2023-05-24
a2eaab61-d367-4203-992b-d7ef7955b793	shib-generating	shg	Shib Generating	f	\N	2023-05-24	2023-05-24
2b9229af-1486-4885-bdbb-d1f28e1ad828	shibgf	shibgf	SHIBGF	f	\N	2023-05-24	2023-05-24
c2295fc2-c671-4b7a-b7c8-52f44001e823	shibird	shird	Shibird	f	\N	2023-05-24	2023-05-24
e2ce5374-5ffe-4e38-a675-95388adcb5e5	shibmerican	shibmerican	Shibmerican	f	\N	2023-05-24	2023-05-24
4b201f80-7217-4340-b65f-9a420940ef3e	shibnaut	shibn	Shibnaut	f	\N	2023-05-24	2023-05-24
6d1516ba-1f23-47c8-90e6-79fc498848b9	shibnobi	shinja	Shibnobi	f	\N	2023-05-24	2023-05-24
2093390f-a1fc-4f9c-8dcf-ea98666ad806	shibonk	shibo	ShibonkBSC	f	\N	2023-05-24	2023-05-24
14b43c43-da94-483c-9e2f-f4a60a0ecc19	shibonk-311f81df-a4ea-4f31-9e61-df0af8211bd7	sbonk	SHIBONK	f	\N	2023-05-24	2023-05-24
0ec976e2-9b51-47a4-9691-1929ea93caa1	shib-ordinals	shib	SHIB (Ordinals)	f	\N	2023-05-24	2023-05-24
28f085b1-1310-42a2-b81d-9d3252b9274a	shib-original-vision	sov	Shib Original Vision	f	\N	2023-05-24	2023-05-24
a5415879-8eb8-466d-a32f-9b9de7ae493a	shibosu-a4432072-cdc3-4f03-b781-46937463ea98	shibo	Shibosu	f	\N	2023-05-24	2023-05-24
dbee6ef2-7845-454e-9d11-32495e3151ff	shibot	shibot	Shibot	f	\N	2023-05-24	2023-05-24
6839f019-173b-4d91-a409-d971e31576d0	shibtama	shibtama	Shibtama	f	\N	2023-05-24	2023-05-24
d53a9783-2027-4380-a0ca-6a3835b6a3c2	shibuya-white-rabbit	wrab	Shibuya White Rabbit	f	\N	2023-05-24	2023-05-24
affa0c64-323c-4490-b353-02c1c7d77759	shibwallet	swt	ShibWallet	f	\N	2023-05-24	2023-05-24
35893047-307a-4f81-b140-4263f66d0895	shiden	sdn	Shiden Network	f	\N	2023-05-24	2023-05-24
b0927b7e-82d6-4111-8df2-10c2797f7566	shido	shido	Shido	f	\N	2023-05-24	2023-05-24
2c2ee177-59b7-4cc9-a387-91d58c9f2804	shield	xsh	SHIELD	f	\N	2023-05-24	2023-05-24
18d2f13d-d289-4c20-a2bb-6b0bfed28fc2	shield-bsc-token	shdb	Shield BSC Token	f	\N	2023-05-24	2023-05-24
06dbd367-496e-4409-9000-578db67270ef	shield-finance	coli	Coliquidity	f	\N	2023-05-24	2023-05-24
da3858be-5693-4359-bd53-37a106309674	shield-network	shieldnet	Shield Network	f	\N	2023-05-24	2023-05-24
2396a31f-6b2b-4841-abba-f7cb88f7a698	shield-protocol-2	shield	Shield Protocol	f	\N	2023-05-24	2023-05-24
1caef3a4-33c9-4792-b44b-1fffaab7f9f7	shih-tzu	shih	Shih Tzu	f	\N	2023-05-24	2023-05-24
e8dc0b85-d27f-479a-a5b1-b5c1b82babd3	shihtzu-exchange	stzu	Shihtzu Exchange	f	\N	2023-05-24	2023-05-24
f3cb7abb-0d8a-45cc-89cc-76765ef3d2c2	shikoku	shik	Shikoku	f	\N	2023-05-24	2023-05-24
ebfe398b-21e8-458e-be61-766109b2f582	shikoku-inu	shiko	Shikoku Inu	f	\N	2023-05-24	2023-05-24
0daadfc8-1aec-4e06-a0e9-0c8fc3ceee5c	shila-inu	shil	Shila Inu	f	\N	2023-05-24	2023-05-24
d22868f9-757c-4794-89cb-dc149426814a	shill-token	shill	SHILL Token	f	\N	2023-05-24	2023-05-24
5485340a-4fc2-4e7f-a0e1-c6b9d5078b2f	shilly-bar	shbar	Shilly Bar	f	\N	2023-05-24	2023-05-24
776c9383-e31e-450e-b877-3574ad45ecb3	shimmer	smr	Shimmer	f	\N	2023-05-24	2023-05-24
0faa8ed9-47d8-44d1-bce3-f2b6b893a09b	shina-inu	shi	Shina Inu	f	\N	2023-05-24	2023-05-24
58a71302-402d-49b4-8ea6-b9f34ed5b582	shinjarium	sjm	Shinjarium	f	\N	2023-05-24	2023-05-24
051115b3-830a-4a03-89a6-9df8dec2d61b	shinji-inu	shinji	Shinji Inu	f	\N	2023-05-24	2023-05-24
142f47e1-2c83-41f5-8e6b-e3c500dff60c	shinjiru-inu	shinji	Shinjiru Inu	f	\N	2023-05-24	2023-05-24
68591cd9-3e03-411f-8cae-8509c2beb578	shinsekai	shin	Shinsekai	f	\N	2023-05-24	2023-05-24
b99fba3c-063f-4a80-876f-12a17852ebd9	shintama	shintama	Shintama	f	\N	2023-05-24	2023-05-24
22b9731f-0960-41e2-a6bf-4b957ffbb834	shira-cat	catshira	Shira Cat	f	\N	2023-05-24	2023-05-24
9fcf7065-6371-40d5-a9f9-d909b14d0ac9	shirtum	shi	Shirtum	f	\N	2023-05-24	2023-05-24
19c62b9a-ad60-4715-8b06-bd99c944a119	shiryo-inu	shiryo-inu	Shiryo	f	\N	2023-05-24	2023-05-24
0c22c2af-f7ce-40f0-a3af-64113fd702af	shita-kiri-suzume	suzume	Shita-kiri Suzume	f	\N	2023-05-24	2023-05-24
a5cef4c3-61ce-463d-b443-89c55bea9cf4	shitzu	shitzu	Shitzu	f	\N	2023-05-24	2023-05-24
f75fba43-4f61-4cc4-8e89-81fcd587ac9d	shkooby-inu	shkooby	SHKOOBY INU	f	\N	2023-05-24	2023-05-24
d5d32659-fe6c-4348-b753-3291b72ca657	shockwaves	neuros	Shockwaves	f	\N	2023-05-24	2023-05-24
f39bd277-62fd-4917-90c9-d51259320188	shoebill-coin	shbl	Shoebill Coin	f	\N	2023-05-24	2023-05-24
8fbe10ad-55e4-402f-81d2-b9db810c75c6	shoefy	shoe	ShoeFy	f	\N	2023-05-24	2023-05-24
5067d494-7c3f-416b-9d4a-ab39b06a6994	shontoken	shon	Shon	f	\N	2023-05-24	2023-05-24
c8c6926f-1b3f-4757-ad0f-39dc95c28f62	shopnext-loyalty-token	next	ShopNext Loyalty Token	f	\N	2023-05-24	2023-05-24
6ee50a06-15f0-4fe7-a36a-dd9461e962c5	shopnext-reward-token	ste	ShopNEXT Reward Token	f	\N	2023-05-24	2023-05-24
16d24907-a6aa-4c3d-a1ae-20c0a55a9605	shopping-io-token	shop	Shopping.io	f	\N	2023-05-24	2023-05-24
88382ceb-7c28-4adf-8a88-ea31b71d4b94	shori	yshori	Shori	f	\N	2023-05-24	2023-05-24
192c6e20-b0ba-4685-820b-27c48a9f171a	shping	shping	Shping	f	\N	2023-05-24	2023-05-24
9e3bf3df-a11a-4570-9067-85426be5f888	shrapnel	shrap	Shrapnel	f	\N	2023-05-24	2023-05-24
d9347e21-5995-4cd1-afd6-c16e7c214e9b	shree	shr	SHREE	f	\N	2023-05-24	2023-05-24
89e2387a-212a-4774-85c9-e3331a6ba804	shroom-finance	shroom	Niftyx Protocol	f	\N	2023-05-24	2023-05-24
adf46add-d06d-4775-8c59-a884abad1348	shrooms-bb92ba08-f11f-4580-b98e-67ad3bca842e	shrooms	Shrooms	f	\N	2023-05-24	2023-05-24
42ecec7b-07bb-474c-a724-2f17226d05b0	shuts-wave	swave	shuts Wave	f	\N	2023-05-24	2023-05-24
1e3f9a99-4794-4404-aa75-36a4df37bd25	shyft-network-2	shft	Shyft Network	f	\N	2023-05-24	2023-05-24
5aead4da-cc37-41d6-baf0-96dbccb2882b	siacoin	sc	Siacoin	f	\N	2023-05-24	2023-05-24
38362bc8-2eef-4a85-be2f-57d3ac875673	siambitcoin	sbtc	SiamBitcoin	f	\N	2023-05-24	2023-05-24
1d737f9c-31d7-4d25-8ae1-33ac956436f2	siaprime-coin	scp	ScPrime	f	\N	2023-05-24	2023-05-24
501864d9-2138-4cff-9c97-4848e0870773	sibcoin	sib	SIBCoin	f	\N	2023-05-24	2023-05-24
eb22c7c2-7a5e-4ff2-b455-5c79362bbf2b	sicash	sic	SICash	f	\N	2023-05-24	2023-05-24
d795e47b-5b48-4ccc-be16-c7b5e75cfdaa	sidekick-token	sk	SideKick	f	\N	2023-05-24	2023-05-24
8b7a8ed9-a09f-42ee-bc7f-760d2e275e03	sideshift-token	xai	SideShift	f	\N	2023-05-24	2023-05-24
fb4b90b9-350c-4d6a-a06e-b0cb68b80f1a	sidus	sidus	Sidus	f	\N	2023-05-24	2023-05-24
842a29cf-9e15-47bc-bb6e-a3e0171b0bb4	sienna-erc20	wsienna	Sienna [ERC-20]	f	\N	2023-05-24	2023-05-24
57d9be9a-5891-4bc4-9109-76564f299cf8	sifchain	erowan	Sifchain	f	\N	2023-05-24	2023-05-24
cfb7ad50-6d9c-4cb5-b023-a1f030c7b1ab	sifu-vision	sifu	SIFU	f	\N	2023-05-24	2023-05-24
5333f0de-9b4b-4558-9b38-355668a00ee7	sigil-finance	sigil	Sigil Finance	f	\N	2023-05-24	2023-05-24
e4f5dc88-da2e-49b5-bf42-54656d5ef30b	sign	sign	Sign Token	f	\N	2023-05-24	2023-05-24
7ca83253-4414-4886-bf63-5cba00d02498	signata	sata	Signata	f	\N	2023-05-24	2023-05-24
4c062ac1-eb5d-4f2b-acd0-9789f0d3523e	signed	sign	Signed	f	\N	2023-05-24	2023-05-24
778d6f01-1e2f-4d65-94d8-0eade6c080d9	signum	signa	Signum	f	\N	2023-05-24	2023-05-24
d258fb59-ade8-4d66-8c76-9ccab4cd6d28	silent-notary	ubsn	Silent Notary	f	\N	2023-05-24	2023-05-24
64b8ea3b-3058-4e90-ade4-39a96fea6ddf	silk	silk	Spider Tanks	f	\N	2023-05-24	2023-05-24
3a77e913-780e-4ed3-b80c-22896923b036	silk-bcec1136-561c-4706-a42c-8b67d0d7f7d2	silk	Silk	f	\N	2023-05-24	2023-05-24
a80a19ac-ec0e-48a6-bcd3-d2af6b1c0a73	silo-finance	silo	Silo Finance	f	\N	2023-05-24	2023-05-24
56580d42-fc74-4947-bcbb-e104f3de9e26	silva-token	silva	Silva	f	\N	2023-05-24	2023-05-24
f2e12c80-6b07-4372-9b8b-7b338cbdb314	silvercashs	svc	Silvercashs	f	\N	2023-05-24	2023-05-24
92d1fa8b-10da-4af4-bc55-79234912feaa	silverstonks	sstx	Silver Stonks	f	\N	2023-05-24	2023-05-24
9815e800-2ccd-48ae-9226-ffca66146c51	silver-tokenized-stock-defichain	dslv	iShares Silver Trust Defichain	f	\N	2023-05-24	2023-05-24
07b2d15a-16c1-4ad3-a7bf-334ac891e71f	simbcoin-swap	smbswap	SimbCoin Swap	f	\N	2023-05-24	2023-05-24
b7d3f5ab-b255-4b59-974a-b5f538adc4ce	simple-asymmetry-eth	safeth	Simple Asymmetry ETH	f	\N	2023-05-24	2023-05-24
1a770c1f-77fd-40d5-9dfa-3d1b5081d0d3	simple-masternode-coin	smnc	Simple Masternode Coin	f	\N	2023-05-24	2023-05-24
7ebd4223-3e17-436a-8c7e-8b896b6771b1	simple-token	ost	OST	f	\N	2023-05-24	2023-05-24
0e0d563b-589d-41d5-a9e7-a4bf84ad2b9b	simpli-finance	simpli	Simpli Finance	f	\N	2023-05-24	2023-05-24
5601f38a-27c4-4a02-b580-b8ae2c71aa9e	simracer-coin	src	Simracer Coin	f	\N	2023-05-24	2023-05-24
896fb15b-798d-492d-9ef6-03454cf4d8d8	sin-city	sin	Sinverse	f	\N	2023-05-24	2023-05-24
0d3a1746-e893-445b-ac98-1ca7f955c69b	sincronix	snx	SincroniX	f	\N	2023-05-24	2023-05-24
651c0eeb-eddc-42cb-909b-d93e6c787e6b	singh	singh	Singh	f	\N	2023-05-24	2023-05-24
ea3dba5d-a898-42c4-b06c-b6c5e09fb917	single-finance	single	Single Finance	f	\N	2023-05-24	2023-05-24
9cfe43fb-8f46-4783-ba5d-fabad7d0ded9	sing-token	sing	Sing	f	\N	2023-05-24	2023-05-24
2728fbaf-497e-421a-b0f4-c17d4973a13e	sing-token-avalanche	sing	Sing (Avalanche)	f	\N	2023-05-24	2023-05-24
57298dee-a305-4103-bb8f-26009775d354	sing-token-bsc	sing	Sing (BSC)	f	\N	2023-05-24	2023-05-24
bdda3b6f-7203-4efd-a2ff-8ed78cddbda3	sing-token-ftm	sing	Sing FTM	f	\N	2023-05-24	2023-05-24
6d3938fe-5faf-404e-8917-08eb7bb46d0c	singulardtv	sngls	SingularDTV	f	\N	2023-05-24	2023-05-24
c9736879-553c-4543-80cc-3e0a7573a1dd	singularity	sgly	Singularity	f	\N	2023-05-24	2023-05-24
e3289a48-1c4d-492e-b24c-cb7ffb6fa356	singularitydao	sdao	SingularityDAO	f	\N	2023-05-24	2023-05-24
7791a666-1f7e-4fad-a87f-9f5c98656080	singularitynet	agix	SingularityNET	f	\N	2023-05-24	2023-05-24
c0b47938-3b2c-4af7-a3cf-2e49187f124c	sino	sino	Cantosino.com	f	\N	2023-05-24	2023-05-24
878f7f10-9978-4e33-9655-337949ffa4ef	sint-truidense-voetbalvereniging-fan-token	stv	Sint-Truidense Voetbalvereniging Fan Token	f	\N	2023-05-24	2023-05-24
bef3aec1-3399-41d2-941b-4f2c4a3b84fe	sipher	sipher	Sipher	f	\N	2023-05-24	2023-05-24
f8683bec-48db-40d2-a162-4088e2c0e523	siren	si	Siren	f	\N	2023-05-24	2023-05-24
ee67eb47-94c3-40b1-90af-a013b775e81e	sirin-labs-token	srn	Sirin Labs	f	\N	2023-05-24	2023-05-24
89f1981c-5c38-488d-8a8e-14d79805c6b8	sirius-finance	srs	Sirius Finance	f	\N	2023-05-24	2023-05-24
bb0e3c12-58aa-46b1-ba39-88fbefc339f8	six-network	six	SIX Network	f	\N	2023-05-24	2023-05-24
361ad48d-4422-4cab-8163-589c68e51e9f	snook	snk	Snook	f	\N	2023-05-24	2023-05-24
af42c02d-534b-478c-aa12-c7941fe7386d	sjwcoin	sjw	SJWCoin	f	\N	2023-05-24	2023-05-24
9d85c7e1-55fe-4b6e-acd0-3afb2e30973f	skale	skl	SKALE	f	\N	2023-05-24	2023-05-24
8abfbe90-cb1b-4e9f-95ec-4499a403e935	skeb	skeb	Skeb	f	\N	2023-05-24	2023-05-24
96726ae0-291c-4190-8ce1-e68a07c551a6	skey-network	skey	Skey Network	f	\N	2023-05-24	2023-05-24
072e4670-fa24-410b-b817-b69bb99e8a2a	skillchain	ski	Skillchain	f	\N	2023-05-24	2023-05-24
81171718-f52a-40f9-8b5d-12602b8fa46c	skincoin	skin	SkinCoin	f	\N	2023-05-24	2023-05-24
aac286f3-2d80-4786-a491-125d73909b04	sklay	sklay	sKLAY	f	\N	2023-05-24	2023-05-24
a6dd2abd-d640-4adf-869e-753a46e30a76	skrimples	skrimp	Skrimples	f	\N	2023-05-24	2023-05-24
2fee8678-fe54-4e4f-9bf7-6622a8fa576e	skrumble-network	skm	Skrumble Network	f	\N	2023-05-24	2023-05-24
dffa05c3-d7b4-4232-bfba-7bf62fc239a7	skull	skull	Skull	f	\N	2023-05-24	2023-05-24
fcd8832d-7859-4d4f-ba03-1e53f6137420	skullswap-exchange	skull	SkullSwap Exchange	f	\N	2023-05-24	2023-05-24
78184fd0-e0b1-4ec4-b6d9-d2121b3b53f5	skycoin	sky	Skycoin	f	\N	2023-05-24	2023-05-24
42c82a47-b836-48b2-9767-767ac64f661b	skyplay	skp	SKYPlay	f	\N	2023-05-24	2023-05-24
660f0b62-3f1c-4c92-adfb-500826749fda	skyrim-finance	skyrim	Skyrim Finance	f	\N	2023-05-24	2023-05-24
5f6a259f-8b27-42b5-9a34-aaa79f670218	skyup	su	skyup	f	\N	2023-05-24	2023-05-24
8a9d183b-f855-477c-bec2-8c941f2fc6e3	sky-v2	sky	SkyToken	f	\N	2023-05-24	2023-05-24
23c8950c-1ff2-4f9c-a13a-25cdbdf6ef47	sleepearn-finance	sen	SleepEarn Finance	f	\N	2023-05-24	2023-05-24
973a3fd7-7c26-4c33-87de-dd8f770351a9	sleepfuture	sleepee	SleepFuture	f	\N	2023-05-24	2023-05-24
d98c3c13-1c10-4462-9d14-9b31a261b253	slimcoin	slm	Slimcoin	f	\N	2023-05-24	2023-05-24
4c6233fd-5f31-4ea3-bb7f-2e822c220397	slime-royale-gold	srg	Slime Royale Gold	f	\N	2023-05-24	2023-05-24
e5da9f8a-f527-4765-a737-d54691637d1c	slnv2	slnv2	SLNV2	f	\N	2023-05-24	2023-05-24
ed71e35d-cdc6-4640-a833-1d145b194f54	small-fish-cookie	sfc	Small Fish Cookie	f	\N	2023-05-24	2023-05-24
2afe3560-e12b-4c9b-bacd-e67e44c09f9e	smardex	sdex	SmarDex	f	\N	2023-05-24	2023-05-24
bd432c61-a63e-4bf2-a2c1-d9c2a001cf9b	smart-block-chain-city	sbcc	Smart Block Chain City	f	\N	2023-05-24	2023-05-24
780694bc-80bf-4247-897a-998010977ca5	smartcash	smart	SmartCash	f	\N	2023-05-24	2023-05-24
6f559203-383f-41a5-98b3-1cf24633c795	smartcoin-2	smrt	SmartCoin	f	\N	2023-05-24	2023-05-24
4dbaac93-4035-426a-a116-ea5c6afed738	smart-coin-smrtr	smrtr	SmarterCoin	f	\N	2023-05-24	2023-05-24
178e9cb8-4a78-4e97-bcb0-449486226da6	smartcredit-token	smartcredit	SmartCredit	f	\N	2023-05-24	2023-05-24
be9f5ad9-db0d-40e4-b3bc-a14d36a20eb4	smart-donation-coin	sdc	Smart Donation Coin	f	\N	2023-05-24	2023-05-24
937e8ef1-f519-41f8-92fb-6b7f3d8957fe	smartfi	smtf	SmartFi	f	\N	2023-05-24	2023-05-24
3f378116-3dcd-4d14-a045-2a17b2e7d5a5	smart-game-finance	smart	Smart Game Finance	f	\N	2023-05-24	2023-05-24
ea4a7586-ea11-403b-b793-251cf3eabaad	smartlands	dnt	Definder Network	f	\N	2023-05-24	2023-05-24
6835d949-260b-4031-8355-3ac1ce56d5e0	smartlink	smak	Smartlink	f	\N	2023-05-24	2023-05-24
2ab551a1-a7a6-4c86-8516-92fb642a77cb	smartlox	smartlox	SmartLOX	f	\N	2023-05-24	2023-05-24
2c02c466-b17b-4f53-a11d-eea533019fce	smart-marketing-token	smt	Smart Marketing	f	\N	2023-05-24	2023-05-24
69c4d445-c7c3-430d-bc33-5fb56e192832	smart-medical-coin	smc	Smart Medical Coin	f	\N	2023-05-24	2023-05-24
a0459889-b1bd-4c2c-bbb0-3bb4bc1a52b0	smartmesh	smt	SmartMesh	f	\N	2023-05-24	2023-05-24
6e0689e8-3664-492f-b92e-672099581132	smart-mfg	mfg	Smart MFG	f	\N	2023-05-24	2023-05-24
f2c85e99-7884-445f-9512-e754f028f0e3	smartnft	smartnft	SmartNFT	f	\N	2023-05-24	2023-05-24
824fc127-6da1-4913-ade8-82be55ec8708	smartofgiving	aog	smARTOFGIVING	f	\N	2023-05-24	2023-05-24
6cbdb0ca-1c48-46d2-91bd-9f506cd9b1b5	smartpad-2	pad	SmartPad	f	\N	2023-05-24	2023-05-24
e93ac1ca-8237-4aa9-abe8-49999e45452a	smart-reward-token	srt	Smart Reward Token	f	\N	2023-05-24	2023-05-24
416c0470-f839-4638-91b5-24462132948d	smartshare	ssp	Smartshare	f	\N	2023-05-24	2023-05-24
ef7bc333-0be4-45f0-9c6a-f36f2c452db7	smart-valor	valor	Smart Valor	f	\N	2023-05-24	2023-05-24
dd4df299-d43e-43de-ba41-f26d43ab4de8	smart-wallet-token	swt	Smart Wallet	f	\N	2023-05-24	2023-05-24
165bf4e9-120a-4fbd-bb00-6633cb9ceeca	smart-world-union	swu	Smart World Union	f	\N	2023-05-24	2023-05-24
69009d04-9c0c-4594-b2f5-e3af895aa9e8	smarty-pay	spy	Smarty Pay	f	\N	2023-05-24	2023-05-24
29bb191e-0af4-41fb-bf0c-e92648e7535a	smash-cash	smash	Smash Cash	f	\N	2023-05-24	2023-05-24
35051b90-882e-4962-b128-5d18a91dc821	smaugs-nft	smg	Smaugs NFT	f	\N	2023-05-24	2023-05-24
24968ec0-979c-4367-97bc-4be8e8433909	smd-coin	smd	SMD Coin	f	\N	2023-05-24	2023-05-24
ce2a31d8-02ef-4642-b830-bd573619e869	smelt	smelt	Smelt	f	\N	2023-05-24	2023-05-24
708f61d0-8110-43a1-844b-dda6e83f288c	smg	smg	SMG	f	\N	2023-05-24	2023-05-24
90d94f23-6543-4c78-b0ac-29a05c03c668	smile-coin	smile	Smile Coin	f	\N	2023-05-24	2023-05-24
4c9f8ee2-eb1b-431f-bc87-ca05208f0721	smileycoin	smly	Smileycoin	f	\N	2023-05-24	2023-05-24
ce8960ba-dee3-43ad-82b2-a9ba82d345e3	smol-su	su	Smol Su	f	\N	2023-05-24	2023-05-24
8a88bcc5-bf6a-4e9f-8b50-3686654e30fe	smolting-inu	smol	Smolting Inu	f	\N	2023-05-24	2023-05-24
99371ad5-7fe6-49bd-ab15-5fb2f49b6a6d	smooth-love-potion	slp	Smooth Love Potion	f	\N	2023-05-24	2023-05-24
82a43a07-27ff-4325-81a0-108628f5ce66	smoothy	smty	Smoothy	f	\N	2023-05-24	2023-05-24
edc38942-5d6d-4491-8836-a917c3c34a66	smpcoin	smpc	SMPCOIN	f	\N	2023-05-24	2023-05-24
04d7afc6-61e1-4a08-bc03-b06c287d8692	smscodes	smsct	SMSCodes	f	\N	2023-05-24	2023-05-24
15260773-a766-4ac9-b46e-918a0382fd0e	smudge-lord	smudge	Smudge Lord	f	\N	2023-05-24	2023-05-24
af3fd888-c2ab-42e0-9e4a-563bd9ab54f5	smurfsinu	smurf	SmurfsINU	f	\N	2023-05-24	2023-05-24
6ed04c76-6bf0-4953-9093-d8bfa147acf0	snailbrook	snail	SnailBrook	f	\N	2023-05-24	2023-05-24
66e4cfee-776f-4adf-827e-1641f9d7bb4d	snailmoon	snm	SnailMoon	f	\N	2023-05-24	2023-05-24
612d9030-a9db-40e1-979e-b01b8f5a9f19	snail-trail	slime	Snail Trail	f	\N	2023-05-24	2023-05-24
6ba6fe2e-38a8-4387-9e25-6493d22bcec7	snake-city	snct	Snake City	f	\N	2023-05-24	2023-05-24
ec9914ed-2cc9-457c-8a00-8e98a0b68031	snapex	snap	SnapEx	f	\N	2023-05-24	2023-05-24
a1297ecc-5ad5-4f9a-a39c-41aee722a3eb	snark-launch	$snrk	Snark Launch	f	\N	2023-05-24	2023-05-24
553cd424-8c70-42e2-a6b5-f76197c4fb0c	snek	snek	Snek	f	\N	2023-05-24	2023-05-24
9e352545-1776-4bb9-ab4d-d0e5fa19e278	snetwork	snet	Snetwork	f	\N	2023-05-24	2023-05-24
8b1c7609-eade-4b3f-97e8-6088a146b0d9	snfts-seedify-nft-space	snfts	Seedify NFT Space	f	\N	2023-05-24	2023-05-24
b7c63bda-a110-4e25-bf22-459bb3bf40fc	snowball-token	snob	Snowball	f	\N	2023-05-24	2023-05-24
ff7216bc-147f-442c-98c0-d92ab67b841d	snowbank	sb	Snowbank	f	\N	2023-05-24	2023-05-24
94dc82ea-6b8d-45ca-bbf8-676ceff59441	snowblossom	snow	SnowBlossom	f	\N	2023-05-24	2023-05-24
7c1bd745-2c9d-451a-8451-11579e03d6e7	snowcrash-token	nora	SnowCrash	f	\N	2023-05-24	2023-05-24
c1d01584-311a-40b8-a2e9-ae2de7694ac2	snowswap	snow	Snowswap	f	\N	2023-05-24	2023-05-24
bb478177-68ae-428e-9382-361969de08ff	snowtomb	stomb	Snowtomb	f	\N	2023-05-24	2023-05-24
2a1ea692-d639-462a-bfc1-82af00609227	snowtomb-lot	slot	Snowtomb LOT	f	\N	2023-05-24	2023-05-24
6286b7aa-bd98-432e-a8c3-ee787ee6725d	snx-yvault	yvsnx	SNX yVault	f	\N	2023-05-24	2023-05-24
a00de90e-6bea-49f0-9d17-be85a3be6b3b	soba-token	soba	SOBA	f	\N	2023-05-24	2023-05-24
f93687b3-09fa-4db3-87ea-67d4cbaa456c	soccer-crypto	sot	Soccer Crypto	f	\N	2023-05-24	2023-05-24
d7be952c-5c5c-4580-9cf5-eaa894e3c88a	socean-staked-sol	scnsol	Socean Staked Sol	f	\N	2023-05-24	2023-05-24
a2c34ddf-39dc-4a7e-b203-ca553a56d845	social-ai	socialai	Social AI	f	\N	2023-05-24	2023-05-24
e8958d28-d8de-43e6-921e-7097af9459ed	socialblox	sblx	SocialBlox	f	\N	2023-05-24	2023-05-24
1500df71-4043-42e9-a633-43ced8106ad4	social-capitalism-2	socap	Social Capitalism	f	\N	2023-05-24	2023-05-24
cd0010e5-6e86-45a9-9fb2-6b82ec5ca397	social-good-project	sg	SocialGood	f	\N	2023-05-24	2023-05-24
d8947fcd-66b9-4293-bf87-7ed8cc6e8e4a	social-send	send	Social Send	f	\N	2023-05-24	2023-05-24
8c3e16d9-4c7d-4e39-8481-267a6ccb5326	socialswap-token	sst	Social Swap	f	\N	2023-05-24	2023-05-24
8f15333d-b17f-4a8b-a649-a9ac1a99cd01	socol	simp	SO-COL	f	\N	2023-05-24	2023-05-24
c1ff937d-3748-4655-a652-34f1177fe320	soda-coin	soc	SODA Coin	f	\N	2023-05-24	2023-05-24
1edd4ffb-5dbf-4086-b7c6-0aa66edde401	sodatsu	sodatsu	Sodatsu	f	\N	2023-05-24	2023-05-24
7e99cce2-819c-43a1-936b-22abe4676e32	soft-dao	soft	Soft DAO	f	\N	2023-05-24	2023-05-24
5a839d30-f231-48dd-ae50-16c2fd5f196d	soga-project	soga	SOGA Project	f	\N	2023-05-24	2023-05-24
bd213757-8817-44c3-9a61-5e78c707f672	sohei	hei	Sohei	f	\N	2023-05-24	2023-05-24
a125fdae-2c98-4e46-a7f0-039f14b69710	sokuswap	soku	SokuSwap	f	\N	2023-05-24	2023-05-24
d216c2bd-4b29-4b5b-add8-c0d8b9f6b7ba	solabrador	solab	Solabrador	f	\N	2023-05-24	2023-05-24
4d4ac832-dd91-4840-a8e9-f7b3563f9da6	solalgo	slgo	Solalgo	f	\N	2023-05-24	2023-05-24
e462838a-7efe-4d4f-9e8c-65262ead7786	solana	sol	Solana	f	\N	2023-05-24	2023-05-24
8708996e-3a82-45cd-a9a1-a718f286eec4	solana-ecosystem-index	soli	Solana Ecosystem Index	f	\N	2023-05-24	2023-05-24
3fd42496-8344-4d3e-9120-e33abae5b03f	solana-inu	inu	Solana Inu	f	\N	2023-05-24	2023-05-24
b45cba37-db9a-44f4-aacf-1270e56f6b8a	solana-nut	solnut	Solana Nut	f	\N	2023-05-24	2023-05-24
6a6f70e9-d3b7-4125-b5e2-cb6a11ec4972	solanaprime	prime	SolanaPrime	f	\N	2023-05-24	2023-05-24
d25f3e6a-7b27-486c-9b36-a515baa54af4	solanasail-governance-token	gsail	SolanaSail Governance	f	\N	2023-05-24	2023-05-24
02673481-2140-4378-a3bf-6cc6a320c25f	solanax	sold	Solanax	f	\N	2023-05-24	2023-05-24
904c615a-f121-46b8-ba3d-4251b3db984f	solanium	slim	Solanium	f	\N	2023-05-24	2023-05-24
a1c7315a-5f54-4632-ace3-1339ac81cd01	solape-token	solape	SOLAPE	f	\N	2023-05-24	2023-05-24
01c03bbc-97da-434b-a556-d5b20b527abf	solar	solar	Solar	f	\N	2023-05-24	2023-05-24
d2e9eaf6-3850-4cd1-abd9-75ea95c3cb8e	solarbeam	solar	Solarbeam	f	\N	2023-05-24	2023-05-24
4f248325-8376-4c78-803d-8f96f2683416	solar-bear	solbear	Solar Bear	f	\N	2023-05-24	2023-05-24
98097db9-56a0-4dbc-9609-605557661bba	solar-energy	seg	Solar Energy	f	\N	2023-05-24	2023-05-24
62ff2119-d683-4d4a-9e4c-19c63490e443	solareum-d260e488-50a0-4048-ace4-1b82f9822903	srm	Solareum	f	\N	2023-05-24	2023-05-24
e8304318-5542-4726-9308-667f6297533c	solareum-wallet	xsb	Solareum Wallet	f	\N	2023-05-24	2023-05-24
1240f9ee-232d-4eb1-8238-10cbd5a02be6	solarflare	flare	Solarflare	f	\N	2023-05-24	2023-05-24
9a5a0722-f320-4bdd-b2e5-2253c7ffa0e1	solar-full-cycle	sfc	Solar Full Cycle	f	\N	2023-05-24	2023-05-24
44d9428b-ccdc-4e93-a160-21b7e02ec4d0	solaris-finance	slr	Solaris Finance	f	\N	2023-05-24	2023-05-24
6c8c46fc-8d3f-43d7-a455-0c03d14c4087	solarix	solarix	SOLARIX	f	\N	2023-05-24	2023-05-24
bab61820-2d5d-4e34-8190-dada911d43c7	solarminex	smx	SolarMineX	f	\N	2023-05-24	2023-05-24
52a34262-b0b7-4b42-8a83-d62f0fa814de	sola-token	sola	SOLA	f	\N	2023-05-24	2023-05-24
f3a0e34d-a065-4e0f-b19b-809e06e9d752	sola-x	sax	SOLA-X	f	\N	2023-05-24	2023-05-24
1a37b983-0a2e-414f-b45d-af45328082ae	sol-baby-doge	sbabydoge	SOL Baby Doge	f	\N	2023-05-24	2023-05-24
dd904bba-7fab-4c5a-82d1-c8c9b4914020	solbank-token	sbnk	Solbank	f	\N	2023-05-24	2023-05-24
3148d133-095e-4a11-b948-98f4e39d181a	solberg	slb	Solberg	f	\N	2023-05-24	2023-05-24
de26f73e-94ef-4c42-8bf0-a7e55d157603	solcash	solcash	SOLCash	f	\N	2023-05-24	2023-05-24
45b17371-5846-48d3-bfa8-f473b3fab9b6	solcasino-token	scs	Solcasino Token	f	\N	2023-05-24	2023-05-24
8d5a3692-ebb9-4a2e-ba51-1be111164c58	solcats	meow	Solcats	f	\N	2023-05-24	2023-05-24
cfb71993-fd70-4263-b2ff-5ff9e85e58f7	solchicks-shards	shards	SolChicks Shards	f	\N	2023-05-24	2023-05-24
7df0cc04-6d43-4892-9e60-34f6568d33e6	solchicks-token	chicks	SolChicks	f	\N	2023-05-24	2023-05-24
226e8001-62eb-47b6-953a-6191c9c55f6a	solcial	slcl	Solcial	f	\N	2023-05-24	2023-05-24
768594cb-35c9-4a34-9df7-ccb0836c0107	solclout	sct	SolClout	f	\N	2023-05-24	2023-05-24
66bd7108-5278-416c-9108-67c19a7e8930	solcondoms	condoms	SolCondoms	f	\N	2023-05-24	2023-05-24
c4931b28-b97c-44dd-9181-37caec2e8987	solcubator	solc	Solcubator	f	\N	2023-05-24	2023-05-24
7dfedb3e-4540-4583-9401-834a73e1b71e	soldate-token	date	SolDate	f	\N	2023-05-24	2023-05-24
311084cc-8aaf-49a2-bd21-a8f5e9701467	solderland	sldr	Solderland	f	\N	2023-05-24	2023-05-24
70e5604d-837f-4e8d-9631-5a4786bbd99a	soldex	solx	Soldex	f	\N	2023-05-24	2023-05-24
695b97ea-ddc6-4551-84c4-758860a9677b	soldoge	sdoge	SolDoge	f	\N	2023-05-24	2023-05-24
54ba9e4a-8810-4d37-87d0-eae0ec5cfe89	solend	slnd	Solend	f	\N	2023-05-24	2023-05-24
ce44c390-95af-4adb-9065-07318d14a361	solex-finance	slx	Solex Finance	f	\N	2023-05-24	2023-05-24
9df8d247-63f3-4803-b9e9-08e72b84bd5e	solfarm	tulip	Tulip Protocol	f	\N	2023-05-24	2023-05-24
c84df303-d3b1-499f-a13a-7ae0d1376e8c	solfina	solfi	Solfina	f	\N	2023-05-24	2023-05-24
467a12fe-0697-4238-85c1-3b61b1176a55	sol-flowers	flwr	SOL Flowers	f	\N	2023-05-24	2023-05-24
b89cbe06-1db3-4287-ac09-8651723a7953	solge	solge	Solge	f	\N	2023-05-24	2023-05-24
0c24efc8-48b3-47dc-8cb7-c67ebfae2ecb	solice	slc	Solice	f	\N	2023-05-24	2023-05-24
a9886527-d8b5-4eb3-abab-f456a97c736f	solidex	sex	Solidex	f	\N	2023-05-24	2023-05-24
52628b73-ac8f-41cd-a20a-bcabf70c5970	solidlizard	sliz	SolidLizard	f	\N	2023-05-24	2023-05-24
45ca915b-366a-4b6b-ae3a-ee8b21a6779f	solidlizard-synthetic-usd	slzusdc	SolidLizard synthetic USD	f	\N	2023-05-24	2023-05-24
7eba289e-904b-46eb-9a21-432f52d77435	solidly	solid	Solidly v1	f	\N	2023-05-24	2023-05-24
ef7553fc-9043-420c-8418-42a538456ede	solidlydex	solid	Solidly	f	\N	2023-05-24	2023-05-24
bc5d5d73-8a2f-47c2-86a7-c1c765d1d9ba	solidsex-tokenized-vesolid	solidsex	SOLIDsex: Tokenized veSOLID	f	\N	2023-05-24	2023-05-24
a452e2ad-c2c2-4db0-a300-959097b33d42	solimax	slm	SoliMax	f	\N	2023-05-24	2023-05-24
84acb601-cee1-442f-a030-760e3e00a0db	solisnek	snek	SoliSnek	f	\N	2023-05-24	2023-05-24
ee611045-4739-4394-ab7e-87338c5ceb06	solit	slt	Solit	f	\N	2023-05-24	2023-05-24
5243fbb7-334c-438c-9c3d-3b6e71e95c3f	sollama-utilities	sollama	Sollama Utilities	f	\N	2023-05-24	2023-05-24
3b09ef91-1a8b-4a72-ad84-9308190da114	solminter	smrt	Solminter	f	\N	2023-05-24	2023-05-24
691edd42-af8d-4864-a2b6-051187ad9ca0	solo-coin	solo	Sologenic	f	\N	2023-05-24	2023-05-24
d49e54e8-aa8c-434a-8dfc-aded2497ea23	solomon-defi	slm	Solomon Defi	f	\N	2023-05-24	2023-05-24
40681d07-8744-436e-b298-480bf5091ba7	solpad-finance	solpad	Solpad Finance	f	\N	2023-05-24	2023-05-24
679fc0ff-02b1-4c16-8fcc-18b50209b9fd	solpatrol-bail	bail	SolPatrol Bail	f	\N	2023-05-24	2023-05-24
8c97e250-095a-4a2a-80fc-fdde6f6e3aaf	solpay-finance	solpay	SolPay Finance	f	\N	2023-05-24	2023-05-24
134006d0-db85-422c-b00f-eb7303ebb1e4	solrazr	solr	RazrFi	f	\N	2023-05-24	2023-05-24
ea1b70cd-ae1f-4ae7-9214-89d8b9bfed15	solrise-finance	slrs	Solrise Finance	f	\N	2023-05-24	2023-05-24
5c96a93c-0530-4597-b357-9934a25b076a	solster	str	Solster	f	\N	2023-05-24	2023-05-24
e926785c-08f0-4fc2-83c5-f07b2ea0bdb2	soltato-fries	fries	Soltato FRIES	f	\N	2023-05-24	2023-05-24
6da98a89-9613-402f-8ff3-8e5156577aef	solum	solum	Solum	f	\N	2023-05-24	2023-05-24
6f5adce6-0345-4115-af21-49d20163af9a	solve-care	solve	SOLVE	f	\N	2023-05-24	2023-05-24
055bde45-57b3-4ad7-92db-dee048774c5e	solvent	svt	Solvent	f	\N	2023-05-24	2023-05-24
8bf8e69b-b059-433f-a0a4-9c317088b50c	solvia	sva	Solvia	f	\N	2023-05-24	2023-05-24
e0f7adf6-c825-43af-9949-976ef07f5a37	sol-wormhole	sol	SOL (Wormhole)	f	\N	2023-05-24	2023-05-24
f0eef695-0125-4846-b199-62d46874effe	solx-gaming-guild	sgg	SolX Gaming Guild	f	\N	2023-05-24	2023-05-24
8645d311-5e33-457d-8b7e-b6e550c379f6	solyard-finance	yard	Solyard Finance	f	\N	2023-05-24	2023-05-24
1f309374-1c2c-4367-a145-23539f53348a	sombra-network	smbr	Sombra	f	\N	2023-05-24	2023-05-24
c820d376-0838-4348-971c-529688fd8abf	somee-social	somee	SoMee.Social	f	\N	2023-05-24	2023-05-24
a287f8d2-14c1-4abc-ac34-8926484243f4	somesing	ssx	SOMESING Exchange	f	\N	2023-05-24	2023-05-24
09ea9b30-de6c-4c47-a425-ceab7ceabef2	sommelier	somm	Sommelier	f	\N	2023-05-24	2023-05-24
6400871b-e600-4267-9b7a-f5c9645f4bc0	somnium-space-cubes	cube	Somnium Space CUBEs	f	\N	2023-05-24	2023-05-24
27c4dca3-b791-4e7a-854d-7fad61825572	sonar	ping	Sonar	f	\N	2023-05-24	2023-05-24
5acfd6ae-655c-44a9-8f11-7cee7ce401ec	sonarwatch	sonar	SonarWatch	f	\N	2023-05-24	2023-05-24
2ac5eac7-2467-44a0-a9ea-1eca057ee7b6	songbird	sgb	Songbird	f	\N	2023-05-24	2023-05-24
7693f63f-dfbb-4e72-bbaf-0860d2bc4f33	songcoin	song	SongCoin	f	\N	2023-05-24	2023-05-24
102e6f65-1cbd-4911-bc40-68aa3020be0e	sonic-inu	sonic	Sonic Inu	f	\N	2023-05-24	2023-05-24
2bfbb3a2-1270-4599-958b-5a47a112ebba	sonic-suite	sonic	Sonic Suite	f	\N	2023-05-24	2023-05-24
4bd66962-5961-4dba-aac2-079d2f444587	sonm	snm	SONM	f	\N	2023-05-24	2023-05-24
71e58dd0-a3e3-40e8-812e-0a8c270d6a73	sonne-finance	sonne	Sonne Finance	f	\N	2023-05-24	2023-05-24
01437957-5bfa-4bb5-9d6c-80222bcdf383	sonocoin	sono	SonoCoin	f	\N	2023-05-24	2023-05-24
9aa4196c-232a-4c9c-8560-10ef1bd2ea07	soonaverse	soon	Soonaverse	f	\N	2023-05-24	2023-05-24
e1b36ac7-2a47-4830-8905-36bcef485ff0	soonswap	soon	SoonSwap	f	\N	2023-05-24	2023-05-24
851b766e-066f-4eb0-8e4e-78c4ef6c1509	sopay	sop	SoPay	f	\N	2023-05-24	2023-05-24
fb4c7224-8889-4001-a549-c0472ee12e97	sophiaverse	soph	SophiaVerse	f	\N	2023-05-24	2023-05-24
7ba67678-4b15-4b8c-9f14-f4a1fd3a7715	sora	xor	Sora	f	\N	2023-05-24	2023-05-24
228679ff-bae0-4968-86b2-d1c8fd70718a	sorachancoin	sora	SorachanCoin	f	\N	2023-05-24	2023-05-24
fbdf8ebc-6e05-4d16-b54f-2289eef73b21	sora-synthetics	xst	SORA Synthetics	f	\N	2023-05-24	2023-05-24
968ddfa0-4b1f-4cc4-8cca-87f3e43bf59a	sora-synthetic-usd	xstusd	SORA Synthetic USD	f	\N	2023-05-24	2023-05-24
2ceead24-c81e-4091-af0c-108df3c93c5e	sora-validator-token	val	Sora Validator	f	\N	2023-05-24	2023-05-24
d8e6992c-8dbe-4d00-9e2d-da5a2f5dd0ea	soroosh-smart-ecosystem	sse	Soroosh Smart Ecosystem	f	\N	2023-05-24	2023-05-24
9d9f9f80-0cc5-4643-b60b-59a04f784156	soros	sor	Soros	f	\N	2023-05-24	2023-05-24
b106b371-723c-4066-9522-bea1e0ea75fc	soul-dog-city-bones	bones	Soul Dogs City Bones	f	\N	2023-05-24	2023-05-24
005d28c2-8c85-4aae-a892-f02b9dae7309	soulocoin	soulo	SouloCoin	f	\N	2023-05-24	2023-05-24
7c2b103c-6e57-46eb-92cd-4e91695eefaa	soulsaver	soul	Soulsaver	f	\N	2023-05-24	2023-05-24
6c5cc105-24d9-4444-aa93-4855de7da01d	souls-of-meta	som	Souls of Meta	f	\N	2023-05-24	2023-05-24
814f03a1-fc73-4b33-8947-48d06afbe9a5	soul-swap	soul	Soul Swap	f	\N	2023-05-24	2023-05-24
ef078fbf-3e30-41be-bbc0-e549e6938b28	souni-token	son	Souni	f	\N	2023-05-24	2023-05-24
78d3c0c0-1d88-4b16-9039-19b0b03b0261	soup-finance	soup	Soup Finance	f	\N	2023-05-24	2023-05-24
54ca8046-c383-4dc1-8bca-df32672dc2ab	sourceless	str	Sourceless	f	\N	2023-05-24	2023-05-24
d4ff71be-6cc8-4333-96b3-b510e00c4fb8	source-protocol	srcx	Source Protocol	f	\N	2023-05-24	2023-05-24
2c3b0fb2-44f3-44ab-8332-115837a154de	southxchange-coin	sxcc	SouthXchange Coin	f	\N	2023-05-24	2023-05-24
5088741e-387f-4806-8129-34f1683fa746	sov	sov	SOV	f	\N	2023-05-24	2023-05-24
6969af64-ab29-4c41-946c-e90ec50fe8c6	sovi-token	sovi	Sovi	f	\N	2023-05-24	2023-05-24
11db1b2b-12de-4b0a-a1f0-880b5bdc07c9	sovryn	sov	Sovryn	f	\N	2023-05-24	2023-05-24
b7d4b96c-38b5-425e-bda7-fcfeadeb8e6b	sowl	sowl	SOWL	f	\N	2023-05-24	2023-05-24
f151d8f3-bad8-478c-8e11-f3e80646345a	soy-finance	soy	Soy Finance	f	\N	2023-05-24	2023-05-24
d4036d2f-e7fe-4e60-acd9-441a7d7acddb	spacechain-erc-20	spc	SpaceChain (ERC-20)	f	\N	2023-05-24	2023-05-24
f3a88fea-e8a8-41b0-9e3c-616bdaddce94	spacecorgi	scorgi	SpaceCorgi	f	\N	2023-05-24	2023-05-24
25994b23-ee76-41b8-8715-2ea4f0685c61	space-corsair-key	sck	Space Corsair Key	f	\N	2023-05-24	2023-05-24
7a01a006-ce71-4dfc-9e8a-e007dc03c7d5	spacecowboy	scb	SpaceCowBoy	f	\N	2023-05-24	2023-05-24
9eabf33c-9416-496b-8af9-c5a4f6260e84	space-crypto	spg	Space Crypto	f	\N	2023-05-24	2023-05-24
c0380bd2-ed04-47be-af2c-08ec029cd808	spacedawgs	dawgs	SpaceDawgs	f	\N	2023-05-24	2023-05-24
77027bd0-6c8c-4d0c-a967-d4654f04a4c9	spacefalcon	fcon	SpaceFalcon	f	\N	2023-05-24	2023-05-24
47219afa-2ca4-4c30-8460-756192acd5b5	spacefi	space	SpaceFi	f	\N	2023-05-24	2023-05-24
d5d9d0eb-4f52-46c1-9ae9-96042206cbb2	spacegoat-token	sgt	SpaceGoat	f	\N	2023-05-24	2023-05-24
80b48e71-ffd1-4b5b-a16c-7dd3e5ed1439	spacegrime	grimex	SpaceGrime	f	\N	2023-05-24	2023-05-24
d13de48e-7f01-4b8c-8f1f-889b26aa3885	space-id	id	SPACE ID	f	\N	2023-05-24	2023-05-24
04db23d0-aef9-42a3-8339-f260061b2ab9	space-iz	spiz	SPACE-iZ	f	\N	2023-05-24	2023-05-24
35ac600d-1dfd-4b68-acbf-fa675d29ff58	spacelens	space	Spacelens	f	\N	2023-05-24	2023-05-24
ee0663c2-a458-4b98-a5b9-31592a15ef0c	spacemine	mine	SpaceMine	f	\N	2023-05-24	2023-05-24
213d7900-30bc-4288-a7a9-100dcec43103	space-misfits	smcw	Space Misfits	f	\N	2023-05-24	2023-05-24
23828fca-61a2-457a-bfec-32b2fb02b235	spacen	sn	SpaceN	f	\N	2023-05-24	2023-05-24
2fd08443-5922-4fa3-b783-1cf138d4b0ba	spacepi	spacepi	SpacePi	f	\N	2023-05-24	2023-05-24
53e11c72-5519-430e-b8db-2fbc42a41a53	space-rebase-xusd	xusd	Space Rebase XUSD	f	\N	2023-05-24	2023-05-24
7e81eb09-1513-4427-9a31-3998c4825652	spaceshipx-ssx	ssx	SpaceShipX SSX	f	\N	2023-05-24	2023-05-24
8e344766-f0d7-4b81-a816-6ed7bd3afcc2	space-soldier	soldier	Space Soldier	f	\N	2023-05-24	2023-05-24
b9b212e2-f8f0-4f72-978c-798754fe396a	spaceswap-milk2	milk2	Spaceswap MILK2	f	\N	2023-05-24	2023-05-24
9efa57de-6944-4632-b2a2-29bb90f8b468	spaceswap-shake	shake	Spaceswap SHAKE	f	\N	2023-05-24	2023-05-24
76143341-5698-4eb4-9865-19d4d72f3e11	space-token-bsc	space	Space Token BSC	f	\N	2023-05-24	2023-05-24
5e8e7f50-8566-4940-a481-7c717f83a2aa	spacevikings	svt	SpaceVikings	f	\N	2023-05-24	2023-05-24
7db50c52-46e6-49f1-90c7-e0bb33e9f2fc	space-xmitter	sx	Space Xmitter	f	\N	2023-05-24	2023-05-24
cf0f268d-7ca0-4ece-bd8c-5e6800247626	spacexpanse	rod	SpaceXpanse	f	\N	2023-05-24	2023-05-24
4c553ddc-534b-411d-adbf-a549aabeda16	spacey-2025	spay	SpaceY 2025	f	\N	2023-05-24	2023-05-24
f2b7ecef-c7b0-40f0-b512-a44e29faee2e	spain-national-fan-token	snft	Spain National Football Team Fan Token	f	\N	2023-05-24	2023-05-24
608ab796-52d8-49c3-b935-2f7cf73822ae	spankchain	spank	SpankChain	f	\N	2023-05-24	2023-05-24
1d7e05d5-8501-4b55-ac25-ee4bef8b51bd	sparklab	spark	SparkLab	f	\N	2023-05-24	2023-05-24
18074f30-e730-41b7-a20a-bacd85693fb3	sparkle-coin	sctk	Sparkle Coin	f	\N	2023-05-24	2023-05-24
66922dc6-5819-4217-b0df-757be0979433	sparkpoint	srk	SparkPoint	f	\N	2023-05-24	2023-05-24
d8a706e2-5cb4-4f44-b498-07642566a26b	sparkpoint-fuel	sfuel	SparkPoint Fuel	f	\N	2023-05-24	2023-05-24
bb5baf8e-4b21-4f40-b689-d9d898451b0c	sparks	spk	SparksPay	f	\N	2023-05-24	2023-05-24
1c650f52-892d-44b9-b83f-7f1573be356a	spartacus	spa	Spartacus	f	\N	2023-05-24	2023-05-24
04f81158-755f-439a-ba36-bcb723c6b60d	spartacus-money	lambda	Spartacus Money	f	\N	2023-05-24	2023-05-24
bb133f11-7f5b-4078-ae97-a42b10a398d9	spartan-protocol-token	sparta	Spartan Protocol	f	\N	2023-05-24	2023-05-24
a1dd2551-f860-406c-a004-b8cb8299476d	spartan-token	spa	Spartans	f	\N	2023-05-24	2023-05-24
aa387a8b-8e5c-425e-80e1-bf5c4e3cc93a	spdr-s-p-500-etf-trust-defichain	dspy	SPDR S&P 500 ETF Trust Defichain	f	\N	2023-05-24	2023-05-24
c809aa9f-e4a0-4fab-878a-3417f827d0e2	speciex	spex	Speciex	f	\N	2023-05-24	2023-05-24
e65538d5-3e91-4c54-923a-92d4e1e285be	spectrecoin	alias	Alias	f	\N	2023-05-24	2023-05-24
d70d6ba5-1087-4651-a04f-edca69ad399e	spectresecuritycoin	xspc	SpectreSecurityCoin	f	\N	2023-05-24	2023-05-24
a96df3a6-a305-4cb3-9aad-fbc7a5c926ac	spectrum-finance	spf	Spectrum Finance	f	\N	2023-05-24	2023-05-24
abab086a-8e30-4ec2-9cfe-cecc7c6efcb9	speed-mining-service	sms	Speed Mining Service	f	\N	2023-05-24	2023-05-24
6e01e470-14f4-44ac-a8f6-7dec166dfee1	speed-star-joc	joc	Speed Star JOC	f	\N	2023-05-24	2023-05-24
0cf5a01b-9096-4492-811f-7c1e120ba526	speed-star-speed	speed	Speed Star SPEED	f	\N	2023-05-24	2023-05-24
466beba3-ac71-444d-9198-041ba091c52e	speed-star-star	star	Speed Star STAR	f	\N	2023-05-24	2023-05-24
242d185a-01f9-4715-ad37-4301eb5097ce	spellfire	spellfire	Spellfire	f	\N	2023-05-24	2023-05-24
ce508f76-833f-4c75-90a4-6e7ac27db6df	spell-token	spell	Spell	f	\N	2023-05-24	2023-05-24
a7579a85-47ae-4223-87c7-876270427d64	sperax	spa	Sperax	f	\N	2023-05-24	2023-05-24
c28b8f8c-d93f-43d4-884f-c0e928b11257	sperax-usd	usds	Sperax USD	f	\N	2023-05-24	2023-05-24
d2ee10b1-4019-4bc1-a8c0-0dfcd8126743	spgbb	spgbb	SPGBB	f	\N	2023-05-24	2023-05-24
dc08f27e-6eec-480d-88d2-b200694500c3	sphere	sphr	Sphere	f	\N	2023-05-24	2023-05-24
44a01def-e6ae-40ce-a955-d269d78bb2dd	sphere-finance	sphere	Sphere Finance	f	\N	2023-05-24	2023-05-24
fc45abf0-ab5b-46c3-b3e4-3fe1a56f368d	spherium	sphri	Spherium	f	\N	2023-05-24	2023-05-24
de230f60-9ae7-4b78-b93d-538bb6aebe2e	spheroid-universe	sph	Spheroid Universe	f	\N	2023-05-24	2023-05-24
282a8b26-ccb6-47ca-9a4c-6ee28996d59c	sphynx-labs-bae5b42e-5e37-4607-8691-b56d3a5f344c	sphynx	Sphynx Labs	f	\N	2023-05-24	2023-05-24
443b0f70-445f-4529-a984-5c2bdc9537f8	spice	spice	Spice Token	f	\N	2023-05-24	2023-05-24
ed6e7457-d7d9-4f90-a7ea-baaeb6abe00b	spice-dao	spice	Spice DAO	f	\N	2023-05-24	2023-05-24
0163677d-929e-4944-bc34-0dad769e1d3d	spice-trade	spice	Spice Trade	f	\N	2023-05-24	2023-05-24
5b07255b-e427-4ae9-b071-1d31e976e6d1	spiceusd	usds	SpiceUSD	f	\N	2023-05-24	2023-05-24
2336d85d-dd5c-4630-b927-5ee1ec3ac426	spiderdao	spdr	SpiderDAO	f	\N	2023-05-24	2023-05-24
5a7956f8-0f26-4f19-8713-c49a48e2f0a8	spillways	spillways	Spillways	f	\N	2023-05-24	2023-05-24
92da939a-dd9f-4ea1-8181-b1ad0e0f7dba	spinada-cash	spin	Spinada Cash	f	\N	2023-05-24	2023-05-24
416059c9-6c7a-49f5-98a5-7e7034b24b8a	spindle	spd	SPINDLE	f	\N	2023-05-24	2023-05-24
a3cd22fe-0fa7-4b74-b686-9f89e90a9c6f	spin-fi	$spin	Spin Fi	f	\N	2023-05-24	2023-05-24
1c026216-f780-465f-b692-643889a98ccf	spintop	spin	Spintop	f	\N	2023-05-24	2023-05-24
44b411f2-382e-41a4-87a3-bb3f741c8a8c	spiraldao-coil	coil	SpiralDAO Coil	f	\N	2023-05-24	2023-05-24
8c89e173-077b-4196-90b9-8a5d2518e4c2	spiritswap	spirit	SpiritSwap	f	\N	2023-05-24	2023-05-24
b08c1d2e-3fb6-4b3d-ad89-8a27f6fc4812	splinterlands	sps	Splintershards	f	\N	2023-05-24	2023-05-24
dbfe48e1-061a-4052-a510-b8e83aa71c6c	splyt	shopx	SHOPX	f	\N	2023-05-24	2023-05-24
b81b4e04-415b-4f2a-a228-60df4eed6c23	sponge-f08b2fe4-9d9c-47c3-b5a0-84c2ac3bbbff	$sponge	Sponge	f	\N	2023-05-24	2023-05-24
5aa2ce8c-20fd-4070-8eb2-f85b50e24eea	spookyshiba-2	spky	SpookyShiba	f	\N	2023-05-24	2023-05-24
9bee812f-22d8-424b-8200-353c623516aa	vrmars	vrm	VRMARS	f	\N	2023-05-24	2023-05-24
a56bdf1f-135c-46dc-a1f1-be423bc50c95	spookyswap	boo	Spookyswap	f	\N	2023-05-24	2023-05-24
63e2b16a-9dba-4d8e-ae38-261fb0d46d28	spool-dao-token	spool	Spool	f	\N	2023-05-24	2023-05-24
be6012db-8786-421a-8e35-956852d929ca	spore	spore	Spore	f	\N	2023-05-24	2023-05-24
086fc242-dccc-4020-a662-4aa7c8548306	spores-network	spo	Spores Network	f	\N	2023-05-24	2023-05-24
318b22ba-0e7e-47f7-958d-76bc51527c18	sporkdao	spork	SporkDAO	f	\N	2023-05-24	2023-05-24
c6a7e73a-58a7-442d-8914-cb8f74d7338f	sport	sport	SPORT	f	\N	2023-05-24	2023-05-24
7a84f6a6-9a4e-4ce0-9cc9-998543bb5426	sportium	sprt	Sportium	f	\N	2023-05-24	2023-05-24
198e0ff5-cab1-420b-b6b5-844f7111dcc0	sports-artificial	sports-ai	Sports Artificial	f	\N	2023-05-24	2023-05-24
bd87a870-41c8-4fb6-abd9-b68dc01e610f	sports-bet	sbet	Sports Bet	f	\N	2023-05-24	2023-05-24
6bc20212-280d-4c0a-a48d-0464f9bb4a71	sportsicon	$icons	SportsIcon	f	\N	2023-05-24	2023-05-24
c137f660-80aa-4ae9-ab89-580881c600c5	sportzchain	spn	Sportzchain	f	\N	2023-05-24	2023-05-24
ad7ee9df-d508-42a3-9052-76fca0fe1f9a	spot	spot	Spot	f	\N	2023-05-24	2023-05-24
a65ce528-7173-4d2b-90f9-cdd2c7f6c72f	spots	spt	Spots	f	\N	2023-05-24	2023-05-24
52f22542-ba1c-4931-adb6-33076d868408	spring	spring	Spring Token	f	\N	2023-05-24	2023-05-24
d0c6e35a-8bbf-4b9b-8bd7-82f4c91b5d20	sprink	sprink	Sprink	f	\N	2023-05-24	2023-05-24
3ba96f16-b22b-487d-ab9b-4de57c347cad	sprint-coin	sprx	Sprint Coin	f	\N	2023-05-24	2023-05-24
f6b774e2-1f25-4af9-ac56-cc2767e7d6c7	spritzmoon-crypto	spritzmoon	SpritzMoon Crypto Token	f	\N	2023-05-24	2023-05-24
b2fc8982-99cf-47bc-baa2-bca64cf08b4d	spume	spume	Spume	f	\N	2023-05-24	2023-05-24
b689ab79-272b-4ea7-8bf5-b3861ffa6f52	spurdex	spdx	SpurDex	f	\N	2023-05-24	2023-05-24
453939f2-6ff5-47fa-9a56-2c7dff07af69	sqgl-vault-nftx	sqgl	SQGL Vault (NFTX)	f	\N	2023-05-24	2023-05-24
c0068db7-5f93-4bd5-83e2-dd9c0e605de1	squad	squad	Superpower Squad	f	\N	2023-05-24	2023-05-24
e756006f-c967-4f90-afb3-c5b371afe9b6	squadfund	sqf	SquadFund	f	\N	2023-05-24	2023-05-24
5cec6cdc-d7cd-4a0a-9ee1-cdaf91125c5c	square-token	squa	Square	f	\N	2023-05-24	2023-05-24
5042cd5b-f505-4914-9f31-2efa6a278901	squid-game	squid	Squid Game	f	\N	2023-05-24	2023-05-24
d0d278bb-1f64-444f-af2f-5f2d9a690ec1	squidgrow	squidgrow	SquidGrow	f	\N	2023-05-24	2023-05-24
51a39d9d-b139-4a90-8185-45c339981091	squirrel-finance	nuts	Squirrel Finance	f	\N	2023-05-24	2023-05-24
e15937c9-a77b-4b93-a931-d802e20375b0	squirt-game	squirt	Squirt Game	f	\N	2023-05-24	2023-05-24
59fc4785-e565-4bd0-968c-4430d84e0fa6	srnartgallery	sact	srnArtGallery	f	\N	2023-05-24	2023-05-24
fc398b18-d5b8-4a10-b05c-c651f38ae8f8	srune	srune	sRUNE	f	\N	2023-05-24	2023-05-24
b8e0afca-f0df-47ac-ab8e-c25ecccbecdb	ssv-network	ssv	SSV Network	f	\N	2023-05-24	2023-05-24
f7ee0a46-cdf8-4049-a726-6f7f5ec59f3b	stabilize	stbz	Stabilize	f	\N	2023-05-24	2023-05-24
8d8346b2-4046-484b-97dc-cd91bb895fea	stable-asset	sta	STABLE ASSET	f	\N	2023-05-24	2023-05-24
bd66e19b-e789-4e66-b9cc-f5ec7c1eafa9	stablecoin	stable	Stablecoin	f	\N	2023-05-24	2023-05-24
e4e02350-4a6f-43ac-b055-e086722f5b2f	stabledoc-token	sdt	Stabledoc	f	\N	2023-05-24	2023-05-24
ced96ac7-44be-47b4-835a-0642133b4497	stablefund-usd	sfusd	StableFund USD	f	\N	2023-05-24	2023-05-24
18e64fe6-e205-4327-a39f-f1c602d2e504	stable-one-rocket	srocket	Stable One Rocket	f	\N	2023-05-24	2023-05-24
c00038ef-eeaf-4a90-8c15-f02a73eb5d89	stableusd	usds	Stably USDS	f	\N	2023-05-24	2023-05-24
f9b84b2c-0ced-4103-9b75-342613913dd8	stablexswap	stax	StableXSwap	f	\N	2023-05-24	2023-05-24
83b18f64-e79b-4ff3-ba18-c0245633cd6c	stablz	stablz	Stablz	f	\N	2023-05-24	2023-05-24
3d3b5c9c-1706-4256-8200-4f91a238bcb6	stackos	stack	StackOS	f	\N	2023-05-24	2023-05-24
140421a4-b165-4c1e-92f6-449f8a44c39d	stackswap	stsw	Stackswap	f	\N	2023-05-24	2023-05-24
ae6c23ce-c8d2-48d6-a7b5-d70c9db0a837	stacktical	dsla	DSLA Protocol	f	\N	2023-05-24	2023-05-24
0d95c069-eef6-4f0c-95c0-7b8fedfcc313	stade-francais-paris-fan-token	sfp	Stade Français Paris Fan Token	f	\N	2023-05-24	2023-05-24
20c139d7-c9a0-42ea-808d-81519ff470bd	stader	sd	Stader	f	\N	2023-05-24	2023-05-24
f03f36dc-8edd-484d-b065-adb917856d8d	stader-bnbx	bnbx	Stader BNBx	f	\N	2023-05-24	2023-05-24
c00f8510-176f-44eb-87d8-eff94202d5cc	stader-maticx	maticx	Stader MaticX	f	\N	2023-05-24	2023-05-24
bba442ed-a4dc-47aa-b7b9-aed4e1435416	stader-nearx	nearx	Stader NearX	f	\N	2023-05-24	2023-05-24
ba2bec1a-7c9c-46a8-b633-38224af561c4	stader-sftmx	sftmx	Stader sFTMX	f	\N	2023-05-24	2023-05-24
33a7ace4-7eca-4e50-8f7d-e8dd34b62ffd	stafi	fis	Stafi	f	\N	2023-05-24	2023-05-24
76d81d94-dcb6-4bdd-a45f-9465843a906b	stafi-staked-atom	ratom	StaFi Staked ATOM	f	\N	2023-05-24	2023-05-24
3e44999f-3808-41da-bb2e-978855686a46	stafi-staked-bnb	rbnb	StaFi Staked BNB	f	\N	2023-05-24	2023-05-24
063ae52a-74c6-48e6-95b0-ac9fec87a9df	stafi-staked-matic	rmatic	StaFi Staked MATIC	f	\N	2023-05-24	2023-05-24
fc25ac84-a38f-4723-a315-b557ec3c6d35	stafi-staked-sol	rsol	StaFi Staked SOL	f	\N	2023-05-24	2023-05-24
4989dfb7-efb6-4be1-9256-c18f5b8813c5	staika	stik	Staika	f	\N	2023-05-24	2023-05-24
508cc384-f2d2-4a95-83a7-c2de189e340f	stakeborg-dao	standard	Construct	f	\N	2023-05-24	2023-05-24
04582915-b197-46eb-ab71-df09ddf7b90f	stakecube	scc	Stakecube	f	\N	2023-05-24	2023-05-24
2234afaf-4d8a-4e9d-8833-9de14b514e10	staked-aave-balancer-pool-token	stkabpt	Staked Aave Balancer Pool Token	f	\N	2023-05-24	2023-05-24
f4b1a8b1-5b8e-4de4-8f7a-604142de9bde	staked-acme	stacme	Staked ACME	f	\N	2023-05-24	2023-05-24
d1ce2984-2008-416e-a7f0-28b9a3dbeb8c	stake-dao	sdt	Stake DAO	f	\N	2023-05-24	2023-05-24
47828fcf-f363-40f3-90ca-214e0aa7d97b	stake-dao-crv	sdcrv	Stake DAO CRV	f	\N	2023-05-24	2023-05-24
5d7a332f-eadd-4ae1-8bb2-2bf5ec8cc89f	staked-aurora	staur	Staked Aurora	f	\N	2023-05-24	2023-05-24
91f247c7-2518-4444-913f-f9e240824154	staked-core	score	Staked CORE	f	\N	2023-05-24	2023-05-24
1a49c0d2-325e-4677-97a0-749d02dd3fb0	staked-ether	steth	Lido Staked Ether	f	\N	2023-05-24	2023-05-24
332921b2-35f1-4fa1-b824-9aef1fe78c85	staked-frax-ether	sfrxeth	Staked Frax Ether	f	\N	2023-05-24	2023-05-24
3beab780-8541-4204-a571-8f0a5c54642a	staked-kcs	skcs	Staked KCS	f	\N	2023-05-24	2023-05-24
da95ee41-613c-4ffb-b7ca-b028acb9872e	staked-near	stnear	Staked NEAR	f	\N	2023-05-24	2023-05-24
087bfd23-0554-4865-ba60-6a8a8e4ba118	staked-tarot	xtarot	Staked TAROT	f	\N	2023-05-24	2023-05-24
c881d97a-71b1-4b65-9ab5-48a6abdc7f56	staked-trx	strx	Staked TRX	f	\N	2023-05-24	2023-05-24
d75000fc-a3dd-4afd-a3f0-32d8d99172d0	staked-wemix	stwemix	Staked WEMIX	f	\N	2023-05-24	2023-05-24
7284cae1-2f02-4d8f-a4fc-05dc46758d1e	staked-yearn-crv-vault	st-ycrv	Staked Yearn CRV Vault	f	\N	2023-05-24	2023-05-24
7b44959c-a700-4680-8cce-cfe49344ef62	stake-goblin	goblin	Stake Goblin	f	\N	2023-05-24	2023-05-24
762cd3bd-413f-4f10-b31c-3ebff593524e	stake-link	sdl	stake.link	f	\N	2023-05-24	2023-05-24
56f02a01-33da-4ccf-a503-9aa37e1b8377	stake-link-staked-link	stlink	Staked LINK	f	\N	2023-05-24	2023-05-24
0e817f32-f5ff-44e3-9edb-bf4b9d6cec3b	staker-dao	stkr	Staker DAO	f	\N	2023-05-24	2023-05-24
efa98485-c33c-4f9c-9b18-b6a0fed16553	stakewise	swise	StakeWise	f	\N	2023-05-24	2023-05-24
e5ab9460-9947-4326-a81a-79402b072d44	stamen-tellus-token	stt	Stamen Tellus Token	f	\N	2023-05-24	2023-05-24
a1041dab-e31f-4e4d-a95e-8837eeb14d9c	standard-euro	seuro	Standard Euro	f	\N	2023-05-24	2023-05-24
dd3eea13-d26a-485e-b5cf-d4dcae7f7358	standard-protocol	stnd	Standard Protocol	f	\N	2023-05-24	2023-05-24
43d537c8-0bbf-430a-bb54-f31dc207a5d7	standard-token	tst	The Standard Token	f	\N	2023-05-24	2023-05-24
71a51833-3fd3-437b-8c73-48f63e6c828e	stan-token	stan	STAN Token	f	\N	2023-05-24	2023-05-24
b3a18eed-ffe5-4803-947a-02a61df307d5	star-atlas	atlas	Star Atlas	f	\N	2023-05-24	2023-05-24
78b5ea1a-2fc1-4541-a16b-eab09bc23760	star-atlas-dao	polis	Star Atlas DAO	f	\N	2023-05-24	2023-05-24
5c86a65c-a7bb-40a2-8766-81b21ce33552	starbots	bot	Starbots	f	\N	2023-05-24	2023-05-24
55d78d45-676a-47f1-9539-43c8e29bca11	starbots-gear	gear	Starbots GEAR	f	\N	2023-05-24	2023-05-24
d21043f4-3ceb-44e8-b0f1-aaa40380dbfc	starchain	stc	StarChain	f	\N	2023-05-24	2023-05-24
5f5105d1-6199-44a8-aad5-e33e2ca7a05e	star-chain	star	Star Chain	f	\N	2023-05-24	2023-05-24
9f5a05a4-c05f-4978-9bae-526f6328bcab	starcoin	stc	Starcoin	f	\N	2023-05-24	2023-05-24
fb841c7b-5e62-4153-b308-1cda79f4fefe	starfish-finance	sean	Starfish Finance	f	\N	2023-05-24	2023-05-24
f8162731-6c8e-4ed0-a8d9-b8e98d4c90b9	stargate-finance	stg	Stargate Finance	f	\N	2023-05-24	2023-05-24
341740d9-42b1-4be3-a12f-7bc7b620eda9	stargaze	stars	Stargaze	f	\N	2023-05-24	2023-05-24
d4840c4c-e95a-46a7-9560-0d29682c4171	starlaunch	stars	StarLaunch	f	\N	2023-05-24	2023-05-24
21a243dd-9f19-486c-8a16-66f040765c88	starlay-finance	lay	Starlay Finance	f	\N	2023-05-24	2023-05-24
732ff0fb-8812-4122-9845-628573e82d20	starlink	starl	StarLink	f	\N	2023-05-24	2023-05-24
5d7ca33b-1ffd-4e6f-bc83-cd2c68844282	starly	starly	Starly	f	\N	2023-05-24	2023-05-24
f4b78aec-09f8-4a88-89b5-7b270ff90411	starmon-token	smon	StarMon	f	\N	2023-05-24	2023-05-24
1f0e6591-c80a-4d73-8a60-4def8497abd2	starname	iov	Starname	f	\N	2023-05-24	2023-05-24
4fcd9cd5-8860-40e0-a175-1568b3e7c1d1	starpad	srp	Starpad	f	\N	2023-05-24	2023-05-24
d2f26fc3-7ce4-40c0-b737-b10e8c85c6cf	star-quacks	quacks	STAR QUACKS	f	\N	2023-05-24	2023-05-24
b8ea6b9e-0f76-4355-8dfe-990cd2fb5a45	starsharks	sss	StarSharks	f	\N	2023-05-24	2023-05-24
9c6e1b94-2696-49ab-8779-bace6a777621	starsharks-sea	sea	StarSharks SEA	f	\N	2023-05-24	2023-05-24
db6394f1-f227-4b34-83b3-3d0e0cc427c0	starship	starship	StarShip	f	\N	2023-05-24	2023-05-24
52e26356-6002-4eca-8eff-a7cbab885fdf	star-wars-cat	swcat	Star Wars Cat	f	\N	2023-05-24	2023-05-24
f30c72a9-1b1a-44e0-a8aa-f39c605463b8	starworks-global-ecosystem	starx	STARX	f	\N	2023-05-24	2023-05-24
26a37c18-5719-4026-b910-a632e0ed65ed	stasis-eurs	eurs	STASIS EURO	f	\N	2023-05-24	2023-05-24
91e85df4-edaa-4952-bded-ed2c3e9e4fde	stat	stat	STAT	f	\N	2023-05-24	2023-05-24
cb1c342f-00d3-4bc5-9770-fa215a0febef	statera	sta	Statera	f	\N	2023-05-24	2023-05-24
8d380703-8a7b-4d39-8f38-0b1d02571e1a	statik	statik	Statik	f	\N	2023-05-24	2023-05-24
346a2d22-e69f-4923-87fe-3d43fc52f480	sta-token	sta	STA	f	\N	2023-05-24	2023-05-24
632435be-89f3-4a4d-8d99-d9f03daad266	stats	stats	STATS	f	\N	2023-05-24	2023-05-24
aa158e97-f0f5-4b00-8415-ae5550c931d8	status	snt	Status	f	\N	2023-05-24	2023-05-24
199ba0db-36d7-46b6-9135-0f4aaefe2fe3	stay	stay	STAY	f	\N	2023-05-24	2023-05-24
c019a97e-51f4-4a11-9d7a-5531e33be37c	staysafu	safu	StaySAFU	f	\N	2023-05-24	2023-05-24
45dc6e84-8a81-45e7-9837-17f5e394a61d	steakhut-finance	steak	SteakHut Finance	f	\N	2023-05-24	2023-05-24
8743084d-f053-4a2f-9d7f-1ee99ab35667	stealthcoin	xst	Stealth	f	\N	2023-05-24	2023-05-24
8df6e0b2-cfad-4c7d-ad6a-68c3b15abbe3	steam-exchange	steamx	Steam Exchange	f	\N	2023-05-24	2023-05-24
c82c1464-3932-4d74-aa1c-81a1a343e13e	steem	steem	Steem	f	\N	2023-05-24	2023-05-24
7092043e-4c40-4622-93c5-ef087eb44625	steem-dollars	sbd	Steem Dollars	f	\N	2023-05-24	2023-05-24
2419b00c-1322-4f71-8238-6a6c60dae5be	stella-fantasy-token	sfty	Stella Fantasy Token	f	\N	2023-05-24	2023-05-24
d192d065-a78e-4415-b3d0-2a0a6b512b43	stellar	xlm	Stellar	f	\N	2023-05-24	2023-05-24
6176bca0-eaa5-4574-aec1-479a51f96244	stellaswap	stella	StellaSwap	f	\N	2023-05-24	2023-05-24
87b0d0c1-5974-4618-8b26-afc44de9c212	stellite	xla	Scala	f	\N	2023-05-24	2023-05-24
3d4ceb56-4c88-4fcb-8a50-df66bde5e970	stemx	stemx	STEMX	f	\N	2023-05-24	2023-05-24
0d9d5310-4c68-4648-8e6b-4600dbd4cc1d	step	step	Step	f	\N	2023-05-24	2023-05-24
1100bca5-a64b-42ac-8475-21f0823ebbc3	step-app-fitfi	fitfi	Step App	f	\N	2023-05-24	2023-05-24
ed5340e2-d746-446f-b09e-8bd75722fb46	stepex	spex	StepEx	f	\N	2023-05-24	2023-05-24
feaf1ba7-ebd8-40f8-a1a0-ddde7bdb03a6	step-finance	step	Step Finance	f	\N	2023-05-24	2023-05-24
f81cfb4f-f30e-4c3e-9bf9-774f54e70d01	stepg	stepg	STEPG	f	\N	2023-05-24	2023-05-24
6a17de6d-714e-4b4c-ab22-62472070feb8	step-hero	hero	Step Hero	f	\N	2023-05-24	2023-05-24
fdd67e1f-ec18-4666-9412-1eb2c828687a	stepn	gmt	STEPN	f	\N	2023-05-24	2023-05-24
2f97f27a-f1f3-4cea-a043-d4a78e667172	stepwatch	swp	Stepwatch	f	\N	2023-05-24	2023-05-24
8528f88f-14dc-4417-826e-3093417867d2	stepwatch-land-token	swld	Stepwatch Land Token	f	\N	2023-05-24	2023-05-24
e8cccb48-7551-449c-bc28-375e9d622d60	stereoai	stai	StereoAI	f	\N	2023-05-24	2023-05-24
529e8379-fc9e-4039-8588-0703d3bc9428	sterling-finance	str	Sterling Finance	f	\N	2023-05-24	2023-05-24
6c0ca255-b006-481a-8b38-da261b90e418	stfx	stfx	STFX	f	\N	2023-05-24	2023-05-24
1df2f4fb-89e7-4196-8e5c-ccb1c5cb24c7	stick-man	stick	Stick Man	f	\N	2023-05-24	2023-05-24
13e7da71-34ac-44a2-b942-e52dc2f263f1	stilton	stilt	Stilton	f	\N	2023-05-24	2023-05-24
1430c3ec-7a92-4b4c-90d7-237e132ccd9a	stima	stima	STIMA	f	\N	2023-05-24	2023-05-24
2a689884-ff66-4655-b004-a29b91af22b4	stkatom	stkatom	stkATOM	f	\N	2023-05-24	2023-05-24
830f0ddf-64e6-49e3-83d8-356514f0ba66	stobox-token	stbu	Stobox	f	\N	2023-05-24	2023-05-24
e48c2b67-5c58-4e31-8d5d-611c0115877f	ston	ston	Ston	f	\N	2023-05-24	2023-05-24
25577c69-694d-4a41-a03f-c7301a34f458	stone-token	stn	Stone	f	\N	2023-05-24	2023-05-24
5041784e-fce9-4477-9d92-0188daf052a3	stonkleague	aegis	StonkLeague	f	\N	2023-05-24	2023-05-24
95c8cbb2-3cd5-48a5-b03a-20642c6a2d83	stonksdao	stonks	STONKSDAO	f	\N	2023-05-24	2023-05-24
8ec65f29-c9dc-4268-b50d-d34bbfd8016a	stopelon	stopelon	StopElon	f	\N	2023-05-24	2023-05-24
4fd57311-91f9-4393-a576-c0229877e672	storepay	spc	Storepay	f	\N	2023-05-24	2023-05-24
1f636875-e451-4c09-9164-68c185ae9538	storex	strx	Storex	f	\N	2023-05-24	2023-05-24
30d2be2b-d01d-4fcb-a7f0-422b3139e64b	storiqa	stq	Storiqa	f	\N	2023-05-24	2023-05-24
9e574e6a-56bb-4aa2-9d09-496e881c5694	storj	storj	Storj	f	\N	2023-05-24	2023-05-24
5a25a240-66cb-4d72-b63b-2be19bb94b62	storm	stmx	StormX	f	\N	2023-05-24	2023-05-24
6b154f9b-5550-4c07-97a8-eed3e24672a3	storm-token	storm	Storm	f	\N	2023-05-24	2023-05-24
6f54e2eb-a836-44c2-a8dc-5e26bf36a98d	storx	srx	StorX	f	\N	2023-05-24	2023-05-24
6af53cb2-9d9c-4515-b3e8-1dd8ee419491	story	story	Story	f	\N	2023-05-24	2023-05-24
64181b67-d279-49d8-abc2-16b450d8e1a5	stox	stx	Stox	f	\N	2023-05-24	2023-05-24
79413fb8-3e5d-4a6c-96f2-cffea05b7ccf	stp-network	stpt	STP	f	\N	2023-05-24	2023-05-24
4a6102dd-72a4-4417-904c-fa78a9e5c90b	straitsx-indonesia-rupiah	xidr	XIDR	f	\N	2023-05-24	2023-05-24
df9b3839-fc72-4fe4-b5ac-2841f58753a6	stratis	strax	Stratis	f	\N	2023-05-24	2023-05-24
ce0f1f75-e2f1-4797-8a39-e7f0c74dba36	stratos	stos	Stratos	f	\N	2023-05-24	2023-05-24
2c9aea57-095e-401e-9100-1dae74542ad3	streakk	stkk	Streakk	f	\N	2023-05-24	2023-05-24
57a8ac7b-2939-430e-84d2-fcfc4c5dfb53	streamcoin	strm	StreamCoin	f	\N	2023-05-24	2023-05-24
d667310a-bbe7-4b3f-8dff-f17348640074	streamer-inu	streamerinu	Streamer Inu	f	\N	2023-05-24	2023-05-24
64d58f63-afd7-4d7e-b218-110735746f14	streamr	data	Streamr	f	\N	2023-05-24	2023-05-24
50a22d88-15c1-45bd-be97-528ca5da0f55	streamr-xdata	xdata	Streamr XDATA	f	\N	2023-05-24	2023-05-24
d49490da-db1d-41cb-9e55-874f338b8f5b	streeth	streeth	STREETH	f	\N	2023-05-24	2023-05-24
9d58f6a2-64a9-402b-964d-793f5942d921	street-runner	srg	Street Runner	f	\N	2023-05-24	2023-05-24
651a2205-3cf4-4663-a3ca-229e3bbac27c	strelka-ai	strelka ai	Strelka AI	f	\N	2023-05-24	2023-05-24
860448ea-d29e-41e2-999d-5298adb93fb0	stride	strd	Stride	f	\N	2023-05-24	2023-05-24
01541237-2276-48fb-9e1a-ab84365f3df8	stride-staked-atom	statom	Stride Staked Atom	f	\N	2023-05-24	2023-05-24
a0c7ab51-9ca5-476d-8124-8a171330149c	stride-staked-evmos	stevmos	Stride Staked Evmos	f	\N	2023-05-24	2023-05-24
520c374a-1abc-42e5-975a-2019bee78dd3	stride-staked-injective	stinj	Stride Staked Injective	f	\N	2023-05-24	2023-05-24
4905cd52-b044-430a-a40b-182674dca0d3	stride-staked-juno	stjuno	Stride Staked Juno	f	\N	2023-05-24	2023-05-24
a1357949-9022-466f-a0b2-a04121877e98	stride-staked-luna	$stluna	Stride Staked Luna	f	\N	2023-05-24	2023-05-24
c1c08aa8-29aa-44f9-9365-0261c749fd9d	stride-staked-osmo	stosmo	Stride Staked Osmo	f	\N	2023-05-24	2023-05-24
2b625084-5426-4226-9baf-6f39a6560a2a	stride-staked-stars	ststars	Stride Staked Stars	f	\N	2023-05-24	2023-05-24
cbcbf7b1-2c84-4dcd-ba42-ff481c287682	strike	strk	Strike	f	\N	2023-05-24	2023-05-24
1db84852-dd31-43f1-aa66-458bd5722c2b	strikecoin	strx	StrikeX	f	\N	2023-05-24	2023-05-24
ab2a683b-03cc-4f05-b90d-95d7ca2de3bd	strip-finance	strip	Strip Finance	f	\N	2023-05-24	2023-05-24
227083d9-636f-4f4e-b388-9b2442733d29	strips-finance	strp	Strips Finance	f	\N	2023-05-24	2023-05-24
10c45063-be50-465e-ad29-db8b198de9a8	stripto	strip	Stripto	f	\N	2023-05-24	2023-05-24
d2eee44f-80be-46c5-b15a-73c4935d47af	strite	stri	Strite	f	\N	2023-05-24	2023-05-24
9eb6ebb5-d464-4587-9569-4c46325c711c	stroke-prevention-genomicdao	pcsp	Stroke-Prevention GenomicDAO	f	\N	2023-05-24	2023-05-24
b8e062e1-6382-447f-a449-ea7296643753	strong	strong	Strong	f	\N	2023-05-24	2023-05-24
2e9f1a23-7922-4853-898b-53fa1e10b2d0	stronger	strngr	Stronger	f	\N	2023-05-24	2023-05-24
416f0337-4c75-422e-932d-17e66646c72b	stronghands-finance	ishnd	StrongHands Finance	f	\N	2023-05-24	2023-05-24
96642e14-ceab-4390-b407-f3b2a4f94295	stronghands-masternode	shmn	StrongHands Masternode	f	\N	2023-05-24	2023-05-24
1446d883-6a95-45f5-8884-fbd8d3ec044d	stronghold-token	shx	Stronghold	f	\N	2023-05-24	2023-05-24
74454081-3604-45bf-b9d2-89bf0f4b2830	strongnode	sne	StrongNode	f	\N	2023-05-24	2023-05-24
ac425529-2575-4b8d-94f3-ef19a91ff21b	structure-finance	stf	Structure Finance	f	\N	2023-05-24	2023-05-24
6061db95-ad74-4c90-ad96-2e9fc8e87aa4	strx-finance	sfi	STRX Finance	f	\N	2023-05-24	2023-05-24
423cf393-f0fa-447b-862d-9449685df171	student-coin	stc	Student Coin	f	\N	2023-05-24	2023-05-24
d28b89b4-a4d7-42ab-a690-ba9fede2393a	style	style	Style	f	\N	2023-05-24	2023-05-24
37b288ea-a71b-4055-90df-7ee474da038e	stylike-governance	styl	Stylike Governance	f	\N	2023-05-24	2023-05-24
93d21389-c004-4465-823c-33b2e524c861	subdao	gov	SubDAO	f	\N	2023-05-24	2023-05-24
a86cf007-25e4-40d5-adbc-a43455f1c3e9	substratum	sub	Substratum	f	\N	2023-05-24	2023-05-24
ee7719db-f211-4213-99f7-7dd9cb315b2f	succession	sccn	Succession	f	\N	2023-05-24	2023-05-24
2192896b-3a24-400b-b786-c669c1414d00	sucrecoin	xsr	Sucrecoin	f	\N	2023-05-24	2023-05-24
8038c587-767f-48e9-af43-c577f91357cf	sudoswap	sudo	sudoswap	f	\N	2023-05-24	2023-05-24
7a968acd-8841-420f-95ed-25506a47f535	sugarbounce	tip	SugarBounce	f	\N	2023-05-24	2023-05-24
6f0222ac-5eff-40e6-a164-49782a2ff6f5	sugaryield	sugar	SugarYield	f	\N	2023-05-24	2023-05-24
a51cac31-cac3-46f1-9a19-f66fb3f4a70b	sui	sui	Sui	f	\N	2023-05-24	2023-05-24
8d580f63-fc33-48e9-a47b-aa57a92d2d4d	suia	suia	SUIA	f	\N	2023-05-24	2023-05-24
13c08357-8c13-45fa-87a8-beef0ea1a494	suiboxer	sbox	SUIBoxer	f	\N	2023-05-24	2023-05-24
0b24b2df-edd4-4f99-9608-6bc4c3493ed4	suifloki-inu	sfloki	SuiFloki-Inu	f	\N	2023-05-24	2023-05-24
43f882d5-1382-4c44-b123-8da197c68870	sui-iou	sui	Sui (IOU)	f	\N	2023-05-24	2023-05-24
2640bf25-fd56-4a41-a4e4-b1c02c685225	sui-launch-token	slt	Sui Launch Token	f	\N	2023-05-24	2023-05-24
90690133-cf5d-4b79-ac77-bd2bd791c87f	suipad	suip	SuiPad	f	\N	2023-05-24	2023-05-24
78e6d7b3-e5a7-4692-96d9-f770d0390198	suipepe	spepe	SuiPepe	f	\N	2023-05-24	2023-05-24
9839af84-4c9a-4fa5-bca0-3bf664e2253d	sui-pepe	spepe	Sui Pepe	f	\N	2023-05-24	2023-05-24
b3b8afd9-cc56-4c67-8781-da16b73399f8	suishiba	suishib	SuiShiba	f	\N	2023-05-24	2023-05-24
b22a43c8-e49d-42e6-98e0-299f42a29896	suitizen	stz	Suitizen	f	\N	2023-05-24	2023-05-24
019181b4-7eb7-4d1e-bf36-d768e3922c89	sukhavati-network	skt	Sukhavati Network	f	\N	2023-05-24	2023-05-24
c109de07-8fc6-4957-ae7b-f9bf28b01b84	sukiyaki	suki	Sukiyaki	f	\N	2023-05-24	2023-05-24
6b2121b1-c877-4664-b732-b5088686e1c2	suku	suku	SUKU	f	\N	2023-05-24	2023-05-24
60627c25-18d4-42cc-91d0-c990ca2e6fb4	summer	summer	Summer	f	\N	2023-05-24	2023-05-24
e4e35a97-0a8d-4b85-9142-d94df5368785	sumokoin	sumo	Sumokoin	f	\N	2023-05-24	2023-05-24
7559b66c-9337-4bdd-8e8b-3d8fb849b80c	sumotex	smtx	SUMOTEX	f	\N	2023-05-24	2023-05-24
bf02b9e2-1111-4569-9b0b-7ed1f329674c	suncontract	snc	SunContract	f	\N	2023-05-24	2023-05-24
13a326ed-b2f1-4770-8fa3-8b8aa6fca82d	sundaeswap	sundae	SundaeSwap	f	\N	2023-05-24	2023-05-24
4ed91cce-3a25-48f8-8237-716f564efdf7	sunder-goverance-token	sunder	Sunder Goverance	f	\N	2023-05-24	2023-05-24
6dcf10f7-1ff4-4610-bc72-820a6adf5af7	suneku	suneku	Suneku	f	\N	2023-05-24	2023-05-24
1e1d468e-f57d-48b9-ac81-48e5d20fbb3e	sunflower-land	sfl	Sunflower Land	f	\N	2023-05-24	2023-05-24
42f44602-8ed9-4775-a072-2b4c282d4fa2	sunny-aggregator	sunny	Sunny Aggregator	f	\N	2023-05-24	2023-05-24
de613f90-995d-4887-b78a-8e5af7b211b4	sunnysideup	ssu	SunnySideUp	f	\N	2023-05-24	2023-05-24
88088c3e-20f4-4d18-999b-c40781e10409	sunrise	sunc	Sunrise	f	\N	2023-05-24	2023-05-24
e58cb8af-d9c5-4d80-8ba7-9e5abb8869a2	sun-token	sun	Sun Token	f	\N	2023-05-24	2023-05-24
b5fa51f8-ccac-445d-a65f-a3aacd39beba	supa-foundation	supa	SUPA Foundation	f	\N	2023-05-24	2023-05-24
a97df1c3-ceb7-4525-8867-7248b9082f67	supe-infinity	supe	Supe Infinity	f	\N	2023-05-24	2023-05-24
e66b71d8-db3f-4481-8b63-d633f06a19f0	super-athletes-token	sat	Super Athletes Token	f	\N	2023-05-24	2023-05-24
f0c108bf-b246-4772-8a3c-8496c28993b7	superbid	superbid	SuperBid	f	\N	2023-05-24	2023-05-24
39f6730f-8a86-47db-b438-e5810e2662f3	superciety	super	PeerMe SUPER	f	\N	2023-05-24	2023-05-24
6a5856c9-71f5-4141-94bb-78d4ce22ec99	superfarm	super	SuperVerse	f	\N	2023-05-24	2023-05-24
da436c2f-71ba-4cf1-9df3-1511c3c6030a	super-hero	sh	Super Hero	f	\N	2023-05-24	2023-05-24
a3e16a79-4557-4dc0-9950-2866b6fa4b00	superlauncher-dao	launch	Superlauncher	f	\N	2023-05-24	2023-05-24
336f9230-cdd1-47af-8c73-7cf553c1493e	superrare	rare	SuperRare	f	\N	2023-05-24	2023-05-24
1e6bda37-6709-49a4-8d12-7df88cec50bc	super-rare-ball-shares	srbp	Super Rare Ball Potion	f	\N	2023-05-24	2023-05-24
ff855642-823a-4261-b8f4-d8f6f05c2e26	superrarebears-hype	$hype	SuperRareBears HYPE	f	\N	2023-05-24	2023-05-24
c52506c3-d764-40e4-a77d-3ec3d3cbe303	superrarebears-rare	rare	SuperRareBears RARE	f	\N	2023-05-24	2023-05-24
3b575979-06ed-4232-8ea0-2cbc2c3f7db2	superstake	superstake	Superstake	f	\N	2023-05-24	2023-05-24
902b3931-7440-4b5e-a4fd-e3188bb23227	super-three-kingdoms	stk	Super Three Kingdoms	f	\N	2023-05-24	2023-05-24
99464666-fc62-4282-add8-930bf85e1467	supertx-governance-token	sup	SuperTx Governance	f	\N	2023-05-24	2023-05-24
ff84e5c9-e9ab-4824-b9a1-dc847cd93cc9	superwalk	grnd	SuperWalk	f	\N	2023-05-24	2023-05-24
7a7c6185-51cd-415c-828b-c94f3b2b25af	super-zero	sero	SERO	f	\N	2023-05-24	2023-05-24
df195098-5b41-4ec7-9caf-6b07b848f0d1	supreme-finance	hype	Supreme Finance	f	\N	2023-05-24	2023-05-24
98d9221b-18d2-4f4e-ae66-55a343472c32	supreme-finance-hypes	hypes	Supreme Finance HYPES	f	\N	2023-05-24	2023-05-24
31f01607-7ce7-4b55-9f49-50cc82e051d8	suprenft	snft	SupreNFT	f	\N	2023-05-24	2023-05-24
6cae0f51-e759-4333-84cf-03d1e634ca58	suqa	sin	SINOVATE	f	\N	2023-05-24	2023-05-24
ed487e48-548a-440d-b21c-b3c9220c0f7f	sureremit	rmt	SureRemit	f	\N	2023-05-24	2023-05-24
ccbb91ce-982a-4da1-b00d-897de211f8f9	surfexutilitytoken	surf	SurfExUtilityToken	f	\N	2023-05-24	2023-05-24
8730905f-9b7e-41b7-a745-604ccb3081a4	surf-finance	surf	Surf.Finance	f	\N	2023-05-24	2023-05-24
f6b3089b-d6f5-406f-b6e5-54e9d8217014	surfswap	tide	Surfswap	f	\N	2023-05-24	2023-05-24
7be67aa6-ab03-410a-b97a-66d01a408bef	surveyor-dao	surv	Surveyor DAO	f	\N	2023-05-24	2023-05-24
28c171e2-33b5-4eab-b6a8-a76fab9e2f1f	surviving-soldiers	ssg	Surviving Soldiers	f	\N	2023-05-24	2023-05-24
84b589ff-e986-4216-9e64-353855463261	susd-yvault	yvsusd	sUSD yVault	f	\N	2023-05-24	2023-05-24
3a783c15-4649-4e40-bfbb-b58df979a2ea	sushi	sushi	Sushi	f	\N	2023-05-24	2023-05-24
25f9e24b-6685-479c-8842-e57c7eeecab9	sushi-yvault	yvsushi	SUSHI yVault	f	\N	2023-05-24	2023-05-24
268d29b8-c03f-4307-97f9-0c1436b5c7f8	sustainable-energy-token	set	Sustainable Energy	f	\N	2023-05-24	2023-05-24
45ec639f-e6f3-4147-8af0-c4d79fc2ecdb	suterusu	suter	Suterusu	f	\N	2023-05-24	2023-05-24
50c0f08d-7802-4003-93af-1e81772df91a	suvereno	suv	Suvereno	f	\N	2023-05-24	2023-05-24
ce71eafc-e1b4-42eb-ac49-c63f7d90f185	swagbucks	bucks	SwagBucks	f	\N	2023-05-24	2023-05-24
46d539be-dd0c-4f5c-820d-ad2215636395	swag-finance	swag	SWAG Finance	f	\N	2023-05-24	2023-05-24
9c3a1c79-4381-4dd2-a9be-0334d5272e8d	s-wallet-protocol	swp	S-Wallet Protocol	f	\N	2023-05-24	2023-05-24
3e39a4b4-e01d-436b-807a-ed97a74ce54d	swamp-coin	swamp	Swamp Coin	f	\N	2023-05-24	2023-05-24
35d0c9ac-9d11-48a4-a2ec-c5a03b800f76	swampy	swamp	Swampy	f	\N	2023-05-24	2023-05-24
34edbad6-88bf-42cb-9a47-2a651573c54e	swap	xwp	Swap	f	\N	2023-05-24	2023-05-24
ae6b3dbb-68bd-4256-9b4b-e932951535d1	swaperry	perry	Swaperry	f	\N	2023-05-24	2023-05-24
38718fc0-a4d2-4105-8457-100657efe800	swapfish	fish	SwapFish	f	\N	2023-05-24	2023-05-24
2e8d9155-1cf3-4056-a523-25aa466b48e5	swapfolio	swfl	Swapfolio	f	\N	2023-05-24	2023-05-24
047ab7bb-00dc-4dc3-b95c-7a7667ac1f2d	swapify	swify	Swapify	f	\N	2023-05-24	2023-05-24
7608e2d2-a721-4ee8-91f2-df553a7a4f9c	swapped-finance	swpd	Swapped Finance	f	\N	2023-05-24	2023-05-24
530bdf99-aff3-4a4c-998e-0f59a40f9453	swappery-token	swpr	The Swappery	f	\N	2023-05-24	2023-05-24
bc011a90-9676-48aa-a1e6-de3db2380cb8	swappi	ppi	Swappi	f	\N	2023-05-24	2023-05-24
426ccbf4-c43d-488b-99a0-813cf1be4b3d	swapr	swpr	Swapr	f	\N	2023-05-24	2023-05-24
bfe16c83-fc1d-485e-a800-f1669e6eae41	swaprum	sapr	Swaprum	f	\N	2023-05-24	2023-05-24
ab238021-be36-40bf-a26c-3f0df25992c1	swapsicle-pops	pops	Swapsicle	f	\N	2023-05-24	2023-05-24
287d4c4d-0c14-4a5b-b8aa-5fd946e4333e	swaptracker	swpt	SwapTracker	f	\N	2023-05-24	2023-05-24
df166045-f4d3-4d81-8da2-1c08bc2fe0fd	swapz-app	swapz	SWAPZ.app	f	\N	2023-05-24	2023-05-24
79b6eb7d-d6b5-4d7a-8338-280e32b98eef	swarm	swm	Swarm Network	f	\N	2023-05-24	2023-05-24
3e3c5248-0d1a-429b-a1e1-a3c7bbad075c	swarm-bzz	bzz	Swarm	f	\N	2023-05-24	2023-05-24
6cf93bf9-9853-4161-ac82-554299a623b1	swarm-city	swt	Swarm City	f	\N	2023-05-24	2023-05-24
eb644716-c637-4499-b3d1-8ea42692701d	swarm-markets	smt	Swarm Markets	f	\N	2023-05-24	2023-05-24
1c210889-6c74-4e69-8ced-a7c56d068d29	swash	swash	Swash	f	\N	2023-05-24	2023-05-24
55c9da75-4ea3-40c6-9a5f-b5485b6571a4	sway-social	sway	Sway Social	f	\N	2023-05-24	2023-05-24
1eea7456-d6c8-4160-bddc-b09e61c35b40	sweatcoin	sweat	Sweatcoin (Sweat Economy)	f	\N	2023-05-24	2023-05-24
458517fe-aeb2-4d18-bce9-7cd9a08afc67	sweep-token	sweep	Sweep Token	f	\N	2023-05-24	2023-05-24
c4414ce0-91a0-4f37-92d5-f3859c3284de	sweets	$swts	SWEETS	f	\N	2023-05-24	2023-05-24
30463f7d-89ce-4c7d-8609-d5cb89501ce4	sweettoken	swt	SweetToken	f	\N	2023-05-24	2023-05-24
40cb699f-6cc8-4d9a-ab99-b40f7265c0ff	swell-network	swell	Swell Network	f	\N	2023-05-24	2023-05-24
1785a612-b827-4db2-a802-875ab067d6f7	sweply	swply	Sweply	f	\N	2023-05-24	2023-05-24
ad06e61d-043b-4387-9efa-ce337c302458	swerve-dao	swrv	Swerve	f	\N	2023-05-24	2023-05-24
e2573d67-0b8f-4ec8-a23b-f5f20dfcc76b	swerve-protocol	swerve	SWERVE Protocol	f	\N	2023-05-24	2023-05-24
8b20b873-0a31-4125-b454-24bd3fb5374a	sweth	sweth	Swell Ethereum	f	\N	2023-05-24	2023-05-24
36dfa122-2fe7-4462-8603-f32e54544762	swftcoin	swftc	SWFTCOIN	f	\N	2023-05-24	2023-05-24
07ea81c0-bf18-46c9-8eb9-358a56ad416f	swgtoken	swg	SWG	f	\N	2023-05-24	2023-05-24
62cab578-6914-437d-840e-522d2b4775e5	swiftcash	swift	SwiftCash	f	\N	2023-05-24	2023-05-24
331c932b-8ada-4b77-b526-942e4bf45f63	swiftswap	sws	SwiftSwap	f	\N	2023-05-24	2023-05-24
cc447af4-99a7-492a-a9ca-cf110b124106	swinca-2	swi	Swinca	f	\N	2023-05-24	2023-05-24
48a45a6b-451c-426b-ac90-46cabafc62f1	swing	swing	Swing	f	\N	2023-05-24	2023-05-24
093a191d-33cf-4104-9381-1a4665209f6e	swingby	swingby	Swingby	f	\N	2023-05-24	2023-05-24
8762c88d-36a6-45c7-9d61-de956fb76897	swing-xyz	$swing	Swing.xyz	f	\N	2023-05-24	2023-05-24
a2d426a8-76e3-4d5c-b6a2-6ac71b2e61e5	swipe	sxp	SXP	f	\N	2023-05-24	2023-05-24
be926db3-94cf-4c44-bb93-2ec525de15d4	swirltoken	swirl	SwirlToken	f	\N	2023-05-24	2023-05-24
715c2f2f-a27c-4c9c-9441-28f1595ca1de	swissborg	chsb	SwissBorg	f	\N	2023-05-24	2023-05-24
5c57e46f-2c71-4a1c-976e-e46c2def41a9	switcheo	swth	Carbon Protocol	f	\N	2023-05-24	2023-05-24
724e2a4a-0af0-4f5d-a933-4987550edc0d	switch-token	switch	Switch Token	f	\N	2023-05-24	2023-05-24
745d9bd8-522c-451c-97c0-0c1848a67f7f	swole-doge	swole	Swole Doge	f	\N	2023-05-24	2023-05-24
15116fb2-9dc3-4037-9979-47ebc8f43ddb	swop	swop	Swop	f	\N	2023-05-24	2023-05-24
bf4f49fe-2ad9-4646-b312-1238a8ae3597	sword-bsc-token	swdb	Sword BSC Token	f	\N	2023-05-24	2023-05-24
f06b10e0-cf89-418d-be64-ce8910b20c58	swtcoin	swat	SWTCoin	f	\N	2023-05-24	2023-05-24
b30611ae-5ab6-4df2-8e0a-ce40f49994ce	swusd	swusd	Swerve.fi USD	f	\N	2023-05-24	2023-05-24
095e7127-09a9-4b8d-a337-572015554da9	swych	swych	Swych	f	\N	2023-05-24	2023-05-24
e438b86f-fe18-4259-b1ea-7940e899ede7	sx-network	sx	SX Network	f	\N	2023-05-24	2023-05-24
c48879b4-621f-4efc-a9be-f457728cb1f9	sylo	sylo	Sylo	f	\N	2023-05-24	2023-05-24
db0da27e-909c-482c-ae0a-940060bbbddd	symbiosis-finance	sis	Symbiosis Finance	f	\N	2023-05-24	2023-05-24
c1c477a9-4808-48ca-b794-fd62221b9e1d	symbol	xym	Symbol	f	\N	2023-05-24	2023-05-24
faab8240-4f40-4bae-b502-da86f9bf1aad	symverse	sym	SymVerse	f	\N	2023-05-24	2023-05-24
a88c8877-783a-4742-b47e-5264c5ffe1ce	synapse-2	syn	Synapse	f	\N	2023-05-24	2023-05-24
93a644bd-9812-4276-8f10-63722aa2fe72	synapse-network	snp	Synapse Network	f	\N	2023-05-24	2023-05-24
a29241ea-020e-4fd7-802d-3176a3e035e0	synaptic-ai	synapticai	Synaptic AI	f	\N	2023-05-24	2023-05-24
f887cf09-7186-4c38-b7d9-63802e80e610	syncdex	sydx	SyncDex	f	\N	2023-05-24	2023-05-24
aaf9e663-c020-467c-9d97-a39bc120eb38	synchrocoin	syc	SynchroCoin	f	\N	2023-05-24	2023-05-24
a369c5c9-180f-4568-9149-6ac83c316c82	synchrony	scy	Synchrony	f	\N	2023-05-24	2023-05-24
3f4a80de-084d-495e-919e-963afc4be825	sync-network	sync	Sync Network	f	\N	2023-05-24	2023-05-24
4fefd773-1cf6-4705-af26-2e200085aeca	syndicate-2	synr	MOBLAND	f	\N	2023-05-24	2023-05-24
6c01fcd8-6706-4bc6-a2d6-c9c6bc69a867	synergy-crystal	crs	Synergy Crystal	f	\N	2023-05-24	2023-05-24
e4038cf2-4e0a-47fd-ba24-2299f872dd30	synergy-diamonds	dia	Synergy Diamonds	f	\N	2023-05-24	2023-05-24
0b65c78b-d6e5-49c6-8486-9be0dd5d5799	synergy-land-token	sng	Synergy Land Token	f	\N	2023-05-24	2023-05-24
870e1ba2-115a-4937-985e-76ec560f5f28	synesis-one	sns	Synesis One	f	\N	2023-05-24	2023-05-24
a6619a09-1318-4d1f-a4a4-966d0fd0e809	synex-coin	minecraft	Synex Coin	f	\N	2023-05-24	2023-05-24
e92270c0-3722-4ada-95db-b0b98d2f8a95	synopti	synopti	Synopti	f	\N	2023-05-24	2023-05-24
d5b972b9-346d-4d52-ac03-62ac7e973662	synthetic-usd	xusd	Synthetic USD	f	\N	2023-05-24	2023-05-24
441423de-0f40-4b4a-ba00-13dec789c98f	synthetify-token	sny	Synthetify	f	\N	2023-05-24	2023-05-24
00b56214-e135-40d1-9ad7-7df0be6608db	synth-ousd	ousd	Synth oUSD	f	\N	2023-05-24	2023-05-24
e039d848-f071-427c-b966-565df55773ad	sypool	syp	Sypool	f	\N	2023-05-24	2023-05-24
468fdfb0-7563-49c2-856d-60fcb9c13547	syrup-finance	srx	Syrup Finance	f	\N	2023-05-24	2023-05-24
65c24f65-70d1-41db-801b-66e436fbecbb	syscoin	sys	Syscoin	f	\N	2023-05-24	2023-05-24
d3771929-8aee-4c34-945e-0ca4082f721d	szab	szab	SZAB	f	\N	2023-05-24	2023-05-24
2a3109b2-aaf7-4dbf-b8a6-bc96d9e44086	t	t	T	f	\N	2023-05-24	2023-05-24
251501f6-13c8-43c1-92ba-945e84dfc96f	t23	t23	T23	f	\N	2023-05-24	2023-05-24
2f5e6945-1d4d-4964-98b0-b23fdd70063a	t3rn	trn	t3rn	f	\N	2023-05-24	2023-05-24
9687e915-4f46-4f57-ba57-994dc0a16a5f	tabank	tab	Tabank	f	\N	2023-05-24	2023-05-24
1d169d34-6fe6-40b7-a446-0f6613d07e26	tabbypos	epos	TabbyPOS	f	\N	2023-05-24	2023-05-24
78262e77-f577-4c4a-b93c-babc46c08992	taboo-token	taboo	Taboo	f	\N	2023-05-24	2023-05-24
c719579d-26e1-47ab-93ae-8228c3f174e4	tabtrader	ttt	TabTrader	f	\N	2023-05-24	2023-05-24
dc76c9ca-512b-4add-aa1a-56820103498f	tacos	taco	Tacos	f	\N	2023-05-24	2023-05-24
11ef7a67-5ac7-43a7-9c35-dfffa15f4526	tagcoin	tag	Tagcoin	f	\N	2023-05-24	2023-05-24
14c3fc58-2c28-4f20-a42c-c2b37e7a5f9c	tag-protocol	tag	Tag Protocol	f	\N	2023-05-24	2023-05-24
1b4681e2-bf37-4e56-b34c-424d85ad4efe	tahu	tahu	TAHU	f	\N	2023-05-24	2023-05-24
ed223c78-9f01-4704-9bd6-49e3cc327624	tai	tai	tBridge	f	\N	2023-05-24	2023-05-24
b05b8877-0a09-4516-bac8-8c6cc1fe2343	taikula-coin	taikula	Taikula Coin	f	\N	2023-05-24	2023-05-24
4d664cdd-ea6d-46af-a664-2f39ed7855b0	tail	tail	Tail	f	\N	2023-05-24	2023-05-24
a651e6b1-e50b-43b8-86a3-cf8a2ccd68a8	tail-finance	tail	Tail Finance	f	\N	2023-05-24	2023-05-24
6a6332cc-9ad6-4be7-98b5-47841a7eec0d	tairyo-inu	tairyo	Tairyo Inu	f	\N	2023-05-24	2023-05-24
959dbeb9-9963-4538-be52-bfaea5e3e1b8	tajcoin	taj	TajCoin	f	\N	2023-05-24	2023-05-24
97970ac8-66b5-4046-9bb1-32ad3392846b	takamaka-green-coin	tkg	Takamaka	f	\N	2023-05-24	2023-05-24
6e9422eb-2077-47a3-b8d7-29f9e50f405a	takeda-shin	takeda	Takeda Shin	f	\N	2023-05-24	2023-05-24
7d65b518-c853-4af9-9b17-14fefb2da2f9	take-flight-alpha-dao	tfa	Take Flight Alpha DAO	f	\N	2023-05-24	2023-05-24
646a4a87-cc57-48d1-8acb-f5cebe6c7ed5	takepile	take	Takepile	f	\N	2023-05-24	2023-05-24
d755cc71-25af-4cc8-9cd2-c2b26b3b0d07	taki	taki	Taki	f	\N	2023-05-24	2023-05-24
6c4df218-29f6-4344-a03e-d8832b1ec27d	talaxeum	talax	Talaxeum	f	\N	2023-05-24	2023-05-24
53ec3e8b-9767-45db-a48c-18f973746a05	talecraft	craft	TaleCraft	f	\N	2023-05-24	2023-05-24
daab4904-d8fb-4de2-9864-2d240235df1e	talent	tnt	Talent	f	\N	2023-05-24	2023-05-24
9c154611-1081-490d-9f79-57ca7f74245e	talent-token	ttx	Talent TTX	f	\N	2023-05-24	2023-05-24
9436ee34-4d41-4e08-89ee-b3ff790046f7	taler	tlr	Taler	f	\N	2023-05-24	2023-05-24
3963b4d7-7d19-4776-94e6-50c0cbecf78c	talkado	talk	Talkado	f	\N	2023-05-24	2023-05-24
d3ee5a89-fec2-4f85-98b8-ef51012ddb85	talken	talk	Talken	f	\N	2023-05-24	2023-05-24
e32222d0-5c6e-44b7-97a1-77ce75fffd6d	tamadoge	tama	Tamadoge	f	\N	2023-05-24	2023-05-24
cda01c21-7b57-4907-9bdd-23b0887a8640	tama-finance	tama	Tama Finance	f	\N	2023-05-24	2023-05-24
21fe45cc-494e-4777-9d2d-e3e2cda946c3	tangent	tang	Tangent	f	\N	2023-05-24	2023-05-24
6d92cfb2-8a1d-434c-8c56-ff5364b95e9a	tangible	tngbl	Tangible	f	\N	2023-05-24	2023-05-24
b9d9d0d1-1e15-499e-bf04-2e63916028e1	tangle	tngl	Tangle	f	\N	2023-05-24	2023-05-24
ef738b95-41fe-4a00-b5d5-34744ec4dd89	tangoswap	tango	TangoSwap	f	\N	2023-05-24	2023-05-24
e758a833-6e78-4ca0-80a8-35eb2c485239	tank-battle	tbl	Tank Battle	f	\N	2023-05-24	2023-05-24
13143fe9-1ea6-46a0-9573-135be1f34684	tank-gold	tgold	Tank Gold	f	\N	2023-05-24	2023-05-24
eb13e8c9-d79c-432d-bfba-6ed855cf0b3c	tao-te-ching	ttc	Tao Te Ching	f	\N	2023-05-24	2023-05-24
ac353fe5-277c-4ff3-aa6b-c2f88f4997d1	tap	xtp	Tap	f	\N	2023-05-24	2023-05-24
d64b6f4d-56bc-4951-b79c-fdb8838d979d	tap-fantasy	tap	Tap Fantasy	f	\N	2023-05-24	2023-05-24
e8f79272-ce4e-4b39-891b-be8a44da1100	tap-fantasy-mc	tfmc	Tap Fantasy MC	f	\N	2023-05-24	2023-05-24
99933d6e-4d28-4cf4-9987-2214e3075c08	taraxa	tara	Taraxa	f	\N	2023-05-24	2023-05-24
69210222-bf75-499b-9d9b-edd7c5664fda	tardigrades-finance	trdg	TRDGtoken	f	\N	2023-05-24	2023-05-24
be72cedf-46a8-463f-8f8e-207d3f5edd5d	tari-world	tari	Tari World	f	\N	2023-05-24	2023-05-24
954f3156-21bd-449b-9c92-ac62015e8b57	tarmex	tarm	Tarmex	f	\N	2023-05-24	2023-05-24
4e732b17-685c-4224-b588-9a2b3a10c99b	tarot	tarot	Tarot	f	\N	2023-05-24	2023-05-24
8e0397b8-1d15-4c1f-a31f-ef60e0655429	taroverse	taro	Taroverse	f	\N	2023-05-24	2023-05-24
c3947cb8-0f16-4488-8dee-8174b1964c7f	tastenft	taste	TasteNFT	f	\N	2023-05-24	2023-05-24
321e050b-0d33-4c11-a890-0758162e2cab	tate	tate	TATE	f	\N	2023-05-24	2023-05-24
42c3d361-f537-4fab-9d35-d937feb70b1f	taxa-token	txt	Taxa Network	f	\N	2023-05-24	2023-05-24
d3815061-499f-4135-88c4-b933db115e15	tax-haven-inu	taxhaveninu	Tax Haven Inu	f	\N	2023-05-24	2023-05-24
e6ff30d9-7af8-46ae-a56b-7052a836b417	tbcc	tbcc	TBCC	f	\N	2023-05-24	2023-05-24
16b4b2e4-4a7f-4b0d-a7f8-ce8ff5bedb23	tbtc	tbtc	tBTC	f	\N	2023-05-24	2023-05-24
5eb60aec-a6f5-4925-8b69-97c50349dcb1	tcgcoin-2-0	tcg2	TCGCoin 2.0	f	\N	2023-05-24	2023-05-24
faafa3b1-f7df-43d0-8a83-1d255a97a84a	tcg-verse	tcgc	TCG Verse	f	\N	2023-05-24	2023-05-24
54d31dc7-68a3-43b9-a401-4b7164f8a226	tdoge	tdoge	τDoge	f	\N	2023-05-24	2023-05-24
83af405d-69e7-4138-9fa7-e33ce80af4a0	team-heretics-fan-token	th	Team Heretics Fan Token	f	\N	2023-05-24	2023-05-24
6a022f64-32ba-496d-9fc3-dcc4df5767dc	team-vitality-fan-token	vit	Team Vitality Fan Token	f	\N	2023-05-24	2023-05-24
1d12f710-14c3-4095-8808-a4b0668f638a	teaswap-art	tsa	Teaswap Art	f	\N	2023-05-24	2023-05-24
2bc78665-e81d-487d-9007-d8df795f298c	techpay	tpc	Techpay	f	\N	2023-05-24	2023-05-24
f4c9acfe-258d-4cda-b179-21370930afcc	tecracoin	tcr	TecraCoin ERC20	f	\N	2023-05-24	2023-05-24
7b4bb10f-5ebf-445d-a00b-6190d663bef1	tectonic	tonic	Tectonic	f	\N	2023-05-24	2023-05-24
85756916-67be-4ead-8386-6e851ac1135d	tectum	tet	Tectum	f	\N	2023-05-24	2023-05-24
64518838-69e8-47a9-a618-1cf360f666ef	ted-bnb	ted	TED BNB	f	\N	2023-05-24	2023-05-24
f37561a6-8ed9-4482-bf33-bfeb520e06ba	teddy-dog	tdg	Teddy Dog	f	\N	2023-05-24	2023-05-24
4315d54a-7410-4782-975b-63ad6da7b5f7	teddy-doge	teddy	Teddy Doge	f	\N	2023-05-24	2023-05-24
673e0b15-acb7-42b0-87f0-67498fc8130a	teddy-doge-v2	teddy v2	Teddy Doge V2	f	\N	2023-05-24	2023-05-24
d75189b4-5e0d-418c-bd8a-5ab783078c35	teddy-dollar	tsd	Teddy Dollar	f	\N	2023-05-24	2023-05-24
b84a1fcc-cf6b-4727-a028-0c615ac2ad57	te-food	tone	TE-FOOD	f	\N	2023-05-24	2023-05-24
e5d039e1-5d96-4bf5-ad0d-f07bd9670197	tegisto	tgs	Tegisto	f	\N	2023-05-24	2023-05-24
066aac05-8986-4432-bd95-d21e95099073	tegro	tgr	Tegro	f	\N	2023-05-24	2023-05-24
67a27e3e-efd7-42b9-85bb-b76a40a09feb	tehbag	bag	tehBag	f	\N	2023-05-24	2023-05-24
71a37eb0-f516-4882-8346-62cefd2d121c	teh-fund	fund	Teh Fund	f	\N	2023-05-24	2023-05-24
26ffa13b-5803-499b-9f0c-2cdea422e32e	teh-golden-one	gold 1	Teh Golden One	f	\N	2023-05-24	2023-05-24
fd8fd1cb-59c7-4b13-97ef-a0e50a8cb693	telcoin	tel	Telcoin	f	\N	2023-05-24	2023-05-24
279bdaf2-dcf3-4d85-b7df-d9812b7d57a2	telebridge	tb	TeleBridge	f	\N	2023-05-24	2023-05-24
532eae8f-2d2a-4167-91f5-4007b47f348d	telefy	tele	Telefy	f	\N	2023-05-24	2023-05-24
b38bdd1d-aa00-44e7-a92b-ffc2f03f3fc0	telegram-inu	tinu	Telegram Inu	f	\N	2023-05-24	2023-05-24
f991a1cc-a50c-41d4-a3f0-409572b54f89	teletreon	ttn	TeleTreon	f	\N	2023-05-24	2023-05-24
f8436ebf-53ae-47a4-a1bb-94d3bed2190b	tellor	trb	Tellor Tributes	f	\N	2023-05-24	2023-05-24
b88c5bd3-d1b9-43d5-929c-6d32402f7abc	telos	tlos	Telos	f	\N	2023-05-24	2023-05-24
b5f80b01-81db-4b2e-adc0-076859d63818	telos-coin	telos	Teloscoin	f	\N	2023-05-24	2023-05-24
e8ac484c-a613-4eb3-b8be-881e8e90413b	temco	temco	TEMCO	f	\N	2023-05-24	2023-05-24
cf72c32b-2db6-41e6-a3a3-8f959ae5cd7d	temdao	tem	TemDAO	f	\N	2023-05-24	2023-05-24
0647ca77-138f-4ae7-adbd-908445f47478	templardao	tem	Templar DAO	f	\N	2023-05-24	2023-05-24
07467b05-d7ba-4bc6-9558-2e2169ca8b9e	temple	temple	TempleDAO	f	\N	2023-05-24	2023-05-24
7533a5a2-94cf-417b-86ea-8f5cd218d3f9	tempus	temp	Tempus	f	\N	2023-05-24	2023-05-24
4ceff18e-dcb2-420c-8fcb-d7c6e5770141	temtem	tem	Temtum	f	\N	2023-05-24	2023-05-24
958d61fe-2982-461c-af65-7cb513cefed7	ten	tenfi	TEN	f	\N	2023-05-24	2023-05-24
a77e1759-414e-4adf-9604-59e8bd96cff1	ten-best-coins	tbc	Ten Best Coins	f	\N	2023-05-24	2023-05-24
851aadc0-23f7-419a-8f59-b0fe0f120c5e	tender-fi	tnd	Tender.fi	f	\N	2023-05-24	2023-05-24
dca54c2b-ee3d-4978-9db2-3bd35d3239a7	tenet-1b000f7b-59cb-4e06-89ce-d62b32d362b9	tenet	TENET	f	\N	2023-05-24	2023-05-24
0a694bc8-98cf-4885-a5b5-6b19cb7b5f30	tenset	10set	Tenset	f	\N	2023-05-24	2023-05-24
21c6c92e-eece-4052-af60-5cc5fe109e47	tenshi	tenshi	Tenshi	f	\N	2023-05-24	2023-05-24
75321e2b-ec97-40c8-85c7-b4746033039d	tenup	tup	Tenup	f	\N	2023-05-24	2023-05-24
16743d51-e26d-4eb4-9241-1cbd440b0f1f	tenx	pay	TenX	f	\N	2023-05-24	2023-05-24
9aa52628-f935-4b31-9d6a-2833e2897092	terablock	tbc	TeraBlock	f	\N	2023-05-24	2023-05-24
963cbf38-9012-40f5-a1c3-1a5c7ade7531	terareum	tera	Terareum [OLD]	f	\N	2023-05-24	2023-05-24
1c3217cd-083e-4809-93a2-9b5affe31490	terareum-2	tera2	Terareum	f	\N	2023-05-24	2023-05-24
0d927174-c112-4387-b57f-e382ac566411	tera-smart-money	tera	TERA	f	\N	2023-05-24	2023-05-24
0f9668b2-1f30-4dd8-95f8-4cad96431c85	teritori	tori	Teritori	f	\N	2023-05-24	2023-05-24
0f10b571-44ff-4d13-a269-7488b2a14c0f	ternio	tern	Ternio	f	\N	2023-05-24	2023-05-24
f3d7e949-b120-439c-b4e5-555ba495a9c9	terracoin	trc	Terracoin	f	\N	2023-05-24	2023-05-24
ffc3fd69-bb6f-48fc-8429-db8a2a1c4e4a	terraform-dao	terraform	Terraform DAO	f	\N	2023-05-24	2023-05-24
b26cbb31-7d32-4537-8ec8-37b9a0d8726c	terra-luna	lunc	Terra Luna Classic	f	\N	2023-05-24	2023-05-24
f41b3329-ceef-49d5-ab98-471414d5c873	terra-luna-2	luna	Terra	f	\N	2023-05-24	2023-05-24
7c082393-c07f-4c08-95c8-7f39ab3b216a	terra-name-service	tns	Terra Name Service	f	\N	2023-05-24	2023-05-24
d2de99d4-f478-49ae-a9ac-b22194cde519	terran-coin	trr	Terran Coin	f	\N	2023-05-24	2023-05-24
04cdab4a-8ba8-427e-9b39-faa49025319a	terra-poker-token	tpt	Terra Poker Token	f	\N	2023-05-24	2023-05-24
d87c1607-0d7b-47cc-befb-70e794d6ef49	terrausd	ustc	TerraClassicUSD	f	\N	2023-05-24	2023-05-24
a990b706-2eff-48b9-9e51-babfd017a583	terrausd-wormhole	ust	TerraUSD (Wormhole)	f	\N	2023-05-24	2023-05-24
ccbeadd1-96bf-4479-9af5-7ce6d56bcf28	tether	usdt	Tether	f	\N	2023-05-24	2023-05-24
c1d3585b-e3e2-496f-8cd4-adae442d0724	tether-6069e553-7ebb-487e-965e-2896cd21d6ac	zusdt	Zilliqa-bridged USDT	f	\N	2023-05-24	2023-05-24
1262257b-6de3-498c-bf75-adab9435e3fe	tether-avalanche-bridged-usdt-e	usdte	Tether Avalanche Bridged (USDT.e)	f	\N	2023-05-24	2023-05-24
01eefa1c-5a45-414d-a92e-913e27977d82	tether-eurt	eurt	Euro Tether	f	\N	2023-05-24	2023-05-24
7463755b-7a35-4958-82af-b44fe4279984	tether-gold	xaut	Tether Gold	f	\N	2023-05-24	2023-05-24
0f17d49b-6e3e-4960-a3e8-488ba579dc46	tether-plenty-bridge	usdt.e	Tether (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
5ffb3c3a-c1a7-4cb4-afea-784ca76bac4f	tether-pulsechain	usdt	Tether (PulseChain)	f	\N	2023-05-24	2023-05-24
c275994f-20b7-4165-9c9a-6a8cdaddff7a	tether-rainbow-bridge	usdt.e	Tether (Rainbow Bridge)	f	\N	2023-05-24	2023-05-24
47b99766-d4ad-411c-8e7b-0534c9ad77ff	tether-usd-celer	ceusdt	Tether USD - Celer	f	\N	2023-05-24	2023-05-24
e875a00c-9682-4dbb-9903-df6116077b44	tether-usd-pos-wormhole	usdtpo	Tether USD (PoS) (Wormhole)	f	\N	2023-05-24	2023-05-24
05f20887-9b10-4e05-90d7-d950b3e3b796	tether-usd-wormhole	usdtso	Tether USD (Wormhole)	f	\N	2023-05-24	2023-05-24
e60b7b69-3264-4280-ae7f-ee279002f526	tether-usd-wormhole-from-ethereum	usdtet	Tether USD (Wormhole from Ethereum)	f	\N	2023-05-24	2023-05-24
a201e181-ddc8-45a1-bd9b-e969ad3bfbc4	tethys-finance	tethys	Tethys Finance	f	\N	2023-05-24	2023-05-24
1cbc3562-b11c-4f6c-b740-fc8623f8f6f8	tetu	tetu	TETU	f	\N	2023-05-24	2023-05-24
baf47a0a-4e8e-4339-b156-f0f7914a9195	tetubal	tetubal	tetuBAL	f	\N	2023-05-24	2023-05-24
ab32d78c-ff5f-4ce5-81c3-07250b8ea829	tetuqi	tetuqi	tetuQi	f	\N	2023-05-24	2023-05-24
15d9a310-4e8b-4b32-b8f7-22ee67d855cc	texan	texan	Texan	f	\N	2023-05-24	2023-05-24
7a4c6cbd-b2ac-4c75-b4f5-19f6bb840423	tezos	xtz	Tezos	f	\N	2023-05-24	2023-05-24
a044e320-8d72-4fc8-8155-d32722054200	tezos-pepe	pepe	Tezos Pepe	f	\N	2023-05-24	2023-05-24
2ffb5551-b525-4539-931f-67d4774f19fd	tfs-token	tfs	TFS	f	\N	2023-05-24	2023-05-24
dfa26d42-7d6e-4fad-a698-729f3f0ef762	tg-dao	tgdao	TG DAO	f	\N	2023-05-24	2023-05-24
86b171d8-4514-4a6c-8c38-2e8a58fc2452	tgold	txau	tGOLD	f	\N	2023-05-24	2023-05-24
596392c6-fda3-43db-b5f0-c0e3dfa96ab2	tgrade	tgd	Tgrade	f	\N	2023-05-24	2023-05-24
eb36db3c-793f-4f0e-bede-20f2962197a2	thala	thl	Thala	f	\N	2023-05-24	2023-05-24
d8b8f3a8-d423-4aa2-9ce9-8bb70df9c29e	thales	thales	Thales	f	\N	2023-05-24	2023-05-24
f239e183-5458-4286-9e01-05396f9ae986	the-4th-pillar	four	4thpillar technologies	f	\N	2023-05-24	2023-05-24
9bb4a61a-41b3-4381-bb42-2f1812fd3aa3	the9	the9	THE9	f	\N	2023-05-24	2023-05-24
797ee5c3-b7f5-4db4-88c9-570794e801a3	the-abyss	abyss	Abyss	f	\N	2023-05-24	2023-05-24
7c2cf7fa-6684-45dd-ac9c-82cb60295844	the-amaze-world	amze	The Amaze World	f	\N	2023-05-24	2023-05-24
9b2113f5-5638-45bd-b427-9e4648ea5834	the-ape-society	society	The Ape Society	f	\N	2023-05-24	2023-05-24
96b084bc-38c5-4e5a-9090-db06df5505bf	the-apis	api	The APIS	f	\N	2023-05-24	2023-05-24
78e1e102-5ddd-42ca-b210-eb09e9666a2f	the-bet	bet	The Bet	f	\N	2023-05-24	2023-05-24
64683641-9fcf-4aad-b97b-a2fd866feae7	the-big-five	bft	The Big Five	f	\N	2023-05-24	2023-05-24
291ecfcf-350d-4a0b-989a-d9c96ac8ecab	the-box	box	The Box	f	\N	2023-05-24	2023-05-24
5e6292cc-0d84-49e1-a585-7b1764af5ea0	the-cat-inu	thecat	The Cat Inu	f	\N	2023-05-24	2023-05-24
0f275377-2bcc-4401-80fb-407094a34344	the-champcoin	tcc	The ChampCoin	f	\N	2023-05-24	2023-05-24
194272c0-6229-46c8-8775-247652c4da04	the-citadel	citadel	The Citadel	f	\N	2023-05-24	2023-05-24
b5404fcd-4d72-4975-b246-12636de2c20c	the-coop-network	gmd	The Coop Network	f	\N	2023-05-24	2023-05-24
28b25aea-f488-4c8d-8bb5-bc7eb3ce6311	the-corgi-of-polkabridge	corgib	The Corgi of PolkaBridge	f	\N	2023-05-24	2023-05-24
ad3ac1e6-82e1-48a8-a4b7-2bf086b00473	the-crypto-prophecies	tcp	The Crypto Prophecies	f	\N	2023-05-24	2023-05-24
494d5cbe-5e6a-4445-b9c6-0f1fa57f751d	the-crypto-you	milk	The Crypto You	f	\N	2023-05-24	2023-05-24
dedeb3ac-2312-4cab-b8f2-9992862e04d2	the-debt-box	debt	The Debt Box	f	\N	2023-05-24	2023-05-24
16656d9c-6799-484d-9fda-ac76437ef2d1	the-doge-nft	dog	The Doge NFT	f	\N	2023-05-24	2023-05-24
88013b9d-819a-4d0e-a85c-49164986f89d	the-employment-commons-work-token	work	The Employment Commons Work	f	\N	2023-05-24	2023-05-24
74f886da-5bb0-4b3d-8d1c-eba2065983b7	the-ennead	neadram	The Ennead	f	\N	2023-05-24	2023-05-24
3a9eb709-dae8-45f5-bf92-0239d3bea849	the-essential-coin	esc	The Essential Coin	f	\N	2023-05-24	2023-05-24
3154df29-c167-4889-a01b-adf16541f541	the-everlasting-parachain	elp	The Everlasting Parachain	f	\N	2023-05-24	2023-05-24
97619066-4014-48ec-8f66-77033f9df161	the-fire-token	xfr	The Fire	f	\N	2023-05-24	2023-05-24
5c2a953f-1329-493f-ac4d-831f846ff115	theflashcurrency	tfc	TheFlashCurrency	f	\N	2023-05-24	2023-05-24
9b066b4e-d4e6-4708-a4ae-6a29ceff5c58	the-forbidden-forest	forestplus	The Forbidden Forest	f	\N	2023-05-24	2023-05-24
d0f706e1-76f1-40f1-b6e9-96158627cc7d	theforce-trade	foc	TheForce Trade	f	\N	2023-05-24	2023-05-24
4fe98347-99d0-4a15-b012-fd8be858e09f	thefutbolcoin	tfc	TheFutbolCoin	f	\N	2023-05-24	2023-05-24
2bb13452-1dea-4f2a-9d3a-852c585ed673	the-graph	grt	The Graph	f	\N	2023-05-24	2023-05-24
fbfb08dc-8ed0-4910-a566-ce2899cdbed5	the-guest-list	tgl	The Guest List	f	\N	2023-05-24	2023-05-24
a03525dc-7de5-490f-ac3b-9d37208779d9	the-husl	husl	The HUSL	f	\N	2023-05-24	2023-05-24
2d2dd4f6-1127-4f83-9ece-55212d410d5b	the-killbox-game	kbox	The Killbox Game	f	\N	2023-05-24	2023-05-24
c610065f-408d-4930-9689-d9180b354276	the-kingdom-coin	tkc	The Kingdom Coin	f	\N	2023-05-24	2023-05-24
254ef84f-75fb-454d-af98-4ef113a93f2d	the-last-pepe	froggo	The Last Pepe	f	\N	2023-05-24	2023-05-24
17be0b4e-7245-4259-96a1-05a1b886ab3d	the-legend-of-deification	tlod	The Legend of Deification	f	\N	2023-05-24	2023-05-24
babfbb55-4169-4165-8beb-5634a5dbc4d9	the-mars	mrst	Mars Token	f	\N	2023-05-24	2023-05-24
9dc96384-4dcc-429a-b229-309555fc1a09	the-midas-touch-gold	tmtg	The Midas Touch Gold	f	\N	2023-05-24	2023-05-24
17797bed-6ba6-4ef1-a820-bf8ac7b5a4d1	the-monopolist	mono	The Monopolist	f	\N	2023-05-24	2023-05-24
cbed47fb-7103-4647-bb9e-5fbff6c620ec	thena	the	Thena	f	\N	2023-05-24	2023-05-24
106a84b8-ca52-429a-a75f-0ed769321e2d	the-neko	neko	The Neko	f	\N	2023-05-24	2023-05-24
b10e046a-e993-473b-b39a-995453c27bf2	the-next-world-coin	tnc	The Next World Coin	f	\N	2023-05-24	2023-05-24
4f51e5c9-8ed2-43bb-b7b5-becdc7278ffc	the-node	the	THENODE	f	\N	2023-05-24	2023-05-24
75fc2c4d-3585-4afe-b4fe-af6fce03207a	the-open-network	ton	Toncoin	f	\N	2023-05-24	2023-05-24
74c7a963-e96f-479a-9bca-b8be6032461e	theopetra	theo	Theopetra	f	\N	2023-05-24	2023-05-24
5f4e4458-e348-41fc-a2f1-a14861766abc	theos	theos	Theos	f	\N	2023-05-24	2023-05-24
8ad29478-937b-4cf6-b3b1-2e68f1b367dd	the-pablo-token	pablo	The Pablo	f	\N	2023-05-24	2023-05-24
aed6550d-6b32-4a4e-a5de-accd83946920	the-parallel	prl	The Parallel	f	\N	2023-05-24	2023-05-24
fc539fb2-5894-440b-aa2c-c949ac09773a	the-people-coin	peep$	The People’s Coin	f	\N	2023-05-24	2023-05-24
f87cf579-c899-4fcc-b8d5-b8f6c15ba423	thepepe-ai	ppai	ThePepe.AI	f	\N	2023-05-24	2023-05-24
b850c0a4-e8eb-4eaa-89d4-d5378005f92e	the-phoenix	fire	The Phoenix	f	\N	2023-05-24	2023-05-24
f7bfcb5f-3a1c-40aa-95a7-fa4f49f3e921	the-plant-dao	sprout	The Plant Dao	f	\N	2023-05-24	2023-05-24
664e1277-8a69-4453-9d0b-39b25edf845d	the-protocol	the	The Protocol	f	\N	2023-05-24	2023-05-24
7dc9c8b5-967a-479a-9c18-bbb5da61ddb5	the-randomdao	rnd	The RandomDAO	f	\N	2023-05-24	2023-05-24
a56e63ec-136b-4f6e-b9ec-eb6951d61184	the-reaper	rpr	The Reaper	f	\N	2023-05-24	2023-05-24
5a9e038a-ecb1-4601-b96b-b4a47c883f7d	the-rug-game	trg	The Rug Game	f	\N	2023-05-24	2023-05-24
062c8b31-bbf5-4be7-9966-48d0937b6985	the-sandbox	sand	The Sandbox	f	\N	2023-05-24	2023-05-24
04199d35-243e-4773-a07e-334c716c9636	the-sandbox-wormhole	sand	The Sandbox (Wormhole)	f	\N	2023-05-24	2023-05-24
a9412d57-7a4a-4317-8dd5-e0b848b3408b	the-sharks-fan-token	sharks	The Sharks Fan Token	f	\N	2023-05-24	2023-05-24
982c4f29-ee1b-4477-a845-a44cb48b56ea	thesolandao	sdo	TheSolanDAO	f	\N	2023-05-24	2023-05-24
17cd63f9-51de-4496-9236-696f99ad0517	thetadrop	tdrop	ThetaDrop	f	\N	2023-05-24	2023-05-24
4d30344c-8fd0-4a0b-a325-afd8164653cb	theta-fuel	tfuel	Theta Fuel	f	\N	2023-05-24	2023-05-24
49a2f433-b993-4922-aa01-05648012bbb0	thetan-arena	thg	Thetan Arena	f	\N	2023-05-24	2023-05-24
ba99178d-31eb-414e-90fb-9a7b9bb4cb35	thetan-coin	thc	Thetan Coin	f	\N	2023-05-24	2023-05-24
9bfb2e93-d2fd-45ee-933f-cc21f630eed1	theta-token	theta	Theta Network	f	\N	2023-05-24	2023-05-24
db723382-fe32-46e6-9e7b-a4d8d65dc8cf	the-three-kingdoms	ttk	The Three Kingdoms	f	\N	2023-05-24	2023-05-24
f6d8621e-61b5-419b-b400-c8bb31cd3059	the-tokenized-bitcoin	imbtc	The Tokenized Bitcoin	f	\N	2023-05-24	2023-05-24
8fc1596e-57ff-4847-9e77-e8329d59f1d1	the-virtua-kolect	tvk	The Virtua Kolect	f	\N	2023-05-24	2023-05-24
3828ee1b-2a3b-44b0-8d3b-e8a1252ee8a6	the-wasted-lands	wal	The Wasted Lands	f	\N	2023-05-24	2023-05-24
c86338b0-7ca2-4068-b168-85f2a77ca138	the-winkyverse	wnk	The Winkyverse	f	\N	2023-05-24	2023-05-24
43ab9984-f8ef-421a-ad44-39badf4e5546	the-world-state	w$c	World$tateCoin	f	\N	2023-05-24	2023-05-24
cf594026-6485-4be0-b220-fed17f8f5842	the-xenobots-project	xeno	The Xenobots Project	f	\N	2023-05-24	2023-05-24
8a5e7609-f28e-43c2-98c9-53534f15e621	the-youth-pay	typ	The Youth Pay	f	\N	2023-05-24	2023-05-24
c5cf2f18-ce58-4aa5-bf5c-7d864d29e99f	thingschain	tic	Thingschain	f	\N	2023-05-24	2023-05-24
54028fe2-d443-4e58-b11e-2bfcd1a6f584	thol-token	thol	AngelBlock	f	\N	2023-05-24	2023-05-24
02a9d02f-1796-4dbb-bc04-195f1a8eadbd	thor	thor	ThorFi	f	\N	2023-05-24	2023-05-24
a6214366-786d-43d6-b6fd-d93f9b650fbb	thorchain	rune	THORChain	f	\N	2023-05-24	2023-05-24
fdaf46cb-1faa-434f-bc88-fd14749148a6	thorchain-erc20	rune	THORChain (ERC20)	f	\N	2023-05-24	2023-05-24
4da58345-a72a-439b-ae03-b75351d425fb	thoreum-v2	thoreum	Thoreum V3	f	\N	2023-05-24	2023-05-24
3afe66de-a773-4b26-97af-53f340833cfa	thorstarter	xrune	Thorstarter	f	\N	2023-05-24	2023-05-24
a5243eaf-5238-4bd3-acac-c7f0b6daa08e	thorswap	thor	THORSwap	f	\N	2023-05-24	2023-05-24
8e581f8d-7dec-404d-987c-6556a9a817d0	thorus	tho	Thorus	f	\N	2023-05-24	2023-05-24
2b796d44-b51d-45fd-a40e-fc14fddb42bb	thorwallet	tgt	THORWallet DEX	f	\N	2023-05-24	2023-05-24
7478cca7-7653-4099-984a-227530fd5524	thought	tht	Thought	f	\N	2023-05-24	2023-05-24
71732d22-e3f3-4624-ab0f-b88da0a0dc2a	threefold-token	tft	ThreeFold	f	\N	2023-05-24	2023-05-24
5e68822c-b9c8-4bee-99ce-b0231bddbae3	threshold-network-token	t	Threshold Network	f	\N	2023-05-24	2023-05-24
e87ff1ba-d9bf-4ef1-b4a4-98aa9f4976f0	throne	thn	Throne	f	\N	2023-05-24	2023-05-24
23c02e12-3de4-4edd-bbc2-369a8b6e341a	thrupenny	tpy	Thrupenny	f	\N	2023-05-24	2023-05-24
e94d0a35-1b24-46ea-b961-4c6182afa0c3	thunderbnb	thunderbnb	ThunderBNB	f	\N	2023-05-24	2023-05-24
b25b46c1-b15f-40dc-a218-afb36d1feea9	thunder-lands	tndr	Thunder Lands	f	\N	2023-05-24	2023-05-24
e71df3c0-f720-49de-987a-a68d93b98be5	thunder-token	tt	ThunderCore	f	\N	2023-05-24	2023-05-24
7c4f9a95-b081-444f-a10e-9df1c32f153c	thx-network	thx	THX Network	f	\N	2023-05-24	2023-05-24
b7462872-a4b2-462a-a718-bcd0b2b5eabb	thxone	thx	thxone	f	\N	2023-05-24	2023-05-24
13261d04-b340-40bc-a072-176ba1647511	tia	tia	TIA	f	\N	2023-05-24	2023-05-24
50e344a9-1275-4f5a-b269-aa1497bdba85	tickr	tickr	Tickr	f	\N	2023-05-24	2023-05-24
9d80b6d2-282b-4bc0-a351-704be713d91c	tidal-finance	tidal	Tidal Finance	f	\N	2023-05-24	2023-05-24
20d1cfc2-23a8-45c2-b246-2774c64379ce	tidefi	tdfy	Tidefi	f	\N	2023-05-24	2023-05-24
336c0551-4084-4b7a-8b5d-1278d6d589f8	tidex-token	tdx	Tidex	f	\N	2023-05-24	2023-05-24
1b6b03c3-223f-43f5-8548-26a0296326fe	tierion	tnt	Tierion	f	\N	2023-05-24	2023-05-24
31029024-469a-4b55-95ca-656f478618a8	tifi-token	tifi	TiFi	f	\N	2023-05-24	2023-05-24
1622e0ae-2fd2-4a9e-ae6c-98dcda532cbf	tigercash	tch	TigerCash	f	\N	2023-05-24	2023-05-24
ba236a90-8940-4311-98e5-69e592a178b4	tiger-king	tking	Tiger King Coin	f	\N	2023-05-24	2023-05-24
513fff32-ea00-4754-8c27-7d26b8bab814	tiger-scrub-money-2	tiger	Tiger Scrub Money	f	\N	2023-05-24	2023-05-24
35cb3e07-a15f-4afc-8ebc-e68f210d2f55	tigres-fan-token	tigres	Tigres Fan Token	f	\N	2023-05-24	2023-05-24
16cbbb7b-faae-4249-8011-ef7e8775d7d7	tikky-inu	tikky	Tikky Inu	f	\N	2023-05-24	2023-05-24
25e4e14b-7df0-4f5f-a4d2-63ab72563131	tillage	till	Tillage	f	\N	2023-05-24	2023-05-24
bce7e8c8-8c46-4147-bcce-731ff2b5379c	tilwiki	tlw	TilWiki	f	\N	2023-05-24	2023-05-24
80f306fd-0ee3-4863-8c74-6770f46d2f0b	timechain-swap-token	tcs	Timechain Swap	f	\N	2023-05-24	2023-05-24
364a8f8e-11a9-4728-b106-f0d2ad862b39	timeleap-finance	time	Timeleap Finance	f	\N	2023-05-24	2023-05-24
03d6062e-f008-42db-a0b3-a0c4e1dea8d0	timeless	lit	Timeless	f	\N	2023-05-24	2023-05-24
b69cf3df-1c4e-4672-880b-9b9f64ec7570	time-new-bank	tnb	Time New Bank	f	\N	2023-05-24	2023-05-24
15b9bcca-50b8-42ff-83aa-a5578a1e51dc	timeseries-ai	timeseries	Timeseries AI	f	\N	2023-05-24	2023-05-24
8dbabac6-ccac-48c0-8947-bf9acbf1ab9c	tiny-bonez	t1ny	Tiny Bonez	f	\N	2023-05-24	2023-05-24
0bd9525e-876e-48b1-b562-a76152210c79	tiny-coin	tinc	Tiny Coin	f	\N	2023-05-24	2023-05-24
417dcf12-b34c-43f6-aba6-9ed696c75466	tiny-colony	tiny	Tiny Colony	f	\N	2023-05-24	2023-05-24
b2021e8a-0dbd-499e-9321-f54e97a8f9ea	tipja	tipja	Tipja	f	\N	2023-05-24	2023-05-24
0b3bac9b-90aa-439b-ab03-38af1dae8ac8	tipo-token	tipo	TIPO Token	f	\N	2023-05-24	2023-05-24
4959d82b-8d21-48dd-9786-dba150b927e6	tipsycoin	$tipsy	TipsyCoin	f	\N	2023-05-24	2023-05-24
caf39b92-4330-4aac-8f3d-3231cd462c4e	tiraverse	tvrs	TiraVerse	f	\N	2023-05-24	2023-05-24
fdc2186a-9fd5-4768-a6c5-d0ec71b96ec3	titan-coin	ttn	Titan Coin	f	\N	2023-05-24	2023-05-24
c4621a93-e0a9-4131-910d-68ee7b653672	titan-hunters	tita	Titan Hunters	f	\N	2023-05-24	2023-05-24
dec3ff32-e1be-43ea-bff7-be622cdc65de	titanswap	titan	TitanSwap	f	\N	2023-05-24	2023-05-24
061454f7-0cf4-40fb-83a9-2528ccaf8f96	titi-financial	titi	Titi Financial	f	\N	2023-05-24	2023-05-24
726b583f-15bc-49de-b97e-ae5534a6d63d	titi-protocol	titi	TiTi Protocol	f	\N	2023-05-24	2023-05-24
9c27d2ab-8d19-42dc-9854-52751c0dd621	title-network	tnet	Bitcoin Clashic	f	\N	2023-05-24	2023-05-24
385ec3a3-a35a-4512-b767-81b1899d0852	titter	titr	Titter	f	\N	2023-05-24	2023-05-24
770f10ab-2504-4adc-b196-ead12c952ea7	tlabs	tbs	TLabs	f	\N	2023-05-24	2023-05-24
c69c8c6f-a68f-48ce-a91f-2f803b1ebd7a	tlpt	tlpt	tLPT	f	\N	2023-05-24	2023-05-24
1487323d-696b-4054-bcf5-d3c048ac17c8	t-mac-dao	tmg	T-mac DAO	f	\N	2023-05-24	2023-05-24
10704f02-4a96-4b1f-af74-a75ff1b7ea68	tnc-coin	tnc	TNC Coin	f	\N	2023-05-24	2023-05-24
e8006f77-a2c2-4625-bae9-4ccdc31a0403	tnns	tnns	TNNS	f	\N	2023-05-24	2023-05-24
4a1c131a-0e79-4368-93bc-a656ac8dc773	toad-killer	$toad	Toad Killer	f	\N	2023-05-24	2023-05-24
63a389cb-e878-48fb-9983-91b4bcde7e4c	tocen	toce	Tocen	f	\N	2023-05-24	2023-05-24
2507bbb2-4c7b-4550-aafe-55e67fef5067	tokamak-network	ton	Tokamak Network	f	\N	2023-05-24	2023-05-24
b3bae1d2-522d-4be9-a62b-0f60b9b543fc	tokemak	toke	Tokemak	f	\N	2023-05-24	2023-05-24
8dab1e35-0988-4a8c-aef4-9501bbfcdce0	tokenasset	ntb	TokenAsset	f	\N	2023-05-24	2023-05-24
5b501c47-f4aa-4148-afe5-57bd0f5f6b51	tokenbot	tkb	TokenBot	f	\N	2023-05-24	2023-05-24
79670473-44fb-41bd-b8ce-0820edeb1525	tokencard	tkn	Monolith	f	\N	2023-05-24	2023-05-24
76aaf63e-1f69-4911-ad3d-e82d6a68d4a5	tokenclub	tct	TokenClub	f	\N	2023-05-24	2023-05-24
fe1b5e2d-b0de-4c22-a848-f91becafe82a	token-dforce-usd	usx	dForce USD	f	\N	2023-05-24	2023-05-24
9e81bb4c-b340-4462-82d4-5acf3470c60e	token-engineering-commons	tec	Token Engineering Commons	f	\N	2023-05-24	2023-05-24
8b016a64-8b11-47fa-af21-b3a1caf54297	tokengo	gpt	GoPower	f	\N	2023-05-24	2023-05-24
338d6991-6f36-4ce7-a587-6ba8a83fcb3b	tokenize-xchange	tkx	Tokenize Xchange	f	\N	2023-05-24	2023-05-24
741bc4f3-26fc-4d23-97f1-8a0258a66892	tokenlon	lon	Tokenlon	f	\N	2023-05-24	2023-05-24
76999786-ba9f-4c83-8971-d0ab93a28eb8	tokenomy	ten	Tokenomy	f	\N	2023-05-24	2023-05-24
5863d140-b42d-43b2-9c61-49cfbff76345	tokenplace	tok	Tokenplace	f	\N	2023-05-24	2023-05-24
549e25df-d6ab-40c9-aa77-83024c19b9af	tokenplay	top	Tokenplay	f	\N	2023-05-24	2023-05-24
7ade5fdb-2cd9-4a6e-b056-4c70c5e380c3	token-pocket	tpt	TokenPocket Token	f	\N	2023-05-24	2023-05-24
e3c773f9-ec70-4e61-be5c-88e575c2e874	tokerr	tokr	Tokerr	f	\N	2023-05-24	2023-05-24
89945bb1-05d0-4017-a347-feeeb87221b0	tokhit	hitt	TOKHIT	f	\N	2023-05-24	2023-05-24
514253b2-a7fc-4153-ade9-925515c6b120	toko	toko	Tokoin	f	\N	2023-05-24	2023-05-24
66f6e058-dac4-4685-b436-359ba67bc49b	tokocrypto	tko	Tokocrypto	f	\N	2023-05-24	2023-05-24
e61cf4d2-25f0-49af-b113-ddcd95f6c28d	tokpie	tkp	TOKPIE	f	\N	2023-05-24	2023-05-24
f8d1f41e-1486-498f-a7ab-d6028e17caf0	toku	toku	Toku	f	\N	2023-05-24	2023-05-24
8ac6bb93-5cdf-4a55-ade5-bfcce5fbb39d	tokyo	tokc	Tokyo Coin	f	\N	2023-05-24	2023-05-24
d4f0c29c-8069-4fd5-a236-e79626db4dac	tokyo-au	tokau	Tokyo AU	f	\N	2023-05-24	2023-05-24
b87fb4ec-09a0-42a8-8d10-732b9e395ec3	tolar	tol	Tolar	f	\N	2023-05-24	2023-05-24
70727976-ebe8-42f1-bbc9-6a0c8e85ec5e	tomato-coin	bptc	Tomato Coin	f	\N	2023-05-24	2023-05-24
4d2e7043-16e7-42ee-9167-5c987be28c0b	tomb	tomb	Tomb	f	\N	2023-05-24	2023-05-24
5901ce06-ef8f-4eec-87b0-ef5717f79ff7	tomb-shares	tshare	Tomb Shares	f	\N	2023-05-24	2023-05-24
43f63fb7-0757-47cf-883a-5ec10b37b35e	tom-coin	tmc	Tom Coin	f	\N	2023-05-24	2023-05-24
fa44a8b7-d626-4f55-814f-b919d88c160e	tom-finance	tom	TOM Finance	f	\N	2023-05-24	2023-05-24
b60eb526-8db4-4eda-a5b4-5c486b9ba1b1	tominet	tomi	tomiNet	f	\N	2023-05-24	2023-05-24
2b25dcc6-0219-43fb-ae3c-c1dd4124ec6e	tomochain	tomo	TomoChain	f	\N	2023-05-24	2023-05-24
84ec14b5-9c62-4e67-a7ef-20365a45ee67	tomoe	tomoe	TomoChain ERC-20	f	\N	2023-05-24	2023-05-24
a825aeca-3e2b-49f2-99d2-0a2d3a105fae	tomtomcoin	toms	TomTomCoin	f	\N	2023-05-24	2023-05-24
44f9c33f-c7b3-4b43-b284-fc4824637b6f	tonestra	tnr	Tonestra	f	\N	2023-05-24	2023-05-24
f6a9f2ad-9edf-4d1b-9c37-4dde15fb2f20	tongtong-coin	ttc	Tongtong Coin	f	\N	2023-05-24	2023-05-24
5e4c47f9-7826-421b-93e8-42839c2768bc	tonstarter	tos	TONStarter	f	\N	2023-05-24	2023-05-24
c0509207-865a-40e8-80e8-955381069ee3	tontoken	ton	TON Community	f	\N	2023-05-24	2023-05-24
4e2f799a-eace-4be1-a133-8fcc5a97f742	toobcoin	toob	Toobcoin	f	\N	2023-05-24	2023-05-24
e7f9ffca-3914-44f5-978e-4456a0f36959	tools	tools	TOOLS	f	\N	2023-05-24	2023-05-24
5a69d130-96b2-4075-bd8d-d5a1e8d7f89e	topdown-survival-shooter	shooter	TopDown Survival Shooter	f	\N	2023-05-24	2023-05-24
eeb59a35-4ebf-42af-a4a6-b4e5eedd57a1	topgoal	goal	TopGoal	f	\N	2023-05-24	2023-05-24
2f1a08e9-1395-4ac3-96b5-c16e4ed79858	topmanager	tmt	TopManager	f	\N	2023-05-24	2023-05-24
0b1f7df5-a4b9-4140-bf88-d22a1b2e28bf	top-network	top	TOP Network	f	\N	2023-05-24	2023-05-24
0b9ee878-dd67-4224-bb74-b0ef9f821e84	topshelf-finance	liqr	Topshelf Finance	f	\N	2023-05-24	2023-05-24
68a02d82-1c81-4929-bfb8-d0792df69999	toptrade	ttt	TopTrade	f	\N	2023-05-24	2023-05-24
f935b4a5-23ea-41f8-b02b-373d426bccab	tor	tor	TOR	f	\N	2023-05-24	2023-05-24
876b6c01-c3f1-4bdd-ba2b-55277846ab22	tora	tora	TORA	f	\N	2023-05-24	2023-05-24
9059bb8b-cb8e-44f7-9174-d81ce0112bf8	tora-inu	tora	Tora Inu	f	\N	2023-05-24	2023-05-24
5e5d5f19-5dc8-4b30-a543-987153f78a28	torekko	trk	Torekko	f	\N	2023-05-24	2023-05-24
4a9ef9d2-f057-49a3-837d-4d23e967444c	toreus-finance	tore	Toreus Finance (OLD)	f	\N	2023-05-24	2023-05-24
36a76c4c-1bd6-4ccd-9366-b52bfaa1e767	toreus-finance-2	tore	Toreus Finance	f	\N	2023-05-24	2023-05-24
73b36070-ed6b-400c-9467-1a76817bea39	torg	torg	TORG	f	\N	2023-05-24	2023-05-24
99916863-80dc-43b4-92f1-2b0ef403180d	tornado-cash	torn	Tornado Cash	f	\N	2023-05-24	2023-05-24
b49f49c8-9d1c-41d1-a39c-3e1300c240bf	tortuga-staked-aptos	tapt	Tortuga Staked Aptos	f	\N	2023-05-24	2023-05-24
69ea0290-f4f5-449f-824a-2d2f57909974	torum	xtm	Torum	f	\N	2023-05-24	2023-05-24
f431b816-6342-4199-a051-9cd24b6b6075	tor-wallet	tor	Tor Wallet	f	\N	2023-05-24	2023-05-24
69870870-d580-4169-92bb-9978fe4827b8	tosa-inu	tos	Tosa Inu	f	\N	2023-05-24	2023-05-24
00bb0386-bc3c-4101-bc1e-8b690f73e750	tosdis	dis	TosDis	f	\N	2023-05-24	2023-05-24
3ac9cbea-4d27-4e07-9669-e1d944fde907	toshi-tools	toshi	Toshi Tools	f	\N	2023-05-24	2023-05-24
994ebde6-8446-4df9-8b46-81d824aa9f8e	tosidrop	ctosi	TosiDrop	f	\N	2023-05-24	2023-05-24
b8a5d9d7-91da-4e4b-a16e-69e39b15d28f	total-crypto-market-cap-token	tcap	Total Crypto Market Cap	f	\N	2023-05-24	2023-05-24
7d7bd30b-c7d2-4f5b-b6dc-0992fadc931b	totemfi	totm	TotemFi	f	\N	2023-05-24	2023-05-24
604b547b-cb15-463d-ba2e-3e9d9863145f	to-the-moon-token	ton	To The Moon Token	f	\N	2023-05-24	2023-05-24
060c4910-8016-47e4-bc59-711b30cfd3e6	totocat	totocat	Totocat	f	\N	2023-05-24	2023-05-24
3111ccc4-72db-4c1d-8415-b75c26b96a96	totoro-inu	totoro	Totoro Inu	f	\N	2023-05-24	2023-05-24
e70a1491-4473-4216-962d-2dbb5502a5cc	toucan-protocol-base-carbon-tonne	bct	Toucan Protocol: Base Carbon Tonne	f	\N	2023-05-24	2023-05-24
985dfff9-5c5e-41c1-9135-f87cb0c65e93	toucan-protocol-nature-carbon-tonne	nct	Toucan Protocol: Nature Carbon Tonne	f	\N	2023-05-24	2023-05-24
f9e66cca-a530-4a67-b85c-61cc24b89018	touchcon	toc	TouchCon	f	\N	2023-05-24	2023-05-24
d444c3d3-efeb-4fb8-8d6e-84cc85dfad88	tourismx	trmx	TourismX	f	\N	2023-05-24	2023-05-24
c3761705-54af-4616-a556-16a2002aec76	tourist-shiba-inu	tourists	Tourist Shiba Inu	f	\N	2023-05-24	2023-05-24
70192bb4-09a0-4b28-becd-70bfdc65f968	tower	tower	Tower	f	\N	2023-05-24	2023-05-24
9b83f360-5f69-4567-8787-d43a65a7dedb	town-star	town	Town Star	f	\N	2023-05-24	2023-05-24
828f117d-feaf-4c4c-a09b-25d071371b5d	toxicdeer-finance	deer	ToxicDeer Finance	f	\N	2023-05-24	2023-05-24
bfb3e1bc-3fe6-406f-852a-c99c51c055ef	toxicdeer-share	xdshare	ToxicDeer Share	f	\N	2023-05-24	2023-05-24
0484fbb7-5c42-434b-967d-df8f79b3cfa8	tpro	tpro	TPRO	f	\N	2023-05-24	2023-05-24
db9cfcb2-ee29-43d0-9d83-5bb813e87c2b	tp-swap	tp	Token Swap	f	\N	2023-05-24	2023-05-24
731d3763-c330-43d1-a96a-922c12dcf7c1	tr3zor	tr3	Tr3zor	f	\N	2023-05-24	2023-05-24
ba39a07e-2b16-4558-98da-ed63ec16f1a8	trabzonspor-fan-token	tra	Trabzonspor Fan Token	f	\N	2023-05-24	2023-05-24
6ccf991c-deef-4389-80ba-3de949ec5175	trac	trac	TRAC (Ordinals)	f	\N	2023-05-24	2023-05-24
bf9950fb-57f0-48d0-8392-48a8c7085ab1	trace-network-labs	trace	Trace Network Labs	f	\N	2023-05-24	2023-05-24
8e5dfa14-6e82-49bf-b432-e21d12d2f90e	tracer	trc	Tracer	f	\N	2023-05-24	2023-05-24
ef17766c-9685-4c53-86f8-c52f8a100bb8	tracer-dao	tcr	Tracer DAO	f	\N	2023-05-24	2023-05-24
40199cd3-24f8-4c2d-835b-d6ca9e544e97	trackers-token	trt	Trackers Token	f	\N	2023-05-24	2023-05-24
4934646c-8ad6-4e09-906a-06b3268454ab	tradao	tod	Trava Capital	f	\N	2023-05-24	2023-05-24
63b61cf5-7fdf-48c0-b96e-305a9d75e40b	tradeflow	tflow	TradeFlow	f	\N	2023-05-24	2023-05-24
9ec09d0c-127a-494d-8224-7ce05dcdba93	trade-leaf	tlf	Tradeleaf	f	\N	2023-05-24	2023-05-24
60fef68e-9785-43da-bfde-8489cbb84426	traderdao-proof-of-trade	pot	TraderDAO Proof Of Trade	f	\N	2023-05-24	2023-05-24
5a9de79f-b2df-44df-ba24-d77ed9392772	traders-coin	trdc	Traders Coin	f	\N	2023-05-24	2023-05-24
a18e2389-8900-4cb2-9436-6ee4fb8046c5	tradestars	tsx	TradeStars	f	\N	2023-05-24	2023-05-24
507418af-3851-4bb2-bd9d-85b64bc699ed	trade-tech-ai	ttai	Trade Tech AI	f	\N	2023-05-24	2023-05-24
6cee9b22-f363-41cc-b0da-4c37136b25e0	tradewix	wix	TradeWix	f	\N	2023-05-24	2023-05-24
7a99d14b-3069-4396-b0d3-6a60d9b09c7d	tradix	tx	Tradix	f	\N	2023-05-24	2023-05-24
af68ac13-e268-42d4-9224-1aea0d7b7ac5	tranche-finance	slice	Tranche Finance	f	\N	2023-05-24	2023-05-24
546a0f67-60e2-4d22-9453-bde47ef1c1f9	tranchess	chess	Tranchess	f	\N	2023-05-24	2023-05-24
87433b68-04f1-46c4-b285-ce3e69116027	tranquil-finance	tranq	Tranquil Finance	f	\N	2023-05-24	2023-05-24
e9ff2560-5474-487e-ab15-afba301bfe79	tranquility-city	lumen	Tranquility City	f	\N	2023-05-24	2023-05-24
045d1117-c44f-4ed0-9f70-9480b1efb380	tranquil-staked-one	stone	Tranquil Staked ONE	f	\N	2023-05-24	2023-05-24
913c0f1b-fab1-4390-9779-6c30a5514036	transcodium	tns	Transcodium	f	\N	2023-05-24	2023-05-24
673c96cd-1ef9-43b7-bab7-35c59763b7b4	transhuman-coin	thc	Transhuman Coin	f	\N	2023-05-24	2023-05-24
8b591a1f-5d25-40de-ab7c-2cb7b9414b65	trava-finance	trava	Trava Finance	f	\N	2023-05-24	2023-05-24
f18070b9-9ae6-4416-9032-c340cac13207	travel-care-2	travel	Travel Care	f	\N	2023-05-24	2023-05-24
3dad0dce-68fc-4ff1-a480-943a05364467	traxx	traxx	Traxx	f	\N	2023-05-24	2023-05-24
28ecd9e2-b769-4432-b684-a17ecfad4775	trazable	trz	Trazable	f	\N	2023-05-24	2023-05-24
f7c9ebb7-e2cf-41ea-ab4d-19c9670d0b39	treasure-under-sea	tus	Treasure Under Sea	f	\N	2023-05-24	2023-05-24
c0a226cd-f6a5-4915-887f-c2b5cccf936c	treasury-bond-eth-tokenized-stock-defichain	dtlt	iShares 20+ Year Treasury Bond ETF Defichain	f	\N	2023-05-24	2023-05-24
8d8e4c8e-34f3-40e2-b9e1-a5c1764f5438	treat	treat	Treat	f	\N	2023-05-24	2023-05-24
4347605f-86d1-47b6-879e-9319e42df52d	treatdao-v2	treat	TreatDAO	f	\N	2023-05-24	2023-05-24
f676a4dc-3402-494f-bb3c-c9d518edd5b1	treeb	treeb	Retreeb	f	\N	2023-05-24	2023-05-24
3c919283-3016-46a1-baef-f181d049b25a	treecle	trcl	Treecle	f	\N	2023-05-24	2023-05-24
5233ce68-9c1f-4949-8057-17c0ca1ab003	trellis	treis	Trellis	f	\N	2023-05-24	2023-05-24
2ce21ee3-3092-4907-a95b-c691786b2115	trendai	trendai	TrendAI	f	\N	2023-05-24	2023-05-24
36f1c88c-945b-4882-bea3-0c415fec1c1c	trendsy	trndz	Trendsy	f	\N	2023-05-24	2023-05-24
dfc122c5-f058-48ca-b774-9e9c2f08eb9f	trend-x	trendx	Trend X	f	\N	2023-05-24	2023-05-24
acb5c0b4-9c98-4b80-84f5-53bf432e03f9	trezarcoin	tzc	TrezarCoin	f	\N	2023-05-24	2023-05-24
fb59afda-f2b1-401c-b91b-3f711b673af6	triall	trl	Triall	f	\N	2023-05-24	2023-05-24
9fac7859-05e5-41e5-8e8e-7f628a5c3e99	trias-token	trias	TriasLab	f	\N	2023-05-24	2023-05-24
1184ca31-7dca-48e1-ba6d-81572f47e7bf	tribal-token	tribl	Tribal Token	f	\N	2023-05-24	2023-05-24
42186f54-2ed0-4d6e-ac72-4e597664a70e	tribar	xtri	Tribar	f	\N	2023-05-24	2023-05-24
4f940ab2-4758-4d0a-8c13-15ee08100857	tribe-2	tribe	Tribe	f	\N	2023-05-24	2023-05-24
71bd84e7-df70-4793-b044-13ddaddabf7d	tribeone	haka	TribeOne	f	\N	2023-05-24	2023-05-24
e2163291-0bcb-49c8-9bb3-4a5befba33bb	tribe-token	tribex	Tribe Token	f	\N	2023-05-24	2023-05-24
99fc006f-271e-4b1e-86e3-9e78ab4a8caa	trice	tri	Trice	f	\N	2023-05-24	2023-05-24
86ef1fa8-4955-42cd-ba0d-87bf5e476677	trickle	h2o	Trickle	f	\N	2023-05-24	2023-05-24
e02e2f01-3d4f-4165-bd14-158195fb4771	tridentdao	psi	TridentDAO	f	\N	2023-05-24	2023-05-24
a0bbc214-ab02-4df9-bb25-184274ff1d66	triipmiles	tiim	TriipMiles	f	\N	2023-05-24	2023-05-24
c4b5b356-d9c1-472b-bbc0-261b9108e1ae	trillioner	tlc	Trillioner	f	\N	2023-05-24	2023-05-24
b15c9b99-2a1c-44ec-88bb-9f97e4c5490b	trillium	tt	Trillium	f	\N	2023-05-24	2023-05-24
578260ca-de97-40f2-ab55-0c499810d207	trinity-network-credit	tnc	Trinity Network Credit	f	\N	2023-05-24	2023-05-24
eb5272bc-45eb-4534-b239-4c8a1841fc63	trips-community	trips	Trips Community	f	\N	2023-05-24	2023-05-24
60a7da53-4a91-45a2-b323-24665cc18ff9	trism	trism	Trism	f	\N	2023-05-24	2023-05-24
ff1edfd8-b8c8-4a8c-9716-50ab70591907	trisolaris	tri	Trisolaris	f	\N	2023-05-24	2023-05-24
88261583-a7c9-4af4-a628-f91e730dabac	triton	xeq	Equilibria	f	\N	2023-05-24	2023-05-24
357545c4-9825-4bc9-929d-d3c8f74d2338	triumphx	trix	TriumphX	f	\N	2023-05-24	2023-05-24
19792508-93cc-4f66-b6b4-3bf5578ef181	trivian	trivia	Trivians	f	\N	2023-05-24	2023-05-24
1e46d73f-ec07-45ae-9fc3-fd700fd14c99	trolite	trl	Trolite	f	\N	2023-05-24	2023-05-24
671a7929-f4f7-4970-b321-7bb3afeeafd1	troll	troll	Troll	f	\N	2023-05-24	2023-05-24
5e09c875-8560-45f3-a3d9-6eead28dedab	trollbox	tox	trollbox	f	\N	2023-05-24	2023-05-24
09de58cd-3965-48a0-a335-670cc75eb051	troll-face	troll	Troll Face	f	\N	2023-05-24	2023-05-24
fe46e75e-7def-453e-ae15-5eee25681ec1	tron	trx	TRON	f	\N	2023-05-24	2023-05-24
fc43c33b-bb28-456f-9a5e-a2529d21e93b	tronai	tai	TronAI	f	\N	2023-05-24	2023-05-24
0a978267-4556-4fb0-9d85-3996fad2dfd9	tronbetlive	live	TRONbetLive	f	\N	2023-05-24	2023-05-24
9206e45a-beec-4de4-a2bb-e42e30d5e844	tron-bsc	trx	TRON (BSC)	f	\N	2023-05-24	2023-05-24
068e3ded-193f-4c21-bb63-1335e1831d4d	tronclassic	trxc	TronClassic	f	\N	2023-05-24	2023-05-24
3e9b4942-a5da-4e61-8817-b3c70b752ca0	troneuroperewardcoin	terc	TronEuropeRewardCoin	f	\N	2023-05-24	2023-05-24
673b1df2-ebf0-4acb-9395-c615058bf28e	tronpad	tronpad	TRONPAD	f	\N	2023-05-24	2023-05-24
d356d464-0d5f-43dd-9479-e69b70ea488e	tropical-finance	daiquiri	Tropical Finance	f	\N	2023-05-24	2023-05-24
5bae531c-ca8d-4750-b0fd-296f770c0adc	troy	troy	TROY	f	\N	2023-05-24	2023-05-24
6cefc2e7-8363-4d34-9b41-0fbb7fa29100	trubadger	trubgr	TruBadger	f	\N	2023-05-24	2023-05-24
f6e92c87-a652-41b3-8953-6144a25e8f4c	truebit-protocol	tru	Truebit Protocol	f	\N	2023-05-24	2023-05-24
aad05b0a-38e6-4296-81d4-ba9341d2bb2b	true-chain	true	TrueChain	f	\N	2023-05-24	2023-05-24
31c1ea4b-4ab7-4c10-8f45-4c313cc5eb34	truecnh	tcnh	TrueCNH	f	\N	2023-05-24	2023-05-24
e0830323-6e69-41cb-8c42-765219de9c08	truedeck	tdp	TrueDeck	f	\N	2023-05-24	2023-05-24
853371a8-15bf-44c1-8c4e-69f14508bd81	truefeedbackchain	tfbx	Truefeedback	f	\N	2023-05-24	2023-05-24
b1b1aa82-1ac2-4dbd-804e-36c98e2d74a9	truefi	tru	TrueFi	f	\N	2023-05-24	2023-05-24
8366f4d8-0ef5-427c-b515-deeb9c75888b	truefreeze	frz	TrueFreeze	f	\N	2023-05-24	2023-05-24
58f0cec7-ca0b-4f12-b734-bca76b934e33	true-pnl	pnl	True PNL	f	\N	2023-05-24	2023-05-24
93a535e9-178f-40e2-b7be-01021728f76c	true-usd	tusd	TrueUSD	f	\N	2023-05-24	2023-05-24
3d4869e7-457b-42c4-b305-233726d059ff	trumparmy	trumparmy	TrumpArmy	f	\N	2023-05-24	2023-05-24
6d9e5022-4f90-4345-b59d-2fe20ad20dae	trumpceo	trumpceo	TrumpCEO	f	\N	2023-05-24	2023-05-24
2f679278-d997-4fad-992b-a36c725dc3d9	trumpcoin-709b1637-4ceb-4e9e-878d-2b137bee017d	dtc	TrumpCoin	f	\N	2023-05-24	2023-05-24
b67589b4-f0d5-4429-b5fd-2a618d9907e7	trustbase	tbe	TrustBase	f	\N	2023-05-24	2023-05-24
44307dcb-805a-493a-80a7-82ceea769872	trustbit-finance	trs	TrustBit Finance	f	\N	2023-05-24	2023-05-24
c0c327cb-b836-43bb-8324-bf3aef891240	trusted-node	tnode	Trusted Node	f	\N	2023-05-24	2023-05-24
4de2e66a-750f-4d44-9ba8-cbf2e70fce47	trustfi-network-token	tfi	TrustFi Network	f	\N	2023-05-24	2023-05-24
0e4b6324-b822-4528-814d-f98de73ce5a1	trustnft	trustnft	TrustNFT	f	\N	2023-05-24	2023-05-24
44f1d5c8-4dcc-4002-bc30-4a54ef583645	trustpad	tpad	TrustPad	f	\N	2023-05-24	2023-05-24
3526831d-32cd-4cdb-9c8c-8de46f3c5860	trustpay	tph	Trustpay	f	\N	2023-05-24	2023-05-24
7e161ea4-ec39-49a6-9e45-d4b5882d91bb	trustswap	swap	Trustswap	f	\N	2023-05-24	2023-05-24
bd2c6ba2-2434-49d6-9ee3-838aacddc3da	trustverse	trv	TrustVerse	f	\N	2023-05-24	2023-05-24
9f046f71-7622-4689-8a61-453031ededc5	trust-wallet-token	twt	Trust Wallet	f	\N	2023-05-24	2023-05-24
e0d2b225-8146-479e-b08d-d09f7c77b36e	truthgpt	truth	TruthGPT	f	\N	2023-05-24	2023-05-24
2ac17f53-360b-49ff-a448-917e5d82bf1c	truthgpt-bsc	truth	TruthGPT (BSC)	f	\N	2023-05-24	2023-05-24
21b29364-0b14-4ceb-891e-61657d93d34e	truth-seekers	truth	Truth Seekers	f	\N	2023-05-24	2023-05-24
15215065-4e5e-4615-9ff6-57d5635d786e	trx3l	trx3l	TRX3L	f	\N	2023-05-24	2023-05-24
4b559300-bdde-4f9d-90da-9f158720e5ee	tryc	tryc	TRYC	f	\N	2023-05-24	2023-05-24
7c9193c5-5b92-40aa-85ca-656fca3ff3a3	tryhards	try	TryHards	f	\N	2023-05-24	2023-05-24
74f4a021-d946-4de1-97d7-6bf0eac2fc0f	tryvium-2	tryv	Tryvium	f	\N	2023-05-24	2023-05-24
4868da5b-a2cb-46fa-bf46-42119f4a7f89	tsilver	txag	tSILVER	f	\N	2023-05-24	2023-05-24
c5bbd86c-a542-4195-ba74-5af9f8bf6288	tsuki-inu	tkinu	Tsuki Inu	f	\N	2023-05-24	2023-05-24
d48397a5-e5e2-4336-8717-9dfb77dd5044	tsuki-no-usagi	gyokuto	Tsuki no usagi	f	\N	2023-05-24	2023-05-24
ae557566-f8e5-4896-80a2-935f194666f2	ttcoin	tc	TTcoin	f	\N	2023-05-24	2023-05-24
7805bfea-de8e-4118-b148-33ee59e957ca	ttc-protocol	maro	Maro	f	\N	2023-05-24	2023-05-24
300746fe-1f65-416b-bc44-aaec4fa4386d	ttx-metaverse	xmeta	TTX Metaverse	f	\N	2023-05-24	2023-05-24
504cb905-f413-4ded-8835-e4420551e70f	tudabirds	burd	tudaBirds	f	\N	2023-05-24	2023-05-24
636d1b10-8120-440e-b533-f125f230c005	tuf-token	tuf	TUF Token	f	\N	2023-05-24	2023-05-24
77039a0d-9a03-4633-a29d-e2af2cbf144f	tundra-token	tundra	Tundra	f	\N	2023-05-24	2023-05-24
db475340-59cb-49b0-b679-d15f2f9ebaf0	tune-fm	jam	Tune.Fm	f	\N	2023-05-24	2023-05-24
0250b794-7494-41a3-b6e2-5ea6975aa4e0	tupan	tupan	Tupan	f	\N	2023-05-24	2023-05-24
96f57de3-9e5e-455c-9243-c670e9f5720c	turbo	turbo	Turbo	f	\N	2023-05-24	2023-05-24
f761149d-ab04-4bca-b2f0-ea6b57fd5605	turbos-finance	turbos	Turbos Finance	f	\N	2023-05-24	2023-05-24
4eeeb697-91c6-4e1f-8c49-a381e63695c5	turbo-wallet	turbo	Turbo Wallet	f	\N	2023-05-24	2023-05-24
2a004a8c-1eb6-4749-8e54-ee5e5b57e76b	turex	tur	Turex	f	\N	2023-05-24	2023-05-24
083b23e7-50eb-4952-9ac3-dff528233ce6	turismo-ai	turai	Turismo AI	f	\N	2023-05-24	2023-05-24
cf14e153-b32a-4872-b534-6f072445510c	turkiye-basketbol-federasyonu-token	tbft	Türkiye Basketbol Federasyonu Fan Token	f	\N	2023-05-24	2023-05-24
a110a41c-184b-4658-b4dc-5d9b103ef097	turkiye-motosiklet-federasyonu-fan-token	tmft	Türkiye Motosiklet Federasyonu Fan Token	f	\N	2023-05-24	2023-05-24
cdc00b4a-cc0a-4bdd-ab8f-eb6534779dff	turk-shiba	tushi	Turk Shiba	f	\N	2023-05-24	2023-05-24
a1c54170-2c0e-43ee-b5c8-440ad5ffd9dd	turtlecoin	trtl	TurtleCoin	f	\N	2023-05-24	2023-05-24
4bb810dd-e338-4e5f-9e11-f77a2bca2fc5	turtles-token	trtls	Turtles	f	\N	2023-05-24	2023-05-24
1fbe0abf-9172-43d3-9e99-3ed5fb14fb1a	tusd-yvault	yvtusd	TUSD yVault	f	\N	2023-05-24	2023-05-24
c71a6b20-bcad-4a6c-a59b-d97397421406	tutela	tutl	Tutela	f	\N	2023-05-24	2023-05-24
bcb07e76-ef06-4a90-9657-bbf8b1046b18	tutellus	tut	Tutellus	f	\N	2023-05-24	2023-05-24
ccdd7768-d0f7-4464-826d-80ba9babe7f6	tutti-frutti-finance	tff	Tutti Frutti	f	\N	2023-05-24	2023-05-24
21557fd0-906a-437b-94b5-1ec4453badb6	tvt	tvt	TVT	f	\N	2023-05-24	2023-05-24
f56c4d40-6d12-4d19-a5e9-8054a59eb7f3	twelve-legions	ctl	Twelve Legions	f	\N	2023-05-24	2023-05-24
18aaf757-3461-44bb-92a8-f081a08cabd1	twelve-zodiac	twelve	Twelve Zodiac	f	\N	2023-05-24	2023-05-24
7f2d4345-99d7-4c46-9c97-1ddc7a84bf59	twirl-governance-token	tgt	Twirl Governance	f	\N	2023-05-24	2023-05-24
feb527f1-31df-410d-baa6-002756c93d22	twister-finance	twst	Twister Finance	f	\N	2023-05-24	2023-05-24
fc68aa00-2c0d-46b0-8d7d-3dfed47b20f3	twitfi	twt	Twitfi	f	\N	2023-05-24	2023-05-24
0e01823f-5809-4199-b391-1425dcdfbb9f	twitter-ceo-floki	flokiceo	Twitter CEO Floki	f	\N	2023-05-24	2023-05-24
b9032397-6d3b-424f-88a0-c11622aba00a	two-monkey-juice-bar	$tmon	Two Monkey Juice Bar	f	\N	2023-05-24	2023-05-24
c2dabc72-2254-45cc-ac1d-195ec10ca732	two-paws	twopaw	Two Paws	f	\N	2023-05-24	2023-05-24
f8f0842f-6b34-49c4-96bd-e735131a3bdd	txa	txa	TXA	f	\N	2023-05-24	2023-05-24
c4ba597a-baee-4eb2-be2f-bc5b34e03cc7	txbit	txbit	Txbit	f	\N	2023-05-24	2023-05-24
0848dffe-99b4-40c1-907c-7bf81cc3b0f3	tycoon	tyc	Tycoon	f	\N	2023-05-24	2023-05-24
281250a4-48a2-4cf1-b317-12f9500fcd32	typerium	type	Typerium	f	\N	2023-05-24	2023-05-24
90c30f82-2370-4aa0-b739-5338af745398	tyv	tyv	TYV	f	\N	2023-05-24	2023-05-24
63dc23e8-fa96-4823-8ed1-117c801ff063	tzbtc	tzbtc	tzBTC	f	\N	2023-05-24	2023-05-24
bfc4f2da-f2df-4e73-a500-3f91a9c6ea44	ubeswap	ube	Ubeswap	f	\N	2023-05-24	2023-05-24
69996915-fc13-48d5-b37a-228d7ded8a0c	ubiq	ubq	Ubiq	f	\N	2023-05-24	2023-05-24
70844124-0c4f-496b-b6e5-7e6dbfedcb6b	ubix-network	ubx	UBIX Network	f	\N	2023-05-24	2023-05-24
3a433b62-cccd-410c-9e55-9b8ec7664967	ubxs-token	ubxs	UBXS	f	\N	2023-05-24	2023-05-24
8711f076-3939-4817-b57f-fc98139b712a	uca	uca	UCA Coin	f	\N	2023-05-24	2023-05-24
ff6740b8-0708-4f4e-8b7b-4a1b37bb1d47	ucash	ucash	U.CASH	f	\N	2023-05-24	2023-05-24
2af124cd-d042-40ba-9d2d-27c172be7112	ucon	ucon	YouCoin	f	\N	2023-05-24	2023-05-24
f3508856-4c2c-4198-ba84-24e1b3792aa5	uconetwork	ucoil	UCONetwork	f	\N	2023-05-24	2023-05-24
2d0be1dd-283f-43fd-abc2-9331286f18e5	ucrowdme	ucm	UCROWDME	f	\N	2023-05-24	2023-05-24
a0a1c9a1-e715-4fd1-b091-7752881e3537	ucx	ucx	UCX	f	\N	2023-05-24	2023-05-24
b65e0d8f-4189-40cc-bf72-4a19ab69de44	udder-chaos-milk	milk	MILK	f	\N	2023-05-24	2023-05-24
bff9e946-6704-44e3-b4bd-3f75325c7066	udinese-calcio-fan-token	udi	Udinese Calcio Fan Token	f	\N	2023-05-24	2023-05-24
19625653-bbc5-4e1f-aea2-095f70a02314	uerii	uerii	UERII	f	\N	2023-05-24	2023-05-24
dd7a4bc5-e041-4f9b-bbe5-39d1c62a252f	ufc-fan-token	ufc	UFC Fan Token	f	\N	2023-05-24	2023-05-24
8a7c4ce8-de30-4e73-b0ff-59508c1c8633	ufocoin	ufo	Uniform Fiscal Object	f	\N	2023-05-24	2023-05-24
f48153a9-2dec-4ef9-92fc-d8c9fb86e07b	ufo-gaming	ufo	UFO Gaming	f	\N	2023-05-24	2023-05-24
b04a4204-45b6-4734-aa35-ff5648f31743	uhive	hve2	Uhive	f	\N	2023-05-24	2023-05-24
a153249a-8536-489d-8d47-b8f169ed452e	ukrainedao-flag-nft	love	UkraineDAO Flag NFT	f	\N	2023-05-24	2023-05-24
64389aee-737e-4e99-a1b2-f6cc3ff2c1da	ulanco	uac	Ulanco	f	\N	2023-05-24	2023-05-24
169f37b3-95aa-47a4-bddd-aa99ea37fb91	uland	uland	ULAND	f	\N	2023-05-24	2023-05-24
a77c5910-67ad-4254-986a-931d2f4ddfae	ulord	ut	Ulord	f	\N	2023-05-24	2023-05-24
fc3b281d-7e9e-4c10-a971-ce927684e374	ultimate-champions	champ	Ultimate Champions	f	\N	2023-05-24	2023-05-24
653346d4-8428-4a7e-ab4f-eef8b3f41432	ultra	uos	Ultra	f	\N	2023-05-24	2023-05-24
cf3002a6-58c9-46a6-aa64-cbcd5d63e679	ultra-clear	ucr	Ultra Clear	f	\N	2023-05-24	2023-05-24
2e6059a0-7d80-4859-af66-a32f44e85c6f	ultragate	ulg	Ultragate	f	\N	2023-05-24	2023-05-24
4362c7de-c645-4003-b3b2-60eff335e7eb	ultrain	ugas	Ultrain	f	\N	2023-05-24	2023-05-24
0270cdd6-63d6-4e25-b7ef-9f25d9bf98a8	ultramoc	umc	Ultramoc	f	\N	2023-05-24	2023-05-24
bd0010aa-de73-4f52-a0ba-70c7a3e396aa	ultra-nft	unft	Ultra NFT	f	\N	2023-05-24	2023-05-24
d64bf1b3-541e-41ca-9fc3-7339341471ef	ultrasafe	ultra	UltraSafe	f	\N	2023-05-24	2023-05-24
8c0f3485-0c54-4844-a358-361c4d4ce949	ultron	ulx	ULTRON	f	\N	2023-05-24	2023-05-24
66b9733d-66a7-453b-a163-224f4e99d055	ultron-vault	ultron	Ultron Vault	f	\N	2023-05-24	2023-05-24
7857d1cc-51ec-46a3-b09b-3e9700b4fe6b	uma	uma	UMA	f	\N	2023-05-24	2023-05-24
f4373e1e-9a43-4d5b-9703-f37ba31ddbd1	umami-finance	umami	Umami	f	\N	2023-05-24	2023-05-24
66ff9dd8-e55d-4f22-8539-58929eaaeba6	umbra-network	umbr	Umbria Network	f	\N	2023-05-24	2023-05-24
49cc6285-611d-4ae2-b3aa-e286ed7bf248	umbrellacoin	umc	Umbrella Coin	f	\N	2023-05-24	2023-05-24
611e4a49-284b-4213-b091-776ed04774c1	umbrella-network	umb	Umbrella Network	f	\N	2023-05-24	2023-05-24
8026798e-287a-485c-b9f5-53dd33128453	umee	umee	Umee	f	\N	2023-05-24	2023-05-24
5e8f216d-3ebb-4209-b58e-eb8851c330ef	umi-digital	umi	Umi Digital	f	\N	2023-05-24	2023-05-24
72e3c6e9-cee8-43a2-95ef-cfb49c173903	unagii-dai	udai	Unagii Dai	f	\N	2023-05-24	2023-05-24
d07566c9-7279-455a-bb9f-27b1d2adbc07	unagii-eth	ueth	Unagii ETH	f	\N	2023-05-24	2023-05-24
8adfd26e-a6a4-4061-aa6c-5202af277616	unagii-tether-usd	uusdt	Unagii Tether USD	f	\N	2023-05-24	2023-05-24
dea9ccfb-0491-457d-be40-8ba8029f1eff	unagii-usd-coin	uusdc	Unagii USD Coin	f	\N	2023-05-24	2023-05-24
2239374e-67cc-436d-97eb-05f5a57e09f4	unagii-wrapped-bitcoin	uwbtc	Unagii Wrapped Bitcoin	f	\N	2023-05-24	2023-05-24
85b63f76-ff12-4fe9-b881-82c5ae2c2481	unbanked	unbnk	Unbanked	f	\N	2023-05-24	2023-05-24
816eb3d6-6afe-4960-8e5e-26ec36aed99b	unbound-finance	unb	Unbound Finance	f	\N	2023-05-24	2023-05-24
7cfaa996-3264-4772-abf7-ea9b4e7ec8d2	uncl	uncl	UNCL	f	\N	2023-05-24	2023-05-24
abb9246a-67b2-4c2b-a361-e2e69acd482c	unclemine	um	UncleMine	f	\N	2023-05-24	2023-05-24
471f7c44-a4e7-46ca-9ff4-30528e07f9b5	undead-blocks	undead	Undead Blocks	f	\N	2023-05-24	2023-05-24
2bcbb131-e680-4b50-9fd0-52413732f4aa	undead-finance	undead	Undead Finance	f	\N	2023-05-24	2023-05-24
8f68be5a-c258-4e99-9e8f-8f028b6db437	u-network	uuu	U Network	f	\N	2023-05-24	2023-05-24
fa3f4159-0a71-4bae-b6d4-94dabcf71385	unfederalreserve	ersdl	unFederalReserve	f	\N	2023-05-24	2023-05-24
7d141b31-4073-484c-b18b-3637eeeb10d6	unia-farms	unia	UNIA Farms	f	\N	2023-05-24	2023-05-24
77d97835-13c8-4420-965e-df7f8046d2bc	unibot	unibot	Unibot	f	\N	2023-05-24	2023-05-24
f986b7e9-7595-4f7b-936f-34bdd53a0eae	unibright	ubt	Unibright	f	\N	2023-05-24	2023-05-24
15d9b289-a36f-4104-9fcd-6a42a5780a8a	unicly	unic	Unicly	f	\N	2023-05-24	2023-05-24
a412b1a6-9fd2-498d-bcf7-ed77442b99f8	unicly-fewocious-collection	ufewo	Unicly Fewocious Collection	f	\N	2023-05-24	2023-05-24
5091c2fe-f74b-40f0-86f3-5dfe5a2b2eb0	unicorn-milk	unim	Unicorn Milk	f	\N	2023-05-24	2023-05-24
90f0ec2a-a064-419c-b854-19dc8f979390	unicorn-token	uni	UNICORN	f	\N	2023-05-24	2023-05-24
3eda9acd-2d24-4be3-9b70-d3043f6a8b95	unicrypt-2	uncx	UNCX Network	f	\N	2023-05-24	2023-05-24
41b90df3-8031-441f-b528-1aff5af2ae93	unidef	u	Unidef	f	\N	2023-05-24	2023-05-24
c1ea62c8-c7c3-4fc2-9e40-472d58c0e9b6	unidex	unidx	UniDex	f	\N	2023-05-24	2023-05-24
d9ed810d-d688-4787-aad3-bcc6faf76edf	unido-ep	udo	Unido	f	\N	2023-05-24	2023-05-24
08c87197-7660-4c90-a61a-e9e2d1cd87ca	unifarm	ufarm	UniFarm	f	\N	2023-05-24	2023-05-24
4fa98ef3-9c6c-47a1-8004-168c2b7b8640	unifees	fees	Unifees	f	\N	2023-05-24	2023-05-24
243e45d0-caae-4cbf-ac4c-76e52b98c9df	unifi	unifi	Covenants	f	\N	2023-05-24	2023-05-24
933d2acd-17d4-4a44-8ee0-62ec9d8015e5	unification	fund	Unification	f	\N	2023-05-24	2023-05-24
42fa1884-2637-4ad5-a38a-be36d837a328	unifi-protocol	up	UniFi Protocol	f	\N	2023-05-24	2023-05-24
35ee7862-b416-4c9c-aace-981b0c3aa510	unifi-protocol-dao	unfi	Unifi Protocol DAO	f	\N	2023-05-24	2023-05-24
d248ab3f-287b-4463-93ad-7254a5b27b8c	unilab-network	ulab	Unilab	f	\N	2023-05-24	2023-05-24
5b9c4b40-cae9-41c8-8569-a87ab2032fc1	unilayer	layer	UniLayer	f	\N	2023-05-24	2023-05-24
1bd446ab-e1db-424a-90d7-c452db764aa6	unimex-network	umx	UniMex Network	f	\N	2023-05-24	2023-05-24
5b866ca7-a97c-42c4-a0ce-034f1f604058	unimoon-umoon	umoon	Unimoon	f	\N	2023-05-24	2023-05-24
c523c6fc-6ea7-4a5f-8b28-722088a3c35f	union-protocol-governance-token	unn	UNION Protocol Governance	f	\N	2023-05-24	2023-05-24
bdf6a994-c70e-48c3-a0f2-e90fd1cbcdec	unipilot	pilot	Unipilot	f	\N	2023-05-24	2023-05-24
8cde0b8e-ffe2-4f5e-8508-66f97a819e6f	unipower	power	UniPower	f	\N	2023-05-24	2023-05-24
835efe30-1cff-4b4d-90c0-8d07a50d5d85	uniqly	uniq	Uniqly	f	\N	2023-05-24	2023-05-24
57d3a214-114d-4634-9e2a-6bb9a930168e	unique-fans	fans	Unique Fans	f	\N	2023-05-24	2023-05-24
3ceab7f3-7d01-445a-9ba0-73a48be13c7a	unique-network	unq	Unique Network	f	\N	2023-05-24	2023-05-24
523e3bb5-b4d4-43ac-b20e-62b4baeddb27	unique-one	rare	Unique One	f	\N	2023-05-24	2023-05-24
e13464a2-2a61-4038-8daf-ac74c4c8f3ed	unique-utility-token	unqt	Unique Utility	f	\N	2023-05-24	2023-05-24
fd193c0b-a542-480a-b362-54d11fead340	unisocks	socks	Unisocks	f	\N	2023-05-24	2023-05-24
a3d5da7b-48d8-4410-9ddb-b6a9e3bc5f60	unistake	unistake	Unistake	f	\N	2023-05-24	2023-05-24
eca15a4a-e9c8-4b98-aea3-25f5d3fcf6bd	uniswap	uni	Uniswap	f	\N	2023-05-24	2023-05-24
9f835201-7283-4beb-b3b6-dd2697b824e8	uniswap-wormhole	uni	Uniswap (Wormhole)	f	\N	2023-05-24	2023-05-24
df78af09-d7f0-42c2-a859-fb3e90208679	unite	unite	Unite	f	\N	2023-05-24	2023-05-24
d787438f-94c1-48f9-96cd-b47e8580abd5	unitedcrowd	uct	UnitedCrowd	f	\N	2023-05-24	2023-05-24
cd31a382-a369-49d3-bc56-dc8d67d37034	united-states-property-coin	usp	USP Token	f	\N	2023-05-24	2023-05-24
00530fe9-1797-4394-933f-a4b98239c055	united-token	uted	United	f	\N	2023-05-24	2023-05-24
390c0e0f-964a-4914-9870-cc1bad92ae23	united-traders-token	utt	United Traders	f	\N	2023-05-24	2023-05-24
269efa79-cb57-4ed2-92bc-094feb5a33a2	unit-protocol-duck	duck	Unit Protocol	f	\N	2023-05-24	2023-05-24
b51a198f-1366-4565-bbf5-528f8a3cb513	unitrade	trade	Unitrade	f	\N	2023-05-24	2023-05-24
96d8e512-92e9-4d17-83f2-044d43417942	unitus	uis	Unitus	f	\N	2023-05-24	2023-05-24
29640b44-f94b-40d3-b206-2746c8d23e65	unitycore	ucore	UnityCore	f	\N	2023-05-24	2023-05-24
797cebbd-67bc-4372-a2ff-a9883b8a9400	unity-network	unt	Unity Network	f	\N	2023-05-24	2023-05-24
0d186a53-6c6f-4260-99b9-f2c55af660a2	unityventures	uv	Unityventures	f	\N	2023-05-24	2023-05-24
1177d621-4681-40b6-9add-9170bcb6c1d2	unium	unm	UNIUM	f	\N	2023-05-24	2023-05-24
f6e8043f-17aa-466b-aa40-391e61fe8c6f	universal-basic-income	ubi	Universal Basic Income	f	\N	2023-05-24	2023-05-24
da6328c6-b5bc-4bb5-b401-074277ceabb8	universal-eth	unieth	Universal ETH	f	\N	2023-05-24	2023-05-24
84ba257f-9454-4b8a-8b95-eec971758407	universal-liquidity-union	ulu	Universal Liquidity Union	f	\N	2023-05-24	2023-05-24
125b44c5-3660-41b3-9e41-b2a5c3ecfe2a	universe-xyz	xyz	Universe.XYZ	f	\N	2023-05-24	2023-05-24
b32a9335-3df3-4dc2-8e02-96be14796bf5	universidad-de-chile-fan-token	uch	Universidad de Chile Fan Token	f	\N	2023-05-24	2023-05-24
eaa55dac-99e3-408b-aad2-ffeb8a2d4be4	uniwhale	unw	Uniwhale	f	\N	2023-05-24	2023-05-24
8e5ce60d-fe24-4fcf-8527-3c2860ac2620	uniwhales	uwl	UniWhales	f	\N	2023-05-24	2023-05-24
b48abc9c-34c7-4e4c-9206-d089303b9163	uniworld	unw	UniWorld	f	\N	2023-05-24	2023-05-24
b204d077-8b12-4b99-b8f4-82a8f2598fb6	uniwswap	uniw	UniWswap	f	\N	2023-05-24	2023-05-24
c35f1eb5-596a-47a1-9682-95b748aad2d1	unix	unix	UniX	f	\N	2023-05-24	2023-05-24
dbd3d395-fe9a-4e81-9fc8-43b3ba31e633	uni-yvault	yvuni	UNI yVault	f	\N	2023-05-24	2023-05-24
e763b867-2d2f-458a-b1b6-413441680943	unizen	zcx	Unizen	f	\N	2023-05-24	2023-05-24
66bb672b-21b9-49e1-8b02-0b8c36726603	unlend-finance	uft	UniLend Finance	f	\N	2023-05-24	2023-05-24
fdd0b84d-8561-4cc7-bfef-a5090beb5c6f	unlimitedip	uip	UnlimitedIP	f	\N	2023-05-24	2023-05-24
095b344c-3eeb-46a5-aa7e-ad1ac0849c14	unlock	unlock	UNLOCK	f	\N	2023-05-24	2023-05-24
ba4666cd-7e63-40de-a7a2-0b7ea1f79a8e	unlock-protocol	udt	Unlock Protocol	f	\N	2023-05-24	2023-05-24
43d0868d-2d79-4a51-a824-74cc2882be73	unmarshal	marsh	Unmarshal	f	\N	2023-05-24	2023-05-24
8c15b54f-318f-4b24-a0fb-17ac36f7de2d	unobtanium	uno	Unobtanium	f	\N	2023-05-24	2023-05-24
6e04331c-5f9c-4e96-93c1-1dab4dfdf54e	unobtanium-tezos	uno	Unobtanium Tezos	f	\N	2023-05-24	2023-05-24
9d6bab57-8462-480a-9e3b-42dce1ccc514	uno-re	uno	Uno Re	f	\N	2023-05-24	2023-05-24
94ebd148-0b2a-4761-abbc-e3d8ce5f457b	unq	unq	Unique Venture clubs	f	\N	2023-05-24	2023-05-24
74c641d9-9f1f-4ab6-be40-fad105d2efa3	unreal-finance	ugt	Unreal Finance	f	\N	2023-05-24	2023-05-24
afdaaafc-19eb-4f20-810c-e0b1f960c735	unsheth	ush	unshETHing_Token	f	\N	2023-05-24	2023-05-24
a41b349b-f2f9-487f-bd5b-7c3fbfea513a	unsheth-unsheth	unsheth	unshETH Ether	f	\N	2023-05-24	2023-05-24
10a73115-5126-41ef-a1d0-87a9712ef9ad	unslashed-finance	usf	Unslashed Finance	f	\N	2023-05-24	2023-05-24
017a81ba-8097-406c-92a2-e8aebbe0d76a	uns-token	uns	UNS Token	f	\N	2023-05-24	2023-05-24
9f849364-df60-4b1d-9fbd-0114ea744749	unstoppable-defi	und	Unstoppable DeFi	f	\N	2023-05-24	2023-05-24
7187bee0-2d7e-43ab-ab2c-4e0cecc116e3	unvest	unv	Unvest	f	\N	2023-05-24	2023-05-24
e937b645-2b09-4d49-8e9a-5d5b90e1b85b	upbots	ubxn	UpBots	f	\N	2023-05-24	2023-05-24
b693ea9e-974b-40a9-a22f-1e9a57674100	updog	updog	UpDog	f	\N	2023-05-24	2023-05-24
1360464c-5a27-458d-9430-3d811be0f883	upfi-network	ups	UPFI Network	f	\N	2023-05-24	2023-05-24
dca475d1-0372-43ff-ad26-75d292e2bdb1	upfire	upr	Upfire	f	\N	2023-05-24	2023-05-24
4d353998-c629-4dad-9602-120d8ea3dd7e	upfiring	ufr	Upfiring	f	\N	2023-05-24	2023-05-24
59c68389-6a96-4ad6-9e52-a15d2786e792	uplexa	upx	uPlexa	f	\N	2023-05-24	2023-05-24
1a8581af-e97a-4292-9438-020512333745	uplift	lift	Uplift	f	\N	2023-05-24	2023-05-24
1d19c432-970d-4d2a-9e18-991e5484c1cb	uponly-token	upo	UpOnly	f	\N	2023-05-24	2023-05-24
ef38c57a-ca40-4968-b9f3-060cce96960d	upshib	upshib	upShib	f	\N	2023-05-24	2023-05-24
6b867db4-ca20-4e8d-b232-71eed7487938	upsorber	up	Upsorber	f	\N	2023-05-24	2023-05-24
93f3d035-491a-4d95-bd1b-8622e1c30600	up-spiral	spiral	Spiral	f	\N	2023-05-24	2023-05-24
897594ef-3a05-4143-990a-066ae75f7d8e	upstabletoken	ustx	UpStable	f	\N	2023-05-24	2023-05-24
c7e2183a-a4b4-4324-bb23-a9c8b848803f	uquid-coin	uqc	Uquid Coin	f	\N	2023-05-24	2023-05-24
ec9b4f28-cc98-4b31-9d3a-0fe64d3bf261	uramaki	maki	Uramaki	f	\N	2023-05-24	2023-05-24
0949a548-f24c-4e4c-bb27-f2e1e56bf698	uraniumx	urx	UraniumX	f	\N	2023-05-24	2023-05-24
af2fe2db-3205-4ff5-8a30-dae25600c933	urdex-finance	urd	UrDEX Finance	f	\N	2023-05-24	2023-05-24
d2c9ab2d-1006-44f9-a468-7481398bd4c8	ureeqa	urqa	UREEQA	f	\N	2023-05-24	2023-05-24
bab2530f-8e63-4898-9732-f2c312fdaa57	urubit	urub	Urubit	f	\N	2023-05-24	2023-05-24
f74bef91-da78-4463-9706-120a2c6cdc77	urus-token	urus	Aurox	f	\N	2023-05-24	2023-05-24
82a95207-578f-4063-bed9-df114f5307ac	usd	usd+	Overnight.fi USD+	f	\N	2023-05-24	2023-05-24
77d92973-3e2b-48fa-b499-f82efd1fdfa8	usd-balance	usdb	USD Balance	f	\N	2023-05-24	2023-05-24
31a64a97-9ae9-49a2-a0e6-7245213d6e05	usd-bancor	usdb	USD Bancor	f	\N	2023-05-24	2023-05-24
53074b7f-5e89-4ba3-8107-9e7c720c554a	usd-coin	usdc	USD Coin	f	\N	2023-05-24	2023-05-24
803d1c52-0a87-4f8b-97ed-5141b57ee696	usd-coin-avalanche-bridged-usdc-e	usdc	USD Coin Avalanche Bridged (USDC.e)	f	\N	2023-05-24	2023-05-24
e0914ae3-ccec-43f1-b3ba-171c5106bdce	usd-coin-celer	ceusdc	USD Coin - Celer	f	\N	2023-05-24	2023-05-24
5a4bd0c0-e9ca-4cf1-8952-c6c307418782	usd-coin-nomad	nomadusdc	USD Coin - Nomad	f	\N	2023-05-24	2023-05-24
6be59272-41d6-4394-b79f-8b6596da79da	usd-coin-plenty-bridge	usdc.e	USD Coin (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
2c4a2bec-7bd0-4e90-b9c1-c70a4bfe8d89	usd-coin-pos-wormhole	usdcpo	USD Coin (PoS) (Wormhole)	f	\N	2023-05-24	2023-05-24
c8cbcb5e-af20-4ffa-b5ad-532482fe3c38	usd-coin-pulsechain	usdc	USD Coin (PulseChain)	f	\N	2023-05-24	2023-05-24
39ab6235-b4be-4906-8a81-ecd8d7b01daa	usd-coin-wormhole-from-ethereum	usdcet	USD Coin (Wormhole from Ethereum)	f	\N	2023-05-24	2023-05-24
9ca881fd-27d5-4fc6-8fa3-dc93cfb0c59f	usdc-rainbow-bridge	usdc.e	USD Coin (Rainbow Bridge)	f	\N	2023-05-24	2023-05-24
6cf4b927-3a6f-4d28-97e9-15d624563dbc	usdc-yvault	yvusdc	USDC yVault	f	\N	2023-05-24	2023-05-24
fd61c93f-28b4-4513-8361-4cecb7186691	usdd	usdd	USDD	f	\N	2023-05-24	2023-05-24
cf030cba-aebd-41ed-b757-bccd4552006f	usd-freedom	usdf	USD Freedom	f	\N	2023-05-24	2023-05-24
f7b63691-25d0-4771-8e2f-6c87631e6044	usdh	usdh	USDH	f	\N	2023-05-24	2023-05-24
b9cb214e-3446-41e4-ade2-c680896d68c4	usdk	usdk	USDK	f	\N	2023-05-24	2023-05-24
ad5a7af1-f76b-4c3e-9956-7eccb1d487b6	usd-mars	usdm	USD Mars	f	\N	2023-05-24	2023-05-24
c441050d-799d-4938-9c51-be4bab65255a	usdo	usdo	USDO	f	\N	2023-05-24	2023-05-24
dc0ffece-9f9d-4287-a2ef-f63b36513911	usdp	usdp	USDP Stablecoin	f	\N	2023-05-24	2023-05-24
16facb79-d570-45f4-a167-5952b2d520d3	usdtez	usdtz	USDtez	f	\N	2023-05-24	2023-05-24
83fb4a65-9983-4968-a0c6-302f8fa64fb7	usdtplus	usdt+	Overnight.fi USDT+	f	\N	2023-05-24	2023-05-24
d98b8ed1-bade-4fe3-bf59-cf19a4c2b881	usdt-yvault	yvusdt	USDT yVault	f	\N	2023-05-24	2023-05-24
826ad5de-0228-40fa-970f-18f25fa99800	usdx	usdx	USDX	f	\N	2023-05-24	2023-05-24
93fb874f-7759-4741-a99c-dd7c0645cfab	usdy	usdy	USDy	f	\N	2023-05-24	2023-05-24
4a7226e0-1f40-4696-aee4-23179155d70d	usd-zee	usdz	USD ZEE	f	\N	2023-05-24	2023-05-24
05a036dc-679b-410c-ab8c-203b52632e86	usgold	usg	USGold	f	\N	2023-05-24	2023-05-24
247f4afa-8f0e-4696-b6e8-417a2e7041db	ushark	usha	uShark	f	\N	2023-05-24	2023-05-24
0b127bda-d761-49ee-a6ad-4d49d25307ba	ushi	ushi	Ushi	f	\N	2023-05-24	2023-05-24
59a957bf-4ccb-448e-b73a-8bd8e4421f3f	usk	usk	USK	f	\N	2023-05-24	2023-05-24
a207344d-29da-4dad-8e26-3681610a0039	usp	usp	USP	f	\N	2023-05-24	2023-05-24
521f4f71-e313-4453-bb53-e5f34b2129f0	utility-ape	$banana	Utility Ape	f	\N	2023-05-24	2023-05-24
46875c46-a6eb-4d95-a334-dbc561233cf5	utility-meta-token	umt	Utility Meta Token	f	\N	2023-05-24	2023-05-24
ad48272f-6c0e-4d9f-ba26-d69ae026919c	utility-web3shot	uw3s	Utility Web3Shot	f	\N	2023-05-24	2023-05-24
2d677b12-5780-4b9e-a14c-b8acc47efd90	utip	utip	uTip	f	\N	2023-05-24	2023-05-24
c8396c9b-ab64-400c-b18f-2958493ff50d	utopia	crp	Crypton	f	\N	2023-05-24	2023-05-24
1339ac19-8208-41cd-b7a5-20dcc97fd843	utopia-usd	uusd	Utopia USD	f	\N	2023-05-24	2023-05-24
4457d8d7-e997-446a-b5e9-e1a8842ab6fe	utrust	utk	Utrust	f	\N	2023-05-24	2023-05-24
8901843e-2d7d-41fc-b8cb-46ed78013bec	utu-coin	utu	UTU Coin	f	\N	2023-05-24	2023-05-24
ebd0aa53-2beb-4e25-9996-027d28cf6a9d	uwu-lend	uwu	UwU Lend	f	\N	2023-05-24	2023-05-24
6e7cafd5-82af-458c-830c-997daf10a6a3	uxd-protocol-token	uxp	UXD Protocol	f	\N	2023-05-24	2023-05-24
b681ce63-e104-4f5a-8be7-cda96471959a	uxd-stablecoin	uxd	UXD Stablecoin	f	\N	2023-05-24	2023-05-24
83df9713-98ff-41b5-92ee-a14352cfc17b	uzumaki-inu	uzumaki	Uzumaki Inu	f	\N	2023-05-24	2023-05-24
645a3a15-cae5-4a47-b371-fd67225ccc77	uzurocks	uzrs	UZUROCKS	f	\N	2023-05-24	2023-05-24
ec97cd4e-23e4-4652-aad1-05302ee3fe69	v3s-share	vshare	V3S Share	f	\N	2023-05-24	2023-05-24
03171c99-34cc-44ec-aa48-538701411648	vabble	vab	Vabble	f	\N	2023-05-24	2023-05-24
044cbe99-4c1d-4be6-9ba3-a6bcfa96de95	vader-protocol	vader	Vader Protocol	f	\N	2023-05-24	2023-05-24
2b7d2e44-0b01-48a4-95df-f0a1e718630f	vagabond	vgo	Vagabond	f	\N	2023-05-24	2023-05-24
13fd7ab3-d138-4146-9854-63ffa4a4287f	vai	vai	Vai	f	\N	2023-05-24	2023-05-24
8e275248-5d0a-43b0-8ab2-80cc2b671d92	vaiot	vai	Vaiot	f	\N	2023-05-24	2023-05-24
e706b6f5-06d5-4984-b48e-f38aaba110f3	valas-finance	valas	Valas Finance	f	\N	2023-05-24	2023-05-24
5f614c91-6488-4334-ab15-1657927fc28e	valencia-cf-fan-token	vcf	Valencia CF Fan Token	f	\N	2023-05-24	2023-05-24
754c32e9-2b59-4666-abf9-13a3ebfb73b3	valentine-floki	flov	Valentine Floki	f	\N	2023-05-24	2023-05-24
94fa2119-52ba-49a0-bbad-a77c09b2b3b7	valobit	vbit	VALOBIT	f	\N	2023-05-24	2023-05-24
0dd060b0-12bf-4262-ac57-aa61092ad2e0	value-liquidity	value	Value DeFi	f	\N	2023-05-24	2023-05-24
8334ad69-dc5a-4a42-ab74-608d51d81e9a	vancat	vancat	Vancat [OLD]	f	\N	2023-05-24	2023-05-24
18f94892-f67e-41f3-9f63-85ff9915fa97	vancat-2	vancat	Vancat	f	\N	2023-05-24	2023-05-24
a7946952-8aa0-4d05-b678-08edc724a0b5	vanguard-real-estate-tokenized-stock-defichain	dvnq	Vanguard Real Estate Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
b8fc7a18-1205-4ea1-b5b7-358f5b994e5f	vanguard-sp-500-etf-tokenized-stock-defichain	dvoo	Vanguard S&P 500 ETF Tokenized Stock Defichain	f	\N	2023-05-24	2023-05-24
c992cdb9-7757-46ff-905c-a414bf56a018	vanilla-network	vnla	Vanilla Network	f	\N	2023-05-24	2023-05-24
9df6515c-7d0d-4a95-a6dc-324fe2a7525c	vanity	vny	Vanity	f	\N	2023-05-24	2023-05-24
420df1d9-49c8-4350-aca3-63e2ba763f53	vankia-chain	vkt	Vankia Chain	f	\N	2023-05-24	2023-05-24
dffb0c95-3b30-4c32-b574-13e2d7361309	vaporfi	vape	VaporFi	f	\N	2023-05-24	2023-05-24
0430711c-dec0-4a3a-baef-aa97d7a8d530	vapornodes	vpnd	VaporNodes	f	\N	2023-05-24	2023-05-24
2f6f3ffe-35df-4d5f-b618-254f8b8e18cc	vaporum-coin	vprm	Vaporum Coin	f	\N	2023-05-24	2023-05-24
fdec7865-e4a5-4486-a50b-8144e8156b74	vaporwave	vwave	Vaporwave	f	\N	2023-05-24	2023-05-24
91a398d1-e23f-42cd-8f89-b4b500176c9e	varen	vrn	Varen	f	\N	2023-05-24	2023-05-24
7eaaeb2b-cca9-4d1b-a3ea-37df20d84a17	vasco-da-gama-fan-token	vasco	Vasco da Gama Fan Token	f	\N	2023-05-24	2023-05-24
a5544f03-5089-4ef8-b7e7-7b1832819ad1	vault	vault	VAULT	f	\N	2023-05-24	2023-05-24
ebf6047d-e55b-456c-9197-e0ee9c19c9bd	vaulteum	vault	Vaulteum	f	\N	2023-05-24	2023-05-24
7046ed55-5889-4669-868b-2c334161e612	vault-hill-city	vhc	Vault Hill City	f	\N	2023-05-24	2023-05-24
8f955a68-2152-4061-be91-599ca7652b61	vaulty-token	vlty	Vaulty	f	\N	2023-05-24	2023-05-24
fd68ab2e-34eb-4ad6-b55e-30f51f37cf5e	vbswap	vbswap	vBSWAP	f	\N	2023-05-24	2023-05-24
972c877f-8a35-472b-b0cd-2ddef841886f	vcash	xvc	Vcash	f	\N	2023-05-24	2023-05-24
78dc8208-c890-4e4c-9ae8-47fdea0a862c	vcgamers	vcg	VCGamers	f	\N	2023-05-24	2023-05-24
538d1178-8f30-4232-a09d-15eb1e8dbfc6	veax	veax	Veax	f	\N	2023-05-24	2023-05-24
12a218bc-8489-484e-aee2-859b24e9085a	vechain	vet	VeChain	f	\N	2023-05-24	2023-05-24
0b6aca99-0383-40b1-bab1-3dded4cd0578	veco	veco	Veco	f	\N	2023-05-24	2023-05-24
5531f540-105d-46d9-bb18-3623e7f294d4	vecrv-dao-yvault	yve-crvdao	veCRV-DAO yVault	f	\N	2023-05-24	2023-05-24
07a615e3-0e82-4167-a0e4-5afd6e26f8cc	vector-finance	vtx	Vector Finance	f	\N	2023-05-24	2023-05-24
b63a815b-6b4d-4a9f-8c04-19bffc55a63a	vectorium	vect	Vectorium	f	\N	2023-05-24	2023-05-24
4b28396d-1752-4d99-913a-44cb90da2dc5	vectorspace	vxv	Vectorspace AI	f	\N	2023-05-24	2023-05-24
acb8dba7-f1ac-44f1-a977-c9ae38207389	vedao	weve	veDAO	f	\N	2023-05-24	2023-05-24
0c79a872-54a9-451c-9cc7-b02c6fb0711a	veed	veed	VEED	f	\N	2023-05-24	2023-05-24
65f8b910-16ed-416a-a59b-cda8793c2519	vee-finance	vee	Vee Finance	f	\N	2023-05-24	2023-05-24
88005a55-3d57-45d3-a53a-9756af7d5d61	vega-coin	vega	Vega Coin	f	\N	2023-05-24	2023-05-24
6828054c-fef9-4a59-a7a2-fe3b29a8921c	vegannation-greencoin	grnc	VeganNation GreenCoin	f	\N	2023-05-24	2023-05-24
68d913ac-e7e5-405e-999b-180015ffa92c	vega-protocol	vega	Vega Protocol	f	\N	2023-05-24	2023-05-24
ce88dba8-44f2-4768-972f-a9270971db77	vega-sport	vega	Vega Sport	f	\N	2023-05-24	2023-05-24
0409cef5-e3b4-4d13-9ba9-9b7357354a08	veggiecoin	vegi	VeggieCoin	f	\N	2023-05-24	2023-05-24
43447be1-4edd-493f-8f79-bbfbbd6f37b2	veil	veil	VEIL	f	\N	2023-05-24	2023-05-24
43039217-37c5-41d4-bd88-c8b65f40434f	velas	vlx	Velas	f	\N	2023-05-24	2023-05-24
9a80bd65-2cbb-4b0c-9e91-860f305b0581	velaspad	vlxpad	VelasPad	f	\N	2023-05-24	2023-05-24
9c96e612-0348-4d89-9519-d5a4c6c73f2f	vela-token	vela	Vela Token	f	\N	2023-05-24	2023-05-24
228b4e69-e406-421a-8c7c-97cf4eda2937	veldorabsc	vdora	VeldoraBSC	f	\N	2023-05-24	2023-05-24
81c841af-39bc-4280-b184-48a1f1b04670	velhalla	scar	ScarQuest	f	\N	2023-05-24	2023-05-24
e1b21400-a8aa-4b07-861e-3f916812200f	velo	velo	Velo	f	\N	2023-05-24	2023-05-24
0c735899-132f-4811-9c50-b027ac60ab79	velocimeter-flow	flow	Velocimeter FLOW	f	\N	2023-05-24	2023-05-24
d1ef9678-69c0-40bd-9f45-fa7d198c1b34	velocore	vc	Velocore	f	\N	2023-05-24	2023-05-24
0e6f9581-6356-4dcf-8007-7d40743c3980	velocore-waifu	waifu	Waifu by Velocore	f	\N	2023-05-24	2023-05-24
0efbf44b-1784-4ae4-acd1-03ccffa991f0	velodrome-finance	velo	Velodrome Finance	f	\N	2023-05-24	2023-05-24
972fbc68-ef63-4c4d-9b3d-26cd8849b5b9	velorex	vex	Velorex	f	\N	2023-05-24	2023-05-24
c0f03e77-3166-410f-853b-285d51df1999	vemate	vmt	Vemate	f	\N	2023-05-24	2023-05-24
7ccab1f3-cc93-4aad-8d3c-c48e15c58014	vempire-ddao	vemp	VEMP	f	\N	2023-05-24	2023-05-24
1d012880-1f60-4e90-8118-21000ccc212c	vendetta-finance	ven	Vendetta Finance	f	\N	2023-05-24	2023-05-24
b316f280-a4da-4cd0-a4a5-2c18ce67517c	venify	vfy	Venify	f	\N	2023-05-24	2023-05-24
3a9cd0e3-2572-4078-9f57-dfd0ec974970	veno-finance	vno	Veno Finance	f	\N	2023-05-24	2023-05-24
72f1d980-a84c-429b-b712-eae546e531b0	venom	venom	Venom	f	\N	2023-05-24	2023-05-24
ffe1b0b9-ccb0-4aa9-84e3-3d0179b21a20	venox	vnx	Venox	f	\N	2023-05-24	2023-05-24
d21aaae6-c661-40a9-b398-ee9fdab7b30b	xrun	xrun	XRun	f	\N	2023-05-24	2023-05-24
dd3577ec-fdb0-45c2-b941-a2be47d0407f	vent-finance	vent	Vent Finance	f	\N	2023-05-24	2023-05-24
89160f46-0766-4570-91ed-8d511fcd09f7	vention	vention	Vention	f	\N	2023-05-24	2023-05-24
ae7456c1-733f-4aba-a505-f81e2e58fa81	ventiswap	vst	VentiSwap	f	\N	2023-05-24	2023-05-24
ae040e7b-4d3e-4414-a7b3-2413a32ef9a5	venus	xvs	Venus	f	\N	2023-05-24	2023-05-24
e386f5d6-9411-4f31-897e-2d4b3a7b8097	venus-bch	vbch	Venus BCH	f	\N	2023-05-24	2023-05-24
a72cc162-7231-48d8-866c-1854995e76f4	venus-beth	vbeth	Venus BETH	f	\N	2023-05-24	2023-05-24
b0bcd42b-b6a1-4323-9b6b-4f91395a37ce	venus-btc	vbtc	Venus BTC	f	\N	2023-05-24	2023-05-24
ba1f804d-4ffc-4299-a125-c073c2a9e912	venus-busd	vbusd	Venus BUSD	f	\N	2023-05-24	2023-05-24
97bf631d-21bf-4be7-8c77-ad642d92cedc	venus-dai	vdai	Venus DAI	f	\N	2023-05-24	2023-05-24
da33db23-01c9-4244-b634-b6614bb41bc1	venus-doge	vdoge	Venus DOGE	f	\N	2023-05-24	2023-05-24
a8c36628-2713-473c-ac0d-41d93cbf60ec	venus-dot	vdot	Venus DOT	f	\N	2023-05-24	2023-05-24
a307b835-c8d6-4628-b998-e96eaa1616b7	venus-eth	veth	Venus ETH	f	\N	2023-05-24	2023-05-24
c72227b8-d933-4cc9-bc11-12006c2374a8	venus-fil	vfil	Venus FIL	f	\N	2023-05-24	2023-05-24
b043d1ac-ce26-4776-becd-76edbea75043	venus-link	vlink	Venus LINK	f	\N	2023-05-24	2023-05-24
d8ce853b-3b3a-404e-b996-d2e908eb6c22	venus-ltc	vltc	Venus LTC	f	\N	2023-05-24	2023-05-24
58a2eee0-86a7-45f7-8f1e-40662319ea4c	venus-reward-token	vrt	Venus Reward	f	\N	2023-05-24	2023-05-24
6b6d5c7c-999b-43ac-afbe-35475fbeb047	venus-sxp	vsxp	Venus SXP	f	\N	2023-05-24	2023-05-24
5174fa26-7430-4bb3-beb2-5509de0c3563	venus-usdc	vusdc	Venus USDC	f	\N	2023-05-24	2023-05-24
046daa94-3673-4eeb-8443-04399a4545d3	venus-usdt	vusdt	Venus USDT	f	\N	2023-05-24	2023-05-24
f290d9e1-867a-47d0-b41c-576cc515eca8	venus-xrp	vxrp	Venus XRP	f	\N	2023-05-24	2023-05-24
69c03582-760d-45a1-822e-2ea44a12da2b	venus-xvs	vxvs	Venus XVS	f	\N	2023-05-24	2023-05-24
e3436153-0056-489c-99c0-ba45a095a590	vera	vera	Vera	f	\N	2023-05-24	2023-05-24
f79625eb-d32f-4fd8-b944-e0cdd3599951	vera-exchange	vera	VERA Exchange	f	\N	2023-05-24	2023-05-24
c2541bd3-9168-4b66-8e6e-abebf91a2500	veraone	vro	VeraOne	f	\N	2023-05-24	2023-05-24
119f8f49-18a6-4f0c-941b-e8fb9504bf67	verasity	vra	Verasity	f	\N	2023-05-24	2023-05-24
70b731a9-4643-4315-b06c-681aced6f9c8	verge	xvg	Verge	f	\N	2023-05-24	2023-05-24
3fde428e-eaf7-449f-989d-21f6aaf45751	veriblock	vbk	VeriBlock	f	\N	2023-05-24	2023-05-24
32e801ba-2022-4ee8-8988-984728569a13	veridocglobal	vdg	VeriDocGlobal	f	\N	2023-05-24	2023-05-24
be208511-1095-42b8-85bf-bd92999cebc9	veritaseum	veri	Veritaseum	f	\N	2023-05-24	2023-05-24
eb6e5df5-0e2d-43b6-ba81-440f05a8f7f6	veritise	vts	Veritise	f	\N	2023-05-24	2023-05-24
637c9d62-cf8b-487e-95d0-813396446931	verox	vrx	Verox	f	\N	2023-05-24	2023-05-24
606747e9-e517-4fc2-94e5-ac6753f8ef74	versacoin	vcn	VersaCoin	f	\N	2023-05-24	2023-05-24
13e6fb23-99ba-4d25-b706-082e7e9bccfa	versagames	versa	VersaGames	f	\N	2023-05-24	2023-05-24
d273a885-890b-40f5-b509-3a4dc5b0b8aa	versailles-heroes	vrh	Versailles Heroes	f	\N	2023-05-24	2023-05-24
168b49ef-8acd-475e-8c20-79b23d0f69d6	verse-bitcoin	verse	Verse	f	\N	2023-05-24	2023-05-24
9993c753-5f52-4de1-9f70-2b048006f7ae	verso	vso	Verso	f	\N	2023-05-24	2023-05-24
00527931-ce88-46c7-a1b8-b06c40469190	versoview	vvt	VersoView	f	\N	2023-05-24	2023-05-24
1b1a7abe-fab9-4fa1-a731-018dca815282	vertcoin	vtc	Vertcoin	f	\N	2023-05-24	2023-05-24
56c2f697-ae41-4775-a0cf-3c9b03f6f337	vertek	vrtk	Vertek	f	\N	2023-05-24	2023-05-24
883030ea-753c-4bba-880c-80f8eee3ddd2	verus-coin	vrsc	Verus Coin	f	\N	2023-05-24	2023-05-24
65fcff15-463c-4d15-b2ef-6c7607ebd5fe	verve	verve	Verve	f	\N	2023-05-24	2023-05-24
28e29a2a-f7fa-4e24-a012-69265d5419e3	very-banking	vb	Very Banking	f	\N	2023-05-24	2023-05-24
b82cae26-0b1c-441e-8593-8594eddc6383	very-special-dragon	vito	Very Special Dragon	f	\N	2023-05-24	2023-05-24
cec9ad44-73c3-4d65-82e5-61bf57df929a	vesper-finance	vsp	Vesper Finance	f	\N	2023-05-24	2023-05-24
5274851c-e0d6-430a-982a-a4adbf6df322	vesq	vsq	VESQ	f	\N	2023-05-24	2023-05-24
0aaa8711-0e71-42bf-bcf2-8cf6daf21f02	vesta-finance	vsta	Vesta Finance	f	\N	2023-05-24	2023-05-24
0ef9a311-33ab-4466-bcad-d11a83da5cdc	vesta-stable	vst	Vesta Stable	f	\N	2023-05-24	2023-05-24
f570f226-4d1d-4259-8690-fc72670d1939	vestige	vest	Vestige	f	\N	2023-05-24	2023-05-24
0e54419f-3d09-4696-b3cb-9f421fdcd656	vethor-token	vtho	VeThor	f	\N	2023-05-24	2023-05-24
c5b93132-6712-422f-812b-d0139a6fba17	vetme	vetme	VetMe	f	\N	2023-05-24	2023-05-24
c8274eec-4adf-40c8-b520-0539a4e61379	vetter-token	vetter	Vetter	f	\N	2023-05-24	2023-05-24
6bb98694-0adf-4a6e-bb5f-e690d163750e	veusd	veusd	VeUSD	f	\N	2023-05-24	2023-05-24
d13a4e24-40b6-4817-b4f5-36cba9ec6f3d	vexanium	vex	Vexanium	f	\N	2023-05-24	2023-05-24
d45015fc-c7e1-4c6a-af20-b0b1cced4e33	vfox	vfox	VFOX	f	\N	2023-05-24	2023-05-24
5d054110-14c7-4b4c-ba3f-ec2b05a89536	viacoin	via	Viacoin	f	\N	2023-05-24	2023-05-24
43ceaa4d-2f75-4f87-995d-3be339691d9b	vibe	vibe	VIBE	f	\N	2023-05-24	2023-05-24
75f18006-a9cb-4d04-9c4a-e55eb43207ae	viberate	vib	Viberate	f	\N	2023-05-24	2023-05-24
8ba772ee-e47c-47b2-b84f-b8dd8a8fbca7	vibing	vbg	Vibing	f	\N	2023-05-24	2023-05-24
e034e8ff-9a7e-4dfe-aeaa-159d60a057da	vicat	vicat	ViCat	f	\N	2023-05-24	2023-05-24
9571fb0c-9a97-42bf-ad23-6a4896748425	vica-token	vica	ViCA	f	\N	2023-05-24	2023-05-24
32576695-7208-4001-a123-7562cf321ea9	vicmove	vim	VicMove	f	\N	2023-05-24	2023-05-24
4fb7e3f5-6d50-4d38-9e34-917f8a3c168b	victoria-vr	vr	Victoria VR	f	\N	2023-05-24	2023-05-24
a9e248b0-026f-4f63-99c4-3c56aebd339d	victorum	vcc	Victorum	f	\N	2023-05-24	2023-05-24
a4c2158c-2540-4933-aa3e-9c0b81575f6c	victory-gem	vtg	Victory Gem	f	\N	2023-05-24	2023-05-24
d84f9189-c522-4194-8729-114229d574b3	vicuna	vina	VICUNA	f	\N	2023-05-24	2023-05-24
05645dae-1a55-4c8c-b83b-005886a03163	viddli	mty	Viddli	f	\N	2023-05-24	2023-05-24
8128666c-d538-48d4-b166-d8959fad2993	videocoin	vid	Vivid Labs	f	\N	2023-05-24	2023-05-24
95fcdbf4-aa11-40a7-acd5-8d4bd5400265	vidiachange	vida	Vidiachange	f	\N	2023-05-24	2023-05-24
437656fe-3d73-4c94-a232-d6f21bd2021f	vidt-dao	vidt	VIDT DAO	f	\N	2023-05-24	2023-05-24
003199c9-4e0b-42ba-a7a7-98809a7fa2d8	vidulum	vdl	Vidulum	f	\N	2023-05-24	2023-05-24
e3dbbf83-876e-4a7e-88ae-b3128280bd88	vidy	vidy	VIDY	f	\N	2023-05-24	2023-05-24
f8c4a03d-dc54-41cb-b9af-5e8326a36b25	vidya	vidya	Vidya	f	\N	2023-05-24	2023-05-24
3657c36e-aef0-4007-ad81-95a8c5846539	vidyx	vidyx	VidyX	f	\N	2023-05-24	2023-05-24
34d853bc-d1db-4746-a27d-ace8e0d42495	vig	vig	Vigor	f	\N	2023-05-24	2023-05-24
a58bba50-a064-48be-ae1a-b9111d6cdec6	vigorus	vis	Vigorus	f	\N	2023-05-24	2023-05-24
cc4f556b-f8eb-40cc-8eee-ea9e5f4f6ffe	viking-elon	velon	Viking Elon	f	\N	2023-05-24	2023-05-24
3b2b820a-f5c6-4a27-8991-c3b9d56e28a2	vindax-coin	vd	VinDax Coin	f	\N	2023-05-24	2023-05-24
7ad02ae8-1b63-4abf-b773-287e763f2690	vinlink	vnlnk	Vinlink	f	\N	2023-05-24	2023-05-24
cb204784-6baa-450c-a3c2-5285be8eb662	vip-coin	vip	Vip Coin	f	\N	2023-05-24	2023-05-24
d65aa8fc-1b1e-4859-b8b3-590c36c56f16	viper	viper	Viper	f	\N	2023-05-24	2023-05-24
28c3bda6-c8b5-43e9-b30d-4303d38af213	vip-token	vip	VIP	f	\N	2023-05-24	2023-05-24
a55321ac-4428-4420-82fb-e00347848a90	vira-lata-finance	reau	Vira-Lata Finance	f	\N	2023-05-24	2023-05-24
d1eedd66-10e1-4130-9eaf-0544b15ea6b7	viral-inu	vinu	Viral Inu	f	\N	2023-05-24	2023-05-24
5e6936f5-f0b6-49f6-8cf4-00b6a6311b9e	vires-finance	vires	Vires Finance	f	\N	2023-05-24	2023-05-24
c3bc7476-3278-4eb5-ab9f-34263d860647	virgo	vgo	Virgo	f	\N	2023-05-24	2023-05-24
fb12d623-297d-4918-9d98-45e2ab40ae55	virtualmeta	vma	Virtual Meta	f	\N	2023-05-24	2023-05-24
fb7e0fa1-d7d5-4fca-841e-918f3ac54f97	virtual-reality-game-world	vrgw	Virtual Reality Game World	f	\N	2023-05-24	2023-05-24
88b0245b-b336-4ec3-99ce-7692699ccffa	virtual-reality-glasses	vrg	Virtual Reality Glasses	f	\N	2023-05-24	2023-05-24
3032e3e1-9bcc-4981-82ab-b0f9a321f96c	virtual-ride-token	vrt	Virtual Ride Token	f	\N	2023-05-24	2023-05-24
e8079b72-24dd-4959-a4dd-688c33aaf168	virtual-tourist	vt	Virtual Tourist	f	\N	2023-05-24	2023-05-24
00c11a9e-5674-4da0-9746-36ecbd2e696e	virtual-trader	vtr	Virtual Trader	f	\N	2023-05-24	2023-05-24
1716ec77-6271-4938-9fe7-284ad287a51a	virtual-trade-token	vtt	Virtual Trade Token	f	\N	2023-05-24	2023-05-24
09c15cf6-289c-40d7-a911-41dffb7f3efe	virtue	virtue	Virtue	f	\N	2023-05-24	2023-05-24
302482f9-5e08-45b7-bdf0-0df1bee0e61f	virtue-poker	vpp	Virtue Poker Points	f	\N	2023-05-24	2023-05-24
982cc821-295b-4555-b4b0-b9dbbc32b5a5	visiongame	vision	VisionGame	f	\N	2023-05-24	2023-05-24
5be7442b-89dc-4cd8-8cb2-f080bb41f560	vision-metaverse	vs	Vision Metaverse	f	\N	2023-05-24	2023-05-24
1c30e1c0-8de8-44f4-9e76-23e5ad5ca0f8	vitadao	vita	VitaDAO	f	\N	2023-05-24	2023-05-24
9b962bf2-816f-4c4e-b6db-bba479e57ac2	vita-inu	vinu	Vita Inu	f	\N	2023-05-24	2023-05-24
3a31ded9-1571-45d8-9021-e60f8a02242b	vitality	vita	Vitality	f	\N	2023-05-24	2023-05-24
e294ad17-4998-4b87-9ec3-1f4ce7a6f14a	vital-network	vital	Vital Network	f	\N	2023-05-24	2023-05-24
18fc24bc-de66-4c29-a5e1-e88d38cfe9de	vitalxp	vital	VitalXP	f	\N	2023-05-24	2023-05-24
66b4059d-023a-4690-abd8-3c5fb990114a	vitamin-coin	vitc	Vitamin Coin	f	\N	2023-05-24	2023-05-24
0afdaded-6798-4bfd-b31a-dc44fc2a01cb	vite	vite	Vite	f	\N	2023-05-24	2023-05-24
fbebabde-8242-41d5-8bc5-b1e7f4bb0c3f	viterium	vt	Viterium	f	\N	2023-05-24	2023-05-24
a5d87d3b-6957-4a68-b47f-8eb68314c765	vitex	vx	ViteX Coin	f	\N	2023-05-24	2023-05-24
3ae32bb9-8078-497e-89a5-7d6381ade0ab	vitteey	vity	Vitteey	f	\N	2023-05-24	2023-05-24
a7a5cdfa-a708-48e0-90f1-416ed2d2163c	viva	viva	Viva	f	\N	2023-05-24	2023-05-24
fc460ee6-1863-4a6f-a378-781cd5ea4ee3	viva-classic-2	viva	Viva Classic	f	\N	2023-05-24	2023-05-24
a7e65c96-0d28-4b8f-a246-054021fa5fa1	vixco	vix	Vixco	f	\N	2023-05-24	2023-05-24
38c60c44-e148-4a75-90b4-2f6a50c920ff	vizslaswap	vizslaswap	VizslaSwap	f	\N	2023-05-24	2023-05-24
8b1042db-fc9a-428c-8b14-a8b97f89362a	vlaunch	vpad	VLaunch	f	\N	2023-05-24	2023-05-24
b4829dc8-84c7-4e99-91dc-c65bde8f93a4	vmpx	vmpx	VMPX	f	\N	2023-05-24	2023-05-24
a828b008-88e7-4de8-b1f4-189f2c713507	vm-tycoons-businesses	businesses	VM Tycoons Businesses	f	\N	2023-05-24	2023-05-24
cb76101a-d34f-4905-b1f4-19bbbdaf1508	vndc	vndc	VNDC	f	\N	2023-05-24	2023-05-24
034451b0-d262-4149-914a-030c57674c7b	vnetwork	vnw	VNetwork	f	\N	2023-05-24	2023-05-24
5c5db2a3-a96e-48b3-b1bb-9cfdf4176319	vnx-euro	veur	VNX EURO	f	\N	2023-05-24	2023-05-24
8ff444a0-2a2d-4838-a281-0f71f4e2b9f5	vnx-exchange	vnxlu	VNX Exchange	f	\N	2023-05-24	2023-05-24
bc6aff1a-37bd-498e-97c3-46d77f72e8bc	vnx-gold	vnxau	VNX Gold	f	\N	2023-05-24	2023-05-24
958dffae-8688-4aab-9738-e44e825d0f86	vnx-swiss-franc	vchf	VNX Swiss Franc	f	\N	2023-05-24	2023-05-24
3fed493e-76c7-4467-a1cb-5ac165694228	vodra	vdr	Vodra	f	\N	2023-05-24	2023-05-24
7a7629c0-1a69-4b89-8c17-5ef10bd63184	voice-street	vst	Voice Street	f	\N	2023-05-24	2023-05-24
a60a8cb5-8991-4b0f-8b64-fbf11e50f4ba	void-ad9a561a-8bca-4c17-9a3f-483f5cf20ac0	void	VOID	f	\N	2023-05-24	2023-05-24
eeb8e86d-123f-440c-9787-711a4c44fdd4	void-games	void	Void Games	f	\N	2023-05-24	2023-05-24
903a7c4e-b1ca-43b9-bc52-68ce2a83f778	volare-network	volr	Volare Network	f	\N	2023-05-24	2023-05-24
4c8d64e5-afa2-43d7-ab85-afd957c7bfa3	volentix-vtx	vtx	Volentix	f	\N	2023-05-24	2023-05-24
9b2a6bb1-514b-424a-92c0-8c5c16df46c4	voltage	volt	Voltage	f	\N	2023-05-24	2023-05-24
6d04ab28-02db-44db-97c3-7ad96f5f449b	volta-protocol	volta	Volta Protocol	f	\N	2023-05-24	2023-05-24
c2b4422f-62e9-421f-9096-8074698b4694	volt-inu	volt	Volt Inu [OLD]	f	\N	2023-05-24	2023-05-24
1363b76b-a73c-4d73-aa52-ed241679ada8	volt-inu-2	volt	Volt Inu	f	\N	2023-05-24	2023-05-24
704ab2e6-1fb6-4e0f-b3df-037aaac8c11a	voltswap	volt	VoltSwap	f	\N	2023-05-24	2023-05-24
53ebd51d-2569-4011-b263-b918749ea6cf	vortex-protocol	vp	Vortex Protocol	f	\N	2023-05-24	2023-05-24
6dd54ccb-0d4e-4ef9-8bdf-3f116f75b536	voucher-dot	vdot	Voucher DOT	f	\N	2023-05-24	2023-05-24
0ce86af3-dc51-44e1-bd8d-6e6b6ccc6d30	voucher-eth	veth	Voucher ETH	f	\N	2023-05-24	2023-05-24
9d7cb570-b3fb-4242-9a4a-871d5a798a64	voucher-ethereum-2-0	veth	Voucher Ethereum 2.0	f	\N	2023-05-24	2023-05-24
6585e7e8-3713-4a1d-83a5-6f871b0ad6b1	voucher-glmr	vglmr	Voucher GLMR	f	\N	2023-05-24	2023-05-24
b5635f85-fc87-45ee-9ecc-31f8bfd78274	voucher-ksm	vksm	Voucher KSM	f	\N	2023-05-24	2023-05-24
dd5d53d1-ac73-4a16-89f3-0615df57d378	voucher-movr	vmovr	Voucher MOVR	f	\N	2023-05-24	2023-05-24
3e71254c-608c-4673-b5ce-de05f2eba9b5	vow	vow	Vow	f	\N	2023-05-24	2023-05-24
e47ff56c-0734-4502-a25d-24e1077920bd	voxel-x-network	vxl	Voxel X Network	f	\N	2023-05-24	2023-05-24
0ad73e34-5933-421f-9296-0ee38625ae1d	vox-finance-2-0	vox2.0	Vox Finance 2.0	f	\N	2023-05-24	2023-05-24
8e147b68-4158-4ce3-bf6a-cd840cf91a6c	voxies	voxel	Voxies	f	\N	2023-05-24	2023-05-24
8cd5fcd1-9e79-4380-9e6c-4af16683acf3	voxnet	vxon	VoxNET	f	\N	2023-05-24	2023-05-24
e27db4b7-7919-4283-8874-7cbe18672160	voy-finance	voy	Voy Finance	f	\N	2023-05-24	2023-05-24
861e786b-93c7-4696-9599-51dcd5c68f6a	vpncoin	vash	VPNCoin	f	\N	2023-05-24	2023-05-24
9521195b-7e9f-4a8c-90d7-28b314d867af	vres	vrs	VRES	f	\N	2023-05-24	2023-05-24
c00d90b6-6645-490c-9ed6-5317be67c6f7	vsolidus	vsol	VSolidus	f	\N	2023-05-24	2023-05-24
343327e0-2069-4782-8b8c-620ff94f7e24	v-systems	vsys	V.SYSTEMS	f	\N	2023-05-24	2023-05-24
52a2d12a-b804-4553-a2a6-1db319edae98	vulcan-forged	pyr	Vulcan Forged	f	\N	2023-05-24	2023-05-24
530655e0-9611-4663-839c-bb3c955e3f20	vulkania-2	vlk	Vulkania	f	\N	2023-05-24	2023-05-24
d3297d0e-344f-4571-9705-71c11f854f42	vvs-finance	vvs	VVS Finance	f	\N	2023-05-24	2023-05-24
e1de806b-5178-4a02-adef-ac501c4ca27a	vxdefi	vxdefi	vXDEFI	f	\N	2023-05-24	2023-05-24
6668da00-df6e-4566-9cd3-c516ee6eaefc	vxxl	vxxl	VXXL	f	\N	2023-05-24	2023-05-24
d550602e-e437-4407-8f68-310b74582115	vyfinance	vyfi	VyFinance	f	\N	2023-05-24	2023-05-24
2f108e85-1862-44de-ac8e-c128b9fcb638	vynk-chain	vync	VYNK Chain	f	\N	2023-05-24	2023-05-24
11dd6803-10ad-47c4-8bf2-2bd5c2c966e0	wabi	wabi	Wabi	f	\N	2023-05-24	2023-05-24
2f664b31-da07-4ddf-aea1-9c03364bc899	wadzpay-token	wtk	WadzPay	f	\N	2023-05-24	2023-05-24
1c3b4440-51c7-4690-91cb-4b3f7afb32b6	wagerr	wgr	Wagerr	f	\N	2023-05-24	2023-05-24
4d1b60af-c337-4b7f-83ca-12682bfe31a5	waggle-network	wag	Waggle Network	f	\N	2023-05-24	2023-05-24
e6abb479-ee60-4829-b0fb-56d090a9676d	wagie	wagie	WAGIE	f	\N	2023-05-24	2023-05-24
45449dcf-2241-4cd9-827c-2a5dbce0dc4c	wagmi-coin	wagmi	Wagmi Coin	f	\N	2023-05-24	2023-05-24
226a8dd4-1891-45ea-9a4e-4540f2f382cf	wagmi-game-2	wagmigames	WAGMI Game	f	\N	2023-05-24	2023-05-24
b48ceeea-e98c-4b1a-ad96-287c9ff2cceb	wagmi-on-solana	wagmi	WAGMI On Solana	f	\N	2023-05-24	2023-05-24
ca54f325-42f8-4afd-bce0-26f250ef203b	wagmi-token	wag	WAGMI Token	f	\N	2023-05-24	2023-05-24
f8fbfc23-1cc1-4e60-9d98-c7c9d46f0b53	wagyuswap	wag	WagyuSwap	f	\N	2023-05-24	2023-05-24
3b743ad9-7fb6-4fc2-90aa-3cc39f861cb3	waifer	waif	Waifer	f	\N	2023-05-24	2023-05-24
16aa6d74-8ccf-4e23-8584-22a6c1d070d1	waifu	waifu	Waifu	f	\N	2023-05-24	2023-05-24
3417e920-2041-4786-aba5-3ae9b06c476f	waifu-token	waif	Waifu Genesis Card Collection	f	\N	2023-05-24	2023-05-24
2538b9fe-b283-4512-b2a6-d96a4a97c0a5	wait	wait	WAIT	f	\N	2023-05-24	2023-05-24
06144216-4208-456e-a232-a1bc5704ddb9	wakanda-inu	wkd	Wakanda Inu	f	\N	2023-05-24	2023-05-24
6ce98da8-61e3-4e12-8cfd-df45f139c4db	walken	wlkn	Walken	f	\N	2023-05-24	2023-05-24
0166cc18-8ff6-420a-be18-eb5a632ea542	wallax	wlx	Wallax	f	\N	2023-05-24	2023-05-24
ab6f21df-c93f-480a-8b09-e409eac8dbaa	wallet-defi	wdf	Wallet Defi	f	\N	2023-05-24	2023-05-24
b0d4ecb9-7ba1-4686-bf8c-d207047b8c11	walletnow	wnow	WalletNow	f	\N	2023-05-24	2023-05-24
8869c35f-14d8-4665-8e71-26a2da00a915	wallet-safu	wsafu	Wallet SAFU	f	\N	2023-05-24	2023-05-24
345c9546-89ef-4c67-bbcc-05439c153a97	wallet-swap	wswap	Wallet Swap	f	\N	2023-05-24	2023-05-24
dfa6eba4-73a7-47e3-809c-c2851c2e5eae	wallfair	wfair	Wallfair	f	\N	2023-05-24	2023-05-24
40ae6673-df4e-4b4a-a727-8c8d76bfc3ab	wall-street-baby	wsb	Wall Street Baby	f	\N	2023-05-24	2023-05-24
ed0706b8-ed90-4d21-9341-345655db97c6	wall-street-bets-dapp	wsb	WallStreetBets DApp	f	\N	2023-05-24	2023-05-24
4e030f3a-a5b4-4f82-b8dc-11aceb51f2c6	wall-street-games	wsg	Wall Street Games	f	\N	2023-05-24	2023-05-24
aaf6a3c7-b633-444d-a75d-5c733be71448	walrus	wlrs	Walrus	f	\N	2023-05-24	2023-05-24
1b76b8c7-99fc-41b6-9437-2a88a5e87593	walter-inu	$winu	Walter Inu	f	\N	2023-05-24	2023-05-24
7f6dfa37-0ed1-484c-974f-7c504363ea49	waltonchain	wtc	Waltonchain	f	\N	2023-05-24	2023-05-24
dbcf9dd3-21a1-4221-a85d-7b8af946a81a	wam	wam	Wam	f	\N	2023-05-24	2023-05-24
7cebb4ee-ef84-47a3-90d7-240c37a691d4	wanaka-farm	wana	Wanaka Farm	f	\N	2023-05-24	2023-05-24
bd87c589-c0f4-4d17-b3ac-bb97137162b3	wanaka-farm-wairere-token	wai	Wanaka Farm WAIRERE	f	\N	2023-05-24	2023-05-24
23c58a17-af74-4a4d-80b8-48195459cf05	wanbtc	wanbtc	wanBTC	f	\N	2023-05-24	2023-05-24
282c46e2-e0eb-4ac0-8fd6-abd13989da1f	wanchain	wan	Wanchain	f	\N	2023-05-24	2023-05-24
55ed8a2b-2605-4a6b-8a15-821683f2b54e	waneth	waneth	wanETH	f	\N	2023-05-24	2023-05-24
d551a6fc-108a-4bed-9f29-5b427e90145c	wannaswap	wanna	WannaSwap	f	\N	2023-05-24	2023-05-24
191d7ce9-9c5d-4e5d-adc2-85e5f389b42a	wanswap	wasp	WanSwap [OLD]	f	\N	2023-05-24	2023-05-24
2dded688-c14a-44a5-9465-bd7dc082d2da	wanswap-2	wasp	WanSwap	f	\N	2023-05-24	2023-05-24
24247991-2393-4f8a-aae1-940c8eb80966	wanusdc	wanusdc	wanUSDC	f	\N	2023-05-24	2023-05-24
d6add899-8dc4-41d5-8b30-fc1e3066ffcc	wanusdt	wanusdt	wanUSDT	f	\N	2023-05-24	2023-05-24
413132c1-150a-48ea-a43d-6b0aaf30ced1	wanxrp	wanxrp	wanXRP	f	\N	2023-05-24	2023-05-24
f5a84dc2-7c3e-4514-b354-2f2daaf3e591	war-bond	wbond	War Bond	f	\N	2023-05-24	2023-05-24
3da178bc-f161-4d77-9eee-61f7d692b582	war-coin	war	War Coin	f	\N	2023-05-24	2023-05-24
b9b160e5-7242-42cb-8d9e-46c4b25c6f7e	warena	rena	Warena	f	\N	2023-05-24	2023-05-24
b1303fc6-59fd-42c7-aebd-80cc8090ddb7	warp-cash	warp	Warp Cash	f	\N	2023-05-24	2023-05-24
96a8b999-27b0-4fd8-bc0f-b32e72f64d38	warp-finance	warp	Warp Finance	f	\N	2023-05-24	2023-05-24
226bd5c8-96c1-4d61-8c32-f73a1edfffb9	warrior-empires	chaos	Warrior Empires	f	\N	2023-05-24	2023-05-24
89994982-cb64-428d-88b1-6aecf4b56234	warrior-rare-essentials	ware	Warrior Rare Essentials	f	\N	2023-05-24	2023-05-24
05013600-9f70-41e6-a790-30ab01d71f15	wasabix	wasabi	WasabiX	f	\N	2023-05-24	2023-05-24
e265937a-852c-452f-bc56-cbe18c7f3567	wasdaq-finance	wsdq	Wasdaq Finance	f	\N	2023-05-24	2023-05-24
d8411ce0-d5bb-4de5-bc3d-ec0bf7ed0c6f	wasder	was	Wasder	f	\N	2023-05-24	2023-05-24
ab3414fb-c9a6-47f0-b961-569fde75a019	wassie	wassie	WASSIE	f	\N	2023-05-24	2023-05-24
e77e8be9-fba3-4753-8192-4c8baf2f1a89	waste-coin	waco	Waste Digital Coin	f	\N	2023-05-24	2023-05-24
83a7ebdf-5904-4294-8633-575a070f2bef	watchdo	wdo	WatchDO	f	\N	2023-05-24	2023-05-24
3caa8458-baf6-4611-94fd-c6f78c2b5bfe	wateenswap	wtn	Wateenswap	f	\N	2023-05-24	2023-05-24
c0f84798-3595-44f4-9e5b-0d628901e249	waterfall-finance	waterfall	Waterfall Finance	f	\N	2023-05-24	2023-05-24
535552fa-e868-4d98-a5ff-b5a242187e86	waterfall-governance-token	wtf	Waterfall Governance	f	\N	2023-05-24	2023-05-24
2e0cf702-78c6-4c99-842e-9ec7ff8ec43a	wattton	watt	WATTTON	f	\N	2023-05-24	2023-05-24
fd74eddd-c95e-418c-93ec-82565ebc99e0	waultswap	wex	WaultSwap	f	\N	2023-05-24	2023-05-24
fbfad743-d5eb-4a6f-ad17-dc1996bedd85	wavelength	wave	Wavelength	f	\N	2023-05-24	2023-05-24
fc4575a4-d65a-40e0-b3f6-0f0cb4cc84d7	waves	waves	Waves	f	\N	2023-05-24	2023-05-24
7b69e777-f0d4-409e-b89e-fac6d66dae90	waves-ducks	egg	Waves Ducks	f	\N	2023-05-24	2023-05-24
0e50a455-7188-40b7-af69-e7812e4677fd	waves-enterprise	west	Waves Enterprise	f	\N	2023-05-24	2023-05-24
de0d2bf5-9b99-4632-8bcc-ce105d1b76b2	waves-exchange	wx	WX Network Token	f	\N	2023-05-24	2023-05-24
490cd4e8-cb90-4766-a4a9-960703ac85b2	wavesgo	wgo	WavesGo	f	\N	2023-05-24	2023-05-24
81351edc-4e06-405d-b650-37dbb63dc3c7	wax	waxp	WAX	f	\N	2023-05-24	2023-05-24
b4d7339c-b5c3-4662-9739-204c0cb604dc	waxe	waxe	WAXE	f	\N	2023-05-24	2023-05-24
966adca4-6724-432f-8391-61f88afa2d10	wayawolfcoin	ww	WayaWolfCoin	f	\N	2023-05-24	2023-05-24
eec67825-35d1-4ccf-8e18-f4381642c2e3	waykichain	wicc	WaykiChain	f	\N	2023-05-24	2023-05-24
d632507c-1a5b-4e20-9674-4f4cd8b3420b	waykichain-governance-coin	wgrt	WaykiChain Governance Coin	f	\N	2023-05-24	2023-05-24
a62bc8ca-87e3-4add-958e-fb3149b271b7	wazirx	wrx	WazirX	f	\N	2023-05-24	2023-05-24
23c104b5-9c78-492f-975b-0ca1cca40961	wb-mining	wbm	WB-Mining	f	\N	2023-05-24	2023-05-24
6001dbab-0276-4fe6-84d9-5e42cf1a649c	wbnb	wbnb	Wrapped BNB	f	\N	2023-05-24	2023-05-24
120a8a19-e84a-411d-b8de-67b450072c32	wbtc-plenty-bridge	wbtc.e	WBTC (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
1bbca72f-4dd9-4255-85ce-0789e1dd6d4e	wbtc-yvault	yvwbtc	WBTC yVault	f	\N	2023-05-24	2023-05-24
6a5b81c6-c73e-4d38-9899-f73345ff5c5c	wcapes	wca	WCAPES	f	\N	2023-05-24	2023-05-24
724a8dd5-838a-422b-a115-acc8e6dfb060	wdot	wdot	WDOT	f	\N	2023-05-24	2023-05-24
e4eb5b0d-ec57-4a56-8f74-42a20d1d3c03	we2net	we2net	We2net	f	\N	2023-05-24	2023-05-24
d4efee7b-0fe9-4ea8-8214-4a0c147ff80a	wealthsecrets	wsc	WealthSecrets	f	\N	2023-05-24	2023-05-24
b53f7de9-fa62-465e-bd3a-bdcbd0bb3bab	web3camp	3p	Web3Camp	f	\N	2023-05-24	2023-05-24
9898ff40-58ac-4ecd-9d87-d97898ef622c	web3-inu	web3	WEB3 Inu	f	\N	2023-05-24	2023-05-24
18e3c93b-119c-4f6a-8d7d-2ca40f8b95c9	web3shot	w3s	Web3Shot	f	\N	2023-05-24	2023-05-24
93f64472-48ee-43af-942f-51a72956cbbb	web3tools	web3t	Web3Tools	f	\N	2023-05-24	2023-05-24
3fde80e0-70b5-4f06-9cca-df8563038ce0	web4-ai	web4	WEB4 AI	f	\N	2023-05-24	2023-05-24
0d11f67a-4d15-4355-ba0c-8d79bbe61787	web-ai	webai	Web AI	f	\N	2023-05-24	2023-05-24
313fc636-9d4f-467f-86e9-661600b38b37	webcash	web	Webcash	f	\N	2023-05-24	2023-05-24
1381f3a6-45ae-4cd3-9c10-644dbf5ac154	webchain	mintme	MintMe.com Coin	f	\N	2023-05-24	2023-05-24
5e5a9abc-7939-4c59-9ad4-2fed4ae1791a	web-four	webfour	WEBFOUR	f	\N	2023-05-24	2023-05-24
b1b108d8-03b5-4622-82e0-7a0737d01518	weble-ecosystem-token	wet	Weble Ecosystem	f	\N	2023-05-24	2023-05-24
23564c09-0ba1-4f8a-bb45-2edc3702df75	webuy	we	WeBuy	f	\N	2023-05-24	2023-05-24
ede0dbcf-df8d-457e-a797-23cdac2bb026	wecoown	wcx	WeCoOwn	f	\N	2023-05-24	2023-05-24
fef82221-38ae-4f90-b905-d30a720005fa	wednesday	wd	Wednesday	f	\N	2023-05-24	2023-05-24
cf91a7b9-d241-467e-84fc-b3b6e020e1c4	wednesday-inu	wed	Wednesday Inu	f	\N	2023-05-24	2023-05-24
6ea40611-8a28-4d0c-931c-7bb65b51da08	wegro	wegro	WeGro	f	\N	2023-05-24	2023-05-24
19237219-4058-462a-87c1-7c63ce035c25	weld	weld	WELD	f	\N	2023-05-24	2023-05-24
84475899-ef9f-4dbd-bf42-3e6eedc57c66	welltrado	wtl	Welltrado	f	\N	2023-05-24	2023-05-24
51d180d0-d7ea-4aa7-9786-6b2217c7d4ae	welups-blockchain	welups	Welups Blockchain	f	\N	2023-05-24	2023-05-24
a07158ec-ba12-4c1d-9df7-d06a4d64dd3b	wemergetoken	mrg	WemergeToken	f	\N	2023-05-24	2023-05-24
b306a53a-9af3-46a4-9c85-5023498a7499	wemix-dollar	wemix$	WEMIX Dollar	f	\N	2023-05-24	2023-05-24
0ab0a865-7d0e-40b1-815d-23bb63ebc13b	wemix-token	wemix	WEMIX	f	\N	2023-05-24	2023-05-24
26ca5e7a-9ff2-46a4-ac4b-e586a836dbbf	wen-token	wen	WEN Token	f	\N	2023-05-24	2023-05-24
66ae7477-5116-46ce-b60f-d776beb3d3a0	wepiggy-coin	wpc	WePiggy Coin	f	\N	2023-05-24	2023-05-24
e8b8224f-713c-46f3-92e3-6e56fc2b3cad	wepower	wpr	WePower	f	\N	2023-05-24	2023-05-24
65df9b8e-6ef6-4f30-bb67-3d2e2cd76155	wesendit	wsi	WeSendit	f	\N	2023-05-24	2023-05-24
409af8eb-1007-4ab7-8b2e-7babb9c33739	westarter	war	WeStarter	f	\N	2023-05-24	2023-05-24
5d9ca157-171d-434b-a06e-ce2f53577146	wetc-hebeswap	wetc	Wrapped ETC	f	\N	2023-05-24	2023-05-24
af9861a4-7ee8-43b4-bdda-761c24cadba1	weth	weth	WETH	f	\N	2023-05-24	2023-05-24
9816ccf7-5605-48f3-93f3-aaf9980a2ee8	weth-plenty-bridge	weth.p	Polygon WETH (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
72593504-17a5-4863-bcde-00d0e7c3c636	weth-plenty-bridge-65aa5342-507c-4f67-8634-1f4376ffdf9a	weth.e	WETH (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
ab0a30d7-7ba7-4712-82ba-5c2288357019	weth-yvault	yvweth	WETH yVault	f	\N	2023-05-24	2023-05-24
8607208c-47c7-484f-ba5a-e172138afcbc	weway	wwy	WeWay	f	\N	2023-05-24	2023-05-24
343fb92a-8541-4d8a-b329-9837eea8a8f0	wewe	wewe	WEWE	f	\N	2023-05-24	2023-05-24
0ee9e2a0-0f60-43c9-ab01-648b2b739551	weyu	weyu	WEYU	f	\N	2023-05-24	2023-05-24
4a3ec5f8-bb25-4504-a1a9-52e01aa7f350	wfdp	wfdp	WFDP	f	\N	2023-05-24	2023-05-24
7b9515e8-b6dd-4b74-bbc2-75e2f5804f31	wgmi	wgmi	WGMI	f	\N	2023-05-24	2023-05-24
41b6754e-a901-42f2-86de-c055266c6b38	whale	whale	WHALE	f	\N	2023-05-24	2023-05-24
3995c05c-795d-41ca-ba46-75b4dbb899b5	whale-maker-fund	wmf	Whale Maker Fund	f	\N	2023-05-24	2023-05-24
fec14b49-3297-4059-b018-d1819b3b8ac1	whaleroom	whl	WhaleRoom	f	\N	2023-05-24	2023-05-24
5b9665c1-42af-4670-9657-439021da3f7c	wheat	wheat	Wheat	f	\N	2023-05-24	2023-05-24
9b61e16c-5356-42ce-86b3-9c225d99863a	wheat-token	wheat	Wheat (BSC)	f	\N	2023-05-24	2023-05-24
0d23868c-95f9-40fd-b202-2dd52049adaf	whee	whee	WHEE	f	\N	2023-05-24	2023-05-24
98ce79b6-2725-4cce-b497-cc47ad932a95	whey-token	whey	Shredded Apes Whey	f	\N	2023-05-24	2023-05-24
a096e749-b6d8-4502-8c5b-54ebabd89397	whisper	wisp	Whisper	f	\N	2023-05-24	2023-05-24
56ae6b6d-6a08-44f1-bf1e-4097ee2af5cc	whitebit	wbt	WhiteBIT Token	f	\N	2023-05-24	2023-05-24
a54b7f90-8e77-497f-94dd-0c3919ab2680	whitecoin	xwc	Whitecoin	f	\N	2023-05-24	2023-05-24
00e4cda8-bbbc-4f41-b8d7-0a2b013ccab6	whiteheart	white	Whiteheart	f	\N	2023-05-24	2023-05-24
d5ed996b-b4b8-4ac1-9dfb-1c590a325856	white-lotus	lotus	White Lotus	f	\N	2023-05-24	2023-05-24
602c94ce-daea-4303-a87f-bf77e7a9596a	white-whale	whale	White Whale	f	\N	2023-05-24	2023-05-24
fcebf729-81a0-4d02-9fb6-0a6872757881	whole-earth-coin	wec	Whole Earth Coin	f	\N	2023-05-24	2023-05-24
9f8ef338-e5eb-49b0-b1ab-64fd7392b789	wibx	wbx	WiBX	f	\N	2023-05-24	2023-05-24
26688243-a960-4cb7-86f0-de3943d846a6	wicked-moai	moai	Wicked Moai	f	\N	2023-05-24	2023-05-24
e8ee6f92-0957-454a-80a6-5693ee8dbdfd	wicrypt	wnt	Wicrypt	f	\N	2023-05-24	2023-05-24
8d15b25a-2827-4c17-8253-2c98dc768d7d	widi-soul	wso	Widi Soul	f	\N	2023-05-24	2023-05-24
82dead46-6141-4890-9de0-560e601b0b6f	wifedoge	wifedoge	Wifedoge	f	\N	2023-05-24	2023-05-24
27c46d89-9c26-4f41-b93b-294a4e24a3ab	wifi	wifi	WiFi Map	f	\N	2023-05-24	2023-05-24
591fb681-039a-4a3a-99b1-5c9497d7d3e9	wiggly-finance	wgl	Wiggly Finance	f	\N	2023-05-24	2023-05-24
a26b5db0-e264-4efd-8c52-bc4eb03caf93	wigoswap	wigo	WigoSwap	f	\N	2023-05-24	2023-05-24
9875d5d6-2266-4b91-925f-0f652012b800	wiki-cat	wkc	Wiki Cat	f	\N	2023-05-24	2023-05-24
c1b1127a-813a-48c7-94df-b607bc98be56	wilder-world	wild	Wilder World	f	\N	2023-05-24	2023-05-24
f554686d-1a5a-4306-964c-be01430b862b	wild-island-game	wild	Wild Island Game	f	\N	2023-05-24	2023-05-24
2ccd5aed-3901-42ed-bf57-b1ea520e9998	winerz	$wnz	Winerz	f	\N	2023-05-24	2023-05-24
ec32ddeb-d96d-4fa2-8e5f-c2a8dcf6cede	wine-shares	wine	Wine Shares	f	\N	2023-05-24	2023-05-24
9d19ee9a-240d-4d6c-8324-b82a35260735	wing-finance	wing	Wing Finance	f	\N	2023-05-24	2023-05-24
93763c97-e11f-43cc-a834-79316145c1a3	wingriders	wrt	WingRiders	f	\N	2023-05-24	2023-05-24
dacf249d-c068-41fe-b779-c51a0cdbb61f	wings	wings	Wings	f	\N	2023-05-24	2023-05-24
300a25d8-841e-4f05-8709-0bf0254b1c99	wingswap	wis	WingSwap	f	\N	2023-05-24	2023-05-24
ebf80a30-6239-47a4-b334-626ced846471	wink	win	WINkLink	f	\N	2023-05-24	2023-05-24
13a80b39-c497-42bc-b7b1-42f5c3b80f20	winklink-bsc	win	WINkLink BSC	f	\N	2023-05-24	2023-05-24
37e8a5cf-bb73-4e64-80c6-e3773d0dcc45	winr-protocol	winr	WINR Protocol	f	\N	2023-05-24	2023-05-24
718074ad-d7f5-4baa-9c0b-880eed37b478	winry-inu	winry	Winry Inu	f	\N	2023-05-24	2023-05-24
6025cdf5-808f-4b4d-8b21-dd8c4f93f7c9	winter	winter	Winter	f	\N	2023-05-24	2023-05-24
daf8e1fc-f5b3-405f-af54-b969cc392626	winterdog	wdog	Winterdog	f	\N	2023-05-24	2023-05-24
95f91f8c-b818-499f-b395-9bb367316767	wipemyass	wipe	WipeMyAss	f	\N	2023-05-24	2023-05-24
e48f2241-81f0-4bb8-9f36-ac07c08645d4	wirex	wxt	WXT Token	f	\N	2023-05-24	2023-05-24
fd586a15-0fc8-4ee3-873c-8eae9d86942f	wirtual	wirtual	Wirtual	f	\N	2023-05-24	2023-05-24
d7d0fa6f-ab30-4fce-9cc8-93ec4c55c4a6	wise-token11	wise	Wise	f	\N	2023-05-24	2023-05-24
3f6a7122-9af0-499f-a026-1fa9d5882282	witch-token	witch	Witch Token	f	\N	2023-05-24	2023-05-24
e4d2ef92-ffc1-492e-b995-b60646caf10c	witnet	wit	Witnet	f	\N	2023-05-24	2023-05-24
03cadc47-2222-4e85-9a66-30827c0c69c9	wizardia	wzrd	Wizardia	f	\N	2023-05-24	2023-05-24
a1f04010-cc1f-4227-8e06-b0de3af7eb2e	wizard-token	wizard	Wizard BSC	f	\N	2023-05-24	2023-05-24
e966f9d2-4c34-4b56-bbe9-a0bb91eaf23b	wizard-token-8fc587d7-4b79-4f5a-89c9-475f528c6d47	wizt	Wizard Token	f	\N	2023-05-24	2023-05-24
63da9d2c-d1c3-46ad-863a-60a64d019f06	wizard-vault-nftx	wizard	WIZARD Vault (NFTX)	f	\N	2023-05-24	2023-05-24
8f1f7977-cff4-4e84-88c1-a7ca7e09e02e	wizarre-scroll	scrl	Wizarre Scroll	f	\N	2023-05-24	2023-05-24
c979596f-a98a-46c7-b272-de231e0d0523	wiz-protocol	wiz	WIZ Protocol	f	\N	2023-05-24	2023-05-24
0e3991fd-fbee-421a-a086-0ff25fe5af78	wjewel	wjewel	WJEWEL	f	\N	2023-05-24	2023-05-24
0d840855-fedf-4e1e-8a82-1181c53cb0e7	wliti	wliti	wLITI	f	\N	2023-05-24	2023-05-24
d7f35836-aaae-4fb4-92ca-d33ce1841ce2	wlitidao	wld	wLitiDAO	f	\N	2023-05-24	2023-05-24
a54084d3-273a-4261-8e2b-da8d4bfc90b8	wmatic	wmatic	Wrapped Matic	f	\N	2023-05-24	2023-05-24
3a9594a1-2501-4f05-abc8-257779730faf	wmatic-plenty-bridge	wmatic.p	WMATIC (Plenty Bridge)	f	\N	2023-05-24	2023-05-24
8199f2aa-23fb-4ac9-92d9-b64703048fcb	wohlstand-token	wt	Wohlstand	f	\N	2023-05-24	2023-05-24
457e5a20-788b-4396-912e-14aadb7ef8a9	wojak	wojak	Wojak	f	\N	2023-05-24	2023-05-24
0c93128c-bcde-4f4b-a7ea-b3e167c268ba	wojak-finance	woj	Wojak Finance	f	\N	2023-05-24	2023-05-24
34210235-8c7e-4f2f-a5b7-45b30d3dfaa2	wolfcoin	wolf	WOLFCOIN	f	\N	2023-05-24	2023-05-24
4983860d-147b-48ff-8207-ef2d2347ca35	wolf-game-wool	wool	Wolf Game Wool	f	\N	2023-05-24	2023-05-24
4e7ca911-a971-46bf-8731-8525e4eb320d	wolf-pups-2	wolfies	WOLF PUPS	f	\N	2023-05-24	2023-05-24
34128356-ea20-4f10-8576-cf680f7bd465	wolfsafepoorpeople	wspp	WolfSafePoorPeople	f	\N	2023-05-24	2023-05-24
771e4cb0-0d31-4828-886c-7abffbf81014	wolfsafepoorpeople-polygon	wspp	WolfSafePoorPeople Polygon	f	\N	2023-05-24	2023-05-24
3e220e0c-9f74-4b82-965e-c200699837e8	wolf-town-wool	wtwool	Wolf Town Wool	f	\N	2023-05-24	2023-05-24
b81e7525-03dc-4aa3-8c9c-2c628bf7ad4a	wolf-ventures	$wv	Wolf Ventures	f	\N	2023-05-24	2023-05-24
3df41621-71aa-4b3e-9c61-0d43945b57e0	wolfy	wolfy	WOLFY	f	\N	2023-05-24	2023-05-24
8644d8f3-07c3-40b3-af28-8a64c253aca4	wolv	wolv	WOLV	f	\N	2023-05-24	2023-05-24
7181eb51-db5c-4c8e-94b8-cfd2a10515c5	wolverinu-2	wolverinu	Wolverinu	f	\N	2023-05-24	2023-05-24
196ff5b9-d908-452d-9954-058463d7251a	wombat	wombat	Wombat	f	\N	2023-05-24	2023-05-24
4f5ba47b-62c0-4469-acf9-d9df300a51d5	wombat-exchange	wom	Wombat Exchange	f	\N	2023-05-24	2023-05-24
cda4841b-2bfb-468b-9f71-4d0721d2ef76	wombex	wmx	Wombex	f	\N	2023-05-24	2023-05-24
e872a1e7-8ee3-40fb-a87e-99184c84e587	wom-token	wom	WOM Protocol	f	\N	2023-05-24	2023-05-24
e20adf4f-4d33-4ab9-8efe-0f9d93484b93	wonderhero	wnd	WonderHero [OLD]	f	\N	2023-05-24	2023-05-24
54805572-45a3-48ed-95b9-472344d1b6ad	wonderland	time	Wonderland TIME	f	\N	2023-05-24	2023-05-24
2b5841aa-2bff-4392-a8af-328ddf44f77d	wonderly-finance	afx	Wonderly Finance	f	\N	2023-05-24	2023-05-24
71aeacb9-96dd-4aa4-b495-eaf60c5ccf5a	wonderly-finance-xeth	xeth	Wonderly Finance xETH	f	\N	2023-05-24	2023-05-24
2db42843-3431-4fda-b60a-4881162b6056	wonderman-nation	wndr	Wonderman Nation	f	\N	2023-05-24	2023-05-24
762098a2-c4a1-4277-ab1a-68a9e76d84f6	wonderverse	wonder	Wonderverse	f	\N	2023-05-24	2023-05-24
dd8307b8-1f65-48a9-bcba-f7bf9b36bb12	woodcoin	log	Woodcoin	f	\N	2023-05-24	2023-05-24
d387a36e-16f8-43ac-9a00-081f624c8a41	woof-token	woof	WOOF	f	\N	2023-05-24	2023-05-24
0ca0491e-7525-4124-8185-bc9c14c2cf75	woofwork-io	woof	WoofWork.io	f	\N	2023-05-24	2023-05-24
c1683588-9eae-4de9-b8df-535d8210bf10	woofy	woofy	Woofy	f	\N	2023-05-24	2023-05-24
57b26c31-66be-41a2-a460-539d7b7d6379	woo-network	woo	WOO Network	f	\N	2023-05-24	2023-05-24
066f7d61-6d45-488a-bbab-f5aecbb8b016	woonkly-power	woop	Woonkly Power	f	\N	2023-05-24	2023-05-24
65c56b8e-5dc5-49d3-9645-f96450766ed8	woop	woop	WOOP	f	\N	2023-05-24	2023-05-24
432c659a-1cda-406f-87cf-6f4278060b35	woozoo-music	wzm	Woozoo Music	f	\N	2023-05-24	2023-05-24
c9cd2329-68e8-4f21-ad36-a600fc57318b	wordlex	wdx	Wordlex	f	\N	2023-05-24	2023-05-24
ace901fd-6af3-464d-a5cd-2fc7889afa8e	work-quest-2	wqt	Work Quest	f	\N	2023-05-24	2023-05-24
bda1ca93-3ebf-4daf-86e4-35a9ddcc0cb2	worldcoin	wdc	WorldCoin	f	\N	2023-05-24	2023-05-24
d3b30c65-3b54-494d-b9f5-65c67f2e628b	worldcore	wrc	Worldcore	f	\N	2023-05-24	2023-05-24
ee1c3b50-6ae2-4544-901c-c498272c8ff4	world-mobile-token	wmt	World Mobile Token	f	\N	2023-05-24	2023-05-24
b31fde96-5625-44e7-b38d-c5c38b2af136	world-of-defish	wod	World of Defish	f	\N	2023-05-24	2023-05-24
97169080-c65c-436e-a051-b3acc40741d6	world-of-legends	wol	World of Legends	f	\N	2023-05-24	2023-05-24
c30f6158-2456-4916-80ed-4802f58c92a3	wownero	wow	Wownero	f	\N	2023-05-24	2023-05-24
0c5d468f-59f0-4db6-bad4-a259dac401b9	wowswap	wow	WOWswap	f	\N	2023-05-24	2023-05-24
f791a315-2828-45a6-af07-b6ad9b2a611b	wow-token	wow	WOWNFT	f	\N	2023-05-24	2023-05-24
b61223f8-ad84-4eca-814d-e9fe4e4546ad	wozx	wozx	Efforce	f	\N	2023-05-24	2023-05-24
2637dc52-e9a1-433a-9ad3-b4e99ef65e1e	wpt-investing-corp	wpt	WPT Investing Corp	f	\N	2023-05-24	2023-05-24
fcaf75c7-2d0c-45b4-a38e-9c68c6ea9e2d	wrap-governance-token	wrap	WRAP Governance	f	\N	2023-05-24	2023-05-24
b8b1a8f8-c043-4aa9-8499-644a81703c2c	wrapped-accumulate	wacme	Wrapped Accumulate	f	\N	2023-05-24	2023-05-24
0c94ca46-2e9c-4ca2-9ae9-a267621da6e4	wrapped-ada	wada	Wrapped ADA	f	\N	2023-05-24	2023-05-24
3baf91a2-485f-4e9e-82cf-d467491526f0	wrapped-algo	xalgo	Wrapped ALGO	f	\N	2023-05-24	2023-05-24
86e89921-901a-4641-9b6f-5c2684450aba	wrapped-ampleforth	wampl	Wrapped Ampleforth	f	\N	2023-05-24	2023-05-24
1f0cec99-e322-4723-897b-4ffbd28e6592	wrapped-anatha	wanatha	Wrapped ANATHA	f	\N	2023-05-24	2023-05-24
669dedf2-a87f-49bc-8511-d926ee0a6777	wrappedarc	warc	WrappedARC	f	\N	2023-05-24	2023-05-24
f6f3ad40-bff4-46a5-9a7a-61a0d823ee3a	wrapped-astar	wastr	Wrapped Astar	f	\N	2023-05-24	2023-05-24
99df0aa9-50f4-498c-8715-c6ada8feef1a	wrapped-avax	wavax	Wrapped AVAX	f	\N	2023-05-24	2023-05-24
6a020cfd-183a-4242-811f-834435017a0e	wrapped-bch	wbch	Wrapped BCH	f	\N	2023-05-24	2023-05-24
938fa819-86c7-4783-9caa-7092243e9ce1	wrapped-beacon-eth	wbeth	Wrapped Beacon ETH	f	\N	2023-05-24	2023-05-24
56588302-a5d2-47ff-9e7d-9c9453b0475d	wrapped-besc	wbesc	Wrapped BESC	f	\N	2023-05-24	2023-05-24
d862585f-d5dd-42d4-bb49-60ae27cf0a3e	wrapped-bitcoin	wbtc	Wrapped Bitcoin	f	\N	2023-05-24	2023-05-24
5ef6e324-3322-43a8-87dd-8e6c28337afe	wrapped-bitcoin-celer	cewbtc	Wrapped Bitcoin - Celer	f	\N	2023-05-24	2023-05-24
4602924c-636b-4144-881e-c252a8283a96	wrapped-bitcoin-sollet	sobtc	Wrapped Bitcoin (Sollet)	f	\N	2023-05-24	2023-05-24
b6e1f14e-418c-4a11-87b0-9b612a56f021	wrapped-bitcoin-stacks	xbtc	Wrapped Bitcoin-Stacks	f	\N	2023-05-24	2023-05-24
a877e42a-0166-4d1f-9708-61be2a34b86e	wrapped-bnb-celer	cewbnb	Wrapped BNB - Celer	f	\N	2023-05-24	2023-05-24
94fb327b-cfa0-46da-97b5-55fad283033e	wrapped-brise	wbrise	Wrapped Brise	f	\N	2023-05-24	2023-05-24
9bc69b58-d66f-43b3-bb4f-b653c8148a53	wrapped-btc-wormhole	wbtc	Wrapped BTC (Wormhole)	f	\N	2023-05-24	2023-05-24
6c41ad29-5dd9-47c0-803d-86382376dadf	wrapped-btt	wbtt	Wrapped BTT	f	\N	2023-05-24	2023-05-24
d05f0413-3ff8-4808-b5f5-577852091736	wrapped-busd	wbusd	Wrapped BUSD	f	\N	2023-05-24	2023-05-24
e7723049-0787-4eaa-8f6e-712831e1175f	wrapped-busd-allbridge-from-bsc	abbusd	Wrapped BUSD (Allbridge from BSC)	f	\N	2023-05-24	2023-05-24
65e308f9-dc34-47e6-b93f-1677a0043fc7	wrapped-centrifuge	wcfg	Wrapped Centrifuge	f	\N	2023-05-24	2023-05-24
6308fad3-3d4c-4e9e-8247-d9629ac92d24	wrapped-ckb	wckb	Wrapped CKB	f	\N	2023-05-24	2023-05-24
bfaa1be1-3b7f-450b-9eb1-2edd701ab365	wrapped-conflux	wcfx	Wrapped Conflux	f	\N	2023-05-24	2023-05-24
f5004880-ef43-4e95-84c2-281fb5a84d5a	wrapped-core	wcore	Wrapped CORE	f	\N	2023-05-24	2023-05-24
79c6b7f2-253f-4103-96a6-73f1e46d6fe3	wrapped-cro	wcro	Wrapped CRO	f	\N	2023-05-24	2023-05-24
bb5891c0-37bc-4a80-b357-81baf43e8d6f	wrapped-cube	wcube	Wrapped Cube	f	\N	2023-05-24	2023-05-24
460cc257-1702-478c-bbb8-6916cbd87c5f	wrapped-cusd-allbridge-from-celo	acusd	Wrapped CUSD (Allbridge from Celo)	f	\N	2023-05-24	2023-05-24
5a664859-04ed-488c-b864-79fdce80189e	wrapped-ecomi	womi	Wrapped ECOMI	f	\N	2023-05-24	2023-05-24
6c26ea92-c26a-49af-9d03-b40d2501c162	wrapped-elastos	wela	Wrapped Elastos	f	\N	2023-05-24	2023-05-24
c35afb80-5b82-4da0-bc98-e2a5ea2f5337	wrapped-elrond	wegld	Wrapped EGLD	f	\N	2023-05-24	2023-05-24
36850c66-d3ff-4b83-b49b-cc7dd45fca30	wrapped-energi	wnrg	Wrapped Energi	f	\N	2023-05-24	2023-05-24
66a122ae-9a71-4cb1-afca-4e397716d15b	wrapped-eos	weos	Wrapped EOS	f	\N	2023-05-24	2023-05-24
05d1dd15-5a1b-4410-a776-c765430e0d4a	wrapped-ether-celer	ceweth	Wrapped Ether - Celer	f	\N	2023-05-24	2023-05-24
97487e96-30a8-4346-a8bb-442bb567f50f	wrapped-ethereum-sollet	soeth	Wrapped Ethereum (Sollet)	f	\N	2023-05-24	2023-05-24
07ae2768-f74c-4447-8be7-d7b80397e3c3	wrapped-eth-trustless-bridge	weth	Wrapped ETH (Trustless Bridge)	f	\N	2023-05-24	2023-05-24
e8499e80-130f-48be-98b7-4f9d8c5253de	wrapped-ethw	wethw	Wrapped ETHW	f	\N	2023-05-24	2023-05-24
17a6f9c0-9aaa-4062-a811-4b5b59b690e9	wrapped-ever	wever	Wrapped Ever	f	\N	2023-05-24	2023-05-24
db55cfcf-b5c5-4e25-a872-54d7c9145b7f	wrapped-fantom	wftm	Wrapped Fantom	f	\N	2023-05-24	2023-05-24
63fd04c3-e99e-48a0-b8e7-7996cef44815	wrapped-fio	wfio	Wrapped FIO	f	\N	2023-05-24	2023-05-24
b01dd701-f377-4f31-982c-8e237326333f	wrapped-flare	wflr	Wrapped Flare	f	\N	2023-05-24	2023-05-24
3ce1e151-84d6-4a2d-b7b8-19194bd5c7e4	wrapped-flow	wflow	Wrapped Flow	f	\N	2023-05-24	2023-05-24
999748fb-9af2-424e-93e5-57d96bb75230	wrapped-hbar	whbar	Wrapped HBAR	f	\N	2023-05-24	2023-05-24
6dc45769-cd83-401f-9a0f-14e308b52579	wrapped-hec	wshec	Wrapped HEC	f	\N	2023-05-24	2023-05-24
6d113ee2-a972-41d8-b1f4-121d4c0bebe3	wrapped-huobi-token	wht	Wrapped Huobi	f	\N	2023-05-24	2023-05-24
8bdc45e9-7a69-4bed-9bea-eb40dbdd4dad	wrapped-iotex	wiotx	Wrapped IoTex	f	\N	2023-05-24	2023-05-24
014ba632-425a-4025-a8ca-1b0de01f914d	wrapped-jones-aura	wjaura	Wrapped Jones AURA	f	\N	2023-05-24	2023-05-24
c6a5612c-ec8a-4cc1-8a72-ade8710940d8	wrapped-kava	wkava	Wrapped Kava	f	\N	2023-05-24	2023-05-24
58f6b9ad-fbc2-4146-8c56-b0c6c423b0fd	wrapped-kcs	wkcs	Wrapped KCS	f	\N	2023-05-24	2023-05-24
b69a7f62-8079-4173-afc0-4836cb522821	wrapped-klay	wklay	Wrapped KLAY	f	\N	2023-05-24	2023-05-24
cb22bf22-cb12-4d38-b103-d93f7fdf46b2	wrapped-leo	wleo	Wrapped LEO	f	\N	2023-05-24	2023-05-24
ccc1d3e6-5567-4f31-a3f5-d3a725ac0770	wrapped-memory	wmemo	Wonderful Memories	f	\N	2023-05-24	2023-05-24
467f173f-c74e-40c1-a1f2-13f7b0c3dba2	wrapped-metrix	mrxb	Wrapped Metrix	f	\N	2023-05-24	2023-05-24
c3b80017-32cd-4e6b-925a-0a1d40b3dbf4	wrapped-millix	wmlx	Wrapped Millix	f	\N	2023-05-24	2023-05-24
05179608-a3ab-4fa8-a884-b50b56aacdc7	wrapped-minima	wminima	Wrapped Minima	f	\N	2023-05-24	2023-05-24
05b6d9be-918c-4cfb-86c7-a29428a7e820	wrapped-moonbeam	wglmr	Wrapped Moonbeam	f	\N	2023-05-24	2023-05-24
714b1ce8-002a-4916-9ddb-b7f215723cb0	wrapped-ncg	wncg	Wrapped NCG	f	\N	2023-05-24	2023-05-24
8cd03011-1662-4902-ac0b-d5b2dd914ffa	wrapped-near	wnear	Wrapped Near	f	\N	2023-05-24	2023-05-24
1d75fcd1-5b8a-4aa2-9832-c6d4ba26c421	wrapped-newyorkcoin	wnyc	Wrapped NewYorkCoin	f	\N	2023-05-24	2023-05-24
98884bfd-2c95-4486-ade9-f6e5950f5124	wrapped-nxm	wnxm	Wrapped NXM	f	\N	2023-05-24	2023-05-24
f7e395f1-2ddb-465b-8c38-e56948929ac0	wrapped-oas	woas	Wrapped OAS	f	\N	2023-05-24	2023-05-24
2662b5c4-aa17-4241-bcc5-74672f48e7d6	wrapped-oeth	woeth	Wrapped OETH	f	\N	2023-05-24	2023-05-24
1e8e8ac8-dfde-4f22-a6f9-31ad58da4a5a	wrapped-okt	wokt	Wrapped OKT	f	\N	2023-05-24	2023-05-24
98761a6e-debe-4232-9f00-b6217772380f	wrapped-one	wone	Wrapped One	f	\N	2023-05-24	2023-05-24
4e8df7d7-0606-4fc6-9122-e3bf2f5fbf31	wrapped-paycoin	wpci	Wrapped Paycoin	f	\N	2023-05-24	2023-05-24
9c280010-0021-4d6f-94e5-588e4a531303	wrapped-pkt	wpkt	Wrapped PKT	f	\N	2023-05-24	2023-05-24
c60c1160-55f7-4f40-bf7f-75e25d93d98f	wrapped-pom	wpom	Wrapped POM	f	\N	2023-05-24	2023-05-24
4c2dc4c8-c8ee-434a-b338-7d00f0427aa4	wrapped-pulse-wpls	wpls	Wrapped Pulse	f	\N	2023-05-24	2023-05-24
3f601200-ea61-46e3-80e2-04d83db2c874	wrapped-reflect	wrft	Wrapped REFLECT	f	\N	2023-05-24	2023-05-24
6ae15820-9b86-4d7c-a51b-c4ee2789172c	wrapped-shiden-network	sdn	Wrapped Shiden Network	f	\N	2023-05-24	2023-05-24
d774ebac-4f18-42b2-b3b8-855945d3d470	wrapped-solana	sol	Wrapped Solana	f	\N	2023-05-24	2023-05-24
d27a5699-3d62-483f-9162-c86edb6bac94	wrapped-songbird	wsgb	Wrapped Songbird	f	\N	2023-05-24	2023-05-24
3eb906d5-11df-460d-b7d2-4a287a74acc4	wrapped-star	wstr	Wrapped Star	f	\N	2023-05-24	2023-05-24
55abb2f1-bdfe-46ef-9178-5c642c807f85	wrapped-statera	wsta	Wrapped Statera	f	\N	2023-05-24	2023-05-24
f0face3c-0093-460f-9ec3-9645500d55a8	wrapped-steth	wsteth	Wrapped stETH	f	\N	2023-05-24	2023-05-24
0a261f5d-2588-43fd-927f-62b21df86d01	wrapped-strax	wstrax	Wrapped Strax	f	\N	2023-05-24	2023-05-24
07058a65-6a80-4424-a1b0-1d8f3ba14958	wrapped-syscoin	wsys	Wrapped Syscoin	f	\N	2023-05-24	2023-05-24
0464f8c9-1e24-45dd-a77b-8607087fd18f	wrapped-tao	wtao	Wrapped TAO	f	\N	2023-05-24	2023-05-24
7c114aff-0e1a-49fb-8a14-4791d082e967	wrapped-telos	wtlos	Wrapped Telos	f	\N	2023-05-24	2023-05-24
ed535c09-ee9c-4109-b3a9-9fddd210f908	wrapped-terra	lunc	Wrapped Terra Classic	f	\N	2023-05-24	2023-05-24
b27c3074-142d-4b7e-9dea-ab6612118d26	wrapped-tezos	wxtz	StakerDAO Wrapped Tezos	f	\N	2023-05-24	2023-05-24
e653a06c-fa07-4096-811f-784a141cda64	wrapped-tezos-2	wtz	Wrapped Tezos	f	\N	2023-05-24	2023-05-24
a3f4e783-8a55-4117-8be3-82c4bbb2217c	wrapped-thunderpokt	wtpokt	Wrapped ThunderPOKT	f	\N	2023-05-24	2023-05-24
d4653f83-53ae-4047-9e60-9865f7f00372	wrapped-tomo	wtomo	Wrapped TOMO	f	\N	2023-05-24	2023-05-24
f3c70a5b-b4b7-43e0-82ec-70a6a96d1284	wrapped-tron	wtrx	Wrapped Tron	f	\N	2023-05-24	2023-05-24
3cd00ce8-ae13-4d6e-9f62-639ff7d1a5a0	wrapped-turtlecoin	wtrtl	Wrapped TurtleCoin	f	\N	2023-05-24	2023-05-24
6088c231-d289-49e3-968e-818c5e19f72c	wrapped-usdc	xusd	Wrapped USDC	f	\N	2023-05-24	2023-05-24
01840e4b-8558-4884-a9d6-01c9a157b910	wrapped-usdr	wusdr	Wrapped USDR	f	\N	2023-05-24	2023-05-24
7aa8a66c-7490-4f36-be58-8d54ade36811	wrapped-usdt	wusdt	Wrapped USDT	f	\N	2023-05-24	2023-05-24
43231c29-46a5-4e33-9165-4acde15de443	wrapped-usdt-allbridge-from-polygon	apusdt	Wrapped USDT (Allbridge from Polygon)	f	\N	2023-05-24	2023-05-24
0144b65f-40c2-4c5a-ad05-ab2ade6a6d5b	wrapped-ust	ustc	Wrapped USTC	f	\N	2023-05-24	2023-05-24
cc982b17-495c-4249-be01-babbb2b27a2a	wrapped-velas	wvlx	Wrapped Velas	f	\N	2023-05-24	2023-05-24
08c710cd-cf3c-4c55-8f00-25d0c72a6322	wrapped-virgin-gen-0-cryptokitties	wvg0	Wrapped Virgin Gen-0 CryptoKittties	f	\N	2023-05-24	2023-05-24
9fbc8cc2-a294-4ed6-a55c-1d3c0f6b9fa0	wrapped-wan	wwan	Wrapped Wan	f	\N	2023-05-24	2023-05-24
bfa986b3-046b-48c5-998b-30d5b862ec57	wrapped-wdoge	wwdoge	Wrapped WDOGE	f	\N	2023-05-24	2023-05-24
9a17a7c3-4f6e-4c3e-9919-86a6e9b42591	wrapped-xbtc	wxbtc	Wrapped xBTC	f	\N	2023-05-24	2023-05-24
1082cec0-6284-4278-a7ea-7c3bb0ca44d6	wrapped-xdai	wxdai	Wrapped XDAI	f	\N	2023-05-24	2023-05-24
625866bf-d1b5-48c7-ac7f-cd36b7d406b2	wrapped-xdc	wxdc	Wrapped XDC	f	\N	2023-05-24	2023-05-24
03de0193-93c2-4974-bba2-ce35989268bc	wrapped-xrp	wxrp	Wrapped XRP	f	\N	2023-05-24	2023-05-24
cfb9ff94-918f-473a-b608-a3ebfbaa1c54	wrestling-shiba	wwe	Wrestling Shiba	f	\N	2023-05-24	2023-05-24
9f417e69-b9cd-419b-a0a6-8f8293f1f27a	wsb-classic	wsbc	WSB Classic	f	\N	2023-05-24	2023-05-24
49015cbc-6e40-4602-b8bf-5e5f72c45b7d	wsb-coin	wsb	WSB Coin	f	\N	2023-05-24	2023-05-24
18fca365-fd09-41a4-98dd-376074f18022	wsb-sh	wsbt	WSB.sh	f	\N	2023-05-24	2023-05-24
cc0ce892-1a06-439a-99d7-8abbd087bcb3	wtbt	wtbt	wTBT	f	\N	2023-05-24	2023-05-24
5adc0890-84f2-4831-b625-a194a2b1f173	wusd	wusd	Wrapped USD	f	\N	2023-05-24	2023-05-24
001a4958-1225-4831-a4ce-9bc2cebe1663	wwemix	wwemix	WWEMIX	f	\N	2023-05-24	2023-05-24
cb742d1a-6cca-4b07-a1c3-458c9e11d68a	wynd	wynd	WYND	f	\N	2023-05-24	2023-05-24
3bb47d7d-eba2-4f15-ab12-b2a177b97290	x-2	x	X	f	\N	2023-05-24	2023-05-24
5224b0e0-d311-481f-ae45-c216f0efc0c4	x2y2	x2y2	X2Y2	f	\N	2023-05-24	2023-05-24
4d34ea80-621d-48b3-bf60-f9c2f5bf2994	x42-protocol	x42	X42 Protocol	f	\N	2023-05-24	2023-05-24
5135dd6e-341d-4ad2-9266-8c8d7ce0cebb	x7101	x7101	X7101	f	\N	2023-05-24	2023-05-24
1bf5f773-5036-43d5-9102-43c9bb4dec0c	x7102	x7102	X7102	f	\N	2023-05-24	2023-05-24
e0cbd77b-ae64-4909-98f6-99aabc8638be	x7103	x7103	X7103	f	\N	2023-05-24	2023-05-24
39f5b66b-860f-4fe6-b27a-090697528c12	x7104	x7104	X7104	f	\N	2023-05-24	2023-05-24
13081ecb-14e1-4d7d-8de1-93eeeea3a450	x7105	x7105	X7105	f	\N	2023-05-24	2023-05-24
4864d088-799e-4204-a909-73b40cba36cc	x7-coin	x7c	X7 Coin	f	\N	2023-05-24	2023-05-24
e19bb647-0763-4b1c-b1c8-07eda1063d9b	x7dao	x7dao	X7DAO	f	\N	2023-05-24	2023-05-24
e28cff60-973c-4d33-965a-7cbefbb95fa3	x7r	x7r	X7R	f	\N	2023-05-24	2023-05-24
3db60f9c-cdaf-41eb-9bda-297a42061742	x8-project	x8x	X8X	f	\N	2023-05-24	2023-05-24
cc92a6d5-6e82-4e79-8aaf-37970ba79f52	xai	xai	XAI Stablecoin	f	\N	2023-05-24	2023-05-24
445e6cec-f816-4b4a-add4-f72144918be3	xana	xeta	XANA	f	\N	2023-05-24	2023-05-24
67c30a29-15fb-42f2-97ce-dcdb4262ce70	xaurum	xaur	Xaurum	f	\N	2023-05-24	2023-05-24
499377eb-c2e6-4fda-a7d6-4f0babe6f684	xave-coin	xvc	Xave Coin	f	\N	2023-05-24	2023-05-24
bd5ab3ba-ea2e-4e1f-9476-a3c76138cc51	xave-token	xav	Xave	f	\N	2023-05-24	2023-05-24
f5db0d13-b233-45eb-962d-4ecf3d378777	xbit	xbt	Xbit	f	\N	2023-05-24	2023-05-24
8640578f-2459-4cb5-8844-87cca4ae6aef	xblue-finance	xb	XBlue Finance	f	\N	2023-05-24	2023-05-24
832c5629-a640-44da-9759-be42aaddb3a8	xbullion	gold	XBullion	f	\N	2023-05-24	2023-05-24
3f0a5fc8-d361-4cdd-ad24-16ffe9884a9b	xbullion_silver	silv	XBullion Silver	f	\N	2023-05-24	2023-05-24
070c604f-1ee4-4bc9-8290-ca496ee0c6a5	xcad-network	xcad	XCAD Network	f	\N	2023-05-24	2023-05-24
268b7452-0ef0-44e5-b17c-bd283c8364a7	xcad-network-play	play	XCAD Network PLAY	f	\N	2023-05-24	2023-05-24
9a26ae80-d8d4-4ba4-85d5-73df5784a4fe	xcarnival	xcv	XCarnival	f	\N	2023-05-24	2023-05-24
b9818463-7f58-4c21-9ae5-b154e3b6f5b5	x-cash	xcash	X-CASH	f	\N	2023-05-24	2023-05-24
74239479-6623-456a-9d93-ece0e7f93afb	xcdot	xcdot	xcDOT	f	\N	2023-05-24	2023-05-24
c37e7047-722f-43f6-83cf-7cd3ec4898a4	xcel-swap	xld	Xcel Defi	f	\N	2023-05-24	2023-05-24
bf5ff599-d01e-4d9a-a292-e27b101f8c74	xceltoken-plus	xlab	XCELTOKEN PLUS	f	\N	2023-05-24	2023-05-24
6c533fbd-b38f-408c-bc06-eb81da4440c6	xcf-token	xcf	XCF Token	f	\N	2023-05-24	2023-05-24
e761fcd2-0eba-4b0f-8ade-a74082c8ba63	xcksm	xcksm	xcKSM	f	\N	2023-05-24	2023-05-24
6310a4f2-367f-4c7f-8c39-efd94f146b29	xcom	xc	XCOM	f	\N	2023-05-24	2023-05-24
4d51e5d6-0dbb-48dc-a044-9cd461b71bcb	xcrx	xcrx	xCRX	f	\N	2023-05-24	2023-05-24
dd0f418e-fd7f-41b7-b073-842e043e2fb5	xcusdt	xcusdt	xcUSDT	f	\N	2023-05-24	2023-05-24
7e4b9a52-074d-43b1-b508-830ebc4e0d46	xdai	xdai	XDAI	f	\N	2023-05-24	2023-05-24
351b0220-a086-4d7b-bd6c-0b1aac89b74f	xdai-native-comb	xcomb	xDai Native Comb	f	\N	2023-05-24	2023-05-24
84e48763-9506-45a1-89b9-4e9f74c191f3	xdai-stake	stake	STAKE	f	\N	2023-05-24	2023-05-24
62545ae6-39e3-4392-850f-df108db0f1cc	xdao	xdao	XDAO	f	\N	2023-05-24	2023-05-24
59b84f70-a518-41b2-9c0f-9afd02330d80	xdce-crowd-sale	xdc	XDC Network	f	\N	2023-05-24	2023-05-24
d0de48c9-221f-4d1e-9e52-cd62bab8fad3	xdefi	xdefi	XDEFI	f	\N	2023-05-24	2023-05-24
e0d0f5ba-11fb-4d76-b610-75694df95e36	xdefi-governance-token	xdex	XDEFI Governance	f	\N	2023-05-24	2023-05-24
994438e1-2d1d-40b0-bfa7-582f8f944821	xdeus	xdeus	xDEUS	f	\N	2023-05-24	2023-05-24
8a824024-759a-4d89-ac04-c79084b8fe2e	xdoge	xdoge	Xdoge	f	\N	2023-05-24	2023-05-24
74773657-d270-440f-9410-114d87f369d7	xdollar-stablecoin	xusd	xDollar Stablecoin	f	\N	2023-05-24	2023-05-24
5ccf6ec7-1022-448b-9049-91e5bdc1c328	xels	xels	XELS	f	\N	2023-05-24	2023-05-24
6dd494df-4222-4893-8ad4-f750d8d1b57e	xen-crypto	xen	XEN Crypto	f	\N	2023-05-24	2023-05-24
ec06648d-0b49-4662-9c1f-8a7f1cbab333	xen-crypto-bsc	bxen	XEN Crypto (BSC)	f	\N	2023-05-24	2023-05-24
f3012291-5586-4a8b-9a94-5df90d6c79ec	xen-crypto-evmos	coxen	Xen Crypto (EVMOS)	f	\N	2023-05-24	2023-05-24
f5cc8856-10c2-4848-83e9-2df8dc5c98a5	xen-crypto-matic	mxen	Xen Crypto (MATIC)	f	\N	2023-05-24	2023-05-24
73ff8a58-8770-4076-a59e-01dd5b333215	xend-finance	xend	Xend Finance	f	\N	2023-05-24	2023-05-24
ce9067b7-95e8-4bea-a168-6bb1fee9696a	xenios	xnc	Xenios	f	\N	2023-05-24	2023-05-24
6836f79d-ff51-404c-a63e-a7ebb96c8fac	xenlon-mars	xlon	Xenlon Mars	f	\N	2023-05-24	2023-05-24
462f80fc-b162-4647-80ea-27dcafcdaa5e	xenoruntoken	xrt	XenoRunToken	f	\N	2023-05-24	2023-05-24
1e6482c6-9b0e-4808-97d5-9ef8ebb01656	xeno-token	xno	Xeno	f	\N	2023-05-24	2023-05-24
b9aa688a-9ee5-4821-9ba0-40b163b49fe7	xerium	xerm	Xerium	f	\N	2023-05-24	2023-05-24
268d7c95-1a4c-4592-94aa-a1e98e95ae56	xfarmer	xf	xFarmer	f	\N	2023-05-24	2023-05-24
f50065e5-8975-4f7d-a75e-124e7d0ce795	xfinance	xfi	Xfinance	f	\N	2023-05-24	2023-05-24
97d01e09-e3b4-4f20-9eac-1b9a18c968e3	xfinite-entertainment-token	xet	Xfinite Entertainment	f	\N	2023-05-24	2023-05-24
529e52a6-7d7f-4054-b9b0-416bdd7246e9	xfit	xfit	XFai	f	\N	2023-05-24	2023-05-24
c766841c-9bc9-4d62-a167-4f3a32903464	xfuel	xfuel	XFUEL	f	\N	2023-05-24	2023-05-24
4db457bb-fa33-460e-816f-2b74b5040b6d	xfund	xfund	xFUND	f	\N	2023-05-24	2023-05-24
d9833163-7e6e-413c-a77f-2647ee073943	xgold-coin	xgold	Xgold Coin	f	\N	2023-05-24	2023-05-24
34b4c6dc-464a-44e8-8dad-77bf52ca7785	xhashtag	xtag	xHashtag	f	\N	2023-05-24	2023-05-24
a904306d-68fc-4d6c-a0f4-fb56143414a4	xidar	ida	Xidar	f	\N	2023-05-24	2023-05-24
e784a8cb-8159-4f94-9e32-890d6d626302	xiden	xden	Xiden	f	\N	2023-05-24	2023-05-24
7d0ea4dc-cc8a-4326-9e69-acc88942ddcc	xido-finance	xido	Xido Finance	f	\N	2023-05-24	2023-05-24
d667dd3c-aac3-464c-a2fe-b1e8d36ac793	xiglute-coin	xgc	Xiglute Coin	f	\N	2023-05-24	2023-05-24
e61c10a6-5f28-47fc-aeda-3e9fae5db5ed	xing	xing	XING	f	\N	2023-05-24	2023-05-24
167a6dd7-50fb-4655-9095-7ce4d43929f3	xio	xio	Blockzero Labs	f	\N	2023-05-24	2023-05-24
a760b931-ccac-4c90-a9c7-0bcdeb071496	xion-finance	xgt	Xion Finance	f	\N	2023-05-24	2023-05-24
605742eb-b15f-4c9e-ae19-66d38b5f1b44	xi-token	xi	Xi	f	\N	2023-05-24	2023-05-24
a3f34eaf-94a5-4277-ace9-ab05d138faab	xjewel	xjewel	xJEWEL	f	\N	2023-05-24	2023-05-24
2e07d48c-90a2-4c51-b221-e8d8b31beb94	xlist	xlist	XList	f	\N	2023-05-24	2023-05-24
d1443abb-a3e0-4ff9-9dcb-87590684ba20	xlp-finance	xlpfi	xLP Finance	f	\N	2023-05-24	2023-05-24
94044c0f-ccd1-47b3-9b5f-8c9cb992106e	x-mask	xmc	X-MASK	f	\N	2023-05-24	2023-05-24
072b771c-b339-46c1-9741-fcfa99baacc4	xmatic	xmatic	xMATIC	f	\N	2023-05-24	2023-05-24
486e597f-836f-4266-a657-c3c10ee85a7f	xmax	xmx	XMax	f	\N	2023-05-24	2023-05-24
58d61026-d3dd-4eb9-81de-0cea67e037d5	xmon	xmon	XMON	f	\N	2023-05-24	2023-05-24
cd9edbe5-d5b4-4757-974e-340a45270497	xnft	xnft	xNFT Protocol	f	\N	2023-05-24	2023-05-24
bd7d8d7a-09fe-4473-89e3-c08ca6db20d9	xodex	xodex	Xodex	f	\N	2023-05-24	2023-05-24
5304ad38-1ad5-441b-9736-3b989fa0594f	xoloitzcuintli	xolo	xoloitzcuintli	f	\N	2023-05-24	2023-05-24
56336826-fe53-406d-a204-1ce42f45bfb7	xoycoin	xoy	XOYCoin	f	\N	2023-05-24	2023-05-24
cc417957-5bb0-448a-a1c6-66bb92a44982	xp	xp	XP	f	\N	2023-05-24	2023-05-24
6cb32331-6c99-4922-9d7d-97c6aed0a6ca	xpansion-game	xps	Xpansion Game	f	\N	2023-05-24	2023-05-24
e134e24a-7dce-4d75-9c37-38e976d71d0b	xpendium	xpnd	Xpendium	f	\N	2023-05-24	2023-05-24
a670a35c-3bc4-452a-a7a3-fb5d4023f3c7	xpla	xpla	XPLA	f	\N	2023-05-24	2023-05-24
a86d8380-59c1-4992-9db1-51ddd20080e8	xp-network	xpnet	XP Network	f	\N	2023-05-24	2023-05-24
35349440-96cc-4f3f-b567-8552dcf8d59b	xproject	xpro	XPROJECT	f	\N	2023-05-24	2023-05-24
976883ec-b73b-45a7-abe4-0267e41d8605	x-protocol	pot	X Protocol	f	\N	2023-05-24	2023-05-24
195cf8a3-f1e9-4383-b7ec-411ef3cec6e0	xptp	xptp	xPTP	f	\N	2023-05-24	2023-05-24
a7d20676-e654-44f5-9230-ac5ab7908bcd	xrdoge	xrdoge	XRdoge	f	\N	2023-05-24	2023-05-24
a3a29cda-ad66-4898-85ad-32efab9d72be	xreators	ort	XREATORS	f	\N	2023-05-24	2023-05-24
3d12449c-7db6-4fe7-aa9f-e77345e22415	xrhodium	xrc	xRhodium	f	\N	2023-05-24	2023-05-24
17577d20-8af2-4fee-b086-351cf91ccee6	xrice-token	xrice	xRice Token	f	\N	2023-05-24	2023-05-24
b1b8b0ff-46f2-4a1a-a66c-2777e0236870	xrow	xrow	XROW	f	\N	2023-05-24	2023-05-24
548d85bc-9598-4b1a-86af-ea4640cde997	xrpaynet	xrpaynet	XRPayNet	f	\N	2023-05-24	2023-05-24
afbc94d8-2402-41ec-bfcb-26dace517905	xrp-classic-2	xrpc	XRP Classic (OLD)	f	\N	2023-05-24	2023-05-24
c47e9915-45e2-4cab-acd6-42d72b47d852	xrp-healthcare	xrph	XRP Healthcare	f	\N	2023-05-24	2023-05-24
675d9dac-fa60-48e1-ac3f-774b4a98177a	xr-shiba-inu	xrshib	XR Shiba Inu	f	\N	2023-05-24	2023-05-24
2c9770a3-d78d-42f7-82e7-e4e743e0203c	xsauce	xsauce	xSAUCE	f	\N	2023-05-24	2023-05-24
8c50b00d-f8b0-42ff-b218-516c8a21bdb8	xsgd	xsgd	XSGD	f	\N	2023-05-24	2023-05-24
4073fbe5-12c8-4685-bac8-c6a4abc9ec4e	xshrap	xshrap	xShrap	f	\N	2023-05-24	2023-05-24
0bb8e404-9734-411c-b351-7125d2349b7c	xsigma	sig	xSigma	f	\N	2023-05-24	2023-05-24
dae73bba-957b-40ae-b4a9-8f006fc77bfd	xsl-labs	syl	myDid	f	\N	2023-05-24	2023-05-24
d382cd4d-39da-44a7-bc17-059c11d17a3c	x-social-network	x-ai	X Social Network	f	\N	2023-05-24	2023-05-24
ebd46776-19e0-4b9e-bc90-389865e13014	xspectar	xspectar	xSPECTAR	f	\N	2023-05-24	2023-05-24
82bbf85f-8fad-495d-9a46-c0db35e13dbd	xstudio	txs	XStudio	f	\N	2023-05-24	2023-05-24
f7ce086c-09f9-4fab-a529-a773afe3ac51	xsushi	xsushi	xSUSHI	f	\N	2023-05-24	2023-05-24
cfff6177-3f2c-4abd-8e91-d5ba32f7dd3f	xswap-protocol	xsp	XSwap Protocol	f	\N	2023-05-24	2023-05-24
a38448d0-a954-4b95-8967-a5a3727139d6	xswap-treasure	xtt	XSwap Treasure	f	\N	2023-05-24	2023-05-24
a4b47a81-8511-49e3-9fd1-0af7b142098e	xtal	xtal	XTAL	f	\N	2023-05-24	2023-05-24
4d2141a4-7dff-49a0-8ea6-0bdb0488b2d3	xtblock-token	xtt-b20	XTblock	f	\N	2023-05-24	2023-05-24
15bd2f73-9f39-4ed6-a576-c3e530c90406	xtcom-token	xt	XT.com	f	\N	2023-05-24	2023-05-24
19fe93ae-5516-4c85-bdb5-1011976602a4	xtoken	xtk	xToken	f	\N	2023-05-24	2023-05-24
85b05b40-b5f3-4062-a784-89cf5378dcb3	xtrabytes	xby	XTRABYTES	f	\N	2023-05-24	2023-05-24
70695de9-308f-49ce-9159-14a84b68dc83	xtremcoin	xtr	Xtremcoin	f	\N	2023-05-24	2023-05-24
455e7a18-2045-424d-be28-2a7cd3f43a1d	xtusd	xtusd	XT Stablecoin XTUSD	f	\N	2023-05-24	2023-05-24
0cae6ab2-0fef-4b4a-b83f-798d3b755462	xusd	xusd	xUSD	f	\N	2023-05-24	2023-05-24
e5e40d0a-43f1-4f6d-9e56-8f95321e19e8	xusd-babelfish	xusd	XUSD (BabelFish)	f	\N	2023-05-24	2023-05-24
5a67c6dc-e4b0-4332-a1cf-19802ae9fb91	xusd-token	xusd	xUSD Token	f	\N	2023-05-24	2023-05-24
d16ae392-a378-499e-9d7d-f716c700e8df	xwin-finance	xwin	xWIN Finance	f	\N	2023-05-24	2023-05-24
3c2b73aa-c8c4-47b0-85cb-72c1cba61989	x-world-games	xwg	X World Games	f	\N	2023-05-24	2023-05-24
3fdab481-d1bd-4d7e-93aa-b517b01acadc	xxcoin	xx	XX Network	f	\N	2023-05-24	2023-05-24
803a8a45-58b8-4186-9d02-a79e278df472	xy-finance	xy	XY Finance	f	\N	2023-05-24	2023-05-24
52b1677f-b9ba-4ce4-b90d-11f4a6a98253	xyo-network	xyo	XYO Network	f	\N	2023-05-24	2023-05-24
2ee46181-24a1-4853-91f0-7c710e880acf	xysl	xysl	xYSL	f	\N	2023-05-24	2023-05-24
f0b54bd1-cf69-4fae-bef0-ed59af513b9d	y2b	y2b	Y2B	f	\N	2023-05-24	2023-05-24
6db20243-7349-44bf-9cc9-2b8df2d59c51	y2k	y2k	Y2K	f	\N	2023-05-24	2023-05-24
f4649267-9433-4c61-84cc-da7c9528843f	yachtingverse	yacht	YachtingVerse	f	\N	2023-05-24	2023-05-24
907612aa-e18b-4ef3-adb5-46bf51343d21	yadacoin	yda	YadaCoin	f	\N	2023-05-24	2023-05-24
107bde89-5a70-401c-ac57-54625c77f765	yaki-gold	yag	Yaki Gold	f	\N	2023-05-24	2023-05-24
ca574498-fae9-4544-a977-0df28bd388da	yaku	yaku	Yaku	f	\N	2023-05-24	2023-05-24
dfea7628-9bf0-42ed-9e60-98147e6d380e	yam-2	yam	YAM	f	\N	2023-05-24	2023-05-24
9030cad2-e03c-489e-983a-0fbd9501d9ad	yamanote-sen	ymnt	Yamanote-Sen	f	\N	2023-05-24	2023-05-24
3abf9f16-491c-45ab-8369-cc416ae91e3b	yamp-finance	yamp	Yamp Finance	f	\N	2023-05-24	2023-05-24
6a10b770-a697-4985-8574-1aab55cfcc7f	yasha-dao	yasha	YASHA	f	\N	2023-05-24	2023-05-24
8c771ac9-613d-4797-bd7e-0e4240c20cab	yawww	yaw	Yawww	f	\N	2023-05-24	2023-05-24
4faa9777-8b20-4888-b814-440f567c8ef8	yaxis	yaxis	yAxis	f	\N	2023-05-24	2023-05-24
af936649-59ad-4a9e-a6fc-d5ab91502b96	yay-games	yay	YAY Network	f	\N	2023-05-24	2023-05-24
5779f960-f071-4104-9a09-17f16155f75c	ycash	yec	Ycash	f	\N	2023-05-24	2023-05-24
feb814b0-174b-42c5-a4f3-90065db98370	yclub	syc	YCLUB	f	\N	2023-05-24	2023-05-24
b23e6073-11b6-40e3-a429-1a323687c7c7	y-coin	yco	Y Coin	f	\N	2023-05-24	2023-05-24
a56f7d13-3435-44dd-b9a6-3a49407d2359	ydragon	ydr	YDragon	f	\N	2023-05-24	2023-05-24
38cd49a2-323c-4919-8928-c1384cf25998	yearn-classic-finance	earn	Yearn Classic Finance	f	\N	2023-05-24	2023-05-24
62cc7446-a43b-412f-b70e-7346094221a5	yearn-crv	ycrv	Yearn CRV	f	\N	2023-05-24	2023-05-24
18e25de9-53d8-4311-85aa-6de9e296e386	yearn-finance	yfi	yearn.finance	f	\N	2023-05-24	2023-05-24
7542acf3-e544-4c7c-84a8-66afa11fd7bc	yeet-dao	yeet	YEET DAO	f	\N	2023-05-24	2023-05-24
c0d69285-23a4-47ab-9717-4eddd0252bf0	yel-finance	yel	Yel.Finance	f	\N	2023-05-24	2023-05-24
10c10989-a9bb-4773-8d5c-98adeb897957	yellowheart-protocol	hrts	YellowHeart Protocol	f	\N	2023-05-24	2023-05-24
32881182-22a8-4b11-bf44-79145e6313d6	yellow-road	road	Yellow Road	f	\N	2023-05-24	2023-05-24
2dd4b1d9-c482-45fb-9c58-8b0a1ef18974	yenten	ytn	YENTEN	f	\N	2023-05-24	2023-05-24
c4f0efc8-f26d-4e9a-80e5-6baedf0e9797	yeon	yeon	Yeon	f	\N	2023-05-24	2023-05-24
6cb183da-2adc-4395-8a66-fd294d7c136a	yesorno	yon	YESorNO	f	\N	2023-05-24	2023-05-24
7a9c60ce-923b-45e8-b94d-338fd288fdea	yesports	yesp	Yesports	f	\N	2023-05-24	2023-05-24
25db326c-42fe-490c-b5b8-918721b73909	yes-token	yes	YES Token	f	\N	2023-05-24	2023-05-24
1356be3f-7ca3-420c-ae65-496bdde9c6bb	yes-world	yes	Yes World	f	\N	2023-05-24	2023-05-24
98dc9fd4-67a4-4e35-8dd0-98af006762ec	yeticoin	yetic	YetiCoin	f	\N	2023-05-24	2023-05-24
6a374d06-4720-4ba8-91c0-151bb7c9ca7a	yeti-finance	yeti	Yeti Finance	f	\N	2023-05-24	2023-05-24
8f9aafc1-0fc8-4301-b3c7-052ebd166871	yfdai-finance	yf-dai	YfDAI.finance	f	\N	2023-05-24	2023-05-24
d2faee67-316d-469e-9549-0408c140a3dd	yfii-finance	yfii	DFI.money	f	\N	2023-05-24	2023-05-24
3b97f8f6-5917-4f57-9bde-0259b1e14772	yfione	yfo	YFIONE	f	\N	2023-05-24	2023-05-24
f2df0bef-1887-4faa-8a7d-989a0fa4a61f	yfi-yvault	yvyfi	YFI yVault	f	\N	2023-05-24	2023-05-24
b20309df-c444-47c8-889e-7ac76b1a2526	yflink	yfl	YF Link	f	\N	2023-05-24	2023-05-24
2c33d8c3-ebdc-42a1-9cc9-0f5146f043e9	yfx	yfx	Your Futures Exchange	f	\N	2023-05-24	2023-05-24
16d2ef5f-8e6d-4327-9d70-938648fd5a1e	yield-app	yld	Yield App	f	\N	2023-05-24	2023-05-24
56889d00-c981-4e3a-8d5c-e83d3be03e8c	yieldara	yara	Yieldara	f	\N	2023-05-24	2023-05-24
2c608598-3bca-47dd-81cf-d07fa9f45618	yieldblox	ybx	YieldBlox	f	\N	2023-05-24	2023-05-24
201abd0d-425a-411d-8fe4-2a335ed5d15d	yieldfarming-index	yfx	YieldFarming Index	f	\N	2023-05-24	2023-05-24
2a8bab10-8860-420b-8c5a-275a30824fe3	yield-generating-enreach	ygnrch	Yield Generating Enreach	f	\N	2023-05-24	2023-05-24
235a494f-95a1-4ee3-a9ad-e98bbbea828b	yield-guild-games	ygg	Yield Guild Games	f	\N	2023-05-24	2023-05-24
463465e7-813d-4be4-a974-1341c25e1170	yieldification	ydf	Yieldification	f	\N	2023-05-24	2023-05-24
c54266ee-982e-4450-ae61-46c7241d0a1b	yieldly	yldy	Yieldly	f	\N	2023-05-24	2023-05-24
953d519d-82db-49e7-8f93-8ab9188a7f38	yield-optimization-platform	yop	Yield Optimization Platform & Protocol	f	\N	2023-05-24	2023-05-24
0611e0ac-9771-4509-8a5c-35e1200d8f3e	yield-parrot	lory	Yield Parrot	f	\N	2023-05-24	2023-05-24
e2ade59a-358c-41ba-a058-cacc06d235ed	yield-protocol	yield	Yield Protocol	f	\N	2023-05-24	2023-05-24
2db77944-8087-4c6c-a462-9d886eb552f1	yieldwatch	watch	Yieldwatch	f	\N	2023-05-24	2023-05-24
45463cd7-4c5e-4d18-b362-7bbfc28d16b6	yield-yak	yak	Yield Yak	f	\N	2023-05-24	2023-05-24
2a08ddba-2759-4301-954d-5b2de5c6bff5	yield-yak-avax	yyavax	Yield Yak AVAX	f	\N	2023-05-24	2023-05-24
2eaef4ac-e724-466e-8d4d-2e58298b5266	yin-finance	yin	YIN Finance	f	\N	2023-05-24	2023-05-24
e2479498-9cb6-444f-b491-ef15f2b2a828	yobit-token	yo	Yobit	f	\N	2023-05-24	2023-05-24
c468cc2b-8194-4442-97ee-7800679b5ecf	yocoin	yoc	Yocoin	f	\N	2023-05-24	2023-05-24
2274c615-99cf-4204-9976-1d12ddcdd56d	yocoinyoco	yoco	YocoinYOCO	f	\N	2023-05-24	2023-05-24
2c030c27-5adb-4546-977e-193aacf25c5b	yoda-coin-swap	jedals	Yoda Coin Swap	f	\N	2023-05-24	2023-05-24
e5e442e0-3d3f-4adf-bc39-7e5d32d0bee6	yodeswap	yode	YodeSwap	f	\N	2023-05-24	2023-05-24
ef0e1f54-3f8d-4224-ac06-9040102ef06e	yofune-nushi	koyo	Yofune Nushi	f	\N	2023-05-24	2023-05-24
2799fbef-525f-4dfd-8265-943520bcc5bc	yogi	yogi	Yogi	f	\N	2023-05-24	2023-05-24
749613f2-5820-4b3d-983e-15d773a75bd1	yogo	yogo	Yogo	f	\N	2023-05-24	2023-05-24
2b7a3807-30fb-4eed-92bf-f803753232c0	yokaiswap	yok	YokaiSwap	f	\N	2023-05-24	2023-05-24
d45477f3-9ef2-487e-9b7f-b65f670f4e29	yolo-cash	ylc	YOLOCash	f	\N	2023-05-24	2023-05-24
8ecfc67a-d695-4d9e-a1d4-e4c1f501bfab	yooshi	yooshi	YooShi	f	\N	2023-05-24	2023-05-24
467db74a-e4c7-4745-9f24-1a95f7a248ef	yoshi-exchange	yoshi	Yoshi.exchange	f	\N	2023-05-24	2023-05-24
9068909e-2c56-42b1-91a4-35185c3754b4	youcash	youc	YOUcash	f	\N	2023-05-24	2023-05-24
283dbf02-0141-48bb-ad0f-1bcb236239f6	youclout	yct	Youclout	f	\N	2023-05-24	2023-05-24
d2faaec5-36e0-41a4-bfd9-55b79c66d27b	youminter	umint	YouMinter	f	\N	2023-05-24	2023-05-24
19fc1186-fbe7-4b2c-bb7f-dede476ea6eb	young-boys-fan-token	ybo	Young Boys Fan Token	f	\N	2023-05-24	2023-05-24
f3a4b2e1-dda7-4c4d-a60d-df2d1854d0f8	youngparrot	ypc	YoungParrot	f	\N	2023-05-24	2023-05-24
d8c256bc-3be3-484f-b225-5965dbab234f	yourkiss	yks	YourKiss	f	\N	2023-05-24	2023-05-24
cbcbd44b-6312-4003-af1e-7d01059c1136	your-open-metaverse	yom	YOM	f	\N	2023-05-24	2023-05-24
813ad2e3-77ea-479b-b196-03b338fdc808	yourwallet	yourwallet	YourWallet	f	\N	2023-05-24	2023-05-24
9ab1cd40-b6db-4cac-a2ea-fb751f83fab1	yourwallet-eth	yourwallet	YourWallet ETH	f	\N	2023-05-24	2023-05-24
636f9383-2a58-4766-9a1d-73f43ebc558f	youves-uusd	uusd	Youves uUSD	f	\N	2023-05-24	2023-05-24
568f295e-4b10-45f1-9a21-c0cea2058fdc	youves-you-governance	you	Youves YOU Governance	f	\N	2023-05-24	2023-05-24
0e7d7429-0b0c-4240-8bc3-8ca6c840679a	youwho	you	Youwho	f	\N	2023-05-24	2023-05-24
eb23b43f-5a82-4c75-9246-a180f3004b3f	ysl	ysl	YSL	f	\N	2023-05-24	2023-05-24
18c07034-6829-4152-a8b8-8f45abf466e9	ytofu	ytofu	yTOFU	f	\N	2023-05-24	2023-05-24
82ec7c70-8449-4da1-9373-44a649c770dd	yuan-chain-coin	ycc	Yuan Chain Coin	f	\N	2023-05-24	2023-05-24
4d84d551-5119-4bd1-9798-2f9390a158ac	yukky	yukky	YUKKY	f	\N	2023-05-24	2023-05-24
7bb47f6b-65dc-43ff-862d-8dbd3b8cdd78	yummi-universe	yummi	Yummi Universe	f	\N	2023-05-24	2023-05-24
10e7e6f4-7aad-44bc-9a97-f28d51d00bdd	yummy	yummy	Yummy	f	\N	2023-05-24	2023-05-24
02baaac4-4086-4370-9fb6-318c1fcd64c5	yuna	yuna	Yuna	f	\N	2023-05-24	2023-05-24
228c5b3f-9a0b-4447-982e-fa5176b307f0	yup	yup	Yup	f	\N	2023-05-24	2023-05-24
cb6a4572-3eba-45a5-92b1-ea47fbf939d8	yusd-stablecoin	yusd	YUSD Stablecoin	f	\N	2023-05-24	2023-05-24
41e48045-005e-4a07-9571-2d622a4a5d7d	yuse	yuse	Yuse	f	\N	2023-05-24	2023-05-24
13a8accc-26e3-4b44-8fff-8fc5b290e660	yvault-lp-ycurve	yvault-lp-ycurve	yUSD	f	\N	2023-05-24	2023-05-24
41ff3ad1-20ce-489a-b816-2c14b79a233e	yvboost	yvboost	Yearn Compounding veCRV yVault	f	\N	2023-05-24	2023-05-24
9d647236-2a41-4f17-9158-36014cebdb93	yvdai	yvdai	yvDAI	f	\N	2023-05-24	2023-05-24
819e47d3-36a2-4b52-8452-ef8ecceea7c6	yvs-finance	yvs	YVS Finance	f	\N	2023-05-24	2023-05-24
96bd3c22-484c-488c-9a35-da329b3980a1	z7dao	z7	Z7DAO	f	\N	2023-05-24	2023-05-24
949b387c-ee3a-4d69-800a-85af499e2001	zada	zada	Zada	f	\N	2023-05-24	2023-05-24
a241be81-2ebb-44fb-b704-b1b64d9da390	zahnymous	zah	Zahnymous	f	\N	2023-05-24	2023-05-24
68a7bdc2-bdbc-41c6-9b64-ca5b77e6bfe3	zaif-token	zaif	Zaif	f	\N	2023-05-24	2023-05-24
8433c0ca-7838-4a25-8a0d-ed6583c16ad9	zakumifi	zafi	ZakumiFi	f	\N	2023-05-24	2023-05-24
c302784f-425e-4152-a6f2-e1845d0f6706	zambesigold	zgd	ZambesiGold	f	\N	2023-05-24	2023-05-24
c823a079-3ba4-4d4f-908b-890c271f75d4	zam-io	zam	Zam.io	f	\N	2023-05-24	2023-05-24
371019e4-75f4-48c5-838b-c2ae53685357	zamzam	zamzam	ZAMZAM	f	\N	2023-05-24	2023-05-24
4e0320f2-d4e8-4374-b03d-395f02c8563e	zano	zano	Zano	f	\N	2023-05-24	2023-05-24
b8f4e12b-cf8c-42ef-9118-6515d5110419	zap	zap	Zap	f	\N	2023-05-24	2023-05-24
88f3d7ff-8ea3-4f6b-b985-54619f88f91d	zasset-zusd	zusd	Zasset zUSD	f	\N	2023-05-24	2023-05-24
87180402-c3b4-4d3e-968a-649d79fdd897	zatcoin-2	zpro	ZAT Project	f	\N	2023-05-24	2023-05-24
1aa55343-1172-40f2-a846-22d68576a2b0	zbit-ordinals	zbit	ZBIT (Ordinals)	f	\N	2023-05-24	2023-05-24
7eff6802-d1dc-4bea-bfd1-fdbfaa9931ed	zb-token	zb	ZB	f	\N	2023-05-24	2023-05-24
f5aff54c-e1ad-46b9-90e4-f7e208eca787	zcash	zec	Zcash	f	\N	2023-05-24	2023-05-24
51a69ae3-9ff1-4b15-8b6b-1be269414ada	zclassic	zcl	Zclassic	f	\N	2023-05-24	2023-05-24
d5e6ecfc-7ade-4d1f-89e9-260f51a9f8a2	zcoin	firo	Firo	f	\N	2023-05-24	2023-05-24
fbb3f9ca-4f94-4934-9069-56b3a1956654	zcore	zcr	ZCore	f	\N	2023-05-24	2023-05-24
35d3bc15-1d4b-495e-9d8e-dfc160867c68	zcore-finance	zefi	ZCore Finance	f	\N	2023-05-24	2023-05-24
ba21f8de-8e07-4121-9ac0-c4dfa8c9ae9c	z-cubed	z3	Z-Cubed	f	\N	2023-05-24	2023-05-24
6b9f731a-6ec3-4591-9f89-1381b7c4d8a5	zebec-protocol	zbc	Zebec Protocol	f	\N	2023-05-24	2023-05-24
b6eeff75-dddd-4c42-9a01-1fc1de1a51c3	zebi	zco	Zebi	f	\N	2023-05-24	2023-05-24
9f2e47fa-de3f-49f7-bba9-4f6e57a6f1c4	zed-run	zed	ZED RUN	f	\N	2023-05-24	2023-05-24
9c891c1b-dc60-4bcb-a402-3cdb7e042925	zedxion	zedxion	Zedxion	f	\N	2023-05-24	2023-05-24
c7411496-af56-4176-9377-c7e5221e7b25	zedxion-usdz	usdz	Zedxion USDZ	f	\N	2023-05-24	2023-05-24
28bea9c9-790c-4bda-b062-c0e4d6f624cc	zeedex	zdex	Zeedex	f	\N	2023-05-24	2023-05-24
e03d876f-929e-4a8b-a1f6-99464d19ab80	zeemcoin	zeem	Zeemcoin	f	\N	2023-05-24	2023-05-24
46cb9e3f-0329-4c79-a736-eeef5a080e07	zeepin	zpt	Zeepin	f	\N	2023-05-24	2023-05-24
1f23f4c2-753f-401e-97c6-5139669627f1	zeeverse	vee	Zeeverse	f	\N	2023-05-24	2023-05-24
df696a3f-395c-4139-b3ec-5befdc4c739c	zeitcoin	zeit	Zeitcoin	f	\N	2023-05-24	2023-05-24
7f0b40cf-6ed0-419b-91c8-248cd9bcc462	zeitgeist	ztg	Zeitgeist	f	\N	2023-05-24	2023-05-24
e469a1f0-6c59-4086-9700-1ce97e6985c4	zelaapayae	zpae	ZelaaPayAE	f	\N	2023-05-24	2023-05-24
8a4b0704-b872-4599-ad2c-133392fdea33	zelcash	flux	Flux	f	\N	2023-05-24	2023-05-24
58f0c334-a347-415c-a777-3951059bce6f	zelda-inu	zlda	Zelda Inu	f	\N	2023-05-24	2023-05-24
bef20c9c-2b66-47a8-bf00-c9b43f809417	zeloop-eco-reward	erw	ZeLoop Eco Reward	f	\N	2023-05-24	2023-05-24
2936d2ab-fd8e-4b3e-bbde-f68ae9aa808e	zelwin	zlw	Zelwin	f	\N	2023-05-24	2023-05-24
a527bf9e-6cc3-4d2e-929a-9ab702c823f3	zencash	zen	Horizen	f	\N	2023-05-24	2023-05-24
b1dd3915-9224-4962-aafb-3d4dd7730bfd	zenc-coin	zenc	Zenc Coin	f	\N	2023-05-24	2023-05-24
8da70cf2-9141-4a50-ad92-0946e2043470	zenex	znx	ZENEX	f	\N	2023-05-24	2023-05-24
76066b42-8190-4ae0-95b5-605f80fb7a68	zenfuse	zefu	Zenfuse	f	\N	2023-05-24	2023-05-24
227288d7-c41e-448f-b71f-820a48807e26	zeniq	zeniq	ZENIQ	f	\N	2023-05-24	2023-05-24
f4d910ef-4792-4555-97f3-a2deae7f001d	zenith-chain	zenith	Zenith Chain	f	\N	2023-05-24	2023-05-24
8867a1be-eb5c-4cc8-9a68-47082749ffb7	zenithereum	zen-ai	Zenithereum	f	\N	2023-05-24	2023-05-24
6b334d5e-3d46-4e23-a13a-1d6e6688ab7f	zenithswap	zsp	ZenithSwap	f	\N	2023-05-24	2023-05-24
f168a2e6-faf3-4edc-91f1-a480eec46209	zenith-token-306740ae-2497-41a7-aef9-ec34e7f12aa3	zth	Zenith Token	f	\N	2023-05-24	2023-05-24
1cfe1314-a76a-444b-a3d4-62c4f030a1bd	zenland	zenf	Zenland	f	\N	2023-05-24	2023-05-24
972142eb-b1ee-4d4b-a9c3-91c62397f749	zenlink-network-token	zlk	Zenlink Network	f	\N	2023-05-24	2023-05-24
29b51f17-cc59-4b34-9c72-c16313539f4c	zenon	znn	Zenon	f	\N	2023-05-24	2023-05-24
176e8b6e-8fa7-472c-b9b8-2ebbe43540d9	zenpandacoin	$zpc	ZenPandaCoin	f	\N	2023-05-24	2023-05-24
cfe86362-ce86-4f7f-9a0f-0acc87c2fbed	zensports	sports	ZenSports	f	\N	2023-05-24	2023-05-24
2c10a03c-f248-4624-9018-673feaad00d7	zent-cash	ztc	Zent Cash	f	\N	2023-05-24	2023-05-24
7f9bbaf7-e117-4535-9855-689d80a428ac	zenzo	znz	ZENZO	f	\N	2023-05-24	2023-05-24
aec856c4-f0f7-4a3d-b0cf-6e33368c6cb9	zeon	zeon	ZEON Network	f	\N	2023-05-24	2023-05-24
a78dee1f-ce35-42db-9fec-9c4cf6611f15	zeos	zeos	ZEOS	f	\N	2023-05-24	2023-05-24
c1bc7f44-4274-4e33-8dfb-c888adf7a007	zeptagram	zptc	Zeptacoin	f	\N	2023-05-24	2023-05-24
7245f7a9-ac89-4321-879d-0eee775c5cc6	zer0zer0	00	00 Token	f	\N	2023-05-24	2023-05-24
839fa3fa-471c-4d3e-9b09-01f184107e2d	zero	zer	Zero	f	\N	2023-05-24	2023-05-24
5772b1c5-36f3-448f-8bf4-655cec2ed9b8	zero-exchange	zero	0.exchange	f	\N	2023-05-24	2023-05-24
0ff04d0a-deb4-4456-95de-1d09b22ece1f	zeroliquid	zero	ZeroLiquid	f	\N	2023-05-24	2023-05-24
e8da30a4-ba92-42c1-817e-070c3bd36695	zeroswap	zee	ZeroSwap	f	\N	2023-05-24	2023-05-24
6ea06876-476d-4519-a190-42db1bdf9398	zero-tech	zero	Zero Tech	f	\N	2023-05-24	2023-05-24
38b3e628-fab8-41cb-8295-c4d296845b71	zescoin	zesc	Zescoin	f	\N	2023-05-24	2023-05-24
8e6af5f5-dc74-4a5c-8ddc-fc3f93ad1b3d	zetacoin	zet	Zetacoin	f	\N	2023-05-24	2023-05-24
990f73ad-6383-4324-9126-918e8058058d	zeus10000	zeus10000	ZEUS10000	f	\N	2023-05-24	2023-05-24
2ba15f7b-dc2c-4c93-b1df-63103fe9b7d3	zeus-ai	zeus	Zeus AI	f	\N	2023-05-24	2023-05-24
f18bd811-2e23-451a-a082-ffb792c541b8	zeus-finance	zeus	Zeus Finance	f	\N	2023-05-24	2023-05-24
70248af3-5488-4438-98b4-307b7a4c6d7f	zeusshield	zsc	Zeusshield	f	\N	2023-05-24	2023-05-24
ca0650a8-78c7-4d48-94a8-a6e8a34047ad	zexicon	zexi	Zexicon	f	\N	2023-05-24	2023-05-24
1329bf1d-1d97-45ff-97e0-1bb02238accc	zfmcoin	zfm	ZFMCOIN	f	\N	2023-05-24	2023-05-24
19a596d8-f721-474b-9d44-832a52d02143	zhc-zero-hour-cash	zhc	ZHC : Zero Hour Cash	f	\N	2023-05-24	2023-05-24
50c4fa78-1282-44de-bca7-7421bc68d37c	zibu	zibu	Zibu	f	\N	2023-05-24	2023-05-24
d825c597-5124-423f-afe9-a2effcca40f6	ziesha	zsh	Ziesha	f	\N	2023-05-24	2023-05-24
ad687b8b-2e85-41a9-804f-22875711c832	zignaly	zig	Zignaly	f	\N	2023-05-24	2023-05-24
72b0ae36-a986-411a-8692-6ee5437a5ab3	zigzag-2	zz	ZigZag	f	\N	2023-05-24	2023-05-24
26bd59f7-3ec5-4b4d-b618-fe995f3979e1	zik-token	zik	Ziktalk	f	\N	2023-05-24	2023-05-24
43d3f8c3-a283-4469-b69b-e8d0a43c60ce	zillion-aakar-xo	zillionxo	Zillion Aakar XO	f	\N	2023-05-24	2023-05-24
66aee4fe-5e8d-4735-807c-26ad95062edc	zilliqa	zil	Zilliqa	f	\N	2023-05-24	2023-05-24
5e3f88a9-d241-43fd-af2e-3fdd313d9023	zilpay-wallet	zlp	ZilPay Wallet	f	\N	2023-05-24	2023-05-24
bc662af0-e037-4328-a3bb-f1b8245a6bd6	zilpepe	zilpepe	ZilPepe	f	\N	2023-05-24	2023-05-24
8bdc73f4-8599-49cd-bdfc-8c08c08df7cd	zilstream	stream	ZilStream	f	\N	2023-05-24	2023-05-24
c29f0881-ecbe-439e-8875-8610b3ab7c5c	zilswap	zwap	ZilSwap	f	\N	2023-05-24	2023-05-24
f63bec96-b984-4384-8899-9d6f1cdf4ec4	zimbocash	zash	ZIMBOCASH	f	\N	2023-05-24	2023-05-24
d603536a-3713-460b-a446-3529c44b72d0	zin	zin	Zin	f	\N	2023-05-24	2023-05-24
90c49c45-a1d7-45ce-829c-f9e463f497ed	zinja	z	Zinja	f	\N	2023-05-24	2023-05-24
57856243-dfe3-4988-bfe2-c7965d513cfa	zion	zion	Zion	f	\N	2023-05-24	2023-05-24
dcd3e938-b917-4021-ade8-be65b13fa5ac	zion-token	zion	Zion Token	f	\N	2023-05-24	2023-05-24
2a95aa6f-a149-436c-8a8c-dd9be5f3f559	ziot	ziot	Ziot	f	\N	2023-05-24	2023-05-24
bf97d1bc-ee91-497f-a316-e152f014dbdb	zip	zip	Zipper Network	f	\N	2023-05-24	2023-05-24
0c42791e-d5fb-46fa-93ba-04808a53b8a1	zipmex-token	zmt	Zipmex	f	\N	2023-05-24	2023-05-24
833ecdfe-12ab-4559-bf8e-0070f76c01a6	zipswap	zip	ZipSwap	f	\N	2023-05-24	2023-05-24
1bc7ae96-8725-4eae-93fe-fbba0781d6eb	zizy	zizy	Zizy	f	\N	2023-05-24	2023-05-24
374f3a2a-0770-49b3-bea2-9d9f617ab026	zjoe	zjoe	zJOE	f	\N	2023-05-24	2023-05-24
6d18672a-b5d5-4c7d-82b3-07f15a955175	zkapes-token	zat	zkApes Token	f	\N	2023-05-24	2023-05-24
a0660d9f-f256-463f-a033-6cee6f5c5399	zkb	zkb	ZK Cross Chain Bridge	f	\N	2023-05-24	2023-05-24
8db5dbab-5730-4eb4-8dab-ffc94a61c223	zkcult	zcult	zkCULT	f	\N	2023-05-24	2023-05-24
8b1f75b5-0844-4e1d-b84c-a267d5881734	zkdoge	zkdoge	zkDoge	f	\N	2023-05-24	2023-05-24
3c61c6b5-92c3-41d7-8f6a-5a52f3947425	zkfloki	zfloki	zkFloki	f	\N	2023-05-24	2023-05-24
fc08c39d-2930-4a6a-8dba-6c0459553110	zk-inu	$zkinu	ZK inu	f	\N	2023-05-24	2023-05-24
2cba7814-7d46-402a-8946-009353d9626c	zklaunchpad	zkpad	zkLaunchpad	f	\N	2023-05-24	2023-05-24
5214a600-12cb-4623-ab21-71b713e6ba77	zklotto	zklotto	zkLotto	f	\N	2023-05-24	2023-05-24
6eaf0e3a-bad5-49b5-89a0-868a1a0191b3	zknftex	$zkn	zkNFTex	f	\N	2023-05-24	2023-05-24
104b8496-5c74-4dcf-983a-e5a00b68b3a1	zkpepe	zkpepe	ZKPepe	f	\N	2023-05-24	2023-05-24
24833932-34ae-4796-a85a-67c821d36c92	zkproof	zkp	zkProof	f	\N	2023-05-24	2023-05-24
c2ed061d-1fc7-4e79-a629-e1732ac418c9	zkshib	zkshib	zkShib	f	\N	2023-05-24	2023-05-24
b29ed096-c456-4b79-b92d-3c14ca60f25d	zkspace	zks	ZKSpace	f	\N	2023-05-24	2023-05-24
282fba45-0254-4c05-aa15-5d1c5e175ff3	zksvm	zksvm	zkSVM	f	\N	2023-05-24	2023-05-24
72561a5c-4c11-4507-ab25-a328cc7c5f19	zksync-id	zkid	zkSync id	f	\N	2023-05-24	2023-05-24
abbd0e35-fe75-4a75-8ae7-a65cfb6191d4	zktsunami	:zkt:	ZkTsunami	f	\N	2023-05-24	2023-05-24
d32635b4-97db-4a88-a217-aa7b5175aa9a	zmine	zmn	ZMINE	f	\N	2023-05-24	2023-05-24
9fce85d2-8a47-445d-b209-bed8a291ea5f	zodiacsv2	zdcv2	ZodiacsV2	f	\N	2023-05-24	2023-05-24
97eea961-ebcf-4a67-8912-f9c9476a37f8	zodium	zodi	Zodium	f	\N	2023-05-24	2023-05-24
0b300e97-c709-42d7-a7ca-afff0ab3dfee	zogi	zogi	ZOGI	f	\N	2023-05-24	2023-05-24
f7159038-2b07-42fd-81aa-820ef9e86d58	zoid-pay	zpay	ZoidPay	f	\N	2023-05-24	2023-05-24
5a55d6cf-75e7-499c-a332-ac4ecede9cf6	zombie-inu	zinu	Zombie Inu (OLD)	f	\N	2023-05-24	2023-05-24
b56841d6-5ae8-41ea-9231-c3924d60d2e0	zombie-inu-2	zinu	Zombie Inu	f	\N	2023-05-24	2023-05-24
d2c22d17-b79a-45c1-ba0e-fa2f2567337d	zomfi	zomfi	Zomfi	f	\N	2023-05-24	2023-05-24
f47c47ff-7d88-452c-98fe-ec4153a9a535	zone	zone	Zone	f	\N	2023-05-24	2023-05-24
1c30e0a7-b86d-4dbe-9b9e-b1d84e4a0ee5	zonecoin	zne	Zonecoin	f	\N	2023-05-24	2023-05-24
86fd9d19-b5ad-4cb9-9c56-f3f5ffd14039	zone-of-avoidance	zoa	Zone of Avoidance	f	\N	2023-05-24	2023-05-24
9d1d72fe-65de-43d4-9f48-0f7834b3561b	zoo-coin	zoo	ZooCoin	f	\N	2023-05-24	2023-05-24
99f70feb-8383-4d76-990d-f1f6363dacae	zoo-crypto-world	zoo	ZOO Crypto World	f	\N	2023-05-24	2023-05-24
709720cf-0568-43e7-9f2e-8e8aa6c96e9e	zoodao	zoo	ZooDAO	f	\N	2023-05-24	2023-05-24
78cc05eb-eb15-44ab-ac10-84522b0843f9	zookeeper	zoo	ZooKeeper	f	\N	2023-05-24	2023-05-24
36be89fd-c7ba-4f49-9514-ad2b7ce26618	zoomswap	zm	ZoomSwap	f	\N	2023-05-24	2023-05-24
6b29799b-2d9a-4bd3-959d-f0e0cfac21d1	zoo-token	zoot	Zoo	f	\N	2023-05-24	2023-05-24
38b4479e-7982-4fee-a58c-706c220febae	zoracles	zora	Zoracles	f	\N	2023-05-24	2023-05-24
226a4cc3-2cd3-4265-a262-7a78cd8e29e7	zrcoin	zrc	ZrCoin	f	\N	2023-05-24	2023-05-24
a5d61f14-1c85-45fc-b684-d5684cba4767	zro	zro	Carb0n.fi	f	\N	2023-05-24	2023-05-24
0d844d55-d50e-4293-80f4-83c8f65b50fd	zsol	zsol	zSOL	f	\N	2023-05-24	2023-05-24
78ac83bc-09af-4f03-900a-0c8c9b2a1c24	zudgezury	zzc	ZudgeZury	f	\N	2023-05-24	2023-05-24
3635994e-c442-46a8-b3d1-247a20e684f2	zuki-moba	zuki	Zuki Moba	f	\N	2023-05-24	2023-05-24
504ffe30-32c3-4112-8b53-04767a202eea	zum-token	zum	ZUM	f	\N	2023-05-24	2023-05-24
234161da-4b3e-4f35-a888-474386931f5b	zuna	zuna	Zuna	f	\N	2023-05-24	2023-05-24
1c3e578a-4193-4c8e-bbbf-9cf34ebd6345	zunami-protocol	uzd	Zunami USD	f	\N	2023-05-24	2023-05-24
a8105a7c-fdf6-4d12-91a7-84a8578eb355	zurrency	zurr	ZURRENCY	f	\N	2023-05-24	2023-05-24
f68fe903-010c-454f-afd4-894243424c8a	zusd	zusd	ZUSD	f	\N	2023-05-24	2023-05-24
9cffe225-cd2a-41dc-afd5-aee535a484d8	zyberswap	zyb	Zyberswap	f	\N	2023-05-24	2023-05-24
39ab68f3-8185-4e92-a80f-ea25fa081abf	zynecoin	zyn	Zynecoin	f	\N	2023-05-24	2023-05-24
aac65f1a-b97f-4427-9be1-541c6aec5b09	zynergy	zyn	Zynergy	f	\N	2023-05-24	2023-05-24
e7605a4e-142a-4e0c-b05a-4dc340e3401a	zyro	zyro	Zyro	f	\N	2023-05-24	2023-05-24
b86dc5f5-148c-4897-877f-2eb677a5ef02	zyrri	zyr	Zyrri	f	\N	2023-05-24	2023-05-24
970beb63-d2d4-4f65-90b0-97b07ed9bb84	zyx	zyx	ZYX	f	\N	2023-05-24	2023-05-24
8b468e81-d99c-4a75-b567-cc3139b05866	zzz	zzz	GoSleep ZZZ	f	\N	2023-05-24	2023-05-24
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
93c6d8c8-b9e0-44e4-afe4-8a7492dce261	Balboa	PAB	f	\N	2023-05-24	2023-05-24
a11f17e9-6bf7-454b-bf46-6cdf43a1e183	Bermudian Dollar	BMD	f	\N	2023-05-24	2023-05-24
5b7c5e40-c778-4d53-9ce1-608c2e14e1b5	Canadian Dollar	CAD	f	\N	2023-05-24	2023-05-24
b4906c85-217f-4776-aac2-9efdbba190f5	Colombian Peso	COP	f	\N	2023-05-24	2023-05-24
787a2af8-cb4c-41e4-9872-94c7531467ca	Dong	VND	f	\N	2023-05-24	2023-05-24
bb566559-71ca-4676-89f2-b36421805573	Forint	HUF	f	\N	2023-05-24	2023-05-24
0a26f309-6c14-4b4c-84d0-39082e07cd6f	Guarani	PYG	f	\N	2023-05-24	2023-05-24
2af89cf2-f212-4de5-8341-7e1a10c5d620	Iraqi Dinar	IQD	f	\N	2023-05-24	2023-05-24
fc6411bb-e64a-40f1-983b-253c7f987b3c	Liberian Dollar	LRD	f	\N	2023-05-24	2023-05-24
e0e062d0-95f8-4429-9d04-ef8e144308d5	Malagasy Ariary	MGA	f	\N	2023-05-24	2023-05-24
ad5cb4c7-41f5-4509-a15e-6ed48df92cac	Mozambique Metical	MZN	f	\N	2023-05-24	2023-05-24
00e29ae9-77ef-4fd0-92cc-ea12887f5bdd	Ngultrum	BTN	f	\N	2023-05-24	2023-05-24
a36b6bbd-3554-4bd7-ba6b-174367bdc168	Philippine Peso	PHP	f	\N	2023-05-24	2023-05-24
3d23a343-1882-4c1e-9149-b365b069fbea	Pula	BWP	f	\N	2023-05-24	2023-05-24
bef42e02-3f7a-4bc5-9037-ac9da6ab00a7	Rwanda Franc	RWF	f	\N	2023-05-24	2023-05-24
96cea0f2-fec5-4577-9cbe-e68d39220012	Seychelles Rupee	SCR	f	\N	2023-05-24	2023-05-24
597b20e6-e91f-4787-8832-9566efc80181	Tala	WST	f	\N	2023-05-24	2023-05-24
4258096a-75a1-4d4b-aea6-8cbf559db7c0	Tugrik	MNT	f	\N	2023-05-24	2023-05-24
2dbf013f-79fe-4793-b9b1-f26463d69f9f	Yemeni Rial	YER	f	\N	2023-05-24	2023-05-24
c162360f-abf9-4e9e-a13e-a87beb9f7212	Afghani	AFN	f	\N	2023-05-24	2023-05-24
7a970425-9d35-4968-b1aa-80fcee21eade	Armenian Dram	AMD	f	\N	2023-05-24	2023-05-24
8390247f-0a35-4712-9512-94b780dd1cb4	Boliviano	BOB	f	\N	2023-05-24	2023-05-24
7a99082d-2f9c-4a75-9f07-004ee129fa29	Cabo Verde Escudo	CVE	f	\N	2023-05-24	2023-05-24
ac7d3d5e-691d-42a2-89a2-ec68dc59f727	Burundi Franc	BIF	f	\N	2023-05-24	2023-05-24
f4b4921a-ae0a-4d9c-9f9d-7fb530c913f3	Algerian Dinar	DZD	f	\N	2023-05-24	2023-05-24
b894947b-99b0-47b3-ab3f-3e067d5e28c3	Australian Dollar	AUD	f	\N	2023-05-24	2023-05-24
5d780a67-011e-4a86-8286-e04823d95f7c	Cordoba Oro	NIO	f	\N	2023-05-24	2023-05-24
d845da58-d501-4835-9d66-3f718be900f7	Convertible Mark	BAM	f	\N	2023-05-24	2023-05-24
fa0d1447-8f41-45cd-86b5-95f6fa5420cf	Cuban Peso	CUP	f	\N	2023-05-24	2023-05-24
4f63df44-92fa-40e1-a634-9398be0b6136	Danish Krone	DKK	f	\N	2023-05-24	2023-05-24
04eaac7b-81bb-4067-98d9-324795f63329	Dobra	STN	f	\N	2023-05-24	2023-05-24
231d999e-fe53-496e-bd74-6f6ec7a5e46f	Euro	EUR	f	\N	2023-05-24	2023-05-24
f47fbc4d-8501-4768-ae60-1bdeb2566188	Fiji Dollar	FJD	f	\N	2023-05-24	2023-05-24
cb4c38ea-48d6-45a4-9044-3369e02b6e94	Gold	XAU	f	\N	2023-05-24	2023-05-24
331e4f1d-0017-46ef-b124-78ed034df331	Hong Kong Dollar	HKD	f	\N	2023-05-24	2023-05-24
8f441c6d-c8bf-4093-b219-3dca0caff9d8	Kuna	HRK	f	\N	2023-05-24	2023-05-24
ca5537a4-66b0-497f-bfdb-23ccd97645a6	Kyat	MMK	f	\N	2023-05-24	2023-05-24
48f20409-05e3-4832-9c74-754d6cc69a5b	Kenyan Shilling	KES	f	\N	2023-05-24	2023-05-24
a3c37b3b-d3bf-403c-bd2f-5946f2e8e0db	Lempira	HNL	f	\N	2023-05-24	2023-05-24
a19f2a8e-7a94-4a3e-8d26-f69cec823126	Loti	LSL	f	\N	2023-05-24	2023-05-24
02840631-2af2-4882-a72d-b435a94bfa5f	Mauritius Rupee	MUR	f	\N	2023-05-24	2023-05-24
d9ec1b18-80f5-4e31-bf32-fd2d07d47db8	Moldovan Leu	MDL	f	\N	2023-05-24	2023-05-24
1a66e7f3-1c42-4633-a9c7-40a187761da7	Nepalese Rupee	NPR	f	\N	2023-05-24	2023-05-24
a422be10-6413-46d5-9bf8-860d57b41362	Norwegian Krone	NOK	f	\N	2023-05-24	2023-05-24
63981c28-6d76-4185-8603-36615640fd64	Pakistan Rupee	PKR	f	\N	2023-05-24	2023-05-24
2af11197-dac0-4989-ae90-f70b0b6e8f9d	Pound Sterling	GBP	f	\N	2023-05-24	2023-05-24
b9210dfd-e7e9-4502-b535-b86b54e6c0a3	Rand	ZAR	f	\N	2023-05-24	2023-05-24
06609509-780d-498d-9db2-e2f8b5737df4	Rial Omani	OMR	f	\N	2023-05-24	2023-05-24
fe76c977-ba39-4822-8c4e-7b790a2fde0b	Russian Ruble	RUB	f	\N	2023-05-24	2023-05-24
d5d76d9b-04d3-4f2f-bddf-184c5f10b345	Solomon Islands Dollar	SBD	f	\N	2023-05-24	2023-05-24
7d789923-35b8-4b4a-8386-9a84aee6fdcc	Sucre	XSU	f	\N	2023-05-24	2023-05-24
aa76bf71-abb4-4818-9ee2-7f0e8b39397a	Swiss Franc	CHF	f	\N	2023-05-24	2023-05-24
dd772c18-6e6d-4fe8-9e6b-03287f3bc638	Tenge	KZT	f	\N	2023-05-24	2023-05-24
41f8fefa-f3eb-4c03-873d-800c99d19388	Trinidad and Tobago Dollar	TTD	f	\N	2023-05-24	2023-05-24
d3b455d4-84e0-4691-8b72-f57c42fc3be4	Turkmenistan New Manat	TMT	f	\N	2023-05-24	2023-05-24
9e712b8f-6194-42b1-b587-6fb5fdf295a7	US Dollar	USD	f	\N	2023-05-24	2023-05-24
103064c3-713b-49ab-a613-8cd9ffc83736	Yuan Renminbi	CNY	f	\N	2023-05-24	2023-05-24
ad62b407-26d7-4030-a11f-34754205abae	Zloty	PLN	f	\N	2023-05-24	2023-05-24
f91f4db5-50df-44de-9fce-f22a86accf8d	Barbados Dollar	BBD	f	\N	2023-05-24	2023-05-24
58317f12-38ed-4c91-8950-f9aa52707b1b	Bolívar Soberano	VES	f	\N	2023-05-24	2023-05-24
dc489ab7-dfc6-4029-ba5c-d96bdba1121b	CFA Franc BCEAO	XOF	f	\N	2023-05-24	2023-05-24
ac7b419d-7010-4592-928c-8bd1b670fdb3	Comorian Franc 	KMF	f	\N	2023-05-24	2023-05-24
7a71369a-9755-46f6-83ca-79a9680ab34f	Czech Koruna	CZK	f	\N	2023-05-24	2023-05-24
44e613ba-dfe3-46a5-af62-c145e94e1291	East Caribbean Dollar	XCD	f	\N	2023-05-24	2023-05-24
7a3ac2ae-61fa-4a71-9b1b-3b331835b0d3	Gibraltar Pound	GIP	f	\N	2023-05-24	2023-05-24
7218bd30-3d47-4fc4-88c0-823e865b24f2	Indian Rupee	INR	f	\N	2023-05-24	2023-05-24
0a362263-65a2-4afd-8d22-4a5f44cef497	Kuwaiti Dinar	KWD	f	\N	2023-05-24	2023-05-24
d5b4939c-6205-4712-ac13-c552e4a7953c	Libyan Dinar	LYD	f	\N	2023-05-24	2023-05-24
58841868-7367-4df7-bc3e-35f8dfc12536	Naira	NGN	f	\N	2023-05-24	2023-05-24
b18d90e8-dbfe-4142-bbbf-37129a72e28c	New Israeli Sheqel	ILS	f	\N	2023-05-24	2023-05-24
b4421b2a-3794-41dc-b319-89b4f3447c51	Pa’anga	TOP	f	\N	2023-05-24	2023-05-24
8c5a7576-3808-4d3c-ad7c-1472d2e12746	Rupiah	IDR	f	\N	2023-05-24	2023-05-24
ac2e920a-0eb2-4d3b-a3be-f6614e68783e	Saudi Riyal	SAR	f	\N	2023-05-24	2023-05-24
e3441a7c-f418-451d-83c2-3010ed468aa1	Somoni	TJS	f	\N	2023-05-24	2023-05-24
f68bf04e-0c21-4430-b027-e00aa3547ee8	Syrian Pound	SYP	f	\N	2023-05-24	2023-05-24
c8c04780-295e-4d3a-b355-e1b8f377e036	Vatu	VUV	f	\N	2023-05-24	2023-05-24
dc6731a6-f559-4757-b450-f35c56232241	Zimbabwe Dollar	ZWL	f	\N	2023-05-24	2023-05-24
67091ad2-bdff-46f0-a043-593ca6cc2c5e	Belize Dollar	BZD	f	\N	2023-05-24	2023-05-24
a0e87e9c-4a22-49ee-83d6-a70b72f0f780	Brunei Dollar	BND	f	\N	2023-05-24	2023-05-24
6282b67a-e769-4be8-852e-50de40513904	Aruban Florin	AWG	f	\N	2023-05-24	2023-05-24
5b376bd4-aba7-4ede-a37d-ba7aae5d0911	CFA Franc BEAC	XAF	f	\N	2023-05-24	2023-05-24
221c2444-e938-49ee-be88-81e4c8585ecf	Congolese Franc	CDF	f	\N	2023-05-24	2023-05-24
83cb9efa-52e2-4775-8acf-a0413860ca7a	Egyptian Pound	EGP	f	\N	2023-05-24	2023-05-24
2e2dfc38-1eaa-48f5-87e2-0b21f2f5d2dd	El Salvador Colon	SVC	f	\N	2023-05-24	2023-05-24
eee7b62f-13ba-4a5c-838a-c40811cffa9e	Gourde	HTG	f	\N	2023-05-24	2023-05-24
23a0bbd5-c48d-42d6-b328-4eadfc8ed1b8	Jamaican Dollar	JMD	f	\N	2023-05-24	2023-05-24
9c198cb2-628b-441a-9eaa-df620aacb7ff	Lari	GEL	f	\N	2023-05-24	2023-05-24
c040e5a3-eb6b-4ba2-a9d5-ae990520710a	Malaysian Ringgit	MYR	f	\N	2023-05-24	2023-05-24
ed2e58ac-b50c-47ca-93a8-6ff963a137e0	Netherlands Antillean Guilder	ANG	f	\N	2023-05-24	2023-05-24
26011360-e11f-4cc6-9e88-15021ec2de0f	Palladium	XPD	f	\N	2023-05-24	2023-05-24
7d0ccc96-e4b2-4749-a277-c8d9934e9481	Qatari Rial	QAR	f	\N	2023-05-24	2023-05-24
1daf2960-4869-4de4-9286-c6670ec3c8e7	Saint Helena Pound	SHP	f	\N	2023-05-24	2023-05-24
c6ad4430-1be5-4087-a94b-1efd70693a63	Silver	XAG	f	\N	2023-05-24	2023-05-24
9c9bba3f-48c1-40fc-b8f1-e9627cfc45a3	Somali Shilling	SOS	f	\N	2023-05-24	2023-05-24
51ab6012-1212-486d-8922-85fd8adb0069	Surinam Dollar	SRD	f	\N	2023-05-24	2023-05-24
99b916cd-1b30-4ef3-88f8-fcdf0e653e0a	Turkish Lira	TRY	f	\N	2023-05-24	2023-05-24
f457db09-c9d3-4cc4-a46c-47efe08090c2	Won	KRW	f	\N	2023-05-24	2023-05-24
26d90621-0c39-4920-92c0-add1859ab139	Bahraini Dinar	BHD	f	\N	2023-05-24	2023-05-24
f7c38031-6ccf-41f7-9ded-58e29526732a	Denar	MKD	f	\N	2023-05-24	2023-05-24
7c10f8b5-33ca-423a-91d1-3c99481454c6	Djibouti Franc	DJF	f	\N	2023-05-24	2023-05-24
55ae2284-80eb-4df7-a0a4-f7c1e99863e6	Guinean Franc	GNF	f	\N	2023-05-24	2023-05-24
566c3a2f-8e90-4d21-a330-37ac7d25c0eb	Hryvnia	UAH	f	\N	2023-05-24	2023-05-24
10e6ed61-3f46-407a-b4c4-c2c60a198bd3	Kina	PGK	f	\N	2023-05-24	2023-05-24
76266f48-e5d9-43f5-b961-6168209ae993	Leone	SLL	f	\N	2023-05-24	2023-05-24
84793f4d-dc79-4925-a122-2cfdb706ba1e	Moroccan Dirham	MAD	f	\N	2023-05-24	2023-05-24
d3303613-f625-4b1a-863c-05c7c209e68c	New Zealand Dollar	NZD	f	\N	2023-05-24	2023-05-24
5f550fda-9325-4dc3-80ba-331723a2bc15	Peso Uruguayo	UYU	f	\N	2023-05-24	2023-05-24
cb95c9cf-2f53-43a7-a3ee-4af18facb74c	Serbian Dinar	RSD	f	\N	2023-05-24	2023-05-24
7c5cf791-08ed-4f57-bf7d-0a12b5e19fef	Sri Lanka Rupee	LKR	f	\N	2023-05-24	2023-05-24
a137df18-0fd4-4b1e-9bea-e6452b06bd1b	Sudanese Pound	SDG	f	\N	2023-05-24	2023-05-24
362c6879-04c7-4bbb-a94d-7059a5646aa5	Tunisian Dinar	TND	f	\N	2023-05-24	2023-05-24
a610ada1-0006-42a5-b214-daf40ac3e984	Zambian Kwacha	ZMW	f	\N	2023-05-24	2023-05-24
5c683e06-36c7-447c-8de6-a8e312ff15c0	Ghana Cedi	GHS	f	\N	2023-05-24	2023-05-24
30339739-4289-4600-ade5-267d5df3e4b5	Iceland Krona	ISK	f	\N	2023-05-24	2023-05-24
06207547-cb06-4c12-8cc9-0bfd2a7c99d9	Kwanza	AOA	f	\N	2023-05-24	2023-05-24
1e800732-3abb-4597-991a-9dbd8b91c8a6	Lilangeni	SZL	f	\N	2023-05-24	2023-05-24
4eb5cb20-c7f9-4ea4-9bc3-73992d6ec45e	Namibia Dollar	NAD	f	\N	2023-05-24	2023-05-24
b4b4f0ac-534b-47e1-b8d4-130ef1af2814	Ouguiya	MRU	f	\N	2023-05-24	2023-05-24
f51696e0-f958-4f79-a609-e5f7ff77da3f	Platinum	XPT	f	\N	2023-05-24	2023-05-24
bcaaf8fd-562f-4f9e-95b1-749c9b72283a	Romanian Leu	RON	f	\N	2023-05-24	2023-05-24
202bad1b-210a-4903-9b3d-3b0f28df8016	Sol	PEN	f	\N	2023-05-24	2023-05-24
b3836e4f-68dd-4e13-a81c-bbc50513d8a5	South Sudanese Pound	SSP	f	\N	2023-05-24	2023-05-24
7b79261d-2f6c-45ee-a7c8-c55171490c96	Taka	BDT	f	\N	2023-05-24	2023-05-24
84de1133-a5be-44ac-b0c4-3f268acc313b	Uganda Shilling	UGX	f	\N	2023-05-24	2023-05-24
c655010f-2b32-46f0-b80e-2e5ad635f734	Azerbaijan Manat	AZN	f	\N	2023-05-24	2023-05-24
4c32b14f-2662-4289-8fae-6dfa6f677273	Belarusian Ruble	BYN	f	\N	2023-05-24	2023-05-24
deecb9e9-47af-476e-beba-3b2bff89ba60	Brazilian Real	BRL	f	\N	2023-05-24	2023-05-24
3933405e-d04c-4cd4-9bdf-dc8b9699e689	Cayman Islands Dollar	KYD	f	\N	2023-05-24	2023-05-24
f0adf65e-48b7-494b-afad-9e90a29978da	Argentine Peso	ARS	f	\N	2023-05-24	2023-05-24
ce26b363-3de9-497e-986b-c62357d600cc	Costa Rican Colon	CRC	f	\N	2023-05-24	2023-05-24
9b778aa1-65c0-4b80-be7d-63b9ae179315	Dominican Peso	DOP	f	\N	2023-05-24	2023-05-24
267bb54b-e394-49fc-be35-7917ab8d5554	Falkland Islands Pound	FKP	f	\N	2023-05-24	2023-05-24
f4737e24-efbb-48e3-89c1-e4ad8e714dc1	Guyana Dollar	GYD	f	\N	2023-05-24	2023-05-24
fd518a19-e748-4daf-85d9-c174885d49af	Jordanian Dinar	JOD	f	\N	2023-05-24	2023-05-24
60d0b779-d84d-4f75-a0c2-a7e9a11690ff	Lek	ALL	f	\N	2023-05-24	2023-05-24
222264ac-0df3-4381-82af-0e29c6a8d209	Mexican Peso	MXN	f	\N	2023-05-24	2023-05-24
32b5199f-ecc5-4b99-8cc6-b8d4eb100500	New Taiwan Dollar	TWD	f	\N	2023-05-24	2023-05-24
7eef94ee-31d8-4a76-b052-4f6ea92ad5e6	Pataca	MOP	f	\N	2023-05-24	2023-05-24
1734dc9d-4116-4fcb-ac30-820cf752f166	Quetzal	GTQ	f	\N	2023-05-24	2023-05-24
b7fcbff4-8901-4f76-a91c-06491091b500	Rufiyaa	MVR	f	\N	2023-05-24	2023-05-24
058bb483-bd1b-4479-acc6-99364abb7b34	Som	KGS	f	\N	2023-05-24	2023-05-24
917421a4-6c52-4c25-9f42-6c2037a129cf	UAE Dirham	AED	f	\N	2023-05-24	2023-05-24
9eaaf136-95d6-44a7-8c13-8224e21279fe	Uzbekistan Sum	UZS	f	\N	2023-05-24	2023-05-24
dabeaebc-d351-405b-b1fe-07352d54e412	Bahamian Dollar	BSD	f	\N	2023-05-24	2023-05-24
03ae5771-830f-4269-a1b0-19f2b10379fa	Baht	THB	f	\N	2023-05-24	2023-05-24
b2946464-3cda-4838-ba5c-2a54248eca34	Bulgarian Lev	BGN	f	\N	2023-05-24	2023-05-24
647f989b-3961-4476-a126-d121b3c31d98	CFP Franc	XPF	f	\N	2023-05-24	2023-05-24
2701af8d-c031-40f8-8986-88d663d27e6a	Chilean Peso	CLP	f	\N	2023-05-24	2023-05-24
9ccef883-b833-433f-9c7a-3c7085ca62d7	Dalasi	GMD	f	\N	2023-05-24	2023-05-24
7692849a-72c8-48ab-862f-a11b487d1254	Ethiopian Birr	ETB	f	\N	2023-05-24	2023-05-24
bb0f41b8-1d72-4b2d-89e1-60f246252a99	Iranian Rial	IRR	f	\N	2023-05-24	2023-05-24
3623c715-f9f5-478c-9fc0-ffff77e14449	Lao Kip	LAK	f	\N	2023-05-24	2023-05-24
099e3095-3db7-4449-9a56-e5733b170ea3	Lebanese Pound	LBP	f	\N	2023-05-24	2023-05-24
63b7b058-d4c2-4e20-becb-9e0f3265be59	Malawi Kwacha	MWK	f	\N	2023-05-24	2023-05-24
425bec67-1a4b-4cf4-b306-1a3d8e10b3b0	Nakfa	ERN	f	\N	2023-05-24	2023-05-24
53b6b0b7-ac2a-4f45-bd16-95f2976454e1	North Korean Won	KPW	f	\N	2023-05-24	2023-05-24
8b20f425-7226-476c-baa2-982d2f1d00f3	Peso Convertible	CUC	f	\N	2023-05-24	2023-05-24
07e9122d-2345-4c5a-a7b8-6e0899bd242e	Riel	KHR	f	\N	2023-05-24	2023-05-24
08fb600c-1482-4ba8-9fee-eda697676263	Singapore Dollar	SGD	f	\N	2023-05-24	2023-05-24
9fa3c9a8-af06-4681-a0a7-3ac5a5b58347	Swedish Krona	SEK	f	\N	2023-05-24	2023-05-24
de65375b-4924-4271-afe1-b1d3cbcd3281	Tanzanian Shilling	TZS	f	\N	2023-05-24	2023-05-24
4ef70d3b-9701-41ea-8fce-7e7ac59dd3dd	Unidad Previsional	UYW	f	\N	2023-05-24	2023-05-24
10309016-45b8-40d3-a19d-5c4dab711953	Yen	JPY	f	\N	2023-05-24	2023-05-24
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
56e11588-9510-4eb6-bbdf-9ef29e407318	Cash	f	\N	2023-05-24	2023-05-24
3506f70d-cd88-4d29-a0c9-ac8a97bb3011	Cryptocurrency	f	\N	2023-05-24	2023-05-24
ade5877e-e1e2-4ab7-ae4a-fb00720b5479	Online Banking	f	\N	2023-05-24	2023-05-24
\.


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_methods (id, name, "isDeleted", "whenDelete", "createdAt", "updatedAt", "paymentMethodCategoryId") FROM stdin;
81dfe067-b625-4969-95a8-0390ef85795a	Euro	f	\N	2023-05-24	2023-05-24	56e11588-9510-4eb6-bbdf-9ef29e407318
96cda170-9942-48fd-84e5-f2b799416c18	US Dollar	f	\N	2023-05-24	2023-05-24	56e11588-9510-4eb6-bbdf-9ef29e407318
7fd983c5-926b-424e-b7ce-111b03022a7b	Brazilian Real	f	\N	2023-05-24	2023-05-24	56e11588-9510-4eb6-bbdf-9ef29e407318
ae4fb5f4-e885-480f-a947-82a97a6afdb2	Bitcoin	f	\N	2023-05-24	2023-05-24	3506f70d-cd88-4d29-a0c9-ac8a97bb3011
1165f8f0-ae41-4752-9323-31ef71a14a8e	Ethereum	f	\N	2023-05-24	2023-05-24	3506f70d-cd88-4d29-a0c9-ac8a97bb3011
3426eb51-9ab7-4b79-8641-133583ae9b1a	Solana	f	\N	2023-05-24	2023-05-24	3506f70d-cd88-4d29-a0c9-ac8a97bb3011
5b5c2a6a-8e57-4ae5-9b3a-471e17e68c38	Gala	f	\N	2023-05-24	2023-05-24	3506f70d-cd88-4d29-a0c9-ac8a97bb3011
55bc8287-c64f-4aca-9057-52b04d10aff7	Spuerkeess	f	\N	2023-05-24	2023-05-24	ade5877e-e1e2-4ab7-ae4a-fb00720b5479
6e7d0105-14b2-447b-8395-2dbced83b22f	Commerzbank	f	\N	2023-05-24	2023-05-24	ade5877e-e1e2-4ab7-ae4a-fb00720b5479
e81f1aa2-cd95-4b9c-a0cd-91e47d168639	Deutsche Bank	f	\N	2023-05-24	2023-05-24	ade5877e-e1e2-4ab7-ae4a-fb00720b5479
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
fe02b363-15ba-41e3-90bb-5196d2ef7b73	50dea425-6ad6-4c8e-ad8d-40c5d01fdd8e
726f59be-50b4-4745-9359-c90d857d11f4	50dea425-6ad6-4c8e-ad8d-40c5d01fdd8e
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "profileColor", "firstName", "lastName", username, password, "privateKeys", "isVerified", "isDeleted", "whenDelete", "createdAt", "updatedAt") FROM stdin;
fe02b363-15ba-41e3-90bb-5196d2ef7b73	#fff	Healthy	Shrimp	healthy-shrimp	$2a$10$86AmCmDC3fshjR9b6ZxBAOgWf8VHaeMm9B3e4rUo4ucqs4xUJIgjm	{$2a$10$O6VyiOLLxcSryu70HK2rXec4iaSD7PGvF11F7BY1AlFnGxJdpoApy,$2a$10$ub4UyU850yQNbtkPq2UvruBOyDgbqJc5Q7VXzzIWnk8cTxASd.ofO,$2a$10$ksTeuqlvt2VvjOkXwbVvEecOzw0a/eYX8BQuF/JZk5JbqorNh5l3e,$2a$10$JTrLnKinEbziZ2pmTJPnWOVlAiQNJxlZTxlMVO7KKHSw1DDTQGjgW,$2a$10$4fZ6NQT8H/VowmrR5EccaetNAbZh12Y/IzIaUmVKEElEhtBIRqABO,$2a$10$Dzdw5qzx4u.ijLttN0lsLOM4LIFUTIyQejrhnQ9SIWQhGv0i6rs9.,$2a$10$sLQ5mcl7Dn7sLnqRBlKENun3MCxxBkA4OdCHf8FCfpBi.mtA/glIe,$2a$10$GxPkrEvz3P75LzNq.3AFj.0kg7tcM0brxzt65zTrLChM.AO/.OMCK,$2a$10$V/lRn1MDZugbe2nUMEetr.McL/Pq33WYHYCmuashy0hAZKebrmTJu,$2a$10$1mzNpYcTYM2Z8rGJgEc0lOcVlNdhbagAHhekwjwdVkQlxvCN0dDsW,$2a$10$X.AqU9VRlYBPp2ZUGmhsk.QaUV2xf41b4hVBn2RvcavR8DMWQdeA.,$2a$10$GeoTW4AAQJNAsXyzsxioeuy1/2/3sN9.l1AJRGPjcVKb18J4xpyy2}	t	f	\N	2023-05-25	2023-05-25
726f59be-50b4-4745-9359-c90d857d11f4	#fff	Traditional	Kangaroo	traditional-kangaroo	$2a$10$N7BlkTkQ9F8jU34YzlZLje/N1yLm.gg6MHiWDpqmfqEGOCHQ9r1qu	{$2a$10$x1yzlu/72qrzNJ.ekeCNnOaM9JfNupkl2BO6cq8VNO/Z98N9zJgVm,$2a$10$xD7QqO2/F4YLy.XAJBUvfeogFwAC3TKufVc8clf9v.qmoiPlt6TG2,$2a$10$dtS67OnCbzSCz2zdYPr3ru5P6xiZqtyqNpjfCq4tt5ASKuAt.dzQu,$2a$10$rMjSFdUy7BFyBJ34HeqacO19SCandoDWo42S6zpnl3mfOk0j3kEce,$2a$10$T16T126TS5OjKuq9GlnJouQiZyGH7xV2gg3j0ihCAxau6rV98lEJe,$2a$10$1/mGvp2AUOCuZCV1MuiRRer.xeV77DkkU9ulhUvTvsJfMuVfVKm8m,$2a$10$g1ST.M0R9hKgLQ0ytngiueU8fslKKG1nfo2v9xAYxVwGkSprvSkVy,$2a$10$ooI3hvu55azketfMlTC7LuYSNvbWwnAsawYdRkIyEQbINSnJgsp1m,$2a$10$B4HoEmUtOgHEeGqxnNzNEulJSNfHa81h/19xrD8IGO7YUJxJ/iIE.,$2a$10$hDbwfwjg9ZaqiNp08e71n.iWhmLf//E5hikz.dFSn/p3B.lJiGaja,$2a$10$S2lNM9PLsvDd2GRCfhfh9.h6DTd26piBttnXQQmh/xJ/1xTmsha1u,$2a$10$v3oWETsRAkoNCvJ6OlXQkOsoz0CKseKquUl0nhWO0wS6qOX6AOhg.}	t	f	\N	2023-05-25	2023-05-25
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

