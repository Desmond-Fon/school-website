import {
  Maybe,
  NavigationItem,
  UploadFileEntityResponse,
} from 'generated/graphql';
import { PartialDeep } from 'type-fest';
import { Header } from 'components/navigation/Header';
import Link from 'next/link';
import { Popover } from '@headlessui/react';

function DesktopMenuPopoverPanel({ items }: { items: NavigationItem[] }) {
  return (
    <div>
    <Popover.Panel
      css={{
        inset: "72px 0 auto 0px",
        position: 'absolute',
        margin: "auto",
        width: "75%",
        borderRadius: "8px",
        backgroundColor: "#ffffff87",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 15%), 0 4px 6px -2px rgb(0 0 0 / 10%)",
        '&:before': {
          content: '""',
          zIndex: -1,
          width: "100%",
          height: "100%",
          position: "absolute",
          backdropFilter: "blur(48px)",
        }
      }}
    >
      <ul css={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", maxWidth: "1280px", padding: "32px"}}>
        {items.map((item) => (
          <li key={item.uiRouterKey} css={{listStyleType: "none", color: "rgb(0 0 0 / 0.75)"}}>
            <Link href={item.uiRouterKey}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Popover.Panel>
    </div>
  );
}

function DesktopMenuLink({ item }: { item: NavigationItem }) {
  return (
    <li>
      <Link href={item.path} passHref>
        <Popover>
          <Popover.Button>
            <a>{item.title}</a>
          </Popover.Button>
          <DesktopMenuPopoverPanel items={item.items} />
        </Popover>
      </Link>
    </li>
  );
}

function DesktopMenuLinks({
  navigationRes,
}: {
  navigationRes: Array<Maybe<NavigationItem>>;
}) {
  return (
    <ul css={{ display: 'flex', listStyleType: 'none', gap: '24px', margin: "auto"}}>
      {navigationRes.map((item) => (
        <DesktopMenuLink item={item} key={item.uiRouterKey} />
      ))}
    </ul>
  );
}

export function DesktopMenu({
  header,
  navigationRes,
}: {
  navigationRes: Array<Maybe<NavigationItem>>;
  header: PartialDeep<UploadFileEntityResponse>;
}) {
  return (
    <div
      css={{
        maxWidth: '1280px',
        margin: 'auto',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Header header={header} />
      <DesktopMenuLinks navigationRes={navigationRes} />
    </div>
  );
}
