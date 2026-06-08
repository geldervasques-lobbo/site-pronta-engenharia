-- Atualiza o WhatsApp publicado no Supabase.
-- Rode no SQL Editor se o site estiver usando conteúdo salvo em site_content.

update public.site_content
set
  content = jsonb_set(
    jsonb_set(
      jsonb_set(
        content,
        '{whatsappDisplay}',
        '"(71) 99971-2362"'::jsonb,
        true
      ),
      '{whatsappUrl}',
      to_jsonb('https://wa.me/5571999712362?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20PRONTA%20Engenharia.'::text),
      true
    ),
    '{contacts}',
    (
      select jsonb_agg(
        case
          when item->>'label' = 'WhatsApp'
            then jsonb_set(item, '{value}', '"(71) 99971-2362"'::jsonb, true)
          else item
        end
      )
      from jsonb_array_elements(content->'contacts') as item
    ),
    true
  ),
  updated_at = now()
where key = 'main';
