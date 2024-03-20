-- INSERT INTO products (product_id, product_type, product_brand, product_name, product_image, is_essential, sales_link, product_price, description) VALUES
-- (1, 'cleanser', 'Brand A', 'Product A', 'http://example.com/image.jpg', true, 'http://example.com', 19.99, 'Description here'),
-- (2, 'moisturizer', 'Brand B', 'Product B', 'http://example.com/image2.jpg', false, 'http://example.com', 29.99, 'Description here');

INSERT INTO products (product_id, product_type, product_brand, product_name, product_image, is_essential, sales_link, product_price, description) VALUES
(1, 'cleanser', 'Cetaphil', 'Gentle Skin Cleanser', 'https://target.scene7.com/is/image/Target/GUEST_58fa4a3a-8d3a-4ba6-b083-fca4bf8ae5d2?wid=488&hei=488&fmt=pjpeg', true, 'https://www.amazon.com/dp/B07GC74LL5?tag=thestrategistsite-20&ascsubtag=__st0315awd__ck2p680yo00bvcxy6r12vqepy__72551________2______google.com', 13, 'Gentle cleanser for sensitive and dry to normal skin.'),
(2, 'cleanser', 'Cerave', 'Foaming Facial Cleanser', 'https://pyxis.nymag.com/v1/imgs/133/c9a/74855848be368bb98047c8cb1dabd35343-cerave-foaming.2x.rsquare.w600.jpg', true, 'https://www.amazon.com/dp/B01N1LL62W?tag=thestrategistsite-20&ascsubtag=__st0315awd__ck2p680yo00bvcxy6r12vqepy__182046________2______google.com', 15, 'Calming cleanser for oily and acne-prone skin.'),
(3, 'cleanser', 'La Roche-Posay', ' Toleriane Hydrating Gentle Cleanser', 'https://pyxis.nymag.com/v1/imgs/59b/4b6/c21691d6263ab20f47e180f98e9c41c998-la-roche-posay-cleanser.2x.rsquare.w600.jpg', true, 'https://www.amazon.com/dp/B01N7T7JKJ?tag=thestrategistsite-20&ascsubtag=__st0315awd__ck2p680yo00bvcxy6r12vqepy__47438________2______google.com', 17, 'Moisturizing cleanser for dry, sensitive skin.'),

(4, 'moisturizer', 'CeraVe', 'Skin Renewing Night Cream', 'https://www.byrdie.com/thmb/XhLR6hDssUSoWxWuAw7_xpRhOQI=/fit-in/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cerave-skin-renewing-night-cream-193e1f3b5bb24fccb8b0ac7f40185046.jpg', true, 'shhttps://www.amazon.com/dp/B00SNPCSUY?tag=byrdie-onsite-prod-20&ascsubtag=4586440%7Cn7516eb2549294aa88c2fdba9832e1b9e20%7CB00SNPCSUY', 16, 'Ultra-hydrating moisturizer for dry skin.'),
(5, 'moisturizer', 'Skinfix ', 'Barrier+ Lightweight Pore-Refining Gel Cream', 'https://pyxis.nymag.com/v1/imgs/9b6/7c6/206e67e37b544a3529a4c61545916784fe-Skinfix-barrier--Skin-Barrier-Niacinamid.2x.rsquare.w600.jpg', true, 'https://click.linksynergy.com/deeplink?id=OHlcvPYhHQM&mid=2417&murl=https%3A%2F%2Fwww.sephora.com%2Fproduct%2Fskinfix-barrier-skin-barrier-lightweight-pore-refining-refillable-gel-cream-with-b-l3-P481739&u1=[st0316awd][cltdauyho00000pfvb74agj0j][225627][][][][3][][][google.com]', 54, 'Lightweight gel moisturizer that supports acne-prone skin.'),
(6, 'moisturizer', 'Aveeno ', 'Calm and Restore Oat Gel Moisturizer', 'https://pyxis.nymag.com/v1/imgs/769/358/2e9e75953846ec25e61ef5f733bf3f93dc.2x.rsquare.w600.jpg', true, 'https://www.amazon.com/dp/B08D9MSGVQ?tag=thestrategistsite-20&ascsubtag=__st0316awd__cltdauyho00000pfvb74agj0j__207205________3______google.com', 16, 'Lightweight gel moisturizer for sensitive skin.'),

