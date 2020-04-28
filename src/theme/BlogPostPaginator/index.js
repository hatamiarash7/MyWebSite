/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Link from "@docusaurus/Link";
import "../../css/font.css";

function BlogPostPaginator(props) {
    const { nextItem, prevItem } = props;

    return (
        <nav className="pagination-nav">
            <div className="pagination-nav__item">
                {prevItem && (
                    <Link
                        className="pagination-nav__link"
                        to={prevItem.permalink}
                    >
                        <div className="pagination-nav__link--sublabel font">
                            نوشته قبلی
                        </div>
                        <div className="pagination-nav__link--label font rtl text--left">
                            {prevItem.title}
                        </div>
                    </Link>
                )}
            </div>
            <div className="pagination-nav__item pagination-nav__item--next">
                {nextItem && (
                    <Link
                        className="pagination-nav__link"
                        to={nextItem.permalink}
                    >
                        <div className="pagination-nav__link--sublabel font">
                            نوشته بعدی
                        </div>
                        <div className="pagination-nav__link--label font rtl">
                            {nextItem.title}
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default BlogPostPaginator;
