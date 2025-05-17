# Supabase Schema

## Storage Buckets
- **previews**: public read, admin write – preview videos
- **premium**: private read, admin write – premium videos

## Tables
| Table      | Columns                       | Notes                       |
|------------|------------------------------|-----------------------------|
| videos     | id, title, bucket, file_path, created_at | metadata for previews & premium |
| likes      | id, video_id, user_id, created_at        | user likes (anonymous or auth)  |
| comments   | id, video_id, user_id, text, created_at  | user comments                |