(7, 'toner', 'EltaMD ', 'Skin Recovery Essence Toner', 'https://imageio.forbes.com/specials-images/imageserve/63cec7436ef815fbf26e3ae8/EltaMD-Skin-Recovery-Essence-Face-Toner/0x0.jpg?format=jpg&crop=497,497,x0,y0,safe&width=1440', false, 'https://www.amazon.com/EltaMD-Recovery-Facial-Alcohol-Fragrance/dp/B08DD6BFFM//ref=as_li_ss_tl?tag=202266-o8ch94cmji-20&linkCode=ll1', 37, 'Repairs damaged skin barrier, calms skin, protects against free radicals.'),
(8, 'toner', 'E.L.F. ', 'Pure Skin Toner', 'https://imageio.forbes.com/specials-images/imageserve/63ceb43c9f8ca5bf54922d8c/e-l-f--Pure-Skin-Toner--Gentle--Soothing---Exfoliating-Daily-Toner--Helps-Protect--/0x0.jpg?format=jpg&crop=500,492,x0,y0,safe&width=1440', false, 'https://www.amazon.com/l-f-Soothing-Exfoliating-Protect-Maintain/dp/B09XMW76WF/ref=as_li_ss_tl?tag=202266-o8ch94cmji-20&linkCode=ll1', 9, 'Hydrates and improves skin texture for dry, rough skin.'),
(9, 'toner', 'Paula''s Choice', 'Nourishing Milky Toner', 'https://imageio.forbes.com/specials-images/imageserve/63ceca9e55b0a61de16e3ae8/Paula-s-Choice-CALM-Nourishing-Milky-Toner/0x0.jpg?format=jpg&crop=344,437,x0,y0,safe&width=1440', false, 'https://www.amazon.com/Paulas-Choice-Rosacea-Prone-Eczema-Prone-Fragrance-Free/dp/B0BHV1PBLY/ref=as_li_ss_tl?tag=202266-o8ch94cmji-20&linkCode=ll1', 24, 'Hydrates, calms redness, strengthens the skin barrier + microbiome to help prevent future sensitivity.'),

(10, 'exfoliant', 'CeraVe', 'Renewing SA Cleanser', 'https://pyxis.nymag.com/v1/imgs/fc5/f78/2f5b3492dc7719651feca11bc7e53c12f9.2x.rdeep-vertical.w245.jpg', false, 'https://www.amazon.com//dp/B08CQ9T6KN/?tag=thestrategistsite-20&ascsubtag=__st0316awd__cltg7gprl000k0iebohz8fn4v__230979________3______google.com', 14, 'Exfoliates and detoxifies to remove dirt & oil while softening and smoothing skin.'),
(11, 'exfoliant', 'Versed', 'Weekend Glow Daily Brightening Solution', 'https://d3vlxf0ngetfml.cloudfront.net/compressed/uploads/comment-file/525143/651301/cmt_img_92991-1642086003.png', false, 'https://www.amazon.com/Versed-Weekend-Daily-Brightening-Facial/dp/B09NMMHZTJ/ref=as_li_ss_tl?tag=202266-o8ch94cmji-20&linkCode=ll1', 18, ' Exfoliantes and brightens skin, treats uneven skin tone, post-acne marks, and troubled pores.'),
(12, 'exfoliant', 'Paula''s Choice', '2% Skin Perfecting BHA Liquid Exfoliant', 'https://medrockpharmacy.com/wp-content/uploads/2022/02/71vbb0AQIJL._SL1500_.jpg', false, 'https://www.amazon.com/dp/B00949CTQQ?tag=thestrategistsite-20&ascsubtag=__st0316awd__cltg7gprl000k0iebohz8fn4v__128610________3______google.com', 35, 'This gentle exfoliant unclogs pores, diminishes the appearance of wrinkles and improves skin tone and texture'),

(13, 'serum', 'skin 1004', 'Madagascar Centella Asiatica 100 Ampoule', 'https://m.media-amazon.com/images/I/414jDIUrXEL.jpg', false, 'https://skin1004.com/products/skin1004-madagascar-centella-ampoule', 9, 'Suitable for all skin types, this ampoule repairs damaged skin while regulating its moisture and oil balance.'),
(14, 'serum', 'Mario Badescu', 'Facial Spray With Aloe, Adaptogens, And Coconut Water', 'https://incidecoder-content.storage.googleapis.com/1a2dc015-74bf-4428-9473-2ff99aca083b/products/mario-badescu-facial-spray-with-aloe-adaptogens-and-coconut-water/mario-badescu-facial-spray-with-aloe-adaptogens-and-coconut-water_front_photo_300x300@2x.webp', false, 'https://www.amazon.com/Mario-Badescu-Refreshing-Hydrating-Stimulating/dp/B09B8C214X', 9, 'A mist for dehydrated skin to be used to refresh hydration throughout the day.'),
(15, 'serum', 'SkinCeuticals', 'C E Ferulic', 'https://www.byrdie.com/thmb/FdVIfaXzTK9BIKP1J2m8R8cn93w=/fit-in/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/skinceuticals-c-e-ferulic-1-fl-oz-31cb24d0649a4dd8ac9f7cb5da1cfd70.jpg', false, 'https://go.skimresources.com/?id=68756X1591156&isjs=1&jv=15.5.0-stackpath&sref=https%3A%2F%2Fwww.byrdie.com%2Fbest-face-serums-4588133&url=https%3A%2F%2Fwww.dermstore.com%2Fskinceuticals-c-e-ferulic-with-15-l-ascorbic-acid-vitamin-c-serum-30ml%2F11289609.html&xs=1&xtz=240&xuuid=a69826ab846fc83b71ad40203c79316e&xcust=4588133%7Cn9f6a6ec21bf64fa3a50893e5733068f020&xjsf=other_click__auxclick%20%5B2%5D', 182, 'Delivers advanced environmental protection, while reducing the appearance of fine lines and wrinkles.'),

