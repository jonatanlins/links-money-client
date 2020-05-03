import React from "react";
import { linkTo } from "@storybook/addon-links";
import { action } from "@storybook/addon-actions";

import InstagramHeader from "../src/components/InstagramHeader";
import InstagramRoundButtons from "../src/components/InstagramRoundButtons";
import InstagramMosaic from "../src/components/InstagramMosaic";

export default {
  title: "Instagram Layout",
};

const data = {
  id: "forbesbr",
  name: "Forbes Brasil",
  avatar:
    "https://instagram.frec7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/83591218_548531389343907_1616669563305328640_n.jpg?_nc_ht=instagram.frec7-1.fna.fbcdn.net&_nc_ohc=tgHC_B0Orr4AX-Vx5Uh&oh=31815eba60330c40662e589be05b70a3&oe=5ED3F315",
  description:
    "Empreendedorismo, Finanças, Lifestyle, Tecnologia, Listas e Liderança com a chancela do mais respeitado título de negócios do mundo #forbesbr",
  socialButtons: [
    {
      id: 1,
      label: "Twitter",
      icon: "FaTwitter",
      color: "#1DA1F2",
      gradient: null,
      link: "https://twitter.com/explore",
      layout: null,
      page_id: "forbesbr",
      created_at: "2020-04-29 11:07:39",
      updated_at: "2020-04-29 11:07:39",
    },
    {
      id: 2,
      label: "Twitch",
      icon: "FaTwitch",
      color: "#6441A5",
      gradient: null,
      link: "https://www.twitch.tv/",
      layout: null,
      page_id: "forbesbr",
      created_at: "2020-04-29 11:08:10",
      updated_at: "2020-04-29 11:08:10",
    },
    {
      id: 3,
      label: "Twitch",
      icon: "FaTwitch",
      color: "#6441A5",
      gradient: null,
      link: "https://www.twitch.tv/zigueira",
      layout: null,
      page_id: "forbesbr",
      created_at: "2020-04-29 14:30:58",
      updated_at: "2020-04-29 14:30:58",
    },
  ],
  links: [
    {
      id: 2,
      type: "instagram",
      social_id: "2298069167800898358",
      link: "https://www.forbes.com/#57a1d44e2254",
      page_id: "forbesbr",
      created_at: "2020-04-29 09:25:20",
      updated_at: "2020-04-29 09:25:20",
    },
    {
      id: 8,
      type: "instagram",
      social_id: "2298069167800898358",
      link: "google.com",
      page_id: "forbesbr",
      created_at: "2020-04-29 10:01:02",
      updated_at: "2020-04-29 10:01:02",
    },
  ],
};

export const Header = () => <InstagramHeader />;

export const RoundButtons = () => <InstagramRoundButtons />;

export const Mosaic = () => <InstagramMosaic />;

export const CompleteLayout = () => (
  <>
    <InstagramHeader />
    <InstagramRoundButtons />
    <InstagramMosaic />
  </>
);
