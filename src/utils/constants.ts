export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const CATEGORY_TO_CLASS: Record<string, string> = {
  'другое': 'card__category_other',
  'софт-скил': 'card__category_soft',
  'дополнительное': 'card__category_additional',
  'кнопка': 'card__category_button',
  'хард-скил': 'card__category_hard',
};
