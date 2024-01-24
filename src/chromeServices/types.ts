import { Platform } from "../utils/content";

export type DOMMessage = {
  type: "GET_DOM";
  platform?: Platform;
};

export type DOMMessageResponse = {
  badgeTitle: string;
  badgeDescription: string;
};
