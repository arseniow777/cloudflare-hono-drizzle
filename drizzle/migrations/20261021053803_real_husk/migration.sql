CREATE TABLE `weddings` (
	`id` text PRIMARY KEY,
	`slug` text NOT NULL,
	`shopee_order_id` text NOT NULL,
	`contact_phone` text NOT NULL UNIQUE,
	`bride_name` text NOT NULL,
	`groom_name` text NOT NULL,
	`bride_father` text NOT NULL,
	`bride_mother` text NOT NULL,
	`groom_father` text NOT NULL,
	`groom_mother` text NOT NULL,
	`bride_instagram` text NOT NULL,
	`groom_instagram` text NOT NULL,
	`song_title` text NOT NULL,
	`song_url` text NOT NULL,
	`street` text NOT NULL,
	`village` text NOT NULL,
	`district` text NOT NULL,
	`city` text NOT NULL,
	`province` text NOT NULL,
	`quote` text DEFAULT 'Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
	`wedding_date` integer NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`timezone` text NOT NULL,
	`gmaps_url` text,
	`youtube_url` text,
	`calendar_url` text,
	`dresscode` text,
	`status` text,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `guests` (
	`id` text PRIMARY KEY,
	`wedding_id` integer NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`guest_count` integer DEFAULT 1 NOT NULL,
	`message` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `fk_guests_wedding_id_weddings_id_fk` FOREIGN KEY (`wedding_id`) REFERENCES `weddings`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY,
	`shopee_order_id` text NOT NULL UNIQUE,
	`form_token` text NOT NULL UNIQUE,
	`form_expires_at` integer NOT NULL,
	`user_id` integer,
	`status` text DEFAULT 'awaiting_form' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `fk_orders_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
ALTER TABLE `users_table` RENAME TO `users`;--> statement-breakpoint
ALTER TABLE `users` ADD `username` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password_hash` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` integer DEFAULT (unixepoch()) NOT NULL;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY,
	`username` text NOT NULL UNIQUE,
	`name` text DEFAULT 'Admin' NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`(`id`, `name`) SELECT `id`, `name` FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX IF EXISTS `users_table_email_unique`;--> statement-breakpoint
CREATE INDEX `guests_wedding_idx` ON `guests` (`wedding_id`);--> statement-breakpoint
CREATE INDEX `orders_user_idx` ON `orders` (`user_id`);--> statement-breakpoint
DROP TABLE `stuff_table`;