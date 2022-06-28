export type Launch = {
  id: string | number;
  name: string;
  date_local: string;
  upcoming: boolean;
  details: string;
  links: {
    patch: {
      small: string;
      large: string;
    };
  };
};
