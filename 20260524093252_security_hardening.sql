/*
  # Security Hardening Migration

  ## Summary
  Addresses security vulnerabilities in the GreenSatyr.Buzz schema:

  1. booking_requests
     - Forces status = 'pending' on every insert (client cannot override)
     - Restricts event_type to known valid values
     - Adds length constraints on name, email, additional_notes
     - Adds service-role SELECT policy so admins can read bookings

  2. newsletter_subscribers
     - Adds basic email format CHECK constraint

  3. tips
     - Adds CHECK (amount > 0) to prevent zero/negative amounts
     - Replaces open INSERT policy with scoped versions:
       anon tips must have user_id = NULL
       authenticated tips must match auth.uid()
*/

-- ── booking_requests ──────────────────────────────────────────────────────────

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'booking_requests' AND constraint_name = 'booking_requests_status_pending'
  ) THEN
    ALTER TABLE booking_requests
      ADD CONSTRAINT booking_requests_status_pending CHECK (status = 'pending');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'booking_requests' AND constraint_name = 'booking_requests_event_type_valid'
  ) THEN
    ALTER TABLE booking_requests
      ADD CONSTRAINT booking_requests_event_type_valid
      CHECK (event_type IN ('club_set','ritual_set','private_event','after_hours','festival','online_stream'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'booking_requests' AND constraint_name = 'booking_requests_name_length'
  ) THEN
    ALTER TABLE booking_requests
      ADD CONSTRAINT booking_requests_name_length CHECK (length(name) <= 200);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'booking_requests' AND constraint_name = 'booking_requests_email_length'
  ) THEN
    ALTER TABLE booking_requests
      ADD CONSTRAINT booking_requests_email_length CHECK (length(email) <= 254);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'booking_requests' AND constraint_name = 'booking_requests_notes_length'
  ) THEN
    ALTER TABLE booking_requests
      ADD CONSTRAINT booking_requests_notes_length CHECK (length(additional_notes) <= 2000);
  END IF;
END $$;

DROP POLICY IF EXISTS "Service role can read booking requests" ON booking_requests;
CREATE POLICY "Service role can read booking requests"
  ON booking_requests FOR SELECT
  TO service_role
  USING (true);

-- ── newsletter_subscribers ────────────────────────────────────────────────────

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'newsletter_subscribers' AND constraint_name = 'newsletter_email_format'
  ) THEN
    ALTER TABLE newsletter_subscribers
      ADD CONSTRAINT newsletter_email_format
      CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
  END IF;
END $$;

-- ── tips ──────────────────────────────────────────────────────────────────────

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'tips' AND constraint_name = 'tips_amount_positive'
  ) THEN
    ALTER TABLE tips
      ADD CONSTRAINT tips_amount_positive CHECK (amount > 0);
  END IF;
END $$;

DROP POLICY IF EXISTS "Anyone can leave a tip" ON tips;
DROP POLICY IF EXISTS "Anon users can insert tips without user_id" ON tips;
DROP POLICY IF EXISTS "Authenticated users can insert own tips" ON tips;

CREATE POLICY "Anon users can insert tips without user_id"
  ON tips FOR INSERT
  WITH CHECK (user_id IS NULL AND amount > 0);

CREATE POLICY "Authenticated users can insert own tips"
  ON tips FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND amount > 0);
