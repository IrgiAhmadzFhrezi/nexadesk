CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"status" varchar(30) DEFAULT 'OPEN' NOT NULL,
	"priority" varchar(20) DEFAULT 'MEDIUM' NOT NULL,
	"requester_id" integer NOT NULL,
	"department_id" integer NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_requester_id_users_id_fk" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;