type Link = {
  label: string;
  href: string;
};

export type Links = {
  heading: string;
  links: Link[];
}[];

export type LinksProps = {
  links: {
    heading: string;
    links: Link[];
  }[];
};
