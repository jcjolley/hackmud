function(context, args) {
    const str = args.f.call({"nav": "special_thanks"})
    return str.replace(/[^\x00-\x7F]/g, '')
}