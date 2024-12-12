-- Create a new database for anime and ratings tables.
CREATE DATABASE ojedaAnime;
USE ojedaAnime;

-- Create Anime table to store anime information.
CREATE TABLE Anime (
  id INTEGER AUTO_INCREMENT, -- Unique ID for each anime.
  name VARCHAR(200),         -- Name of the anime.
  genre VARCHAR(20),         -- Genre of the anime (e.g., Shounen, Seinen).
  seasons INTEGER,           -- Number of seasons the anime has.
  year_released INTEGER,     -- Year the anime was first released.
  year_finished INTEGER,     -- Year the anime finished (NULL if ongoing).
  PRIMARY KEY(id)            -- Primary key for the Anime table.
);

-- Insert records for popular anime into the Anime table. Used ChatGPT to populate some of these to save time.
insert into Anime (name,genre,seasons,year_released,year_finished) values 
('Hunter X Hunter (2011)', 'Shounen', 6, 2011, 2014),
("JoJo''s Bizarre Adventure", 'Shounen', 5, 2012, 2021),
('Tokyo Ghoul', 'Seinen', 4, 2014, 2018),
('Food Wars', 'Shounen', 5, 2015, 2020),
('Magi: The Labyrinth of Magic', 'Fantasy', 2, 2012, 2014),
('Seraph of the End', 'Dark Fantasy', 2, 2015, 2015),
('Attack on Titan', 'Shounen', 4, 2013, 2023),
('One Punch Man', 'Seinen', 2, 2015, 2019),
('Steins;Gate', 'Sci-Fi', 1, 2011, 2011),
('My Hero Academia', 'Shounen', 6, 2016, NULL)
('Death Note', 'Psychological', 1, 2006, 2007),
('Demon Slayer', 'Shounen', 4, 2019, NULL),
('Naruto', 'Shounen', 5, 2002, 2007),
('Bleach', 'Shounen', 16, 2004, 2012),
('Sword Art Online', 'Isekai', 4, 2012, NULL),
('Dragon Ball Z', 'Shounen', 9, 1989, 1996),
('Re:Zero - Starting Life in Another World', 'Isekai', 2, 2016, NULL),
('Fruits Basket', 'Shoujo', 3, 2019, 2021),
('Ouran High School Host Club', 'Shoujo', 1, 2006, 2006),
('Sailor Moon', 'Shoujo', 5, 1992, 1997),
('Cardcaptor Sakura', 'Shoujo', 3, 1998, 2000),
('Nana', 'Shoujo', 1, 2006, 2007),
('Lovely★Complex', 'Shoujo', 1, 2007, 2007),
('Kaichou wa Maid-sama!', 'Shoujo', 1, 2010, 2010),
('Skip Beat!', 'Shoujo', 1, 2008, 2009),
('Peach Girl', 'Shoujo', 1, 2005, 2005),
('Yona of the Dawn', 'Shoujo', 1, 2014, 2015),
('Revolutionary Girl Utena', 'Shoujo', 1, 1997, 1997),
('Boys Over Flowers', 'Shoujo', 1, 1996, 1997),
('Kimi ni Todoke', 'Shoujo', 2, 2009, 2011),
('Aoharu x Kikanjuu', 'Shoujo', 1, 2015, 2015),
('Itazura na Kiss', 'Shoujo', 1, 2008, 2008),
('Death Note', 'Psychological', 1, 2006, 2007),
('Monster', 'Psychological', 1, 2004, 2005),
('Psycho-Pass', 'Psychological', 3, 2012, 2019),
('Paranoia Agent', 'Psychological', 1, 2004, 2004),
('Erased', 'Psychological', 1, 2016, 2016),
('The Promised Neverland', 'Psychological', 2, 2019, 2021),
('Re:Zero - Starting Life in Another World', 'Psychological', 2, 2016, NULL),
('Serial Experiments Lain', 'Psychological', 1, 1998, 1998),
('Terror in Resonance', 'Psychological', 1, 2014, 2014),
('Zankyou no Terror', 'Psychological', 1, 2014, 2014),
('Elfen Lied', 'Psychological', 1, 2004, 2004),
('Kaiji: Ultimate Survivor', 'Psychological', 2, 2007, 2011),
('The Tatami Galaxy', 'Psychological', 1, 2010, 2010),
('Perfect Blue', 'Psychological', 1, 1998, 1998),
('Texhnolyze', 'Psychological', 1, 2003, 2003);


