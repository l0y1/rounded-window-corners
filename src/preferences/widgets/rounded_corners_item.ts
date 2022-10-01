// imports.gi
import * as GObject          from '@gi/GObject'
import * as Gtk              from '@gi/Gtk'

// local modules
import { RoundedCornersCfg } from '@me/utils/types'
import { connections }       from '@me/utils/connections'

// types
import { Me }                from '@global'
// ------------------------------------------------------------------ end import

const Template = `file://${Me.path}/preferences/widgets/rounded-corners-item.ui`

export const RoundedCornersItem = GObject.registerClass (
  {
    Template,
    GTypeName: 'RoundedCornersItem',
    InternalChildren: [
      'rounded_in_maximized_switch',
      'rounded_in_fullscreen_switch',
      'border_radius_scale',
      'smoothing_scale',
      'padding_left_scale',
      'padding_right_scale',
      'padding_top_scale',
      'padding_bottom_scale',
      'revealer',
      'paddings_row',
      'expander_img',
    ],
  },
  class extends Gtk.ListBox {
    private _rounded_in_maximized_switch  !: Gtk.Switch
    private _rounded_in_fullscreen_switch !: Gtk.Switch
    private _border_radius_scale          !: Gtk.Scale
    private _smoothing_scale              !: Gtk.Scale
    private _padding_left_scale           !: Gtk.Scale
    private _padding_right_scale          !: Gtk.Scale
    private _padding_top_scale            !: Gtk.Scale
    private _padding_bottom_scale         !: Gtk.Scale
    private _revealer                     !: Gtk.Revealer
    private _expander_img                 !: Gtk.Image

    _paddings_row                         !: Gtk.ListBoxRow

    private _scales                       !: Gtk.Scale[]
    private _switches                     !: Gtk.Switch[]

    _init () {
      super._init ()
      this._scales = [
        this._border_radius_scale,
        this._smoothing_scale,
        this._padding_bottom_scale,
        this._padding_left_scale,
        this._padding_right_scale,
        this._padding_top_scale,
      ]
      this._switches = [
        this._rounded_in_maximized_switch,
        this._rounded_in_fullscreen_switch,
      ]
    }

    update_revealer () {
      this._revealer.reveal_child = !this._revealer.reveal_child
      if (this._revealer.reveal_child) {
        this._expander_img.add_css_class ('rotated')
      } else {
        this._expander_img.remove_css_class ('rotated')
      }
    }

    watch (on_cfg_changed: (cfg: RoundedCornersCfg) => void) {
      for (const _switch of this._switches) {
        connections.get ().connect (_switch, 'state-set', () => {
          on_cfg_changed (this.cfg)
        })
      }
      for (const scale of this._scales) {
        connections.get ().connect (scale, 'value-changed', () => {
          on_cfg_changed (this.cfg)
        })
      }
    }

    unwatch () {
      const c = connections.get ()
      for (const scale of this._scales) {
        c.disconnect_all (scale)
      }
      c.disconnect_all (this._rounded_in_maximized_switch)
    }

    get cfg (): RoundedCornersCfg {
      return {
        padding: {
          left: this._padding_left_scale.get_value (),
          right: this._padding_right_scale.get_value (),
          top: this._padding_top_scale.get_value (),
          bottom: this._padding_bottom_scale.get_value (),
        },
        keep_rounded_corners: {
          maximized: this._rounded_in_maximized_switch.active,
          fullscreen: this._rounded_in_fullscreen_switch.active,
        },
        border_radius: this._border_radius_scale.get_value (),
        smoothing: this._smoothing_scale.get_value (),
        enabled: true,
      }
    }

    set cfg (cfg: RoundedCornersCfg) {
      const { maximized, fullscreen } = cfg.keep_rounded_corners
      this._rounded_in_maximized_switch.active = maximized
      this._rounded_in_fullscreen_switch.active = fullscreen
      this._border_radius_scale.set_value (cfg.border_radius)
      this._smoothing_scale.set_value (cfg.smoothing)
      this._padding_left_scale.set_value (cfg.padding.left)
      this._padding_right_scale.set_value (cfg.padding.right)
      this._padding_top_scale.set_value (cfg.padding.top)
      this._padding_bottom_scale.set_value (cfg.padding.bottom)
    }
  }
)
