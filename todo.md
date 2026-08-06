# Admin and repository-portable card update

- [x] Read the full-stack web development guidance and confirm whether persistent storage is required.
- [x] Inventory the extracted business-card image URLs and determine which assets can be copied into the repository safely.
- [x] Choose the least fragile data model for public cards and admin-created cards.
- [x] Add the admin route, password gate, card creation form, image handling, and validation.
- [x] Preserve the public directory filters and render all existing cards from repository-local assets.
- [x] Run type checking, production build, and representative public/admin verification.
- [x] Save a checkpoint and deliver the updated project.
- [x] Resolve the remaining failed legacy card image download; all 283 existing records now use repository-local image paths.
- [x] Document the repository portability tradeoff: the requested Git-friendly card bundle is kept under `client/public/business-cards`; managed storage remains the recommended path for future admin uploads.
- [x] Fix the Meet the local index section layout and visibility.
- [x] Redesign card visualization for clearer hierarchy, consistent image treatment, and better scanability.
- [x] Redesign filtering controls with clear active states, result counts, reset behavior, and responsive layout.
- [x] Verify the repaired directory on desktop and mobile, then save a new checkpoint.
