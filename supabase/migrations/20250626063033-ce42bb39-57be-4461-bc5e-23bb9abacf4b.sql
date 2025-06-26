
-- First, let's clear the existing assessment_questions table and recreate it with the proper structure
DELETE FROM assessment_questions;

-- Update the table structure to better organize by scam themes
ALTER TABLE assessment_questions 
ADD COLUMN IF NOT EXISTS scam_number INTEGER NOT NULL DEFAULT 1;

-- Add check constraint to ensure scam_number is between 1 and 3
ALTER TABLE assessment_questions 
ADD CONSTRAINT check_scam_number CHECK (scam_number >= 1 AND scam_number <= 3);

-- Insert all the scenarios for age group 13-17
-- SCAM 1: Fake Influencer Giveaway Trap
INSERT INTO assessment_questions (age_group, scam_number, theme, scenario_number, scenario_title, scenario_description, options, correct_answer) VALUES
('13-17', 1, 'Fake Influencer Giveaway Trap', 1, 'Late Night Scrolling', 'It''s a regular school night. You''re lying in bed, phone in hand, scrolling through Instagram reels before sleeping. Between meme pages and gaming clips, a random reel catches your eye — it''s from an account that looks like a verified creator you like. The profile looks familiar — it has 100K+ followers, clean thumbnails, and the username matches closely.

Their latest reel says: "Private giveaway for new followers! Follow, like this reel, and check DMs 👀🎁"', 
'["Follow the account, like the reel, and message them first to increase your chances of winning.", "Check their older posts and tagged photos to see if other people have received giveaways, then decide to participate.", "Search for the creator''s official handle in a new tab and compare it with the one you saw"]', 3),

('13-17', 1, 'Fake Influencer Giveaway Trap', 2, 'The DM', 'The next day, during lunch break at school, you check your phone. You''ve got a DM from the same account. It says:

"Hey! We noticed you followed and liked the reel. You''re one of the finalists for the giveaway prize — a smartwatch or free gaming gift card. Just fill this short form to confirm 👇 (link attached)"

The message ends with: "This is only for selected fans. Keep it private 😉."', 
'["Click the form link and quickly fill it in before someone else claims the prize — after all, it says \"only for selected fans.\"", "Open the official app or search the influencer''s real profile to see if there''s any mention of this giveaway publicly before clicking anything.", "Forward the DM to a friend and ask, \"Hey, did you get this too?\" before deciding whether to fill the form."]', 2),

('13-17', 1, 'Fake Influencer Giveaway Trap', 3, 'The Form', 'Curious, you open the link during the ride home. It looks like a regular Google Form. It asks for:
- Your Instagram username
- Your phone number  
- Favorite game or interest
- "To prove you''re human" — your Instagram password (optional, but recommended for faster verification)

You feel unsure, but the form says 3 out of 5 winners already claimed their prizes. What do you do?', 
'["Close the form, and search whether the influencer has posted this giveaway on their real Instagram or YouTube channel.", "Enter all details except your password — just to stay safe, but still reserve your prize spot.", "Fill in fake info — like a dummy username and a random number — just to \"test\" if it''s real or not."]', 1),

('13-17', 1, 'Fake Influencer Giveaway Trap', 4, 'The Email', 'That evening, you get an email (to the same account you gave in the form). It says:

"Congratulations! You''ve won the 2nd prize. To receive your digital gift card, pay a ₹99 confirmation fee so we can verify you''re serious and avoid spam entries."

The email looks neat, with a fake-but-believable brand logo, a timer counting down 10 minutes, and a UPI link to pay.', 
'["Pay the ₹99 using the UPI link — it''s a small amount and you don''t want to miss your prize with only 10 minutes left.", "Reply to the email and ask if you can pay later or through another method, just to \"confirm if they respond.\"", "Ignore the email and check the influencer''s real YouTube/Instagram account to confirm if any such giveaway or prize exists officially."]', 3);

-- SCAM 2: Romance Scam
INSERT INTO assessment_questions (age_group, scam_number, theme, scenario_number, scenario_title, scenario_description, options, correct_answer) VALUES
('13-17', 2, 'Romance Scam', 1, 'The DM Request', 'It''s a boring weekday evening. You''re scrolling through Instagram, liking memes and reels, when you get a follow request from someone your age. Their profile is private but has a cool name and a profile picture that looks like someone from school or a friend-of-a-friend.

They message you: "hey! saw u on my explore page lol. u seem cool. u play valorant too?"

You check their profile again — they have posts with a few comments, seem active, and are following some people you know.', 
'["You follow them back and reply casually: \"yeah i play sometimes. u from [your city]?\"", "You check mutual followers and decide to message a friend to ask: \"hey do u know this person? they followed me and i think they go to [school name]?\"", "You search their username on Google or reverse image search their profile pic to check if it appears on other accounts."]', 3),

