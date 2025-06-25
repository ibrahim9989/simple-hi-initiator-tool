
-- Create table for storing AQ10-style questions for different age groups
CREATE TABLE public.assessment_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  age_group TEXT NOT NULL CHECK (age_group IN ('13-17', '18-30', '31-60', '61-90')),
  theme TEXT NOT NULL,
  scenario_number INTEGER NOT NULL,
  scenario_title TEXT NOT NULL,
  scenario_description TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of answer options
  correct_answer INTEGER NOT NULL, -- Index of correct answer (1-based)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing assessment results
CREATE TABLE public.assessment_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  age_group TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  score_percentage DECIMAL(5,2) NOT NULL,
  responses JSONB NOT NULL, -- Store user's answers
  risk_level TEXT NOT NULL CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables (making them public for now since no auth required)
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Create policies that allow everyone to read questions and insert results
CREATE POLICY "Anyone can view assessment questions" 
  ON public.assessment_questions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert assessment results" 
  ON public.assessment_results 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can view assessment results" 
  ON public.assessment_results 
  FOR SELECT 
  USING (true);

-- Insert sample data for 13-17 age group (Fake Influencer Giveaway Trap theme)
INSERT INTO public.assessment_questions (age_group, theme, scenario_number, scenario_title, scenario_description, options, correct_answer) VALUES
('13-17', 'Fake Influencer Giveaway Trap', 1, 'Late Night Scrolling', 'It''s a regular school night. You''re lying in bed, phone in hand, scrolling through Instagram reels before sleeping. Between meme pages and gaming clips, a random reel catches your eye — it''s from an account that looks like a verified creator you like. The profile looks familiar — it has 100K+ followers, clean thumbnails, and the username matches closely. Their latest reel says: "Private giveaway for new followers! Follow, like this reel, and check DMs 👀🎁"', '["Follow the account, like the reel, and message them first to increase your chances of winning.", "Check their older posts and tagged photos to see if other people have received giveaways, then decide to participate.", "Search for the creator''s official handle in a new tab and compare it with the one you saw"]', 3),

('13-17', 'Fake Influencer Giveaway Trap', 2, 'The DM', 'The next day, during lunch break at school, you check your phone. You''ve got a DM from the same account. It says: "Hey! We noticed you followed and liked the reel. You''re one of the finalists for the giveaway prize — a smartwatch or free gaming gift card. Just fill this short form to confirm 👇 (link attached)" The message ends with: "This is only for selected fans. Keep it private 😉."', '["Click the form link and quickly fill it in before someone else claims the prize — after all, it says \"only for selected fans.\"", "Open the official app or search the influencer''s real profile to see if there''s any mention of this giveaway publicly before clicking anything.", "Forward the DM to a friend and ask, \"Hey, did you get this too?\" before deciding whether to fill the form."]', 2),

('13-17', 'Romance Scam', 1, 'The DM Request', 'It''s a boring weekday evening. You''re scrolling through Instagram, liking memes and reels, when you get a follow request from someone your age. Their profile is private but has a cool name and a profile picture that looks like someone from school or a friend-of-a-friend. They message you: "hey! saw u on my explore page lol. u seem cool. u play valorant too?" You check their profile again — they have posts with a few comments, seem active, and are following some people you know.', '["You follow them back and reply casually: \"yeah i play sometimes. u from [your city]?\"", "You check mutual followers and decide to message a friend to ask: \"hey do u know this person? they followed me and i think they go to [school name]?\"", "You search their username on Google or reverse image search their profile pic to check if it appears on other accounts."]', 3);

-- Insert sample data for other age groups (abbreviated for space)
INSERT INTO public.assessment_questions (age_group, theme, scenario_number, scenario_title, scenario_description, options, correct_answer) VALUES
('18-30', 'Cheap Fashion & Accessory Scam', 1, 'The Trendy Find', 'You''re scrolling through Instagram during lunch when you spot an ad that feels perfectly targeted: ✨ "Flat ₹299 Sale – Oversized Graphic Tees, Beaded Rings, Korean Bags – All under ₹399. Free Shipping. Cash on Delivery Available." ✨ The page (@urban_wear_central) looks stylish and aesthetic. 35K followers, lots of reels, and comments like "Just ordered!", "Can''t wait to receive mine 😍". You tap the link in bio — it opens a clean-looking website: urbanwear-sale.shop', '["You quickly add a couple of items to your cart and proceed to checkout — deals like this don''t last long.", "You scroll down the website, check their \"About Us\" page and see a Gmail contact. They claim to be based in Mumbai. You feel more confident and proceed to pay.", "You check the brand''s tagged section on Instagram to see if actual customers have posted photos, and then search the website name along with phrases like \"delivery experience\" or \"real reviews\" to see what others are saying."]', 3),

('31-60', 'Courier Scam', 1, 'Trouble With an Online Order', 'It''s Sunday evening. You ordered a product from an e-commerce app last week. The delivery was due today, but the tracking shows "Delivered" — and you haven''t received anything. Frustrated, you Google "Flipkart customer care number" and call the first number that appears. The person on the line says: "Yes sir, we''ve received many such complaints. We can help right now — just need your order ID and a small account confirmation to release a refund."', '["Share the order ID and account number — he sounds professional.", "Ask if he can call back after dinner when you''re free.", "End the call and check the app or official website for the support number"]', 3),

('61-90', 'Banking Missed Call', 1, 'The WhatsApp Forward', 'You receive a WhatsApp message from your niece: "Check your bank balance instantly! Just give a missed call to 92231 145XX. SBI has launched this for seniors. No app needed — Papa just tried it!" You''re curious and give the missed call. Later that evening, you receive a call: "Hello, we noticed a missed call from your number. We''re from SBI Balance Assist. Just need to verify your account number and IFSC code to set this up."', '["You share the details — your niece already tried it", "You ask for their ID and proceed", "You thank them and say you''ll contact SBI directly to confirm"]', 3);
