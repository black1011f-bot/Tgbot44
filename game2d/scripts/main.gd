extends Control

const BG := Color("#090910")
const PANEL := Color("#151522")
const PANEL_HOVER := Color("#24243a")
const ACCENT := Color("#a78bfa")
const MUTED := Color("#aaa7bb")

var content: VBoxContainer
var status_label: Label

func _ready() -> void:
	_build_shell()
	_show_home()

func _build_shell() -> void:
	var bg := ColorRect.new()
	bg.color = BG
	bg.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(bg)

	var glow := ColorRect.new()
	glow.color = Color(0.22, 0.13, 0.38, 0.22)
	glow.position = Vector2(0, 0)
	glow.size = Vector2(1280, 260)
	glow.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(glow)

	var margin := MarginContainer.new()
	margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 54)
	margin.add_theme_constant_override("margin_right", 54)
	margin.add_theme_constant_override("margin_top", 30)
	margin.add_theme_constant_override("margin_bottom", 28)
	add_child(margin)

	var root := VBoxContainer.new()
	root.add_theme_constant_override("separation", 18)
	margin.add_child(root)

	var header := HBoxContainer.new()
	root.add_child(header)
	var brand := Label.new()
	brand.text = "BOUNTY  HUB"
	brand.add_theme_font_size_override("font_size", 27)
	brand.add_theme_color_override("font_color", Color.WHITE)
	header.add_child(brand)
	var spacer := Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	header.add_child(spacer)
	var version := Label.new()
	version.text = "BOUNTY GAMING  •  EARLY BUILD"
	version.add_theme_color_override("font_color", MUTED)
	version.add_theme_font_size_override("font_size", 12)
	header.add_child(version)

	var line := ColorRect.new()
	line.color = Color("#30283f")
	line.custom_minimum_size.y = 1
	root.add_child(line)

	content = VBoxContainer.new()
	content.size_flags_vertical = Control.SIZE_EXPAND_FILL
	content.add_theme_constant_override("separation", 16)
	root.add_child(content)

	status_label = Label.new()
	status_label.text = "2D • Windows + Android"
	status_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	status_label.add_theme_color_override("font_color", MUTED)
	status_label.add_theme_font_size_override("font_size", 12)
	root.add_child(status_label)

func _clear_content() -> void:
	for child in content.get_children():
		child.queue_free()

func _show_home() -> void:
	_clear_content()
	var spacer := Control.new()
	spacer.custom_minimum_size.y = 14
	content.add_child(spacer)

	var eyebrow := Label.new()
	eyebrow.text = "ИГРОВОЕ ПРОСТРАНСТВО"
	eyebrow.add_theme_color_override("font_color", ACCENT)
	eyebrow.add_theme_font_size_override("font_size", 13)
	content.add_child(eyebrow)

	var title := Label.new()
	title.text = "Играй вместе."
	title.add_theme_font_size_override("font_size", 46)
	title.add_theme_color_override("font_color", Color.WHITE)
	content.add_child(title)

	var subtitle := Label.new()
	subtitle.text = "Выбери настольную игру и собери свою компанию."
	subtitle.add_theme_font_size_override("font_size", 17)
	subtitle.add_theme_color_override("font_color", MUTED)
	content.add_child(subtitle)

	var gap := Control.new()
	gap.custom_minimum_size.y = 12
	content.add_child(gap)

	var grid := GridContainer.new()
	grid.columns = 2
	grid.size_flags_vertical = Control.SIZE_EXPAND_FILL
	grid.add_theme_constant_override("h_separation", 16)
	grid.add_theme_constant_override("v_separation", 16)
	content.add_child(grid)

	_add_mode_card(grid, "МАНЧКИН", "Карты, монстры и сокровища", "⚔", "munchkin")
	_add_mode_card(grid, "БУНКЕР", "Обсуждай и решай, кто попадёт в убежище", "⌂", "bunker")
	_add_mode_card(grid, "ШПИОН", "Найди шпиона среди игроков", "◉", "spy")
	_add_mode_card(grid, "КРОКОДИЛ", "Объясняй слова без подсказок", "✦", "crocodile")

