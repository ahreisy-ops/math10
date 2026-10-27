/* تصویر بالای صفحهٔ هر فصل (مشترک بین آزمون و درسنامه) */
window.HEROES = {
 "1": {
  "cls": "hero-line wide",
  "svg": "<svg viewBox=\"0 0 600 60\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <line x1=\"10\" y1=\"34\" x2=\"590\" y2=\"34\" class=\"hl-axis\" /> <g class=\"hl-ticks\"> <line x1=\"50\" y1=\"24\" x2=\"50\" y2=\"44\" /> <line x1=\"150\" y1=\"24\" x2=\"150\" y2=\"44\" /> <line x1=\"250\" y1=\"24\" x2=\"250\" y2=\"44\" /> <line x1=\"350\" y1=\"24\" x2=\"350\" y2=\"44\" /> <line x1=\"450\" y1=\"24\" x2=\"450\" y2=\"44\" /> <line x1=\"550\" y1=\"24\" x2=\"550\" y2=\"44\" /> </g> <circle cx=\"350\" cy=\"34\" r=\"9\" class=\"hl-dot\" /> </svg>"
 },
 "2": {
  "cls": "hero-line",
  "svg": "<svg viewBox=\"0 0 400 110\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <rect x=\"10\" y=\"10\" width=\"90\" height=\"90\" class=\"tile t-sq\" /> <text x=\"55\" y=\"64\" text-anchor=\"middle\" class=\"tile-text\">x²</text> <rect x=\"120\" y=\"10\" width=\"90\" height=\"32\" class=\"tile t-x\" /> <text x=\"165\" y=\"33\" text-anchor=\"middle\" class=\"tile-text small\">x</text> <rect x=\"120\" y=\"58\" width=\"90\" height=\"32\" class=\"tile t-x\" /> <text x=\"165\" y=\"81\" text-anchor=\"middle\" class=\"tile-text small\">x</text> <rect x=\"230\" y=\"10\" width=\"32\" height=\"32\" class=\"tile t-one\" /> <rect x=\"272\" y=\"10\" width=\"32\" height=\"32\" class=\"tile t-one\" /> <rect x=\"230\" y=\"52\" width=\"32\" height=\"32\" class=\"tile t-one\" /> <rect x=\"272\" y=\"52\" width=\"32\" height=\"32\" class=\"tile t-one\" /> </svg>"
 },
 "3": {
  "cls": "hero-line",
  "svg": "<svg viewBox=\"0 0 400 120\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <polygon points=\"200,100 182,116 218,116\" class=\"bal-base\" /> <line x1=\"200\" y1=\"100\" x2=\"200\" y2=\"30\" class=\"bal-post\" /> <line x1=\"70\" y1=\"30\" x2=\"330\" y2=\"30\" class=\"bal-beam\" /> <line x1=\"70\" y1=\"30\" x2=\"70\" y2=\"62\" class=\"bal-post\" /> <line x1=\"330\" y1=\"30\" x2=\"330\" y2=\"62\" class=\"bal-post\" /> <rect x=\"26\" y=\"62\" width=\"88\" height=\"34\" rx=\"6\" class=\"bal-pan l\" /> <text x=\"70\" y=\"86\" text-anchor=\"middle\" class=\"bal-text\">x + 3</text> <rect x=\"286\" y=\"62\" width=\"88\" height=\"34\" rx=\"6\" class=\"bal-pan r\" /> <text x=\"330\" y=\"86\" text-anchor=\"middle\" class=\"bal-text\">8</text> </svg>"
 },
 "4": {
  "cls": "hero-line",
  "svg": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <g class=\"pl-grid\"> <line x1=\"40\" y1=\"10\" x2=\"40\" y2=\"140\" /> <line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"140\" /> <line x1=\"120\" y1=\"10\" x2=\"120\" y2=\"140\" /> <line x1=\"160\" y1=\"10\" x2=\"160\" y2=\"140\" /> <line x1=\"200\" y1=\"10\" x2=\"200\" y2=\"140\" /> <line x1=\"10\" y1=\"30\" x2=\"250\" y2=\"30\" /> <line x1=\"10\" y1=\"70\" x2=\"250\" y2=\"70\" /> <line x1=\"10\" y1=\"110\" x2=\"250\" y2=\"110\" /> </g> <line x1=\"10\" y1=\"90\" x2=\"250\" y2=\"90\" class=\"pl-axis\" /> <line x1=\"120\" y1=\"140\" x2=\"120\" y2=\"10\" class=\"pl-axis\" /> <line x1=\"200\" y1=\"90\" x2=\"200\" y2=\"50\" class=\"pl-dash\" /> <line x1=\"120\" y1=\"50\" x2=\"200\" y2=\"50\" class=\"pl-dash\" /> <circle cx=\"200\" cy=\"50\" r=\"8\" class=\"pl-dot\" /> </svg>"
 },
 "5": {
  "cls": "hero-line",
  "svg": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <polygon points=\"30,125 230,125 30,25\" class=\"gm-tri\" /> <polyline points=\"30,105 50,105 50,125\" class=\"gm-right\" /> <line x1=\"30\" y1=\"25\" x2=\"30\" y2=\"125\" class=\"gm-edge\" /> <path d=\"M 190 125 A 40 40 0 0 0 200 101\" class=\"gm-arc\" /> <circle cx=\"30\" cy=\"25\" r=\"6\" class=\"gm-dot\" /> <circle cx=\"230\" cy=\"125\" r=\"6\" class=\"gm-dot\" /> <circle cx=\"30\" cy=\"125\" r=\"6\" class=\"gm-dot\" /> </svg>"
 },
 "6": {
  "cls": "hero-line",
  "svg": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <rect x=\"6\" y=\"6\" width=\"248\" height=\"138\" rx=\"10\" class=\"vn-box\" /> <circle cx=\"105\" cy=\"75\" r=\"52\" class=\"vn-a\" /> <circle cx=\"155\" cy=\"75\" r=\"52\" class=\"vn-b\" /> <circle cx=\"130\" cy=\"75\" r=\"5\" class=\"vn-dot\" /> <circle cx=\"88\" cy=\"75\" r=\"5\" class=\"vn-dot\" /> <circle cx=\"172\" cy=\"75\" r=\"5\" class=\"vn-dot\" /> </svg>"
 },
 "7": {
  "cls": "hero-line",
  "svg": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <rect x=\"20\" y=\"30\" width=\"90\" height=\"90\" rx=\"16\" class=\"dc-die\" /> <circle cx=\"46\" cy=\"56\" r=\"7\" class=\"dc-dot\" /> <circle cx=\"84\" cy=\"56\" r=\"7\" class=\"dc-dot\" /> <circle cx=\"65\" cy=\"75\" r=\"7\" class=\"dc-dot\" /> <circle cx=\"46\" cy=\"94\" r=\"7\" class=\"dc-dot\" /> <circle cx=\"84\" cy=\"94\" r=\"7\" class=\"dc-dot\" /> <line x1=\"135\" y1=\"125\" x2=\"245\" y2=\"125\" class=\"dc-axis\" /> <rect x=\"145\" y=\"85\" width=\"20\" height=\"40\" class=\"dc-bar\" /> <rect x=\"175\" y=\"55\" width=\"20\" height=\"70\" class=\"dc-bar2\" /> <rect x=\"205\" y=\"75\" width=\"20\" height=\"50\" class=\"dc-bar\" /> </svg>"
 }
};
