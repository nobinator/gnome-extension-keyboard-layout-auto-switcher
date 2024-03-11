/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import St from 'gi://St';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class KeyboardLayoutAutoSwitcherExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this.#metadata = metadata;
    }

    enable() {
        this.indicator = new PanelMenu.Button(0.0, 'autoSwitchingEnabledIndicator', false);
        const icon = new St.Icon({
            gicon: Gio.icon_new_for_string(
                GLib.build_filenamev([
                    this.#metadata.path,
                    'input-symbolic.svg',
                ])
            ),
            style_class: 'system-status-icon',
        });
        this.indicator.add_child(icon);
        Main.panel.addToStatusArea(this.uuid, this.indicator);
    }

    disable() {
        this.indicator.destroy();
        this.indicator = null;
    }

    #metadata;
}