('13-17', 2, 'Romance Scam', 2, 'The Rapid Connection', 'Over the next few days, you start chatting casually. They''re funny, talk about school pressure, fav games, annoying teachers — it all feels natural. You joke about sending voice notes, and they start calling you their "online bestie."

Then one night, they send: "lowkey ur energy >>> i wish u lived in my city. id totally hang out fr."

They also ask for your Snapchat or Discord to "talk properly."', 
'["You slow down and ask, \"Hey just wondering — do we have any mutuals IRL? Like how did u find my profile again?\"", "You give them your Snapchat, thinking it''s safer than sharing your phone number and easier to block if anything feels weird.", "You reply, \"haha same, you seem cool too. what city u from?\" and keep the convo going on Instagram."]', 1),

('13-17', 2, 'Romance Scam', 3, 'The Allegation Starts', 'You''ve been casually chatting for a couple of weeks — selfies, voice notes, inside jokes. It felt harmless.

Then suddenly, they text: "hey... my cousin saw our chats. they''re saying u crossed a line."

Followed quickly by: "they think i should file a cyber complaint. i told them u didn''t mean anything wrong, but they''re serious."

A few minutes later: "they''re talking about going legal unless we sort it quietly. i''m honestly scared for both of us."', 
'["You reply: \"pls don''t file anything. tell me what to do.\"", "You ask: \"how much do they want? i can pay something.\"", "You take screenshots, log out, and talk to a trusted adult or report the account."]', 3),

('13-17', 2, 'Romance Scam', 4, 'The Fake Legal Threat', 'Later that day, you get a WhatsApp from an unknown number: "This is Cyber Cell. A complaint has been filed under IT Act 66E & 67A. You may face up to 4 years."

Then a follow-up: "You can settle privately for ₹50,000 today. UPI accepted."

Your "friend" messages too: "pls just do it... they said they''ll drop it after payment."', 
'["You ask for their UPI and say you''ll try to pay.", "You block both numbers, save chats, and report it to cybercrime.gov.in.", "You say: \"can i pay less today and rest later?\""]', 2);

-- SCAM 3: Fake Job Offers
INSERT INTO assessment_questions (age_group, scam_number, theme, scenario_number, scenario_title, scenario_description, options, correct_answer) VALUES
('13-17', 3, 'Scam Job Offers thru social media', 1, 'The DM Offer', 'It''s Saturday evening. You''re scrolling through reels when you get a DM from a page named @TeensPaidDaily.

It says: "Hey! We saw your profile & you''re eligible for a simple part-time Insta-based job 😄 Earn ₹500–₹800 per day just liking videos & sharing promo content. No experience needed. DM us ''I''m interested'' to start."

You notice some familiar accounts already follow them, and their page has 20K followers.', 
'["DM \"I''m interested\" and ask, \"Is this real or a scam?\" — just to check.", "Follow the page and check their stories and highlights to \"confirm\" if people are actually getting paid.", "Google the page name or reverse image search their profile photo or testimonials."]', 3),

('13-17', 3, 'Scam Job Offers thru social media', 2, 'Quick Application', 'You DM them. They reply instantly: "Great! To register you, we just need:
1. Your full name
2. Phone number  
3. City
4. Instagram ID
5. UPI ID (to send payments)"

They say: "No money needed — it''s a free job."', 
'["Don''t respond. Instead, report the account and talk to a trusted adult about it.", "Share all details except your UPI — you want to \"see if it works\" before trusting with payment info.", "Say you''ll ask your parents first and see how they react."]', 1),

('13-17', 3, 'Scam Job Offers thru social media', 3, 'The Payment Hook', 'Later, they say: "Congrats! Your Insta promo ID is ready. You''ll get paid ₹700 per day. We just need to link your ID to our system — pay ₹49 one-time linking fee. It''s 100% refundable with your first payout."

They send a UPI QR code and say, "You''ll be paid by tonight!"', 
'["Pay the ₹49 — it''s small, and you''ve seen people post proof of payment on their page.", "Stop the conversation and look up \"Instagram job scams\" or search if their UPI is blacklisted.", "Ask them to deduct ₹49 from your first payout."]', 2),

('13-17', 3, 'Scam Job Offers thru social media', 4, 'The Vanish or Chain Trap', 'You send the money. But no response. After a day, they finally reply: "Your payment is stuck. To resolve, send ₹99 more. Or refer 2 friends and earn double next week!"

You now feel confused — should you trust them or cut your losses?', 
'["Pay the ₹99 — it''s frustrating but you''ve already come this far and want to recover what you started.", "Decide to refer friends instead — it''s free, and they said you''ll get double.", "Realize it''s a scam, block the account, report to Instagram, and warn others who follow them."]', 3);

-- Update assessment_results table to store scam-wise results
ALTER TABLE assessment_results 
ADD COLUMN IF NOT EXISTS scam_results JSONB DEFAULT '[]'::jsonb;
