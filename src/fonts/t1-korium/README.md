# T1-Korium Font

Add your T1-Korium `.otf` font files to this directory.

## Expected Files

The CSS in `src/styles.css` is configured to look for:

- `T1-Korium-Regular.otf` (for normal weight)
- `T1-Korium-Bold.otf` (for bold weight)

## How to Add

1. Place your `.otf` files in this folder
2. Make sure the filenames match the ones in `src/styles.css`
3. If your files have different names, update the `@font-face` declarations in `src/styles.css`

## Example @font-face Update

If your font files are named differently, update the CSS like this:

```css
@font-face {
  font-family: 'T1-Korium';
  src: url('./fonts/t1-korium/YOUR-FILENAME.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Adding More Weights

If you have additional weights (Light, Medium, etc.), add more `@font-face` declarations:

```css
@font-face {
  font-family: 'T1-Korium';
  src: url('./fonts/t1-korium/T1-Korium-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'T1-Korium';
  src: url('./fonts/t1-korium/T1-Korium-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```
