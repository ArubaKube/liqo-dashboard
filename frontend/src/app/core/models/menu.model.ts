export interface MenuItem {
  group: string;
  selected?: boolean;
  active?: boolean;
  items: Array<SubMenuItem>;
  route?: string | null;
}

export interface SubMenuItem {
  icon?: string;
  label: string;
  route?: string | null;
  onClick$?: () => void
  expanded?: boolean;
  active?: boolean;
  children?: Array<SubMenuItem>;
}
