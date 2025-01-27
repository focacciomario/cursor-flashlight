import css from 'minify-css.macro';

const sheet = document.head.appendChild(document.createElement('style'))
  .sheet as CSSStyleSheet;

let ruleIndices: number[] = [];

export const insertNeededRules = ({ size }: { size: string }) => {
  ruleIndices.push(
    sheet.insertRule(css`
    @media (hover: hover) {
      :root {
        --flashlightCursorX: 50vw;
        --flashlightCursorY: 50vh;
        --flashlightBg: radial-gradient(
          circle ${size} at var(--cursorX) var(--cursorY),
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,.5) 80%,
          rgba(0,0,0,.97) 100%
        );
      }
    }`),
  );

  ruleIndices.push(
    sheet.insertRule(css`
    @media (hover: hover) {
      :root:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        pointer-events: none;
        background: var(--flashlightBg);
      }
    }`),
  );
};

export const cleanUpRules = () => {
  ruleIndices.forEach((index) => {
    sheet.deleteRule(index);
  });

  ruleIndices = [];
};
