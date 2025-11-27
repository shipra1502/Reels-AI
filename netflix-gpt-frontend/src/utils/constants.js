export const LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR =
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

export const NETFLIX_BACKGROUND =
  "https://assets.nflxext.com/ffe/siteui/vlv3/25f808aa-cecb-4753-8541-9a79f40c18ae/web/AE-en-20251006-TRIFECTA-perspective_7264094a-f4b4-4b0a-8484-acaec98722c7_large.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_MOVIE_API_KEY}`,
  },
};

export const IMAGE_CDN_URL = "https://image.tmdb.org/t/p/w780";