func _add_mode_card(parent: GridContainer, heading: String, description: String, symbol: String, mode: String) -> void:
	var card := PanelContainer.new()
	card.custom_minimum_size = Vector2(0, 142)
	var style := StyleBoxFlat.new()
	style.bg_color = PANEL
	style.border_color = Color("#302b42")
	style.set_border_width_all(1)
	style.set_corner_radius_all(14)
	style.content_margin_left = 20
	style.content_margin_right = 20
	style.content_margin_top = 15
	style.content_margin_bottom = 15
	card.add_theme_stylebox_override("panel", style)
	parent.add_child(card)

	var column := VBoxContainer.new()
	column.add_theme_constant_override("separation", 7)
	card.add_child(column)
	var top := HBoxContainer.new()
	column.add_child(top)
	var icon := Label.new()
	icon.text = symbol
	icon.add_theme_color_override("font_color", ACCENT)
	icon.add_theme_font_size_override("font_size", 24)
	top.add_child(icon)
	var fill := Control.new()
	fill.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	top.add_child(fill)
	var arrow := Label.new()
	arrow.text = "↗"
	arrow.add_theme_color_override("font_color", MUTED)
	top.add_child(arrow)
	var name := Label.new()
	name.text = heading
	name.add_theme_color_override("font_color", Color.WHITE)
	name.add_theme_font_size_override("font_size", 20)
	column.add_child(name)
	var desc := Label.new()
	desc.text = description
	desc.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	desc.add_theme_color_override("font_color", MUTED)
	desc.add_theme_font_size_override("font_size", 13)
	column.add_child(desc)

	var button := Button.new()
	button.text = "ОТКРЫТЬ РЕЖИМ"
	button.custom_minimum_size.y = 36
	button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	button.add_theme_color_override("font_color", Color.WHITE)
	var normal := StyleBoxFlat.new()
	normal.bg_color = Color("#302447")
	normal.set_corner_radius_all(8)
	button.add_theme_stylebox_override("normal", normal)
	var hover := StyleBoxFlat.new()
	hover.bg_color = Color("#49366b")
	hover.set_corner_radius_all(8)
	button.add_theme_stylebox_override("hover", hover)
	button.pressed.connect(_open_mode.bind(mode, heading))
	column.add_child(button)

func _open_mode(mode: String, heading: String) -> void:
	_clear_content()
	var title := Label.new()
	title.text = heading
	title.add_theme_font_size_override("font_size", 36)
	title.add_theme_color_override("font_color", Color.WHITE)
	content.add_child(title)

	var info := Label.new()
	info.text = "Режим выбран. Следующий этап — игровые правила, стол, карты и сетевые комнаты."
	info.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	info.add_theme_font_size_override("font_size", 17)
	info.add_theme_color_override("font_color", MUTED)
	content.add_child(info)

	var room_title := Label.new()
	room_title.text = "ТЕСТОВАЯ КОМНАТА"
	room_title.add_theme_color_override("font_color", ACCENT)
	room_title.add_theme_font_size_override("font_size", 13)
	content.add_child(room_title)

	var room_name := LineEdit.new()
	room_name.placeholder_text = "Название комнаты"
	room_name.custom_minimum_size.y = 48
	content.add_child(room_name)

	var players := OptionButton.new()
	for count in [2, 3, 4, 5, 6, 7, 8]:
		players.add_item("%d игроков" % count)
	players.select(2)
	players.custom_minimum_size.y = 44
	content.add_child(players)

	var create := Button.new()
	create.text = "СОЗДАТЬ ЛОКАЛЬНУЮ КОМНАТУ"
	create.custom_minimum_size.y = 48
	create.pressed.connect(func():
		status_label.text = "Локальная тестовая комната: %s • %s" % [mode.to_upper(), room_name.text if not room_name.text.is_empty() else "Без названия"]
	)
	content.add_child(create)

	var back := Button.new()
	back.text = "← НАЗАД В МЕНЮ"
	back.custom_minimum_size.y = 44
	back.pressed.connect(_show_home)
	content.add_child(back)