-- Create Ratings table to store ratings and comments for anime.
CREATE TABLE Ratings (
  id INTEGER AUTO_INCREMENT, -- Unique ID for each rating.
  anime_id INTEGER,          -- ID of the anime being rated (foreign key).
  rating DECIMAL(2,1),       -- Rating score (0.0 to 5.0).
  comment VARCHAR(1000),     -- User comment about the anime.
  user_name VARCHAR(30),     -- Name of the user providing the rating.
  PRIMARY KEY(id),           -- Primary key for the Ratings table.
  FOREIGN KEY (anime_id) REFERENCES Anime(id) -- Foreign key linking to the Anime table.
);

-- Insert ratings and comments for selected anime. Used Chatgpt to populate some of these to save time

-- Hunter X Hunter
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(1, 4.5, 'An exceptional adventure with a fantastic story and character development.', 'user123'),
(1, 4.0, 'A thrilling mix of strategy and action that keeps you hooked.', 'hunterFan');

-- JoJo's Bizarre Adventure
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(2, 4.5, 'A unique, stylish, and iconic shounen series with amazing battles.', 'jojoLover'),
(2, 4.0, 'The creativity of each story arc is unmatched in anime history.', 'bizarreAdventures');

-- Tokyo Ghoul
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(3, 4.0, 'A dark, thrilling, and psychological experience.', 'darkAnimeFan'),
(3, 3.5, 'The story explores morality, survival, and transformation.', 'ghoulWatcher'),
(3, 2.0, 'The pacing was too slow, and the story lacked depth.', 'critic123');

-- Food Wars
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(4, 4.0, 'A mix of comedy, drama, and culinary mastery makes this a fun watch.', 'foodie101'),
(4, 4.5, 'The creativity in the cooking competitions is truly entertaining.', 'chefFan'),
(4, 2.5, 'Too much fan service and not enough focus on the plot.', 'plotFocused');

-- Magi: The Labyrinth of Magic
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(5, 3.5, 'A magical adventure with a mix of exploration and fantasy.', 'magiAdventurer'),
(5, 4.0, 'A unique take on Arabian Nights with great character moments.', 'nightTales'),
(5, 2.0, 'The story felt repetitive and uninspired at times.', 'boredViewer');

-- Seraph of the End
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(6, 3.5, 'A post-apocalyptic vampire story with action-packed scenes.', 'vampireHunter'),
(6, 4.0, 'Dark, exciting, and well-paced storytelling.', 'darkFantasyFan'),
(6, 1.5, 'Poor execution and lack of emotional connection.', 'disappointedViewer');

-- Attack on Titan
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(7, 5.0, 'An intense, gripping story with incredible animation and depth.', 'titanFan'),
(7, 4.5, 'One of the most epic battle series with amazing world-building.', 'epicWatcher');

-- One Punch Man
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(8, 4.0, 'A fresh twist on the superhero genre with excellent comedy elements.', 'heroFan'),
(8, 3.5, 'The concept of a hero that can defeat anyone in one punch is brilliantly executed.', 'comedyLover'),
(8, 2.0, 'The story felt repetitive after a while, and the humor wore thin.', 'boredHero');

-- Steins;Gate
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(9, 4.5, 'An intellectual masterpiece combining time travel and suspense.', 'timeTravelFan'),
(9, 4.0, 'A slow build-up with rewarding storytelling and a great cast.', 'sciFiLover');

-- My Hero Academia
INSERT INTO Ratings (anime_id, rating, comment, user_name) VALUES
(10, 4.0, 'A modern take on superhero themes with great action and character arcs.', 'heroAcademiaFan'),
(10, 4.5, 'The balance of training, action, and drama is well done in this shounen series.', 'studentOfHeroes'),
(10, 2.0, 'The story feels overly repetitive with little new development at times.', 'repetitionHater');