(16, 'retinoid', 'Differin', 'Adapalene Gel 0.1%', 'https://incidecoder-content.storage.googleapis.com/015de897-2a1d-4b31-946b-888a7d32e48b/products/differin-differin-gel/differin-differin-gel_front_photo_300x300@3x.webp', true, 'https://www.amazon.com/Differin-Adapalene-0-1-Acne-Treatment/dp/B07L1PHSY9', 14, 'First Ever FDA Approved Product to Contain A Prescription Strength Acne-Fighting Retinoid'),
(17, 'retinoid', 'Paula''s Choice', 'Clinical 1% Retinol Treatment', 'https://images.wsjcommerce.net/im-73040818?width=300&size=1&pixel_ratio=2', true, 'https://go.skimresources.com/?id=189983X1661674&xs=1&url=https%3A%2F%2Fwww.dermstore.com%2Fpaula-s-choice-clinical-1-retinol-treatment-30ml%2F11174243.html&xcust=WP-WSJC-0000046087&sref=https%3A%2F%2Fwww.wsj.com%2Fbuyside%2Fwellness%2Fbest-retinol-serum-4d10c631', 51, 'Contains 1% retinol that firms skin (improves skin tone and texture), fades brown spots and smooths lines and wrinkles.'),
(18, 'retinoid', 'BIOSSANCE', 'Squalane + Retinol Night Serum', 'https://images.wsjcommerce.net/im-30716044?width=300&size=1&pixel_ratio=2', true, 'https://www.amazon.com/Biossance-Squalane-Encapsulated-Time-Release-Discoloration-Irritation/dp/B0BJLB7J63?&linkCode=ll1&tag=wsj09-20&linkId=e51f6a21b3357337b31aef39c8391105&language=en_US&ref_=as_li_ss_tl&asc_refurl=https://www.wsj.com/buyside/wellness/best-retinol-serum-4d10c631&asc_source=WP-WSJC-0000046087', 54, 'Time-release retinol and retinal, clinically shown to improve the appearance of fine lines and wrinkles, discoloration, and texture, with minimal irritation.'),

(19, 'sunscreen', 'La Roche-Posay', 'Tinted Mineral SPF 50', 'https://incidecoder-content.storage.googleapis.com/d17641c4-419b-4afa-9b5d-a2b767d85c54/products/la-roche-posay-tinted-mineral-spf-50/la-roche-posay-tinted-mineral-spf-50_front_photo_300x300@3x.webp', true, 'https://www.amazon.com/Roche-Posay-Anthelios-Sunscreen-Ultra-Light-Sensitive/dp/B007U54P36', 38, 'A lightweight, 100% mineral face sunscreen with titanium dioxide developed for sensitive skin'),
(20, 'sunscreen', 'CeraVe ', 'AM Facial Moisturizing Lotion with Sunscreen SPF 30', 'https://cdn.thewirecutter.com/wp-content/media/2023/06/facesunscreen-2048px-00999.jpg?auto=webp&quality=75&width=1024&dpr=2', true, 'https://www.nytimes.com/wirecutter/out/link/26174/151877/4/147949?merchant=Amazon', 15, 'Lightweight, non-greasy lotion provides all day hydration. Fragrance free formula is suitable for sensitive skin.'),
(21, 'sunscreen', 'Supergoop!', 'Unseen Sunscreen SPF 40', 'https://cdn.thewirecutter.com/wp-content/media/2023/06/facesunscreen-2048px-00960.jpg?auto=webp&quality=75&width=1024&dpr=2', true, 'https://www.nytimes.com/wirecutter/out/link/30246/189873/4/147946?merchant=Amazon', 38, 'Totally invisible, weightless, scentless sunscreen that does great with makeup.')