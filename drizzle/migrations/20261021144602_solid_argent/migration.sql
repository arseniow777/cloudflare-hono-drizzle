ALTER TABLE `weddings` ADD `order_id` text NOT NULL REFERENCES orders(id) ON DELETE CASCADE;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_weddings` (
	`id` text PRIMARY KEY,
	`slug` text NOT NULL UNIQUE,
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
	`status` text DEFAULT 'draft',
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`order_id` text NOT NULL UNIQUE,
	CONSTRAINT `fk_weddings_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_weddings`(`id`, `slug`, `contact_phone`, `bride_name`, `groom_name`, `bride_father`, `bride_mother`, `groom_father`, `groom_mother`, `bride_instagram`, `groom_instagram`, `song_title`, `song_url`, `street`, `village`, `district`, `city`, `province`, `quote`, `wedding_date`, `start_time`, `end_time`, `timezone`, `gmaps_url`, `youtube_url`, `calendar_url`, `dresscode`, `status`, `updated_at`, `created_at`) SELECT `id`, `slug`, `contact_phone`, `bride_name`, `groom_name`, `bride_father`, `bride_mother`, `groom_father`, `groom_mother`, `bride_instagram`, `groom_instagram`, `song_title`, `song_url`, `street`, `village`, `district`, `city`, `province`, `quote`, `wedding_date`, `start_time`, `end_time`, `timezone`, `gmaps_url`, `youtube_url`, `calendar_url`, `dresscode`, `status`, `updated_at`, `created_at` FROM `weddings`;--> statement-breakpoint
DROP TABLE `weddings`;--> statement-breakpoint
ALTER TABLE `__new_weddings` RENAME TO `weddings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_guests` (
	`id` text PRIMARY KEY,
	`wedding_id` text NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`guest_count` integer DEFAULT 1 NOT NULL,
	`message` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `fk_guests_wedding_id_weddings_id_fk` FOREIGN KEY (`wedding_id`) REFERENCES `weddings`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_guests`(`id`, `wedding_id`, `name`, `phone`, `status`, `guest_count`, `message`, `created_at`) SELECT `id`, `wedding_id`, `name`, `phone`, `status`, `guest_count`, `message`, `created_at` FROM `guests`;--> statement-breakpoint
DROP TABLE `guests`;--> statement-breakpoint
ALTER TABLE `__new_guests` RENAME TO `guests`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_orders` (
	`id` text PRIMARY KEY,
	`shopee_order_id` text NOT NULL UNIQUE,
	`form_token` text NOT NULL UNIQUE,
	`form_expires_at` integer NOT NULL,
	`user_id` text,
	`status` text DEFAULT 'awaiting_form' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `fk_orders_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
INSERT INTO `__new_orders`(`id`, `shopee_order_id`, `form_token`, `form_expires_at`, `user_id`, `status`, `created_at`) SELECT `id`, `shopee_order_id`, `form_token`, `form_expires_at`, `user_id`, `status`, `created_at` FROM `orders`;--> statement-breakpoint
DROP TABLE `orders`;--> statement-breakpoint
ALTER TABLE `__new_orders` RENAME TO `orders`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `wedding_order_idx` ON `weddings` (`order_id`);--> statement-breakpoint
CREATE INDEX `guests_wedding_idx` ON `guests` (`wedding_id`);--> statement-breakpoint
CREATE INDEX `orders_user_idx` ON `orders` (`user_id`);