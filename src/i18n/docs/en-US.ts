export const docsEnUS = {
  guideItems: [
    {
      id: 'introduction',
      label: 'Introduction'
    },
    {
      id: 'installation',
      label: 'Installation'
    },
    {
      id: 'quick-start',
      label: 'Quick Start'
    },
    {
      id: 'init-guide',
      label: 'Initialization Guide'
    },
    {
      id: 'font-echo-guide',
      label: 'Multi-Font & Restore'
    },
    {
      id: 'data-persistence',
      label: 'Save & Restore'
    },
    {
      id: 'editing-guide',
      label: 'Editing & FAQ'
    }
  ],
  apiItems: [
    {
      id: 'api-htmltext',
      label: 'HtmlText'
    },
    {
      id: 'api-manage',
      label: 'HtmlTextManage'
    },
    {
      id: 'api-format-painter',
      label: 'Format Painter'
    },
    {
      id: 'api-sethtml',
      label: 'setHTMLText'
    },
    {
      id: 'api-experimental',
      label: 'Local & Global Styles'
    },
    {
      id: 'api-license',
      label: 'License'
    }
  ],
  moreItems: [
    {
      id: 'changelog',
      label: 'Changelog'
    }
  ],
  features: [
    {
      icon: '🎨',
      title: 'Rich Text Editing',
      desc: 'Built on Quill 2.0 with full rich-text editing — double-click a node to enter inline editing'
    },
    {
      icon: '📐',
      title: 'Text Styles',
      desc: 'Full control over font, size, color, alignment, line height, letter spacing, shadow, stroke, and more'
    },
    {
      icon: '📝',
      title: 'Formatting Tools',
      desc: 'Bold, italic, underline, strikethrough, superscript/subscript, and case conversion'
    },
    {
      icon: '🧹',
      title: 'Format Painter',
      desc: 'Copy selection or object text formatting, then apply it to another selection or text node'
    },
    {
      icon: '📋',
      title: 'List Support',
      desc: 'Ordered and unordered lists'
    },
    {
      icon: '🔤',
      title: 'Custom & Multi-Font',
      desc: 'Base64 font injection, multiple @font-face rules, and per-selection font changes in inline editing'
    },
    {
      icon: '🔡',
      title: 'Local Styles',
      desc: 'Local font size (experimental), local font family, local letter spacing — layered with global styles'
    },
    {
      icon: '🎡',
      title: 'Arc Text',
      desc: 'Arrange text along an arc path using SVG TextPath'
    },
    {
      icon: '🔍',
      title: 'Canvas Zoom',
      desc: 'Built-in zoom API: zoom in / zoom out / fit screen / 1:1'
    },
    {
      icon: '🔒',
      title: 'Lock Aspect Ratio',
      desc: 'When enabled on a selected element, drag-resize keeps width and height proportional'
    },
    {
      icon: '🔄',
      title: 'Rotate & Scale',
      desc: 'Transform elements via rotation, scaleX, and scaleY'
    },
    {
      icon: '🎯',
      title: 'Seamless Integration',
      desc: 'Integrates into the Leafer UI ecosystem with multi-select batch editing'
    },
    {
      icon: '🔐',
      title: 'License Management',
      desc: 'Built-in licensing — unrestricted in local development; production requires a license'
    },
    {
      icon: '🔧',
      title: 'TypeScript',
      desc: 'Full type definitions with ESM + CJS dual-format builds'
    }
  ],
  initLayers: [
    {
      step: '①',
      title: 'Page level: mount editor capabilities',
      desc: 'Run once per page — handles License, Quill instance, and Leafer Editor binding.',
      code: 'setLicense → new App() → htmlTextManage.init(app)'
    },
    {
      step: '②',
      title: 'Node level: create HtmlText',
      desc: 'Pass content via content / text / JSON as your use case requires, then add to the canvas.',
      code: 'new HtmlText({ ... }) → app.tree.add(text)'
    }
  ],
  pluginBootstrapSteps: [
    {
      step: '1',
      call: 'setLicense(key)',
      desc: 'Validate the license. localhost can be skipped; production domains need a valid key. Must be called before init.'
    },
    {
      step: '2',
      call: 'new App({ view, editor })',
      desc: 'view is a container id or DOM element; editor: {} enables selection, resize, and inline editing.'
    },
    {
      step: '3',
      call: 'htmlTextManage.init(app)',
      desc: 'Bind the App and create the global Quill instance. Pass the Leafer App instance — call once per page.'
    },
    {
      step: '4',
      call: 'new HtmlText(data)',
      desc: 'Create a rich-text node. data is IHtmlTextInputData — see the comparison table below for content fields.'
    }
  ],
  integrationRoutes: [
    {
      goal: 'Canvas / design editor',
      data: 'Full Leafer JSON tree',
      restore: 'After plugin init: app.tree.set(sceneJson)',
      save: 'Save app.tree.toJSON() — most complete'
    },
    {
      goal: 'Embed a rich-text box in a business form',
      data: 'Single HtmlText JSON or full text HTML',
      restore: 'new HtmlText(savedData)',
      save: 'Save htmlText.toJSON(); for HTML only, save inner HTMLText.text'
    },
    {
      goal: 'Template system / poster generation',
      data: 'Template JSON + user override fields',
      restore: 'Load template first, then replace specified text nodes',
      save: 'Store template and user content separately — avoid copying the full template per artwork'
    },
    {
      goal: 'Font library / asset library integration',
      data: 'Text stores references; large assets stored separately',
      restore: 'Look up resources by fontId, assetId, then merge back into text or node JSON',
      save: 'Text records should not duplicate font base64 or image base64'
    },
    {
      goal: 'Cross-system HTML import',
      data: 'Full HTML string',
      restore: 'new HtmlText({ text: savedHtml })',
      save: 'Preserve <style>, <p style>, <span style> — do not convert to plain text'
    }
  ],
  dataBoundaryRules: [
    {
      name: 'content vs text',
      meaning: 'content is raw content for the plugin wrapper; text is fully formed HTML',
      suggestion:
        'Use content for new simple text; use text for restore, import, and preserving local styles. When both are passed, text takes priority'
    },
    {
      name: 'Global vs local styles',
      meaning: 'fontSize, lineHeight, etc. are global styles on textData / paragraphs; local styles live on span style',
      suggestion:
        'Change whole-paragraph styles via setHTMLText global keys; change a few characters by double-clicking to edit and dragging a selection'
    },
    {
      name: 'Assets vs content',
      meaning:
        'Fonts, images, and template assets can be large; canvas SVG rendering requires base64-embedded fonts, not URL-only references',
      suggestion: 'Store fontIds + contentHtml; hydrate to base64 @font-face before restore (subsetting recommended)'
    },
    {
      name: 'Runtime vs persistence',
      meaning: 'Quill instance, DOM, cursor, and temporary selection exist only at runtime',
      suggestion: 'Persist only JSON / HTML / business references — not editor objects'
    },
    {
      name: 'Create vs update',
      meaning: 'new HtmlText creates a new node; existing.set(...) syncs an existing node',
      suggestion:
        'Use new when opening historical data; use set or setHTMLText to replace elements already on the canvas'
    }
  ],
  initModes: [
    {
      name: 'content + style params',
      scene: 'New text, toolbar creation, simple templates',
      fields: 'content, fontSize, color, fontFamily...',
      behavior: 'Plugin auto-builds HTML from style properties; for a single custom font use fontFamily + fontBase64'
    },
    {
      name: 'text full HTML',
      scene: 'Business stores HTML only, template restore, cross-system import',
      fields: 'text',
      behavior: 'Rendered as-is; Quill CSS auto-completed if missing; metadata like fontSize / padding parsed from HTML'
    },
    {
      name: 'text = font + content',
      scene: 'Font library and body text stored separately',
      fields: 'text: fontStyle + contentHtml',
      behavior: 'fontStyle injects @font-face; contentHtml preserves inline styles'
    },
    {
      name: 'Leafer JSON restore',
      scene: 'Pure Leafer projects, previously saved toJSON()',
      fields: 'Full node JSON',
      behavior: 'Most complete — position, styles, and textData restored in one pass'
    }
  ],
  initParamGroups: [
    {
      title: 'Content source (pick one; text takes priority)',
      params: [
        {
          name: 'content',
          type: 'string',
          default: '—',
          desc: 'Plain text or simple tags; plugin wraps HTML from style params'
        },
        {
          name: 'text',
          type: 'string',
          default: '—',
          desc: 'Full HTML; metadata auto-parsed; CSS auto-completed if missing'
        }
      ]
    },
    {
      title: 'Text styles',
      params: [
        {
          name: 'fontSize',
          type: 'number',
          default: '16',
          desc: 'Global font size (px)'
        },
        {
          name: 'fontFamily',
          type: 'string',
          default: '—',
          desc: 'Font family name'
        },
        {
          name: 'fontBase64',
          type: 'string',
          default: '—',
          desc: 'Primary custom font data URL; injects @font-face with fontFamily'
        },
        {
          name: 'fontWeight',
          type: 'number | string',
          default: '—',
          desc: 'Font weight, e.g. 600, "bold"'
        },
        {
          name: 'italic',
          type: 'boolean',
          default: 'false',
          desc: 'Global italic; wraps content in <em>'
        },
        {
          name: 'lineHeight',
          type: 'number | string',
          default: '1.5',
          desc: 'Line height multiplier or "40px"'
        },
        {
          name: 'letterSpacing',
          type: 'number',
          default: '0',
          desc: 'Letter spacing (px)'
        },
        {
          name: 'color',
          type: 'string',
          default: '—',
          desc: 'Text color; written as Quill character-level color'
        },
        {
          name: 'textShadow',
          type: 'string',
          default: '—',
          desc: 'CSS text-shadow'
        },
        {
          name: 'textStroke',
          type: 'string',
          default: '—',
          desc: 'CSS -webkit-text-stroke, e.g. "2px #000"'
        },
        {
          name: 'align',
          type: 'false | "center" | "right" | "justify" | "distribute"',
          default: 'false',
          desc: 'Horizontal align: left / center / right / justify / distribute'
        },
        {
          name: 'alignContent',
          type: "'start' | 'center' | 'end'",
          default: "'start'",
          desc: 'Vertical align: top / center / bottom'
        },
        {
          name: 'padding',
          type: 'number | string | number[]',
          default: '0',
          desc: 'Text padding'
        }
      ]
    },
    {
      title: 'Layout & node behavior',
      params: [
        {
          name: 'x / y',
          type: 'number',
          default: '0',
          desc: 'Canvas coordinates (px)'
        },
        {
          name: 'width',
          type: 'number',
          default: 'auto',
          desc: 'Fixed width mode; wraps when content overflows'
        },
        {
          name: 'height',
          type: 'number',
          default: 'auto',
          desc: 'Node height'
        },
        {
          name: 'editable',
          type: 'boolean',
          default: 'true',
          desc: 'Whether double-click opens editing'
        },
        {
          name: 'draggable',
          type: 'boolean',
          default: 'true',
          desc: 'Whether draggable'
        },
        {
          name: 'fill',
          type: 'string',
          default: '—',
          desc: 'Node background color'
        },
        {
          name: 'opacity',
          type: 'number',
          default: '1',
          desc: 'Opacity 0–1'
        },
        {
          name: 'rotation',
          type: 'number',
          default: '0',
          desc: 'Rotation angle'
        },
        {
          name: 'scaleX / scaleY',
          type: 'number',
          default: '1',
          desc: 'Scale'
        },
        {
          name: 'lockRatio',
          type: 'boolean',
          default: 'false',
          desc: 'Lock aspect ratio when scaling'
        }
      ]
    }
  ],
  htmlTextParams: [
    {
      name: 'x',
      type: 'number',
      required: false,
      default: '0',
      desc: 'Node X coordinate on canvas (px)'
    },
    {
      name: 'y',
      type: 'number',
      required: false,
      default: '0',
      desc: 'Node Y coordinate on canvas (px)'
    },
    {
      name: 'width',
      type: 'number',
      required: false,
      default: 'auto',
      desc: 'Node width (px). Enables fixed-width mode; text wraps when it exceeds width'
    },
    {
      name: 'height',
      type: 'number',
      required: false,
      default: 'auto',
      desc: 'Node height (px)'
    },
    {
      name: 'content',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Plain text or simple HTML (e.g. <strong>text</strong>); plugin applies font styles to build full HTML. When passed with text, text takes priority'
    },
    {
      name: 'text',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Full HTML string used as text content; priority over content. Parses width / height / fontSize / fontFamily / textStroke / padding, etc. from HTML'
    },
    {
      name: 'fontSize',
      type: 'number',
      required: false,
      default: '16',
      desc: 'Font size (px)'
    },
    {
      name: 'fontFamily',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Font family name, e.g. "Arial", "PingFang SC". With fontBase64, initializes a custom font'
    },
    {
      name: 'fontBase64',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Primary custom font Base64 / data URL. Use with fontFamily; plugin auto-injects @font-face'
    },
    {
      name: 'fontWeight',
      type: 'number | string',
      required: false,
      default: '—',
      desc: 'Font weight: numeric (100–900) or keyword ("bold", "normal")'
    },
    {
      name: 'italic',
      type: 'boolean',
      required: false,
      default: 'false',
      desc: 'Global italic. When true, initial content is wrapped in <em> with italic overflow width preserved'
    },
    {
      name: 'lineHeight',
      type: 'number | string',
      required: false,
      default: '1.5',
      desc: 'Line height multiplier (e.g. 1.5) or pixel string (e.g. "40px")'
    },
    {
      name: 'letterSpacing',
      type: 'number',
      required: false,
      default: '0',
      desc: 'Letter spacing (px)'
    },
    {
      name: 'padding',
      type: 'number | string | number[]',
      required: false,
      default: '0',
      desc: 'Text padding: number, CSS string (e.g. "12px 16px"), or array per CSS rules: [top], [top, right], [top, right, bottom], [top, right, bottom, left]'
    },
    {
      name: 'textShadow',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Text shadow in CSS text-shadow format, e.g. "2px 2px 4px #000000"'
    },
    {
      name: 'textStroke',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Text stroke in CSS -webkit-text-stroke format, e.g. "2px #333"'
    },
    {
      name: 'align',
      type: 'false | "center" | "right" | "justify" | "distribute"',
      required: false,
      default: 'false',
      desc: 'Horizontal align: false=left, "center"=center, "right"=right, "justify"=justify, "distribute"=distribute'
    },
    {
      name: 'alignContent',
      type: "'start' | 'center' | 'end'",
      required: false,
      default: "'start'",
      desc: 'Vertical text alignment: top / center / bottom'
    },
    {
      name: 'editable',
      type: 'boolean',
      required: false,
      default: 'true',
      desc: 'Editable; when true, double-click opens rich-text editing'
    },
    {
      name: 'draggable',
      type: 'boolean',
      required: false,
      default: 'true',
      desc: 'Whether the node can be dragged'
    },
    {
      name: 'fill',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Node background; supports color values or gradients'
    },
    {
      name: 'color',
      type: 'string',
      required: false,
      default: '—',
      desc: 'Initial text color in CSS color format (e.g. "#e74c3c", "rgba(0,0,0,0.5)"). Written as Quill character-level color and used as caret color while editing'
    },
    {
      name: 'opacity',
      type: 'number',
      required: false,
      default: '1',
      desc: 'Opacity, range 0–1'
    }
  ],
  persistenceChoices: [
    {
      scene: 'Design drafts, canvas pages, template editors',
      save: 'app.tree.toJSON()',
      restore: 'app.tree.set(sceneJson)',
      note: 'Most complete — graphics, images, text position and styles restored together'
    },
    {
      scene: 'Manage text elements only, but preserve local styles',
      save: 'htmlText.toJSON()',
      restore: 'new HtmlText(textJson)',
      note: 'Recommended for single font. For large multi-font libraries: strip fonts, store contentHtml + fontIds, hydrate before restore'
    },
    {
      scene: 'Business database allows HTML strings only',
      save: 'inner HTMLText.text',
      restore: 'new HtmlText({ text })',
      note: 'Works, but span styles must be preserved; @font-face must be base64, not external URL only'
    },
    {
      scene: 'Font assets and body text in separate tables (multi-font recommended)',
      save: 'fontIds[] + contentHtml (no @font-face)',
      restore: 'hydrate → new HtmlText({ text: fontStyle + contentHtml })',
      note: 'Fonts stay out of the text table; font library generates base64 @font-face before restore'
    },
    {
      scene: 'Plain text only',
      save: 'content',
      restore: 'new HtmlText({ content, ...style })',
      note: 'Can only restore basic text; local styles cannot be recovered'
    }
  ],
  storageSeparationRules: [
    {
      name: 'Font files',
      storage: 'Font library, object storage. Store url pointing to full woff2 in the library',
      reference: 'Text record: contentHtml keeps font-family; also store fontIds[], optional usedChars',
      restore: 'Read font file → subset (recommended) → generate base64 @font-face → merge with contentHtml as text'
    },
    {
      name: 'Images / textures',
      storage: 'Asset library, object storage, or CDN',
      reference: 'Node JSON stores src, assetId, crop params, position, and size',
      restore: 'Ensure image URLs are accessible, then restore Leafer Image / node JSON'
    },
    {
      name: 'Business templates',
      storage: 'Template table or template files as reusable masters',
      reference: 'Document stores only templateId and user-overridden fields',
      restore: 'Load template JSON, then overlay user-edited text, images, and styles'
    },
    {
      name: 'Lightweight styles',
      storage: 'Store alongside text JSON or HTML',
      reference: 'fontSize, color, textStroke, padding, local span styles, etc.',
      restore: 'Directly new HtmlText(json) or new HtmlText({ text })'
    },
    {
      name: 'Editor runtime state',
      storage: 'Not recommended for persistence',
      reference: 'Quill instance, DOM, cursor, temporary selection — do not persist',
      restore: 'Re-init the plugin; persist content itself only'
    }
  ],
  saveChecklist: [
    {
      name: 'Exit inline editing?',
      why: 'While editing, content lives in Quill first; it is stably written back to inner HTMLText.text only after exit',
      action: 'Close the inline editor before save, or confirm updateHtmlText has completed'
    },
    {
      name: 'Preserve full HTML?',
      why: 'Local fonts, local font size, color, stroke, etc. may live in <span style>',
      action: 'When saving HTML only, do not strip to plain text; keep <style>, <p style>, <span style>'
    },
    {
      name: 'Can font assets be restored?',
      why: 'If HTML only has font-family names, the canvas cannot find custom fonts and falls back; SVG cannot use external URLs',
      action: 'Save fontIds; hydrate to base64 @font-face (subsetting recommended) before merging text'
    },
    {
      name: 'Are large assets duplicated in storage?',
      why: 'Repeated font base64, image base64, and asset JSON bloat the database quickly',
      action: 'Put assets in asset library or CDN; text nodes store references only'
    },
    {
      name: 'Saving runtime objects?',
      why: 'Quill, DOM, selection, editor.target cannot be reused after page refresh',
      action: 'Save only JSON, HTML, business ids; re-init on page load'
    },
    {
      name: 'Does update method match intent?',
      why: 'Full set overwrites the node; only changing inner.text preserves outer layout',
      action: 'Full data → set; copy only → inner HTMLText.text; toolbar styles → setHTMLText'
    }
  ],
  updateStrategies: [
    {
      name: 'Full node data',
      api: 'existing.set(textJson)',
      keep: 'JSON is authoritative — position, size, inner HTML, textData updated together',
      note: 'Good when API returns full node data; avoid overwriting unsaved user edits'
    },
    {
      name: 'Replace rich text content only',
      api: 'inner.set({ text })',
      keep: 'Outer HtmlText position, scale, rotation, and drag state preserved',
      note: 'Good for template variable substitution, AI copy rewrite, rebuilding HTML from business fields'
    },
    {
      name: 'Toolbar style changes',
      api: 'setHTMLText(key, value)',
      keep: 'Applies to current selected node or Quill selection',
      note: 'Select the node first; local styles also require double-click edit and text selection'
    },
    {
      name: 'Replace font assets',
      api: 'new HtmlText({ text: fontStyle + contentHtml })',
      keep: 'Span styles in HTML preserved; fonts provided by new @font-face',
      note: 'Good for font library migration; @font-face must still be base64, not external URL'
    }
  ],
  fontFieldsGuide: [
    {
      name: 'fontFamily',
      type: 'string',
      role: 'Default font for the whole paragraph (on <p>)',
      when: 'Specify global font when creating text; single-font scenarios'
    },
    {
      name: 'fontBase64',
      type: 'string',
      role: 'Primary font file paired with fontFamily (data URL)',
      when: 'Pass together with fontFamily when there is only one custom font'
    },
    {
      name: 'text',
      type: 'string',
      role: 'Full HTML input; may include <style>@font-face</style> and span local styles',
      when: 'Prefer for multi-font restore, local fonts, local font size, cross-system import'
    },
    {
      name: 'base64font',
      type: 'string',
      role: 'Third argument to setHTMLText("font", family, base64font)',
      when: 'User changes custom font on a selection in inline editing'
    }
  ],
  fontEchoModes: [
    {
      name: 'Leafer JSON',
      storage: 'htmlText.toJSON() (good for single font; large multi-font libs need strip/hydrate)',
      how: 'new HtmlText(savedJson)'
    },
    {
      name: 'Full HTML',
      storage: 'One string with <style> multiple @font-face (base64) + content',
      how: 'new HtmlText({ text: savedHtml })'
    },
    {
      name: 'Font + content split (multi-font recommended)',
      storage: 'contentHtml + fontIds[]; fonts in font library, not text table',
      how: 'After hydrate: new HtmlText({ text: fontStyle + contentHtml })'
    },
    {
      name: 'Runtime selection font change',
      storage: 'After editing, save toJSON() or full HTML',
      how: 'setHTMLText("font", family, base64)'
    }
  ],
  multiFontWorkflowSteps: [
    {
      phase: 'While editing',
      store: 'Font binary need not be persisted; preload font URLs on page for Quill',
      pass: 'User edits normally; plugin writes back leaf.text (with @font-face base64)'
    },
    {
      phase: 'Save',
      store: 'contentHtml (no @font-face) + fontIds[] + optional usedChars',
      pass: 'Strip @font-face and large fontBase64 / fontFaces fields from text'
    },
    {
      phase: 'Restore / open document',
      store: 'Still only contentHtml + fontIds',
      pass: 'Fetch fonts by fontId → subset (recommended) → base64 @font-face → merge as text → new HtmlText'
    },
    {
      phase: 'Full Leafer page export',
      store: 'Slim text nodes in scene JSON; document-level fonts table',
      pass: 'Walk tree and hydrate before fromJSON / set'
    }
  ],
  editingFaq: [
    {
      q: 'Called openInnerEditor but editing did not start?',
      a: 'Most often the second argument is wrong, or the target node is incorrect.',
      tips: [
        'Do not write openInnerEditor(node, "textInnerEditor") — textInnerEditor is a DOM id, not an editor name',
        'Plugin double-click actually calls openInnerEditor(htmlTextChild, true); target is inner HTMLText',
        'If the node is not selected yet, set app.editor.target = htmlTextBox first, then open inline editor',
        'When an explicit name is needed, use "TextEditor", not "textInnerEditor"'
      ]
    },
    {
      q: 'getQuill() returns null, or setSelection has no effect?',
      a: 'Quill is editable only after license passes and the inline editor is open.',
      tips: [
        'Confirm setLicense succeeded and htmlTextManage.init(app) completed',
        'Do not call setSelection in outer-frame selection; wait for TextEditor load',
        'Put setSelection in requestAnimationFrame or setTimeout to avoid being overwritten by inline editor init'
      ]
    },
    {
      q: 'setHTMLText changed styles but the canvas did not update?',
      a: 'setHTMLText applies to the current selected node; some formats need a selection or inline editing.',
      tips: [
        'Select HtmlText first, then call setHTMLText',
        'bold / italic / color / font: take effect after selecting text in inline editing',
        'fontSize / lineHeight / alignContent: select node only; applies globally',
        'inlineFontSize requires setFeatures({ inlineFontSize: true }) first',
        'Local font / letterSpacing: inline editing + selection; select-all font uses global path'
      ]
    },
    {
      q: 'Double-click works but my single-click listener does not?',
      a: 'Plugin double-click listens on TextEditTool, which requires the outer edit tool to be loaded.',
      tips: [
        'PointerEvent.DOWN fires too early, often before selection completes openInnerEditor',
        'Prefer PointerEvent.TAP and set app.editor.target first',
        'Do not only listen on outer HtmlText and expect Quill — complete "select → open inline editor"'
      ]
    },
    {
      q: 'Content lost after editing, or styles differ from canvas?',
      a: 'The canvas displays HTMLText.text, not Quill DOM itself.',
      tips: [
        'When closing inline editor, plugin writes Quill content back to HTMLText.text and re-renders',
        'Save with HtmlText.toJSON() or full Leafer JSON — do not save Quill instance only',
        'For HTML-only restore, keep <p style> / <span style> inline styles and @font-face'
      ]
    }
  ],
  setHtmlTextKeys: [
    {
      key: 'bold',
      valueType: 'boolean (optional)',
      desc: 'Bold. Outer selection → global weight for whole paragraph; inline editing → Quill characters (no selection → whole text)'
    },
    {
      key: 'italic',
      valueType: 'boolean (optional)',
      desc: 'Italic. Same rules as bold'
    },
    {
      key: 'underline',
      valueType: 'boolean (optional)',
      desc: 'Underline. Inline editing → characters; outer selection → whole text'
    },
    {
      key: 'strike',
      valueType: 'boolean (optional)',
      desc: 'Strikethrough. Same rules as underline'
    },
    {
      key: 'textCase',
      valueType: 'omit value',
      desc: 'Case conversion. Requires inline editing with a dragged selection, otherwise no-op'
    },
    {
      key: 'script',
      valueType: '"super" | "sub"',
      desc: 'Superscript/subscript. Inline editing → characters (no selection → whole text); outer selection → whole text'
    },
    {
      key: 'align',
      valueType: 'false | "center" | "right" | "justify" | "distribute"',
      desc: 'Horizontal align. false = left (default), "center" = center, "right" = right, "justify" = justify, "distribute" = distribute'
    },
    {
      key: 'alignContent',
      valueType: '"start" | "center" | "end"',
      desc: 'Vertical align. "start" = top, "center" = center, "end" = bottom'
    },
    {
      key: 'color',
      valueType: 'string (CSS color)',
      desc: 'Text color. With selection → selected chars only; without → whole text (inline editing or outer selection)'
    },
    {
      key: 'fontSize',
      valueType: 'number',
      desc: 'Global font size for whole paragraph. Select node only, no double-click; clears all inlineFontSize'
    },
    {
      key: 'inlineFontSize',
      valueType: 'number | string',
      desc: '[Experimental] Local font size. Requires: setFeatures enabled + double-click edit + dragged selection'
    },
    {
      key: 'fontWeight',
      valueType: 'number | string',
      desc: 'Global weight for whole paragraph. Select node only, e.g. 400, 700, "bold"'
    },
    {
      key: 'lineHeight',
      valueType: 'number | string',
      desc: 'Global line height for whole paragraph. Select node only (multiplier or "40px")'
    },
    {
      key: 'letterSpacing',
      valueType: 'number',
      desc: 'With selection → local letter-spacing span; without → global letterSpacing for whole paragraph'
    },
    {
      key: 'textShadow',
      valueType: 'string',
      desc: 'Outer selection → global shadow for whole paragraph; inline editing → characters (no selection → whole text)'
    },
    {
      key: 'textStroke',
      valueType: 'string',
      desc: 'Outer selection → global stroke for whole paragraph; inline editing → characters (no selection → whole text)'
    },
    {
      key: 'list',
      valueType: '"ordered" | "bullet"',
      desc: 'List. Inline editing → toggle current line; outer selection → all paragraphs'
    },
    {
      key: 'font',
      valueType: 'string + base64font?',
      desc: 'With partial selection → local font span; otherwise → global fontFamily. Third arg injects custom font'
    }
  ],
  editScenarios: [
    {
      name: '① Outer selection',
      how: 'Single-click text, resize frame appears, not yet in editor',
      effect:
        'fontSize / lineHeight / alignContent and other whole-paragraph props apply; bold etc. change textData globally'
    },
    {
      name: '② Inline editing, no selection',
      how: 'Double-click to edit, caret blinks but no text is highlighted',
      effect: 'bold / color / textShadow apply to whole text; inlineFontSize / local font do not apply'
    },
    {
      name: '③ Inline editing, with selection',
      how: 'Double-click to edit, drag to highlight part of the text',
      effect: 'Can set local font size / local font / local letter spacing; bold / color only change selected part'
    }
  ],
  formatCookbook: [
    {
      goal: 'Increase font size for whole paragraph',
      needInner: 'No',
      needSelection: 'No',
      call: "setHTMLText('fontSize', 32)"
    },
    {
      goal: 'Make a few characters larger',
      needInner: 'Yes',
      needSelection: 'Yes',
      call: "setHTMLText('inlineFontSize', 48)"
    },
    {
      goal: 'Change font for whole paragraph',
      needInner: 'No',
      needSelection: 'No',
      call: "setHTMLText('font', family, base64)"
    },
    {
      goal: 'Change font for a few characters',
      needInner: 'Yes',
      needSelection: 'Yes (do not select all)',
      call: "setHTMLText('font', family, base64)"
    },
    {
      goal: 'Bold a few characters',
      needInner: 'Yes',
      needSelection: 'Yes',
      call: "setHTMLText('bold')"
    },
    {
      goal: 'Bold whole paragraph',
      needInner: 'No',
      needSelection: 'No',
      call: "setHTMLText('bold')"
    },
    {
      goal: 'Letter spacing for whole paragraph',
      needInner: 'No',
      needSelection: 'No',
      call: "setHTMLText('letterSpacing', 2)"
    },
    {
      goal: 'Letter spacing for a few characters',
      needInner: 'Yes',
      needSelection: 'Yes',
      call: "setHTMLText('letterSpacing', 4)"
    },
    {
      goal: 'Vertical center',
      needInner: 'No',
      needSelection: 'No',
      call: "setHTMLText('alignContent', 'center')"
    }
  ],
  formatScopeMatrix: [
    {
      key: 'fontSize / lineHeight / fontWeight / padding / alignContent',
      outer: 'Whole-paragraph textData',
      innerNoSel: 'Whole-paragraph textData',
      innerSel: 'Whole-paragraph textData (selection ignored)'
    },
    {
      key: 'inlineFontSize',
      outer: 'No effect',
      innerNoSel: 'No effect',
      innerSel: 'Selection span only (requires setFeatures)'
    },
    {
      key: 'font',
      outer: 'Whole-paragraph fontFamily',
      innerNoSel: 'Whole-paragraph fontFamily',
      innerSel: 'Selection span (select all → whole paragraph)'
    },
    {
      key: 'letterSpacing',
      outer: 'Whole-paragraph letterSpacing',
      innerNoSel: 'Whole-paragraph letterSpacing',
      innerSel: 'Selection span'
    },
    {
      key: 'bold / italic',
      outer: 'textData global',
      innerNoSel: 'Quill all characters',
      innerSel: 'Quill selection characters'
    },
    {
      key: 'underline / strike / color',
      outer: 'All characters',
      innerNoSel: 'All characters',
      innerSel: 'Selection characters'
    },
    {
      key: 'textCase',
      outer: 'No-op',
      innerNoSel: 'No-op',
      innerSel: 'Selection only'
    },
    {
      key: 'textShadow / textStroke',
      outer: 'textData global',
      innerNoSel: 'Quill all characters',
      innerSel: 'Quill selection characters'
    },
    {
      key: 'align',
      outer: 'All paragraphs',
      innerNoSel: 'Paragraph at caret',
      innerSel: 'Paragraphs in selection'
    },
    {
      key: 'list',
      outer: 'All paragraphs',
      innerNoSel: 'Toggle current line',
      innerSel: 'Toggle current line'
    }
  ],
  inlineFontNotes: [
    {
      name: '@font-face injection',
      desc: 'Each setHTMLText("font", ..., base64) adds corresponding @font-face to exported HTML; multiple local fonts create multiple @font-face rules'
    },
    {
      name: 'Select-all font change',
      desc: 'Select-all in inline editing equals global font change; clears all span local font-family'
    },
    {
      name: 'Write-back while editing',
      desc: 'During local font changes, leaf.text is not written mid-edit; updateHtmlText runs uniformly after exiting inline editor to avoid mixed display'
    },
    {
      name: 'HTML-only restore',
      desc: 'When storing HTML only, keep all @font-face in <style>; plugin injects those fonts into the editor environment on enter'
    }
  ],
  inlineFontSizeLimits: [
    {
      name: 'Arc text',
      desc: 'Arc layout is skipped when local font sizes exist (hasInlineFontSize); unify font size before applying arc'
    },
    {
      name: 'Lock aspect ratio scaling',
      desc: 'Multi-size text does not participate in global fontSize scaling under lockRatio to avoid local size ratio errors'
    },
    {
      name: 'Global fontSize',
      desc: 'Calling fontSize clears all inlineFontSize; text returns to single-size mode'
    },
    {
      name: 'Coexist with local font',
      desc: 'Same text can have both local font size and local font; each saved on different span style properties'
    },
    {
      name: 'Multi-select batch',
      desc: 'inlineFontSize only applies to Quill selection in inline editor; no batch local size across multiple nodes'
    },
    {
      name: 'External HTML',
      desc: 'Plugin-exported HTML can restore local font size; third-party HTML is best-effort, not guaranteed'
    }
  ],
  formatPainterApis: [
    {
      name: 'copyHTMLTextFormat',
      signature: 'copyHTMLTextFormat(): HTMLTextCopiedFormat | null',
      desc: 'Copies a formatting snapshot from the current HTMLText. In inline editing with a selection, it copies the selection; when the outer node is selected, it copies whole-object text styles, paragraph formats, and textData.'
    },
    {
      name: 'applyHTMLTextFormat',
      signature: 'applyHTMLTextFormat(format?): boolean',
      desc: 'Applies the latest copied format, or a passed format, to the current HTMLText. Inline selection targets selected text; outer selection or select-all applies it as whole-object styling.'
    },
    {
      name: 'getCopiedHTMLTextFormat',
      signature: 'getCopiedHTMLTextFormat(): HTMLTextCopiedFormat | null',
      desc: 'Reads the cached formatting snapshot, useful for active toolbar state.'
    },
    {
      name: 'clearCopiedHTMLTextFormat',
      signature: 'clearCopiedHTMLTextFormat(): void',
      desc: 'Clears the copied snapshot, useful when leaving format-painter mode or changing pages.'
    }
  ],
  changelog: [
    {
      version: '2.6.13',
      date: '2026-07',
      tag: 'latest',
      items: [
        'Added format-painter APIs: copyHTMLTextFormat, applyHTMLTextFormat, getCopiedHTMLTextFormat, and clearCopiedHTMLTextFormat',
        'Support copying inline selection formatting or whole HtmlText object formatting, then applying it to another selection or object',
        'Sync textData back from current HTML before entering edit mode to reduce mismatches in size, font, letter spacing, shadow, and stroke restore',
        'Improved textStroke unset / none / 0px parsing to avoid old stroke styles reappearing after clearing'
      ]
    },
    {
      version: '2.6.11',
      date: '2026-07',
      tag: 'minor',
      items: [
        'Restructured integration docs by business route, init, update, save, restore, and troubleshooting',
        'Added asset split-storage guidance — fonts, images, templates should not be duplicated in text data',
        'Added existing-node update strategies, pre-save checklist, and local-style save/restore examples',
        'Moved npm, source, and live demo links to doc top; fixed source and demo URLs'
      ]
    },
    {
      version: '2.6.10',
      date: '2026-06',
      tag: 'minor',
      items: [
        'Multiple @font-face and local font inlineFontFamily support',
        'Local letter spacing inlineLetterSpacing support',
        'Inject @font-face from HTML when entering edit mode',
        'Auto-quote @font-face family names containing spaces'
      ]
    },
    {
      version: '2.6.7',
      date: '2026-06',
      tag: 'patch',
      items: ['Updated __updateBoxBounds for better content height measurement in fixed-width mode']
    },
    {
      version: '2.6.6',
      date: '2026-06',
      tag: 'patch',
      items: [
        'New text stroke handler; improved editor styling',
        'Fixed global text stroke after layout formatting',
        'Cleaned unnecessary stroke styles for correct editor rendering'
      ]
    },
    {
      version: '2.6.5',
      date: '2026-06',
      tag: 'patch',
      items: [
        'Adjusted content height calculation in HtmlText.ts for fixed-width mode',
        'Added content height measurement in innerEditorSync.ts for fixed-height layout',
        'Fixed height calculation in addFontSizeToP.ts using Math.ceil',
        'Integrated new content height measurement in updateHtmlText.ts'
      ]
    },
    {
      version: '2.6.4',
      date: '2026-06',
      tag: 'patch',
      items: [
        'Added syncInnerEditorDomToLeaf to sync editor styles',
        'Improved style handling in TextEditTool and TextEditor',
        'Integrated style sync in updateHtmlText',
        'Removed unnecessary global font size handling to preserve local sizes',
        'Improved HTML text parsing for correct local font size detection',
        'Adjusted style handling for line height and font size compatibility'
      ]
    },
    {
      version: '2.6.3',
      date: '2026-06',
      tag: 'patch',
      items: [
        'Added new TGZ release file',
        'Updated version in manifest.json and package.json',
        'Line height sync for consistent inline element line height in text editor',
        'Improved font size handling for complex formatting scenarios',
        'Emit error and abort workflow when token is missing',
        'Updated git push to use specified remote URL',
        'Fixed website repo access token usage',
        'Changed dependency install from npm ci to npm install'
      ]
    },
    {
      version: '2.6.2',
      date: '2026-06',
      tag: 'patch',
      items: [
        'Line height application based on scale ratio',
        'Logical font size parsing for correct size after format changes',
        'Improved inlineFontSize handling for correct HTML font size registration',
        'Removed unnecessary line height style settings'
      ]
    },
    {
      version: '2.6.1',
      date: '2026-06',
      tag: 'patch',
      items: ['Improved data processing logic', 'Enhanced error handling']
    },
    {
      version: '2.6.0',
      date: '2026-06',
      tag: 'patch',
      items: [
        'Global text data handler createGlobalTextDataHandler',
        'Layout handlers: handleAlign, handleAlignContent, handleList',
        'Text style handlers: handleBold, handleItalic, handleTextCase',
        'HTML text update with dynamic font, size, color, and other styles',
        'Helper functions for HTML text paste and formatting',
        'Custom Quill formats: fontWeight, textStroke, textShadow',
        'Enhanced HtmlText node data structure with more style properties',
        `Integrated lock-aspect-ratio scaling in \`TextEditTool\``,
        'Improved text stroke and font size handling for consistent scaling',
        'Enhanced inline text stroke support',
        'Added scaleCSSValueByRatio and scaleCssPxValues in utils.ts for CSS px scaling',
        'Updated TextEditor.ts and HtmlTextManage.ts with text shadow scaling',
        'Improved editor style application for correct text shadow on scale'
      ]
    },
    {
      version: '2.5.12',
      date: '2026-06',
      tag: 'minor',
      items: [
        'Set and get inline font size',
        'Detect and sync list item font sizes',
        'Scale inline font size in editor',
        'Restore original inline font size',
        'New inlineTextStroke.ts for inline text stroke',
        'Scale text stroke in editor',
        'Restore original text stroke',
        'Set version to 2.5.11',
        'Specify latest version and download links',
        'Updated date to 2026-06-15'
      ]
    }
  ],
  initScenarios: [
    {
      id: 'content',
      title: 'Scenario A: Create simple text',
      mode: 'content',
      desc: 'Provide text and basic styles only; plugin wraps HTML automatically. Good for "Insert text box" or blank canvas.',
      tips: [
        'content may include simple tags like <strong>, <em>',
        'Default placeholder is Hello World when neither content nor text is passed'
      ],
      lang: 'main.ts',
      codeKey: 'initScenarioContentCode'
    },
    {
      id: 'full-style',
      title: 'Scenario B: Full styles + custom font',
      mode: 'content + style params',
      desc: 'Set font, stroke, alignment, padding, etc. at creation. fontBase64 injects @font-face in initial HTML.',
      tips: [
        'width > 0 enables fixed-width mode with automatic line wrap',
        'italic: true wraps in <em> and preserves italic overflow width'
      ],
      lang: 'main.ts',
      codeKey: 'initScenarioFullStyleCode'
    },
    {
      id: 'text-html',
      title: 'Scenario C: Restore full HTML',
      mode: 'text',
      desc: 'When the business system stores rich-text HTML only. Plugin parses font size, font, padding, alignment into textData.',
      tips: [
        'Keep <p style>, <span style> inline styles — do not strip to plain text',
        'If HTML has @font-face but no Quill CSS, plugin auto-completes'
      ],
      lang: 'main.ts',
      codeKey: 'initScenarioTextCode'
    },
    {
      id: 'split-storage',
      title: 'Scenario E: Split font and content storage (multi-font recommended)',
      mode: 'text = fontStyle + contentHtml',
      desc: 'Fonts managed by font library; body stored as HTML. Merge as text on restore. No plugin changes — business hydrates before passing in.',
      tips: [
        'Store: contentHtml without @font-face; fontIds point to font library',
        'Restore: font library generates base64 @font-face (subsetting recommended), then fontStyle + contentHtml',
        'Multiple fonts: multiple @font-face in one <style>, not external URLs',
        'contentHtml <span style="font-family:..."> must match @font-face names'
      ],
      lang: 'main.ts',
      codeKey: 'initScenarioSplitStorageCode'
    },
    {
      id: 'json',
      title: 'Scenario D: Leafer JSON restore',
      mode: 'toJSON()',
      desc: 'When HtmlText.toJSON() or full canvas JSON was saved, pass data to constructor or set().',
      tips: [
        'htmlTextManage.init(app) still required before restore',
        'Most complete approach — least likely to lose styles'
      ],
      lang: 'main.ts',
      codeKey: 'initScenarioJsonCode'
    }
  ],
  manageMethods: [
    {
      name: 'init',
      anchor: 'init',
      signature: 'htmlTextManage.init(app): Promise<Quill>',
      desc: 'Initialize Quill and bind to the given Leafer App instance. Call right after creating App, once per page.',
      params: [
        {
          name: 'app',
          type: 'App',
          required: true,
          desc: 'Leafer App instance (created via new App())'
        }
      ],
      returns: {
        type: 'Promise<Quill>',
        desc: 'Initialized Quill editor instance'
      },
      exampleKey: 'manageInitExample'
    },
    {
      name: 'getQuill',
      anchor: 'get-quill',
      signature: 'htmlTextManage.getQuill(): Quill | null',
      desc: 'Get the global Quill instance for native APIs (getContents, setSelection). Returns null when unlicensed; character-level ops usually need inline editing (TextEditor open). See Editing & FAQ.',
      params: [],
      returns: {
        type: 'Quill | null',
        desc: 'Initialized Quill instance, or null if license failed'
      },
      exampleKey: 'manageGetQuillExample'
    },
    {
      name: 'getCanvas',
      anchor: 'get-canvas',
      signature: 'htmlTextManage.getCanvas(): App | null',
      desc: 'Get the bound Leafer App instance. Returns null when unlicensed. App includes editor (selection) and zoom for canvas zoom and batch selection.',
      params: [],
      returns: {
        type: 'App | null',
        desc: 'Bound Leafer App instance'
      },
      exampleKey: 'manageGetCanvasExample'
    },
    {
      name: 'setFeatures',
      anchor: 'set-features',
      signature: 'htmlTextManage.setFeatures(features): void',
      desc: 'Enable experimental features. Currently only inlineFontSize (local font size) must be enabled explicitly; local font and local letterSpacing work by default.',
      params: [
        {
          name: 'features',
          type: '{ inlineFontSize?: boolean }',
          required: true,
          desc: 'Experimental feature flags. Currently only inlineFontSize (local font size) needs enabling'
        }
      ],
      exampleKey: 'manageSetFeaturesExample'
    },
    {
      name: 'isMultiSelect',
      anchor: 'is-multi-select',
      signature: 'htmlTextManage.isMultiSelect(): boolean',
      desc: 'Whether multiple canvas objects are selected. Useful for toolbar button state.',
      params: [],
      returns: {
        type: 'boolean',
        desc: 'Whether multi-select is active'
      },
      exampleKey: 'manageIsMultiSelectExample'
    },
    {
      name: 'dateEdit',
      anchor: 'date-edit',
      signature: 'htmlTextManage.dateEdit(callback, level?, listNew?): void',
      desc: 'Batch-edit currently selected nodes. Multiple selection applies to all; single selection affects one node.',
      params: [
        {
          name: 'callback',
          type: '(leaf: any) => void',
          required: true,
          desc: 'Edit callback; receives each selected node for direct property changes'
        },
        {
          name: 'level',
          type: 'number',
          required: false,
          desc: 'Operation depth; pass 1 to reach inner Text inside Box children'
        },
        {
          name: 'listNew',
          type: 'any[]',
          required: false,
          desc: 'Custom node list; defaults to current editor selection'
        }
      ],
      exampleKey: 'manageDateEditExample'
    }
  ],
  licenseFns: [
    {
      name: 'setLicense',
      anchor: 'set-license',
      signature: 'setLicense(licenseKey): Promise<boolean>',
      desc: 'Set and validate license key. Must be called before htmlTextManage.init(). Local development needs no license.',
      params: [
        {
          name: 'licenseKey',
          type: 'string',
          required: true,
          desc: 'License key string from the author'
        }
      ],
      returns: {
        type: 'Promise<boolean>',
        desc: 'true if validation succeeded, false otherwise'
      },
      exampleKey: 'licenseSetLicenseExample'
    }
  ],
  code: {
    viteConfig: `// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    // Use the project's dependency instances to avoid duplicate-instance conflicts
    dedupe: [
      '@leafer-ui/core',
      '@leafer-in/editor',
      '@leafer-in/html',
      'leafer-ui',
      'quill',
    ],
  },
  optimizeDeps: {
    // Exclude the plugin from pre-bundling
    exclude: ['@chenyomi/leafer-htmltext-edit'],
  },
})`,
    webpackConfig: `// webpack.config.js
module.exports = {
  resolve: {
    // Ensure a single instance to avoid duplicate-instance conflicts
    alias: {
      quill: require.resolve('quill'),
      '@leafer-ui/core': require.resolve('@leafer-ui/core'),
      '@leafer-in/editor': require.resolve('@leafer-in/editor'),
      '@leafer-in/html': require.resolve('@leafer-in/html'),
      'leafer-ui': require.resolve('leafer-ui'),
    },
  },
}`,
    pluginBootstrapExample: `<template>
  <div id="leafer-view" style="width: 100vw; height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { App } from 'leafer-ui'
import 'leafer-editor'
import { htmlTextManage, setLicense, HtmlText } from '@chenyomi/leafer-htmltext-edit'

onMounted(async () => {
  // ① License (must be before init)
  await setLicense('your-license-key')

  // ② Create canvas
  const app = new App({ view: 'leafer-view', fill: '#ffffff', editor: {} })

  // ③ Init plugin (once per page)
  await htmlTextManage.init(app)

  // ④ Create text node (see "Init by scenario" below)
  const text = new HtmlText({
    x: 100,
    y: 100,
    content: 'Double-click to edit',
    fontSize: 24,
    editable: true,
    draggable: true,
  })
  app.tree.add(text)
})
</script>`,
    initScenarioContentCode: `// Scenario A: Create simple text (recommended starter)
const text = new HtmlText({
  x: 120,
  y: 80,
  content: 'Double-click here to edit',
  fontSize: 24,
  color: '#e74c3c',
  editable: true,
  draggable: true,
})
app.tree.add(text)`,
    initScenarioFullStyleCode: `// Scenario B: Create with full styles + custom font
const fontFamily = '"Dancing Script", cursive'
const fontBase64 = 'data:font/woff2;charset=utf-8;base64,...'

const text = new HtmlText({
  x: 100,
  y: 100,
  width: 400,              // Fixed width; wraps when content overflows
  content: 'Heading text',
  fontFamily,
  fontBase64,              // With fontFamily, auto-injects @font-face
  fontSize: 32,
  fontWeight: 600,
  italic: true,
  lineHeight: 1.5,
  letterSpacing: 1,
  padding: [12, 16],
  color: '#2c3e50',
  textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
  textStroke: '2px #000',
  align: 'center',
  alignContent: 'center',
  editable: true,
  draggable: true,
})
app.tree.add(text)`,
    initScenarioTextCode: `// Scenario C: Pass full HTML directly (business saved rich text)
const savedHtml = \`<div style="width:400px;padding:12px 16px;">
  <p class="ql-align-center" style="font-size:28px;line-height:1.5;">
    <span style="color:#e74c3c;">Saved heading</span>
  </p>
</div>\`

const text = new HtmlText({
  x: 200,
  y: 150,
  text: savedHtml,         // Takes priority over content
  editable: true,
  draggable: true,
})
app.tree.add(text)`,
    initScenarioJsonCode: `// Scenario D: Leafer JSON restore (recommended for pure Leafer projects)
const saved = await api.getTextElement(id)  // Data previously saved via text.toJSON()

const text = new HtmlText(saved.data)     // Pass full node data directly
app.tree.add(text)

// Update existing node
const existing = app.findId(saved.data.id)
existing?.set(saved.data)`,
    initScenarioSplitStorageCode: `// Scenario E: Split font and content storage
const contentHtml = '<div style="width:980px;height:294px;"><p class="ql-align-center" style="font-size:70px;font-family:YouSheBiaoTiHei-2;"><span style="-webkit-text-stroke:6px rgb(0,66,104);color:rgb(253,225,5);">Heading</span></p></div>'

const fontStyle = '<style>@font-face{font-family:\\'YouSheBiaoTiHei-2\\';src:url(data:font/woff2;base64,...) format(\\'woff2\\');}</style>'

const text = new HtmlText({
  x: 100,
  y: 100,
  text: fontStyle + contentHtml,  // Merged and passed as text
  editable: true,
  draggable: true,
})
app.tree.add(text)`,
    initScenarioMultiFontCode: `// Multi-font: fetch base64 from font library (subsetting recommended), merge into one <style>
// Store contentHtml + fontIds only; merge the same way before restore (see hydrate chapter)
const fontStyle = \`<style>
@font-face { font-family: 'YouSheBiaoTiHei-2'; src: url(data:font/woff2;base64,AAA...) format('woff2'); }
@font-face { font-family: 'Dancing Script'; src: url(data:font/woff2;base64,BBB...) format('woff2'); }
</style>\`

// Body HTML: different spans reference different font-family
const contentHtml = \`<div style="width:400px;">
  <p style="font-size:28px;font-family:YouSheBiaoTiHei-2;">
    <span style="font-family:YouSheBiaoTiHei-2;">Heading</span>
    <span style="font-family:'Dancing Script',cursive;">Subtitle</span>
  </p>
</div>\`

new HtmlText({
  text: fontStyle + contentHtml,
})`,
    multiFontStorageSchemaExample: `// Business DB / API response example (plugin does not parse these — your project convention)
{
  "id": "text_001",
  "contentHtml": "<div><p style=\\"font-size:28px;\\"><span style=\\"font-family:YouSheBiaoTiHei-2;\\">Heading</span><span style=\\"font-family:'Dancing Script',cursive;\\">Subtitle</span></p></div>",
  "fontIds": ["font_youshe_biaotihei_2", "font_dancing_script"],
  // Optional: characters used per font in this text, for subsetting
  "usedChars": {
    "font_youshe_biaotihei_2": "Characters used in heading and body",
    "font_dancing_script": "Subtitle"
  }
}

// Font library in separate table / object storage, not in each text record:
// { id, family, url }  —— url points to full woff2, read only during hydrate`,
    multiFontHydrateExample: `import { HtmlText } from '@chenyomi/leafer-htmltext-edit'

// 1. Read lightweight record from business DB
const record = await api.getText(recordId)
const { contentHtml, fontIds, usedChars } = record

// 2. Fetch fonts, build @font-face (must be data:font/woff2;base64,..., not http URL)
const fonts = await fontApi.getFonts(fontIds)
const fontFaceRules = await Promise.all(
  fonts.map(async (font) => {
    // Recommended: subset by usedChars[font.id] before base64
    const base64 = await fontApi.toSubsetBase64(font, usedChars?.[font.id])
    return \`@font-face{font-family:'\${font.family}';src:url(\${base64}) format('woff2');}\`
  }),
)
const fontStyle = \`<style>\${fontFaceRules.join('')}</style>\`

// 3. Merge into text the plugin understands, then create or update node
const text = new HtmlText({
  text: fontStyle + contentHtml,
})
app.tree.add(text)

// Full Leafer page JSON: hydrate HtmlText subtree the same way before app.tree.set(scene)`,
    scenePersistenceExample: `import { App } from 'leafer-ui'
import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

// Save: pure Leafer projects should save the full canvas tree
const sceneJson = app.tree.toJSON()
await api.saveDocument({
  id: documentId,
  scene: sceneJson,
})

// Restore: create App and init editor capabilities first
const restoredApp = new App({
  view: 'leafer-view',
  fill: '#ffffff',
  editor: {},
})
await htmlTextManage.init(restoredApp)

const { scene } = await api.getDocument(documentId)

// Replace current canvas — good for opening a full design
restoredApp.tree.set(scene)

// For template/asset append scenarios, add JSON as needed
// scene.children?.forEach((child) => restoredApp.tree.add(child))`,
    textPersistenceExample: `import { HtmlText } from '@chenyomi/leafer-htmltext-edit'

// Save: persist only the text node's own JSON
const textJson = htmlText.toJSON()
await api.saveTextElement({
  id: htmlText.id,
  data: textJson,
})

// Restore: one instance per text record
const savedTexts = await api.getTextElements(documentId)
savedTexts.forEach((item) => {
  const text = new HtmlText(item.data)
  app.tree.add(text)
})

// Update existing text: find node and sync JSON
const existingText = app.findId(textId)
existingText?.set(nextTextJson)

// If saving raw Leafer JSON and HtmlText is registered, you can also add directly
// app.tree.add(textJson)`,
    updateExistingTextExample: `import { HtmlText, setHTMLText } from '@chenyomi/leafer-htmltext-edit'

// Option 1: API returns full HtmlText JSON — sync existing node
const existing = app.findId(textId)
const nextJson = await api.getTextElement(textId)
existing?.set(nextJson.data)

// Option 2: Replace inner HTML only; keep outer position, size, rotation
const textBox = app.findId(textId) as HtmlText | undefined
const inner = textBox?.findOne('HTMLText')
inner?.set({
  text: nextFullHtml, // Must be full HTML; custom fonts need @font-face
})

// Option 3: Toolbar — style from current selection or selected text
app.editor.target = textBox
setHTMLText('fontSize', 32)
setHTMLText('color', '#ff5500')

// Option 4: Template variable — change copy only, not text box layout
const html = textBox?.findOne('HTMLText')
const replacedText = html?.text.replace('{{title}}', form.title)
html?.set({ text: replacedText })`,
    localStylePersistenceExample: `import { setHTMLText, htmlTextManage, HtmlText } from '@chenyomi/leafer-htmltext-edit'

// Example: user changes font on part of text, then saves
// 1. HtmlText is selected and user double-clicked into inline editor
// 2. User drags to select a few characters
setHTMLText('font', '"Dancing Script", cursive', 'data:font/woff2;base64,...')

// Local font size is experimental — enable first; local font does not need enabling
htmlTextManage.setFeatures({ inlineFontSize: true })
setHTMLText('inlineFontSize', 42)
setHTMLText('letterSpacing', 4)

// 3. After user exits inline editor, save outer HtmlText JSON
//    On exit, plugin writes Quill content back to inner HTMLText.text
const textJson = htmlText.toJSON()
await api.saveTextElement({
  id: htmlText.id,
  data: textJson,
})

// 4. On restore, pass JSON back as-is — do not re-split style + text
const saved = await api.getTextElement(id)
const restored = new HtmlText(saved.data)
app.tree.add(restored)

// If business can only save HTML, save full inner HTMLText.text string
const inner = htmlText.findOne('HTMLText')
await api.saveHtml({
  id: htmlText.id,
  text: inner?.text,
})

const { text } = await api.getHtml(id)
app.tree.add(new HtmlText({ text }))`,
    htmlOnlyPersistenceExample: `import { HtmlText } from '@chenyomi/leafer-htmltext-edit'

// Prefer Leafer JSON. Use this only when business already uses split storage:
// 1. contentHtml: content HTML; keep <p style="..."> / <span style="...">
// 2. fontId: DB stores font reference only — do not duplicate large base64 per text row
// 3. fontStyle: on restore, font manager rebuilds @font-face from fontId / font-family
const contentHtml = '<div style="width:980px;height:294px;display:flex;flex-direction:column;justify-content:flex-start;"><p class="ql-align-center" style="font-size:70px;line-height:1.5;font-family:YouSheBiaoTiHei-2;"><span style="-webkit-text-stroke:6px rgb(0,66,104);color:rgb(253,225,5);font-family:YouSheBiaoTiHei-2;">Latest Shanghai appointments!</span></p></div>'

const fontIds = ['font_youshe_biaotihei_2']
const fonts = await fontApi.getFonts(fontIds)

// text is full HTML input for HtmlText:
// - fontStyle loads custom fonts, generated dynamically from font library
// - contentHtml preserves size, color, stroke, dimensions, alignment, etc.
const fontStyle = fonts
  .map((font) => {
    // Must be data:font/woff2;base64,... — SVG cannot use http(s) URLs
    const base64 = font.subsetBase64 ?? font.base64
    return \`@font-face{font-family:'\${font.family}';src:url(\${base64}) format('woff2');}\`
  })
  .join('')

const text = new HtmlText({
  x: 100,
  y: 100,
  editable: true,
  draggable: true,
  text: \`<style>\${fontStyle}</style>\` + contentHtml,
})

app.tree.add(text)

// Notes:
// 1. Do not strip contentHtml to plain text — styles cannot be recovered.
// 2. Canvas @font-face must be base64-embedded; library url is for hydrate read/convert only.
// 3. Multi-font + large CJK libraries: subset before base64; do not embed full font per record.
// 4. After passing text, plugin parses width/height/fontSize/fontFamily/textStroke/padding, etc.
// 5. Explicit width/fontSize/alignContent params take higher priority.`,
    openInnerEditorExample: `import { PointerEvent } from 'leafer-ui'
import { HtmlText, htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

const text = new HtmlText({
  x: 200,
  y: 150,
  editable: true,
  draggable: true,
  content: 'Hello World!',
})

// Single-click to edit — same logic as built-in double-click
text.on(PointerEvent.TAP, () => {
  const htmlText = text.findOne('HTMLText')
  if (!htmlText || text.parent?.locked) return

  // 1. Select outer HtmlText first to load TextEditTool
  app.editor.target = text

  // 2. Open inline editor on inner HTMLText (second arg true = select target)
  setTimeout(() => {
    app.editor.openInnerEditor(htmlText, true)

    // 3. Operate Quill after inline editor loads
    requestAnimationFrame(() => {
      htmlTextManage.getQuill()?.setSelection(0, 5)
    })
  }, 0)
})

frame.add(text)`,
    htmlTextExample: `const text = new HtmlText({
  x: 200,
  y: 150,
  width: 400,           // Fixed width; wraps when content overflows
  fontSize: 20,
  fontFamily: 'PingFang SC',
  fontBase64: undefined, // Custom font: data:font/woff2;base64,...
  fontWeight: 600,
  italic: true,
  lineHeight: 1.8,
  letterSpacing: 1,
  padding: [12, 16],     // Text padding: number / CSS string / array
  content: 'Hello World!',
  textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
  alignContent: 'start',
  editable: true,
  draggable: true,
  color: '#2c3e50',
  textStroke: '3px #000'
})
app.tree.add(text)`,
    setHtmlTextExample: `// 1. Basic character formats (selection in edit mode)
setHTMLText('bold')           // Toggle bold
setHTMLText('italic')         // Toggle italic
setHTMLText('underline')      // Toggle underline
setHTMLText('strike')         // Toggle strikethrough
setHTMLText('textCase')       // Case conversion (requires selection)

// 2. Superscript / subscript
setHTMLText('script', 'super')  // X²
setHTMLText('script', 'sub')    // H₂O

// 3. Alignment
setHTMLText('align', false)           // Left align
setHTMLText('align', 'center')        // Center horizontally
setHTMLText('align', 'right')         // Right align
setHTMLText('align', 'justify')       // Justify
setHTMLText('align', 'distribute')    // Distribute
setHTMLText('alignContent', 'start')  // Top vertically
setHTMLText('alignContent', 'center') // Center vertically
setHTMLText('alignContent', 'end')    // Bottom vertically

// 4. Color
setHTMLText('color', '#ff5500')   // Change text color

// 5. Global properties (select node only, no selection needed)
setHTMLText('fontSize', 24)       // Clears local font sizes
setHTMLText('lineHeight', 1.8)
setHTMLText('letterSpacing', 2)   // Global without selection; local with selection in edit mode

// 6. Local styles (inline editing + text selection)
setHTMLText('inlineFontSize', 42) // Requires setFeatures({ inlineFontSize: true }) first
setHTMLText('font', '"Dancing Script", cursive', fontBase64) // Local font on selection

// 7. Lists
setHTMLText('list', 'ordered')  // Ordered list
setHTMLText('list', 'bullet')   // Bullet list

// 8. Shadow / stroke (selection in edit → local; otherwise global)
setHTMLText('textShadow', '2px 2px 4px rgba(0,0,0,0.4)')
setHTMLText('textStroke', '1px #333333')

// 9. Switch custom font at runtime
const fontFamily = '"Dancing Script", cursive'
const fontBase64 = 'data:font/woff2;charset=utf-8;base64,...'
setHTMLText('font', fontFamily, fontBase64)`,
    formatPainterExample: `import {
  copyHTMLTextFormat,
  applyHTMLTextFormat,
  getCopiedHTMLTextFormat,
  clearCopiedHTMLTextFormat,
} from '@chenyomi/leafer-htmltext-edit'

// 1. Select an HtmlText; or double-click into editing and select a text range
const copied = copyHTMLTextFormat()
if (!copied) {
  console.warn('Select an editable HtmlText first and make sure the license is available')
}

// 2. Select target HtmlText; or select target text inside the inline editor
const ok = applyHTMLTextFormat()
if (!ok) {
  console.warn('No format to apply, or current target is not HtmlText')
}

// 3. Toolbar state
const active = !!getCopiedHTMLTextFormat()

// 4. Leave format-painter mode
clearCopiedHTMLTextFormat()`,
    inlineFontUsageExample: `import { setHTMLText } from '@chenyomi/leafer-htmltext-edit'

// 1. Double-click into inline editor, select a range
// 2. Local font change (third arg is base64 / data URL)
const fontA = '"Dancing Script", cursive'
const fontABase64 = 'data:font/woff2;base64,...'
setHTMLText('font', fontA, fontABase64)

// 3. Select-all or no selection → same API changes global fontFamily and clears local fonts
setHTMLText('font', '"PingFang SC", sans-serif')`,
    inlineFontSizeEnableExample: `import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

// Experimental feature is off by default. inlineFontSize applies only after explicit enable.
htmlTextManage.setFeatures({
  inlineFontSize: true,
})`,
    inlineFontSizeUsageExample: `import { setHTMLText } from '@chenyomi/leafer-htmltext-edit'

// 1. Double-click text to enter inline editor
// 2. Select characters to adjust
// 3. Set local font size
setHTMLText('inlineFontSize', 42)

// To restore uniform size, use global fontSize.
// Unifies whole paragraph and clears local size markers.
setHTMLText('fontSize', 24)`,
    manageInitExample: `import { App } from 'leafer-ui'
import { htmlTextManage } from '@chenyomi/leafer-htmltext-edit'

const app = new App({ view: 'leafer-view', editor: {} })
await htmlTextManage.init(app)`,
    manageGetQuillExample: `const quill = htmlTextManage.getQuill()
if (quill) {
  // Select all text
  quill.setSelection(0, quill.getLength())
  // Get current Delta contents
  const delta = quill.getContents()
}`,
    manageGetCanvasExample: `const canvas = htmlTextManage.getCanvas()

// Canvas zoom
canvas?.zoom('in')    // Zoom in
canvas?.zoom('out')   // Zoom out
canvas?.zoom('fit')   // Fit screen
canvas?.zoom(1)       // Reset to 1:1

// Current selected node list
const list = canvas?.editor?.list ?? []

// Select all nodes
canvas?.editor?.select(frame.children)

// Clear selection
canvas?.editor?.cancel()

// Lock aspect ratio on selected elements
list.forEach((item) => { item.lockRatio = true })

// Clone selected elements
list.forEach((item) => {
  const copy = item.clone()
  copy.x += 10; copy.y += 10
  frame.add(copy)
})

// Delete selected elements
const items = [...list]
items.forEach((item) => item.remove())
canvas?.editor?.cancel()`,
    manageSetFeaturesExample: `htmlTextManage.setFeatures({
  inlineFontSize: true
})`,
    manageIsMultiSelectExample: `if (htmlTextManage.isMultiSelect()) {
  // Batch-edit all selected nodes
  htmlTextManage.dateEdit((leaf) => {
    leaf.fontSize = 18
  })
}`,
    manageDateEditExample: `// Batch change font size
htmlTextManage.dateEdit((leaf) => {
  leaf.fontSize = 24
}, 1)

// Batch change color (inner text elements)
htmlTextManage.dateEdit((leaf) => {
  leaf.fill = '#ff5500'
}, 1)`,
    licenseSetLicenseExample: `import { setLicense } from '@chenyomi/leafer-htmltext-edit'

const ok = await setLicense('your-license-key')
if (!ok) {
  console.warn('License validation failed; rich-text features will be limited')
}`
  },
  ui: {
    shared: {
      tableHeaders: {
        param: 'Parameter',
        paramName: 'Parameter',
        type: 'Type',
        required: 'Required',
        default: 'Default',
        desc: 'Description',
        step: 'Step',
        call: 'Call',
        stepParamDesc: 'Parameter / description',
        goal: 'Business goal',
        recommendedData: 'Recommended data',
        createRestore: 'Create / restore',
        saveAfterEdit: 'Save after edit',
        mode: 'Mode',
        scene: 'Use case',
        keyFields: 'Key fields',
        behavior: 'Behavior',
        confusable: 'Easy to confuse',
        correctUnderstanding: 'Correct understanding',
        suggestion: 'Suggestion',
        fontRole: 'Purpose',
        fontWhen: 'When to use',
        writeMode: 'Approach',
        howYouStore: 'How you store',
        howToPass: 'How to pass',
        phase: 'Phase',
        businessStore: 'What business DB stores',
        passToPlugin: 'What to pass to plugin',
        yourBusinessData: 'Your business data',
        whatToSave: 'What to save',
        howToRestore: 'How to restore',
        fitLevel: 'Fit',
        resourceData: 'Resource / data',
        whereToStore: 'Where to store',
        nodeStores: 'What text node stores',
        howToRestoreResource: 'How to restore',
        whatToUpdate: 'What to update',
        entry: 'Entry point',
        whatKept: 'What is preserved',
        notes: 'Notes',
        checkItem: 'Check item',
        whyImportant: 'Why it matters',
        recommendedAction: 'Recommended action',
        name: 'Name',
        meaning: 'Meaning',
        commonMisuse: 'Common misuse',
        key: 'key',
        valueType: 'value type / options',
        scenario: 'Scenario',
        howYouOperate: 'How you operate',
        apiEffect: 'Typical API effect',
        whatYouWant: 'What you want',
        needInnerEdit: 'Need double-click edit?',
        needSelection: 'Need text selection?',
        invoke: 'Call',
        outerSelected: '① Outer selection',
        innerNoSelection: `② Inline editing
no selection`,
        innerWithSelection: `③ Inline editing
with selection`,
        inlineBehavior: 'Behavior',
        relatedCapability: 'Related capability',
        multiSizeBehavior: 'Behavior with mixed font sizes'
      },
      badges: {
        required: 'Required',
        optional: 'Optional'
      },
      returnsLabel: 'Returns:'
    },
    sidebar: {
      guideTitle: 'Guide',
      apiTitle: 'API Reference',
      moreTitle: 'More',
      mobileNav: 'Documentation'
    },
    introduction: {
      title: 'Leafer HTMLText Editor',
      npmPackage: 'npm package',
      githubSource: 'GitHub example source',
      liveDemo: 'Live demo',
      lead: 'A powerful',
      leadStrong: 'Leafer UI',
      leadSuffix: 'rich-text editor plugin built on Quill 2.0 with full HTML text editing and rich style control.',
      communityTitle: 'Need help integrating?',
      communityDesc: 'Report bugs, suggest features, or browse discussions in the community.',
      communityLink: 'Join the discussion'
    },
    installation: {
      title: 'Installation',
      callout: 'Requires',
      calloutNode: 'Node.js ≥ 16',
      calloutSuffix: '. Recommended with Vite or Webpack.',
      installVia: 'Install via package manager:',
      peerDepsTitle: 'Peer Dependencies',
      peerDepsDesc: 'Ensure the following peer dependencies are installed:'
    },
    quickStart: {
      title: 'Quick Start',
      viteTitle: 'Vite project setup',
      viteDesc: 'Add these settings in Vite config so the plugin works and duplicate instances are avoided:',
      webpackTitle: 'Webpack project setup'
    },
    initGuide: {
      title: 'Initialization Guide',
      intro: 'When integrating the plugin, understand',
      introTwoLayers: 'two layers of initialization',
      introMiddle: ': mount editor capabilities on the page first, then create',
      introSuffix:
        'nodes for your use case. Double-click editing, style toolbar, save/restore work only after both layers complete.',
      layer1Title: 'Layer 1: Page-level initialization',
      layer1Desc: 'Run once per page. Fixed order:',
      layer1FlowMiddle: '→ create',
      layer1Suffix: '.',
      licenseCalloutTitle: 'License order:',
      licenseCallout: 'Must be called before',
      licenseCalloutBefore: '. Local',
      licenseCalloutDev: 'development is unrestricted; production domains need a valid license.',
      businessQuestionTitle: 'First: what kind of business are you building?',
      businessQuestionDesc:
        'This plugin works as a rich-text node on a canvas and in template systems, asset libraries, font libraries, or business forms. Pick a route from the table below before diving into APIs.',
      contentModesTitle: 'Layer 2: Node content initialization',
      contentModesDesc: 'When creating',
      contentModesMiddle: ', there are four common content sources. Pick the right one, then add styles and layout.',
      priorityTitle: 'Priority rules (avoid restore issues):',
      priorityRules: [
        'When both text and content are passed, text wins and content is ignored',
        'With text, plugin parses fontSize, fontFamily, padding, etc. from HTML; explicit params you pass take higher priority',
        'With content only, plugin builds full HTML from fontSize, color, align, and other style params',
        'When neither content nor text is passed, default placeholder Hello World is generated'
      ],
      dontMixTitle: 'Things not to mix up',
      scenariosTitle: 'Initialize by scenario',
      scenariosDesc: 'For multiple custom font restore, see',
      scenariosLink: 'Multi-Font & Restore',
      scenariosSuffix: 'chapter first.',
      paramsTitle: 'Constructor parameters',
      paramsDesc: 'Accepts',
      paramsMiddle: ', i.e. plugin text properties + Leafer',
      paramsSuffix: 'common properties. Grouped by purpose below; full field table in',
      paramsLink: 'API · HtmlText',
      paramsEnd: '.'
    },
    fontEchoGuide: {
      title: 'Multi-Font & Restore',
      introSingle: 'Single font',
      introMulti: 'Multiple fonts (especially CJK)',
      introHydrate: 'split storage + hydrate before restore',
      introNoPluginChange: 'no plugin changes required',
      whyNoUrlTitle: "Why can't fonts use external URLs?",
      whyNoUrlBody:
        'The inner HTMLText layer wraps rich-text HTML inside an SVG foreignObject in a data:image/svg+xml payload before rendering to the canvas. The browser treats that SVG as a self-contained image and will not fetch @font-face { src: url(https://...) } resources inside it. For canvas restore and export, custom fonts must be embedded as data:font/woff2;base64,... — CDN URLs or relative paths alone will not work.',
      fontParamsTitle: 'What do the four font parameters do?',
      singleFontWarning:
        "Only one primary custom font can be registered. For multiple custom fonts in one text, put multiple @font-face rules in text's <style>.",
      echoModesTitle: 'Multi-font restore: three approaches (pick one)',
      mode1Title: 'Approach 1: Leafer JSON (single font / quickest for demos)',
      mode1Desc1:
        'Save htmlText.toJSON(), restore with new HtmlText(json). Fonts, local spans, textData included — good for',
      mode1Strong: 'single font, small font files, or prototypes',
      mode1Desc2: 'For multiple fonts + large CJK libraries, do not store raw toJSON() long-term',
      mode1Desc2Suffix:
        "— each node's text may duplicate base64 and bloat the canvas JSON. Use approach 3 or business strip/hydrate below.",
      mode2Title: 'Approach 2: Full HTML in one field',
      mode2Desc:
        'text includes <style> (multiple @font-face) + <p>/<span> with font-family. Pass new HtmlText({ text }) only — no extra font resource fields.',
      mode3Title: 'Approach 3: Split font and content (Scenario E)',
      mode3Note: 'Note: multiple fonts go in one <style> with multiple @font-face — not one per <style> tag.',
      stableApiCallout:
        'Stable constructor entries are content, text, fontFamily, and fontBase64. If you have multiple font files, do not pass a font array and expect auto local-font restore; build full <style> + content HTML (approach 2/3) or strip/hydrate in Leafer JSON flow per conventions below.',
      bizSplitTitle: 'Multi-font recommended: business-side split storage (zero plugin changes)',
      bizSplitDesc:
        "The plugin only needs correct @font-face (base64) and content HTML in text to edit and render. Where fonts live, slimming, and persistence are your project's conventions — no plugin API required.",
      innerVsCanvasTitle: 'Inline editing vs canvas rendering:',
      innerVsCanvas:
        "While editing, preload full font URLs (e.g. addCustomFonts) for inner Quill; before canvas SVG render, base64 subset or full font must be in text's @font-face. These can be separate.",
      schemaTitle: 'Recommended field schema (example)',
      hydrateTitle: 'Pre-restore hydrate flow',
      optimizeTitle: 'Size optimization tips',
      optimizeItems: [
        'Subsetting (strongly recommended): build woff2 subset from characters actually used, then base64. Full CJK fonts are MB-scale; subsets are often tens of KB.',
        'Global dedup: when the same font appears on many nodes, store one font resource; nodes keep fontId lists only — not base64 per node.',
        "Strip before Leafer JSON export: remove @font-face from each node's text; lift font metadata to document-level fonts table; hydrate on open.",
        'Final image export with no further editing: consider outlining (text to path) — loses editability, suitable for final export only.'
      ],
      dontDoTitle: 'Do not:',
      dontDo:
        '① Persist only font-family names and expect the canvas to find system fonts (custom fonts fall back); ② Use url(/fonts/xxx.woff2) or CDN in @font-face and expect SVG render to work (it fails); ③ Duplicate full base64 font libraries in every text record or node JSON.'
    },
    dataPersistence: {
      title: 'Save & Restore',
      intro: 'HtmlText is a Leafer canvas node. When saving and restoring, pick the approach that matches your',
      introLink: 'initialization mode',
      introSuffix: '— no need to rebuild HTML manually.',
      chooseTitle: 'Choose a storage approach first',
      chooseDesc1: 'If unsure how to store, for',
      chooseSingle: 'single font',
      chooseSingleAction: 'prefer toJSON().',
      chooseMulti: 'multiple fonts with large CJK libraries',
      chooseMultiAction: 'use',
      chooseMultiLink: 'Multi-Font & Restore',
      chooseMultiSuffix:
        'split storage + hydrate — do not keep full base64 in JSON or DB long-term. toJSON() saves outer position, size, inner HTML, local styles; restore with new HtmlText(json). Strip fonts before persist if your business requires it.',
      whySplitTitle: 'Why split storage?',
      whySplitDesc:
        'fontStyle + contentHtml is not a plugin-mandated format but a common lightweight business pattern: font base64 is large; embedding full fonts per text row duplicates data. Store fonts, images, and large assets separately or on CDN; text nodes keep references and necessary HTML styles; merge back into text for HtmlText on restore.',
      judgeCalloutTitle: 'Rule of thumb:',
      judgeCallout:
        'Do not put content reused across many texts/templates or obviously large blobs in every text record. Font files, images, assets, and templates belong separately; position, size, color, stroke, and local span styles belong with text JSON or HTML.',
      leaferSceneTitle: 'Pure Leafer project: save full canvas',
      leaferSceneDesc:
        'If graphics, images, and text are all Leafer-managed, export the canvas as JSON. On next visit, create App, init htmlTextManage, then set or add JSON. For multi-font large libraries, strip embedded fonts after toJSON() and hydrate before set() — see',
      leaferSceneLink: 'Multi-Font & Restore',
      leaferSceneEnd: '.',
      mixedTitle: 'Mixed business: store text nodes separately',
      mixedDesc:
        'If the canvas is only part of the page, or text loads with forms, asset library, or templates separately, save each HtmlText JSON. On restore, create one node per text record and add to canvas; to update, find the node and call set(textJson).',
      updateTitle: 'Update existing nodes: three common ways',
      updateDesc:
        'Restore is not only new HtmlText(). If nodes already exist, pick the entry for full node, content only, or toolbar styles.',
      localStyleTitle: 'Save & restore after local styles',
      localStyleDesc:
        'Local font, local font size, and local letter spacing are not a separate style field — they live in inner HTMLText.text <span style>. Save node JSON after editing; pass JSON back as-is on restore so local styles are not lost.',
      htmlOnlyTitle: 'Special case: HTML content only',
      htmlOnlyDesc:
        'When business splits font and content, restore via text with @font-face and content HTML merged. Avoids duplicating large font base64 per text row. Full example in',
      htmlOnlyLink: 'Initialization Guide · Scenario 4',
      htmlOnlyEnd: '.',
      multiFontHtmlTitle: 'Multi-font and HTML restore',
      multiFontHtmlDesc:
        'One text can embed multiple custom fonts. Saved HTML has multiple @font-face in <style>; local fonts appear in <span style="font-family:...">. With text-only init/restore, plugin parses base styles via parseHtmlTextData and injects @font-face from HTML when entering edit.',
      multiFontHtmlItems: [
        'Recommended: save HtmlText.toJSON() or full Leafer JSON — keeps position, textData, and inner HTML',
        'HTML only: keep full <style> (all @font-face) and content <span> styles',
        'Multi-font init: pass multiple @font-face and content HTML together as text'
      ],
      saveWarning:
        'Do not persist Quill instances, DOM, or editor runtime state. Save HtmlText.toJSON() or full Leafer JSON; before restore, import HtmlText and complete htmlTextManage.init(app) so double-click edit, selection, and zoom work. HTML-only restore fits existing split-storage businesses; if saving HTML only, keep <p style="...">, <span style="..."> inline styles and all @font-face for custom fonts (multiple in multi-font cases). Plain text alone cannot restore size, font, stroke, color, dimensions, or alignment.',
      checklistTitle: 'Pre-save checklist'
    },
    editingGuide: {
      title: 'Editing & FAQ',
      intro:
        'Many "can\'t enter edit mode", "Quill not responding", or "openInnerEditor invalid" issues are not plugin bugs —',
      introLeafer: 'Leafer editor',
      introAnd: 'and',
      introQuill: 'Quill inline editor',
      introSuffix: 'are two mechanisms. Understand how they work together before custom interactions.',
      layersTitle: 'Three layers: canvas node, render layer, edit layer',
      layersDesc: 'Editable rich text at runtime exists on three layers:',
      layers: [
        "Outer HtmlText (Leafer Box) — object you create, drag, and scale on canvas. Default editOuter: 'TextEditTool'; single-click enters outer-frame edit mode.",
        "Inner HTMLText (Leafer HTML render) — child node HtmlText creates to draw HTML on canvas. editInner: 'TextEditor' — actual target when entering Quill editing.",
        'DOM layer #textInnerEditor (Quill container) — fixed div on document.body; shown on double-click; holds Quill input. On edit end, writes back to inner HTMLText.text.'
      ],
      mnemonicTitle: 'Mnemonic:',
      mnemonic:
        'On canvas you see HtmlText; rich text lives in HTMLText.text; typing happens in #textInnerEditor on the page.',
      interactionTitle: 'Default interaction: single-click select, double-click edit',
      interactionDesc: 'Built-in behavior matches common design tools:',
      interactionItems: [
        'Single-click text box → Leafer Editor selects HtmlText → loads outer tool TextEditTool (drag, resize, rotate)',
        'Double-click selected text box → TextEditTool listens PointerEvent.DOUBLE_TAP → editor.openInnerEditor(htmlText, true) → opens TextEditor inline editor',
        'Click canvas blank in inline edit → close inline editor; content syncs back to canvas'
      ],
      namingTitle: 'Three names most often confused',
      namingRows: [
        {
          name: 'TextEditTool',
          type: 'Outer edit tool',
          meaning: 'Default HtmlText.editOuter. Selection frame, resize, rotate; listens for double-click.',
          misuse: 'Passing it as inline editor name to openInnerEditor'
        },
        {
          name: 'TextEditor',
          type: 'Inline editor',
          meaning: 'Default HTMLText.editInner. Loads Quill, syncs styles, writes back HTML.',
          misuse: 'Writing textInnerEditor or other custom strings'
        },
        {
          name: 'textInnerEditor',
          type: 'DOM element id',
          meaning: "Div container for Quill; find via document.querySelector('#textInnerEditor').",
          misuse: "openInnerEditor(node, 'textInnerEditor') — does not open the editor"
        }
      ],
      namingWarningTitle: 'Important:',
      namingWarning:
        'textInnerEditor is the page DOM id; TextEditor is the Leafer inline editor registration name. They are different.',
      openInnerTitle: 'Open inline editor programmatically',
      openInnerDesc:
        "To change double-click edit to single-click, do not copy snippets like openInnerEditor(node, 'textInnerEditor', true). Follow the plugin's double-click logic:",
      openInnerBadge: 'Correct example',
      openInnerPointsTitle: 'This matches plugin source double-click logic. Key points:',
      openInnerPoints: [
        'Target is inner HTMLText, not outer HtmlText',
        'openInnerEditor(htmlText, true) second argument is boolean — select target — not editor name',
        'If not in outer edit mode yet, set app.editor.target = htmlTextBox first, then open inline editor',
        'Call htmlTextManage.getQuill() and setSelection only after inline editor opens'
      ],
      quillTitle: 'When is Quill available?',
      quillDesc:
        'htmlTextManage.init(app) creates one global Quill instance, but it is truly editable only after TextEditor inline editor load():',
      quillItems: [
        'Selected only, no double-click → setHTMLText() works for styles, but no Quill caret',
        'In inline edit → getQuill(), listen text-change, setSelection()',
        'After closing inline editor → Quill content writes to HTMLText.text; canvas re-renders'
      ],
      faqTitle: 'Troubleshooting FAQ'
    },
    apiHtmlText: {
      title: 'API · HtmlText',
      intro: 'Extends Leafer UI Box — core rich-text node class. Registered via @registerUI(); add directly to canvas.',
      paramsTitle: 'Constructor parameters',
      paramsSubtitle: 'All parameters optional; full list below:',
      exampleTitle: 'Example'
    },
    apiManage: {
      title: 'API · HtmlTextManage',
      intro: 'Singleton editor manager for Quill lifecycle and batch editing.'
    },
    apiFormatPainter: {
      title: 'API · Format Painter',
      intro: 'copies the current text formatting, and ',
      introSuffix:
        'pastes it. It distinguishes inline-edit selections from outer selected objects, so it fits toolbar format-painter buttons.',
      callout:
        'Format painter depends on the current selected HtmlText and license capability. Selection copy samples the first valid text segment; object copy preserves global textData, paragraph alignment, local fonts, local letter spacing, shadow, and stroke as much as possible.',
      methodsTitle: 'Methods',
      exampleTitle: 'Example'
    },
    apiSetHtml: {
      title: 'API · setHTMLText',
      intro: 'Core function for applying text styles. Batch-applies to all selected nodes when multi-selected. Read',
      introLink: 'Local & Global Styles',
      introSuffix:
        '「three operation scenarios」first — most confusion is from not double-clicking or not selecting text.',
      quickNoteTitle: 'Quick reference:',
      quickNote:
        'Whole-paragraph font size / line height / weight → select node only; bold / color a few chars → double-click, select, then call; local size / font / letter spacing → double-click + selection (size also needs setFeatures({ inlineFontSize: true })).',
      signatureTitle: 'Function signature',
      paramsTitle: 'Parameters',
      setHtmlParams: [
        {
          name: 'key',
          type: 'string',
          required: true,
          desc: 'Style key; see key list below'
        },
        {
          name: 'value',
          type: 'any',
          required: false,
          desc: 'Style value; type depends on key'
        },
        {
          name: 'base64font',
          type: 'string',
          required: false,
          desc: 'Only when key is "font"; Base64 font data (data:font/woff2;base64,...)'
        }
      ],
      keysTitle: 'Supported keys',
      exampleTitle: 'Example'
    },
    apiExperimental: {
      title: 'API · Local & Global Styles',
      intro: 'Style API. Two rules keep things clear:',
      steps: [
        'Select HtmlText on canvas first (outer frame appears).',
        'To change a few characters: double-click inline edit → drag to select text (blinking caret alone is not a selection).'
      ],
      scenariosTitle: 'Three operation scenarios (local vs whole paragraph)',
      pitfallsTitle: 'Common pitfalls:',
      pitfalls: [
        'Single-click select only, no double-click → only whole-paragraph globals (fontSize, lineHeight, etc.)',
        'In edit but caret only, no highlight → most character formats apply to whole text, not local',
        'inlineFontSize, local font, local letterSpacing need a dragged selection to work',
        'Select-all in inline edit then change font → treated as global font, not local'
      ],
      cookbookTitle: 'Find the right API for your goal',
      matrixTitle: 'Technical detail: key behavior in three scenarios',
      matrixDesc: 'For source cross-reference. Column headers match the three scenarios above.',
      multiSelectCalloutTitle: 'Multi-select:',
      multiSelectCallout:
        'Runs on each selected node; selection-based local styles only apply to Quill selection in current inline editor — cannot batch local styles on a few chars across multiple nodes.',
      inlineFontTitle: 'Local font and multi-font (font)',
      inlineFontDesc:
        'setHTMLText(\'font\', fontFamily, base64font) is on by default; no setFeatures needed. With inline edit and selection, adds span style="font-family:..." to selected text only; without selection or with select-all, updates global textData.fontFamily and clears local fonts. Pass base64font as third arg for custom fonts; plugin writes to internal HTML <style> and merges multiple @font-face when needed.',
      letterSpacingTitle: 'Local letter spacing (letterSpacing)',
      letterSpacingDesc:
        'setHTMLText(\'letterSpacing\', n) with inline edit and selection writes span style="letter-spacing:..."; otherwise updates global textData.letterSpacing and clears local markers. Like local font size: global on <p>, local on <span>.',
      inlineFontSizeTitle: 'Local font size inlineFontSize (experimental)',
      inlineFontSizeWarning:
        'Only style still requiring htmlTextManage.setFeatures({ inlineFontSize: true }). When off, fontSize, local font, arc text, and other stable features are unaffected.',
      inlineFontSizeDesc:
        'Does not replace fontSize: fontSize is global for the whole text object; inlineFontSize is saved as span style="font-size: ...". Global fontSize clears all local sizes.',
      enableTitle: 'How to enable',
      usageTitle: 'Usage',
      limitsTitle: 'Local font size effects and limits',
      exportCallout:
        'Exported HTML keeps local font size / local font / local letter spacing; parseHtmlTextData parses base styles. For text-only restore, keep all @font-face in <style> and <span style>; third-party complex HTML is best-effort, not guaranteed.'
    },
    apiLicense: {
      title: 'API · License',
      callout:
        'Local development (localhost) has no license restrictions. Production domains require a purchased license key.'
    },
    changelog: {
      title: 'Changelog'
    }
  }
} as const;

export type DocsEnUS = typeof docsEnUS;
