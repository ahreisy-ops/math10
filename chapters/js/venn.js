(function () {
    'use strict';
    var vid = 0, fa = window.MathLite.fa;
    window.VennDraw = function (o) {
        var id = 'vc' + (++vid), A = o.A, B = o.B, U = o.U, F = o.fill || {}, nm = o.names || ['A', 'B'], reg = o.reg ? ' class="vr" ' : ' ';
        var ri = o.big ? 17 : 14, sp = o.big ? 36 : 30, fs = o.big ? 19 : 16, CY = 112, RR = 80;
        var cen = { a: [132, CY], ab: [210, CY], b: [288, CY] }, groups = { o: [], a: [], ab: [], b: [] }, i, out = '';
        U.forEach(function (x) { var ia = A.indexOf(x) >= 0, ib = B.indexOf(x) >= 0; groups[ia && ib ? 'ab' : ia ? 'a' : ib ? 'b' : 'o'].push(x); });
        if (o.big && (groups.a.length > 3 || groups.b.length > 3 || groups.ab.length > 3)) { ri = 14; sp = 30; fs = 16; }
        var corners = [[34, 34], [34 + sp, 34], [34, 34 + sp], [34 + sp, 34 + sp], [386, 60], [386 - sp, 60], [386, 60 + sp], [386 - sp, 60 + sp], [34, 190], [34 + sp, 190], [34 + 2 * sp, 190], [386, 190], [386 - sp, 190], [386 - 2 * sp, 190]];
        var fillOf = function (r) { return F[r] || '#fff'; };
        var s = '<svg style="display:block;margin:6px auto;width:100%;max-width:480px;direction:ltr" viewBox="0 0 420 224" role="img" aria-label="نمودار ون"><defs><clipPath id="' + id + '"><circle cx="168" cy="' + CY + '" r="' + RR + '"/></clipPath></defs>';
        s += '<rect' + reg + 'data-reg="o" x="6" y="6" width="408" height="212" rx="14" style="fill:' + fillOf('o') + ';stroke:currentColor" stroke-width="2"/>';
        s += '<circle' + reg + 'data-reg="a" cx="168" cy="' + CY + '" r="' + RR + '" style="fill:' + fillOf('a') + '"/><circle' + reg + 'data-reg="b" cx="252" cy="' + CY + '" r="' + RR + '" style="fill:' + fillOf('b') + '"/>';
        s += '<g clip-path="url(#' + id + ')"><circle' + reg + 'data-reg="ab" cx="252" cy="' + CY + '" r="' + RR + '" style="fill:' + fillOf('ab') + '"/></g>';
        s += '<circle cx="168" cy="' + CY + '" r="' + RR + '" fill="none" style="stroke:blue" stroke-width="3"/><circle cx="252" cy="' + CY + '" r="' + RR + '" fill="none" style="stroke:green" stroke-width="3"/>';
        s += '<text x="112" y="38" font-size="20" font-weight="700" style="fill:blue" text-anchor="middle">' + nm[0] + '</text><text x="308" y="38" font-size="20" font-weight="700" style="fill:green" text-anchor="middle">' + nm[1] + '</text><text x="398" y="24" font-size="16" font-weight="700" text-anchor="end" fill="currentColor">U</text>';
        ['a', 'ab', 'b', 'o'].forEach(function (r) {
            var g = groups[r], n = g.length, cols = r === 'o' ? 1 : (r === 'ab' && n <= 4 ? 1 : 2), rows = Math.ceil(n / cols), k;
            g.forEach(function (x, idx) {
                var px, py, t = o.tok ? o.tok(x, r) : null, bg = t && t.bg || '#fff', fg = t && t.fg || 'currentColor';
                if (r === 'o') { var c = corners[idx % corners.length]; px = c[0]; py = c[1]; }
                else { var col = idx % cols, row = Math.floor(idx / cols); px = cen[r][0] + (col - (cols - 1) / 2) * sp; py = cen[r][1] + (row - (rows - 1) / 2) * sp; }
                s += '<g pointer-events="none"><circle cx="' + px + '" cy="' + py + '" r="' + ri + '" style="fill:' + bg + ';stroke:currentColor" stroke-width="1.5"/><text x="' + px + '" y="' + (py + fs * 0.34) + '" text-anchor="middle" font-size="' + fs + '" font-weight="700" style="fill:' + fg + '">' + (typeof x === 'number' ? fa(x) : x) + '</text></g>';
            });
        });
        return s + '</svg>';

    };
})();